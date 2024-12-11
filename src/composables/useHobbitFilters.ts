import { ref, computed } from 'vue'
import type { Hobbit } from '@/types/hobbit'

interface SearchFilters {
  searchTerm: string
  race: string
  minAge: number
  maxAge: number
  isRingbearer: boolean | null
  isBilboRelative: boolean | null
}

export const useHobbitFilters = (hobbits: Hobbit[]) => {
  const filters = ref<SearchFilters>({
    searchTerm: '',
    race: '',
    minAge: 0,
    maxAge: 150,
    isRingbearer: null,
    isBilboRelative: null
  })

  const filteredHobbits = computed(() => {
    return hobbits.filter(hobbit => {
      const matchesSearch =
        hobbit.name.toLowerCase().includes(filters.value.searchTerm.toLowerCase()) ||
        hobbit.location.toLowerCase().includes(filters.value.searchTerm.toLowerCase()) ||
        hobbit.occupation.toLowerCase().includes(filters.value.searchTerm.toLowerCase())

      const matchesRace = !filters.value.race || hobbit.race === filters.value.race

      const matchesAge = hobbit.age >= filters.value.minAge && hobbit.age <= filters.value.maxAge

      const matchesRingbearer =
        filters.value.isRingbearer === null || hobbit.isRingbearer === filters.value.isRingbearer

      const matchesBilboRelative =
        filters.value.isBilboRelative === null ||
        hobbit.isBilboRelative === filters.value.isBilboRelative

      return matchesSearch && matchesRace && matchesAge && matchesRingbearer && matchesBilboRelative
    })
  })

  const updateFilters = (newFilters: SearchFilters) => {
    filters.value = newFilters
  }

  return {
    filters,
    filteredHobbits,
    updateFilters
  }
}
