<!-- App.vue -->
<!-- App.vue -->
<template>
  <v-app >
    <Header />
    <v-main>
      <MainView />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Header from "./components/Header.vue";
import MainView from "./Views/MainView.vue";
import {ref} from "vue";
const theme = ref('dark');


</script>
<style>
.v-main {
  width: 100%;
}
</style>