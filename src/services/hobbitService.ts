interface Hobbit {
  id: string
  name: string
  age: number
  location: string
  isRingbearer: boolean
}

const API_URL = 'http://localhost:3000/hobbits' // adjust to your backend URL

const storage = {
  save: (hobbits: Hobbit[]) => localStorage.setItem('hobbits', JSON.stringify(hobbits)),
  load: (): Hobbit[] => JSON.parse(localStorage.getItem('hobbits') || '[]')
}

export const hobbitService = {
  getAll: async (): Promise<Hobbit[]> => {
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Network response was not ok')
      return await response.json()
    } catch (error) {
      console.warn('Falling back to local storage:', error)
      return storage.load()
    }
  },

  create: async (hobbit: Omit<Hobbit, 'id'>): Promise<Hobbit> => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hobbit)
      })
      if (!response.ok) throw new Error('Network response was not ok')
      return await response.json()
    } catch (error) {
      console.warn('Falling back to local storage:', error)
      const hobbits = storage.load()
      const newHobbit = { ...hobbit, id: crypto.randomUUID() }
      hobbits.push(newHobbit)
      storage.save(hobbits)
      return newHobbit
    }
  },

  update: async (hobbit: Hobbit): Promise<Hobbit> => {
    try {
      const response = await fetch(`${API_URL}/${hobbit.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hobbit)
      })
      if (!response.ok) throw new Error('Network response was not ok')
      return await response.json()
    } catch (error) {
      console.warn('Falling back to local storage:', error)
      const hobbits = storage.load()
      const index = hobbits.findIndex(h => h.id === hobbit.id)
      if (index !== -1) {
        hobbits[index] = hobbit
        storage.save(hobbits)
      }
      return hobbit
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Network response was not ok')
    } catch (error) {
      console.warn('Falling back to local storage:', error)
      const hobbits = storage.load()
      const filtered = hobbits.filter(h => h.id !== id)
      storage.save(filtered)
    }
  }
}
