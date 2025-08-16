export interface BiometricType {
  FINGERPRINT: number;
  FACIAL_RECOGNITION: number;
  IRIS: number;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  warning?: string;
}

export interface AuthConfig {
  promptMessage: string;
  cancelLabel?: string;
  fallbackLabel?: string;
  disableDeviceFallback?: boolean;
}

export type AuthenticationStatus = 'checking' | 'authenticated' | 'unauthenticated' | 'setup';