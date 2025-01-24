// import React from 'react'

import { Link } from "react-router";

type Props = {};

const NavBar = (props: Props) => {
  return (
    <nav className="nav-bar">
      <Link to={"/"}>Home</Link>
      <Link to={"/countries"}>Countries</Link>
      <Link to={"/contact"}>Contact</Link>
    </nav>
  );
};

export default NavBar;
