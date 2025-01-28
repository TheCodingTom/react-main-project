import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Country } from "../types/userTypes";

type WikiData = {
  description: string;
  extract: string;
  originalimage: Image;
  title: string;
};

type Image = { height: number; source: string; width: number };

function SingleCountry() {
  const { countryName } = useParams();
  const [wikiData, setWikiData] = useState<WikiData | null>(null);
  const [countryData, setCountryData] = useState<Country | null>(null);

  const WikiUrl =
    "https://en.wikipedia.org/api/rest_v1/page/summary/" + countryName; // è, ì, ù fetching info

  const restCountriesUrl = "https://restcountries.com/v3.1/name/" + countryName;

  const pixabayUrl = `https://pixabay.com/api/?key=48499188-4a0bbbaf9b13a582b53d5d561&q=${countryName}&image_type=photo&pretty=true`

  const getWikiData = async () => {
    try {
      const response = await fetch(WikiUrl);
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
      const result = await response.json();
      console.log(result);
      
    } catch (error) {
      console.log("error in the fetch:", error);
    }
  };

  useEffect(() => {
    getWikiData();
    getCountryData();
    getPixabayData()
  }, []);

  return (
    <div>
      <h1>{wikiData?.title}</h1>

      <img src={countryData?.flags.png} alt="" />
      {/* <div className="detail-container"> */}
      <h2>Description: {wikiData?.extract} </h2>
      {/* <img src={wikiData?.originalimage.source} alt="flag or image of a country" /> */}
      <h3>Continent: {countryData?.region} </h3>


      
    </div>
  );
}

export default SingleCountry;
