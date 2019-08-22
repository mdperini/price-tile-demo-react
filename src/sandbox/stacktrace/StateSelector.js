import React from "react";

const StateSelector = props => {
  const onStateSelection = props.onStateSelection;
  const { allStates, selectedState } = props;

  return (
    <div>
      <label>Select a State:</label>
      <select onChange={onStateSelection} value={selectedState}>
        {allStates.map(localState => {
          return (
            <option key={localState.id} value={localState.value}>
              {localState.value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default StateSelector;
