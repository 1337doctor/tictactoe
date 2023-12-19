import config from '../../../config/config.mjs'
import { gameBoard } from '../../core/Board.vue'

export const possibleTotalMoves = () => {
  return gameBoard.flat().filter((cell) => cell === null).length
}
