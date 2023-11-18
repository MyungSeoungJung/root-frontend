import React, { useState, useEffect, CSSProperties } from "react";
import { Review } from "../types";
import {
  Backdrop,
  StyledTable,
  clickableCellStyle,
  dropdownStyle,
  hoverCellStyle,
  modalBoxStyle,
  modalContentStyle,
  modalStyle,
} from "../reviewStyle";
import StarRating from "../starRating";

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
  const [currentTime, setCurrentTime] = useState<string>("");
  const [date, setDate] = useState({
    year: new Date().getFullYear().toString(),
    month: (new Date().getMonth() + 1).toString().padStart(2, "0"), // 0을 추가하여 2자리 수를 만듭니다.
    day: new Date().getDate().toString().padStart(2, "0"), // 0을 추가하여 2자리 수를 만듭니다.
  });

  useEffect(() => {
    setCurrentTime(`${date.year}-${date.month}-${date.day}`);
  }, [date]);

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

  const buttonContainerStyle: CSSProperties = {
    marginTop: "auto",
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "20px",
  };

  const renderYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
    return years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ));
  };

  const renderMonthOptions = () => {
    return Array.from({ length: 12 }, (_, i) =>
      (i + 1).toString().padStart(2, "0")
    ).map((month) => (
      <option key={month} value={month}>
        {month}
      </option>
    ));
  };

  const renderDayOptions = () => {
    return Array.from({ length: 31 }, (_, i) =>
      (i + 1).toString().padStart(2, "0")
    ).map((day) => (
      <option key={day} value={day}>
        {day}
      </option>
    ));
  };

  console.log("UnansweredReviews props:", reviews);
  return (
    <div>
      <h2>답변 등록대기중인 리뷰들</h2>
      <StyledTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>브랜드명</th>
            <th>성별</th>
            <th>나이</th>
            <th>제품ID</th>
            <th>리뷰내용</th>
            <th>별점</th>
            <th>답변</th>
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
                style={hovered === index ? hoverCellStyle : clickableCellStyle}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleReviewClick(review)}
              >
                <span onClick={() => handleReviewClick(review)}>
                  {renderReviewContentPreview(review.reviewContent)}
                </span>
              </td>
              <td>
                <StarRating scope={review.scope} />
              </td>

              <td>
                <span onClick={() => handleReviewClick(review)}></span>
                <button onClick={() => setSelectedReviewId(review.id)}>
                  답변
                </button>
              </td>
              <td>{review.currentTime}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      {selectedReviewId && (
        <div style={Backdrop}>
          <div style={modalBoxStyle}>
            <h3>리뷰 답변하기</h3>
            <textarea
              style={{
                width: "100%",
                minHeight: "100px",
                marginBottom: "10px",
              }}
              value={answer}
              placeholder="답변을 입력하세요."
              onChange={handleAnswerChange}
            />
            <div>
              <select
                style={dropdownStyle}
                value={date.year}
                onChange={(e) => setDate({ ...date, year: e.target.value })}
              >
                {renderYearOptions()}
              </select>
              <select
                style={dropdownStyle}
                value={date.month}
                onChange={(e) => setDate({ ...date, month: e.target.value })}
              >
                {renderMonthOptions()}
              </select>
              <select
                style={dropdownStyle}
                value={date.day}
                onChange={(e) => setDate({ ...date, day: e.target.value })}
              >
                {renderDayOptions()}
              </select>
            </div>
            <div style={buttonContainerStyle}>
              <button onClick={handleAnswerSubmit}>답변 등록</button>
              <button onClick={() => setSelectedReviewId(null)}>닫기</button>
            </div>
          </div>
        </div>
      )}
      {showModal && currentReview && (
        <div style={Backdrop}>
          <div style={modalStyle}>
            <div style={modalContentStyle}>
              <h3> ▼ 전체 리뷰내용</h3>
              <p>{currentReview.reviewContent}</p>
              <div style={buttonContainerStyle}>
                <button onClick={handleCloseModal}>닫기</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnansweredReviews;
