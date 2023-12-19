<script setup lang="ts">
import { ref, onMounted } from 'vue'

export interface Props {
  count?: number
}

const props = withDefaults(defineProps<Props>(), { count: 0 })

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${props.count}.`)
})

/*
import config from '../../config/config.mjs';
import {datasetChangedDispatcher} from "../dispatchers.mjs";

const createInitialRow = () => {
    const row = Array(config.boardSize);
    for (let i = 0; i < config.boardSize; i++) {
        row[i] = null;
    }
    return row;
}
const createSquareGameBoard = () => {
    const gameBoard = Array(config.boardSize);
    for (let i = 0; i < config.boardSize; i++) {
        gameBoard[i] = createInitialRow(config.boardSize);
    }
    return gameBoard;
}

let gameBoard = createSquareGameBoard();



const setValueAt = (row, col, val) => {
    gameBoard[row][col] = val;
    datasetChangedDispatcher(row, col, val);
}

const setValueAtOnce = (row, col, val) => {
    const pos = gameBoard[row][col];
    if (pos !== null) return false;
    setValueAt(row, col, val);
    return true;
}


const getColumn = (col) => {
    if (col - 1 > config.boardSize) {
        throw new Error('Column out of bounds.');
    }
    const colValues = Array(config.boardSize);
    for (let i = 0; i < config.boardSize; i++) {
        colValues[i] = gameBoard[i][col];
    }
    return colValues;
}


const isOnDiag = (row, col) => {
    return {
        ltr: row === col,
        rtl: config.boardSize - 1 - col === row,
    }
}

const resetGameBoard = () => {
    gameBoard = createSquareGameBoard();
}

export {gameBoard, resetGameBoard, getValueAt, getColumn, getRow, getDiag, setValueAt, setValueAtOnce, isOnDiag, createSquareGameBoard}
*/
</script>

<template></template>
