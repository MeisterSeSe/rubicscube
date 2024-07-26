<!-- src/components/SolveSteps.vue -->
<template>
  <v-container class="solve-steps">
    <h3 class="text-h5 mb-4" >Solution Steps</h3>
    <v-list density="compact" class = "solve-steps mt-0">
      <v-list-item
        v-for="(step, index) in cubeStore.solutionSteps"
        :key="index"
        :class="{ 'text-primary': index === cubeStore.currentStep }"

      >
        <v-list-item-title color="primary" >{{ convertSolutionToSteps(step) }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-row class="mt-4">
      <v-col>
        <v-btn block color="primary" @click="cubeStore.executeNextStep()">Next Step</v-btn>
      </v-col>
      <v-col>
        <v-btn block color="primary" @click="cubeStore.executeAllSteps()">Execute All</v-btn>
      </v-col>
    </v-row>
  </v-container>
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
   background-color: var(--v-background-base);
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: var(--v-writing-base);
}

.v-list-item.text-primary {
  background-color: rgba(0, 255, 11, 0.1); /* primary */
  border-left: 4px solid #00ff0b; /* primary */
}

.v-btn {
  font-size: 1rem;
  font-weight: 500;
}
</style>