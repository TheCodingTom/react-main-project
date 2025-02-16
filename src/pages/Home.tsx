// import React from 'react'

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

import logo from "../images/logo.png";
import SignModal from "../components/SignModal";
import { isUserLogged } from "../utils/AuthUtility";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import CircularText from "../components/CircularText";
import { NavLink } from "react-bootstrap";
import { Link } from "react-router";
import styles from "../styles/home.module.css"


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
    <div className={styles.container}>
      {user ? <h1>Welcome, {username}!</h1> : <h1>Welcome, friend!</h1>}
      <div className={styles.logoTextContainer}>
        <CircularText
          text="TRAVEL*AROUND*THE*WORLD*"
          onHover="speedUp"
          spinDuration={30}
          className={styles.customClass}
        />
 
        <img src={logo} className={styles.logo} alt="image of a globe" />
       
      </div>
      <p>Do you want to discover more about the countries in the world?</p>
      
      {isAuth
        ? <NavLink to={"/countries"} as={Link}><p className={styles.CTA}>Let's go!</p></NavLink>
        : <SignModal />}
      
    </div>
  );
};

export default Home;
