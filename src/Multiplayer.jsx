import PropTypes from "prop-types";

export default function Multiplayer(props) {
  return (
    <div className="multiplayer">
      <span className="player0 score" id="player1Score">Player 1: {props.player1Score}</span>
      <span className="player0 playerstatus" id="player0Status">Player 1, it is your turn</span>
      <span className="player1 playerstatus" id="player1Status">Player 2, it is your turn</span>
      <span className="player1 score" id="player2Score">Player 2: {props.player2Score}</span>
    </div>
  );
}

Multiplayer.propTypes = {
  player1Score: PropTypes.number.isRequired,
  player2Score: PropTypes.number.isRequired
}