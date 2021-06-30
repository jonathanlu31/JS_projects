import { GameBoard } from "./gameboard";
import { Player } from "./player";

const turnHeader = document.getElementById('turn')! as HTMLParagraphElement;
const table = document.querySelector('table')!;

export class DisplayController {
    private game: GameBoard;
    private playable: boolean;

    constructor() {
        this.game = new GameBoard();
        this.game.display = this;
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
            this.game.getSnapshot();
            this.checkGameover();
            if (this.playable) {
                this.game.nextTurn();
            }
        }
    }

    static changeTurn(currPlayer: Player) {
        turnHeader.textContent = `Player ${currPlayer.symbol}'s turn`;
    }

    checkGameover() {
        if (this.game.checkWin()) {
            this.endGame(true);
            this.playable = false;
        } else if (this.game.checkTie()) {
            this.endGame(false);
        }
    }

    reset() {
        this.game.clearBoard();
        this.playable = true;
        turnHeader.textContent = '';
        this.startGame();
    }

    endGame(win: boolean) {
        if (win) {
            turnHeader.textContent = `Player ${this.game.getCurrentPlayer().symbol} wins!`;
        } else {
            turnHeader.textContent = "It's a tie!";
        }
    }

    setGameMode(mode: string) {
        this.game.setMode(mode);
    }

    startGame() {
        if (this.game.getMode() === 'single') {
            this.game.nextTurn();
            return;
        }
        this.game.currentPlayer = 0;
    }
}