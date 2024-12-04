export class StorageAdapter {
  static async getItem(key: string): Promise<string | null> {
    try {
      return await localStorage.getItem(key);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async setItem(key: string, value: string): Promise<boolean> {
    try {
      await localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  static async removeItem(key: string): Promise<boolean> {
    try {
      await localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
