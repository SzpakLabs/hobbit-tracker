<script setup lang="ts">
  import { ref } from 'vue'
  import EditHobbitForm from './EditHobbitForm.vue'

  interface Hobbit {
    id: string
    name: string
    age: number
    location: string
    isRingbearer: boolean
  }

  const props = defineProps<{
    hobbits: Hobbit[]
  }>()

  const emit = defineEmits<{
    'delete-hobbit': [id: string]
    'update-hobbit': [hobbit: Hobbit]
  }>()

  const editingHobbit = ref<Hobbit | null>(null)
  const isEditModalOpen = ref(false)

  const openEditModal = (hobbit: Hobbit) => {
    editingHobbit.value = hobbit
    isEditModalOpen.value = true
  }

  const closeEditModal = () => {
    editingHobbit.value = null
    isEditModalOpen.value = false
  }
</script>

<template>
  <div class="hobbit-list">
    <div v-for="hobbit in hobbits" :key="hobbit.id" class="hobbit-card">
      <div class="card-actions">
        <button class="edit-btn" @click="openEditModal(hobbit)" title="Edit hobbit">✎</button>
        <button class="delete-btn" @click="emit('delete-hobbit', hobbit.id)" title="Delete hobbit">
          ×
        </button>
      </div>
      <h3>{{ hobbit.name }}</h3>
      <p>Age: {{ hobbit.age }}</p>
      <p>Location: {{ hobbit.location }}</p>
      <p class="ringbearer">
        {{ hobbit.isRingbearer ? '💍 Ring Bearer' : 'Not a Ring Bearer' }}
      </p>
    </div>

    <EditHobbitForm
      v-if="editingHobbit"
      :hobbit="editingHobbit"
      :is-open="isEditModalOpen"
      @update-hobbit="hobbit => emit('update-hobbit', hobbit)"
      @close="closeEditModal"
    />
  </div>
</template>

<style scoped>
  .hobbit-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  .hobbit-card {
    position: relative;
    border: 1px solid var(--card-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-md);
    background-color: var(--card-bg);
    box-shadow: 0 2px 8px var(--card-shadow);
    color: var(--card-text);
  }

  .hobbit-card h3 {
    color: var(--card-text);
    margin-bottom: var(--spacing-sm);
  }

  .hobbit-card p {
    color: var(--card-text-secondary);
    margin-bottom: var(--spacing-xs);
  }

  .card-actions {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: flex;
    gap: 0.5rem;
  }

  .edit-btn,
  .delete-btn {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    padding: 0;
    line-height: 1;
  }

  .edit-btn {
    background-color: var(--warning-color);
    color: var(--bg-dark);
  }

  .edit-btn:hover {
    background-color: #e0a800;
  }

  .delete-btn {
    background-color: var(--error-color);
    color: var(--card-text);
  }

  .delete-btn:hover {
    background-color: #c82333;
  }

  .ringbearer {
    color: var(--primary-color);
    font-weight: bold;
  }
</style>
