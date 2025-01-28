// import React from 'react'

import { NavLink } from "react-router";

function NavBar() {
  return (
    <nav>
      <NavLink
        to={"/"}
        style={({ isActive }) => {
          return isActive ? { backgroundColor: "white" } : {};
        }}
      >
        Home
      </NavLink>
      <NavLink
        to={"/countries"}
        style={({ isActive }) => {
          return isActive ? { backgroundColor: "white" } : {};
        }}
      >
        Countries
      </NavLink>
      <NavLink
        to={"/contact"}
        style={({ isActive }) => {
          return isActive ? { backgroundColor: "white" } : {};
        }}
      >
        Contact
      </NavLink>
    </nav>
  );
}

export default NavBar;
