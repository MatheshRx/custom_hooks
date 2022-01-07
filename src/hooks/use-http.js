import { useCallback, useState } from "react";

const useHttp = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendRequest = useCallback(async (req, applyFn) => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(req.url, {
        method: req.method ? req.method : "GET",
        headers: req.headers ? req.headers : {},
        body: req.body ? JSON.stringify(req.body) : null,
      });

      if (!response.ok) {
        throw new Error("Something Went Wrong ..!");
      }

      const data = await response.json();

      applyFn(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, []);

  return { error, loading, sendRequest };
};

export default useHttp;
