import {
  DiagonalMode,
  isDiagonalMode,
  PlayerData,
  State,
  Player,
  GameBoardRow,
} from '../types'

export default {
  playerData: (state: State) => state.players,
  currentPlayer: (state: State): Player | null => {
    const filtered: PlayerData = state.players.filter(
      (player: Player) => player.id === state.currentPlayerId,
    )
    if (filtered.length > 0) {
      return filtered[0]
    } else {
      return null
    }
  },
}
