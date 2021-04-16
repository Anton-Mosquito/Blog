export interface IFilmsOriginal {
  Response: string;
  totalResults: string;
  Search: Array<IFilm>;
}

export interface IFilms {
  totalResults: string;
  Search: Array<IFilm>;
}

export interface IFilm {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export interface IFilmDetail {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: Array<IRaiting>;
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}

interface IRaiting {
  Source: string;
  Value: string;
}
