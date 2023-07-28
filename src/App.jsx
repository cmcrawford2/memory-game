import React from "react";
import Card from "./Card.jsx";
import "./style.css";

export default function App() {
  const [cards, setCards] = React.useState(createLayout());

  function checkForMatch(cardArray) {
    const flippedArr = cardArray.filter((card) => card.isFlipped);
    if (flippedArr.length < 2) return;
    for (let i = 0; i < flippedArr.length - 1; i++) {
      for (let j = i + 1; j < flippedArr.length; j++) {
        if (flippedArr[i].card === flippedArr[j].card) {
          // Found two same cards both facing up.
          // Make them invisible to the user.
          // TODO: find a way to put in a time delay. setTimeout doesn't work.
          removeMatch(cardArray, flippedArr[i].id, flippedArr[j].id);
          return;
        }
      }
    }
  }

  function removeMatch(arr, id1, id2) {
    const card1 = arr.find((card) => card.id === id1);
    card1.isVisible = false;
    card1.isFlipped = false;
    const card2 = arr.find((card) => card.id === id2);
    card2.isVisible = false;
    card2.isFlipped = false;
  }

  function createLayout() {
    // Create an array to hold the card values
    const cardsArray = [];

    // Fill the array with integers from 1 to 54
    for (let i = 1; i <= 54; i++) {
      cardsArray.push({
        card: i,
        isVisible: true,
        isFlipped: false,
        id: 2 * i - 2,
      });
      // Duplicate each card's value to create pairs
      cardsArray.push({
        card: i,
        isVisible: true,
        id: 2 * i - 1,
      });
    }
    // Permute the array.
    for (let i = 107; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const tempCard = cardsArray[i];
      cardsArray[i] = cardsArray[j];
      cardsArray[j] = tempCard;
    }
    return cardsArray;
  }

  function flipCard(id) {
    const newArr = cards.map((card) => {
      if (card.id === id) card.isFlipped = !card.isFlipped;
      return card;
    });
    // Check the new array to see if there is a match.
    checkForMatch(newArr);
    setCards(newArr);
  }

  const cardDivs = cards.map((card) => {
    return (
      <Card
        isVisible={card.isVisible}
        flipCard={() => flipCard(card.id)}
        isFlipped={card.isFlipped}
        value={card.card}
        key={card.id}
      />
    );
  });

  return (
    <main>
      <div className="card-container">{cardDivs}</div>
    </main>
  );
}
