import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {useCubeStore} from "../store/cubeStore.js";

export function use3DCube() {
  const container = ref(null);
  let scene, camera, renderer, cubeGroup, controls;
  const cubeStore = useCubeStore();

  const cubeSize = 3;
  const cubieSize = 1;
  const spacing = 0.05;
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let isDragging = false;
let mouseDownTime;
const dragThreshold = 5; // pixels
const clickThreshold = 200; // milliseconds
let mouseDownPosition = new THREE.Vector2();
  const selectedColor = ref('U')
  const selectColor = (color) => {
  selectedColor.value = color;
};
  const getColorHex = (letter) => {
  return colors[letter];
};
  let isCustomizationMode = ref(false);
  const toggleCustomizationMode = () => {
    isCustomizationMode.value = !isCustomizationMode.value;

  };
const onCubeClick = (event) => {
  if (!isCustomizationMode.value) return;

  const rect = container.value.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / container.value.clientWidth) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / container.value.clientHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(cubeGroup.children, true);

  if (intersects.length > 0) {
    const intersectedObject = intersects[0].object;
    const faceIndex = intersects[0].faceIndex;
    changeColor(intersectedObject, Math.floor(faceIndex / 2));
  }
};
  const changeColor = (cubie, faceIndex) => {
    const currentColor = cubie.material[faceIndex].color.getHexString();
    cubie.material[faceIndex].color.setHex(getColorHex(selectedColor.value));
  };


  let cubies = [];

const colors = {
  U: 0xFFFFFF, // White
  R: 0xFF0000, // Red
  F: 0x00FF00, // Green
  D: 0xFFFF00, // Yellow
  L: 0xFFA500, // Orange
  B: 0x0000FF  // Blue
};

const createCubeGroup = () => {
  cubeGroup = new THREE.Group();

  for (let x = 0; x < cubeSize; x++) {
    cubies[x] = [];
    for (let y = 0; y < cubeSize; y++) {
      cubies[x][y] = [];
      for (let z = 0; z < cubeSize; z++) {
        const geometry = new THREE.BoxGeometry(cubieSize, cubieSize, cubieSize);
        const materials = Array(6).fill().map(() => new THREE.MeshBasicMaterial({ color: 0x000000 }));
        const cubie = new THREE.Mesh(geometry, materials);

        cubie.position.set(
          (x - 1) * (cubieSize + spacing),
          (1 - y) * (cubieSize + spacing),  // Changed this line
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

const updateThreeJsFromCubeState = (state) => {
  cubeGroup.children.forEach((cubie) => {
    const {x, y, z} = cubie.userData.coords;

    // Up face (y = 0)
    cubie.material[2].color.setHex(y === 0 ? colors[state[z * 3 + x]] : 0x000000);

    // Down face (y = 2)
    cubie.material[3].color.setHex(y === 2 ? colors[state[33 + x  - 3*z]] : 0x000000);

    // Front face (z = 2)
    cubie.material[4].color.setHex(z === 2 ? colors[state[18 + y * 3 + x]] : 0x000000);

    // Back face (z = 0)
    cubie.material[5].color.setHex(z === 0 ? colors[state[45 + y * 3 + (2 - x)]] : 0x000000);

    // Right face (x = 2)
    cubie.material[0].color.setHex(x === 2 ? colors[state[9 + y * 3 + (2 - z)]] : 0x000000);

    // Left face (x = 0)
    cubie.material[1].color.setHex(x === 0 ? colors[state[36 + y * 3 + z]] : 0x000000);
  });
};
  const init = () => {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, container.value.clientWidth / container.value.clientHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.value.clientWidth, container.value.clientHeight);
    container.value.appendChild(renderer.domElement);

    createCubeGroup();
    updateThreeJsFromCubeState(cubeStore.cubeState)
    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    window.addEventListener('resize', onWindowResize, false);


    animate(); // Start the animation loop
    //container.value.addEventListener('click', onCubeClick);
    container.value.addEventListener('mousedown', onMouseDown);
    container.value.addEventListener('mousemove', onMouseMove);
    container.value.addEventListener('mouseup', onMouseUp);
  };
  const getCurrentState = () => {
  let state = new Array(54).fill('');
  const colorToFace = Object.fromEntries(Object.entries(colors).map(([k, v]) => [v, k]));

  cubeGroup.children.forEach((cubie) => {
    const {x, y, z} = cubie.userData.coords;

    // Up face (y = 0)
    if (y === 0) {
      state[z * 3 + x] = colorToFace[cubie.material[2].color.getHex()];
    }

    // Down face (y = 2)
    if (y === 2) {
      state[33 + x - 3*z] = colorToFace[cubie.material[3].color.getHex()];
    }

    // Front face (z = 2)
    if (z === 2) {
      state[18 + y * 3 + x] = colorToFace[cubie.material[4].color.getHex()];
    }

    // Back face (z = 0)
    if (z === 0) {
      state[45 + y * 3 + (2 - x)] = colorToFace[cubie.material[5].color.getHex()];
    }

    // Right face (x = 2)
    if (x === 2) {
      state[9 + y * 3 + (2 - z)] = colorToFace[cubie.material[0].color.getHex()];
    }

    // Left face (x = 0)
    if (x === 0) {
      state[36 + y * 3 + z] = colorToFace[cubie.material[1].color.getHex()];
    }
  });
  return state.join('');
};
  const onMouseDown = (event) => {
  mouseDownTime = new Date().getTime();
  mouseDownPosition.set(event.clientX, event.clientY);
  isDragging = false;
};

const onMouseMove = (event) => {
  if (!isCustomizationMode.value) return;

  const deltaX = Math.abs(event.clientX - mouseDownPosition.x);
  const deltaY = Math.abs(event.clientY - mouseDownPosition.y);

  if (deltaX > dragThreshold || deltaY > dragThreshold) {
    isDragging = true;
  }
};

const onMouseUp = (event) => {
  if (!isCustomizationMode.value) return;

  const mouseUpTime = new Date().getTime();
  const deltaTime = mouseUpTime - mouseDownTime;

  if (!isDragging && deltaTime < clickThreshold) {
    onCubeClick(event);
  }

  isDragging = false;
};
  const onWindowResize = () => {
    camera.aspect = container.value.clientWidth / container.value.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  };
  onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize);
  renderer.dispose();
  //container.value.removeEventListener('click', onCubeClick);
  container.value.removeEventListener('mousedown', onMouseDown);
  container.value.removeEventListener('mousemove', onMouseMove);
  container.value.removeEventListener('mouseup', onMouseUp);
});
  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };



  return {
    container,
    init,
    updateThreeJsFromCubeState,
    toggleCustomizationMode,
    isCustomizationMode,
    getCurrentState,
    selectColor
  };
}