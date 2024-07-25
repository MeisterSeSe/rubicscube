import {defineStore} from 'pinia';
import Cube from 'cubejs';

export const useCubeStore = defineStore('cube', {
  state: () => ({
    cube: new Cube(),
    solutionSteps: [],
    currentStep: 0,
    stateWarning: '',
  }),
  actions: {
    rotate(face) {
      this.cube.move(face);
    },
    async solve() {
      if (!Cube.initSolver.initialized) {
        await Cube.initSolver();
      }
      const solution = this.cube.solve();
      this.currentStep = 0;
      this.solutionSteps = solution.split(' ').filter(step => step !== '');
    },
    scramble() {
          const randomCube = Cube.random();
          this.cube.init(randomCube);
    },
    executeNextStep() {
      if (this.currentStep < this.solutionSteps.length) {
        this.rotate(this.solutionSteps[this.currentStep]);
        this.currentStep++;
      }
    },
    async executeAllSteps(){
      while (this.currentStep < this.solutionSteps.length){
        this.executeNextStep()
        await new Promise(resolve => setTimeout(resolve, 500)); // Delay for visualization
      }

    },
    setCubeState(newState) {
    if (newState.length === 54 && /^[URFDLB]{54}$/.test(newState)) {
      console.log("Input state:", newState);

      const individualCube = Cube.fromString(newState);
      const resultingState = individualCube.asString();
      if (newState !== resultingState) {
        const warningMessage = "Warning: The cube is in an invalid configuration. Pls check again";
        console.warn(warningMessage);
        this.stateWarning = warningMessage;
      } else {
        this.stateWarning = '';
        this.cube = individualCube;
        this.solutionSteps = [];
        this.currentStep = 0;
      }
    } else {
      const errorMessage = 'Invalid cube state format';
      console.error(errorMessage);
      this.stateWarning = errorMessage;
    }
  }
  },
  getters: {
    cubeState: (state) => state.cube.asString(),
  },
});