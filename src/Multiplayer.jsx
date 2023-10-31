import PropTypes from "prop-types";

export default function Multiplayer(props) {
  return (
    <div className="multiplayer">
      <span className="player-score" id="player1-score">Player 1: {props.player1Score}</span>
      <span id="player-status"></span>
      <span className="player-score" id="player2-score">Player 2: {props.player2Score}</span>
    </div>
  );
}

Multiplayer.propTypes = {
  player1Score: PropTypes.number.isRequired,
  player2Score: PropTypes.number.isRequired
}
