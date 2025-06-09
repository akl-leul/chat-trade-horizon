
import { useState, useEffect } from 'react';
import { ENV } from '@/config/environment';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  useAppPrefix = true
): [T, (value: T | ((val: T) => T)) => void, () => void] {
  const prefixedKey = useAppPrefix ? `${ENV.storage.user}_${key}` : key;

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(prefixedKey);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${prefixedKey}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(prefixedKey, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${prefixedKey}":`, error);
    }
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(prefixedKey);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${prefixedKey}":`, error);
    }
  };

  return [storedValue, setValue, removeValue];
}
