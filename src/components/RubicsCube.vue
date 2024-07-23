<!-- src/components/RubiksCube.vue -->
<template>
  <div ref="container" class="rubiks-cube"></div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Cube from 'cubejs';

const container = ref(null);
let scene, camera, renderer, cubeGroup, controls;

const solutionSteps = ref([])
const state = ref('')
const cubeSize = 3;

let cubies = [];
const cube = ref(new Cube());
const cubieSize = 1;
const spacing = 0.05;

const getSolutionSteps = () => {
  return solutionSteps.value
}
const updateCubeState = () => {
  state.value = cube.value.asString();
  console.log(cube.value.asString())
  // You can emit this state or use it as needed
};
const colors = {
  U: 0xFFFFFF, // White
  R: 0xFF0000, // Red
  F: 0x00FF00, // Green
  D: 0xFFFF00, // Yellow
  L: 0xFFA500, // Orange
  B: 0x0000FF  // Blue
};
const updateThreeJsFromCubeState = () => {
  const state = cube.value.asString();

  cubeGroup.children.forEach((cubie) => {
    const { x, y, z } = cubie.userData.coords;

    // Right face (x = 2)
    cubie.material[0].color.setHex(x === 2 ? colors[state[9 + (2-y)*3 + z]] : 0x000000);

    // Left face (x = 0)
    cubie.material[1].color.setHex(x === 0 ? colors[state[36 + (2-y)*3 + (2-z)]] : 0x000000);

    // Up face (y = 2)
    cubie.material[2].color.setHex(y === 2 ? colors[state[x + z*3]] : 0x000000);

    // Down face (y = 0)
    cubie.material[3].color.setHex(y === 0 ? colors[state[45 + (2-x) + z*3]] : 0x000000);

    // Front face (z = 2)
    cubie.material[4].color.setHex(z === 2 ? colors[state[18 + (2-y)*3 + x]] : 0x000000);

    // Back face (z = 0)
    cubie.material[5].color.setHex(z === 0 ? colors[state[27 + (2-y)*3 + (2-x)]] : 0x000000);
  });
};
const createCubeGroup = () => {
  cubeGroup = new THREE.Group();

  for (let x = 0; x < cubeSize; x++) {
    cubies[x] = []
    for (let y = 0; y < cubeSize; y++) {
      cubies[x][y] = [];
      for (let z = 0; z < cubeSize; z++) {
        const geometry = new THREE.BoxGeometry(cubieSize, cubieSize, cubieSize);
        const materials = Array(6).fill().map(() => new THREE.MeshBasicMaterial({ color: 0x000000 }));
        const cubie = new THREE.Mesh(geometry, materials);

        cubie.position.set(
          (x - 1) * (cubieSize + spacing),
          (y - 1) * (cubieSize + spacing),
          (z - 1) * (cubieSize + spacing)
        );
        cubie.userData.coords = { x, y, z };
        cubies[x][y][z] = cubie;
        cubeGroup.add(cubie);
      }
    }
  }

  scene.add(cubeGroup);
};
const solveCube = async () => {

  if (!Cube.initSolver.initialized) {
    await Cube.initSolver();
  }

  const solution = cube.value.solve();
  solutionSteps.value = solution.split(' ').filter(step => step !== '');
  return solutionSteps.value
};

const move = async () => {
  for (const move of solutionSteps.value) {
    cube.value.move(move);
    await new Promise(resolve => setTimeout(resolve, 500)); // Delay for visualization
    updateThreeJsFromCubeState();
  }
}
const init = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, container.value.clientWidth / container.value.clientHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  container.value.appendChild(renderer.domElement);

  createCubeGroup();
  updateThreeJsFromCubeState()

  camera.position.set(4, 4, 4);
  camera.lookAt(0, 0, 0);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;

  window.addEventListener('resize', onWindowResize, false);
  updateCubeState();
};

const onWindowResize = () => {
  camera.aspect = container.value.clientWidth / container.value.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
};

const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

onMounted(() => {
  init();
  animate();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize);
  renderer.dispose();
});


const rotateTopRow = () => {
  //rotateFace('y', cubeSize - 1, Math.PI / 4);
  cube.value.move("U'")
  updateThreeJsFromCubeState()

};
const rotateBottomRow = () => {
  //rotateFace('y', 0, -Math.PI / 4);
  cube.value.move("D'")
  updateThreeJsFromCubeState()
};
const rotateLeftColumn = () => {
  //rotateFace('x', 0, -Math.PI / 4);
  cube.value.move("L'")
  updateThreeJsFromCubeState()
};
const rotateRightColumn = () => {
  //rotateFace('x', cubeSize - 1, Math.PI / 4);
  cube.value.move("R'")
  updateThreeJsFromCubeState()
};
const rotateFrontFace = () => {
  //rotateFace('z', cubeSize - 1, -Math.PI / 4);
  cube.value.move("F'")
  updateThreeJsFromCubeState()
};
const rotateBackFace = () => {
  //rotateFace('z', 0, Math.PI / 4);
  cube.value.move("B'")
  updateThreeJsFromCubeState()
};

const getCubeState = () => {
  console.log("Returned: " + state.value)
  return state.value;
};

defineExpose({getSolutionSteps, rotateTopRow, rotateBottomRow, rotateLeftColumn, rotateRightColumn, rotateFrontFace, rotateBackFace, getCubeState, solveCube, move });
</script>

<style scoped>
.rubiks-cube {
  width: 500px;
  height: 500px;
}
</style>