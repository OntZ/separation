import * as React from 'react';
import './App.scss';

export class App extends React.Component<{greeting: string}, {count:number}> {
  state = {count: 0};
  public render() {
    return (
      <div className="app-container">
          <h2>{this.props.greeting}</h2>
      </div>
    );
  }
}
