import { useState } from 'react'
import './App.css'
import { Square } from './components/square';
import { Turns } from './constantes';
import { ModalWinner } from './components/modaWinner';
import { checkWinnerBoard, checkEndGame, setDataStorage, removeDataStorage, validateData } from './logic/board';

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = localStorage.getItem('turn');
    return turnFromStorage ? JSON.parse(turnFromStorage) : Turns.X;
  });
  const [winner, setWinner] = useState(() => {
    const stacticWinnerStorage = localStorage.getItem('winner');
    return stacticWinnerStorage ? JSON.parse(stacticWinnerStorage) : [null];
  }
  );
  const [game, setGame] = useState(() => {
    const gameFromStorage = localStorage.getItem('game');
    return gameFromStorage ? JSON.parse(gameFromStorage) : 0;
  });
  const [record, setRecord] = useState(() => {
    const recordFromStorage = localStorage.getItem('record');
    return recordFromStorage ? JSON.parse(recordFromStorage) : { name: null, record: null };
  });

  function updateGame(gameUpdate, newWinner) {
    newWinner = [...newWinner, null];
    setGame(gameUpdate + 1);
    setWinner(newWinner);
    const gameOne = validateData(winner, [Turns.X]);
    const gameTwo = validateData(winner, [Turns.O]);
    const recordGame = gameOne > gameTwo ? { name: Turns.X, data: gameOne } : { name: Turns.O, data: gameTwo };
    setRecord(recordGame);
    setDataStorage([{ name: 'game', data: gameUpdate + 1 }, { name: 'record', data: recordGame }]);
  }

  function updateBoard(index) {

    if (!board[index]) {
      if (!winner[game]) {
        const newBoard = [...board];
        newBoard[index] = turn;
        setBoard(newBoard);
        const newTurn = turn == Turns.X ? Turns.O : Turns.X;
        console.log(typeof (newTurn));
        setTurn(newTurn);
        const validateWinner = checkWinnerBoard(newBoard);
        const newWinner = [...winner];
        newWinner[game] = validateWinner;
        setWinner(newWinner);
        const validateTie = checkEndGame(newBoard);
        if (validateTie) {
          newWinner[game] = false;
          setWinner(newWinner);
        }
        setDataStorage([{ name: 'board', data: newBoard }, { name: 'turn', data: newTurn }, { name: 'winner', data: newWinner }]);
      }
    }
  }
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(Turns.X);
    const newWinner = [...winner];
    newWinner[game] = null;
    setWinner(newWinner);
    removeDataStorage(['board', 'turn']);
  }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <div>{record.data && `Name:${record.name} Record ${record.data}`}</div>
      <button onClick={resetGame}>resetGame</button>
      <section className="game">
        {
          board.map((data, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {data}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <div>
          <Square isSelected={turn === Turns.X}>
            {Turns.X}
          </Square>
          <div>{validateData(winner, [Turns.X])}</div>
        </div>
        <div>
          <Square isSelected={turn == Turns.O}>
            {Turns.O}
          </Square>
          <div>{validateData(winner, [Turns.O])}</div>
        </div>
      </section>
      <ModalWinner winner={winner} board={board} game={game} updateGame={updateGame} resetGame={resetGame} />
    </main>

  )
}

export default App
