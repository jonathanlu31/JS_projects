import { GameBoard } from "./gameboard";

class DisplayController {
    private game: GameBoard;
    private header: string;

    constructor() {
        this.game = new GameBoard();
        this.header = "Player X's turn";
    }

    markTile(e: MouseEvent) {
        if (e!.target!.tagName !== 'TD') {
            return;
        }
        let marked = GameBoard.getCurrentPlayer().mark(e.target);
        if (marked) {
            if (GameBoard.checkWin()) {
                displayController.endGame(true);
            } else if (GameBoard.checkTie()) {
                displayController.endGame(false);
            } else {
                GameBoard.switchPlayer();
            }
        }
    }

    changeTurn(currPlayer: Player) {
        turnHeader.textContent = `Player ${currPlayer.symbol}'s turn`;
    }

    reset() {
        this.game = new GameBoard();
        this.header = "Player X's turn";
        table.removeEventListener('click', displayController.markTile);
        table.addEventListener('click', displayController.markTile);
        if (GameBoard.getCurrentPlayer().symbol === 'O') {
            GameBoard.switchPlayer();
        }
        GameBoard.resetTurns();

    }

    endGame(win: boolean) {
        if (win) {
            turnHeader.textContent = `Player ${GameBoard.getCurrentPlayer().symbol} wins!`;
        } else {
            turnHeader.textContent = "It's a tie!";
        }
        table.removeEventListener('click', displayController.markTile);
    }
}

const game = new DisplayController();


const table = document.querySelector('table')!;
const resetButton = document.getElementById('reset')! as HTMLButtonElement;
const rows = table.rows;
const turnHeader = document.getElementById('turn')! as HTMLParagraphElement;
table.addEventListener('click', displayController.markTile);
resetButton.addEventListener('click', displayController.reset);