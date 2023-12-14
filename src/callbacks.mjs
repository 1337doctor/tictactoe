import {gameState} from "./game.mjs";
import {changePlayer, getPlayerData} from "./players.mjs";
import {createSquareGameBoard, gameBoard, resetGameBoard, setValueAtOnce} from "./board.mjs";
import {createGameUI, updateUIField} from "./ui.mjs";
import {checkWin} from "./rules.mjs";
import config from "../config/config.mjs";
import {listenersInit} from "./listeners.mjs";

export const cellClickedHandler = (element, row, col) => {
    element.addEventListener('click', () => {
        if (!setValueAtOnce(row, col, getPlayerData(gameState.currentPlayerId)?.name) || gameState.won) return;
        changePlayer();
    })
}

export const dataSetChangedCallback = (evt) => {
    if (gameState.won) return;
    const row = evt.detail.row;
    const col = evt.detail.col;
    const val = evt.detail.val;
    updateUIField(row, col, val);
    checkWin(row, col);
}

export const resetButtonCallback = () => {
    if (document.getElementById(config.containerId) !== null) {
        Array.from(document.getElementById(config.containerId).children).forEach((child)=>child.remove());
        document.removeEventListener('datasetChanged', dataSetChangedCallback);
    }
    gameState.won = false;
    gameState.winner = null;
    gameState.currentPlayerId = 1;
    resetGameBoard();
    createGameUI();
    listenersInit();
}