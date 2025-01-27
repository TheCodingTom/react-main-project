import { Button, Card, CardMedia, Typography } from "@mui/material";
import { Country } from "../types/userTypes";

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
          {country.name.common}
        </Typography>
      </div>

      <Button>Discover more</Button>
    </Card>
  );
}

export default CountryCard;
