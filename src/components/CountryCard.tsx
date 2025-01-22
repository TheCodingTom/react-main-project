import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { Country } from "../types/userTypes";


type CountryCardProps = {
    country: Country
}

function CountryCard({country}: CountryCardProps) {
  return (
    <div className='card-container'>
      <Card className='mycard' sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={country.flags.svg}
            alt={country.flags.alt}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {country.name.common}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Capital: {country.capital}

            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Discover more
          </Button>
        </CardActions>
      </Card>
    </div>
    
  )
}

export default CountryCard