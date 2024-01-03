<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import Headline from './stories/headline/Headline.vue'
import GameBoard from './stories/gameboard/GameBoard.vue'
import PlayerDisplay from './stories/playerdisplay/PlayerDisplay.vue'
import RoundWonDisplay from './stories/roundwondisplay/RoundWonDisplay.vue'
import ResetButton from './stories/resetbutton/ResetButton.vue'
import { BoardDiagnosticsPayload } from './types'
import BoardDiagnostics from './stories/boarddiagnostics/BoardDiagnostics.vue'

const store = useStore()
const won = ref<boolean>(false)
const resetting = ref<boolean>(false)
const diagnosticData = ref<BoardDiagnosticsPayload>()

const resetCallback = () => {
  won.value = false
  resetting.value = true
  store.commit('resetCurrentPlayer')
}
</script>

<template>
  <Headline size="h1" label="Tic Tac Ho Ho Ho!" />
  <GameBoard
    @change-player="store.commit('changePlayer')"
    @round-won="won = true"
    @resetted="resetting = false"
    @board-diagnostics="diagnosticData = $event"
    :current-player="store.getters.currentPlayer"
    :player-data="store.getters.playerData"
    :resetting="resetting"
  ></GameBoard>
  <PlayerDisplay
    v-if="!won"
    :player="store.getters.currentPlayer"
  ></PlayerDisplay>
  <RoundWonDisplay
    v-if="won"
    :player="store.getters.currentPlayer"
  ></RoundWonDisplay>
  <BoardDiagnostics :diagnostic-data="diagnosticData"></BoardDiagnostics>
  <ResetButton @reset="resetCallback"></ResetButton>
</template>

<style scoped></style>
