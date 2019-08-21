import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import PriceTileComponent from './components/price-tile/PriceTileComponent'

// import WorkspaceComponent from './components/workspace/WorkspaceComponent'
import * as serviceWorker from './serviceWorker';

// sandbox hooks
// import StateHookExample from './sandbox/hooks/state.hook.example';
import EffectHookExample from './sandbox/hooks/effect.hook.example';

// ReactDOM.render(<PriceTileComponent />, document.getElementById('root'));
ReactDOM.render(<EffectHookExample />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
