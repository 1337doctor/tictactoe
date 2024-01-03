export type DiagonalLTR = 'ltr'
export type DiagonalRTL = 'rtl'
export type DiagonalMode = DiagonalLTR | DiagonalRTL
export type BoardSizeRange = 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
export type Pos = { row: number; col: number }
export type PlayerId = number
export type Player = {
  id: PlayerId
  icon: string
  name: string
}
export type PlayerData = Array<Player>
export type GameBoardRow = Array<PlayerId>
export type GameBoardData = Array<GameBoardRow>
export type RoundWonPayload = { pos: Pos; playerId: PlayerId }
export type BoardDiagnosticsPayload = {movesLeft: number, winConditionCount: number, draw: boolean}
export type RoundWonHandler = (ep: RoundWonPayload) => void;

export interface State {
  players: PlayerData
  currentPlayerId: PlayerId
}
export const isDiagonalMode = (mode: DiagonalMode) => ['ltr', 'rtl'].includes(mode)
