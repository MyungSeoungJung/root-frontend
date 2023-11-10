import React, { useState, useEffect } from "react";
import { Review } from "../types"; // Review 타입 정의 가져오기
import ReviewItem from "../reviewItem";
import { getCookie } from "../../utils/cookie";

interface UnansweredReviewsProps {
  reviews: Review[];
  onAnswerSubmit: (reviewId: any, answer: string) => void;
}

export const UnansweredReviews: React.FC<UnansweredReviewsProps> = ({
  reviews,
  onAnswerSubmit,
}) => {
  // const token = getCookie("token");

  // const [reviews, setReviews] = useState<Review[]>([]);
  // // 리뷰 데이터를 가져오는 함수
  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://192.168.100.152:5500/reviews/unanswered",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setReviews(data);
  //       console.log(data);
  //     } catch (error) {
  //       console.error("There was a problem with the fetch operation:", error);
  //     }
  //   };

  //   fetchReviews();
  // }, [token]);

  return (
    <div>
      <h2>Unanswered Reviews</h2>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <ReviewItem
              key={review.id}
              review={review}
              onAnswerSubmit={onAnswerSubmit}
            />
          ))}
        </ul>
      ) : (
        <p>No unanswered reviews yet.</p>
      )}
    </div>
  );
};

export default UnansweredReviews;
