import React, { useState } from "react";
import { useFetchReviews } from "../useFetchReviews";
import styled from "styled-components";
import Notifications from "../notifications";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f4f4f4;
  }
`;

const ReviewsTable = () => {
  const [shouldFetch, setShouldFetch] = useState(true);
  const { reviews, loading, error } = useFetchReviews(
    "brandName",
    "token",
    shouldFetch
  );
  const [sortKey, setSortKey] = useState("id");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading reviews!</p>;

  const sortedReviews = [...reviews].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return -1;
    if (a[sortKey] > b[sortKey]) return 1;
    return 0;
  });

  const handleSort = (key) => {
    setSortKey(key);
  };

  return (
    <>
      <Notifications />
      <StyledTable>
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>ID</th>
            <th onClick={() => handleSort("brandName")}>Brand Name</th>
            <th onClick={() => handleSort("productNumber")}>Product Number</th>
            <th onClick={() => handleSort("age")}>Age</th>
            <th onClick={() => handleSort("gender")}>Gender</th>
            <th onClick={() => handleSort("content")}>Content</th>
          </tr>
        </thead>
        <tbody>
          {sortedReviews.map((review) => (
            <tr key={review.id}>
              <td>{review.id}</td>
              <td>{review.brandName}</td>
              <td>{review.productNumber}</td>
              <td>{review.age}</td>
              <td>{review.gender}</td>
              <td>{review.content}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </>
  );
};

export default ReviewsTable;
