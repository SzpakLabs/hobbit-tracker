# Hobbit Tracker

A Vue 3 + TypeScript application for tracking and filtering hobbits from Middle-earth. This interactive tool allows users to manage a database of hobbits with detailed filtering capabilities and offline support.

## 🌟 Features

- 🔍 Full-text search across name, location, and occupation
- 👥 Filter by hobbit races (Harfoot, Fallohide, Stoor)
- 📅 Age range filtering (0-150 years)
- 💍 Filter by ringbearer status
- 👪 Filter by relation to Bilbo
- 🌓 Automatic dark mode support
- 💾 Offline-first with localStorage fallback
- 📱 Responsive design and mobile-friendly
- 🔄 Real-time filtering updates

## 🛠️ Tech Stack

- Vue 3 with Composition API and `<script setup>`
- TypeScript with strict type checking
- Vite for development and building
- CSS Variables for theming
- PWA support
- Offline-first architecture

## 🚀 Quick Start

```bash
# install dependencies
npm install

# run dev server
npm run dev

# build for production
npm run build

# serve production build
npm run preview

# lint code
npm run lint

# format code
npm run format
```


## 📁 Project Structure

```plaintext

src/
├── assets/ # Global CSS and variables
├── components/ # Vue components
│ ├── HobbitList.vue
│ ├── HobbitForm.vue
│ ├── HobbitSearch.vue
│ └── EditHobbitForm.vue
├── composables/ # Reusable composition functions
│ └── useHobbitFilters.ts
├── services/ # API and data services
│ └── hobbitService.ts
├── types/ # TypeScript interfaces
│ └── hobbit.ts
└── App.vue # Root component
```


## 🔌 API Integration

The application connects to a REST API at `http://localhost:3000/hobbits` with automatic fallback to localStorage for offline support.

### Endpoints

- `GET /hobbits` - Retrieve all hobbits
- `POST /hobbits` - Create a new hobbit
- `PUT /hobbits/:id` - Update a hobbit
- `DELETE /hobbits/:id` - Delete a hobbit

## 📝 Type Definitions

```typescript
interface Hobbit {
  id: string
  name: string
  age: number
  location: string
  isRingbearer: boolean
  race: 'Harfoot' | 'Fallohide' | 'Stoor'
  occupation: string
  birthDate: string
  height: number // in centimeters
  isBilboRelative: boolean
}
```


## 🎨 Theming

The application uses CSS variables for consistent theming with dark mode support. Theme customization is available through CSS variables in the `variables.css` file.

## 🌐 Browser Support

- Modern browsers with CSS Grid support
- Mobile and tablet responsive
- Dark mode detection
- Touch-friendly inputs
- Offline capability

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License - See [LICENSE](LICENSE) for more information.

## 🔧 Development

The project uses:
- ESLint for code quality
- Prettier for code formatting
- TypeScript for type safety
- Vite for fast development

Configuration files are available in the root directory:
- `.eslintrc.cjs` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite configuration