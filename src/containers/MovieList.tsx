
import * as React from 'react';
import { connect } from 'react-redux';

import { IAppState } from '../store/Store';

import { IMovie } from '../reducers/MovieReducer';

// Create the containers interface
interface IProps {
  movies: IMovie[];
}

class MovieList extends React.Component<IProps> {
  public render() {
    console.log(this.props);
    return (
      <div className="name-container">
        {this.props.movies &&
          this.props.movies.map(movie => {
            return (
              <span key={movie.name} className="name">
                {movie.name}
              </span>
            );
          })}
      </div>
    );
  }
}

// Grab the movies from the store and make them available on props
const mapStateToProps = (store: IAppState) => {
  return {
    movies: store.moviesState.movies,
  };
};

export default connect(mapStateToProps)(MovieList);