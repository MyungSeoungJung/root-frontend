import React, { useState, useEffect, useContext } from "react";
import { Review } from "./types";
import { getCookie } from "../utils/cookie";
import { AnsweredReviews } from "./answeredReviews";
import { UnansweredReviews } from "./unansweredReviews";

const ReviewsContainer = () => {
  const token = getCookie("token");

  const [answeredReviews, setAnsweredReviews] = useState<Review[]>([]);
  const [fetchedReviews, setFetchedReviews] = useState<Review[]>([]); // fetchedReviews 상태 추가
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 오류 상태 추가
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState<number>(0); // 전체 페이지 수
  const [pageSize, setPageSize] = useState<number>(5); // 페이지당 리뷰 수
  const [showAnswered, setShowAnswered] = useState(false);

  const renderPageButtons = () => {
    return Array.from({ length: totalPages }, (_, index) => index + 1).map(
      (pageNumber) => (
        <button
          key={pageNumber}
          disabled={currentPage === pageNumber}
          onClick={() => setCurrentPage(pageNumber)}
        >
          {pageNumber}
        </button>
      )
    );
  };

  useEffect(() => {
    const endpoint = showAnswered ? "answered" : "unanswered";
    console.log("Show Answered:", showAnswered);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://192.168.100.152:5500/reviews/${endpoint}?page=${
            currentPage - 1
          }&size=${pageSize}`,
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
        console.log("Received data:", data);

        if (showAnswered) {
          setAnsweredReviews(data.content); // 답변된 리뷰를 설정
          console.log("Updated answeredReviews:", data.content);
        } else {
          const unansweredReivews = data.content.filter(
            (review) => !review.reviewAnswer
          );
          setFetchedReviews(unansweredReivews); // 답변되지 않은 리뷰를 설정
          console.log("Updated fetchedReviews:", unansweredReivews);
        }

        setTotalPages(data.totalPages);
        console.log("Updated totalPages:", data.totalPages);
        setLoading(false);
      } catch (error) {
        setError(error); // 오류 발생 시 오류 상태 변경
        setLoading(false); // 데이터 로딩 실패 시 로딩 상태 변경
      }
    };

    fetchData();
  }, [showAnswered, currentPage, pageSize, token]);

  const handleAnswerSubmit = async (reviewId: any, reviewAnswer: string) => {
    try {
      const response = await fetch(
        `http://192.168.100.152:5500/reviews/${reviewId}/answer`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reviewId, reviewAnswer }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit the answer");
      }

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
  const toggleShowAnswered = () => setShowAnswered(!showAnswered);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading reviews!</p>;

  return (
    <div>
      <button onClick={toggleShowAnswered}>
        {showAnswered ? "미답변 리뷰 보기" : "답변된 리뷰 보기"}
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading reviews!</p>
      ) : showAnswered ? (
        <AnsweredReviews reviews={answeredReviews} hovered={undefined} />
      ) : (
        <UnansweredReviews
          reviews={fetchedReviews}
          onAnswerSubmit={handleAnswerSubmit}
        />
      )}
      <div>{renderPageButtons()}</div>
    </div>
  );
};

export default ReviewsContainer;
