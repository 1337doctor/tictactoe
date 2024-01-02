import {BoardSizeRange, GameBoardData, GameBoardRow} from "../types";

export const createSquareGameBoard: (boardSize: BoardSizeRange)=>GameBoardData = (boardSize: BoardSizeRange) => {
  const gameBoard: GameBoardData = Array(boardSize)
  for (let i = 0; i < boardSize; i++) {
    const row: GameBoardRow = Array(boardSize).fill(null)
    gameBoard[i] = row
  }
  return gameBoard
}