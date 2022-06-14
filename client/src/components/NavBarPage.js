import { useEffect } from 'react'

import { useNavigate, Link } from 'react-router-dom'

// Import Bootstrap components
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

// Import Auth helpers
import { getPayload, userIsAuthenticated } from './helpers/auth'

const NavBarPage = () => {

  // Navigate
  const navigate = useNavigate()

  // Function to logout user
  const handleLogout = () => {
    // Remove token from local storage
    window.localStorage.removeItem('aesthetic')
    // Navigate to the login page
    navigate('/login')
  }

  return (
    <>
      <Navbar bg="light" className="border-bottom" expand="sm">
        <Container>
          <Navbar.Brand as={Link} to="/posts">Aesthetic</Navbar.Brand>
          <Nav className="">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse>
              {userIsAuthenticated() ?
                <>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                  <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                </>
                :
                <>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </>
              }


            </Navbar.Collapse>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBarPage
