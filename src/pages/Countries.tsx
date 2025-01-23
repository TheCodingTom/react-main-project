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

  const getCountries = async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      setCountriesList(result);
    } catch (error) {
      console.log("error in the fetch:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
