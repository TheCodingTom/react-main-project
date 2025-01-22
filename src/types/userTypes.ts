export type Country = {
    capital: string[];
    continents: string[];
    currencies: Currency;
    flag: string;
    flags: object;
    independent: boolean;
    languages: object;
    maps: Map;
    name: Name;
    population: number;
    region: string;
    timezones: string[];
  };
  export type Map = { googleMaps: string; openStreetMaps: string };

  export type Currency = {name: string; symbol: string}

  export type Name = {common: string; official: string}
