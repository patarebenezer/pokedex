# 🧬 Pokedex Explorer

A modern Pokedex web application built with **Next.js 14 (App Router)**
and **Apollo GraphQL**.

---

## 🚀 Features

- 🔍 Search Pokémon by name (debounced)
- 🎯 Filter by Pokémon type
- ↕️ Sort by ID, Name, Height, or Weight
- 📄 Pagination-based navigation
- ⚔️ Compare up to 2 Pokémon side-by-side
- 🎨 Stat highlighting (higher stat = green, lower = red)
- 🔔 Toast notifications for errors and empty results

---

## 🛠 Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Apollo Client (GraphQL)
- Tailwind CSS
- ShadCN UI
- Sonner (Toast Notifications)

---

## 📦 Installation

Clone the repository:

```bash
git clone <your-repo-url>
cd <project-folder>
```

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

---

## 🏃 Running the Project

```bash
npm run dev
```

Open:

    http://localhost:3000

---

## 🧠 Architecture Overview

This project follows a **feature-based modular architecture**.

Instead of grouping by technical type, all Pokémon-related logic lives
inside:

    features/pokemon/

This improves:

- Scalability
- Maintainability
- Clear separation of concerns
- Reusability

---

## 📁 Project Structure

    ```

├── app/
│ ├── components/
│ ├── CompareModal.tsx
│ ├── Modal.tsx
│ └── Pagination.tsx
│ ├── layout.tsx
│ ├── page.tsx
│ └── providers.tsx
│
├── features/
│ └── pokemon/
│ ├── components/
│ │ ├── PokemonCard.tsx
│ │ ├── PokemonFilters.tsx
│ │ ├── PokemonFloatingCompare.tsx
│ │ ├── PokemonImage.tsx
│ │ └── PokemonStats.tsx
│ │
│ ├── graphql/
│ │ └── queries.ts
│ │
│ ├── hooks/
│ │ └── usePokemonCompare.ts
│ │ ├── usePokemonDetail.ts
│ │ ├── usePokemonList.ts
│ │ └── usePokemonQueryState.ts
│ │ └── usePokemonTypes.ts
│ │
│ └── types.ts
│
├── components/
│ └── ui/
│ └── ...
│
├── lib/
│ ├── apollo-client.ts
│ └── utils.ts
│
├── shared/
│ ├── hooks/
│ │ └── useDebounce.ts
│ │
│ ├── getPokemonImage.ts
│ └── constant.ts
│
└── styles/
└── globals.css

````

------------------------------------------------------------------------

## 🧩 Key Engineering Decisions

### 1️⃣ Custom Query State Hook

`usePokemonQueryState` centralizes:

-   Search
-   Sorting
-   Filtering
-   Pagination
-   Query variable building

UI components only describe intent --- they don't mutate arrays
directly.

------------------------------------------------------------------------

### 2️⃣ Encapsulated Type Toggle

Instead of manipulating arrays in components, we expose:

``` ts
toggleType(type: string)
````

This keeps mutation logic inside the hook layer.

---

### 3️⃣ Pagination over Infinite Scroll

Pagination was intentionally chosen because:

- Better control with filtering & sorting
- More predictable compare behavior
- Avoids unnecessary virtualization complexity

---

### 4️⃣ Compare Feature

Users can select up to **2 Pokémon**.

Comparison modal:

- Displays stats side-by-side
- Highlights stronger stats
- Reduces cognitive load for comparison

---

## 👨‍💻 Author

Patar E. Siahaan
Frontend Engineering Technical Project
