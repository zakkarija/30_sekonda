# 30 Sekonda - Setup & Deployment Guide

A team-based word guessing game built with React Native and Expo.

## 🛠️ Development Setup

### Prerequisites

**Required Software:**
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Expo CLI** - Install globally: `npm install -g @expo/cli`
- **Git** - For version control

**For Physical Device Testing:**
- **Expo Go app** - Download from App Store (iOS) or Google Play (Android)

**For Emulator Testing:**
- **Android Studio** (for Android emulator) - [Download here](https://developer.android.com/studio)
- **Xcode** (for iOS simulator, macOS only) - Download from Mac App Store

### Installation Commands

```bash
# Clone the repository
git clone <your-repo-url>
cd 30_sekonda/30-sekonda

# Install dependencies
npm install

# Start the development server
npx expo start
# or
npm start
```

## 🚀 Running the App

### Development Mode

```bash
# Start Expo development server
npx expo start

# Platform-specific development
npm run android    # Android emulator
npm run ios        # iOS simulator (macOS only)
npm run web        # Web browser

# Reset project (if needed)
npm run reset-project
```

### Testing the App

```bash
# Lint code
npm run lint

# Type checking (if TypeScript issues arise)
npx tsc --noEmit

# Check Expo configuration
npx expo doctor
```

**Testing on Devices:**
1. Install Expo Go on your phone
2. Scan QR code from `npx expo start`
3. App will load on your device

## 📱 App Store Publishing Requirements

### Apple App Store Requirements

**Apple Developer Account:**
- Apple Developer Program membership ($99/year)
- App Store Connect access

**Required Files & Configuration:**
- [ ] App Store icon (1024x1024px)
- [ ] Privacy Policy URL
- [ ] App Store screenshots (multiple device sizes)
- [ ] App description and metadata
- [ ] Age rating questionnaire completion
- [ ] Export compliance documentation

**Build Commands:**
```bash
# Configure iOS build
npx expo build:ios

# Or with EAS Build (recommended)
npm install -g eas-cli
eas build --platform ios
eas submit --platform ios
```

### Google Play Store Requirements

**Google Play Developer Account:**
- Google Play Console access ($25 one-time fee)

**Required Files & Configuration:**
- [ ] Play Store icon (512x512px)
- [ ] Feature graphic (1024x500px)
- [ ] Privacy Policy URL
- [ ] App screenshots (phone & tablet)
- [ ] App description and metadata
- [ ] Content rating questionnaire completion
- [ ] Target API level compliance (Android 13+)

**Build Commands:**
```bash
# Configure Android build
npx expo build:android

# Or with EAS Build (recommended)
eas build --platform android
eas submit --platform android
```

## 🔧 Current App Architecture

**Technology Stack:**
- **React Native** 0.79.2
- **Expo** ~53.0.9
- **TypeScript** ~5.8.3
- **Expo Router** (file-based navigation)
- **NativeWind** (Tailwind CSS for React Native)

**Current Screens:**
- ✅ Welcome Screen (`/`)
- ✅ Setup Screen (`/setup`)
- ✅ Game Screen (`/game`)

## ⚠️ Missing for Production Release

### Critical Missing Features

**App Configuration:**
- [ ] **App Store Bundle ID** - Need unique identifier (e.g., `com.yourcompany.30sekonda`)
- [ ] **App Version Management** - Semantic versioning strategy
- [ ] **App Icon** - Custom game-themed icon (currently using React logo)
- [ ] **Splash Screen** - Custom branding (currently default)
- [ ] **App Name Finalization** - Trademark check for "30 Sekonda"

**App Store Metadata:**
- [ ] **App Description** - Marketing copy for store listings
- [ ] **Keywords** - SEO optimization for app discovery
- [ ] **Screenshots** - Professional screenshots for all device sizes
- [ ] **App Category** - Games > Word Games
- [ ] **Privacy Policy** - Legal requirement for both stores
- [ ] **Terms of Service** - User agreement

**Technical Requirements:**
- [ ] **Error Boundaries** - Crash prevention and reporting
- [ ] **Analytics Integration** - User behavior tracking (Firebase, Mixpanel)
- [ ] **Crash Reporting** - Sentry, Bugsnag, or Crashlytics
- [ ] **Performance Monitoring** - App performance metrics
- [ ] **Loading States** - Better UX during app initialization
- [ ] **Offline Support** - Basic functionality without internet

### Nice-to-Have Features

**Game Enhancements:**
- [ ] **Sound Effects** - Audio feedback for actions
- [ ] **Background Music** - Optional ambient music
- [ ] **Haptic Feedback** - Vibration for interactions
- [ ] **Game Statistics** - Win/loss tracking
- [ ] **Player Profiles** - Save favorite players/teams
- [ ] **Custom Word Lists** - User-generated content
- [ ] **Difficulty Levels** - Easy/Medium/Hard word sets
- [ ] **Game Themes** - Visual customization options

**Technical Improvements:**
- [ ] **Dark Mode Support** - Full theme switching
- [ ] **Accessibility** - Screen reader support, larger fonts
- [ ] **Internationalization** - Multiple language support
- [ ] **Push Notifications** - Game reminders/updates
- [ ] **Social Sharing** - Share game results
- [ ] **In-App Purchases** - Premium word packs (optional)

## 📋 Pre-Production Checklist

### Development Tasks
- [ ] Test on multiple device sizes (phones, tablets)
- [ ] Test on both iOS and Android platforms
- [ ] Performance testing with large word lists
- [ ] Memory leak testing during long gaming sessions
- [ ] Network error handling
- [ ] Battery usage optimization

### App Store Preparation
- [ ] Create developer accounts (Apple & Google)
- [ ] Design custom app icon and branding
- [ ] Write app store descriptions
- [ ] Create privacy policy and terms of service
- [ ] Take professional screenshots
- [ ] Set up app analytics
- [ ] Configure crash reporting
- [ ] Set up continuous integration/deployment

### Legal & Business
- [ ] Trademark search for app name
- [ ] Copyright considerations for word lists
- [ ] GDPR compliance (if targeting EU users)
- [ ] Content moderation strategy
- [ ] Monetization strategy (ads, premium features, etc.)

## 🚀 Deployment Strategy

### Recommended Approach

1. **Beta Testing Phase**
   - TestFlight (iOS) and Play Console Internal Testing (Android)
   - Gather feedback from 10-20 users
   - Fix critical bugs and UX issues

2. **Soft Launch**
   - Release in select markets first
   - Monitor metrics and user feedback
   - Iterate based on real user data

3. **Global Launch**
   - Full App Store and Play Store release
   - Marketing campaign
   - Monitor and respond to reviews

### Build Configuration

```bash
# Configure for production builds
# Update app.json with production settings:
{
  "expo": {
    "name": "30 Sekonda",
    "slug": "30-sekonda",
    "version": "1.0.0",
    "privacy": "public",
    "platforms": ["ios", "android"],
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "backgroundColor": "#1A1A2E"
    }
  }
}
```

## 📞 Support & Resources

- **Expo Documentation**: https://docs.expo.dev/
- **React Native Documentation**: https://reactnative.dev/
- **App Store Guidelines**: https://developer.apple.com/app-store/guidelines/
- **Google Play Guidelines**: https://play.google.com/about/developer-content-policy/

---

**Current Status**: ✅ MVP Complete | ⚠️ Production Prep Needed | 🚀 Ready for Beta Testing