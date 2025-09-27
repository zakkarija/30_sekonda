# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
cd 30-sekonda && npm start    # Start Expo development server
cd 30-sekonda && npm run ios   # Start iOS simulator
cd 30-sekonda && npm run android # Start Android emulator
cd 30-sekonda && npm run web   # Start web version
```

### Code Quality
```bash
cd 30-sekonda && npm run lint  # Run ESLint
```

### TypeScript
```bash
cd 30-sekonda && npx tsc --noEmit  # Type check without building
```

## Architecture

### Core Game Architecture
The app implements a turn-based word guessing game with the following state flow:

1. **Welcome Screen** (`app/index.tsx`) → Introduction and navigation to setup
2. **Setup Screen** (`app/setup.tsx`) → Player registration and team assignment
   - Players are automatically assigned to Red/Blue teams alternately
   - Validates minimum 2 players before proceeding
3. **Game Screen** (`app/game.tsx`) → Main game logic orchestration
   - Manages turn rotation between players
   - Tracks scores per team
   - Determines game completion when a team reaches winning score (>50% of rounds)

### State Management Pattern
The game uses React state with a clear data flow:
- Player state is passed via navigation params from Setup → Game
- Game state (scores, current player, words) is managed locally in GameScreen
- No global state management library is used

### Component Organization
- **Screens** (`src/screens/`): Full-screen components that map to routes
- **Components** (`src/components/`): Reusable UI elements
  - Basic components: Timer, score displays, word lists
  - Modals: Result and game-over overlays
  - Buttons: Navigation controls
- **Routes** (`app/`): Expo Router file-based navigation endpoints

### Styling System
Uses NativeWind (Tailwind for React Native) with a centralized theme:
- Theme constants in `src/styles/theme.ts`
- Tailwind config at `30-sekonda/tailwind.config.js`
- Inline Tailwind classes for component styling

### Word Lists
Multilingual support with word lists in `src/assets/wordlists/`:
- Each language exports an array of strings
- Random selection without replacement during each round

## Development Notes

### TypeScript Configuration
- Strict mode enabled
- Path alias `@/*` maps to project root
- Extends Expo's base TypeScript configuration

### Navigation
Uses Expo Router v5 with file-based routing:
- Stack navigation without headers
- Route params for passing game state between screens

### Key Game Constants
Located in `src/constants/game.ts`:
- Timer: 30 seconds per turn
- Words per round: 5
- Player limits: 2-8
- Round options: 3, 5, or 7 total rounds