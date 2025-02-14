import { Country } from "../types/customTypes";
import { Link, useParams } from "react-router";
import { Button, Card } from "react-bootstrap";
import styles from "../styles/countrycard.module.css";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

type CountryCardProps = {
  country: Country;
};

function CountryCard({ country }: CountryCardProps) {
  const {user} = useContext(AuthContext)
  const { countryName } = useParams<string>();
  const addLikeDoc = async () => {


    
    if (user && country.name.common) {
      try {
        const likeRef = doc(db, "likes", user.id, "countries", country.flag);
        const userLike = {
          isLiked: true
        }
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

          <Link to={`${country.name.common}`}>
            <Button variant="primary">Discover more</Button>
          </Link>
          <Button onClick={addLikeDoc} variant="primary">Like</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CountryCard;
