import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Country } from "../types/customTypes";
import styles from "../styles/singlecountry.module.css";


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
  previewURL: string;
  webformatURL: string;
};

function SingleCountry() {
  const { countryName } = useParams();
  const [wikiData, setWikiData] = useState<WikiData | null>(null);
  const [countryData, setCountryData] = useState<Country | null>(null);

  const [pixabayData, setPixabayData] = useState<PixabayData[] | null>(null);

  const WikiUrl =
    "https://en.wikipedia.org/api/rest_v1/page/summary/" + countryName; // è, ì, ù fetching info

  const restCountriesUrl = "https://restcountries.com/v3.1/name/" + countryName;

  const pixabayUrl = `https://pixabay.com/api/?key=48499188-4a0bbbaf9b13a582b53d5d561&q=city+landscape+${countryName}&image_type=photo&pretty=true&per_page=10`;

  const getWikiData = async () => {
    try {
      const response = await fetch(WikiUrl);
      const result = await response.json(); // add as plus type
      // console.log(result);
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

  useEffect(() => {
    getWikiData();
    getCountryData();
    getPixabayData();
  }, []);

  return (
    <div>
      <h1>{wikiData?.title}</h1>

     
      <div>
        <img className={styles.image} src={countryData?.flags.png} alt="" />

        <p>Capital: {countryData?.capital} </p>
        <p>Continent: {countryData?.region} </p>
        <p>Population: {countryData?.population} </p>
      </div>

      <p>Description: {wikiData?.extract} </p>

      <h2>Gallery</h2>

      <div className="gallery-container">
      {pixabayData &&
        pixabayData.map((item) => {
          return (
            <div>
              <img className="gallery-pic" src={item.webformatURL} alt={"picture of" + {countryName}}/>
            </div>
          );
        })}

      </div>


      

      
    </div>
  );
}

export default SingleCountry;
