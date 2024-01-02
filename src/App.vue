<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import Headline from './stories/headline/Headline.vue'
import GameBoard from './stories/gameboard/GameBoard.vue'
import PlayerDisplay from "./stories/playerdisplay/PlayerDisplay.vue";
import RoundWonDisplay from "./stories/roundwondisplay/RoundWonDisplay.vue";
import ResetButton from "./stories/resetbutton/ResetButton.vue";
const store = useStore()
const won = ref<boolean>(false);
const resetting = ref<boolean>(false)

const resetCallback = () => {
  won.value = false;
  resetting.value = true;
  store.commit('resetCurrentPlayer')
}

</script>

<template>
  <Headline size="h1" label="Tic Tac Ho Ho Ho!" />
  <GameBoard
    @change-player="store.commit('changePlayer')"
    @round-won="won = true"
    :current-player="store.getters.currentPlayer"
    :player-data="store.getters.playerData"
    :resetting="resetting"
    @resetted="resetting = false"
  ></GameBoard>
  <PlayerDisplay v-if="!won" :player="store.getters.currentPlayer"></PlayerDisplay>
  <RoundWonDisplay v-if="won" :player="store.getters.currentPlayer"></RoundWonDisplay>
  <reset-button @reset="resetCallback()"/>
</template>

<style scoped></style>
