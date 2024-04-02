import { useState } from "react";
import Player from "./component/Player";
import GameBoard from "./component/GameBoard";
import Logs from "./component/Logs";
import {
  WINNING_COMBINATIONS,
  INITIAL_GAME_BOARD,
  PLAYERS,
} from "./winning-combination";
import GameOver from "./component/GameOver";

function getActivePlayer(turns) {
  let currentPlayer = "X";

  if (turns.length > 0 && turns[0].player == "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function getDerivedBoard(gameTurns) {
  let board = [...INITIAL_GAME_BOARD.map((inner) => [...inner])];

  for (let turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    board[row][col] = player;
  }
  return board;
}

function getDerivedWinner(board, players) {
  let winner;

  for (let combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = board[combination[0].row][combination[0].column];
    const secondSquareSymbol = board[combination[1].row][combination[1].column];
    const thirdSquareSymbol = board[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol == secondSquareSymbol &&
      firstSquareSymbol == thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = getActivePlayer(gameTurns);

  let board = getDerivedBoard(gameTurns);

  let winner = getDerivedWinner(board, players);

  let hasDraw = !winner && gameTurns.length == 9;

  function handleActivePlayer(row, col) {
    setGameTurns((turns) => {
      let currentPlayer = getActivePlayer(turns);

      const updatedTurns = [
        { square: { row, col }, player: currentPlayer },
        ...turns,
      ];

      return updatedTurns;
    });
  }

  const handleRestart = () => setGameTurns([]);

  const handlePlayerName = (symbol, name) =>
    setPlayers((prev) => ({
      ...prev,
      [symbol]: name,
    }));

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            symbol="X"
            isActive={activePlayer == "X"}
            onNameChange={handlePlayerName}
          />
          <Player
            name={PLAYERS.O}
            symbol="O"
            isActive={activePlayer == "O"}
            onNameChange={handlePlayerName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard updatePlayer={handleActivePlayer} gameBoard={board} />
      </div>
      <Logs turns={gameTurns} />
    </main>
  );
}

export default App;
