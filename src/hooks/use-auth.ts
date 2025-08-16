import { useEffect, useState } from 'react';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { AuthenticationStatus } from '../types/auth';

export const useAuth = () => {
  const [authStatus, setAuthStatus] = useState<AuthenticationStatus>('checking');
  const [biometricName, setBiometricName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const isSetupComplete = await StorageService.isAuthSetupComplete();

      if (!isSetupComplete) {
        return;
      }

      const biometricType = await AuthService.getBiometricName();
      setBiometricName(biometricType);
    } catch (error) {
      console.error('Error checking auth status:', error);
      setAuthStatus('setup');
    }
  };

  const authenticate = async () => {
    setIsLoading(true);
    try {
      await AuthService.authenticate({
        promptMessage: `Authenticate with ${biometricName}`,
        cancelLabel: 'Cancel',
        fallbackLabel: 'Use Passcode'
      });
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setupAuthentication = async () => {
    setIsLoading(true);
    try {
      const isSupported = await AuthService.isDeviceSupported();
      const isEnrolled = await AuthService.isBiometricEnrolled();

      if (isSupported && isEnrolled) {
        await StorageService.setAuthSetupComplete(true);
      } else {
        throw new Error('Biometric authentication not available');
      }
    } catch (error) {
      console.error('Setup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetApp = async () => {
    await StorageService.clearAll();
  };

  return {
    authStatus,
    biometricName,
    isLoading,
    authenticate,
    setupAuthentication,
    resetApp
  };
};