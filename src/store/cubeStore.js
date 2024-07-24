import { defineStore } from 'pinia';
import Cube from 'cubejs';

export const useCubeStore = defineStore('cube', {
  state: () => ({
    cube: new Cube(),
    solutionSteps: [],
    currentStep: 0,
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
  },
  getters: {
    cubeState: (state) => state.cube.asString(),
  },
});