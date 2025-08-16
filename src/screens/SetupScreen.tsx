import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useAuth } from '../hooks/use-auth';
import { AuthButton } from '../components/AuthButton';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Layout } from '../constants/layout';
import { useNavigation } from '@react-navigation/native';

export const SetupScreen: React.FC = () => {
  const { setupAuthentication, isLoading, biometricName } = useAuth();
  const { navigate } = useNavigation()

  const handleSetup = async () => {
    try {
      await setupAuthentication();
      navigate('Home' as never)
    } catch (error) {
      Alert.alert(
        'Setup Failed',
        'Unable to setup biometric authentication. Please ensure you have biometric authentication enabled in your device settings.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Setup Authentication</Text>
          <Text style={styles.subtitle}>
            Enable {biometricName || 'biometric'} authentication to secure your app
          </Text>
        </View>

        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🔐</Text>
        </View>

        <View style={styles.features}>
          <Text style={styles.feature}>✓ Quick and secure access</Text>
          <Text style={styles.feature}>✓ Your data stays private</Text>
          <Text style={styles.feature}>✓ No passwords to remember</Text>
        </View>

        <View style={styles.buttonContainer}>
          <AuthButton
            title={`Enable ${biometricName}`}
            onPress={handleSetup}
            isLoading={isLoading}
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
  features: {
    marginBottom: Layout.spacing.xl,
  },
  feature: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: Layout.spacing.sm,
    paddingLeft: Layout.spacing.md,
  },
  buttonContainer: {
    marginTop: Layout.spacing.lg,
  },
});