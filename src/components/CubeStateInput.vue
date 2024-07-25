<!-- src/components/CubeStateInput.vue -->
<template>
  <div class="cube-state-input">
    <h3>Input Your Cube State</h3>
    <div class="color-picker">
      <button
        v-for="color in colorMap"
        :key="color.letter"
        :style="{ backgroundColor: color.hex }"
        @click="selectColor(color.letter)"
        :class="{ selected: selectedColor === color.letter }"
      ></button>
    </div>
    <div v-for="face in faces" :key="face" class="face-input">
      <h4>{{ face }} Face</h4>
      <div class="face-grid">
        <div
          v-for="i in 9"
          :key="i"
          :style="{ backgroundColor: getColorHex(cubeState[face][i-1]) }"
          @click="setColor(face, i-1)"
          class="color-square"
        ></div>
      </div>
    </div>
    <button @click="applyState" class="apply-button">Apply State</button>
    <div v-if="cubeStore.stateWarning" class="warning-message">
      {{ cubeStore.stateWarning }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCubeStore } from '../store/cubeStore';

const cubeStore = useCubeStore();
const faces = ['U', 'R', 'F', 'D', 'L', 'B'];
const colorMap = [
  { letter: 'U', hex: '#FFFFFF' }, // White
  { letter: 'R', hex: '#FF0000' }, // Red
  { letter: 'F', hex: '#00FF00' }, // Green
  { letter: 'D', hex: '#FFFF00' }, // Yellow
  { letter: 'L', hex: '#FFA500' }, // Orange
  { letter: 'B', hex: '#0000FF' }, // Blue
];

const cubeState = ref({
  U: Array(9).fill('U'),
  R: Array(9).fill('R'),
  F: Array(9).fill('F'),
  D: Array(9).fill('D'),
  L: Array(9).fill('L'),
  B: Array(9).fill('B')
});

const selectedColor = ref('U');

const selectColor = (color) => {
  selectedColor.value = color;
};

const setColor = (face, index) => {
  cubeState.value[face][index] = selectedColor.value;
  console.log(cubeState.value)
};

const getColorHex = (letter) => {
  return colorMap.find(color => color.letter === letter)?.hex;
};

const applyState = () => {
  const stateString = Object.values(cubeState.value).flat().join('');
  console.log(stateString);
  cubeStore.setCubeState(stateString);
};
</script>

<style scoped>
.cube-state-input {
  margin-bottom: 20px;
}
.color-picker {
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
.face-input {
  margin-bottom: 20px;
}
.face-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  width: 150px;
}
.color-square {
  width: 40px;
  height: 40px;
  border: 1px solid #ccc;
  cursor: pointer;
}
.apply-button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
.apply-button:hover {
  background-color: #45a049;
}
.warning-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #ffcccc;
  border: 1px solid #ff0000;
  color: #ff0000;
  border-radius: 5px;
}
</style>