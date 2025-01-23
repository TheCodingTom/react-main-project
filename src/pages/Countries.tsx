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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setUserSearch(e.target.value);
  };

  const filteredCountries = countriesList?.filter((country) => {
    return country.name.common.toLowerCase().includes(userSearch.toLowerCase());
  });

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div>
      <h1>World Countries App</h1>

      <Search handleInputChange={handleInputChange} />
      <div>
        {filteredCountries && <Grid countriesList={filteredCountries} />}
      </div>
    </div>
  );
}

export default Countries;
