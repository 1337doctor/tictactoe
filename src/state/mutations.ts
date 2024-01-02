import {Player, State} from '../types'

export default {
  resetCurrentPlayer: (state: State) => state.currentPlayerId = state.players[0]?.id,
  changePlayer: (state: State) => {
    const playerIndex: number = state.players
        .map((player: Player) => player.id)
        .indexOf(state.currentPlayerId)

    const next = playerIndex + 1 > state.players.length - 1 ? 0 : playerIndex + 1
    state.currentPlayerId = state.players[next].id
  }
}
