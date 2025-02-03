import { createContext, ReactNode, useEffect, useState } from "react";
import { Country } from "../types/customTypes";

type CountriesContextProviderProps = {
  children: ReactNode;
};

type CountriesContextType = {
  countriesList: Country[] | null;
  url:string
  getCountries:(url:string)=>void;
};

const contextInitialValue:CountriesContextType = {
    countriesList: null,
    url:"",
    getCountries:()=>{throw new Error("Context not initialised")}
}

export const CountriesContext = createContext<CountriesContextType>(
  contextInitialValue
);

export const CountriesContextProvider = ({
  children,
}: CountriesContextProviderProps) => {
  const url = "https://restcountries.com/v3.1/all";

  const [countriesList, setCountriesList] = useState<Country[] | null>(null);

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

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <CountriesContext.Provider value={{countriesList,url,getCountries}}>{children}</CountriesContext.Provider>
  );
};
