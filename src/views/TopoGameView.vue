<script setup lang="ts">
import TopoHeader from '@/components/layout/TopoHeader.vue'
import TopoMain from '@/components/layout/TopoMain.vue'
import TopoGame from '@/components/TopoGame.vue'
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
