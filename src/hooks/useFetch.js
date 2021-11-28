import { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Reusable useFetch custom hook as described by PedroTech
 * https://www.youtube.com/watch?v=Vspeudp-M9k
 */
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true);
    axios.get(url).then((response) => {
      setData(response.data);
    }).catch((err) => {
      setError(err);
    }).finally(() => {
      setLoading(false);
    })
  }, [url]);

  const refetch = () => {
    setLoading(true);
    axios.get(url).then((response) => {
      setData(response.data);
    }).catch((err) => {
      setError(err);
    }).finally(() => {
      setLoading(false);
    })
  }

  return { data, loading, error, refetch };
}

export default useFetch;