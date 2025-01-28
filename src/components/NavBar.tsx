// import React from 'react'

import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router";

function NavBar() {
  return (
    <div>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>
              <NavLink
                to={"/"}
                style={({ isActive }) => {
                  return isActive ? { backgroundColor: "white" } : {};
                }}
              >
                Home
              </NavLink>
            </Nav.Link>
            <Nav.Link>
            <NavLink
                to={"/countries"}
                style={({ isActive }) => {
                  return isActive ? { backgroundColor: "white" } : {};
                }}
              >
                Countries
              </NavLink>
            </Nav.Link>
            <Nav.Link> <NavLink
                to={"/contact"}
                style={({ isActive }) => {
                  return isActive ? { backgroundColor: "white" } : {};
                }}
              >
                Contact
              </NavLink></Nav.Link>
          </Nav>
        </Container>
      </Navbar>

     

     
    </div>
  );
}

export default NavBar;
