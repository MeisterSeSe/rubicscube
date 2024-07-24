<!-- src/components/ControlPanel.vue -->
<template>
  <div class="control-panel">
    <button @click="cubeStore.rotate('U')">Rotate Top Row</button>
    <button @click="cubeStore.rotate('D')">Rotate Bottom Row</button>
        <button @click="cubeStore.rotate('L')">Rotate Left Column</button>
    <button @click="cubeStore.rotate('R')">Rotate Right Column</button>
        <button @click='rotateBottom'>Rotate Back Face</button>
    <button @click="cubeStore.rotate('F')">Rotate Front Face</button>
    <!-- Add other rotation buttons -->
    <button @click="cubeStore.scramble()">Scramble</button>
    <button @click="cubeStore.solve()">Solve</button>
  </div>
</template>

<script setup>
import { useCubeStore } from '../store/cubeStore';
const rotateBottom = () => cubeStore.rotate("B")
const cubeStore = useCubeStore();
</script>

<style scoped>
.control-panel {
  margin-top: 20px;
}

button {
  margin-right: 10px;
  padding: 5px 10px;
  margin-bottom: 10px;
}
</style>