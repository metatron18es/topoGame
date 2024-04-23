<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useConfigurationStore } from '@/stores/configuration'
import { useGameStore } from '@/stores/game'
import { useVibrate } from '@vueuse/core'

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  cell: {
    type: Number,
    required: true
  }
})

const { vibrate } = useVibrate({ pattern: [100] })

const emit = defineEmits(['close'])

const timerId = ref<ReturnType<typeof setTimeout> | null>(null)
const time = computed(() => {
  return useConfigurationStore().time
})

const isGameStarted = computed(() => {
  return useGameStore().isGameStarted
})

const cssTime = computed(() => {
  return `${time.value}ms`
})

const topoClicked = () => {
  if (timerId.value !== null) {
    clearTimeout(timerId.value)
    timerId.value = null
    useGameStore().incrementScore(useConfigurationStore().increment)
    useGameStore().newTopo(props.cell)
    vibrate()
  }
}

watch(
  () => isGameStarted.value,
  (isGameStarted) => {
    if (!isGameStarted) {
      if (timerId.value !== null) {
        clearTimeout(timerId.value)
      }
      timerId.value = null
    }
  },
  {
    flush: 'post'
  }
)

watch(
  () => props.active,
  (active) => {
    if (active) {
      timerId.value = setTimeout(() => {
        emit('close')
        timerId.value = null
      }, time.value)
    } else if (timerId.value !== null) {
      clearTimeout(timerId.value)
      if (isGameStarted.value) {
        emit('close')
      }
      timerId.value = null
    }
  }
)
</script>

<template>
  <button type="button" class="cell" :class="{ active: props.active }" @click="topoClicked">
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
.cell.active {
  cursor: pointer;
}
.cell::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('../assets/img/topo-base.svg') no-repeat bottom center;
  background-size: 100% auto;
}
.cell::after {
  content: '';
  position: absolute;
  bottom: -75%;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('../assets/img/topo.svg') no-repeat bottom 5px center;
  background-size: auto calc(100% - 20px);
}
.cell.active::after {
  animation: topoShow v-bind(cssTime) ease-in-out;
}

@keyframes topoShow {
  0% {
    bottom: -75%;
  }
  10% {
    bottom: 0;
  }
  90% {
    bottom: 0;
  }
  100% {
    bottom: -75%;
  }
}
</style>
