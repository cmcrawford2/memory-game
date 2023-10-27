import PropTypes from "prop-types";

export default function Modal(props) {
  
  function determineTime() {
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
    return totalTimeDisplay;
  }

  function determineWinner() {
    var display = "";
    switch(props.results) {
      case 0:
        display = "Player 1 wins!";
        break;
      case 1: 
        display = "Player 2 wins!";
        break;
      default:
        display = "Tied!";
        break;
    }
    return display;
  }

  var toDisplay = "";
  var triesToDisplay = "";
  if (props.gameType === 0) {
    toDisplay = determineTime();
    triesToDisplay = "you took " + props.nTries + " tries";
  } else {
    toDisplay = determineWinner();
  }
  
  return (
    <div className="modal hidden" data-id="modal">
      <div className="modal-contents">
        <h1>game over!</h1>
       <h2>{`${triesToDisplay}`}</h2>
        <h2>{`${toDisplay}`}</h2>
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
  results: PropTypes.number.isRequired,
  gameType: PropTypes.number.isRequired
};
