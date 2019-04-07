
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
  readonly firstSelectedMovie?: IMovie;
  readonly secondSelectedMovie?: IMovie;
  readonly connection?: string;
}

// Define the initial state
const initialMoviesState: IMovieState = {
  movies: [],
};

export const movieReducer: Reducer<IMovieState, MovieActions> = (
  state = initialMoviesState,
  action
): IMovieState => {
  switch (action.type) {
    case MovieActionTypes.GET_ALL: {
      return {
        ...state,
        movies: action.movies,
      };
    }
    case MovieActionTypes.SELECT_FIRST: {
      return {
        ...state,
        firstSelectedMovie: action.firstSelectedMovie,
      };
    }
    case MovieActionTypes.SELECT_SECOND: {
      return {
        ...state,
        secondSelectedMovie: action.secondSelectedMovie,
      };
    }
    case MovieActionTypes.COMPUTE_CONNECTION: {
      return {
        ...state,
        connection: computeConnectionFromState({...state})
      };
    }
    default:
      return state;
  }
};

const computeConnectionFromState = (state: IMovieState) => {
  if (state.firstSelectedMovie && state.secondSelectedMovie) {
  //   const m1 = state.firstSelectedMovie
  //   const m2 = state.secondSelectedMovie
  //   state.movies.forEach(movie => {

  //   })
    return 'You have successfully selected two movies. Follow us on Twitter to get the latest news on connection calculations and more!'
  }

  return 'Please select two movies to see their connection.';
}