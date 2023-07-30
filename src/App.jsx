import React from "react";
import Nav from "./Nav.jsx";
import Card from "./Card.jsx";
import "./style.css";

const nCards = 4;

export default function App() {
  const [cards, setCards] = React.useState(createLayout());
  const [flippedCardIds, setFlippedCardIds] = React.useState([]);

  function createLayout() {
    // Create an array to hold the card values
    const cardsArray = [];

    for (let i = 1; i <= nCards; i++) {
      const cardImage = `/card${i}.jpg`;
      cardsArray.push({
        value: i,
        imageUrl: cardImage,
        isVisible: true,
        isFlipped: false,
        id: 2 * i - 2,
      });
      // Duplicate each card's value to create pairs
      cardsArray.push({
        value: i,
        imageUrl: cardImage,
        isVisible: true,
        isFlipped: false,
        id: 2 * i - 1,
      });
    }
    // Permute the array.
    for (let i = 2 * nCards - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const tempCard = cardsArray[i];
      cardsArray[i] = cardsArray[j];
      cardsArray[j] = tempCard;
    }
    return cardsArray;
  }

  function flipCard(id) {
    if (flippedCardIds.length === 2) {
      // user can't flip any more cards. check for match, turn cards over or remove.
      const card1 = cards.find((card) => card.id === flippedCardIds[0]);
      const card2 = cards.find((card) => card.id === flippedCardIds[1]);
      const newArr = cards.map((card) => {
        if (card.id === flippedCardIds[0] || card.id === flippedCardIds[1]) {
          card.isFlipped = false;
          if (card1.value === card2.value)
            // Remove the card from the grid.
            card.isVisible = false;
        }
        return card;
      });
      setCards(newArr);
      setFlippedCardIds([]);
      return;
    }
    // Don't let the user flip a removed card.
    const card = cards.find((card) => card.id === id);
    if (card.isVisible === false) return;

    // Don't let the user turn the first card back over.
    if (flippedCardIds.length === 1 && flippedCardIds[0] === id) return;

    const newArr = cards.map((card) => {
      if (card.id === id) card.isFlipped = true;
      return card;
    });
    setCards(newArr);
    setFlippedCardIds((oldArray) => [...oldArray, id]);
  }

  const cardDivs = cards.map((card) => {
    // flipCard is the onClick callback function for each card.
    return (
      <Card
        isVisible={card.isVisible}
        imageUrl={card.imageUrl}
        flipCard={() => flipCard(card.id)}
        isFlipped={card.isFlipped}
        value={card.value}
        key={card.id}
      />
    );
  });

  return (
    <main>
      <Nav />

      <div className="card-container">{cardDivs}</div>
    </main>
  );
}
