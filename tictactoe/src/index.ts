import { DisplayController } from "./display";
import { Modal } from 'bootstrap';

const gameDisplay = new DisplayController();
const modal = document.getElementById('gameMode')!;
const gameModeModal = new Modal(modal, {
    backdrop: 'static',
    keyboard: false
});
gameModeModal.show();
const table = document.querySelector('table')!;
const resetButton = document.getElementById('reset')! as HTMLButtonElement;

modal.addEventListener('click', e => {
    if ((e.target as HTMLElement).tagName !== 'BUTTON') {
        return;
    }
    gameDisplay.setGameMode((e.target as HTMLElement).dataset.mode!);
    gameModeModal.hide();
    gameDisplay.startGame();
})
table.addEventListener('click', e => gameDisplay.markTile(e));
resetButton.addEventListener('click', () => gameDisplay.reset());

// FIXME doesn't change the header for turn after game over
// FIXME After player wins the AI will still playa move