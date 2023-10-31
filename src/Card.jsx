import PropTypes from "prop-types";

export default function Card(props) {
  return (
    <div
      className={props.isVisible ? "card" : "removedCard"}
      onClick={props.flipCard}
      style={{
        backgroundColor: props.isVisible
          ? props.isFlipped
            ? "#e0e0c0"
            : "lightblue"
          : "white",
      }}
    >
      <img src={props.imageUrl} alt={props.value} style={{display: props.isFlipped ? 'block' : 'none'}} />
    </div>
  );
}

Card.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  isFlipped: PropTypes.bool.isRequired,
  flipCard: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};
