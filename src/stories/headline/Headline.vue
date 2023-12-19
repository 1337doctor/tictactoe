<template>
  <div>
    <component :is="props.size" :class="`headline headline--${size}`">{{props.label}}</component>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string,
  size: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
const props = withDefaults(defineProps<Props>(), { size: 'h2', label: 'lorem ipsum' })
</script>

<style lang="scss">
  .headline {
    font-family: Arial, Helvetica, sans-serif;
    &--h1 {
      font-size: 32px;
    }
    &--h2 {
      font-size: 28px;
    }
    &--h3 {
      font-size: 24px;
    }
    &--h4 {
      font-size: 22px;
    }
    &--h5 {
      font-size: 20px;
    }
    &--h6 {
      font-size: 18px;
    }
  }
</style>