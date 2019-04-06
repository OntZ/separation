// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

// Import Character Typing
import { IMovie, IMovieState } from '../reducers/MovieReducer';

// Create Action Constants
export enum MovieActionTypes {
  GET_ALL = 'GET_ALL',
  SELECT_FIRST = 'SELECT_FIRST',
  SELECT_SECOND = 'SELECT_SECOND'
}

// Interface for Get All Action Type
export interface IMovieGetAllAction {
  type: MovieActionTypes.GET_ALL;
  movies: IMovie[];
}

export interface IFirstMovieSelectAction {
  type: MovieActionTypes.SELECT_FIRST;
  firstSelectedMovie: IMovie;
}

export interface ISecondMovieSelectAction {
  type: MovieActionTypes.SELECT_SECOND;
  secondSelectedMovie: IMovie;
}

/*
Combine the action types with a union (we assume there are more)
example: export type CharacterActions = IGetAllAction | IGetOneAction ...
*/
export type MovieActions = IMovieGetAllAction | IFirstMovieSelectAction | ISecondMovieSelectAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAllMovies: ActionCreator<
  ThunkAction<Promise<any>, IMovieState, null, IMovieGetAllAction>
> = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get('https://s3.eu-west-2.amazonaws.com/cognitionx-assets/movies.json', {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      dispatch({
        movies: response.data,
        type: MovieActionTypes.GET_ALL,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const selectFirstMovie: ActionCreator<
  ThunkAction<void, IMovieState, null, IFirstMovieSelectAction>
> = (movie: IMovie) => {
  return (dispatch: Dispatch) => {
    dispatch({
      firstSelectedMovie: movie,
      type: MovieActionTypes.SELECT_FIRST,
    });
  };
};

export const selectSecondMovie: ActionCreator<
  ThunkAction<void, IMovieState, null, IFirstMovieSelectAction>
> = (movie: IMovie) => {
  return (dispatch: Dispatch) => {
    dispatch({
      secondSelectedMovie: movie,
      type: MovieActionTypes.SELECT_SECOND,
    });
  };
};