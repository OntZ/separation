
// Import Reducer type
import { Reducer } from 'redux';
import {
  MovieActions,
  MovieActionTypes,
} from '../actions/MovieActions';

// Define the Movie type
export interface IMovie {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

// Define the Movie State
export interface IMovieState {
  readonly movies: IMovie[];
}

// Define the initial state
const initialMoviesState: IMovieState = {
  movies: [],
};

export const characterReducer: Reducer<IMovieState, MovieActions> = (
  state = initialMoviesState,
  action
) => {
  switch (action.type) {
    case MovieActionTypes.GET_ALL: {
      return {
        ...state,
        movies: action.movies,
      };
    }
    default:
      return state;
  }
};