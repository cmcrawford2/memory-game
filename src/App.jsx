import { useState, useEffect } from "react";
import Nav from "./Nav.jsx";
import Card from "./Card.jsx";
import Modal from "./Modal.jsx";
import Confetti from "react-confetti";
import getRandomizedImages from "./utils.js";
import Multiplayer from "./Multiplayer.jsx";

import "./style.css";

// This is a memory card game where you match pictures of cards.
// You can play by yourself, or against the computer.
// TODO: add computer as a player.

export default function App() {
  const SOLO = 0;
  const ONE_V_ONE = 1;

  const PLAYER_1 = 0;
  const PLAYER_2 = 1;
  const TIED = 10;

  const [nRows, setNRows] = useState(9);
  const [nColumns, setNColumns] = useState(12);
  const [nTries, setNTries] = useState(0);
  const [cards, setCards] = useState([]); // useEffect will initialize.
  const [flippedCardIds, setFlippedCardIds] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [nStartTime, setStartTime] = useState(0);
  const [nTotalTime, setTotalTime] = useState(0);
  const [firstMoveTaken, setFirstMoveTaken] = useState(false);
  
  // multiplayer mode consts
  const [nGameType, setNGameType] = useState(SOLO);
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  const [player1Matches, setPlayer1Matches] = useState(0);
  const [player2Matches, setPlayer2Matches] = useState(0);
  const [winner, setWinner] = useState(0);

  // Function to save the values in local storage
  function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Function to load the values from local storage
  function loadFromLocalStorage(key, defaultValue) {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  }

  function handleGameType() {
    switch(nGameType) {
      case SOLO: // solo
        document.querySelector(".multiplayer").classList.add("hidden");
        document.querySelector("#player-status").classList.add("hidden");
        break;
      case ONE_V_ONE: // 1v1
        document.querySelector(".multiplayer").classList.remove("hidden");
        document.querySelector("#player-status").classList.remove("hidden");
        changePlayer(PLAYER_1);
        break;
    }
  }

  function changePlayer(newPlayer = (currentPlayer + 1) % 2) {
    document.querySelector("#player-status").textContent = `Player ${newPlayer + 1}, it is your turn`
    switch(newPlayer) {
      case PLAYER_1:
        document.querySelector("#player1-score").classList.add("player-active");
        document.querySelector("#player2-score").classList.remove("player-active");
        break;
      case PLAYER_2: 
        document.querySelector("#player1-score").classList.remove("player-active");
        document.querySelector("#player2-score").classList.add("player-active");
        break;
    }
    setCurrentPlayer(newPlayer);
  }

  function createLayout() {
    setNTries(0);
    setPlayer1Matches(0);
    setPlayer2Matches(0);
    handleGameType();
    setFirstMoveTaken(false);
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
    const savedGameType = loadFromLocalStorage("nGameType", SOLO);
    setNRows(savedNRows);
    setNColumns(savedNColumns);
    setGameType(savedGameType);
    setCards(createLayout());
    setFlippedCardIds([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nRows, nColumns, nGameType]);

  useEffect(() => {
    if (gameOver) {
      const modal = document.querySelector('[data-id="modal"]');
      modal.classList.remove("hidden");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver]);

  function cardMatched() {
    switch(currentPlayer) {
      case PLAYER_1: 
        setPlayer1Matches((player1Matches) => player1Matches + 1);
        break;
      case PLAYER_2: 
        setPlayer2Matches((player2Matches) => player2Matches + 1);
        break;
    }
  }

  function flipCard(id) {
    if (!firstMoveTaken) {
      setFirstMoveTaken(true);
      const d = new Date();
      setStartTime(d.getTime());
    }
    if (flippedCardIds.length === 2) {
      setNTries((nTries) => nTries + 1);
      // user can't flip any more cards. check for match, turn cards over or remove.
      const card1 = cards.find((card) => card.id === flippedCardIds[0]);
      const card2 = cards.find((card) => card.id === flippedCardIds[1]);
      var matchFound = false;
      const newArr = cards.map((card) => {
        if (card.id === flippedCardIds[0] || card.id === flippedCardIds[1]) {
          card.isFlipped = false;
          if (card1.value === card2.value) {
            if (card.id === card1.id) {
              cardMatched(); // so it's only called once
              matchFound = true
            }
            // Remove the card from the grid.
            card.isVisible = false;
          }
        }
        return card;
      });
      if (!matchFound) {
        changePlayer();
      }
      setCards(newArr);
      setFlippedCardIds([]);
      checkForGameOver();
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

  function checkForGameOver() {
    // Check for game over
    if (!cards.find((card) => card.isVisible)) {
      const d = new Date();
      setTotalTime(Math.floor((d.getTime() - nStartTime) / 1000));

      /* 
        This section with the p1m/p2m is something that I'd like to see fixed.
        because the winner is decided in this render, the player who just went
        and completed the board doesn't get their last match counted.  Once
        the render is complete then player1/2Matches will be correct. But for
        now, i'm seeing who the current player is and giving them one more
        match and THEN can we determine the correct winner.

      */
      var p1m = player1Matches;
      var p2m = player2Matches;
      if (currentPlayer == PLAYER_1) {
        p1m++
      } else {
        p2m++
      };

      if (p1m > p2m) {
        setWinner(PLAYER_1);
      } else if (p2m > p1m) {
        setWinner(PLAYER_2);
      } else {
        setWinner(TIED);
      }
      setGameOver(true);
    }
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
    saveToLocalStorage("nColumns", numColumns);
  }

  function setNumRows(numRows) {
    if (gameOver) restartGame();
    setNRows(numRows);
    saveToLocalStorage("nRows", numRows);
  }

  function setGameType(gameType) {
    if (gameOver) restartGame();
    setNGameType(gameType);
    saveToLocalStorage("nGameType", gameType);
  }

  function restartGame() {
    // Restarting after a win. No cards are flipped or visible.
    const modal = document.querySelector('[data-id="modal"]');
    modal.classList.add("hidden");
    setCards(createLayout());
    setFirstMoveTaken(false);
    setTotalTime(0);
    setStartTime(0);
    setGameOver(false);
  }

  return (
    <main>
      <Nav
        numRows={nRows}
        numColumns={nColumns}
        gameType={nGameType}
        onSetNumRows={setNumRows}
        onSetNumColumns={setNumColumns}
        onGameTypeChange={setGameType}
        startOver={() => {
          if (gameOver) restartGame();
          else {
            setCards(createLayout());
            setFlippedCardIds([]);
          }
        }}
      />
     <Multiplayer
      player1Score={player1Matches}
      player2Score={player2Matches}
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
      <Modal nTries={nTries} restart={restartGame} nTotalTime={nTotalTime} results={winner} gameType={nGameType} />
    </main>
  );
}
