import { todoService } from '../../services/todo.service.js'
import { SET_TODOS, REMOVE_TODO, ADD_TODO, store, UPDATE_TODO } from '../store.js'

export function loadTodos(filterBy) {
  return todoService
    .query(filterBy)
    .then((todos) => {
      store.dispatch({ type: SET_TODOS, todos })
    })
    .catch((err) => {
      console.log('Todo action -> Cannot load todos')
      throw err
    })
}

export function removeTodo(todoId) {
  return todoService
    .remove(todoId)
    .then((todos) => {
      store.dispatch({ type: REMOVE_TODO, todoId })
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
    .catch((err) => {
      console.log('Todo action -> Cannot add todo')
      throw err
    })
}
