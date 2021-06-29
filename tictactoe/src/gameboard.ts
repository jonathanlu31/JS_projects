import { DisplayController } from "./display";
import { Player } from "./player";

const table = document.querySelector('table')!;
const rows = table.rows;

export class GameBoard {
    private currentPlayer: number;
    private players: Player[];
    private turns;

    constructor() {
        this.currentPlayer = 0;
        this.players = [new Player('X'), new Player('O')];
        this.turns = 0;
    }

    getCurrentPlayer(): Player {
        return this.players[this.currentPlayer];
    }

    switchPlayer() {
        this.currentPlayer = ((this.currentPlayer + 1) % 2);
        DisplayController.changeTurn(this.getCurrentPlayer());
    }

    checkTie() {
        return this.turns === 9;
    }

    checkWin() {
        this.turns++;
        return this.checkRows() ||
               this.checkColumns() ||
               this.checkDiagonals();
    }

    checkRows() {
        return Array.from(rows).some((row: HTMLTableRowElement) => {
            return this.checkThreeTiles(Array.from(row.cells));
        });
    }

    checkColumns() {
        for (let i = 0; i < 3; i++) {
            let col = [];
            for (let r of rows) {
                col.push(r.cells[i]);
            }
            if (this.checkThreeTiles(col)) {
                return true;
            }
        }
        return false;
    }

    checkDiagonals() {
        let diags = [
            [rows[0].cells[0], rows[1].cells[1], rows[2].cells[2]],
            [rows[0].cells[2], rows[1].cells[1], rows[2].cells[0]]
        ];

        return diags.some((diag: HTMLTableCellElement[]) => {
            return this.checkThreeTiles(diag);
        });
    }

    checkThreeTiles(threeTiles: HTMLTableCellElement[]) {
        let firstSymbol: string | null;
        for (let i = 0; i < threeTiles.length; i++) {
            let symbol = threeTiles[i].textContent;
            if (i === 0) {
                firstSymbol = symbol;
            }
            if (!symbol || symbol !== firstSymbol!) {
                return false;
            }
        }
        return true;
    }

    clearBoard() {
        for (let row of rows) {
            for (let cell of row.cells) {
                cell.textContent = '';
            }
        }
    }

    resetTurns() {
        this.turns = 0;
    }
}