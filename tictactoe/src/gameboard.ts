import { DisplayController } from "./display";
import { Player } from "./player";

const table = document.querySelector('table')!;
const rows = table.rows;

export class GameBoard {
    currentPlayer: number;
    private players: Player[];
    private mode: string | undefined;
    public display: DisplayController | undefined;
    private snapshot: string[][] = [
        ['', '', ''], ['', '', ''], ['', '', '']
    ];

    constructor() {
        this.currentPlayer = 0;
        this.players = [new Player('X'), new Player('O')];
    }

    setMode(mode: string) {
        this.mode = mode;
        if (mode === 'single') {
            this.currentPlayer++;
        }
    }

    getMode() {
        return this.mode;
    }

    getCurrentPlayer(): Player {
        return this.players[this.currentPlayer];
    }

    nextTurn() {
        if (this.mode === 'single') {
            this.playBest();
            this.display!.checkGameover();
            return;
        }
        this.currentPlayer = ((this.currentPlayer + 1) % 2);
        DisplayController.changeTurn(this.getCurrentPlayer());
    }

    checkTie() {
        for (let row of rows) {
            for (let cell of row.cells) {
                if (!cell.textContent) {
                    return false;
                }
            }
        }
        return true;
    }

    checkWin() {
        return this.checkRows() ||
               this.checkColumns() ||
               this.checkDiagonals();
    }

    private checkRows() {
        return this.snapshot.some((row: string[]) => {
            return this.checkThreeTiles(row);
        });
    }

    private checkColumns() {
        for (let i = 0; i < 3; i++) {
            let col = [];
            for (let row of this.snapshot) {
                col.push(row[i]);
            }
            if (this.checkThreeTiles(col)) {
                return true;
            }
        }
        return false;
    }

    private checkDiagonals() {
        let diags = [
            [this.snapshot[0][0], this.snapshot[1][1], this.snapshot[2][2]],
            [this.snapshot[0][2], this.snapshot[1][1], this.snapshot[2][0]]
        ];

        return diags.some((diag: string[]) => {
            return this.checkThreeTiles(diag);
        });
    }

    private checkThreeTiles(threeTiles: string[]) {
        const emptyCheck = !!threeTiles[0];
        const sameCheck = threeTiles[0] === threeTiles[1] && threeTiles[1] === threeTiles[2];
        return emptyCheck && sameCheck;
    }

    getSnapshot() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.snapshot[i][j] = rows[i].cells[j].textContent!;
            }
        }
    }

    clearBoard() {
        for (let row of rows) {
            for (let cell of row.cells) {
                cell.textContent = '';
            }
        }
    }

    playBest() {
        this.getSnapshot();
        let bestScore = -Infinity;
        let bestMove: {i: number, j: number};
        let score: number;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.snapshot[i][j] !== '') {
                    continue;
                }
                this.snapshot[i][j] = 'X';
                score = this.minimax(false);
                this.snapshot[i][j] = '';
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = { i, j };
                }
            }
        }
        rows[bestMove.i].cells[bestMove.j].textContent = 'X';
    }

    private minimax(isMaximizing: boolean) {
        if (this.checkWin()) {
            return isMaximizing ? -1 : 1;
        } else if (this.checkTie()) {
            return 0;
        }

        let bestScore: number;
        let optimizer: Function;
        let symbol: string;

        if (isMaximizing) {
            bestScore = -Infinity;
            optimizer = Math.max;
            symbol = 'X';
        } else {
            bestScore = Infinity;
            optimizer = Math.min;
            symbol = 'O';
        }

        let score: number;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.snapshot[i][j] !== '') {
                    continue;
                }
                this.snapshot[i][j] = symbol;
                score = this.minimax(!isMaximizing);
                this.snapshot[i][j] = '';
                bestScore = optimizer(bestScore, score);
            }
        }
        return bestScore;
    }
}