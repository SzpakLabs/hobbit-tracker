<script setup lang="ts">
  import { ref, watch } from 'vue'

  interface Hobbit {
    id: string
    name: string
    age: number
    location: string
    isRingbearer: boolean
  }

  const props = defineProps<{
    hobbit: Hobbit
    isOpen: boolean
  }>()

  const emit = defineEmits<{
    'update-hobbit': [hobbit: Hobbit]
    close: []
  }>()

  const name = ref(props.hobbit.name)
  const age = ref(props.hobbit.age)
  const location = ref(props.hobbit.location)
  const isRingbearer = ref(props.hobbit.isRingbearer)

  watch(
    () => props.hobbit,
    newHobbit => {
      name.value = newHobbit.name
      age.value = newHobbit.age
      location.value = newHobbit.location
      isRingbearer.value = newHobbit.isRingbearer
    }
  )

  const handleSubmit = () => {
    emit('update-hobbit', {
      id: props.hobbit.id,
      name: name.value,
      age: age.value,
      location: location.value,
      isRingbearer: isRingbearer.value
    })
    emit('close')
  }
</script>

<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal">
      <form @submit.prevent="handleSubmit" class="edit-form">
        <h2>Edit Hobbit</h2>

        <div class="form-group">
          <label for="edit-name">Name:</label>
          <input id="edit-name" v-model="name" type="text" required />
        </div>

        <div class="form-group">
          <label for="edit-age">Age:</label>
          <input id="edit-age" v-model.number="age" type="number" required />
        </div>

        <div class="form-group">
          <label for="edit-location">Location:</label>
          <input id="edit-location" v-model="location" type="text" required />
        </div>

        <div class="form-group checkbox">
          <label for="edit-isRingbearer">
            <input id="edit-isRingbearer" v-model="isRingbearer" type="checkbox" />
            Ring Bearer
          </label>
        </div>

        <div class="button-group">
          <button type="submit" class="save-btn">Save Changes</button>
          <button type="button" class="cancel-btn" @click="emit('close')">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal {
    background-color: var(--card-bg);
    padding: 2rem;
    border-radius: var(--radius-md);
    width: 90%;
    max-width: 500px;
    border: 1px solid var(--border-color);
    color: var(--text-color);
  }

  .edit-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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

  h2 {
    color: var(--text-color);
    margin-bottom: var(--spacing-md);
  }

  .button-group {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  .save-btn,
  .cancel-btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    flex: 1;
  }

  .save-btn {
    background-color: #8b4513;
    color: white;
  }

  .cancel-btn {
    background-color: #6c757d;
    color: white;
  }

  .save-btn:hover {
    background-color: #6b3410;
  }

  .cancel-btn:hover {
    background-color: #5a6268;
  }
</style>
