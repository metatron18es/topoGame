<template>
  <button type="button" class="cell">
    <span class="sr-only">Active</span>
  </button>
</template>

<style scoped>
  .cell {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: 0 0 10px/50% 10px/50%;
  }
  .cell::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('../assets/img/topo-base.svg') no-repeat bottom center;
    background-size: 100% auto;
  }
  .cell::after {
    content: "";
    position: absolute;
    bottom: -75%;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('../assets/img/topo.svg') no-repeat bottom 5px center;
    background-size: auto calc(100% - 20px);
    transition: bottom .3s;
  }
  .cell.active::after {
    bottom: 0;
    cursor: pointer;
  }
</style>