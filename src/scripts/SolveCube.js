import Cube from 'cubejs';
import {ref} from "vue";

// ... other code ...

export const solutionSteps = ref([])
export const solveCube = (cube) => {
  console.log("solve")
  if (!cube) return;
  console.log("now")
  const cubeState = cube.getCubeState();

  // Convert your cube state to the format expected by cubejs
  const cubeString = convertToKociembaString(cubeState);
  console.log(cubeString);
  // Create a new Cube instance
  const solverCube = new Cube(cubeString);

  // Solve the cube
  const solution = solverCube.solve();

  // Convert the solution to your desired format
  solutionSteps.value = convertSolutionToSteps(solution);
};

function convertToKociembaString(cubeState) {
  // The order of faces in Kociemba string: Up, Right, Front, Down, Left, Back
  const kociembaOrder = [2, 0, 4, 3, 1, 5]; // Mapping our faces to Kociemba order
  let kociembaString = '';

  for (let kFace of kociembaOrder) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        kociembaString += convertColor(cubeState[kFace][row][col]);
      }
    }
  }

  return kociembaString;
}

function convertColor(color) {
  switch (color) {
    case 'W': return 'U'; // White is Up in Kociemba notation
    case 'R': return 'R'; // Red is Right
    case 'G': return 'F'; // Green is Front
    case 'Y': return 'D'; // Yellow is Down
    case 'O': return 'L'; // Orange is Left
    case 'B': return 'B'; // Blue is Back
    default: throw new Error(`Unknown color: ${color}`);
  }
}

function convertSolutionToSteps(solution) {
  // Convert the solution string to your desired format
  return solution.split(' ').map(move => {
    switch(move) {
      case "U": return "Rotate top row clockwise";
      case "U'": return "Rotate top row counter-clockwise";
      case "D": return "Rotate bottom row clockwise";
      case "D'": return "Rotate bottom row counter-clockwise";
      case "L": return "Rotate left column upwards";
      case "L'": return "Rotate left column downwards";
      case "R": return "Rotate right column upwards";
      case "R'": return "Rotate right column downwards";
      case "F": return "Rotate front face clockwise";
      case "F'": return "Rotate front face counter-clockwise";
      case "B": return "Rotate back face clockwise";
      case "B'": return "Rotate back face counter-clockwise";
      default: return move;
    }
  });
}