import {gameBoard, getRow, getDiag, getColumn, setValueAtOnce, getValueAt, isOnDiag, resetGameBoard} from "./board.mjs";
import {clearUI, createGameUI} from "./ui.mjs";
import {listenersInit, removeAllListeners} from "./listeners.mjs";
import {initGameState} from "./game.mjs";
import config from "../config/config.mjs";


export const run = () => {
    if (document.getElementById(config.tableId) !== null) {
        removeAllListeners();
        clearUI();
    }
    resetGameBoard();
    initGameState();
    createGameUI();
    listenersInit();
}


const debugMode = () => {
    window.ttt = {
        gameBoard,
        getRow,
        getDiag,
        getColumn,
        setValueAtOnce,
        getValueAt,
        isOnDiag
    }
}
