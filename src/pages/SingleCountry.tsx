import {  useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Country } from "../types/customTypes";

import styles from "../styles/singlecountry.module.css";
import Chat from "../components/Comments";
import { Col, Container, Row } from "react-bootstrap";
import NoMatchPage from "./NoMatchPage";




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


function SingleCountry() {
  const { countryName } = useParams<string>();

  const redirect = useNavigate()

  
 
  const [wikiData, setWikiData] = useState<WikiData | null>(null);
  const [countryData, setCountryData] = useState<Country | null>(null);
  // const [messages, setMessages] = useState<MessageType[] | null>(null);
  // const [messageText, setMessageText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const [pixabayData, setPixabayData] = useState<PixabayData[] | null>(null);

  const WikiUrl =
    `https://en.wikipedia.org/api/rest_v1/page/summary/${countryName}`; 

  const restCountriesUrl = `https://restcountries.com/v3.1/name/${countryName}`;

  const pixabayUrl = `https://pixabay.com/api/?key=48499188-4a0bbbaf9b13a582b53d5d561&q=city+landscape+${countryName}&image_type=photo&pretty=true&per_page=10`;


  if (!countryName || countryName.trim() === "") {
    return <h2>Please enter a valid country name.</h2>;
  }


  const getWikiData = async () => {
    try {
      const response = await fetch(WikiUrl);
      if (response.status === 404) {
        redirect("/") // Redirect to home
        return;
      }
      if (!response.ok) throw new Error("Wikipedia data not found");

      const result = await response.json();
      setWikiData(result);
    } catch (error) {
      setError("Failed to fetch Wikipedia data.");
      console.error("Error fetching Wikipedia data:", error);
    }
  };


  const getCountryData = async () => {
    try {
      const response = await fetch(restCountriesUrl);

      if (response.status === 404) {
        redirect("/") // Redirect to home
        return;
      }
      if (!response.ok) throw new Error("Wikipedia data not found");
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

  useEffect(() => {
    if (!countryName) return;

    setError(null);
    getWikiData();
    getCountryData();
    getPixabayData();
  }, [countryName]);

  return (
    <div>
      <h1>{wikiData?.title}</h1>

      <Container>
        <Row>
          <Col className={styles.countryDetails}>
            <img className={styles.flag} src={countryData?.flags.png} alt={`flag of ${countryName}`} />
            <h4>Capital: {countryData?.capital} </h4>
            <h4>Continent: {countryData?.region} </h4>
            <h4>Population: {countryData?.population.toLocaleString()} </h4>
            <>Description: {wikiData?.extract} </>
          </Col>
          <Col >
            <Chat />
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
