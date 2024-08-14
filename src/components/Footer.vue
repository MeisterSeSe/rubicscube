<template>
  <v-footer
  id="footer"
        class="d-flex py-4 contact-section justify-space-between"
        style="flex: initial"
        absolute

        border="t">
      <v-card class="contact-card green-outline">
        <v-card-title class="text-h2 font-weight-bold">Get In Touch</v-card-title>
        <v-divider color="primary"></v-divider>
        <v-card-text>
          <p>
            I'm always excited to explore new opportunities. Feel free to reach out and connect with me via email or my social media channels.

          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn text href="mailto:sean.semmler02@gmail.com" class = "green-outline">Email Me</v-btn>
          <v-btn text icon href="https://github.com/MeisterSeSe" class = "green-outline" target="_blank">
            <v-icon>mdi-github</v-icon>
          </v-btn>
          <v-btn text icon href="https://www.linkedin.com/in/sean-niklas-semmler-a088712b8/"  class = "green-outline" target="_blank">
            <v-icon>mdi-linkedin</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-footer>
</template>

<script setup>
// Your setup script goes here
import {useTheme} from "vuetify";

const theme = useTheme();
</script>

<style scoped>
/* Your custom styles go here */
.contact-card {
/* Dark background with transparency */
  padding: 20px;
  border-radius: 0; /* Rounded corners */
  margin: 0px;
  width: 100%;
}
.green-outline {
  border-top: 2px solid #00ff00;
  border-left: 2px solid #00ff00;/* Green outline */ /* Add some padding to make the outline more visible */
}
.divider {
  color: #00ff00; /* Neon Green */
}
</style>
