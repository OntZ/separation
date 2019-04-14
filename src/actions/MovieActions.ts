// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

// Import Movie Types
import { IMovie, IMovieState } from '../reducers/MovieReducer';

// Create Action Constants
export enum MovieActionTypes {
  GET_ALL = 'GET_ALL',
  SELECT_FIRST = 'SELECT_FIRST',
  SELECT_SECOND = 'SELECT_SECOND',
  COMPUTE_CONNECTION = 'COMPUTE_CONNECTION',
  THINK = 'THINK'
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

export interface IComputeConectionAction {
  type: MovieActionTypes.COMPUTE_CONNECTION;
}

export interface IThinkAction {
  type: MovieActionTypes.THINK;
}

/*
Combine the action types with a union (we assume there are more)
example: export type CharacterActions = IGetAllAction | IGetOneAction ...
*/
export type MovieActions = IMovieGetAllAction
  | IFirstMovieSelectAction
  | ISecondMovieSelectAction
  | IComputeConectionAction
  | IThinkAction;

export const getAllMovies: ActionCreator<
  ThunkAction<Promise<any>, IMovieState, null, IMovieGetAllAction>
> = () => {
  return async (dispatch: Dispatch<IMovieGetAllAction>) => {
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
