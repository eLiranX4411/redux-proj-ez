import { TodoFilter } from '../cmps/TodoFilter.jsx'
import { TodoList } from '../cmps/TodoList.jsx'
import { todoService } from '../services/todo.service.js'
import { loadTodos, removeTodo, toggleTodo, colorTodo } from '../store/actions/todo.actions.js'
import { changeBalance } from '../store/actions/user.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
const { Link, useSearchParams } = ReactRouterDOM

export function TodoIndex() {
  const todos = useSelector((storeState) => storeState.todos)
  const isLoading = useSelector((storeState) => storeState.isLoading)

  // Special hook for accessing search-params:
  const [searchParams, setSearchParams] = useSearchParams()
  const defaultFilter = todoService.getFilterFromSearchParams(searchParams)

  const [filterBy, setFilterBy] = useState(defaultFilter)

  useEffect(() => {
    setSearchParams(filterBy)
    loadTodos(filterBy)
      .then(() => {})
      .catch((err) => {
        console.error('err:', err)
        showErrorMsg('Cannot load todos')
      })
  }, [filterBy])

  function onRemoveTodo(todoId) {
    confirm('Are you sure to delete?')
      ? removeTodo(todoId)
          .then(() => {
            showSuccessMsg(`Todo removed`)
          })
          .catch((err) => {
            console.log('err:', err)
            showErrorMsg('Cannot remove todo ' + todoId)
          })
      : alert('Ok')
  }

  function onToggleTodo(todo) {
    toggleTodo(todo)
      .then((savedTodo) => {
        showSuccessMsg(`Todo is ${savedTodo.isDone ? 'done' : 'back on your list'}`)
        if (savedTodo.isDone) {
          return changeBalance(10)
            .then(() => {
              console.log(`Balance update success`)
            })
            .catch((err) => {
              console.log(`Error updating balance`, err)
              showErrorMsg('Could not update balance.')
            })
        }
      })
      .catch((err) => {
        console.log('err:', err)
        showErrorMsg('Cannot toggle todo ' + todo._id)
      })
  }

  function onColorTodo(todo, color, bgColor) {
    // console.log('colored')
    colorTodo(todo, color, bgColor)
      .then(() => {
        showSuccessMsg(`Todo is get colored'}`)
      })
      .catch((err) => {
        console.log('err:', err)
        showErrorMsg('Cannot colored todo ' + todo._id)
      })
  }

  if (!todos) return <div>no todos to show..</div>
  return (
    <section className='todo-index'>
      <TodoFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
      <div>
        <Link to='/todo/edit' className='btn'>
          Add Todo
        </Link>
      </div>
      <h2>Todos List</h2>
      {!isLoading ? (
        <TodoList todos={todos} onColorTodo={onColorTodo} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
      ) : (
        <div>Loading...</div>
      )}
    </section>
  )
}
