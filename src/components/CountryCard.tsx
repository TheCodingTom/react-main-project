import {
  Card,
  CardActions,
  CardMedia,
  // Tooltip,
  Typography,
} from "@mui/material";
import { Country } from "../types/userTypes";
// import InfoIcon from "@mui/icons-material/Info";
// import ModalCard from './ModalCard';

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

      <CardActions>
        {/* <Tooltip title="Add" placement="top">
            <Button>top</Button>
          
          </Tooltip> */}
      </CardActions>
    </Card>
  );
}

export default CountryCard;
