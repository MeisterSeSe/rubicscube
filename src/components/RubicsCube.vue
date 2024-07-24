<!-- src/components/RubiksCube.vue -->
<template>
  <div ref="container" class="rubiks-cube"></div>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';
import { use3DCube } from '../composables/use3DCube';
import {useCubeStore} from "../store/cubeStore.js";
import {storeToRefs} from "pinia";

const cubeStore = useCubeStore();
const { container, init, updateThreeJsFromCubeState } = use3DCube();
onMounted(() => {
  init();
});
// Watch for changes in the cube state and update the 3D visualization
watch(() => cubeStore.cubeState, (newState) => {
  console.log("State Changed:" + newState);
  updateThreeJsFromCubeState(newState);
});
</script>

<style scoped>
.rubiks-cube {
  width: 500px;
  height: 500px;
}
</style>