<template>
  <div class="board-diagnostics">
    <ul>
      <li v-for="(value, key) in diagnosticData">
        {{key}}: {{value}}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {BoardDiagnosticsPayload} from "../../types";
import {computed} from "vue";

interface Props {
  diagnosticData: BoardDiagnosticsPayload
}
const props = withDefaults(defineProps<Props>(), { })
</script>

<style lang="scss">
.board-diagnostics {

}
</style>