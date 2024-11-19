export function TodoPreview({ todo, onToggleTodo, onColorTodo }) {
  const { style } = todo

  const colorsBar = [
    { color: '', bgColor: '' },
    { color: 'red', bgColor: 'lightcoral' },
    { color: 'blue', bgColor: 'lightblue' },
    { color: 'green', bgColor: 'lightgreen' },
    { color: 'orange', bgColor: 'moccasin' },
    { color: 'purple', bgColor: 'plum' }
  ]

  return (
    <section
      className='todo-preview'
      style={{
        color: style.color || 'inherit',
        backgroundColor: style.bgColor || 'inherit'
      }}
    >
      <h2 className={todo.isDone ? 'done' : ''} onClick={onToggleTodo}>
        Todo: {todo.txt}
      </h2>
      <h4>Todo Importance: {todo.importance}</h4>

      <div className='color-bar'>
        {colorsBar.map(({ color, bgColor }) => (
          <button
            key={color}
            style={{
              backgroundColor: bgColor,
              border: `2px solid ${color}`,
              width: '20px',
              height: '20px',
              margin: '2px',
              cursor: 'pointer'
            }}
            onClick={() => onColorTodo(todo, color, bgColor)}
          ></button>
        ))}
      </div>
    </section>
  )
}
