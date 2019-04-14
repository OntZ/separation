import * as React from 'react';
import MovieList from '../containers/MovieList';
import './App.scss';

export class App extends React.Component<{title: string}> {
  public render() {
    return (
      <div className="app-container content-area">
          <h2 className="col-lg-12">{this.props.title}</h2>
          <div className="col-lg-12">
            <MovieList />
          </div>
      </div>
    );
  }
}
