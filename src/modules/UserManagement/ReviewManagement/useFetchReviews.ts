import { useState, useEffect } from "react";
import { Review } from "./types";
import { getCookie } from "../utils/cookie";

export const useFetchReviews = (
  brandName: string,
  token: string,
  shouldFetch: boolean,
  page: number = 0,
  size: number = 10
) => {
  const [reviews, setReviews] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shouldFetch) return;

    const fetchReviews = async () => {
      try {
        const token = getCookie("token");

        const response = await fetch(
          `http://192.168.100.152:5500/reviews/get?page=${page}&size=${size}`,
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
        console.log("Received review data:", data);

        if (Array.isArray(data.content)) {
          setReviews(data.content);
        } else {
          throw new Error("Invalid reviews data format received from server");
        }

        if (typeof data.totalPages === "number") {
          setTotalPages(data.totalPages);
        } else {
          throw new Error("Invalid totalPages data received from server");
        }
      } catch (err) {
        setError(err);
      } finally {
        console.log("Review fetching process finished.");
        setLoading(false);
      }
    };

    fetchReviews();
  }, [token, shouldFetch, page, size]);

  return { reviews, loading, error, totalPages };
};
