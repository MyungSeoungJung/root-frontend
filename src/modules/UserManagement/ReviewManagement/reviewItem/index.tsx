import React, { useState } from "react";
import { Review } from "../types";

interface ReviewItemProps {
  review: Review;
  onAnswerSubmit: (reviewId: string, answer: string) => void;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review, onAnswerSubmit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    onAnswerSubmit(review.id, answer);
    setIsModalOpen(false);
  };

  return (
    <div>
      <p>{review.content}</p>
      <button onClick={() => setIsModalOpen(true)}>Answer</button>

      {/* 답변 모달 */}
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
