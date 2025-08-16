import * as SecureStore from 'expo-secure-store';

export class StorageService {
  private static readonly KEYS = {
    AUTH_SETUP: 'auth_setup_complete',
    USER_DATA: 'user_data',
  };

  static async setItem(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('Error storing data:', error);
      throw error;
    }
  }

  static async getItem(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  }

  static async removeItem(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Error removing data:', error);
      throw error;
    }
  }

  static async setAuthSetupComplete(isComplete: boolean): Promise<void> {
    await this.setItem(this.KEYS.AUTH_SETUP, isComplete.toString());
  }

  static async isAuthSetupComplete(): Promise<boolean> {
    const value = await this.getItem(this.KEYS.AUTH_SETUP);
    return value === 'true';
  }

  static async setUserData(userData: any): Promise<void> {
    await this.setItem(this.KEYS.USER_DATA, JSON.stringify(userData));
  }

  static async getUserData(): Promise<any> {
    const data = await this.getItem(this.KEYS.USER_DATA);
    return data ? JSON.parse(data) : null;
  }

  static async clearAll(): Promise<void> {
    await this.removeItem(this.KEYS.AUTH_SETUP);
    await this.removeItem(this.KEYS.USER_DATA);
  }
}