import React, { useState, useEffect, useContext } from "react";
import { useFetchReviews } from "../useFetchReviews";
import styled from "styled-components";
import { Review } from "../types";
import { getCookie } from "../../utils/cookie";
import { AnswerButton, StyledTable } from "../reviewStyle";
import { useNavigate } from "react-router-dom";
import { useReviewContext } from "../reviewContext";

type ReviewAnswerModalProps = {
  review: Review;
  onSubmit: (reviewAnswer: string, reviewId: string | number) => void;
  onClose: () => void;
};

const ReviewAnswerModal: React.FC<ReviewAnswerModalProps> = ({
  review,
  onSubmit,
  onClose,
}) => {
  const [reviewAnswer, setReviewAnswer] = useState("");

  const handleSubmit = () => {
    console.log(
      "Submitting review answer:",
      reviewAnswer,
      "for review ID:",
      review.id
    );
    onSubmit(reviewAnswer, review.id);
    onClose(); // 제출 후 모달 닫기
  };

  return (
    <div className="modal">
      <h2>리뷰 답변</h2>
      <p>{review.reviewContent}</p>
      <textarea
        value={reviewAnswer}
        onChange={(e) => setReviewAnswer(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={review.reviewAnswer !== null && review.reviewAnswer !== ""}
      >
        답변 제출
      </button>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

const UnansweredReviewTable: React.FC = () => {
  const navigate = useNavigate();

  const [shouldFetch, setShouldFetch] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortKey, setSortKey] = useState<keyof Review>("id");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const { brandName } = useReviewContext();

  const token = getCookie("token");
  const { reviews, loading, error, totalPages } = useFetchReviews(
    brandName,
    token,
    shouldFetch,
    false,
    currentPage
  );

  useEffect(() => {
    if (totalPages === 0) {
      console.log("No pages available to display.");
    }
  }, [totalPages]);

  const sortedReviews = React.useMemo(() => {
    if (!Array.isArray(reviews)) {
      return [];
    }
    return [...reviews].sort((a, b) => {
      // Assuming `sortKey` is always a string property of Review
      const aValue = String(a[sortKey]).toLowerCase();
      const bValue = String(b[sortKey]).toLowerCase();
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    });
  }, [reviews, sortKey]);

  const handleSort = (key: keyof Review) => {
    setSortKey(key);
  };

  // 리뷰 답변 모달을 여는 함수
  const openModal = (review: Review) => {
    setSelectedReview(review);
  };

  // 서버에 리뷰 답변을 제출하는 함수
  const handleAnswerSubmit = async (reviewAnswer: string, reviewId: number) => {
    try {
      const payload = {
        reviewAnswer: reviewAnswer,
      };

      // 리뷰 답변을 서버에 POST 요청으로 보내기
      const response = await fetch(
        `http://192.168.100.152:5500/reviews/${reviewId}/answer`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        // 답변 완료된 리뷰 페이지로 이동
        navigate("/answered");
      }
      // 서버의 응답 처리
      const data = await response.json();
      console.log("Submitted answer:", data);
    } catch (error) {
      console.error("Failed to submit answer:", error);
    }
  };

  const handleAnswerClick = (review: Review) => () => {
    openModal(review);
  };

  if (loading) {
    console.log("Loading reviews..."); // 로딩 중 확인
    return <p>Loading...</p>;
  }
  if (error) {
    console.error("Error loading reviews:", error); // 에러 발생 시 로그
    return <p>Error loading reviews!</p>;
  }

  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand Name</th>
            <th>Product Number</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Content</th>
            <th>Scope</th>
            <th>User ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedReviews.map((review) => (
            <tr key={review.id}>
              <td>{review.id}</td>
              <td>{review.brandName}</td>
              <td>{review.productId}</td>
              <td>{review.age}</td>
              <td>{review.gender}</td>
              <td>{review.reviewContent}</td>
              <td>{review.scope}</td>
              <td>{review.userId}</td>
              <td>
                <AnswerButton
                  disabled={review.reviewAnswer !== null}
                  onClick={handleAnswerClick(review)}
                >
                  답변하기
                </AnswerButton>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <div>
        {[...Array(totalPages)].map((_, index) => (
          <button key={index} onClick={() => setCurrentPage(index)}>
            {index + 1}
          </button>
        ))}
      </div>
      {selectedReview && (
        <ReviewAnswerModal
          review={selectedReview}
          onSubmit={handleAnswerSubmit}
          onClose={() => setSelectedReview(null)}
        />
      )}
    </>
  );
};

export default UnansweredReviewTable;
