import { todoService } from '../../services/todo.service.js'
import { SET_TODOS, REMOVE_TODO, ADD_TODO, store, UPDATE_TODO, SET_IS_LOADING } from '../store.js'
import { addActivity } from '../actions/user.actions.js'

export function loadTodos(filterBy) {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  return todoService
    .query(filterBy)
    .then((todos) => {
      store.dispatch({ type: SET_TODOS, todos })
    })
    .catch((err) => {
      console.log('Todo action -> Cannot load todos')
      throw err
    })
    .finally(() => {
      store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    })
}

export function removeTodo(todoId) {
  return todoService
    .remove(todoId)
    .then(() => {
      store.dispatch({ type: REMOVE_TODO, todoId })
    })
    .then(() => {
      return addActivity(`Todo removed!`)
    })
    .catch((err) => {
      console.log('Todo action -> Cannot remove todo')
      throw err
    })
}

export function saveTodo(todo) {
  const type = todo._id ? UPDATE_TODO : ADD_TODO
  return todoService
    .save(todo)
    .then((todo) => {
      store.dispatch({ type, todo })
    })
    .then((res) => {
      const actionName = todo._id ? 'Updated' : 'Added'
      return addActivity(`${actionName} a Todo: ` + todo.txt).then(() => res)
    })
    .catch((err) => {
      console.log('Todo action -> Cannot add todo')
      throw err
    })
}

export function toggleTodo(todo) {
  const updatedTodo = { ...todo, isDone: !todo.isDone }

  return todoService
    .save(updatedTodo)
    .then((savedTodo) => {
      store.dispatch({ type: UPDATE_TODO, todo: savedTodo })
      return savedTodo
    })
    .then((savedTodo) => {
      const actionName = savedTodo._id ? 'Done' : ''
      return addActivity(`${actionName} a Todo: ` + savedTodo.txt).then(() => savedTodo)
    })
    .catch((err) => {
      console.log('Todo action -> Cannot toggle todo')
      throw err
    })
}

export function colorTodo(todo, color, bgColor) {
  const updatedTodo = { ...todo, style: { ...todo.style, color, bgColor } }

  return todoService
    .save(updatedTodo)
    .then((savedTodo) => {
      store.dispatch({ type: UPDATE_TODO, todo: savedTodo })
      return savedTodo
    })
    .catch((err) => {
      console.log('Todo action -> Cannot toggle todo')
      throw err
    })
}
