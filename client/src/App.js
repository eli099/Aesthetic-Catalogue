import { useEffect } from 'react'
import Spinner from 'react-bootstrap/esm/Spinner'

// Import React router
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Import Components
import Home from './components/Home'
import NavBarPage from './components/NavBarPage'
import PostIndex from './components/posts/OldIndex'
import PostShow from './components/posts/PostShow'
import SpinnerIcon from './components/utilities/SpinnerIcon'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import ProfilePage from './components/ProfilePage'
import Test from './components/posts/PostIndex copy'
import PostAdd from './components/posts/PostAdd'
import PostEdit from './components/posts/PostEdit'

const App = () => {

  return (
    <>
      <BrowserRouter>
        <NavBarPage />
        <Routes>
          <Route path="/home" element={<Home />} />
          {/* <Route path="/posts" element={<PostIndex />} /> */}
          <Route path="/posts/:id" element={<PostShow />} />
          {/* Auth routes */}
          <Route path="/posts/add" element={<PostAdd />} />
          <Route path="/posts/:id/edit" element={<PostEdit />} />
          {/* Auth routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* User profile */}
          <Route path="/profile" element={<ProfilePage />} />

          {/* Testing */}
          <Route path="/" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
