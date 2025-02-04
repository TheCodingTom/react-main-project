import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Country, User } from "../types/customTypes";

import styles from "../styles/singlecountry.module.css";
import Chat from "../components/Chat";
import { Col, Container, Row } from "react-bootstrap";
import { collection, onSnapshot, query, Timestamp } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

type WikiData = {
  description: string;
  extract: string;
  originalimage: Image;
  title: string;
};

type Image = { height: number; source: string; width: number };

type PixabayResult = {
  hits: PixabayData[];
  total: number;
  totalHits: number;
};

type PixabayData = {
  id: number;
  previewURL: string;
  webformatURL: string;
};

type MessageType = {
  user: User;
  text: string;
  date: Timestamp;
  id: string;
};

function SingleCountry() {
  const { countryName } = useParams();
  const [wikiData, setWikiData] = useState<WikiData | null>(null);
  const [countryData, setCountryData] = useState<Country | null>(null);
   const [messages, setMessages] = useState<MessageType[] | null>(null);

  const [pixabayData, setPixabayData] = useState<PixabayData[] | null>(null);

  const WikiUrl =
    "https://en.wikipedia.org/api/rest_v1/page/summary/" + countryName; // è, ì, ù fetching info

  const restCountriesUrl = "https://restcountries.com/v3.1/name/" + countryName;

  const pixabayUrl = `https://pixabay.com/api/?key=48499188-4a0bbbaf9b13a582b53d5d561&q=city+landscape+${countryName}&image_type=photo&pretty=true&per_page=10`;

  const getWikiData = async () => {
    try {
      const response = await fetch(WikiUrl);
      const result = await response.json(); // add as plus type
      console.log(result);
      setWikiData(result);
    } catch (error) {
      console.log("error in the fetch:", error);
    }
  };

  const getCountryData = async () => {
    try {
      const response = await fetch(restCountriesUrl);
      const result = await response.json();
      console.log(result);
      setCountryData(result[0]);
    } catch (error) {
      console.log("error in the fetch:", error);
    }
  };

  const getPixabayData = async () => {
    try {
      const response = await fetch(pixabayUrl);
      const result = (await response.json()) as PixabayResult;
      console.log(result);
      setPixabayData(result.hits);
    } catch (error) {
      console.log("error in the fetch:", error);
    }
  };

  const getLiveMessages = () => {
    const q = query(collection(db, "chat"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesArray: MessageType[] = [];
      querySnapshot.forEach((doc) => {
        const message: MessageType = {
          text: doc.data().text,
          date: doc.data().date,
          user: doc.data().user,
          id: doc.id,
        };

        messagesArray.push(message);
        setMessages(messagesArray);
      });
    });
  };

    // const handleMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //    e.preventDefault();
     
    //    const newMessage = {
    //      text: messageText,
    //      date: new Date(),
    //      user: user,
    //    };
    //    const docRef = await addDoc(collection(db, "chat"), newMessage);
   
    //    if (!docRef) {
    //      throw new Error("something went wrong while sending the message");
    //    }
   
    //    if (docRef) {
    //      console.log("message sent successfully! ID: ", docRef.id);
    //    }
    //  };

  useEffect(() => {
    getWikiData();
    getCountryData();
    getPixabayData();
    getLiveMessages()
  }, []);

  return (
    <div>
      <h1>{wikiData?.title}</h1>

      <Container>
        <Row>
          <Col >
            <img className={styles.image} src={countryData?.flags.png} alt="" />
            <p>Capital: {countryData?.capital} </p>
            <p>Continent: {countryData?.region} </p>
            <p>Population: {countryData?.population} </p>
            <p>Description: {wikiData?.extract} </p>
          </Col>
          <Col >
            <Chat/>
          </Col>
        </Row>
      </Container>



      <h2>Gallery</h2>

      <div className={styles.container}>
        {pixabayData && // in another component to use Suspence
          pixabayData.map((item) => {
            return (
              <div key={item.id}>
                <img
                  className={styles.picture}
                  src={item.webformatURL}
                  alt={"picture of" + { countryName }}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default SingleCountry;
