import React from "react";
import Square from "./square";
import { useState } from "react";

const Board = () => {
  let flag = 1;
  const [state, setState] = useState(Array(9).fill(null));
  const [turnOfX, setturnOfX] = useState(true);
  const [nullCount, setNullCount] = useState(9);
  const [displayWinner, setDisplayWinner] = useState(0);
  const [startNew, setStartNew] = useState(true);
  const checkWinner = () => {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 4, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let logic of winnerLogic) {
      const [a, b, c] = logic;

      if (
        state[a] === state[b] &&
        state[a] === state[c] &&
        state[a] !== null &&
        state[c] !== null
      ) {
        flag = 1;
        // console.log("Winner is ", state[a]);
        return state[a];
      }
    }

    return false;
  };

  if (startNew && nullCount >1) {
    let count = 0;
    for (let i = 0; i < 9; i++) {
      if (state[i] === null) {
        count++;
      }
      setNullCount(count);
      console.log("Null count is ", count);
    }

    if (nullCount < 0) {
      console.log("Null Count less than 0");
    }

    const winnerName = checkWinner();
    if ((winnerName === "X" || winnerName === "O")) {
      console.log(winnerName, "Is the winner");
      setDisplayWinner(1);
      setStartNew(false);
    }
  }

  const handleClick = (index) => {
    if (state[index] !== null) {
      return;
    }

    console.log(index, " clicked");
    let copyState = { ...state };
    copyState[index] = turnOfX ? "X" : "O"; // Either X or O
    console.log(copyState);
    setState(copyState);
    console.log("This is after set state");
    setturnOfX(!turnOfX);
    console.log(state);
  };

  const resetGame = () => {
    console.log("logout called");
    setState(Array(9).fill(null));
    setNullCount(9);
    setDisplayWinner(0);
    setStartNew(true);
  };

  if (!displayWinner && nullCount > 0) {
    return (
      <div className="board__wrapper">
        <h3>
          <span style={{ color: "red" }}>{turnOfX ? "X" : "O"}</span> Turn to
          play
        </h3>
        <div className="board__row">
          <Square onClick={() => handleClick(0)} value={state[0]} />
          <Square onClick={() => handleClick(1)} value={state[1]} />
          <Square onClick={() => handleClick(2)} value={state[2]} />
        </div>

        <div className="board__row">
          <Square onClick={() => handleClick(3)} value={state[3]} />
          <Square onClick={() => handleClick(4)} value={state[4]} />
          <Square onClick={() => handleClick(5)} value={state[5]} />
        </div>

        <div className="board__row">
          <Square onClick={() => handleClick(6)} value={state[6]} />
          <Square onClick={() => handleClick(7)} value={state[7]} />
          <Square onClick={() => handleClick(8)} value={state[8]} />
        </div>
      </div>
    );
  } else if (displayWinner === 1) {
    // setStartNew(true);
    const winner = checkWinner();
    return (
      <>
        <h2>Player {winner} is the Winner</h2>
        <button onClick={resetGame}>Play Again</button>
      </>
    );
  } else if (nullCount <= 1) {
    return (
      <>
        <h2>The game has ended in a TIE</h2>
        <button onClick={resetGame}>Play Again</button>
      </>
    );
  }
};

export default Board;
