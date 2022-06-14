import { useEffect } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner'

// Import React router
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Import Components
import Home from './components/Home'
import NavBarPage from './components/NavBarPage'
import PostIndex from './components/posts/PostIndex'
import PostShow from './components/posts/PostShow'
import SpinnerIcon from './components/utilities/SpinnerIcon'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

const App = () => {

  return (
    <>
      <BrowserRouter>
        <NavBarPage />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostIndex />} />
          <Route path="/posts/:id" element={<PostShow />} />
          {/* Auth routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
