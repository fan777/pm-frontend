import { useState, useEffect } from 'react';

// const useLocalStorage = (key, defaultValue = null) => {
//   const stored = localStorage.getItem(key);
//   const initial = stored ? JSON.parse(stored) : defaultValue;
//   const [value, setValue] = useState(initial);

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [key, value]);

//   return [value, setValue];
// };

// export { useLocalStorage };

function useLocalStorage(key, firstValue = null) {
  const initialValue = localStorage.getItem(key) || firstValue;

  const [item, setItem] = useState(initialValue);

  useEffect(function setKeyInLocalStorage() {
    console.debug("hooks useLocalStorage useEffect", "item=", item);

    if (item === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, item);
    }
  }, [key, item]);

  return [item, setItem];
}

export default useLocalStorage;