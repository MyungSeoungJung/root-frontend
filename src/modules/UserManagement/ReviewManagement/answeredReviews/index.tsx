import React, { useEffect, useState } from "react";
import { Review } from "../types";
import {
  clickableCellStyle,
  hoverCellStyle,
  tableCellStyle,
} from "../reviewStyle";

interface HoveredCell {
  rowIndex: number;
  cellType: "content" | "answer";
}

interface AnsweredReviewProps {
  reviews: Review[];
  hovered: HoveredCell;
}

export const AnsweredReviews: React.FC<AnsweredReviewProps> = ({ reviews }) => {
  useEffect(() => {});

  const [hovered, setHovered] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentReview, setCurrentReview] = useState<Review | null>(null);

  const handleReviewClick = (ReviewContent: Review) => {
    setCurrentReview(ReviewContent);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentReview(null);
  };

  const renderReviewContentPreview = (ReviewContent: string) => {
    const previewLength = 5;
    return ReviewContent.length > previewLength
      ? ReviewContent.substring(0, previewLength) + "..."
      : ReviewContent;
  };

  const renderReviewAnswerPreview = (ReviewAnswer: string) => {
    const previewLength = 5;
    return ReviewAnswer.length > previewLength
      ? ReviewAnswer.substring(0, previewLength) + "..."
      : ReviewAnswer;
  };
  return (
    <div>
      <h2>Answered Reviews</h2>
      {reviews.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th style={tableCellStyle}>ID</th>
              <th style={tableCellStyle}>Brand Name</th>
              <th style={tableCellStyle}>Gender</th>
              <th style={tableCellStyle}>Age</th>
              <th style={tableCellStyle}>Product ID</th>
              <th style={tableCellStyle}>Review Content</th>
              <th style={tableCellStyle}>Review Answer</th>
              <th style={tableCellStyle}>Scope</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={review.id}>
                <td style={tableCellStyle}>{review.id}</td>
                <td style={tableCellStyle}>{review.brandName}</td>
                <td style={tableCellStyle}>{review.gender}</td>
                <td style={tableCellStyle}>{review.age}</td>
                <td style={tableCellStyle}>{review.productId}</td>
                <td
                  style={
                    hovered?.rowIndex === index &&
                    hovered?.cellType === "content"
                      ? hoverCellStyle
                      : clickableCellStyle
                  }
                  onMouseEnter={() =>
                    setHovered({ rowIndex: index, cellType: "content" })
                  }
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleReviewClick(review)}
                >
                  <span onClick={() => handleReviewClick(review)}>
                    {renderReviewContentPreview(review.reviewContent)}
                  </span>
                </td>
                <td
                  style={
                    hovered?.rowIndex === index &&
                    hovered?.cellType === "answer"
                      ? hoverCellStyle
                      : clickableCellStyle
                  }
                  onMouseEnter={() =>
                    setHovered({ rowIndex: index, cellType: "answer" })
                  }
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleReviewClick(review)}
                >
                  <span onClick={() => handleReviewClick(review)}>
                    {renderReviewAnswerPreview(review.reviewAnswer)}
                  </span>
                </td>
                <td style={tableCellStyle}>{review.scope}</td>
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
