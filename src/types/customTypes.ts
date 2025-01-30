export type Country = {
    borders: string[];
    capital: string[];
    continents: string[];
    currencies: Currency;
    fifa: string;
    flag: string;
    flags: Flag;
    independent: boolean;
    landlocked: boolean;
    languages: object;
    maps: Map;
    name: Name;
    population: number;
    region: string;
    startOfWeek : string;
    timezones: string[];
    
  };
  export type Map = { googleMaps: string; openStreetMaps: string };

  export type Currency = {name: string; symbol: string}

  export type Name = {common: string; official: string}

  export type Flag = {alt: string; png: string; svg: string}

  export type User = {
    username: string;
    email: string
  }

  
