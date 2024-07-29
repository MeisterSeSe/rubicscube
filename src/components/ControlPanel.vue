<!-- src/components/ControlPanel.vue -->
<template>
  <v-container class="control-panel">
    <h3 class="text-h5 mb-4">Cube Controls</h3>
    <v-row dense>
      <v-col v-for="move in ['U', 'D', 'L', 'R', 'F', 'B']" :key="move" cols="4">
        <v-btn block @click="cubeStore.rotate(move)" class="cube-button" color="primary">{{ move }}</v-btn>
      </v-col>
    </v-row>
    <v-row class="mt-4">
      <v-col>
        <v-btn block color="warning" @click="cubeStore.scramble()">Scramble</v-btn>
      </v-col>
      <v-col>
        <v-btn block color="error" @click="cubeStore.reset()">Reset</v-btn>
      </v-col>
      <v-col>
        <v-btn block color="success" @click="cubeStore.solve()">Solve</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useCubeStore } from '../store/cubeStore';
const cubeStore = useCubeStore();
const moves = {
  U: "Move Top Row", // White
  R: "Move Right Column", // Red
  F: "Move Left Column", // Green
  D: "Move Bottom Row", // Yellow
  L: "Move Left Column", // Orange
  B: "Move Bottom Row"  // Blue
};
</script>

<style scoped>
.control-panel {
  background-color: var(--v-background-base);
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #00ff0b;
}

.cube-button {
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
}

.cube-button:hover {
  background-color: #00cc09; /* slightly darker primary */
}

.v-btn {
  font-size: 1rem;
  font-weight: 500;
}
</style>