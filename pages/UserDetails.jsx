import { updateUser } from '../store/actions/user.actions.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

export function UserDetails() {
  const user = useSelector((state) => state.userModule.loggedInUser)
  const [userDetails, setUserDetails] = useState(null)

  useEffect(() => {
    if (user) loadUser()
  }, [])

  function loadUser() {
    setUserDetails({
      fullname: user.fullname,
      color: user.color,
      bgColor: user.bgColor
    })
  }

  function onEditUser(ev) {
    ev.preventDefault()
    const { fullname, color, bgColor } = userDetails

    updateUser(user, bgColor, color, fullname)
      .then(() => {
        showSuccessMsg('User updated successfully!')
      })
      .catch((err) => {
        console.error('Cannot update user:', err)
        showErrorMsg('Cannot update user')
      })
  }

  function handleChange({ target }) {
    let field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break

      case 'checkbox':
        value = target.checked
        break
    }

    setUserDetails((prevUser) => ({ ...prevUser, [field]: value }))
  }

  // console.log(user)

  if (!user || !userDetails) return <div>No Logged in User... Please login</div>
  return (
    <section className='user-details-container'>
      <h1>Welcome! - {user.fullname} - To Your Profile</h1>
      <legend className='user-profile-bar'>
        <form onSubmit={onEditUser}>
          <label htmlFor='fullname'>
            <input type='text' name='fullname' id='fullname' value={userDetails.fullname} onChange={handleChange} placeholder='Change name' />
          </label>

          <label htmlFor='color'>
            <input type='text' name='color' id='color' value={userDetails.color} onChange={handleChange} placeholder='Change color' />
          </label>

          <label htmlFor='bgColor'>
            <input
              type='text'
              name='bgColor'
              id='bgColor'
              value={userDetails.bgColor}
              onChange={handleChange}
              placeholder='Change Background Color'
            />
          </label>
          <button>Apply prefs</button>
        </form>
      </legend>

      <ul className='user-activities'>
        {user.activities.map((activity, idx) => (
          <li key={idx}>
            {activity.txt} - {new Date(activity.at).toLocaleString()}
          </li>
        ))}
      </ul>
    </section>
  )
}
