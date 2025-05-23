# Phrase Manager

A web dashboard application to manage, analyze, and visualize your favorite phrases. Store phrases, categorize them, search through them, and view real-time statistics.

---

## Table of Contents

- [Demo](#demo)  
- [Features](#features)  
- [Project Structure](#project-structure)  
- [Technologies](#technologies)  
- [Installation](#installation)  
- [Available Scripts](#available-scripts)  
- [Testing](#testing)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Demo

> *Coming soon… add screenshots or a short video showing the application in action.*

---

## Features

- **Create / Edit / Delete Phrases**  
- **Customizable Categories** (general, quote, reminder, note)  
- **Search Bar** with debounced input  
- **Statistic Cards**:
  - Total phrases  
  - Phrases added this week  
  - Average phrase length  
  - Number of categories  
- **Drag & Drop** to reorder statistic cards  
- **Interactive Charts**:
  - Phrase activity over time  
  - Calendar view of phrase additions  
  - Category distribution pie chart  
  - Completion progress bar  
- **Form Validation** with react-hook-form and Zod  
- **Responsive Sidebar** built with Radix UI and styled-components  
- **Notifications / Toasts** using Sonner  
- **Animations** via Framer Motion  
- **Dark / Light / System Theme** support with styled-components ThemeProvider  
- Built with **Vite** for fast development and production builds

---

## Project Structure

```
.
├── public/                  # Static assets (favicon, images)
├── src/
│   ├── components/          # Reusable UI components (SearchBar, Sidebar, StatsCard…)
│   ├── features/            # Feature-specific components and pages (Dashboard, PhraseForm…)
│   ├── context/             # React Context providers (PhraseProvider)
│   ├── hooks/               # Custom hooks (usePhraseContext, useMobile…)
│   ├── utils/               # Utility functions (debounce, schema helpers…)
│   ├── styles/              # Global CSS (Tailwind) and styled-components theme
│   ├── types/               # TypeScript types (PhraseSchema, StatsCardColor…)
│   └── hoc/                 # Higher-order components (withErrorBoundary)
├── __tests__/               # Example unit tests
│   └── components/          # Component tests (SearchBar example)
├── jest.config.ts           # Jest configuration for ts-jest  
├── tsconfig.app.json        # TypeScript config for application code  
├── tsconfig.jest.json       # TypeScript config for tests  
├── vite.config.ts           # Vite configuration  
└── tailwind.config.js       # Tailwind CSS configuration  
```

---

## Technologies

- **Framework**: React 18  
- **Bundler / Dev Server**: Vite  
- **Styling**: Tailwind CSS & styled-components  
- **UI Primitives**: Radix UI, lucide-react  
- **Forms**: react-hook-form, Zod  
- **Charts**: Recharts, react-chartjs-2, Chart.js  
- **Drag & Drop**: @hello-pangea/dnd  
- **Animations**: Framer Motion  
- **Notifications**: Sonner  
- **Testing**: Jest, @testing-library/react, ts-jest, jest-environment-jsdom  

---

## Installation

```bash
# Clone the repository
git clone https://github.com/carobsts/phrase-manager.git
cd phrase-manager

# Install dependencies
npm install
```

---

## Available Scripts

| Command                    | Description                                            |
| -------------------------- | ------------------------------------------------------ |
| `npm run dev`              | Start the development server using Vite               |
| `npm run build`            | Build the application for production                  |
| `npm run preview`          | Preview the production build locally                  |
| `npm run lint`             | Run ESLint on `.ts` and `.tsx` files                  |
| `npm run test`             | Run all Jest tests                                    |
| `npm run test:watch`       | Run Jest in watch mode                                |
| `npm run test:coverage`    | Generate coverage report                              |

---

## Testing

A sample test has been implemented for the `SearchBar` component to demonstrate how to:

1. Wrap components with `ThemeProvider` for styled-components.  
2. Use `jest.useFakeTimers()` to test debounce logic.  
3. Simulate `fireEvent.change` and verify `onSearch` callback calls.  

Run the example test:

```bash
npm run test -- SearchBar
```

Due to time constraints, only the `SearchBar` test is included, but the same approach can be applied across all components and features.