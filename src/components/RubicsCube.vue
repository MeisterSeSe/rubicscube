<!-- src/components/RubiksCube.vue -->
<template>
  <v-container fluid class="py-4 rubiks-cube-wrapper">
    <!-- Rubik's Cube Section -->
    <v-row justify="center">
      <v-container class="rubiks-cube-container">
        <div ref="container" class="rubiks-cube"></div>
      </v-container>

    </v-row>

    <!-- Customization Panel Section -->
    <v-row no-gutters>
      <v-col cols="12">
        <v-expand-transition>
          <div v-if="isCustomizationMode" class="customization-panel">
            <v-card flat>
              <v-card-title class="text-h6">Cube Customization</v-card-title>
              <v-card-text>
                <v-row dense>
                  <v-col v-for="color in colorMap" :key="color.letter" cols="4" sm="2">
                    <v-btn
                      :color="color.hex"
                      fab
                      small
                      @click="selectColor(color.letter)"
                      :outlined="selectedColor === color.letter"
                    >
                    </v-btn>
                  </v-col>
                </v-row>
                <v-btn
                  block
                  color="primary"
                  @click="applyCustomState"
                  class="mt-4"
                >
                  Apply Custom State
                </v-btn>
                <v-alert
              v-if="cubeStore.stateWarning"
              type="warning"
              dense
              outlined
              class="mt-4"
            >
              {{ cubeStore.stateWarning }}
            </v-alert>
              </v-card-text>

            </v-card>
          </div>
        </v-expand-transition>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <v-btn
          block
          :color="isCustomizationMode ? 'error' : 'primary'"
          @click="toggleMode"
          class="mt-4"
        >
          {{ isCustomizationMode ? 'Exit Customization' : 'Enter Customization' }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';
import { use3DCube } from '../composables/use3DCube';
import {useCubeStore} from "../store/cubeStore.js";
import {storeToRefs} from "pinia";
import {useTheme} from "vuetify";
const cubeStore = useCubeStore();
const { container, init, updateThreeJsFromCubeState, toggleCustomizationMode, getCurrentState, isCustomizationMode, selectColor } = use3DCube();
const theme = useTheme();
onMounted(() => {

  init();
});
// Watch for changes in the cube state and update the 3D visualization
watch(() => cubeStore.cubeState, (newState) => {
  console.log("State Changed:" + newState);
  updateThreeJsFromCubeState(newState);
});
const selectedColor = ref('U')
const toggleMode = () => {
  toggleCustomizationMode();
  updateThreeJsFromCubeState(cubeStore.cubeState);
  cubeStore.stateWarning = '';
};
  const colorMap = [
  { letter: 'U', hex: '#FFFFFF' }, // White
  { letter: 'R', hex: '#FF0000' }, // Red
  { letter: 'F', hex: '#00FF00' }, // Green
  { letter: 'D', hex: '#FFFF00' }, // Yellow
  { letter: 'L', hex: '#FFA500' }, // Orange
  { letter: 'B', hex: '#0000FF' }, // Blue
];
const applyCustomState = () => {
  const currentState = getCurrentState();
  cubeStore.setCubeState(currentState);
  updateThreeJsFromCubeState(cubeStore.cubeState);
};
</script>

<style scoped>
.v-btn.large {
  font-size: 1.2rem;
  height: 56px;
}
.rubiks-cube {
  width: 500px;
  height: 500px;
  margin: auto;
  top: 0;
  left: 0;
}
.customization-panel {
  margin-top: 20px;
}

.mode-toggle {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
/*.color-picker {
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
}
.color-picker button {
  width: 30px;
  height: 30px;
  border: 2px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}
.color-picker button.selected {
  border-color: #333;
  box-shadow: 0 0 5px rgba(0,0,0,0.5);
}
.warning-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #ffcccc;
  border: 1px solid #ff0000;
  color: #ff0000;
  border-radius: 5px;
}
customization-panel {
  margin-top: 20px;
}

h3 {
  margin-bottom: 10px;
}

.mode-toggle {
  margin-bottom: 15px;
}

.mode-toggle button {
  width: 100%;
  padding: 10px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.mode-toggle button.active {
  background-color: #4CAF50;
  color: white;
}

.color-picker {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.color-picker button {
  width: 40px;
  height: 40px;
  border: 2px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;
}

.color-picker button:hover {
  transform: scale(1.1);
}

.color-picker button.selected {
  border-color: #333;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
}

.apply-button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.apply-button:hover {
  background-color: #45a049;
}

.warning-message {
  margin-top: 15px;
  padding: 10px;
  background-color: #ffcccc;
  border: 1px solid #ff0000;
  color: #ff0000;
  border-radius: 5px;
}*/
</style>