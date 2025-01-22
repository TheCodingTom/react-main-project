// import React from 'react'

import { useEffect, useState } from "react";
import { Country } from "../types/userTypes";
import CountryCard from "../components/CountryCard";



const url = "https://restcountries.com/v3.1/all";

function Countries() {
  const [countriesList, setCountriesList] = useState<Country[] | null>(null);
  // const [countriesList, setCountriesList] = useState<Country[]>([] as Country[]); - another way

  const getCountries = () => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const countriesArray = data as Country[];
        setCountriesList(countriesArray);
      });
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div>
      <h1>World Countries App</h1>

      <div>
      {countriesList && countriesList.map((country) => {
        return <CountryCard country={country} key={country.flag} />
      })}
      </div>

      
    </div>
  );
}

export default Countries;
