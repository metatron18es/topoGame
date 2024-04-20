<script setup lang="ts">
  import TopoHeader from '../components/TopoHeader.vue'
  import TopoMain from '../components/TopoMain.vue'
  import TopoGame from '../components/TopoGame.vue'
</script>

<template>
  <TopoHeader />
  <TopoMain>
    <TopoGame />
  </TopoMain>
</template>

<style>
  .game {
    flex-grow: 1;
  }
</style>
