const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM
const { Provider } = ReactRedux

import { AppHeader } from './cmps/AppHeader.jsx'
import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { TodoIndex } from './pages/TodoIndex.jsx'
import { TodoDetails } from './pages/TodoDetails.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { TodoEdit } from './pages/TodoEdit.jsx'
import { store } from './store/store.js'

export function RootCmp() {
  return (
    <Provider store={store}>
      <Router>
        <section className='app main-layout'>
          <AppHeader />
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />}></Route>
              <Route path='/todo/:todoId' element={<TodoDetails />} />
              <Route path='/user/:userId' element={<UserDetails />} />
              <Route path='/todo/edit/:todoId' element={<TodoEdit />} />
              <Route path='/todo/edit' element={<TodoEdit />} />
              <Route path='/todo' element={<TodoIndex />} />
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )
}
