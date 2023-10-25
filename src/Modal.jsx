import PropTypes from "prop-types";

export default function Modal(props) {
  const minutes = Math.floor(props.nTotalTime / 60);
  const seconds = props.nTotalTime - (minutes * 60);
  var totalTimeDisplay = "";
  switch(minutes) {
    case 0:
      break;
    case 1:
      totalTimeDisplay = "1 minute & ";
      break;
      default:
        totalTimeDisplay = minutes + " minutes & ";
  }

  switch(seconds) {
    case 1:
      totalTimeDisplay += seconds + " second";
      break;
    default:
      totalTimeDisplay += seconds + " seconds";
  }
  
  return (
    <div className="modal hidden" data-id="modal">
      <div className="modal-contents">
        <h1>game over!</h1>
        <h2>{`you took ${props.nTries} tries`}</h2>
        <h2>{`(${totalTimeDisplay})`}</h2>
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
  nTotalTime: PropTypes.number.isRequired,
};
