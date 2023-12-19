import {BoardSizeRange, GameBoardData, NonEmptyArray} from "../types";

export const createSquareGameBoard: GameBoardData = (boardSize: BoardSizeRange) => {
  const gameBoard: GameBoardData = Array(boardSize)
  for (let i = 0; i < boardSize; i++) {
    let row: NonEmptyArray = Array(boardSize)
    for (let i = 0; i < boardSize; i++) {
      row[i] = null
    }
    gameBoard[i] = row
  }
  return gameBoard
}