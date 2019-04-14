import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MovieList, IMovieListProps } from './MovieList';
import { shallow } from 'enzyme';

const PROPS: IMovieListProps = {
  movies: [{title: 'title', cast: ['1','2']}],
  firstSelectedMovie: {title: 'title', cast: ['1','2']},
  secondSelectedMovie: {title: 'title', cast: ['1','2']},
  selectFirstMovie: jest.fn(),
  selectSecondMovie: jest.fn(),
  computeConnection: jest.fn(),
  connection: 'string'
}

const getInstance = () => <MovieList {...PROPS}/>

describe('MovieList', () => {
  it('should be a React component', () => {
    expect(MovieList.prototype instanceof React.Component).toBe(true);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(getInstance(), div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('enzyme rendering works', () => {
    shallow(getInstance());
  });
})
