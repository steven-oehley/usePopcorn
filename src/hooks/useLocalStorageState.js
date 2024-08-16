import { useState, useEffect } from "react";

export function useLocalStorageState(initialValue, key) {
  const [storageValue, setStorageValue] = useState(() => {
    const storedMovies = localStorage.getItem("watchedMovies");
    return storedMovies ? JSON.parse(storedMovies) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storageValue));
  }, [storageValue, key]);

  return [storageValue, setStorageValue];
}
