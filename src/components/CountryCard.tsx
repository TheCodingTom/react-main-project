import { Country } from "../types/customTypes";
import { Link } from "react-router";
import { Button, Card } from "react-bootstrap";
import styles from "../styles/countrycard.module.css";

type CountryCardProps = {
  country: Country;
};

function CountryCard({ country }: CountryCardProps) {
  return (
    <div>
      <Card className={styles.countryCard} style={{ width: "18rem" }}>
        <div className={styles.cardImage}>
          <Card.Img
            src={country.flags.svg}
            style={{ height: 190, objectFit: "cover" }}
            alt={country.flags.alt}
          />
        </div>

        <Card.Body className={styles.cardData}>
          <Card.Title>{country.name.common}</Card.Title>

          <div className={styles.cardButtons}>
            <Link to={`${country.name.common}`}>
              <Button variant="primary">Discover more</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CountryCard;
