import React, { useState } from "react";
import { ProductInquery } from "../types";

interface UnansweredInqueriesProps {
  inqueries: ProductInquery[];
  onInqueryAnswerSubmit: (inqueryId: number, answer: string) => void;
}

export const UnansweredInqueries: React.FC<UnansweredInqueriesProps> = ({
  inqueries,
  onInqueryAnswerSubmit,
}) => {
  const [answer, setAnswer] = useState<string>("");
  const [selectedInqueryId, setSelectedInqueryId] = useState<number | null>(
    null
  );

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAnswer(event.target.value);
  };

  const handleAnswerSubmit = () => {
    if (selectedInqueryId !== null) {
      onInqueryAnswerSubmit(selectedInqueryId, answer);
      setAnswer("");
      setSelectedInqueryId(null);
    }
  };

  return (
    <div>
      <h2>Unanswered Inqueries</h2>
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
            <th>Actions</th>
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
              <td>
                <button onClick={() => setSelectedInqueryId(inquery.id)}>
                  Answer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedInqueryId && (
        <div>
          <h3>Answer Inquiry</h3>
          <textarea value={answer} onChange={handleAnswerChange}></textarea>
          <button onClick={handleAnswerSubmit}>Submit Answer</button>
        </div>
      )}
    </div>
  );
};

export default UnansweredInqueries;
