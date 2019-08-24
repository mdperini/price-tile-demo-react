import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import PriceTile from './components/price-tile/PriceTile'

import WorkspaceComponent from './components/workspace/WorkspaceComponent'
import * as serviceWorker from './serviceWorker';

// // sandbox hooks
// // import StateHookExample from './sandbox/hooks/state.hook.example';
// // import EffectHookExample from './sandbox/hooks/effect.hook.example';
// //import HooksExamples from './sandbox/hooks/hooks.examples';

ReactDOM.render(<PriceTile />, document.getElementById('root'));
// ReactDOM.render(<WorkspaceComponent />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA

// function App() {
//     return (
//       <div className="App">
//         <GrandParent />
//       </div>
//     );
//   }
  
//   const GrandParent = () => {
//     const [name, setName] = useState("i'm Grand Parent");
//     return (
//       <>
//         <div>{name}</div>
//         <button onClick={() => setName("i'm from Grand Parent")}>
//           from GrandParent
//         </button>

//         <Parent setName={setName} />
//       </>
//     );
//   };
  
//   const Parent = params => {
//     return (
//       <>
//         <button onClick={() => params.setName("i'm from Parent")}>
//           from Parent
//         </button>
//         <Child setName={params.setName} />
//       </>
//     );
//   };
  
//   const Child = params => {
//     return (
//       <>
//         <button onClick={() => params.setName("i'm from Child")}>
//           from Child
//         </button>
//       </>
//     );
//   };

//   ReactDOM.render(<App />, document.getElementById('root'));
   serviceWorker.unregister();

  // https://stackoverflow.com/questions/55726886/react-hook-send-data-from-child-to-parent-component
