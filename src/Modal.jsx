import PropTypes from "prop-types";

export default function Modal(props) {
  return (
    <div className="modal hidden" data-id="modal">
      <div className="modal-contents">
        <h1>game over!</h1>
        <h2>{`you took ${props.nTries} tries.`}</h2>
        <button onClick={props.restart}>
          <h3>play again</h3>
        </button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  nTries: PropTypes.number.isRequired,
  restart: PropTypes.func.isRequired,
};
