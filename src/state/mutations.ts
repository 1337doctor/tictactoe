import {CellClickedPayload, GameBoardData, Player, State} from '../types'

export default {
  setGameBoardData: (state: State, gameBoard: GameBoardData) =>
    (state.gameBoard = gameBoard),
  setGameBoardDataValueAt: (state: State, ep: CellClickedPayload) => {
    state.gameBoard[ep.pos.row][ep.pos.col] = ep.playerId;
  },
  changePlayer: (state: State) => {
    const playerIndex: number = state.players
        .map((player: Player) => player.id)
        .indexOf(state.currentPlayerId)

    const next = playerIndex + 1 > state.players.length - 1 ? 0 : playerIndex + 1
    state.currentPlayerId = state.players[next].id
  }
}
