import { useState } from "react";

type Review = {
  productId: number;
  author: string;
  content: string;
};

const dummyReviews: Review[] = [
  { productId: 1, author: "Alice", content: "Great product!" },
  { productId: 2, author: "Bob", content: "I liked it." },
  { productId: 3, author: "Charlie", content: "Not bad." },
];

function ReviewManagement() {
  return (
    <div>
      <h1>리뷰 관리</h1>
      <table
        style={{ borderCollapse: "collapse", width: "100%", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              제품번호
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              작성자
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              리뷰내용
            </th>
          </tr>
        </thead>
        <tbody>
          {dummyReviews.map((review, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {review.productId}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {review.author}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {review.content}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReviewManagement;
