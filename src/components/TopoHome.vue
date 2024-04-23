<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useConfigurationStore } from '@/stores/configuration'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const error = ref(false)
const input = ref<HTMLInputElement | null>(null)

const startGame = () => {
  if (name.value.trim() !== '') {
    useConfigurationStore().setName(name.value)
    router.push({ name: 'game' })
  } else {
    error.value = true
  }
}
onMounted(() => {
  if(input.value)
    input.value.focus()
})
</script>

<template>
  <section class="home">
    <h1 class="title">Topo Game</h1>
    <form class="form" @submit.prevent="startGame">
      <label class="label" for="name">Name</label>
      <input
        ref="input"
        type="text"
        class="input"
        id="name"
        name="name"
        placeholder="Your name"
        v-model="name"
        autocomplete="off"
        @input="error = false"
      />
      <p class="error" v-if="error">Please enter your name</p>
      <button class="button">Start Game</button>
    </form>
  </section>
</template>

<style scoped>
.title {
  margin-bottom: 1rem;
  text-align: center;
  font-size: 7rem;
  line-height: 0.6;
}

.form {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  padding: 0 2rem;
}

.label {
  align-self: start;
  font-size: 1rem;
  font-family: var(--font-inter);
}

.input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--primary-color);
  font-size: 0.9rem;
  font-family: var(--font-inter);
}

.error {
  align-self: start;
  color: red;
  font-size: 0.8rem;
  font-family: var(--font-inter);
}
</style>
