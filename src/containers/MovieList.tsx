
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux'

import { IAppState } from '../store/Store';
import { IMovie } from '../reducers/MovieReducer';
import { Autocomplete } from '../components/Autocomplete';
import { MovieActionTypes, MovieActions } from '../actions/MovieActions';

// Create the containers interface
interface IMovieListProps {
  movies: IMovie[];
  firstSelectedMovie?: IMovie;
  secondSelectedMovie?: IMovie;
  selectFirstMovie: (movie: IMovie) => void;
  selectSecondMovie: (movie: IMovie) => void;
}

export class MovieList extends React.Component<IMovieListProps> {
  public render() {
    return (
      <>
        {this.props.movies
          ? <div className="inner-grid-8">
              <div className="col-lg-2 col-md-3 col-sm-12">
                <Autocomplete<IMovie>
                  value={this.props.firstSelectedMovie}
                  options={this.props.movies}
                  valueSelected={this.props.selectFirstMovie}
                  labelKey='title'
                  label="Choose a movie"
                  />
              </div>
              <div className="col-lg-4 col-md-2 bottom-spacing"/>
              <div className="col-lg-2 col-md-3 col-sm-12">
                <Autocomplete<IMovie>
                  value={this.props.secondSelectedMovie}
                  options={this.props.movies}
                  valueSelected={this.props.selectSecondMovie}
                  labelKey='title'
                  label="Choose another movie"
                />
              </div>
              <div className="col-lg-12 bottom-spacing"></div>
              <div className="col-lg-12">
                {JSON.stringify(this.props.firstSelectedMovie, null, 4)}
                {JSON.stringify(this.props.secondSelectedMovie, null, 4)}
              </div>
            </div>
          : <div>loading movies...</div>
        }
      </>
    );
  }
}

// Grab the movies from the store and make them available on props
const mapStateToProps = (store: IAppState) => {
  return {
    movies: store.moviesState.movies,
    firstSelectedMovie: store.moviesState.firstSelectedMovie,
    secondSelectedMovie: store.moviesState.secondSelectedMovie
  };
};

const mapDispatchToProps = (dispatch: Dispatch<MovieActions>) => ({
  selectFirstMovie: (movie: IMovie) => {
    dispatch({
      type: MovieActionTypes.SELECT_FIRST,
      firstSelectedMovie: movie
    })
  },
  selectSecondMovie: (movie: IMovie) => {
    dispatch({
      type: MovieActionTypes.SELECT_SECOND,
      secondSelectedMovie: movie
    })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);