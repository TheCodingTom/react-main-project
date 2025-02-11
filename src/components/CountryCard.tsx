import { Button, Card, CardMedia, Typography } from "@mui/material";
// import { Button, Card } from "react-bootstrap";
import { Country } from "../types/customTypes";
import { Link } from "react-router";
import { Heart } from 'react-bootstrap-icons';


type CountryCardProps = {
  country: Country;
};




function CountryCard({ country }: CountryCardProps) {
  return (
    <Card className="mycard" sx={{ maxWidth: 345 }}>
      <CardMedia
        className="card-image"
        component="img"
        sx={{ width: 300, height: 190 }}
        image={country.flags.svg}
        alt={country.flags.alt}
      />

      <div className="card-title">
        <Typography gutterBottom variant="h5">
          {country.name.common} <Heart/>
        </Typography>
        
      </div>

      <div>
        <Link to={`${country.name.common}`}>
          <Button>Discover more</Button>
        </Link>
        
      </div>
    </Card>
  );
}

export default CountryCard;
