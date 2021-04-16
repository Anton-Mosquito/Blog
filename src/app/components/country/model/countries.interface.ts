export interface ICountries{
  alpha2Code: string;
  alpha3Code: string;
  altSpellings: string[];
  area: number;
  borders: string[];
  callingCodes: string[];
  capital: string;
  cioc: string;
  currencies: Array<ICurrency>;
  demonym: string;
  flag: string;
  gini: number;
  languages: Array<ILanguage>;
  latlng: number[];
  name: string;
  numericCode: string;
  population: number;
  region: string;
  regionalBlocs: Array<IRegionBlock>;
  subregion: string;
  timezones: string[];
  topLevelDomain: string[];
  translations: ITrtranslations;
}


interface ICurrency {
  code:string;
  name: string;
  symbol: string;
}

interface ILanguage {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}

interface IRegionBlock {
  acronym: string;
  name: string;
  otherAcronyms: [];
  otherNames: [];
}

interface ITrtranslations {
  [key: string]: string;
}
