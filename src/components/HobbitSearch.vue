<script setup lang="ts">
  import { ref, watch } from 'vue'

  interface SearchFilters {
    searchTerm: string
    race: string
    minAge: number
    maxAge: number
    isRingbearer: boolean | null
    isBilboRelative: boolean | null
  }

  const emit = defineEmits<{
    'update-filters': [filters: SearchFilters]
  }>()

  const searchTerm = ref('')
  const race = ref('')
  const minAge = ref(0)
  const maxAge = ref(150)
  const isRingbearer = ref<boolean | null>(null)
  const isBilboRelative = ref<boolean | null>(null)

  watch([searchTerm, race, minAge, maxAge, isRingbearer, isBilboRelative], () => {
    emit('update-filters', {
      searchTerm: searchTerm.value,
      race: race.value,
      minAge: minAge.value,
      maxAge: maxAge.value,
      isRingbearer: isRingbearer.value,
      isBilboRelative: isBilboRelative.value
    })
  })
</script>

<template>
  <div class="search-panel">
    <div class="search-row">
      <div class="search-group">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search hobbits..."
          class="search-input"
        />
      </div>

      <div class="search-group">
        <select v-model="race">
          <option value="">All Races</option>
          <option value="Harfoot">Harfoot</option>
          <option value="Fallohide">Fallohide</option>
          <option value="Stoor">Stoor</option>
        </select>
      </div>
    </div>

    <div class="search-row">
      <div class="search-group">
        <label>Age Range:</label>
        <div class="age-inputs">
          <input v-model.number="minAge" type="number" min="0" max="150" placeholder="Min" />
          <span>to</span>
          <input v-model.number="maxAge" type="number" min="0" max="150" placeholder="Max" />
        </div>
      </div>

      <div class="search-group">
        <select v-model="isRingbearer">
          <option :value="null">Ring Bearer (Any)</option>
          <option :value="true">Ring Bearer</option>
          <option :value="false">Not Ring Bearer</option>
        </select>
      </div>

      <div class="search-group">
        <select v-model="isBilboRelative">
          <option :value="null">Bilbo Relative (Any)</option>
          <option :value="true">Related to Bilbo</option>
          <option :value="false">Not Related to Bilbo</option>
        </select>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .search-panel {
    background-color: #f9f9f9;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    border: 1px solid #ddd;
  }

  .search-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .search-row:last-child {
    margin-bottom: 0;
  }

  .search-group {
    flex: 1;
  }

  .search-input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: white;
  }

  .age-inputs {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .age-inputs input {
    width: 80px;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
</style>
