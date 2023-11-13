import React, { useState, useEffect } from "react";
import { Review } from "../types";
import {
  clickableCellStyle,
  hoverCellStyle,
  modalBoxStyle,
  modalContentStyle,
  modalStyle,
  tableCellStyle,
} from "../reviewStyle";

interface UnansweredReviewsProps {
  reviews: Review[];
  onAnswerSubmit: (reviewId: any, answer: string) => void;
}

export const UnansweredReviews: React.FC<UnansweredReviewsProps> = ({
  reviews,
  onAnswerSubmit,
}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [answer, setAnswer] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [currentReview, setCurrentReview] = useState<Review | null>(null);
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAnswer(event.target.value);
  };

  const handleAnswerSubmit = () => {
    if (selectedReviewId !== null) {
      onAnswerSubmit(selectedReviewId, answer);
      setAnswer("");
      setSelectedReviewId(null);
      setShowModal(false);
    }
  };

  const handleReviewClick = (reviewContent: Review) => {
    setCurrentReview(reviewContent);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentReview(null);
  };

  const renderReviewContentPreview = (reviewContent: string) => {
    const previewLength = 4;
    return reviewContent.length > previewLength
      ? reviewContent.substring(0, previewLength) + "..."
      : reviewContent;
  };
  console.log("UnansweredReviews props:", reviews);
  return (
    <div>
      <h2>답변 등록대기중인 리뷰들</h2>
      <table>
        <thead>
          <tr>
            <th style={tableCellStyle}>ID</th>
            <th style={tableCellStyle}>Brand Name</th>
            <th style={tableCellStyle}>Gender</th>
            <th style={tableCellStyle}>Age</th>
            <th style={tableCellStyle}>Product ID</th>
            <th style={tableCellStyle}>Review Content</th>
            <th style={tableCellStyle}>Scope</th>
            <th style={tableCellStyle}>Actions</th>
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
                style={hovered === index ? hoverCellStyle : clickableCellStyle}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleReviewClick(review)}
              >
                <span onClick={() => handleReviewClick(review)}>
                  {renderReviewContentPreview(review.reviewContent)}
                </span>
              </td>
              <td style={tableCellStyle}>{review.scope}</td>
              <td style={tableCellStyle}>
                <span onClick={() => handleReviewClick(review)}></span>
                <button onClick={() => setSelectedReviewId(review.id)}>
                  Answer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedReviewId && (
        <div style={modalBoxStyle}>
          <h3>Answer Review</h3>
          <textarea value={answer} onChange={handleAnswerChange}></textarea>
          <button onClick={handleAnswerSubmit}>Submit Answer</button>
          <button onClick={() => setSelectedReviewId(null)}>Close</button>
        </div>
      )}
      {showModal && currentReview && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3> ▼ 전체 리뷰내용</h3>
            <p>{currentReview.reviewContent}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnansweredReviews;
