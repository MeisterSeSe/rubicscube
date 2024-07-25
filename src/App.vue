<!-- src/App.vue -->
<template>
  <v-app>
    <Header></Header>
    <v-main class="v-main pa-0">
      <MainView></MainView>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import Header from "./components/Header.vue";
import MainView from "./Views/MainView.vue";
</script>
<style>
.v-main {
  height: 100%;
}

/* This ensures that the v-app takes up the full viewport height */
.v-application {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* This removes any default padding on the v-main */
.v-main.pa-0 {
  padding: 0 !important;
}
</style>