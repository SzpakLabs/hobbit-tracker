import { createApp } from 'vue'
import App from './App.vue'

import './assets/reset.css'
import './assets/variables.css'
import './assets/main.css'

const app = createApp(App)

// Global error handler
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err)
  console.error('Component:', instance)
  console.error('Info:', info)
}

// Performance tracking in development
if (import.meta.env.DEV) {
  app.config.performance = true
}

app.mount('#app')