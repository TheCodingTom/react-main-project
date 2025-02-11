// import React from "react";
import CountryCard from "./CountryCard";
import { Country } from "../types/customTypes";

type GridProps = {
  countriesList: Country[];
};

const Grid = ({ countriesList }: GridProps) => {
  // {countriesList} because of destructuring
  return (
    <div className="cards-container">
      {countriesList &&
        countriesList.map((country) => {
          return <CountryCard country={country} key={country.flag} />;
        })}
    </div>
  );
};

export default Grid;
