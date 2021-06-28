export class Player {
    constructor(public symbol: string) {}

    mark(this: Player, tile: HTMLTableCellElement) {
        if (tile.textContent) {
            return false;
        }
        tile.textContent = this.symbol;
        return true;
    }
}