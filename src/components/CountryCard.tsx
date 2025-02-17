import { Country } from "../types/customTypes";
import { Link } from "react-router";
import { Button, Card } from "react-bootstrap";
import styles from "../styles/countrycard.module.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

type CountryCardProps = {
  country: Country;
};

function CountryCard({ country }: CountryCardProps) {
  const { user } = useContext(AuthContext);
  const addLikeDoc = async () => {
    if (user && country.name.common) {
      try {
        const likeRef = doc(
          db,
          "likes",
          user.id,
          "countries",
          country.name.common
        );
        const userLike = {
          isLiked: true,
        };
        await setDoc(likeRef, userLike);
        console.log("Liked:", country.name.common);
      } catch (error) {
        console.error("Error liking country:", error);
      }
    }
  };

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
            {user ? (
              <Button onClick={addLikeDoc} variant="primary">
                Like
              </Button>
            ) : (
              ""
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CountryCard;
