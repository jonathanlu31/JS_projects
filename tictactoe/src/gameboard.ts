import { Player } from "./player";

export class GameBoard {
    private currentPlayer: number;
    private players: Player[];
    private turns;
    private board: string[][];

    constructor() {
        this.currentPlayer = 0;
        this.players = [new Player('X'), new Player('O')];
        this.turns = 0;
        this.board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
    }

    getCurrentPlayer(): Player {
        return this.players[this.currentPlayer];
    }

    switchPlayer() {
        this.currentPlayer = ((this.currentPlayer + 1) % 2);
    }

    function checkTie() {
        return turns === 9;
    }

    function checkWin() {
        turns++;
        return checkRows() ||
               checkColumns() ||
               checkDiagonals();
    }

    function checkRows() {
        return Array.from(rows).some((row: HTMLTableRowElement) => {
            return checkThreeTiles(Array.from(row.cells));
        });
    }

    function checkColumns() {
        for (let i = 0; i < 3; i++) {
            let col = [];
            for (let r of rows) {
                col.push(r.cells[i]);
            }
            if (checkThreeTiles(col)) {
                return true;
            }
        }
        return false;
    }

    function checkDiagonals() {
        let diags = [
            [rows[0].cells[0], rows[1].cells[1], rows[2].cells[2]],
            [rows[0].cells[2], rows[1].cells[1], rows[2].cells[0]]
        ];

        return diags.some((diag: HTMLTableCellElement[]) => {
            return checkThreeTiles(diag);
        });
    }

    function checkThreeTiles(threeTiles: HTMLTableCellElement[]) {
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
}