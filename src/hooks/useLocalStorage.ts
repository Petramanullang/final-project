// useLocalStorage.ts

import { useState, useEffect, Dispatch, SetStateAction } from "react";

const useLocalStorage = <T>(
  key: string,
  initialValue: T | (() => T)
): [T, Dispatch<SetStateAction<T>>] => {
  const initial =
    typeof initialValue === "function"
      ? (initialValue as () => T)()
      : initialValue;

  const [storedValue, setStoredValue] = useState<T>(initial);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);

      if (item !== null) {
        // Cek apakah nilai dapat di-parse sebagai JSON
        const parsedItem = JSON.parse(item);
        setStoredValue(parsedItem);
      }
    } catch (error) {
      console.error("Error retrieving from localStorage:", error);
    }
  }, [key]);

  const updateValue: Dispatch<SetStateAction<T>> = (
    newValue: SetStateAction<T>
  ) => {
    setStoredValue((prevValue) => {
      const valueToStore =
        newValue instanceof Function ? newValue(prevValue) : newValue;
      try {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error("Error storing in localStorage:", error);
      }
      return valueToStore;
    });
  };

  return [storedValue, updateValue];
};

export default useLocalStorage;
