// import React from 'react'

import { useEffect } from "react";

function Countries() {

  const getCountries = () => {
    fetch("https://restcountries.com/v3.1/all").then((response) => {
      return response.json()
    }).then((result) => {
      console.log(result);
      
    })
  }

  useEffect(() => {
    getCountries()
  }, [])
  
 
  return (
    <div>
      <h1>World Countries App</h1>
    </div>
  )
}

export default Countries
