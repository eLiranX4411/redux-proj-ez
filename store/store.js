import { userService } from '../services/user.service.js'

const { createStore, compose } = Redux

//* Todos
export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

//* User
export const SET_USER = 'SET_USER'
export const SET_USER_BALANCE = 'SET_USER_BALANCE'

const initialState = {
  todos: [],
  isLoading: false,
  currFilterBy: {},
  loggedInUser: userService.getLoggedinUser()
}

function appReducer(state = initialState, cmd = {}) {
  switch (cmd.type) {
    //* Todos
    case SET_TODOS:
      return { ...state, todos: cmd.todos }
    case REMOVE_TODO:
      return { ...state, todos: state.todos.filter((todo) => todo._id !== cmd.todoId) }
    case ADD_TODO:
      return { ...state, todos: [...state.todos, cmd.todo] }
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          return todo._id === cmd.todo._id ? cmd.todo : todo
        })
      }

    //* User
    case SET_USER:
      return { ...state, loggedInUser: cmd.user }

    case SET_USER_BALANCE:
      const loggedInUser = { ...state.loggedInUser, balance: cmd.balance }
      return { ...state, loggedInUser }

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
