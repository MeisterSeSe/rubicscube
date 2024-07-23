<template>
  <div class="control-panel">
    <button @click="$emit('rotate', 'x')">Rotate X</button>
    <button @click="$emit('rotate', 'y')">Rotate Y</button>
    <button @click="$emit('rotate', 'z')">Rotate Z</button>
    <button @click="$emit('rotateTopRow')">Rotate Top Row</button>
    <button @click="$emit('rotateBottomRow')">Rotate Bottom Row</button>
    <button @click="$emit('rotateLeftColumn')">Rotate Left Column</button>
    <button @click="$emit('rotateRightColumn')">Rotate Right Column</button>
    <button @click="$emit('rotateFrontFace')">Rotate Front Face</button>
    <button @click="$emit('rotateBackFace')">Rotate Back Face</button>
    <button @click="$emit('scramble')">Scramble</button>
    <button @click="$emit('solve')">Solve</button>
  </div>
</template>

<script setup>
defineEmits(['rotate','rotateTopRow', 'rotateBottomRow', 'rotateLeftColumn', 'rotateRightColumn', 'rotateFrontFace', 'rotateBackFace', 'scramble', 'solve']);
</script>

<style scoped>
.control-panel {
  margin-top: 20px;
}

button {
  margin-right: 10px;
  padding: 5px 10px;
  margin-bottom: 10px;
}
</style>