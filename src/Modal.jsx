import PropTypes from "prop-types";

export default function Modal(props) {
  return (
    <div className="modal hidden" data-id="modal">
      <div className="modal-contents">
        <h2>game over!</h2>
        <button onClick={props.restart}>Play again</button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  restart: PropTypes.func.isRequired,
};
