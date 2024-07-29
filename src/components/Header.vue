<!-- Header.vue -->
<template>
  <v-app-bar app>
    <v-app-bar-title class="text-h6" color="primary">Rubik's Cube Solver</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn @click="toggleTheme()">
      <v-icon>{{ isDarkTheme ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { useTheme } from 'vuetify';
import {computed} from "vue";

const theme = useTheme();
const isDarkTheme = computed(() => theme.global.name.value === 'dark');

const toggleTheme = () => {
  theme.global.name.value = isDarkTheme.value ? 'light' : 'dark';
};
</script>
<style scoped>
.header-color{
  background-color: rgba(26, 26, 26, 0.9);
}
.list-item-title {
  color: white; /* White font color */
}

.list-divider {
  background-color: #00ff0b; /* Green divider color */
}
.v-btn-toggle {
  border-radius: 20px; /* Rounded corners */
}
/* Adjust spacing for toggle buttons */
.v-btn-toggle .v-btn {
  margin: 0 5px;
}
.custom-title {
  color: #00ff00;
}
</style>