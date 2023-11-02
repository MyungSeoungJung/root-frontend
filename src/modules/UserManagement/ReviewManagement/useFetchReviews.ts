import { useState, useEffect } from "react";
import { Review } from "./types";
import { getCookie } from "../utils/cookie";

export const useFetchReviews = (
  brandName: string,
  token: string,
  shouldFetch: boolean
) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shouldFetch) return;

    const fetchReviews = async () => {
      try {
        const token = getCookie("token");
        const response = await fetch(
          `http://192.168.100.152:5500/reviews/get`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [token, shouldFetch]);

  return { reviews, loading, error };
};
