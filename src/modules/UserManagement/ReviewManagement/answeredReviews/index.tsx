import React, { useEffect, useState } from "react";
import { Review } from "../types";
import {
  StyledTable,
  clickableCellStyle,
  hoverCellStyle,
  modalContentStyle,
  modalStyle,
} from "../reviewStyle";
import StarRating from "../starRating";

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
  const [showContentModal, setShowContentModal] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [currentReview, setCurrentReview] = useState<Review | null>(null);

  const handleReviewClick = (ReviewContent: Review) => {
    setCurrentReview(ReviewContent);
    setShowContentModal(true);
    setShowAnswerModal(false);
  };

  const handleAnswerClick = (ReviewContent: Review) => {
    setCurrentReview(ReviewContent);
    setShowAnswerModal(true);
    setShowContentModal(false);
  };

  const handleCloseModal = () => {
    setShowContentModal(false);
    setShowAnswerModal(false);
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
      <h2>답변완료된 리뷰들</h2>
      <StyledTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>브랜드명</th>
            <th>성별</th>
            <th>나이</th>
            <th>제품ID</th>
            <th>리뷰내용</th>
            <th>답변내용</th>
            <th>별점</th>
            <th>리뷰 등록일자</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <tr key={review.id}>
              <td>{review.id}</td>
              <td>{review.brandName}</td>
              <td>{review.gender}</td>
              <td>{review.age}</td>
              <td>{review.productId}</td>
              <td
                style={
                  hovered?.rowIndex === index && hovered?.cellType === "content"
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
                  hovered?.rowIndex === index && hovered?.cellType === "answer"
                    ? hoverCellStyle
                    : clickableCellStyle
                }
                onMouseEnter={() =>
                  setHovered({ rowIndex: index, cellType: "answer" })
                }
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleAnswerClick(review)}
              >
                <span onClick={() => handleAnswerClick(review)}>
                  {renderReviewAnswerPreview(review.reviewAnswer)}
                </span>
              </td>
              <td>
                <StarRating scope={review.scope} />
              </td>
              <td>{review.currentTime}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      {showContentModal && currentReview && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3> ▼ 전체 리뷰내용</h3>
            <p>{currentReview.reviewContent}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
      {showAnswerModal && currentReview && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3> ▼ 전체 답변내용</h3>
            <p>{currentReview.reviewAnswer}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnsweredReviews;
