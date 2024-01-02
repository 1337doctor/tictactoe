<template>
  <div class="ttt-game">
    <div
      class="ttt-row"
      v-for="(row, rowIndex) in gameBoardData"
      :key="`row-${rowIndex}`"
    >
      <div
        class="ttt-col"
        v-for="(col, colIndex) in row"
        :key="`row-${rowIndex}_col-${colIndex}`"
      >
        <button
          type="button"
          class="btn-cell"
          @click="
            cellClickHandler({
              pos: {
                row: rowIndex,
                col: colIndex,
              },
              playerId: props.currentPlayer.id,
            })
          "
        >
          <span
            class="ttt-caption"
            v-html="getPlayerDataForCell(rowIndex, colIndex)?.icon"
          ></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  RoundWonPayload,
  RoundWonHandler,
  GameBoardData,
  GameBoardRow,
  Player,
  PlayerData,
  PlayerId,
  Pos,
  BoardDiagnosticsPayload,
} from '../../types'
import { watch, computed, ref, onMounted } from 'vue'
import { createSquareGameBoard } from '../../helpers'

interface Props {
  playerData: PlayerData
  currentPlayer: Player
  resetting: boolean
}

interface Emits {
  (e: 'roundWon', ep: RoundWonPayload): void

  (e: 'boardDiagnostics', ep: BoardDiagnosticsPayload): void

  (e: 'changePlayer'): void

  (e: 'resetted'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const gameBoardData = ref<GameBoardData>(createSquareGameBoard(3))
const gameBoardRowCount = gameBoardData.value.length
const currentPosition = ref<Pos>({ row: null, col: null })
const eliminatedRows = ref<Array<boolean>>(Array(gameBoardRowCount))
const eliminatedCols = ref<Array<boolean>>(Array(gameBoardRowCount))
const eliminatedDiag = ref<Array<boolean>>(Array(2))

onMounted(() => {
  initWinningConditions()
})

watch(
  gameBoardData,
  () => {
    console.log('aua')
    if (!allDiagEliminated.value) diagWinLookahead()
    if (!allRowsEliminated.value) rowsWinLookAhead()
    if (!allColsEliminated.value) colsWinLookAhead()
  },
  { deep: true },
)

watch(
  () => props.resetting,
  () => {
    if (props.resetting) reset()
  },
)

const allDiagEliminated = computed<boolean>(() =>
  eliminatedDiag.value.every((element) => element === true),
)
const allRowsEliminated = computed<boolean>(() =>
  eliminatedRows.value.every((element) => element === true),
)
const allColsEliminated = computed<boolean>(() =>
  eliminatedCols.value.every((element) => element === true),
)

const isWinningPossible = computed<boolean>(
  () => !draw.value
)

const winConditionCount = computed<number>(
  () =>
    [
      ...eliminatedDiag.value,
      ...eliminatedRows.value,
      ...eliminatedCols.value,
    ].filter((element) => element === false).length,
)

const movesLeft = computed(
  () => gameBoardData.value.flat().filter((element) => element === null).length,
)
const draw = computed(() => winConditionCount.value < 2)
const currentRowData = computed<GameBoardRow>(() =>
  getRowAt(currentPosition.value.row || 0),
)
const currentColData = computed<GameBoardRow>(() =>
  getColAt(currentPosition.value.col || 0),
)
const currentDiagonalData = computed<GameBoardData>(() => {
  const ltr: GameBoardRow = Array()
  const rtl: GameBoardRow = Array()
  for (let i = 0; i < gameBoardRowCount; i++) {
    ltr.push(gameBoardData.value[i][i])
    rtl.push(gameBoardData.value[i][gameBoardRowCount - 1 - i])
  }
  return Array<GameBoardRow>(ltr, rtl)
})

const currentCellData = computed<PlayerId>({
  get: () =>
    gameBoardData.value[currentPosition.value.row || 0][
      currentPosition.value.col || 0
    ],
  set: (pid: PlayerId) => {
    gameBoardData.value[currentPosition.value.row][currentPosition.value.col] =
      pid
  },
})
const currentPlayerData = computed<Player>(() =>
  getPlayerDataForCell(currentPosition.value.row, currentPosition.value.col),
)
const won = computed<boolean>(() => {
  return (
    isFullRow(currentRowData.value) ||
    isFullRow(currentColData.value) ||
    isFullRow(currentDiagonalData.value[0]) ||
    isFullRow(currentDiagonalData.value[1])
  )
})

const cellClickHandler: RoundWonHandler = (ep: RoundWonPayload) => {
  if (won.value) return false
  currentPosition.value = { row: ep.pos.row, col: ep.pos.col }
  if (currentCellData.value) return false
  currentCellData.value = props.currentPlayer.id
  if (!won.value) {
    emit('changePlayer')
  } else {
    emit('roundWon', {
      pos: currentPosition.value,
      playerId: currentPlayerData.value.id,
    })
  }
}
const getPlayerDataForCell = (row: number, col: number) => {
  if (row === null || col === null) return null
  const [firstEntry] = props.playerData.filter(
    (player: Player) => gameBoardData.value[row][col] === player.id,
  )
  return firstEntry
}
const isFullRow = (dataSet: GameBoardRow) => {
  for (let i = 1; i < dataSet.length; i++) {
    if (dataSet[i - 1] === null || dataSet[i - 1] !== dataSet[i]) return false
  }
  return true
}
const isFullRowPossible = (dataSet: GameBoardRow) => {
  const noEmptyFields = dataSet.filter((entry) => entry !== null)
  for (let i = 1; i < noEmptyFields.length; i++) {
    if (noEmptyFields[i - 1] !== noEmptyFields[i]) return false
  }
  return true
}
const getValueAt = (pos: Pos) => {
  return gameBoardData.value[pos.row][pos.col]
}
const getRowAt = (row: number) => {
  return gameBoardData.value[row]
}
const getColAt = (col: number) => {
  const colValues: Array<PlayerId> = Array(gameBoardRowCount)
  for (let i = 0; i < gameBoardRowCount; i++) {
    colValues[i] = getValueAt({ row: i, col })
  }
  return colValues
}
const rowsWinLookAhead: () => void = () => {
  for (let i = 0; i < gameBoardRowCount; i++) {
    eliminatedRows.value[i] = !isFullRowPossible(getRowAt(i))
  }
}
const colsWinLookAhead: () => void = () => {
  for (let i = 0; i < gameBoardRowCount; i++) {
    console.log('hallo', isFullRowPossible(getColAt(i)))
    eliminatedCols.value[i] = !isFullRowPossible(getColAt(i))
  }
}
const diagWinLookahead: () => void = () => {
  let diagLtrPossible = false
  let diagRtlPossible = false
  const [ltr, rtl] = eliminatedDiag.value
  if (!ltr) {
    diagLtrPossible = isFullRowPossible(currentDiagonalData.value[0])
    eliminatedDiag.value[0] = !diagLtrPossible
  }
  if (!rtl) {
    diagRtlPossible = isFullRowPossible(currentDiagonalData.value[1])
    eliminatedDiag.value[1] = !diagRtlPossible
  }
}

const initWinningConditions = () => {
  eliminatedRows.value = Array(gameBoardRowCount).fill(false)
  eliminatedCols.value = Array(gameBoardRowCount).fill(false)
  eliminatedDiag.value = Array(2).fill(false)
}

const initBoard = () => {
  gameBoardData.value = createSquareGameBoard(3)
}

const reset = () => {
  initBoard()
  initWinningConditions()
  emit('resetted')
}

/*
*
const win = (dataSet) => {
  for (let i = 1; i < dataSet.length; i++) {
    if (dataSet[i - 1] === null || dataSet[i - 1] !== dataSet[i]) return false
  }
  return true
}

export const checkWin = (row, col) => {
  const diag = Array()
  const { ltr, rtl } = isOnDiag(row, col)
  const values = [gameBoardRow(row), gameBoardColumn(col)]
  if (ltr) values.push(gameBoardDiag('ltr'))
  if (rtl) values.push(gameBoardDiag('rtl'))

  for (let i = 0; i < values.length; i++) {
    const dataset = values[i]
    if (win(dataset)) {
      //gameState.winner = gameState.currentPlayerId
      //gameState.won = true
      return true
    }
  }
  return false
}

const gameBoardValueAt = (row: number, col: number) => gameBoardData[row][col]
const gameBoardRow =  (row: number) => gameBoardData[row]
const gameBoardDiag:  (mode: DiagonalMode) => Array<PlayerId> = (mode: DiagonalMode) => {
  if (!isDiagonalMode(mode)) return [null, null, null]
  const diagValues: GameBoardRow = Array()
  for (let i = 0; i < gameBoardRowCount; i++) {
    const colIndex = mode === 'ltr' ? i : gameBoardRowCount - 1 - i
    diagValues.push(gameBoardData[i][colIndex])
  }
  return diagValues
}
const gameBoardColumn: (col: number) => Array<PlayerId> = (col: number) => {
  if (col - 1 > gameBoardRowCount) {
    return [null, null, null]
  }
  const colValues: Array<PlayerId> = Array(gameBoardRowCount);
  for (let i = 0; i <  gameBoardRowCount; i++) {
    colValues[i] =  gameBoardData[i][col];
  }
  return colValues;
}
const isOnDiag = (row: number, col: number) => {
  return {
    ltr: row === col,
    rtl: gameBoardRowCount - 1 - col === row,
  }
}

*
* */
</script>

<style lang="scss">
.ttt-game {
  display: table;

  .ttt-row {
    display: table-row;

    .ttt-col {
      display: table-cell;

      .btn-cell {
        width: 100px;
        height: 100px;
        position: relative;
        overflow: hidden;

        .ttt-caption {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          font-size: 60px;
        }
      }
    }
  }
}
</style>
