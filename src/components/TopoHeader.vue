<template>
  <header class="header">
    <h1 class="title">Topo Game</h1>
    <h2 class="player-name">Player Name</h2>
    <button type="button" class="difficulty">Difficulty</button>
  </header>
</template>

<style scoped>
  .header {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 1rem;
    background-color: var(--primary-color);
    color: var(--secondary-color);
    line-height: 0.7;
  }
  
  .title {
    width: 100%;
    font-size: 3.5rem;
    text-align: center;
  }

  .player-name {
    font-size: 2.2rem;
  }
</style>