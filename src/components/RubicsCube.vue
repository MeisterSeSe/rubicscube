<!-- src/components/RubiksCube.vue -->
<template>
  <div ref="container" class="rubiks-cube"></div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const container = ref(null);
let scene, camera, renderer, cubeGroup, controls;

const state = ref('')
const cubeSize = 3;
import Cube from 'cubejs';
let cubies = [];
const cube = ref(new Cube());

const colors = {
  right: 0xff0000,  // Red
  left: 0xffa500,   // Orange
  top: 0xffffff,    // White
  bottom: 0xffff00, // Yellow
  front: 0x00ff00,  // Green
  back: 0x0000ff,   // Blue
};

const createCubies = () => {
  cubeGroup = new THREE.Group();

  for (let x = 0; x < cubeSize; x++) {
    cubies[x] = [];
    for (let y = 0; y < cubeSize; y++) {
      cubies[x][y] = [];
      for (let z = 0; z < cubeSize; z++) {
        const geometry = new THREE.BoxGeometry(0.95, 0.95, 0.95);
        const materials = [
          new THREE.MeshBasicMaterial({ color: x === cubeSize - 1 ? colors.right : 0x000000 }),
          new THREE.MeshBasicMaterial({ color: x === 0 ? colors.left : 0x000000 }),
          new THREE.MeshBasicMaterial({ color: y === cubeSize - 1 ? colors.top : 0x000000 }),
          new THREE.MeshBasicMaterial({ color: y === 0 ? colors.bottom : 0x000000 }),
          new THREE.MeshBasicMaterial({ color: z === cubeSize - 1 ? colors.front : 0x000000 }),
          new THREE.MeshBasicMaterial({ color: z === 0 ? colors.back : 0x000000 }),
        ];
        const cubie = new THREE.Mesh(geometry, materials);
        cubie.position.set(x - 1, y - 1, z - 1);
        cubie.userData.originalPosition = new THREE.Vector3(x, y, z);
        cubies[x][y][z] = cubie;
        cubeGroup.add(cubie);
      }
    }
  }

  scene.add(cubeGroup);
};

const rotateFace = (axis, index, angle) => {
  const pivotGroup = new THREE.Group();
  scene.add(pivotGroup);

  const cubesToRotate = [];
  cubies.forEach((xRow, x) => {
    xRow.forEach((yRow, y) => {
      yRow.forEach((cubie, z) => {
        if ((axis === 'x' && x === index) ||
            (axis === 'y' && y === index) ||
            (axis === 'z' && z === index)) {
          cubesToRotate.push(cubie);
          pivotGroup.attach(cubie);
        }
      });
    });
  });

  pivotGroup.rotation[axis] = angle;
  pivotGroup.updateMatrixWorld();

  cubesToRotate.forEach(cubie => {
    cubie.applyMatrix4(pivotGroup.matrixWorld);
    cubie.updateMatrixWorld();
    cubeGroup.attach(cubie);
  });

  scene.remove(pivotGroup);

  // Update cubies array
  const newCubies = Array(cubeSize).fill().map(() => Array(cubeSize).fill().map(() => Array(cubeSize).fill(null)));
  cubeGroup.children.forEach(cubie => {
    const newPos = new THREE.Vector3();
    newPos.setFromMatrixPosition(cubie.matrixWorld);
    newPos.round().addScalar(1);
    const [x, y, z] = newPos.toArray();
    if (x >= 0 && x < cubeSize && y >= 0 && y < cubeSize && z >= 0 && z < cubeSize) {
      newCubies[x][y][z] = cubie;
    }
  });
  cubies = newCubies;
// Update cubejs state
  let move;
  if (axis === 'x') {
    move = index === 0 ? "L" : index === 2 ? "R'" : "";
  } else if (axis === 'y') {
    move = index === 0 ? "D" : index === 2 ? "U'" : "";
  } else if (axis === 'z') {
    move = index === 0 ? "B" : index === 2 ? "F'" : "";
  }

  if (move) {
    if (angle < 0) {
      move = move.includes("'") ? move.replace("'", "") : move + "'";
    }
    cube.value.move(move);
  }

  updateCubeState();
};

const updateCubeState = () => {
  state.value = cube.value.asString();
  // You can emit this state or use it as needed
};
const getColorHex = (colorChar) => {
  const colorMap = {
    'U': 0xFFFFFF, // White
    'R': 0xFF0000, // Red
    'F': 0x00FF00, // Green
    'D': 0xFFFF00, // Yellow
    'L': 0xFFA500, // Orange
    'B': 0x0000FF  // Blue
  };
  return colorMap[colorChar];
};
const updateThreeJsFromCubeState = () => {
  const state = cube.value.asString();

  cubeGroup.children.forEach((cubie, index) => {
    const x = index % 3;
    const y = Math.floor(index / 9);
    const z = Math.floor((index % 9) / 3);

    // Update materials based on the cube state
    cubie.material[0].color.setHex(getColorHex(state[4 + y*9 + z*3])); // Right
    cubie.material[1].color.setHex(getColorHex(state[40 + y*9 + (2-z)*3])); // Left
    cubie.material[2].color.setHex(getColorHex(state[y*9 + x])); // Up
    cubie.material[3].color.setHex(getColorHex(state[27 + y*9 + x])); // Down
    cubie.material[4].color.setHex(getColorHex(state[18 + y*9 + x])); // Front
    cubie.material[5].color.setHex(getColorHex(state[45 + y*9 + (2-x)*3])); // Back
  });
};
const init = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, container.value.clientWidth / container.value.clientHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  container.value.appendChild(renderer.domElement);

  createCubies();

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
  rotateFace('y', cubeSize - 1, Math.PI / 4);
  cube.value.move("U");
};
const rotateBottomRow = () => {
  rotateFace('y', 0, -Math.PI / 4);
  cube.value.move("D");
};
const rotateLeftColumn = () => {
  rotateFace('x', 0, -Math.PI / 4);
  cube.value.move("L");
};
const rotateRightColumn = () => {
  rotateFace('x', cubeSize - 1, Math.PI / 4);
  cube.value.move("R");
};
const rotateFrontFace = () => {
  rotateFace('z', cubeSize - 1, -Math.PI / 4);
  cube.value.move("F");
};
const rotateBackFace = () => {
  rotateFace('z', 0, Math.PI / 4);
  cube.value.move("B");
};

const getCubeState = () => {
  console.log("Returned: " + state.value)
  return state.value;
};
const rotate = (axis) => {
  const rotationAngle = Math.PI / 2; // 90 degrees
  switch(axis) {
    case 'x':
      rotateFace('x', 0, rotationAngle);
      rotateFace('x', 1, rotationAngle);
      rotateFace('x', 2, rotationAngle);
      break;
    case 'y':
      rotateFace('y', 0, rotationAngle);
      rotateFace('y', 1, rotationAngle);
      rotateFace('y', 2, rotationAngle);
      break;
    case 'z':
      rotateFace('z', 0, rotationAngle);
      rotateFace('z', 1, rotationAngle);
      rotateFace('z', 2, rotationAngle);
      break;
  }
};

defineExpose({ rotate, rotateTopRow, rotateBottomRow, rotateLeftColumn, rotateRightColumn, rotateFrontFace, rotateBackFace, getCubeState });
</script>

<style scoped>
.rubiks-cube {
  width: 500px;
  height: 500px;
}
</style>