
// Import Reducer type
import { Reducer } from 'redux';
import {
  MovieActions,
  MovieActionTypes,
} from '../actions/MovieActions';

// Define the Movie type
export interface IMovie {
  title: string;
  cast: string[];
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