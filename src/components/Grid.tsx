// import React from "react";
import CountryCard from "./CountryCard";
import { Country } from "../types/customTypes";
import TiltedCard from "./TiltedCard";

type GridProps = {
  countriesList: Country[];
};

const Grid = ({ countriesList }: GridProps) => {
  // {countriesList} because of destructuring
  return (
    <div className="cards-container">
      {countriesList &&
        countriesList.map((country) => {
          return <TiltedCard country={country} key={country.flag}
          imageSrc={country.flags.svg}
          altText=""
          captionText="click for more info"
          containerHeight="200px"
          containerWidth="300px"
          imageHeight="200px"
          imageWidth="300px"
          rotateAmplitude={12}
          scaleOnHover={1.2}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
          overlayContent={
            <p className="tilted-card-demo-text">
              {country.name.common}
            </p>
          }
        />;
        })}
    </div>
  );
};

export default Grid;
