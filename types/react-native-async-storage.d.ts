declare module '@react-native-async-storage/async-storage' {
  /**
   * Minimal ambient declaration for AsyncStorage to satisfy TypeScript until
   * the actual package is installed. Replace with the official types after
   * running `npm install @react-native-async-storage/async-storage`.
   */
  const AsyncStorage: {
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
    clear(): Promise<void>;
    // add other methods if you use them
  };
  export default AsyncStorage;
}
