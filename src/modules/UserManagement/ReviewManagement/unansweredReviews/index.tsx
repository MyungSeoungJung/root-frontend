import React, { useState, useEffect } from "react";
import { Review } from "../types"; // Review 타입 정의 가져오기
import ReviewItem from "../reviewItem";

interface UnansweredReviewsProps {
  reviews: Review[];
  onAnswerSubmit: (reviewId: any, answer: string) => void;
}

export const UnansweredReviews: React.FC<UnansweredReviewsProps> = ({
  reviews,
  onAnswerSubmit,
}) => {
  console.log("UnansweredReviews props:", reviews);
  return (
    <div>
      <h2>답변 등록대기중인 리뷰들</h2>
      {reviews.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>ID</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Brand Name
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Gender
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>Age</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Product ID
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Review Content
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Scope
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id}>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {review.id}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {review.brandName}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {review.gender}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {review.age}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {review.productId}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {review.reviewContent}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {review.scope}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  <ReviewItem
                    review={review}
                    onAnswerSubmit={onAnswerSubmit}
                    reviewAnswered={!!review.reviewAnswer}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No unanswered reviews yet.</p>
      )}
    </div>
  );
};

export default UnansweredReviews;
