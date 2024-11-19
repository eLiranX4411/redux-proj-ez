import { userService } from '../services/user.service.js'
import { todoService } from '../services/todo.service.js'

const { createStore, compose } = Redux

//* Todos
export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

//* User
export const SET_USER = 'SET_USER'

const initialState = {
  todoList: [],
  isLoading: false,
  currFilterBy: {},
  user: {}
}

function appReducer(state = initialState, cmd = {}) {
  switch (cmd.type) {
    //* Todos
    case INCREMENT:
      return { ...state, count: state.count + 1 }
    case DECREMENT:
      return { ...state, count: state.count - 1 }
    case CHANGE_BY:
      return { ...state, count: state.count + cmd.diff }

    default:
      return state
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(appReducer, composeEnhancers())

// * For Debugging
window.gStore = store

// store.subscribe(() => {
//     console.log('Current state is:', store.getState())
// })
