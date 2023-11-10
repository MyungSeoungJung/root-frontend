import React from "react";
import { Review } from "../types";

interface AnsweredReviewProps {
  answeredReviews: Review[]; // Review 타입은 이전 코드에 정의된 리뷰 객체
}

export const AnsweredReviews: React.FC<AnsweredReviewProps> = ({
  answeredReviews,
}) => {
  return (
    <div>
      <h2>Answered Reviews</h2>
      {answeredReviews.length > 0 ? (
        <ul>
          {answeredReviews.map((review) => (
            <li key={review.id}>
              <p>{review.content}</p>
              {/* 필요한 경우 여기에 추가 정보 표시 */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No answered reviews yet.</p>
      )}
    </div>
  );
};
