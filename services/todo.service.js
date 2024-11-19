import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const TODO_KEY = 'todoDB'
_createTodos()

export const todoService = {
  query,
  get,
  remove,
  save,
  getEmptyTodo,
  getDefaultFilter,
  getFilterFromSearchParams
}
// For Debug (easy access from console):
window.cs = todoService

function query(filterBy = {}) {
  return storageService.query(TODO_KEY).then((todos) => {
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, 'i')
      todos = todos.filter((todo) => regExp.test(todo.txt))
    }

    if (filterBy.importance) {
      todos = todos.filter((todo) => todo.importance >= filterBy.importance)
    }

    if (filterBy.status) {
      if (filterBy.status === 'active') {
        todos = todos.filter((todo) => !todo.isDone)
      } else if (filterBy.status === 'done') {
        todos = todos.filter((todo) => todo.isDone)
      }
    }

    return todos
  })
}

function get(todoId) {
  return storageService.get(TODO_KEY, todoId).then((todo) => {
    return todo
  })
}

function remove(todoId) {
  return storageService.remove(TODO_KEY, todoId)
}

function save(todo) {
  if (todo._id) {
    todo.updatedAt = Date.now()
    return storageService.put(TODO_KEY, todo)
  } else {
    todo.createdAt = todo.updatedAt = Date.now()
    return storageService.post(TODO_KEY, todo)
  }
}

function getEmptyTodo(txt = '', importance = 5) {
  return { txt, importance, isDone: false, style: { color: '', bgColor: '' } }
}

function getDefaultFilter() {
  return { txt: '', importance: 0, status: '' }
}

function getFilterFromSearchParams(searchParams) {
  const defaultFilter = getDefaultFilter()
  const filterBy = {}
  for (const field in defaultFilter) {
    filterBy[field] = searchParams.get(field) || ''
  }
  return filterBy
}

function _createTodos() {
  let todos = utilService.loadFromStorage(TODO_KEY)
  if (!todos || !todos.length) {
    todos = []
    const txts = ['Learn React', 'Master CSS', 'Practice Redux']
    for (let i = 0; i < 10; i++) {
      const txt = txts[utilService.getRandomIntInclusive(0, txts.length - 1)]
      todos.push(_createTodo(txt + (i + 1), utilService.getRandomIntInclusive(1, 10)))
    }
    utilService.saveToStorage(TODO_KEY, todos)
  }
}

function _createTodo(txt, importance, style) {
  const todo = getEmptyTodo(txt, importance, style)
  todo._id = utilService.makeId()
  todo.createdAt = todo.updatedAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
  return todo
}

// Data Model:
// const todo = {
//     _id: "gZ6Nvy",
//     txt: "Master Redux",
//     importance: 9,
//     isDone: false,
//     createdAt: 1711472269690,
//     updatedAt: 1711472269690
// }
