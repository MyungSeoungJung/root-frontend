import React, { useState } from "react";
import { Review } from "../types";

interface ReviewItemProps {
  review: Review;
  onAnswerSubmit: (reviewId: string, answer: string) => void;
  reviewAnswered: boolean;
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  review,
  onAnswerSubmit,
  reviewAnswered,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    onAnswerSubmit(review.id, answer);
    setIsModalOpen(false);
  };

  const buttonStyle = {
    backgroundColor: reviewAnswered ? "#cccccc" : "#007bff",
    color: reviewAnswered ? "#666666" : "#ffffff",
    cursor: reviewAnswered ? "not-allowed" : "pointer",
  };

  return (
    <div>
      <p>{review.content}</p>
      <button
        onClick={() => !reviewAnswered && setIsModalOpen(true)}
        disabled={reviewAnswered} // 답변 여부에 따라 버튼 비활성화
        style={{
          backgroundColor: reviewAnswered ? "#cccccc" : "#007bff",
          color: reviewAnswered ? "#666666" : "white",
          cursor: reviewAnswered ? "not-allowed" : "pointer",
        }}
      >
        Answer
      </button>

      {isModalOpen && (
        <div>
          <h2>Answer Review</h2>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          ></textarea>
          <button onClick={handleSubmit}>Submit Answer</button>
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ReviewItem;
