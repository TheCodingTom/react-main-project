
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router'
import { AuthContext } from "../context/AuthContext";
import { useContext } from 'react';



function NavBarNew() {

  const {user, logout} = useContext(AuthContext)
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark" >
      <Container>
        <Navbar.Brand>CIAO BELLO</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link><NavLink style={{ textDecoration: "none", color: "white" }} to={"/"}>
            Home
          </NavLink></Nav.Link>
            <Nav.Link><NavLink style={{ textDecoration: "none", color: "white" }} to={"/countries"}>
            Countries
          </NavLink></Nav.Link>
            <NavDropdown title="User" id="collapsible-nav-dropdown">
              <NavDropdown.Item><NavLink style={{ textDecoration: "none", color: "white" }} to={"/register"}>
            Register
          </NavLink></NavDropdown.Item>
              <NavDropdown.Item>
              <NavLink style={{ textDecoration: "none", color: "white" }} to={"/login"}>
            Login
          </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>Play?</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link><NavLink style={{ textDecoration: "none", color: "white" }} to={"/chat"}>
            Chat
          </NavLink></Nav.Link>
            
            <div>
              {user ? (
              <Button onClick={logout} color="inherit">
                Log out
              </Button>
            ) : (
              <Button variant="danger">Logged out</Button>
            )}
            </div>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBarNew