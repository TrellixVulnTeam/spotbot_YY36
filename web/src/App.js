import React from 'react'
import NavBar from './components/NavBar'
import {Route, Routes} from 'react-router-dom'
import Bot from './pages/Bot'
import Users from './pages/Users'
import Winners from './pages/Winners'

const App = () => {
  return (
    <div>
      <NavBar/>
    <Routes>
      <Route path='/' element={<Bot/>} />
      <Route path='/users' element={<Users/>} />
      <Route path='/winners' element={<Winners/>} />
    </Routes>
    </div>
  )
}

export default App