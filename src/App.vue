<!-- App.vue -->
<!-- App.vue -->
<template>
  <v-app >
    <Header />
    <v-main class="main-content">
      <MainView />
    </v-main>
    <Footer/>
  </v-app>
</template>


<script setup lang="ts">
import Header from "./components/Header.vue";
import MainView from "./Views/MainView.vue";
import {ref} from "vue";
import Footer from "./components/Footer.vue";
const theme = ref('dark');


</script>
<style scoped>
.main-content {
  padding-top: 64px; /* Default height of v-app-bar in Vuetify */
  min-height: 100vh;
}
</style>
