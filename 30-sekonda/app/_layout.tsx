import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "../src/styles/theme";

export default function RootLayout() {
  return (
    <SafeAreaProvider style={{ backgroundColor: colors.background.primary }}>
      {/* Light icons on the dark background, on every screen. */}
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          // Paint screens dark during transitions so nothing flashes white.
          contentStyle: { backgroundColor: colors.background.primary },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="setup" />
        {/* No swipe-to-go-back mid-game: leaving goes through a confirmation. */}
        <Stack.Screen name="game" options={{ gestureEnabled: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
