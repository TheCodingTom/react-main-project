import { useEffect, useState } from "react";
import {useParams } from "react-router";


type Country = {
  description: string;
  extract: string;
  originalimage: Image;
  title: string;
};

type Image = { height: number; source: string; width: number };

function SingleCountry() {
  const { countryName } = useParams();
  const [country, setCountry] = useState<Country[] | null>(null);

  const url =
    "https://en.wikipedia.org/api/rest_v1/page/summary/" + countryName;

  const getSingleCountry = async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      setCountry(result);
    } catch (error) {
      console.log("error in the fetch:", error);
    }
  };

  useEffect(() => {
    getSingleCountry();
  }, []);

  return (
    <div>
      <h1>More info about this country: {countryName} </h1>
      <h3>More info about this country: {country.title} </h3>
    
    </div>
  );
}

export default SingleCountry;
