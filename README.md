# Word Connections Game

A Spanish-language word connections game inspired by The New York Times Connections. Group 16 words into 4 categories of 4 words each, where each category shares a common theme.

## How to Play

1. **16 words** are displayed in a grid, shuffled randomly each game
2. **Select 4 words** you think belong to the same category
3. Click **"Comprobar"** (Check) to verify your selection
4. If correct, the category is removed and those words are no longer selectable
5. If incorrect, you lose one **intento** (attempt) — you have 4 attempts total
6. When 2+ selected words belong to the same unsolved category, they **highlight in green** as a pista (hint)
7. Use **"Revelar"** to show all categories if stuck

## Win/Loss Conditions

- **Win**: Solve all 4 categories within 4 incorrect attempts
- **Loss**: 4 incorrect attempts exhausted

## Features

- 10 daily puzzles with Spanish word categories
- Color-coded difficulty: yellow (easiest) → green → blue → purple (hardest)
- Dynamic hint system with green highlights
- Circular puzzle navigation (next/previous)
- Responsive design with Tailwind CSS v4

## Available Puzzles

The game includes 10 puzzles (June 1–10, 2024), each with 4 categories:

- Alguien que no encaja
- Lugares en los que quedarse atrapado
- Cosas que se obtienen de animales
- Cosas pegajosas
- And more: herramientas, instrumentos, animales, elementos de playa, piedras preciosas, bailes, plantas, planetas, técnicas de pintura, asignaturas, animales domésticos, quesos y más...

## Technology Stack

- **Next.js 16** with App Router
- **React 19**
- **Tailwind CSS v4**
- **TypeScript 5**
- Spanish word data in `data/words.json`

## Getting Started

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

## Learn More

To learn more about Next.js, take a look at the [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
