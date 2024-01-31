import { createStore } from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import { PlayerData, State } from '../types'

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
  {
    id: 3,
    icon: '🦌',
    name: 'Rudolph',
  }
]

const initialState: State = {
  players,
  currentPlayerId: 1,
}
export const store = createStore({
  state() {
    return initialState
  },
  mutations,
  getters,
  actions,
})
