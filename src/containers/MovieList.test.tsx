import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MovieList } from './MovieList';
import { shallow } from 'enzyme';
import { IMovie } from '../reducers/MovieReducer';

const MOVIES:IMovie[] = [{title: 'title', cast: ['1','2']}];

describe('MovieList', () => {
  it('should be a React component', () => {
    expect(MovieList.prototype instanceof React.Component).toBe(true);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MovieList movies={MOVIES}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('enzyme rendering works', () => {
    shallow(<MovieList movies={MOVIES}/>);
  });
})
