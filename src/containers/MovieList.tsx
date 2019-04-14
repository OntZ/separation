
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux'

import { IAppState } from '../store/Store';
import { IMovie } from '../reducers/MovieReducer';
import { Autocomplete } from '../components/Autocomplete';
import { MovieActionTypes, MovieActions } from '../actions/MovieActions';

export interface IMovieListProps {
  movies: IMovie[];
  firstSelectedMovie?: IMovie;
  secondSelectedMovie?: IMovie;
  selectFirstMovie: (movie: IMovie) => void;
  selectSecondMovie: (movie: IMovie) => void;
  computeConnection: (m1?: IMovie, m2?: IMovie) => string;
  connection: string;
}

export class MovieList extends React.Component<IMovieListProps> {
  public render() {
    return (
      <>
        {this.props.movies
          ? <div className="inner-grid-8">
              <div className="col-lg-2 col-md-3 col-sm-12">
                <Autocomplete<IMovie>
                  id="1"
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
                  id="2"
                  value={this.props.secondSelectedMovie}
                  options={this.props.movies}
                  valueSelected={this.props.selectSecondMovie}
                  labelKey='title'
                  label="Choose another movie"
                />
              </div>
              <div className="col-lg-12 bottom-spacing"></div>
              <div className="col-lg-12">
                <a href="#/" onClick={this.computeConnection}>Compute connection</a>
                <br/>
                <br/>
                <br/>
                {this.props.connection}
              </div>
            </div>
          : <div>loading movies...</div>
        }
      </>
    );
  }

  private computeConnection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    this.props.computeConnection()
  }
}

// Grab the movies from the store and make them available on props
const mapStateToProps = (store: IAppState) => {
  return {
    movies: store.moviesState.movies,
    firstSelectedMovie: store.moviesState.firstSelectedMovie,
    secondSelectedMovie: store.moviesState.secondSelectedMovie,
    connection: store.moviesState.connection
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
  },
  computeConnection: () => {
    dispatch({
      type: MovieActionTypes.COMPUTE_CONNECTION
    })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);