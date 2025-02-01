// import React from 'react'

import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router";
// import { AuthContext } from "../context/AuthContext";
// import { ThemeContext } from "../context/ThemeContext";

function NavBar() {
  // const { user, login, logout } = useContext(AuthContext);
  // const { toggleDarkMode } = useContext(ThemeContext);

  const drawerWidth = 240;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        CIAO
      </Typography>
      <Divider />
      <List>
        <ListItem >
          <NavLink style={{ textDecoration: "none", color: "black" }} to={"/"}>
            Home
          </NavLink>
        </ListItem>
        <ListItem >
          <NavLink style={{ textDecoration: "none", color: "black" }} to={"/countries"}>
            Countries
          </NavLink>
        </ListItem>
        <ListItem >
          <NavLink style={{ textDecoration: "none", color: "black" }} to={"/register"}>
            Register
          </NavLink>
        </ListItem>
        <ListItem >
          <NavLink style={{ textDecoration: "none", color: "black" }} to={"/login"}>
            Login
          </NavLink>
        </ListItem>
        <ListItem >
          <NavLink style={{ textDecoration: "none", color: "black" }} to={"/chat"}>
            Chat
          </NavLink>
        </ListItem>
      </List>
    </Box>
  );

  const myStyle = {
    marginBottom: "12vh"
  }

  return (
    <>
      <Box style={myStyle} sx={{ display: "flex" }}>
        <CssBaseline  />
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              MUI
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Button sx={{ color: "#fff" }}>
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  to={"/"}
                >
                  Home
                </NavLink>
              </Button>
              <Button sx={{ color: "#fff" }}>
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  to={"/countries"}
                >
                  Countries
                </NavLink>
              </Button>
              <Button sx={{ color: "#fff" }}>
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  to={"/register"}
                >
                  Register
                </NavLink>
              </Button>
              <Button sx={{ color: "#fff" }}>
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  to={"/login"}
                >
                  Login
                </NavLink>
              </Button>
              <Button sx={{ color: "#fff" }}>
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  to={"/chat"}
                >
                  Chat
                </NavLink>
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}

export default NavBar;
