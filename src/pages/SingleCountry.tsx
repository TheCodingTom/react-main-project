import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Country } from "../types/customTypes";

import styles from "../styles/singlecountry.module.css";
import Chat from "../components/Comments";
import { Col, Container, Row } from "react-bootstrap";

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
  const [wikiData, setWikiData] = useState<WikiData | null>(null);
  const [countryData, setCountryData] = useState<Country | null>(null);
  const [pixabayData, setPixabayData] = useState<PixabayData[] | null>(null);

  const WikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${countryName}`;

  const restCountriesUrl = `https://restcountries.com/v3.1/name/${countryName}`;

  const pixabayUrl = `https://pixabay.com/api/?key=48499188-4a0bbbaf9b13a582b53d5d561&q=city+landscape+${countryName}&image_type=photo&pretty=true&per_page=10`;

  const redirect = useNavigate();

  const getWikiData = async () => {
    try {
      const response = await fetch(WikiUrl);
      if (response.status === 404) {
        redirect("/"); // Redirect to home
        return;
      }
      if (!response.ok) throw new Error("Wikipedia data not found");

      const result = await response.json();
      console.log(result);
      setWikiData(result);
    } catch (error) {
      console.log("error in the fetch:", error);
    }
  };

  const getCountryData = async () => {
    try {
      const response = await fetch(restCountriesUrl);

      if (response.status === 404) {
        redirect("/"); // Redirect to home
        return;
      }
      if (!response.ok) throw new Error("country data not found");

      const result = await response.json();

      const countryNames = result.map((country: any) =>
        country.name.common.toLowerCase()
      );

      if (countryName && !countryNames.includes(countryName.toLowerCase())) {
        redirect("/"); // fixes "è", "à" fetch
      }

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
    getWikiData();
    getCountryData();
    getPixabayData();
  }, []);

  return (
    <div>
      <h1>{wikiData?.title}</h1>

      <div className={styles.topContainer}>
        <Container>
          <Row>
            <Col className={styles.countryDetails}>
              <img
                className={styles.flag}
                src={countryData?.flags.png}
                alt={`flag of ${countryName}`}
              />
              <h4>Capital: {countryData?.capital} </h4>
              <h4>Continent: {countryData?.region} </h4>
              <h4>Population: {countryData?.population.toLocaleString()} </h4>
              <p>Extract: {wikiData?.extract} </p>
            </Col>
            <Col>
              <Chat />
            </Col>
          </Row>
        </Container>
      </div>

      <h2>Gallery</h2>

      <div className={styles.container}>
        {pixabayData &&
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
