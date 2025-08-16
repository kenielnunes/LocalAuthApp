import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Layout } from '../constants/layout';

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  title,
  onPress,
  isLoading = false,
  variant = 'primary',
  disabled = false
}) => {
  const buttonStyle = [
    styles.button,
    styles[variant],
    disabled && styles.disabled
  ];

  const textStyle = [
    styles.text,
    variant === 'secondary' ? styles.textSecondary : styles.textPrimary
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {isLoading && (
          <ActivityIndicator
            size="small"
            color={variant === 'secondary' ? Colors.primary : Colors.background}
            style={styles.spinner}
          />
        )}
        <Text style={textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: Layout.borderRadius.lg,
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.lg,
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  danger: {
    backgroundColor: Colors.danger,
  },
  disabled: {
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  textPrimary: {
    color: Colors.background,
  },
  textSecondary: {
    color: Colors.primary,
  },
  spinner: {
    marginRight: Layout.spacing.sm,
  },
});