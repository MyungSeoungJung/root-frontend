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
  const [currentPage, setCurrentPage] = useState(0);
  const { reviews, loading, error, totalPages } = useFetchReviews(
    "brandName",
    "token",
    shouldFetch,
    currentPage
  );
  const [sortKey, setSortKey] = useState("id");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading reviews!</p>;

  const sortedReviews = Array.isArray(reviews)
    ? [...reviews].sort((a, b) => {
        if (sortKey === "id") {
          return b[sortKey] - a[sortKey]; // ID 기준 내림차순 정렬
        }
        if (a[sortKey] < b[sortKey]) return -1;
        if (a[sortKey] > b[sortKey]) return 1;
        return 0;
      })
    : [];

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
            <th onClick={() => handleSort("scope")}>Scope</th>
            <th onClick={() => handleSort("userId")}>user Id</th>
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
              <td>{review.scope}</td>
              <td>{review.userId}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <div>
        {[...Array(totalPages)].map((_, index) => (
          <button key={index} onClick={() => setCurrentPage(index)}>
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default ReviewsTable;
