<!-- Header.vue -->
<template>
  <v-app-bar app color="rgba(26, 26, 26, 1.0)">
    <v-app-bar-nav-icon @click="toggleSidebar" v-if="!mdAndUp" />
    <v-toolbar-title class="custom-title">Rubics Cube Solver
    </v-toolbar-title>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue';
import {useDisplay} from 'vuetify'

const { xs, mdAndUp } = useDisplay()

const sidebarOpen = ref(false);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
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