import * as React from 'react';
import MovieList from '../containers/MovieList';
import './App.scss';

export class App extends React.Component<{greeting: string}, {count:number}> {
  state = {count: 0};
  public render() {
    return (
      <div className="app-container content-area">
          <h2>{this.props.greeting}</h2>
          <div className="col-lg-12">
            <MovieList />
          </div>
      </div>
    );
  }
}
