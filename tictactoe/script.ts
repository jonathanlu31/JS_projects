/* gameboard: current player, board of tiles
players: score, mark()
*/
const GameBoard = (() => {
    let currentPlayer: 0 | 1 = 0;
    // TODO: fix the type
    const players: typeof Player[] = [new Player('X'), new Player('O')];
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
            if (!symbol || symbol !== firstSymbol) {
                return false;
            }
        }
        return true;
    }

    return {
        getCurrentPlayer,
        switchPlayer,
        checkWin,
        checkTie
    }
})();

const displayController = (function () {
    function markTile(e: Event) {
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

    function changeTurn(currPlayer: typeof Player) {
        turnHeader.textContent = `Player ${currPlayer.symbol}'s turn`;
    }

    function reset() {
        for (let row of rows) {
            for (let cell of row.cells) {
                cell.textContent = '';
            }
        }
    }

    function endGame(win: boolean) {
        if (win) {
            turnHeader.textContent = `Player ${GameBoard.getCurrentPlayer().symbol} wins!`;
        } else {
            turnHeader.textContent = "It's a tie!";
        }
    }

    return {
        markTile,
        changeTurn,
        reset,
        endGame
    }
})()

function Player(symbol: string) {
    this.symbol = symbol;
    this.mark = (tile: HTMLTableCellElement) => {
        if (tile.textContent) {
            return false;
        }
        tile.textContent = this.symbol;
        return true;
    }
}

const table = document.querySelector('table')!;
const resetButton = document.getElementById('reset')! as HTMLButtonElement;
const rows = table.rows;
const turnHeader = document.getElementById('turn')! as HTMLParagraphElement;
table.addEventListener('click', displayController.markTile);
resetButton.addEventListener('click', displayController.reset);