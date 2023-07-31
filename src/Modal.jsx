import PropTypes from "prop-types";

export default function Modal(props) {
  return (
    <div className="modal hidden" data-id="modal">
      <div className="modal-contents">
        <h1>game over!</h1>
        <button onClick={props.restart}>
          <h3>play again</h3>
        </button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  restart: PropTypes.func.isRequired,
};
