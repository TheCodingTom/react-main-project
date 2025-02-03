// import React from 'react'

import { useContext, useEffect, useState } from "react";
// import { Country } from "../types/customTypes";
import Grid from "../components/Grid";
import Search from "../components/Search";
import { CountriesContext } from "../context/CountriesContext";

function Countries() {
  const { countriesList, url, getCountries } = useContext(CountriesContext);
  // const [countriesList, setCountriesList] = useState<Country[] | null>(null);
  // const [countriesList, setCountriesList] = useState<Country[]>([] as Country[]); - another way

  const [userSearch, setUserSearch] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserSearch(e.target.value);
  };

  const filteredCountries = countriesList?.filter((country) => {
    return country.name.common.toLowerCase().includes(userSearch.toLowerCase());
  });

  useEffect(() => {
    getCountries(url);
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
