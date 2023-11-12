import React from "react";
import { ProductInquery } from "../types";

interface AnsweredInqueriesProps {
  inqueries: ProductInquery[];
}

export const AnsweredInqueries: React.FC<AnsweredInqueriesProps> = ({
  inqueries,
}) => {
  if (inqueries.length === 0) {
    return <p>No answered inqueries yet.</p>;
  }

  return (
    <div>
      <h2>Answered Inqueries</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Product ID</th>
            <th>Product name</th>
            <th>Inquiry Category</th>
            <th>Inquiry Content</th>
            <th>Inquiry Date</th>
            <th>inqueryAnswer</th>
          </tr>
        </thead>
        <tbody>
          {inqueries.map((inquery) => (
            <tr key={inquery.id}>
              <td>{inquery.id}</td>
              <td>{inquery.username}</td>
              <td>{inquery.productId}</td>
              <td>{inquery.productName}</td>
              <td>{inquery.inqueryCategory}</td>
              <td>{inquery.inqueryContent}</td>
              <td>{inquery.inqueryDate}</td>
              <td>{inquery.inqueryAnswer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnsweredInqueries;
