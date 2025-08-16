import * as LocalAuthentication from 'expo-local-authentication';
import { AuthConfig, AuthResult } from '../types/auth';

export class AuthService {
  static async isDeviceSupported(): Promise<boolean> {
    return await LocalAuthentication.hasHardwareAsync(); // verifica se o leitor de biometria ou reconhecimento facial está presente no dispositivo.
  }

  static async isBiometricEnrolled(): Promise<boolean> {
    return await LocalAuthentication.isEnrolledAsync(); // verifica se o dispositivo tem salvo biometria ou dados faciais.
  }

  static async getAvailableAuthenticationTypes(): Promise<LocalAuthentication.AuthenticationType[]> {
    return await LocalAuthentication.supportedAuthenticationTypesAsync(); // verifica os tipos de autenticação biométrica suportados pelo dispositivo.
  }

  static async authenticate(config: AuthConfig = { promptMessage: 'Authenticate' }): Promise<AuthResult> {
    try {
      const isSupported = await this.isDeviceSupported();
      if (!isSupported) {
        return {
          success: false,
          error: 'Device does not support biometric authentication'
        };
      }

      const isEnrolled = await this.isBiometricEnrolled();
      if (!isEnrolled) {
        return {
          success: false,
          error: 'No biometric authentication methods are enrolled on this device'
        };
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: config.promptMessage,
        cancelLabel: config.cancelLabel,
        fallbackLabel: config.fallbackLabel,
        disableDeviceFallback: config.disableDeviceFallback || false,
      });

      if (result.success) {
        return { success: true };
      } else {
        return {
          success: false,
          error: result.error || 'Authentication failed',
          warning: result.warning
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown authentication error'
      };
    }
  }

  static async getBiometricName(): Promise<string> {
    const types = await this.getAvailableAuthenticationTypes();

    console.log('types -> ', types);

    if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
      return 'Face ID';
    } else if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
      return 'Touch ID';
    } else if (types.includes(LocalAuthentication.AuthenticationType.IRIS)) {
      return 'Iris';
    } else {
      return 'Biometric';
    }
  }
}