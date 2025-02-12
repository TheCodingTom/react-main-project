// import React from 'react'

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import logo from "../images/logo.png";
import SignModal from "../components/SignModal";
import { isUserLogged } from "../utils/AuthUtility";


const Home = () => {
  const { user } = useContext(AuthContext);
  const isAuth = isUserLogged(user)

  return (
    <div className="home-container">
      {user ? <h1>Welcome, {user.email}!</h1> : <h1>Welcome, friend!</h1>}
      {isAuth
        ? ""
        : "Do you want to discover more about the countries in the world?"}
      <img src={logo} className="logo" alt="" />

      {isAuth ? <p>Travel around the world with this web app!</p> : <SignModal />}
    </div>
  );
};

export default Home;
