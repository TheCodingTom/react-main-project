// import React from 'react'

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

import logo from "../images/logo.png";
import SignModal from "../components/SignModal";
import { isUserLogged } from "../utils/AuthUtility";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const Home = () => {
  const { user } = useContext(AuthContext);
  const isAuth = isUserLogged(user);

  const [username, setUsername] = useState<string | null>(null);

  const getUsername = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      if (user && user.id === doc.id) {
        const displayName = doc.data().displayName;
        setUsername(displayName);

        if (!displayName) {
          setUsername("friend");
        }
      }
    });
  };

  useEffect(() => {
    getUsername();
  }, [user]); // Run the effect when the user changes

  return (
    <div className="home-container">
      {user ? <h1>Welcome, {username}!</h1> : <h1>Welcome, friend!</h1>}
      <img src={logo} className="logo" alt="" />
      {isAuth
        ? ""
        : "Do you want to discover more about the countries in the world?"}
     
      {isAuth ? (
        <p>Travel around the world with this web app!</p>
      ) : (
        <SignModal />
      )}
    </div>
  );
};

export default Home;
