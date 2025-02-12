
import { Country } from "../types/customTypes";
import { Link } from "react-router";
import { Button, Card } from "react-bootstrap";

type CountryCardProps = {
  country: Country;
};

function CountryCard({ country }: CountryCardProps) {
  return (

    <div>
      <Card className="country-card" style={{ width: '18rem' }}>
        <div className="card-image">
        <Card.Img  src={country.flags.svg} style={{height: 190, objectFit:"cover"}}
        alt={country.flags.alt} />
        </div>
      
      <Card.Body className="card-data">
        <Card.Title>{country.name.common}</Card.Title>

        <Link to={`${country.name.common}`}>
        <Button variant="primary">Discover more</Button></Link>
        
      </Card.Body>
    </Card> 
    </div>
    

    
  );
}

export default CountryCard;
