<template>
  <table>
    <tbody>
      <tr v-for="(row, rowIndex) in props.gameBoard" :key="`row-${rowIndex}`">
        <td
          v-for="(col, colIndex) in row"
          :key="`row-${rowIndex}_col-${colIndex}`"
        >
          <button
            type="button"
            @click="
              cellClickHandler({
                pos: {
                  row: rowIndex,
                  col: colIndex,
                },
                playerId: props.player.id,
              })
            "
          >
            <span v-html="getPlayerDataForCell(rowIndex, colIndex)?.icon"></span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import {
  CellClickedPayload,
  GameBoardData,
  Player,
  PlayerData,
} from '../../types'

interface Props {
  gameBoard: GameBoardData
  player: Player
  playerData: PlayerData
}

interface Emits {
  (e: 'cellClicked', CellClickedPayload): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const cellClickHandler = (ep: CellClickedPayload) => {
  emit('cellClicked', ep)
}

const getPlayerDataForCell = (row, col) => {
  const [firstEntry] = props.playerData.filter(
    (player: Player) => props.gameBoard[row][col] === player.id,
  )
  return firstEntry
}
</script>

<style lang="scss"></style>
