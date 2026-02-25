This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Structure folder :

```
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
│
├── features/
│   └── pokemon/
│       ├── components/
│       │   ├── PokemonCard.tsx
│       │   ├── PokemonList.tsx
│       │   ├── PokemonSearch.tsx
│       │   ├── PokemonFilter.tsx
│       │   ├── PokemonSort.tsx
│       │   └── PokemonCompareModal.tsx
│       │
│       ├── graphql/
│       │   ├── queries.ts
│       │   └── fragments.ts
│       │
│       ├── hooks/
│       │   ├── usePokemonList.ts
│       │   └── usePokemonCompare.ts
│       │
│       ├── types.ts
│       └── utils.ts
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   └── Modal.tsx
│   │
│   └── layout/
│       ├── Container.tsx
│       └── Header.tsx
│
├── lib/
│   ├── apollo-client.ts
│   └── helpers.ts
│
├── shared/
│   ├── hooks/
│   │   └── useDebounce.ts
│   │
│   ├── constants.ts
│   └── types.ts
│
└── styles/
    └── globals.css
```
