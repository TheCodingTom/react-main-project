// import React from 'react'
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

import { NavLink } from "react-router";

function NavBar() {
  return (
    <div>
      <nav className="nav-bar">
        <div className="navbar-titles">
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
        </div>
       
      </nav>
    </div>
  );
}

export default NavBar;
