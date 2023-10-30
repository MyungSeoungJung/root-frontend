import React from "react";
import { useReviews } from "./useReviews";

const ReviewsTable = () => {
  const { reviews, loading, error } = useReviews("brandName", "token");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading reviews!</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Brand Name</th>
          <th>Product Number</th>
          <th>Birth Date</th>
          <th>Gender</th>
          <th>Content</th>
        </tr>
      </thead>
      <tbody>
        {reviews.map((review) => (
          <tr key={review.id}>
            <td>{review.id}</td>
            <td>{review.brandName}</td>
            <td>{review.productNumber}</td>
            <td>{review.birthDate}</td>
            <td>{review.gender}</td>
            <td>{review.content}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReviewsTable;
