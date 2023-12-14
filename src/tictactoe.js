import {gameBoard, getRow, getDiag, getColumn,setValueAtOnce, getValueAt, isOnDiag} from "./board.mjs";
import {createGameUI} from "./ui.mjs";
import {listenersInit} from "./listeners.mjs";

createGameUI();
listenersInit();

window.ttt = {
    gameBoard,
    getRow,
    getDiag,
    getColumn,
    setValueAtOnce,
    getValueAt,
    isOnDiag
}
