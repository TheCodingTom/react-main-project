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
    "https://en.wikipedia.org/api/rest_v1/page/summary/" + countryName;

  const restCountriesUrl = "https://restcountries.com/v3.1/name/" + countryName;

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
      console.log(countryData);
      
    
    } catch (error) {
      console.log("error in the fetch:", error);
    }
  };

  useEffect(() => {
    getWikiData();
    getCountryData();
  }, []);

  return (
    <div>
      <h1>{wikiData?.title}</h1>
      {/* <div className="detail-container"> */}
      <h2>Description: {wikiData?.extract} </h2>
      {/* <img src={wikiData?.originalimage.source} alt="flag or image of a country" /> */}
      <h3>here: {countryData?.region} </h3>
      
    </div>
  );
}

export default SingleCountry;
