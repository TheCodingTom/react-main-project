import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import SignModal from "./SignModal";
import { isUserLogged } from "../utils/AuthUtility";

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const isAuth = isUserLogged(user)
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary"
        bg="light" data-bs-theme="light"
      >
        <Container>
          <Navbar.Brand as={NavLink} to={"/"}>COUNTRY EXPLORER</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to={"/"}>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to={"/countries"}>
                Countries
              </Nav.Link>
              {isAuth ? (<NavDropdown title="User" id="collapsible-nav-dropdown">
                <NavDropdown.Item as={NavLink} to={"/profile"}>Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>Play - Coming soon?</NavDropdown.Item>
              </NavDropdown>) : ""}
            </Nav>
            <Nav>
              <div>
                {isAuth ? (
                  <Button onClick={logout} color="inherit">
                    Log out
                  </Button>
                ) : (
                  <SignModal />
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </>
  );
}

export default NavBar;
