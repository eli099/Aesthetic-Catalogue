import { useEffect } from 'react'

import { useNavigate, Link } from 'react-router-dom'

// Import Bootstrap components
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'

// Import Auth helpers
import { getPayload, userIsAuthenticated } from './helpers/auth'

const NavBarPage = () => {

  // Navigate
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = () => {
      const userString = window.localStorage.getItem('aesthetic-user')
      const userJson = JSON.parse(userString)
      console.log('logged in user details ->', userJson)
    }
    getUser()
  }, [])

  // Function to logout user
  const handleLogout = () => {
    // Remove token from local storage
    window.localStorage.removeItem('aesthetic')
    window.localStorage.removeItem('aesthetic-user')
    // Navigate to the login page
    navigate('/')
  }

  return (
    <>
      <Navbar collapseOnSelect fixed="" bg="light" className="border-bottom" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src="https://i.postimg.cc/TPh2cvKb/aesthetic-logo.png" width="40" className="me-3" alt="Aesthetic Catalogue Logo" />
            
          </Navbar.Brand>
          <Nav className="">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse>
              {userIsAuthenticated() ?
                <>
                  <NavDropdown title="Profile" className="badge rounded-pill text-bg-info ps-2 pe-2 pt-1 pb-1 m-2 border bg-white fs-6 fw-normal">
                    <NavDropdown.Item>
                      <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Nav.Link as={Link} to="/posts/add">Add Post</Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item className="bg-info bg-opacity-25 border-top">
                      <Nav.Link className="" as={Link} to="/profile">View Profile</Nav.Link>
                    </NavDropdown.Item>
                  </NavDropdown>
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
