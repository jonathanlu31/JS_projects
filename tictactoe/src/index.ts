import { DisplayController } from "./display";

const gameDisplay = new DisplayController();
const table = document.querySelector('table')!;
const resetButton = document.getElementById('reset')! as HTMLButtonElement;
table.addEventListener('click', e => gameDisplay.markTile(e));
resetButton.addEventListener('click', () => gameDisplay.reset());