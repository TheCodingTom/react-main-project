// import React from 'react'

import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const Home = () => {

  const {user} = useContext(AuthContext)
  return (
    <div>
        {user ? <h1>Welcome, {user.email}!</h1> : <h1>Welcome, friend!</h1>}
    </div>
  )
}

export default Home