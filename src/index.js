// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// // import PriceTileComponent from './components/price-tile/PriceTileComponent'

// // import WorkspaceComponent from './components/workspace/WorkspaceComponent'
// import * as serviceWorker from './serviceWorker';

// // sandbox hooks
// // import StateHookExample from './sandbox/hooks/state.hook.example';
// // import EffectHookExample from './sandbox/hooks/effect.hook.example';
// import HooksExamples from './sandbox/hooks/hooks.examples';

// // ReactDOM.render(<PriceTileComponent />, document.getElementById('root'));
// ReactDOM.render(<HooksExamples />, document.getElementById('root'));


// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import * as serviceWorker from './serviceWorker';
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import StateSelector from "../src/sandbox/stacktrace/StateSelector";
import Footer from "../src/sandbox/stacktrace/Footer";


const SelectTesting = () => {
  const reqUrl = "https://hn.algolia.com/api/v1/search?query=redux";

  const initialStateValue = [{ id: 0, value: " --- Select A State --- " }];
  const initialAuthorValue = [" --- Select an Author --- "];

  const allowedState = [
    { id: 1, value: "Alabama" },
    { id: 2, value: "Georgia" },
    { id: 3, value: "Missisippi" }
  ];

  const [authors, setAuthors] = useState(initialAuthorValue);
  const [allStates, setAllSelected] = useState(initialStateValue);
  const [stateSelected, setStateSelected] = useState(
    initialStateValue[0].value
  );

  let authorComponent = null;

  // useEffect to get states
  useEffect(() => {
    console.log("Inside effect");
    const stateValues = initialStateValue;
    allowedState.map(sel => {
      stateValues.push(sel);
      return setAllSelected(stateValues);
    });
  });

function loadData() {
    axios(reqUrl).then(result =>
        result.data.hits.map(res => {
          initialAuthorValue.push(res.author);
          return setAuthors(initialAuthorValue);
        })
      );
}
  // useEffect to get Authors
  useEffect(() => {
    console.log("Inside effect 2");
    loadData();
  });

  authorComponent = (
    <select>
      {authors.map((author, index) => (
        <option key={index}>{author}</option>
      ))}
    </select>
  );

  const stateSelectionHandler = event => {
    const value = event.target.value;
    console.log(allStates);
    const stateIndex = allStates.findIndex(state => state.value === value);
    console.log(event.target.value, allStates, "index:", stateIndex);
    setStateSelected(event.target.value);
  };

  const resetClickHandler = () => {
    console.log("reset was clicked");
    setStateSelected(initialStateValue[0].value);
  };

  console.log("Inside Index.js Main");

  return (
    <div>
      <hr />
      <StateSelector
        selectedState={stateSelected}
        allStates={allStates}
        onStateSelection={stateSelectionHandler}
      />
      <hr />
      <label>Author:</label>
      {authorComponent}
      <hr />
      <Footer onResetClick={resetClickHandler} />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<SelectTesting />, rootElement);

serviceWorker.unregister();
