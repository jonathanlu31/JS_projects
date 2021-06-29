import { GameBoard } from "./gameboard";
import { Player } from "./player";

const turnHeader = document.getElementById('turn')! as HTMLParagraphElement;
const table = document.querySelector('table')!;

export class DisplayController {
    private game: GameBoard;
    private playable: boolean;

    constructor() {
        this.game = new GameBoard();
        this.playable = true;
    }

    markTile(e: MouseEvent) {
        if ((e.target! as HTMLElement).tagName !== 'TD') {
            return;
        }
        if (!this.playable) {
            return;
        }

        let marked = this.game.getCurrentPlayer().mark(e.target as HTMLTableCellElement);
        if (marked) {
            if (this.game.checkWin()) {
                this.endGame(true);
                this.playable = false;
            } else if (this.game.checkTie()) {
                this.endGame(false);
            } else {
                this.game.switchPlayer();
            }
        }
    }

    static changeTurn(currPlayer: Player) {
        turnHeader.textContent = `Player ${currPlayer.symbol}'s turn`;
    }

    reset() {
        this.game.clearBoard();
        this.playable = true;
        turnHeader.textContent = "Player X's turn";
        if (this.game.getCurrentPlayer().symbol === 'O') {
            this.game.switchPlayer();
        }
        this.game.resetTurns();
    }

    endGame(win: boolean) {
        if (win) {
            turnHeader.textContent = `Player ${this.game.getCurrentPlayer().symbol} wins!`;
        } else {
            turnHeader.textContent = "It's a tie!";
        }
        table.removeEventListener('click', this.markTile);
    }
}