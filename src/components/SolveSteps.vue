<!-- src/components/SolveSteps.vue -->
<template>
  <div class="solve-steps">
    <h3>Solution Steps:</h3>
    <ol>
      <li
        v-for="(step, index) in cubeStore.solutionSteps"
        :key="index"
        :class="{ 'current-step': index === cubeStore.currentStep }"
      >
        {{ convertSolutionToSteps(step) }}
      </li>
    </ol>
    <button @click="cubeStore.executeNextStep()">Execute Next Step</button>
    <button @click="cubeStore.executeAllSteps()">Execute All Steps</button>
  </div>
</template>

<script setup>
import { useCubeStore } from '../store/cubeStore';

const cubeStore = useCubeStore();
defineProps({
  steps: {
    type: Array,
    default: () => []
  }
});
defineEmits(['move']);
function convertSolutionToSteps(step) {
    const face = step.charAt(0);
    const modifier = step.slice(1);

    switch(face) {
      case "U":
        if (modifier === "2") return "Rotate top row 180 degrees";
        return modifier === "'" ? "Rotate top row counter-clockwise" : "Rotate top row clockwise";
      case "D":
        if (modifier === "2") return "Rotate bottom row 180 degrees";
        return modifier === "'" ? "Rotate bottom row counter-clockwise" : "Rotate bottom row clockwise";
      case "L":
        if (modifier === "2") return "Rotate left column 180 degrees";
        return modifier === "'" ? "Rotate left column downwards" : "Rotate left column upwards";
      case "R":
        if (modifier === "2") return "Rotate right column 180 degrees";
        return modifier === "'" ? "Rotate right column downwards" : "Rotate right column upwards";
      case "F":
        if (modifier === "2") return "Rotate front face 180 degrees";
        return modifier === "'" ? "Rotate front face counter-clockwise" : "Rotate front face clockwise";
      case "B":
        if (modifier === "2") return "Rotate back face 180 degrees";
        return modifier === "'" ? "Rotate back face counter-clockwise" : "Rotate back face clockwise";
      default:
        return step;
    }
  }
</script>

<style scoped>
.solve-steps {
  margin-top: 20px;
}

.current-step {
  font-weight: bold;
  background-color: #e0e0e0;
  padding: 5px;
  border-radius: 3px;
}
</style>