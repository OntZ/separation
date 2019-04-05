// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

// Import Character Typing
import { IMovie, IMovieState } from '../reducers/MovieReducer';

// Create Action Constants
export enum MovieActionTypes {
  GET_ALL = 'GET_ALL',
}

// Interface for Get All Action Type
export interface IMovieGetAllAction {
  type: MovieActionTypes.GET_ALL;
  movies: IMovie[];
}

/* 
Combine the action types with a union (we assume there are more)
example: export type CharacterActions = IGetAllAction | IGetOneAction ... 
*/
export type MovieActions = IMovieGetAllAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAllMovies: ActionCreator<
  ThunkAction<Promise<any>, IMovieState, null, IMovieGetAllAction>
> = () => {
  return async (dispatch: Dispatch) => {
    try {
      console.log('samsibagpula');
      const response = await axios.get('https://swapi.co/api/people/', {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(response.data.results);
      dispatch({
        movies: response.data.results,
        type: MovieActionTypes.GET_ALL,
      });
    } catch (err) {
      console.error(err);
    }
  };
};