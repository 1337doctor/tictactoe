import {getRow, getColumn, getDiag, isOnDiag} from "./board.mjs";
import {roundWonDispatcher} from "./dispatchers.mjs";
import {gameState} from "./game.mjs";
const win = (dataSet) => {
    for (let i = 1; i < dataSet.length; i++) {
        if (dataSet[i - 1] === null || dataSet[i - 1] !== dataSet[i]) return false;
    }
    return true;
}

export const checkWin = (row, col) => {

    const diag = Array();
    const {ltr, rtl} = isOnDiag(row, col);
    const values =  [getRow(row), getColumn(col)];
    if (ltr) values.push(getDiag('ltr'));
    if (rtl) values.push(getDiag('rtl'));

    for (let i = 0; i < values.length; i++) {
        const dataset = values[i]
        if (win(dataset)) {
            gameState.winner = gameState.currentPlayerId;
            gameState.won = true;
            roundWonDispatcher();
            return true;
        }
    }
    return false;
}


