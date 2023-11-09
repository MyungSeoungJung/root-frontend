import React, { useState, useEffect } from "react";
import { useFetchReviews } from "../useFetchReviews";
import { StyledTable } from "../reviewStyle";

const AnsweredReviews: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { reviews, loading, error, totalPages } = useFetchReviews(
    "brandName",
    "token",
    true,
    true,
    currentPage
  );

  const [answeredReviews, setAnsweredReviews] = useState([]);

  useEffect(() => {
    if (Array.isArray(reviews)) {
      const filteredReviews = reviews.filter((review) => review.isAnswered);
      setAnsweredReviews(filteredReviews);
    }
  }, [reviews]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Answered Reviews</h2>
      <StyledTable>
        <thead>
          <tr>
            <th>Review</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          {answeredReviews.length === 0 ? (
            <tr>
              <td colSpan={2}>No answered reviews available.</td>
            </tr>
          ) : (
            answeredReviews.map((review, index) => (
              <tr key={index}>
                <td>{review.content}</td>
                <td>{review.answer}</td>{" "}
              </tr>
            ))
          )}
        </tbody>
      </StyledTable>
      <button
        disabled={currentPage === 0}
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        Previous
      </button>
      <button
        disabled={currentPage + 1 >= totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default AnsweredReviews;
