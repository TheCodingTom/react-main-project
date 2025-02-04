import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import BackButton from "./BackButton";
import SignModal from "./SignModal";

function NavBar() {
  const { user, login, logout } = useContext(AuthContext);
  return (
   <>
     <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand>CIAO BELLO</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={NavLink}
              style={{ textDecoration: "none", color: "white" }}
              to={"/"}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              style={{ textDecoration: "none", color: "white" }}
              to={"/countries"}
            >
              Countries
            </Nav.Link>
            <NavDropdown title="User" id="collapsible-nav-dropdown">
              <NavDropdown.Item
                as={NavLink}
                style={{ textDecoration: "none", color: "white" }}
                to={"/register"}
              >
                Register
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                style={{ textDecoration: "none", color: "white" }}
                to={"/login"}
              >
                Login
              </NavDropdown.Item>
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Play - Coming soon?</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            

            <div>
              {user ? (
                <Button onClick={logout} color="inherit">
                  Log out
                </Button>
              ) : (
                <Button color="inherit" >Logged out</Button>
              )}
            </div>

            <div>
              <SignModal/>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <div>
      <BackButton/>
    </div>
   </>
  );
}

export default NavBar;
