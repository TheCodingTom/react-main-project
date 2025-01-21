import React from 'react'

function Countries() {

  const getData = () => {
    fetch("https://restcountries.com/v3.1/all").then((response) => {
      return response.json()
    }).then((result) => {
      console.log(result);
      
    })
  }
  getData()
  return (
    <div>
      <h1>World Countries App</h1>
    </div>
  )
}

export default Countries
