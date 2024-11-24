const { Link, NavLink } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux
const { useNavigate } = ReactRouter

import { userService } from '../services/user.service.js'
import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'

export function AppHeader() {
  const navigate = useNavigate()
  const user = useSelector((state) => state.loggedInUser)

  function onLogout() {
    userService
      .logout()
      .then(() => {
        onSetUser(null)
      })
      .catch((err) => {
        showErrorMsg('OOPs try again', err)
      })
  }

  function onSetUser(user) {
    setUser(user)
    navigate('/')
  }

  function getStyleByUser() {
    const userPrefs = {
      color: '',
      backgroundColor: ''
    }

    if (user) {
      userPrefs.color = user.color
      userPrefs.backgroundColor = user.bgColor
    }

    return userPrefs
  }

  return (
    <header className='app-header full main-layout' style={getStyleByUser()}>
      <section className='header-container'>
        <h1>React Todo App</h1>
        {user ? (
          <section>
            <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
            <div>Balance: {user.balance}</div>
            <button onClick={onLogout}>Logout</button>
          </section>
        ) : (
          <section>
            <LoginSignup onSetUser={onSetUser} />
          </section>
        )}
        <nav className='app-nav'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/about'>About</NavLink>
          <NavLink to='/todo'>Todos</NavLink>
        </nav>
      </section>
      <UserMsg />
    </header>
  )
}
