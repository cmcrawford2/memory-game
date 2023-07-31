import PropTypes from "prop-types";

export default function Nav(props) {
  function handleNumColumnsChange(event) {
    // Get the selected value from the drop-down menu and update the state
    props.onSetNumColumns(Number(event.target.value));
  }

  function handleNumRowsChange(event) {
    props.onSetNumRows(Number(event.target.value));
  }

  return (
    <div className="input">
      <div className="memory">
        <h1>memory</h1>
      </div>
      <div>
        <label htmlFor="numColumns">Layout:&nbsp;</label>
        <select
          id="numColumns"
          value={props.numColumns}
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
        <select
          id="numRows"
          value={props.numRows}
          onChange={handleNumRowsChange}
        >
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
      <button className="start-over" onClick={props.startOver}>
        <h2>start over</h2>
      </button>
    </div>
  );
}

Nav.propTypes = {
  numColumns: PropTypes.number.isRequired,
  numRows: PropTypes.number.isRequired,
  onSetNumRows: PropTypes.func.isRequired,
  onSetNumColumns: PropTypes.func.isRequired,
  startOver: PropTypes.func.isRequired,
};
