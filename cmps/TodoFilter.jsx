import { utilService } from '../services/util.service.js'

const { useState, useEffect, useRef } = React

export function TodoFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  const debouncedSetFilterRef = useRef(utilService.debounce(onSetFilterBy, 500))

  useEffect(() => {
    debouncedSetFilterRef.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break

      case 'checkbox':
        value = target.checked
        break

      default:
        break
    }

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  const { txt, importance, status, sort } = filterByToEdit

  return (
    <section className='todo-filter' name='status' id='status' value={status} onChange={handleChange}>
      <h2>Filter Todos</h2>
      <form className='filter-form'>
        <h4>Filter By:</h4>
        <input value={txt} onChange={handleChange} type='search' placeholder='By Txt' id='txt' name='txt' />
        <input value={importance} onChange={handleChange} type='number' placeholder='By Importance' id='importance' name='importance' />

        <select name='status' onChange={handleChange} id='status'>
          <option value={'all'}>All Todos</option>
          <option value={'active'}>Active Todos</option>
          <option value={'done'}>Done Todos</option>
        </select>

        <select value={sort} name='sort' onChange={handleChange} id='sort'>
          <option value=''>Sort By</option>
          <option value='txt'>Text</option>
          <option value='createdAt'>Time</option>
        </select>
      </form>
    </section>
  )
}
