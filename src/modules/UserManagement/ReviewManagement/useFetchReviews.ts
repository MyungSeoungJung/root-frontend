import { useState, useEffect } from "react";
import { getCookie } from "../utils/cookie";
import { Review } from "./types";

export const useFetchReviews = (
  brandName: string,
  token: string,
  shouldFetch: boolean,
  isAnswered: boolean,
  page: number = 0,
  size: number = 10
) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!shouldFetch) return;

    const fetchReviews = async () => {
      setLoading(true);
      try {
        const token = getCookie("token");
        const endpoint = isAnswered ? "answered" : "unanswered";
        const response = await fetch(
          `http://192.168.100.152:5500/reviews/${endpoint}?page=${page}&size=${size}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        // console.log("Reviews data:", data);

        setReviews(data.reviews);
        setTotalPages(data.totalPages);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [token, shouldFetch, page, size, isAnswered, brandName]);

  useEffect(() => {
    console.log("Loading:", loading);
  }, [loading, error]);

  return { reviews, loading, error, totalPages };
};
