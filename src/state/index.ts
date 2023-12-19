import { createStore } from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import {BoardSizeRange, PlayerData, State} from '../types'
import { createSquareGameBoard } from '../helpers'

const initialBoardSize: BoardSizeRange = 3


const players: PlayerData = [
  {
    id: 1,
    icon: '&#127876;',
    name: 'X-Mas Tree',
  },
  {
    id: 2,
    icon: '&#127877;',
    name: 'Santa',
  },
]

const initialState: State = {
  gameBoardSize: initialBoardSize,
  gameBoard: createSquareGameBoard(initialBoardSize),
  players,
  currentPlayerId: 1
}
export const store = createStore({
  state() {
    return initialState
  },
  mutations,
  getters,
  actions,
})
