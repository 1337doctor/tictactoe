import config from '../../../config/config.mjs'
import { gameBoard } from '../../core/Board.vue'
import { cellClickedHandler } from './callbacks.mjs'
import { possibleTotalMoves } from './stats.mjs'
import { gameState } from './game.mjs'
import { getPlayerData } from './players.mjs'

const resizeFactor = 100
const tableSize = Math.floor(config.boardSize * resizeFactor)

const cellSize = Math.floor(tableSize / config.boardSize)
console.log(cellSize)
const tableLayout = 'fixed'
const tableDimension = `${tableSize}px`
const cellDimension = `${cellSize}px`
const borderStyle = '1px solid red'
const backgroundColor = 'white'
const iconSize = `${Math.floor(cellSize / 2)}px`

const createSpan = (icon) => {
  return `<span style="display: flex; justify-content: center; align-items: center; font-size: ${iconSize}">${icon}</span>`
}

const createResetButton = () => {
  const button = document.createElement('button')
  button.setAttribute('id', config.resetButtonId)
  button.innerText = 'Reset'
  button.style.margin = '20px auto'
  button.style.display = 'block'
  button.style.width = '150px'
  button.style.height = '40px'
  button.style.backgroundColor = '#a8000d'
  button.style.color = 'white'
  button.style.borderColor = 'white'
  return button
}

const createInfoField = () => {
  const infoField = document.createElement('div')
  infoField.setAttribute('id', config.infoFieldId)
  infoField.style.backgroundColor = '#a8000d'
  infoField.style.color = 'white'
  infoField.style.borderColor = 'white'
  infoField.style.width = 'auto'
  infoField.style.minHeight = '50px'
  infoField.style.display = 'grid'
  infoField.style.padding = '15px'
  const movesLeftField = document.createElement('p')
  movesLeftField.setAttribute('id', config.movesLeftField)
  const winnerField = document.createElement('p')
  winnerField.setAttribute('id', config.winnerFieldId)
  infoField.appendChild(movesLeftField)
  infoField.appendChild(winnerField)
  return infoField
}
const createGameTable = () => {
  const table = document.createElement('table')
  table.setAttribute('id', config.tableId)
  table.style.border = borderStyle
  table.style.borderCollapse = 'collapse'
  table.style.tableLayout = tableLayout
  table.style.backgroundColor = backgroundColor
  table.style.borderColor = 'white'
  table.createTHead()
  table.createTBody()
  const tbody = table.tBodies[0]
  for (let row = 0; row < config.boardSize; row++) {
    const tr = document.createElement('tr')
    tr.setAttribute('data-row', row.toString())
    tr.style.width = tableDimension
    tr.style.height = cellDimension
    for (let col = 0; col < gameBoard[row].length; col++) {
      const td = document.createElement('td')
      td.style.width = cellDimension
      td.style.height = cellDimension
      td.style.border = borderStyle
      td.style.textAlign = 'center'
      td.setAttribute(
        'data-cell',
        `row-${row.toString()}_col-${col.toString()}`,
      )
      td.innerHTML = createSpan(gameBoard[row][col] || '')
      cellClickedHandler(td, row, col)
      tr.appendChild(td)
    }
    tbody.appendChild(tr)
  }

  return table
}
export const createGameUI = () => {
  const container = document.getElementById(config.containerId)
  if (!container)
    throw new Error(`Element with id '${config.containerId} not found.`)
  const table = createGameTable()
  const button = createResetButton()
  const winNotification = createInfoField()
  container.appendChild(table)
  container.appendChild(winNotification)
  container.appendChild(button)
  updateTotalMovesField()
  updateWinnerField()
  wrapperPack()
}

export const updateUIField = (row, col, val) => {
  document.querySelector(
    `[data-cell=row-${row.toString()}_col-${col.toString()}]`,
  ).innerHTML = createSpan(val)
}

export const updateWinnerField = (row, col, val) => {
  document.getElementById(config.winnerFieldId).innerHTML = `Winner:  ${
    gameState.winner ? getPlayerData(gameState.winner).icon : '-'
  }`
}

export const updateTotalMovesField = () => {
  document.getElementById(config.movesLeftField).innerText =
    `Moves left:  ${possibleTotalMoves()}`
}

export const clearUI = () => {
  Array.from(document.getElementById(config.containerId).children).forEach(
    (child) => child.remove(),
  )
}

export const wrapperPack = () => {
  const width = document
    .getElementById(config.tableId)
    .getBoundingClientRect().width
  document.getElementById(config.contentWrapperId).style.width = `${width}px`
}
