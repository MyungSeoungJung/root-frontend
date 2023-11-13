import React, { useEffect } from "react";
import { Review } from "../types";

interface AnsweredReviewProps {
  reviews: Review[];
}

export const AnsweredReviews: React.FC<AnsweredReviewProps> = ({ reviews }) => {
  console.log("답변된 리뷰:", reviews);
  useEffect(() => {});

  // 리뷰가 비어있지 않은지 다시 확인
  if (reviews.length === 0) {
    console.log("리뷰가 없습니다.");
    return <p>No answered reviews yet.</p>;
  }
  return (
    <div>
      <h2>Answered Reviews</h2>
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
                Review Answer
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Review Content
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Scope
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
                  {review.reviewAnswer}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {review.reviewContent}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {review.scope}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No answered reviews yet.</p>
      )}
    </div>
  );
};

export default AnsweredReviews;
