import { Button, Card, CardActionArea, CardActions, CardMedia, Typography } from '@mui/material'
import { Country } from "../types/userTypes";


type CountryCardProps = {
    country: Country
}

function CountryCard({country}: CountryCardProps) {
  return (
    <div className='card-container'>
      <Card variant="outlined" className='mycard' sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            sx={{ width: 300, height: 190 }}
            
            image={country.flags.svg}
            alt={country.flags.alt}
          />
          </CardActionArea>
          
            <Typography gutterBottom variant="h5" component="div">
              {country.name.common}
            </Typography>
           
          
        
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