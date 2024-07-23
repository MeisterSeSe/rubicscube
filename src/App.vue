<template>
  <div class="app">
    <h1>Rubik's Cube Solver</h1>
    <div class="content">
      <RubicsCube ref="cube" />
      <div class="side-panel">
        <ControlPanel @rotate="rotateCube" @solve="solveCube"
          @rotateTopRow="rotateTopRow"
          @rotateBottomRow="rotateBottomRow"
          @rotateLeftColumn="rotateLeftColumn"
          @rotateRightColumn="rotateRightColumn"
          @rotateFrontFace="rotateFrontFace"
          @rotateBackFace="rotateBackFace"
          @scramble="scrambleCube"/>
        <SolveSteps :steps="solutionSteps" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ControlPanel from './components/ControlPanel.vue';
import SolveSteps from './components/SolveSteps.vue';
import RubicsCube from "./components/RubicsCube.vue";
import Cube from "cubejs";

const cube = ref(null);
const rotateTopRow = () => cube.value?.rotateTopRow();
const rotateBottomRow = () => cube.value?.rotateBottomRow();
const rotateLeftColumn = () => cube.value?.rotateLeftColumn();
const rotateRightColumn = () => cube.value?.rotateRightColumn();
const rotateFrontFace = () => cube.value?.rotateFrontFace();
const rotateBackFace = () => cube.value?.rotateBackFace();

const rotateCube = (axis) => {
  cube.value.rotate(axis);
};
const solutionSteps = ref([])
const solveCube = async () => {
  if (!cube.value) return;

  try {
    // Initialize the solver if not already initialized
    if (!Cube.initSolver.initialized) {
      await Cube.initSolver();
    }

    // Get the current state of the cube
    const cubeState = cube.value.getCubeState();
    console.log("Current cube state:", cubeState);

    if (!cubeState || cubeState.length !== 54) {
      throw new Error(`Invalid cube string length: ${cubeState ? cubeState.length : 'null'}. Expected 54.`);
    }

    // Create a new Cube instance with the current state
    const solverCube = Cube.fromString(cubeState);

    if (solverCube.isSolved()) {
      console.log("Cube is already solved");
      solutionSteps.value = ["Cube is already solved"];
      return;
    }

    // Solve the cube
    const solution = solverCube.solve();
    console.log("Raw solution:", solution);

    // Convert the solution to steps
    solutionSteps.value = solution.split(' ').filter(step => step !== '');

    console.log("Solution steps:", solutionSteps.value);

  } catch (error) {
    console.error("Error solving cube:", error);
    solutionSteps.value = ["Error: Unable to solve cube. Please check cube state."];
  }
};





const scrambleCube = () => {
  if (!cube.value) return;

  const rotations = [
    rotateTopRow,
    rotateBottomRow,
    rotateLeftColumn,
    rotateRightColumn,
    rotateFrontFace,
    rotateBackFace
  ];

  for (let i = 0; i < 20; i++) {
    const randomRotation = rotations[Math.floor(Math.random() * rotations.length)];
    randomRotation();
  }
};

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
