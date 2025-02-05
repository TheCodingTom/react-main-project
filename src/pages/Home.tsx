// import React from 'react'

import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import logo from "../components/globe.svg"

const Home = () => {

  const {user} = useContext(AuthContext)
  return (
    <div className="home-container">
        {user ? <h1>Welcome, {user.email}!</h1> : <h1>Welcome, friend!</h1>}

        <img src={logo} className="logo" alt="" />
    </div>
  )
}

export default Home