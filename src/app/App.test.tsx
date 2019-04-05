import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';
import { shallow } from 'enzyme';

describe('App', () => {
  it('should be a React component', () => {
    expect(App.prototype instanceof React.Component).toBe(true);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App greeting="Hi there!" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('enzyme rendering works', () => {
    shallow(<App greeting="Hi there!" />);
  });
})
