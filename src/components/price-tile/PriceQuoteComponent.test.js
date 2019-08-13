import React from 'react';
import ReactDOM from 'react-dom';
import PriceTileComponent from './PriceTileComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PriceTileComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
