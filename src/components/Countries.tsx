// import React from 'react'

import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function Countries() {

  const [countries, setCountries] = useState([])

  const getCountries = () => {
    fetch("https://restcountries.com/v3.1/all").then((response) => {
      return response.json()
    }).then((result) => {
      console.log(result);
      setCountries(result)
    })
  }

  useEffect(() => {
    getCountries()
  }, [])
  
 
  return (
    <div>
      <h1>World Countries App</h1>

      <div>
        {countries && countries.map((country) => {
          return  <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {country.name.common}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
          
        })}


      </div>

      <div>
      <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
      </div>
      
    </div>
  )
}

export default Countries
