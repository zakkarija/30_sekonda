# CLAUDE.md

This file provides comprehensive guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**30 Sekonda** is a team-based word guessing game built with React Native and Expo. Players compete in teams to guess words within a 30-second time limit across multiple rounds.

**Key Features:**
- Multi-team support (Red, Blue, Green, Yellow teams)
- Multilingual word lists (English, Maltese)
- Configurable game settings (3, 5, or 7 rounds)
- Turn-based gameplay with automatic rotation
- Real-time scoring and round tracking

## Commands

### Development
```bash
cd 30-sekonda && npm start              # Start Expo development server
cd 30-sekonda && npm run ios            # Start iOS simulator (macOS only)
cd 30-sekonda && npm run android        # Start Android emulator
cd 30-sekonda && npm run web            # Start web version
cd 30-sekonda && npm run reset-project  # Reset project to starter state
```

### Code Quality & Testing
```bash
cd 30-sekonda && npm run lint           # Run ESLint
cd 30-sekonda && npx tsc --noEmit       # Type check without building
cd 30-sekonda && npx expo doctor        # Check Expo configuration health
```

### Build & Deployment (EAS)
```bash
# Install EAS CLI globally
npm install -g eas-cli

# Build commands
eas build --platform ios                # Build for iOS
eas build --platform android            # Build for Android
eas build --platform all                # Build for both platforms

# Submit to stores
eas submit --platform ios               # Submit to App Store
eas submit --platform android           # Submit to Play Store
```

## Project Structure

```
/30_sekonda/
├── CLAUDE.md              # This file - AI assistant guidance
├── SETUP.md               # Development and deployment guide
│
└── /30-sekonda/           # Main application directory
    ├── /app/              # Expo Router routes (file-based routing)
    │   ├── _layout.tsx    # Stack navigation layout
    │   ├── index.tsx      # Welcome screen route (/)
    │   ├── setup.tsx      # Setup screen route (/setup)
    │   ├── game.tsx       # Game screen route (/game)
    │   └── /components/   # Route-level components
    │       └── /buttons/  # Next button
    │
    ├── /src/              # Application source code
    │   ├── /assets/       # Static assets
    │   │   └── /wordlists/
    │   │       ├── english.ts   # English word list
    │   │       └── maltese.ts   # Maltese word list
    │   │
    │   ├── /components/   # Reusable UI components
    │   │   ├── /buttons/
    │   │   │   ├── BackButton.tsx
    │   │   │   └── TeamColorButton.tsx
    │   │   ├── /modals/
    │   │   │   ├── ResultModal.tsx       # Round result display
    │   │   │   ├── GameOverModal.tsx     # Game completion display
    │   │   │   └── HelpModal.tsx         # Game instructions
    │   │   ├── GameTimer.tsx             # 30-second countdown timer
    │   │   ├── WordList.tsx              # Word display with checkboxes
    │   │   ├── PlayerTurnIndicator.tsx   # Current player display
    │   │   ├── ScoreDisplay.tsx          # Team scores
    │   │   ├── RoundInfoDisplay.tsx      # Round progress
    │   │   └── index.ts                  # Barrel exports
    │   │
    │   ├── /hooks/        # Custom React hooks
    │   │   └── useSafeAreaPadding.ts     # Safe area utilities
    │   │
    │   ├── /screens/      # Screen components (imported by routes)
    │   │   ├── WelcomeScreen.tsx
    │   │   ├── SetupScreen.tsx
    │   │   └── GameScreen.tsx
    │   │
    │   ├── /styles/       # Global styles and theme
    │   │   └── theme.ts   # Color palette, spacing, typography
    │   │
    │   ├── /types/        # TypeScript type definitions
    │   │   └── index.ts   # Player, Word, TeamColor, Modal props
    │   │
    │   └── /constants/    # App constants
    │       └── game.ts    # Game configuration constants
    │
    ├── /assets/           # Expo assets (images, fonts, icons)
    │   └── /images/       # App icon, splash screen, etc.
    │
    ├── app.json           # Expo configuration
    ├── eas.json           # EAS Build configuration
    ├── package.json       # Dependencies and scripts
    ├── tsconfig.json      # TypeScript configuration
    ├── tailwind.config.js # Tailwind CSS configuration
    ├── babel.config.js    # Babel configuration
    └── metro.config.js    # Metro bundler configuration
```

## Architecture

### Technology Stack

**Core:**
- React Native 0.81.5
- Expo SDK 54.0.23
- TypeScript 5.9.2
- React 19.1.0

**Navigation:**
- Expo Router 6.0.14 (file-based routing)
- React Navigation 7.1.6

**Styling:**
- NativeWind 4.1.23 (Tailwind CSS for React Native)
- Tailwind CSS 3.3.2
- Custom theme system in `src/styles/theme.ts`

**Utilities:**
- Expo Haptics (tactile feedback)
- Expo Constants
- React Native Safe Area Context
- React Native Reanimated

### Game Flow Architecture

```
┌─────────────────┐
│ Welcome Screen  │  Introduction, navigation to setup
│   (app/index)   │
└────────┬────────┘
         │
         v
┌─────────────────┐
│  Setup Screen   │  Player registration, team selection
│  (app/setup)    │  - Add 2-8 players
└────────┬────────┘  - Assign to Red/Blue/Green/Yellow teams
         │           - Select language (English/Maltese)
         │           - Choose rounds (3, 5, or 7)
         v
┌─────────────────┐
│   Game Screen   │  Main game logic
│   (app/game)    │  - 30-second timer per turn
└─────────────────┘  - 5 words to guess per round
                     - Automatic player rotation
                     - Real-time score tracking
                     - Game ends when team reaches winning score
```

### State Management Pattern

**Local State (React useState/useEffect):**
- Game state is managed within individual screen components
- Player data passed via Expo Router navigation params
- No global state management library (Redux, Zustand, etc.)

**Data Flow:**
1. SetupScreen collects player data
2. Data passed to GameScreen via `router.push()` with params
3. GameScreen manages: scores, current player, words, timer, modals
4. State resets on navigation back to setup

### Component Organization

**Screens** (`src/screens/`):
- Full-screen components containing business logic
- Imported by route files in `app/`
- Handle state management and data flow

**Components** (`src/components/`):
- Reusable, presentational UI elements
- Accept props, minimal internal state
- Organized by category (buttons, modals, displays)
- Exported via barrel file (`index.ts`)

**Routes** (`app/`):
- Thin wrapper files for Expo Router
- Import and render screen components
- Define navigation structure

### Styling System

**NativeWind (Tailwind for React Native):**
- Tailwind utility classes applied via `className` prop
- Configuration in `tailwind.config.js`
- Content paths: `"./app/**/*.{js,jsx,ts,tsx}"`

**Theme System** (`src/styles/theme.ts`):
```typescript
export const colors = {
  background: { primary, secondary, tertiary },
  team: { red, blue, green, yellow },
  feedback: { success, warning, danger, info },
  text: { primary, secondary, dark }
};

export const spacing = { xs, sm, md, lg, xl, xxl };
export const borderRadius = { sm, md, lg, round };
export const fontSize = { xs, sm, md, lg, xl, xxl, xxxl, display };
export const shadow = { small, medium, large };
```

**Usage Pattern:**
- Import theme constants for complex styles
- Use Tailwind classes for simple, standard styles
- StyleSheet.create() for platform-specific or dynamic styles

### TypeScript Configuration

**Key Settings:**
- Strict mode enabled
- Path alias: `@/*` maps to project root
- Module resolution: Node16
- Target: ESNext
- Extends Expo's base TypeScript config

**Type Definitions** (`src/types/index.ts`):
```typescript
export type TeamColor = 'red' | 'blue' | 'green' | 'yellow';

export interface Player {
  id: number;
  name: string;
  isRedTeam: boolean;  // Legacy, kept for backwards compatibility
  team?: TeamColor;     // Current multi-team support
}

export interface Word {
  id: number;
  text: string;
  checked: boolean;
}
```

### Navigation System

**Expo Router (v6) File-Based Routing:**
- `app/_layout.tsx`: Stack navigator with SafeAreaProvider
- `app/index.tsx`: Welcome screen (/)
- `app/setup.tsx`: Setup screen (/setup)
- `app/game.tsx`: Game screen (/game)

**Navigation Methods:**
```typescript
import { router } from 'expo-router';

// Navigate forward
router.push('/setup');
router.push({
  pathname: '/game',
  params: { players: JSON.stringify(playersArray) }
});

// Navigate back
router.back();
```

**Route Params:**
- Players data: JSON stringified array
- Rounds: string number ('3', '5', '7')
- Language: string ('English', 'Maltese')

### Game Constants

**Located in** `src/constants/game.ts`:
```typescript
export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 8;
export const ROUND_OPTIONS = [3, 5, 7];
export const DEFAULT_TIMER_SECONDS = 30;
export const WORDS_PER_ROUND = 5;
```

### Word Lists

**Location:** `src/assets/wordlists/`
**Structure:** TypeScript files exporting string arrays
**Languages:** English, Maltese
**Usage:** Random selection without replacement during each round

```typescript
// src/assets/wordlists/english.ts
export const englishWords: string[] = ['apple', 'banana', ...];

// src/assets/wordlists/maltese.ts
export const malteseWords: string[] = ['tuffieħa', 'banana', ...];
```

## Development Conventions

### Code Style

**File Naming:**
- Components: PascalCase (e.g., `GameTimer.tsx`)
- Utilities/hooks: camelCase (e.g., `useSafeAreaPadding.ts`)
- Types: PascalCase (e.g., `index.ts` with PascalCase exports)
- Constants: camelCase file, SCREAMING_SNAKE_CASE exports

**Component Structure:**
```typescript
// Imports
import React from 'react';
import { View, Text } from 'react-native';

// Types
interface Props {
  title: string;
}

// Component
export default function MyComponent({ title }: Props) {
  // Hooks
  const [state, setState] = useState();

  // Effects
  useEffect(() => {}, []);

  // Callbacks
  const handlePress = useCallback(() => {}, []);

  // Render
  return <View>...</View>;
}

// Styles (if needed)
const styles = StyleSheet.create({});
```

### Import Organization

1. React and React Native core
2. Third-party libraries (Expo, navigation)
3. Local components (barrel imports preferred)
4. Local utilities, types, constants
5. Assets (images, word lists)

### State Management Best Practices

**When to use local state:**
- UI state (modals, toggles, inputs)
- Screen-specific data (current round, timer)
- Derived state from props/params

**Props vs Params:**
- Use navigation params for screen-to-screen data transfer
- Use props for parent-child component communication

### Error Handling

**Current approach:**
- Try-catch blocks for JSON parsing (navigation params)
- Console.error for logging
- Fallback to default values on error

**Missing (for production):**
- Error boundaries
- Crash reporting (Sentry, Bugsnag)
- User-facing error messages

## Testing Strategy

### Current State
- No automated tests implemented
- Manual testing on:
  - iOS simulator
  - Android emulator
  - Expo Go on physical devices
  - Web browser

### Recommended Testing Approach

**Unit Tests** (Jest + React Native Testing Library):
```bash
cd 30-sekonda && npm install --save-dev jest @testing-library/react-native
```

**Test files location:** `__tests__/` or `*.test.tsx` alongside components

**E2E Tests** (Detox or Maestro):
- Critical user flows (setup → game → completion)
- Multi-platform testing

## Build & Deployment

### EAS Configuration

**Located in** `eas.json`:
- Development: Internal distribution with dev client
- Preview: Internal testing builds
- Production: Auto-increment version, store submission

**EAS Project ID:** `8faa6f22-fab4-4464-9abc-35e355033780`

### Platform Configuration

**iOS** (`app.json`):
- Supports tablets
- Scheme: `30sekonda`
- Icon: `./assets/images/icon.png`

**Android** (`app.json`):
- Package: `zikogames.tlettinsekonda`
- Edge-to-edge enabled
- Adaptive icon with white background

**Web:**
- Metro bundler
- Static output
- Favicon: `./assets/images/favicon.png`

### Expo Plugins

1. `expo-router`: File-based routing
2. `expo-splash-screen`: Custom splash with logo (200px width)
3. `expo-font`: Custom font loading
4. `expo-web-browser`: In-app browser support

## Common Tasks & Workflows

### Adding a New Screen

1. Create screen component in `src/screens/NewScreen.tsx`
2. Create route file in `app/newscreen.tsx`
3. Import and render screen component in route
4. Add to `app/_layout.tsx` if using custom navigation
5. Update navigation calls to include new route

### Adding a New Component

1. Create component in appropriate `src/components/` subdirectory
2. Export from `src/components/index.ts` (barrel export)
3. Import using barrel: `import { MyComponent } from '../components'`

### Adding a New Word List

1. Create `src/assets/wordlists/language.ts`
2. Export as: `export const languageWords: string[] = [...]`
3. Import in `GameScreen.tsx`
4. Add language option in `SetupScreen.tsx`
5. Update word selection logic

### Modifying Game Constants

Edit `src/constants/game.ts`:
- Timer duration: `DEFAULT_TIMER_SECONDS`
- Player limits: `MIN_PLAYERS`, `MAX_PLAYERS`
- Round options: `ROUND_OPTIONS`
- Words per round: `WORDS_PER_ROUND`

### Updating Theme/Styling

**Global changes:**
- Edit `src/styles/theme.ts` for centralized values
- Tailwind config: `tailwind.config.js`

**Component-specific:**
- Use NativeWind classes: `className="bg-blue-500"`
- Import theme: `import { colors } from '@/src/styles/theme'`

## Troubleshooting

### Common Issues

**Metro bundler errors:**
```bash
# Clear cache and restart
cd 30-sekonda && npx expo start --clear
```

**TypeScript errors:**
```bash
# Rebuild TypeScript definitions
cd 30-sekonda && npx expo customize tsconfig.json
cd 30-sekonda && npx tsc --noEmit
```

**Navigation param issues:**
- Always JSON.stringify complex objects
- Always try-catch when JSON.parse
- Provide fallback defaults

**Expo Go limitations:**
- Some native modules require development builds
- Use `eas build --profile development` for custom native code

## AI Assistant Guidelines

### When Making Changes

1. **Always read existing code first** before making modifications
2. **Maintain consistency** with existing patterns and conventions
3. **Preserve backwards compatibility** (e.g., `isRedTeam` alongside `team`)
4. **Test navigation flows** after changes to routing
5. **Update types** when adding new features

### Code Quality Standards

- Use TypeScript strict mode (no `any` types)
- Prefer functional components with hooks
- Use `useCallback` for functions passed as props
- Use `useMemo` for expensive computations
- Always handle loading/error states
- Add JSDoc comments for complex logic

### Safe Refactoring

Before refactoring:
1. Understand the current data flow
2. Check for dependencies (imports, exports)
3. Consider backwards compatibility
4. Test on multiple screen sizes

### What to Avoid

- Don't create new global state management without discussion
- Don't modify `app.json` without verifying Expo compatibility
- Don't change package.json dependencies without checking version compatibility
- Don't remove TypeScript strict mode
- Don't hardcode values that should be in `constants/game.ts`
- Don't bypass navigation params for screen-to-screen data transfer

## Production Readiness Checklist

See `SETUP.md` for comprehensive deployment guide.

**Critical missing items:**
- [ ] Error boundaries and crash reporting
- [ ] Analytics integration
- [ ] Performance monitoring
- [ ] Privacy policy and terms of service
- [ ] App Store assets (screenshots, descriptions)
- [ ] Production icons and splash screens
- [ ] Automated testing suite

## Resources

- **Expo Documentation**: https://docs.expo.dev/
- **React Native Documentation**: https://reactnative.dev/
- **Expo Router Docs**: https://docs.expo.dev/router/introduction/
- **NativeWind Docs**: https://www.nativewind.dev/
- **EAS Build Docs**: https://docs.expo.dev/build/introduction/

## Notes

**Current Version:** 1.0.0
**Expo SDK:** 54
**React Native:** 0.81.5
**Last Updated:** November 2024

**Package ID:** `zikogames.tlettinsekonda`
**EAS Project ID:** `8faa6f22-fab4-4464-9abc-35e355033780`
