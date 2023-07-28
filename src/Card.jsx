export default function Card(props) {
  return (
    <div
      className={props.isVisible ? "card" : "removedCard"}
      onClick={props.flipCard}
    >
      {props.isFlipped && props.value}
    </div>
  );
}
