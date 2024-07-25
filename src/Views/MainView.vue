<template>
  <v-container fluid class="fill-height background">
    <v-row no-gutters>
      <v-col cols="12" md="8">
        <v-card color="secondary" class="pa-4 green-outline full-height">
          <v-card-title class="text-h5">Rubik's Cube</v-card-title>
          <v-card-text class="flex-grow-1 d-flex align-center justify-center">
            <RubicsCube />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card color="secondary" class="pa-4 green-outline">
          <v-card-text>
            <ControlPanel />
          </v-card-text>
        </v-card>
        <v-card color="secondary" class="pa-4 mt-4 green-outline">
          <v-card-text>
            <SolveSteps />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import RubicsCube from '../components/RubicsCube.vue';
import ControlPanel from '../components/ControlPanel.vue';
import SolveSteps from '../components/SolveSteps.vue';
</script>

<style scoped>
.background{
  background-color: #1a1a1a;
}
.full-height {
  height: 100%;
}

.full-screen {
  height: 100vh;
}
.green-outline {
    border: 1px solid #00ff00;

  }
</style>