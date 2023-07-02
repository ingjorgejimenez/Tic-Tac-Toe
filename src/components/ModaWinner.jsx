import { Square } from "./square";
import { validateData } from "../logic/board";
import { Turns } from "../constantes";

export const ModalWinner = ({ winner, game, resetGame, updateGame, board }) => {
    const validateBoards = validateData(board, [Turns.X, Turns.O]);
    console.log(validateBoards);
    if (winner[game] === null || validateBoards <= 0) return null;
    const winnerText = winner[game] === false ? 'Empate' : "Gano";

    return (
        <section className='winner'>
            <div className='text'>
                <h2>{winnerText}</h2>
                <header className='win'>
                    {winner[game] && <Square>{winner[game]}</Square>}
                </header>
                <footer>
                    <button onClick={() => {
                        resetGame();
                        updateGame(game, winner);
                    }}>Empezar de nuevo</button>
                </footer>
            </div>
        </section>
    )

}