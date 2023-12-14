import {gameState, initGameState} from "./game.mjs";
import {changePlayer, getPlayerData} from "./players.mjs";
import {createSquareGameBoard, gameBoard, resetGameBoard, setValueAtOnce} from "./board.mjs";
import {clearUI, createGameUI, updateTotalMovesField, updateUIField, updateWinnerField} from "./ui.mjs";
import {checkWin} from "./rules.mjs";
import {run} from "./tictactoe.js";

export const cellClickedHandler = (element, row, col) => {
    element.addEventListener('click', () => {
        if (!setValueAtOnce(row, col, getPlayerData(gameState.currentPlayerId)?.icon) || gameState.won) return;
        changePlayer();
    })
}

export const dataSetChangedCallback = (evt) => {
    if (gameState.won) return;
    const row = evt.detail.row;
    const col = evt.detail.col;
    const val = evt.detail.val;
    updateUIField(row, col, val);
    updateTotalMovesField();
    checkWin(row, col);
}

export const roundWonCallback = (evt) => {
    updateWinnerField();
}

export const resetButtonCallback = () => {
    run();
}