// import React from "react";
import CountryCard from "./CountryCard";
import { Country } from "../types/customTypes";
import { Link } from "react-router";

type GridProps = {
  countriesList: Country[];
};

const myStyle = {
  textDecoration: "none",
}

const Grid = ({ countriesList }: GridProps) => {
  // {countriesList} because of destructuring
  return (
    <div className="cards-container">
      {countriesList &&
        countriesList.map((country) => {
          return (
            <Link style={myStyle} to={`${country.name.common}`} key={country.flag}>
              <CountryCard country={country}  />
            </Link>
          );
        })}
    </div>
  );
};

export default Grid;
