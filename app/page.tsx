"use client"

import { useState, useEffect } from "react";
import Cell from "./components/cell";
import './globals.css';

const Page = () => {
  const [cells, setCells] = useState(Array(9).fill(""));
  const [go, setGo] = useState("circle");
  const [winningMessage, setWinningMessage] = useState("");

  useEffect(() => {
    const checkForWinner = (squares) => {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
    };

    const winner = checkForWinner(cells);
    if (winner) {
      setWinningMessage(`${winner === "circle" ? "Circle" : "Cross"} Wins!`);
    } else if (cells.every((cell) => cell !== "")) {
      setWinningMessage("It's a draw");
    }
  }, [cells]);

  const handleRestart = () => {
    setCells(Array(9).fill(""));
    setGo("circle");
    setWinningMessage("");
  };

  return (
    <div className="container">
      <div className="gameboard">
        {cells.map((cell, index) => (
          <Cell
            key={index}
            id={index}
            go={go}
            setGo={setGo}
            cells={cells}
            setCells={setCells}
            cell={cell}
            winningMessage={winningMessage}
          />
        ))}
      </div>
      {winningMessage && <p>{winningMessage}</p>}
      <button onClick={handleRestart}>Restart</button>
    </div>
  );
};

export default Page;
