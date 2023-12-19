import {DiagonalMode, isDiagonalMode, PlayerData, State, PlayerId, Player} from "../types";

export default {
  gameBoardSize: (state: State) => state.gameBoardSize,
  gameBoard: (state: State) => state.gameBoard,
  playerData: (state: State) => state.players,
  getGameBoardValueAt: (state: State) => (row: number, col: number) => state.gameBoard[row][col],
  getGameBoardRow: (state: State) => (row) =>  state.gameBoard[row],
  getGameBoardDiag: (state: State) => (mode: DiagonalMode) => {
    if (!isDiagonalMode(mode)) return [];
    const diagValues = Array();
    for (let i = 0; i < state.gameBoard.length; i++) {
      const colIndex = mode === 'ltr' ? i : state.gameBoard.length - 1 - i;
      diagValues.push(state.gameBoard[i][colIndex]);
    }
    return diagValues;
  },
  getCurrentPlayer: (state: State) => {
    const filtered: PlayerData = state.players.filter((player: Player) => player.id === state.currentPlayerId)
    if (filtered.length > 0) return filtered[0]
    throw new Error(`Player id '${id}' not found.`)
  },

}
