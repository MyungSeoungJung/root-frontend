import React, { useState, useEffect, useContext } from "react";
import { useFetchReviews } from "./useFetchReviews";
import { Review } from "./types";
import { getCookie } from "../utils/cookie";
import { AnsweredReviews } from "./answeredReviews";
import { ProfileContext } from "../ProfileManagement/ProfileContext";
import { UnansweredReviews } from "./unansweredReviews";

const ReviewsContainer = () => {
  const profileContext = useContext(ProfileContext);
  const brandName = profileContext ? profileContext.brandName : null;
  const token = getCookie("token");

  const [answeredReviews, setAnsweredReviews] = useState<Review[]>([]);
  const [fetchedReviews, setFetchedReviews] = useState<Review[]>([]); // fetchedReviews 상태 추가
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 오류 상태 추가

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://192.168.100.152:5500/reviews/unanswered`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFetchedReviews(data);
        setLoading(false); // 데이터 로딩 완료 시 로딩 상태 변경
      } catch (error) {
        setError(error); // 오류 발생 시 오류 상태 변경
        setLoading(false); // 데이터 로딩 실패 시 로딩 상태 변경
      }
    };

    fetchData();
  }, [token]);

  const handleAnswerSubmit = async (reviewId: any, answer: string) => {
    try {
      const response = await fetch(
        `http://192.168.100.152:5500/reviews/${reviewId}/answer`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reviewId, answer }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit the answer");
      }

      // 답변된 리뷰를 'answeredReviews'에 추가하고, 'fetchedReviews'에서 제거합니다.
      const updatedReview = fetchedReviews.find(
        (review) => review.id === reviewId
      );
      if (updatedReview) {
        setAnsweredReviews((prev) => [...prev, updatedReview]);
        setFetchedReviews((prev) =>
          prev.filter((review) => review.id !== reviewId)
        );
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading reviews!</p>;

  return (
    <div>
      {/* 미답변 리뷰 목록 */}
      <UnansweredReviews
        reviews={fetchedReviews}
        onAnswerSubmit={handleAnswerSubmit}
      />

      {/* 답변 완료된 리뷰 목록 */}
      <AnsweredReviews answeredReviews={answeredReviews} />
    </div>
  );
};

export default ReviewsContainer;
