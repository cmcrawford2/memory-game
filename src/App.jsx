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

  // Function to save the values in local storage
  function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Function to load the values from local storage
  function loadFromLocalStorage(key, defaultValue) {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  }

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
    const savedNRows = loadFromLocalStorage("nRows", 9);
    const savedNColumns = loadFromLocalStorage("nColumns", 12);
    setNRows(savedNRows);
    setNColumns(savedNColumns);
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
import React, { useState, useEffect } from "react";
import Nav from "./Nav.jsx";
import Card from "./Card.jsx";
import Modal from "./Modal.jsx";
import Confetti from "react-confetti";
import getRandomizedImages from "./utils.js";
import "./style.css";

export default function App() {
  // State variables for game settings and cards
  const [nRows, setNRows] = useState(9);
  const [nColumns, setNColumns] = useState(12);
  const [nTries, setNTries] = useState(0);
  const [cards, setCards] = useState([]);
  const [flippedCardIds, setFlippedCardIds] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  // Function to save values to local storage
  function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Function to load values from local storage
  function loadFromLocalStorage(key, defaultValue) {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  }

  // Function to create the initial layout of cards
  function createLayout() {
    setNTries(0);
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

      cardsArray.push({
        value: i,
        imageUrl: imageArray[i],
        isVisible: true,
        isFlipped: false,
        id: 2 * i + 1,
      });
    }

    for (let i = nCards - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const tempCard = cardsArray[i];
      cardsArray[i] = cardsArray[j];
      cardsArray[j] = tempCard;
    }

    return cardsArray;
  }

  // useEffect to load settings and initialize the game
  useEffect(() => {
    const savedNRows = loadFromLocalStorage("nRows", 9);
    const savedNColumns = loadFromLocalStorage("nColumns", 12);
    setNRows(savedNRows);
    setNColumns(savedNColumns);
    setCards(createLayout());
    setFlippedCardIds([]);
  }, [nRows, nColumns]);

  // useEffect to handle the game over state and display modal
  useEffect(() => {
    if (gameOver) {
      const modal = document.querySelector('[data-id="modal"]');
      modal.classList.remove("hidden");
    }
  }, [gameOver]);

  // Function to handle flipping a card
  function flipCard(id) {
    if (flippedCardIds.length === 2) {
      setNTries((nTries) => nTries + 1);
      const card1 = cards.find((card) => card.id === flippedCardIds[0]);
      const card2 = cards.find((card) => card.id === flippedCardIds[1]);
      const newArr = cards.map((card) => {
        if (card.id === flippedCardIds[0] || card.id === flippedCardIds[1]) {
          card.isFlipped = false;
          if (card1.value === card2.value) card.isVisible = false;
        }
        return card;
      });
      setCards(newArr);
      setFlippedCardIds([]);
      if (!cards.find((card) => card.isVisible)) setGameOver(true);
      return;
    }

    const card = cards.find((card) => card.id === id);
    if (card.isVisible === false) return;

    if (flippedCardIds.length === 1 && flippedCardIds[0] === id) return;

    const newArr = cards.map((card) => {
      if (card.id === id) card.isFlipped = true;
      return card;
    });
    setCards(newArr);
    setFlippedCardIds((oldArray) => [...oldArray, id]);
  }

  // Render card components
  const cardDivs = cards.map((card) => {
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

  // Function to set the number of columns
  function setNumColumns(numColumns) {
    if (gameOver) restartGame();
    setNColumns(numColumns);
    saveToLocalStorage("nColumns", numColumns);
  }

  // Function to set the number of rows
  function setNumRows(numRows) {
    if (gameOver) restartGame();
    setNRows(numRows);
    saveToLocalStorage("nRows", numRows);
  }

  // Function to restart the game
  function restartGame() {
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
