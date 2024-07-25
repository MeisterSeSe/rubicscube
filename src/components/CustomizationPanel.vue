<!-- src/components/CustomizationPanel.vue (New Component) -->
<template>

</template>

<script setup>
import {ref} from "vue";
import {useCubeStore} from "../store/cubeStore.js";
import {use3DCube} from "../composables/use3DCube.js";

const selectedColor = ref('U')
const cubeStore = useCubeStore();
const { container, init, updateThreeJsFromCubeState, toggleCustomizationMode, getCurrentState, isCustomizationMode, selectColor } = use3DCube();
const toggleMode = () => {
  toggleCustomizationMode();
  updateThreeJsFromCubeState(cubeStore.cubeState);
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
.customization-panel {
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
}
</style>