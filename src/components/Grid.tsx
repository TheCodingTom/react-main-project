
// import React from "react";
import CountryCard from "./CountryCard";
import { Country } from "../types/userTypes";

type GridProps = {
    countriesList: Country[]
};

const Grid = ({countriesList}: GridProps) => {
  return (
    <div className="card-container">
        {countriesList &&
            countriesList.map((country) => {
              return <CountryCard country={country} key={country.flag} />;
            })}
    </div>
  );
};

export default Grid;
