// import React from 'react'

import {
  AppBar,
  Box,
  Button,

  Toolbar,
  Typography,
} from "@mui/material";

import { NavLink } from "react-router";

function NavBar() {


  const myStyle = {
    color: "black",
    backgroundColor: "white",
  };
  return (
    <nav>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar style={myStyle} className="nav-color" position="static">
          <Toolbar>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}
            <Typography className="navbar-titles" sx={{ flexGrow: 1 }}>
              <NavLink 
              style={{ textDecoration: 'none', color:"black"}}
                to={"/"}
              >
                Home
              </NavLink>
              <NavLink
                to={"/countries"}
                style={{ textDecoration: 'none', color:"black"}}
              >
                Countries
              </NavLink>
              <NavLink
                to={"/contact"}
                style={{ textDecoration: 'none', color:"black"}}
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
