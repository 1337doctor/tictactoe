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

const GAME_BOARD_SIZE: number = 5;

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

  (e: 'roundDraw', ep: RoundWonPayload): void

  (e: 'boardDiagnostics', ep: BoardDiagnosticsPayload): void

  (e: 'changePlayer'): void

  (e: 'resetted'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const gameBoardData = ref<GameBoardData>(createSquareGameBoard(GAME_BOARD_SIZE))
const gameBoardRowCount = gameBoardData.value.length
const currentPosition = ref<Pos>({ row: null, col: null })
const eliminatedCols = ref<Array<boolean>>(Array(gameBoardRowCount))
const eliminatedDiag = ref<Array<boolean>>(Array(2))
const eliminatedRows = ref<Array<boolean>>(Array(gameBoardRowCount))

onMounted(() => {
  initWinningConditions()
  emitBoardDiagnostics()
})

watch(
  gameBoardData,
  () => {
    if (!allDiagEliminated.value) diagWinLookahead()
    if (!allRowsEliminated.value) rowsWinLookAhead()
    if (!allColsEliminated.value) colsWinLookAhead()
    emitBoardDiagnostics()
  },
  { deep: true },
)

watch(
  () => props.resetting,
  () => {
    if (props.resetting) reset()
  },
)

const allColsEliminated = computed<boolean>(() =>
  eliminatedCols.value.every((element) => element === true),
)

const allDiagEliminated = computed<boolean>(() =>
  eliminatedDiag.value.every((element) => element === true),
)

const allRowsEliminated = computed<boolean>(() =>
  eliminatedRows.value.every((element) => element === true),
)

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

const currentPlayerData = computed<Player>(() =>
  getPlayerDataForCell(currentPosition.value.row, currentPosition.value.col),
)

const currentRowData = computed<GameBoardRow>(() =>
  getRowAt(currentPosition.value.row || 0),
)

const draw = computed(() => winConditionCount.value < 2 && !won.value)

const isWinningPossible = computed<boolean>(() => !draw.value && !won.value)

const movesLeft = computed(
  () => gameBoardData.value.flat().filter((element) => element === null).length,
)

const winConditionCount = computed<number>(
  () =>
    [
      ...eliminatedDiag.value,
      ...eliminatedRows.value,
      ...eliminatedCols.value,
    ].filter((element) => element === false).length,
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
  if (won.value || draw.value) return false
  currentPosition.value = { row: ep.pos.row, col: ep.pos.col }
  if (currentCellData.value) return false
  currentCellData.value = props.currentPlayer.id
  if (won.value) {
    emit('roundWon', {
      pos: currentPosition.value,
      playerId: currentPlayerData.value.id,
    })
  } else if (draw.value) {
    emit('roundDraw', {
      pos: currentPosition.value,
      playerId: currentPlayerData.value.id,
    })
  } else {
    emit('changePlayer')
  }
}

const colsWinLookAhead: () => void = () => {
  for (let i = 0; i < gameBoardRowCount; i++) {
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

const emitBoardDiagnostics = () => {
  emit('boardDiagnostics', {
    movesLeft: movesLeft.value,
    winConditionCount: winConditionCount.value,
    draw: draw.value,
  })
}

const getColAt = (col: number) => {
  const colValues: Array<PlayerId> = Array(gameBoardRowCount)
  for (let i = 0; i < gameBoardRowCount; i++) {
    colValues[i] = getValueAt({ row: i, col })
  }
  return colValues
}

const getPlayerDataForCell = (row: number, col: number) => {
  if (row === null || col === null) return null
  const [firstEntry] = props.playerData.filter(
    (player: Player) => gameBoardData.value[row][col] === player.id,
  )
  return firstEntry
}

const getRowAt = (row: number) => {
  return gameBoardData.value[row]
}

const getValueAt = (pos: Pos) => {
  return gameBoardData.value[pos.row][pos.col]
}

const initBoard = () => {
  gameBoardData.value = createSquareGameBoard(GAME_BOARD_SIZE)
}

const initWinningConditions = () => {
  eliminatedRows.value = Array(gameBoardRowCount).fill(false)
  eliminatedCols.value = Array(gameBoardRowCount).fill(false)
  eliminatedDiag.value = Array(2).fill(false)
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

const reset = () => {
  initBoard()
  initWinningConditions()
  emit('resetted')
}

const rowsWinLookAhead: () => void = () => {
  for (let i = 0; i < gameBoardRowCount; i++) {
    eliminatedRows.value[i] = !isFullRowPossible(getRowAt(i))
  }
}
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
