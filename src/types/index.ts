export const DIAGONAL_RTL_IDENTIFIER: string = 'rtl'
export const DIAGONAL_LTR_IDENTIFIER: string = 'ltr'
export type NonEmptyArray<T> = [T, ...[T]]
export type DiagonalLTR = DIAGONAL_LTR_IDENTIFIER
export type DiagonalRTL = DIAGONAL_RTL_IDENTIFIER
export type DiagonalMode = DiagonalLTR | DiagonalRTL
export type BoardSizeRange = 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
export type Pos = { row: number; col: number }
export type PlayerId = number
export type CellClickedPayload = { pos: Pos; playerId: PlayerId }
export type Player = {
  id: PlayerId
  icon: string
  name: string
}

export interface PlayerData {
  [index: number]: NonEmptyArray<Player>
}
export interface GameBoardData {
  [index: number]: NonEmptyArray<null | PlayerId>
}

export interface State {
  boardSize: BoardSizeRange
  gameBoard: GameBoardData,
  players: PlayerData,
  currentPlayerId: PlayerId
}
export const isDiagonalMode = (mode) =>
  [DIAGONAL_RTL_IDENTIFIER, DIAGONAL_LTR_IDENTIFIER].includes(mode)
