import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { colors, fontSize, borderRadius, spacing } from '../../styles/theme';

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * A two-button confirmation. Used instead of Alert.alert because Alert does
 * nothing on web and cannot be styled to match the game.
 */
export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}) => (
  <Modal transparent visible={visible} animationType="fade" onRequestClose={onCancel}>
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity style={[styles.button, styles.cancel]} onPress={onCancel}>
            <Text style={styles.buttonText}>{cancelLabel}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.confirm]} onPress={onConfirm}>
            <Text style={styles.buttonText}>{confirmLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.background.tertiary,
    padding: spacing.xl,
    width: '100%',
    maxWidth: 380,
  },
  title: {
    color: colors.text.primary,
    fontSize: fontSize.xxl,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  message: {
    color: colors.text.secondary,
    fontSize: fontSize.md,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  buttons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  button: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  cancel: {
    backgroundColor: colors.background.tertiary,
  },
  confirm: {
    backgroundColor: colors.feedback.danger,
  },
  buttonText: {
    color: 'white',
    fontSize: fontSize.lg,
    fontWeight: 'bold',
  },
});
