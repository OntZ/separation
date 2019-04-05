import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './app/App';
import './app/App.scss';

ReactDOM.render(
  <App greeting="It's working!"/>,
  document.getElementById('app')
);
