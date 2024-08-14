<!-- MainView.vue -->
<template>
  <v-container fluid class="pa-0 main-container" :style="{ backgroundColor: theme?.current?.value?.colors?.background}">
    <v-row no-gutters class="fill-height">
      <v-col cols="12" lg="8" class="d-flex justify-center align-center rubiks-cube-col">
        <RubicsCube />
      </v-col>

      <v-col cols="12" lg="4" class="d-flex flex-column control-panel-col ">
        <v-divider v-if="!lgAndUp" color="primary" thickness="5"></v-divider>
        <v-card flat class="flex-grow-1 control-panel"
        :style="{ backgroundColor: theme?.current?.value?.colors?.surface}">
          <v-tabs v-model="tab" color="primary" grow>
            <v-tab value="controls">Controls</v-tab>
            <v-tab value="steps">Solve Steps</v-tab>
          </v-tabs>
          <v-window v-model="tab" class="flex-grow-1">
            <v-window-item value="controls">
              <ControlPanel />
            </v-window-item>
            <v-window-item value="steps">
              <SolveSteps />
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import RubicsCube from '../components/RubicsCube.vue';
import ControlPanel from '../components/ControlPanel.vue';
import SolveSteps from '../components/SolveSteps.vue';
import {ref} from "vue";
import {useDisplay, useTheme} from "vuetify";
const { xs, mdAndUp, lgAndUp } = useDisplay()
const tab = ref('controls');
const theme = useTheme();
</script>

<style scoped>
.main-container {
  height: 100%;
}

.rubiks-cube-col {
  position: relative;
}



.control-panel-col {
  padding-left: 16px;
}
  .rubiks-cube-col::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 1px;
    background-color: #00ff0b;
  }
@media (max-width: 1280px) { /* Ensures no line is shown for lg and larger screens */
  .rubiks-cube-col::after {
    content: none;
  }
}
</style>

