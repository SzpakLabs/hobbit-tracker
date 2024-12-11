<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import HobbitList from './components/HobbitList.vue'
  import HobbitForm from './components/HobbitForm.vue'
  import { hobbitService } from './services/hobbitService'
  import HobbitSearch from './components/HobbitSearch.vue'
  import { useHobbitFilters } from './composables/useHobbitFilters'

  interface Hobbit {
    id: string
    name: string
    age: number
    location: string
    isRingbearer: boolean
  }

  const hobbits = ref<Hobbit[]>([])
  const loading = ref(false)
  const error = ref('')

  const { filteredHobbits, updateFilters } = useHobbitFilters(hobbits.value)

  const loadHobbits = async () => {
    loading.value = true
    error.value = ''
    try {
      hobbits.value = await hobbitService.getAll()
    } catch (e) {
      error.value = 'Failed to load hobbits'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  const addHobbit = async (hobbit: Omit<Hobbit, 'id'>) => {
    try {
      const newHobbit = await hobbitService.create(hobbit)
      hobbits.value.push(newHobbit)
    } catch (e) {
      error.value = 'Failed to add hobbit'
      console.error(e)
    }
  }

  const deleteHobbit = async (id: string) => {
    try {
      await hobbitService.delete(id)
      hobbits.value = hobbits.value.filter(h => h.id !== id)
    } catch (e) {
      error.value = 'Failed to delete hobbit'
      console.error(e)
    }
  }

  const updateHobbit = async (updatedHobbit: Hobbit) => {
    try {
      await hobbitService.update(updatedHobbit)
      const index = hobbits.value.findIndex(h => h.id === updatedHobbit.id)
      if (index !== -1) {
        hobbits.value[index] = updatedHobbit
      }
    } catch (e) {
      error.value = 'Failed to update hobbit'
      console.error(e)
    }
  }

  onMounted(loadHobbits)
</script>

<template>
  <div class="container">
    <header>
      <h1>Hobbit Tracker</h1>
    </header>
    <main>
      <div v-if="error" class="error">
        {{ error }}
      </div>
      <div v-if="loading" class="loading">Loading hobbits...</div>
      <template v-else>
        <HobbitForm @add-hobbit="addHobbit" />
        <HobbitList :hobbits="hobbits" @delete-hobbit="deleteHobbit" />
      </template>
    </main>
  </div>
</template>

<style scoped>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  header {
    text-align: center;
    margin-bottom: 2rem;
  }

  h1 {
    color: #2c3e50;
  }

  .error {
    color: #dc3545;
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid #dc3545;
    border-radius: 4px;
    background-color: #f8d7da;
  }

  .loading {
    text-align: center;
    padding: 2rem;
    color: #666;
  }
</style>
