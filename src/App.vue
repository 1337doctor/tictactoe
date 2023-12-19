<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import Headline from './stories/headline/Headline.vue'
import GameBoard from './stories/gameboard/GameBoard.vue'
import {CellClickedPayload} from "./types";
const store = useStore()

const updateBoardAfterClick = (ep: CellClickedPayload) => {
  store.commit('setGameBoardDataValueAt', ep);
  store.commit('changePlayer');
}
</script>

<template>
  <Headline size="h1" label="Tic Tac Ho Ho Ho!" />
  <GameBoard
    @cell-clicked="updateBoardAfterClick($event)"
    :game-board="store.getters.gameBoard"
    :player="store.getters.getCurrentPlayer"
    :player-data="store.getters.playerData"
  ></GameBoard>
</template>

<style scoped></style>
