<!-- src/App.vue -->
<template>
  <div class="app">
    <h1>Rubik's Cube Solver</h1>
    <div class="content">
      <RubicsCube />
      <div class="side-panel">
        <ControlPanel />
        <SolveSteps />
        <CubeStateInput></CubeStateInput>
      </div>
    </div>
  </div>
</template>

<script setup>
import RubicsCube from './components/RubicsCube.vue';
import ControlPanel from './components/ControlPanel.vue';
import SolveSteps from './components/SolveSteps.vue';
import CubeStateInput from "./components/CubeStateInput.vue";
</script>

<style>
.app {
  font-family: Arial, sans-serif;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.side-panel {
  width: 300px;
}
</style>
