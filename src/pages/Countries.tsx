// import React from 'react'

import { useEffect, useState } from "react";
import { Country } from "../types/userTypes";
import Grid from "../components/Grid";
import Search from "../components/Search";

const url = "https://restcountries.com/v3.1/all";

function Countries() {
  const [countriesList, setCountriesList] = useState<Country[] | null>(null);
  // const [countriesList, setCountriesList] = useState<Country[]>([] as Country[]); - another way

  const [userSearch, setUserSearch] = useState("");

  // const getCountries = () => {
  //   fetch(url)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       const countriesArray = data as Country[];
  //       setCountriesList(countriesArray);
  //     });
  // };

  const getCountriesAsync = async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      return result
    } catch (error) {
      console.log(error);
    }
   
  };

  const getResults = async () => {
    const countries = await getCountriesAsync()
    console.log(countries);
    setCountriesList(countries)
  }


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setUserSearch(e.target.value);
  };

  const filteredCountries = countriesList?.filter((country) => {
    return country.name.common.toLowerCase().includes(userSearch.toLowerCase());
  });

  useEffect(() => {
    getResults()
  }, []);

  return (
    <div>
      <div className="top-container">
        <h1>World Countries App</h1>

        <Search handleInputChange={handleInputChange} />
      </div>

      <div>
        {filteredCountries && <Grid countriesList={filteredCountries} />}
      </div>
    </div>
  );
}

export default Countries;
