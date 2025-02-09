// import React from 'react'

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../components/globe.svg";
import SignModal from "../components/SignModal";

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="home-container">
      {user ? <h1>Welcome, {user.email}!</h1> : <h1>Welcome, friend!</h1>}
      {user
        ? ""
        : "Do you want to discover more about the countries in the world?"}
      <img src={logo} className="logo" alt="" />

      {user ? <p>Travel around the world with this web app!</p> : <SignModal />}
    </div>
  );
};

export default Home;
