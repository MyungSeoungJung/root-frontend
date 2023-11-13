import React, { useState } from "react";
import { ProductInquery } from "../types";
import {
  clickableCellStyle,
  hoverCellStyle,
  modalContentStyle,
  modalStyle,
  tableCellStyle,
} from "../styles";

interface AnsweredInqueriesProps {
  inqueries: ProductInquery[];
}

export const AnsweredInqueries: React.FC<AnsweredInqueriesProps> = ({
  inqueries,
}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentInquery, setCurrentInquery] = useState<ProductInquery | null>(
    null
  );

  const handleInqueryClick = (inqueryContent: ProductInquery) => {
    setCurrentInquery(inqueryContent);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentInquery(null);
  };

  const renderInqueryContentPreview = (inqueryContent: string) => {
    const previewLength = 5;
    return inqueryContent.length > previewLength
      ? inqueryContent.substring(0, previewLength) + "..."
      : inqueryContent;
  };

  if (inqueries.length === 0) {
    return <p>No answered inqueries yet.</p>;
  }

  return (
    <div>
      <h2>Answered Inqueries</h2>
      <table>
        <thead>
          <tr>
            <th style={tableCellStyle}>ID</th>
            <th style={tableCellStyle}>Username</th>
            <th style={tableCellStyle}>Product ID</th>
            <th style={tableCellStyle}>Product name</th>
            <th style={tableCellStyle}>Inquiry Category</th>
            <th style={tableCellStyle}>Inquiry Content</th>
            <th style={tableCellStyle}>Inquiry Date</th>
            <th style={tableCellStyle}>inqueryAnswer</th>
          </tr>
        </thead>
        <tbody>
          {inqueries.map((inquery, index) => (
            <tr key={inquery.id}>
              <td style={tableCellStyle}>{inquery.id}</td>
              <td style={tableCellStyle}>{inquery.username}</td>
              <td style={tableCellStyle}>{inquery.productId}</td>
              <td style={tableCellStyle}>{inquery.productName}</td>
              <td style={tableCellStyle}>{inquery.inqueryCategory}</td>
              <td
                style={hovered === index ? hoverCellStyle : clickableCellStyle}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleInqueryClick(inquery)}
              >
                {renderInqueryContentPreview(inquery.inqueryContent)}
              </td>
              <td style={tableCellStyle}>{inquery.inqueryDate}</td>
              <td style={tableCellStyle}>{inquery.inqueryAnswer}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && currentInquery && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3>문의 전체 내용</h3>
            <p>{currentInquery.inqueryContent}</p>
            <button onClick={handleCloseModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnsweredInqueries;
