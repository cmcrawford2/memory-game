import React from "react";
import PropTypes from "prop-types";

export default function Nav(props) {
  const [numColumns, setNumColumns] = React.useState(12);
  const [numRows, setNumRows] = React.useState(9);

  const handleNumColumnsChange = (event) => {
    // Get the selected value from the drop-down menu and update the state
    setNumColumns(Number(event.target.value));
    props.onSetNumColumns(Number(event.target.value));
  };

  const handleNumRowsChange = (event) => {
    setNumRows(Number(event.target.value));
    props.onSetNumRows(Number(event.target.value));
  };

  return (
    <div>
      <h2>memory</h2>
      <label htmlFor="numColumns">Layout:&nbsp;</label>
      <select
        id="numColumns"
        value={numColumns}
        onChange={handleNumColumnsChange}
      >
        <option value={2}>2 Columns</option>
        <option value={4}>4 Columns</option>
        <option value={6}>6 Columns</option>
        <option value={8}>8 Columns</option>
        <option value={10}>10 Columns</option>
        <option value={12}>12 Columns</option>
      </select>
      <label htmlFor="numRows">&nbsp;</label>
      <select id="numRows" value={numRows} onChange={handleNumRowsChange}>
        <option value={2}>2 Rows</option>
        <option value={3}>3 Rows</option>
        <option value={4}>4 Rows</option>
        <option value={5}>5 Rows</option>
        <option value={6}>6 Rows</option>
        <option value={7}>7 Rows</option>
        <option value={8}>8 Rows</option>
        <option value={9}>9 Rows</option>
      </select>
    </div>
  );
}

Nav.propTypes = {
  onSetNumRows: PropTypes.func.isRequired,
  onSetNumColumns: PropTypes.func.isRequired,
};
