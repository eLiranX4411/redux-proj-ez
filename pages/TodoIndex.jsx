import { TodoFilter } from '../cmps/TodoFilter.jsx'
import { TodoList } from '../cmps/TodoList.jsx'
import { todoService } from '../services/todo.service.js'
import { loadTodos, removeTodo, addTodo, updateTodo } from '../store/actions/todo.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

const { Link, useSearchParams } = ReactRouterDOM

export function TodoIndex() {
  // const [todos, setTodos] = useState(null)
  const todos = useSelector((storeState) => storeState.todos)

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
    const todoToSave = { ...todo, isDone: !todo.isDone }
    todoService
      .save(todoToSave)
      .then((savedTodo) => {
        setTodos((prevTodos) => prevTodos.map((currTodo) => (currTodo._id !== todo._id ? currTodo : { ...savedTodo })))
        showSuccessMsg(`Todo is ${savedTodo.isDone ? 'done' : 'back on your list'}`)
      })
      .catch((err) => {
        console.log('err:', err)
        showErrorMsg('Cannot toggle todo ' + todoId)
      })
  }

  if (!todos) return <div>Loading...</div>
  return (
    <section className='todo-index'>
      <TodoFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
      <div>
        <Link to='/todo/edit' className='btn'>
          Add Todo
        </Link>
      </div>
      <h2>Todos List</h2>
      <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
      <hr />
    </section>
  )
}
