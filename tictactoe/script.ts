class Player {
    constructor(public symbol: string) {}

    mark(this: Player, tile: HTMLTableCellElement) {
        if (tile.textContent) {
            return false;
        }
        tile.textContent = this.symbol;
        return true;
    }
}

const GameBoard = (() => {
    let currentPlayer: 0 | 1 = 0;
    const players: Player[] = [new Player('X'), new Player('O')];
    let turns = 0;


    function getCurrentPlayer(): Player {
        return players[currentPlayer];
    }

    function switchPlayer() {
        currentPlayer = ((currentPlayer + 1) % 2) as 0 | 1;
        displayController.changeTurn(getCurrentPlayer());
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

    function resetTurns() {
        turns = 0;
    }

    return {
        getCurrentPlayer,
        switchPlayer,
        checkWin,
        checkTie,
        resetTurns
    }
})();

const displayController = (function () {
    function markTile(e: MouseEvent) {
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

    function changeTurn(currPlayer: Player) {
        turnHeader.textContent = `Player ${currPlayer.symbol}'s turn`;
    }

    function reset() {
        for (let row of rows) {
            for (let cell of row.cells) {
                cell.textContent = '';
            }
        }
        turnHeader.textContent = "Player X's turn";
        table.removeEventListener('click', displayController.markTile);
        table.addEventListener('click', displayController.markTile);
        if (GameBoard.getCurrentPlayer().symbol === 'O') {
            GameBoard.switchPlayer();
        }
        GameBoard.resetTurns();

    }

    function endGame(win: boolean) {
        if (win) {
            turnHeader.textContent = `Player ${GameBoard.getCurrentPlayer().symbol} wins!`;
        } else {
            turnHeader.textContent = "It's a tie!";
        }
        table.removeEventListener('click', displayController.markTile);
    }

    return {
        markTile,
        changeTurn,
        reset,
        endGame
    }
})()

const table = document.querySelector('table')!;
const resetButton = document.getElementById('reset')! as HTMLButtonElement;
const rows = table.rows;
const turnHeader = document.getElementById('turn')! as HTMLParagraphElement;
table.addEventListener('click', displayController.markTile);
resetButton.addEventListener('click', displayController.reset);