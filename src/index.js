import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

// Components
import WorkspaceComponent from './components/workspace/WorkspaceComponent'
ReactDOM.render(<WorkspaceComponent />, document.getElementById('root'));



// ReactDOM.render(<Workspace />, document.getElementById('root'));


// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
