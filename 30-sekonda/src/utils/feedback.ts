import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

/**
 * Tactile feedback for game moments. Haptics are a nicety, never a
 * requirement: on web, or on a device without a vibration motor, every call
 * is a silent no-op rather than an error.
 */
const safely = (fn: () => Promise<void>) => {
  if (Platform.OS === 'web') return;
  fn().catch(() => {});
};

export const feedback = {
  /** A word was ticked or unticked. */
  tap: () => safely(() => Haptics.selectionAsync()),
  /** Final five seconds: one short tick per second. */
  countdownTick: () => safely(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)),
  /** All five words guessed. */
  success: () => safely(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)),
  /** The clock ran out. */
  timeUp: () => safely(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)),
  /** A button that moves the game on (Start, Pass to…). */
  press: () => safely(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)),
};
