export function TodoPreview({ todo, onToggleTodo }) {
  return (
    <section className='todo-preview'>
      <h2 className={todo.isDone ? 'done' : ''} onClick={onToggleTodo}>
        Todo: {todo.txt}
      </h2>
      <h4>Todo Importance: {todo.importance}</h4>
    </section>
  )
}
