import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useAuth } from '../hooks/use-auth';
import { AuthButton } from '../components/AuthButton';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Layout } from '../constants/layout';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen: React.FC = () => {
  const { resetApp, biometricName } = useAuth();
  const { navigate } = useNavigation()

  const lockApp = () => {
    navigate('Auth' as never);
  }

  const reset = () => {
    resetApp();
    navigate('Setup' as never);
  }

  const features = [
    { title: 'Secure Storage', description: 'Your data is encrypted and stored locally' },
    { title: 'Biometric Auth', description: `Protected with ${biometricName}` },
    { title: 'Privacy First', description: 'No data leaves your device' },
    { title: 'Fast Access', description: 'Quick authentication every time' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>🎉 Welcome!</Text>
            <Text style={styles.subtitle}>You're successfully authenticated</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>App Features</Text>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            ))}
          </View>

          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>100%</Text>
              <Text style={styles.statLabel}>Secure</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>Local</Text>
              <Text style={styles.statLabel}>Storage</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>Fast</Text>
              <Text style={styles.statLabel}>Access</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <AuthButton
              title="Lock App"
              onPress={lockApp}
              variant="secondary"
            />
            <AuthButton
              title="Reset App"
              onPress={reset}
              variant="danger"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Layout.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.lg,
    marginBottom: Layout.spacing.xl,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.md,
  },
  featureItem: {
    marginBottom: Layout.spacing.md,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.xs,
  },
  featureDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.surface,
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.lg,
    marginBottom: Layout.spacing.xl,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Layout.spacing.xs,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  buttonContainer: {
    gap: Layout.spacing.md,
  },
});