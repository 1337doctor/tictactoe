import { gameState } from './game.mjs'

const players = [
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

export const getPlayerData = (id) => {
  const filtered = players.filter((player) => player.id === id)
  if (filtered.length > 0) return filtered[0]
  throw new Error(`Player id '${id}' not found.`)
}

export const changePlayer = () => {
  const playerIndex = players
    .map((player) => player.id)
    .indexOf(gameState.currentPlayerId)

  const next = playerIndex + 1 > players.length - 1 ? 0 : playerIndex + 1
  gameState.currentPlayerId = players[next].id
}
