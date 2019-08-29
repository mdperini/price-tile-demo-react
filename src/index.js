import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import PriceTile from './components/price-tile/PriceTile'
// import { Workspace } from './components/workspace/workspace'
import WorkspaceComponent from './components/workspace/WorkspaceComponent'
import * as serviceWorker from './serviceWorker';

// // sandbox hooks
// // import StateHookExample from './sandbox/hooks/state.hook.example';
// // import EffectHookExample from './sandbox/hooks/effect.hook.example';
// //import HooksExamples from './sandbox/hooks/hooks.examples';

// ReactDOM.render(<PriceTile />, document.getElementById('root'));
// ReactDOM.render(<Workspace />, document.getElementById('root'));
ReactDOM.render(<WorkspaceComponent />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
