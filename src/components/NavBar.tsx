// import React from 'react'

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import { NavLink } from "react-router";

function NavBar() {
  return (
    <nav>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </nav>
  );
}

export default NavBar;
