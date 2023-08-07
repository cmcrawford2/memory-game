import { useState, useEffect } from "react";
import Nav from "./Nav.jsx";
import Card from "./Card.jsx";
import Modal from "./Modal.jsx";
import Confetti from "react-confetti";
import getRandomizedImages from "./utils.js";

import "./style.css";

// This is a memory card game where you match pictures of cards.
// You can play by yourself, or against the computer.
// TODO: add computer as a player.

export default function App() {
  const [nRows, setNRows] = useState(9);
  const [nColumns, setNColumns] = useState(12);
  const [nTries, setNTries] = useState(0);
  const [cards, setCards] = useState([]); // useEffect will initialize.
  const [flippedCardIds, setFlippedCardIds] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  function createLayout() {
    setNTries(0);
    // Create an array to hold the card values
    const cardsArray = [];
    const nCards = nRows * nColumns;

    const imageArray = getRandomizedImages();

    for (let i = 0; i < nCards / 2; i++) {
      cardsArray.push({
        value: i,
        imageUrl: imageArray[i],
        isVisible: true,
        isFlipped: false,
        id: 2 * i,
      });
      // Duplicate each card's value to create pairs
      cardsArray.push({
        value: i,
        imageUrl: imageArray[i],
        isVisible: true,
        isFlipped: false,
        id: 2 * i + 1,
      });
    }
    // Permute the array.
    for (let i = nCards - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const tempCard = cardsArray[i];
      cardsArray[i] = cardsArray[j];
      cardsArray[j] = tempCard;
    }
    return cardsArray;
  }

  useEffect(() => {
    // Start over when user chooses new configuration.
    // This will run once to initialize.
    setCards(createLayout());
    setFlippedCardIds([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nRows, nColumns]);

  useEffect(() => {
    if (gameOver) {
      const modal = document.querySelector('[data-id="modal"]');
      modal.classList.remove("hidden");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  function flipCard(id) {
    if (flippedCardIds.length === 2) {
      setNTries((nTries) => nTries + 1);
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
      // Check for game over
      if (!cards.find((card) => card.isVisible)) setGameOver(true);
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

  function setNumColumns(numColumns) {
    if (gameOver) restartGame();
    setNColumns(numColumns);
  }

  function setNumRows(numRows) {
    if (gameOver) restartGame();
    setNRows(numRows);
  }

  function restartGame() {
    // Restarting after a win. No cards are flipped or visible.
    const modal = document.querySelector('[data-id="modal"]');
    modal.classList.add("hidden");
    setCards(createLayout());
    setGameOver(false);
  }

  return (
    <main>
      <Nav
        numRows={nRows}
        numColumns={nColumns}
        onSetNumRows={setNumRows}
        onSetNumColumns={setNumColumns}
        startOver={() => {
          if (gameOver) restartGame();
          else {
            setCards(createLayout());
            setFlippedCardIds([]);
          }
        }}
      />
      <div
        className="card-container"
        style={{
          gridTemplateColumns: `repeat(${nColumns}, 1fr)`,
          gridTemplateRows: `repeat(${nRows}, 1fr)`,
          maxWidth: `${nColumns * 100}px`,
        }}
      >
        {cardDivs}
      </div>
      {gameOver && <Confetti />}
      <Modal nTries={nTries} restart={restartGame} />
    </main>
  );
}
