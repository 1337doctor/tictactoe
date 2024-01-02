<template>
  <div>
    <span>Currently playing: </span>
    <span v-html="player.icon"> </span>
  </div>
</template>

<script setup lang="ts">
import { Player } from '../../types'

interface Props {
  player: Player
}
const props = defineProps<Props>()
</script>

<style lang="scss"></style>
