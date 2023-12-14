import config from "../config/config.mjs";
import {gameBoard} from "./board.mjs";

export const possibleTotalMoves = () => {
    return gameBoard.flat().filter((cell) => cell === null).length;
}