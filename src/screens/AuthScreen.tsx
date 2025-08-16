import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, NativeEventSubscription } from 'react-native';
import { AuthButton } from '../components/AuthButton';
import { useAuth } from '../hooks/use-auth';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Layout } from '../constants/layout';
import { useNavigation } from '@react-navigation/native';

export const AuthScreen: React.FC = () => {
  const { authenticate, isLoading, biometricName, resetApp } = useAuth();
  const { navigate } = useNavigation()

  const auth = async () => {
    await authenticate().then(() => {
      navigate('Home' as never)
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Use {biometricName} to access your secure app
          </Text>
        </View>

        <View style={styles.iconContainer}>
          <Text style={styles.icon}>👋</Text>
        </View>

        <View style={styles.buttonContainer}>
          <AuthButton
            title={`Unlock with ${biometricName}`}
            onPress={auth}
            isLoading={isLoading}
          />

          <AuthButton
            title="Reset App"
            onPress={resetApp}
            variant="secondary"
            disabled={isLoading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: Layout.spacing.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Layout.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  icon: {
    fontSize: 80,
  },
  buttonContainer: {
    gap: Layout.spacing.md,
  },
});