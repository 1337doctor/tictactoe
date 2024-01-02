<template>
  <div>
    <button type="button" @click="resetButtonClickedHandler">Reset</button>
  </div>
</template>

<script setup lang="ts">

interface Props {
}
interface Emits {
  (e: 'reset')
}
const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const resetButtonClickedHandler = () => {
  emit('reset')
}
</script>

<style lang="scss"></style>
