<!-- src/components/ControlPanel.vue -->
<template>
  <v-container class="control-panel green-outline" :style="{ backgroundColor: theme?.current?.value?.colors?.background,
        color: theme?.current?.value?.colors?.writing}">
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
import {useTheme} from "vuetify";
const cubeStore = useCubeStore();
const theme = useTheme();
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
  margin-top: 16px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-right: 2px solid #00ff0b; /* Add a border on the right side */
  border-bottom: 2px solid #00ff0b; /* Add a border on the bottom side */
  color: #00ff0b;
}
.green-outline {
  border-top: 2px solid #00ff00;
  border-left: 2px solid #00ff00;/* Green outline */ /* Add some padding to make the outline more visible */
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