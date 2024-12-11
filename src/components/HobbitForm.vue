<script setup lang="ts">
  import { ref } from 'vue'

  interface HobbitFormData {
    name: string
    age: number
    location: string
    isRingbearer: boolean
  }

  const emit = defineEmits<{
    'add-hobbit': [hobbit: HobbitFormData]
  }>()

  const name = ref('')
  const age = ref<number>(0)
  const location = ref('')
  const isRingbearer = ref(false)

  const handleSubmit = () => {
    emit('add-hobbit', {
      name: name.value,
      age: age.value,
      location: location.value,
      isRingbearer: isRingbearer.value
    })

    // Reset form
    name.value = ''
    age.value = 0
    location.value = ''
    isRingbearer.value = false
  }
</script>

<template>
  <form @submit.prevent="handleSubmit" class="hobbit-form">
    <div class="form-group">
      <label for="name">Name:</label>
      <input id="name" v-model="name" type="text" required />
    </div>

    <div class="form-group">
      <label for="age">Age:</label>
      <input id="age" v-model.number="age" type="number" required />
    </div>

    <div class="form-group">
      <label for="location">Location:</label>
      <input id="location" v-model="location" type="text" required />
    </div>

    <div class="form-group checkbox">
      <label for="isRingbearer">
        <input id="isRingbearer" v-model="isRingbearer" type="checkbox" />
        Ring Bearer
      </label>
    </div>

    <button type="submit">Add Hobbit</button>
  </form>
</template>

<style scoped>
  .hobbit-form {
    max-width: 500px;
    margin: 0 auto 2rem;
    padding: 1.5rem;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background-color: var(--card-bg);
    color: var(--text-color);
    box-shadow: var(--shadow-md);
  }

  .form-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--text-color);
  }

  input[type='text'],
  input[type='number'] {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--input-border);
    border-radius: var(--radius-sm);
    background-color: var(--input-bg);
    color: var(--text-color);
  }

  input[type='checkbox'] {
    accent-color: var(--primary-color);
  }

  .checkbox label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0;
    color: var(--text-color);
  }

  button {
    width: 100%;
    padding: 0.75rem;
    background-color: #8b4513;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }

  button:hover {
    background-color: #6b3410;
  }
</style>
