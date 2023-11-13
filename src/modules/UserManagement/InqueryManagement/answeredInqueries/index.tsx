import React, { useState } from "react";
import { ProductInquery } from "../types";
import {
  clickableCellStyle,
  hoverCellStyle,
  modalContentStyle,
  modalStyle,
  tableCellStyle,
} from "../styles";

interface HoveredCell {
  rowIndex: number;
  cellType: "content" | "answer";
}

interface AnsweredInqueriesProps {
  inqueries: ProductInquery[];
  hovered: HoveredCell;
}

export const AnsweredInqueries: React.FC<AnsweredInqueriesProps> = ({
  inqueries,
}) => {
  const [hovered, setHovered] = useState<HoveredCell | null>(null);
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

  const renderInqueryAnswerPreview = (inqueryAnswer: string) => {
    const previewLength = 5;
    return inqueryAnswer.length > previewLength
      ? inqueryAnswer.substring(0, previewLength) + "..."
      : inqueryAnswer;
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
            <th style={tableCellStyle}>inqueryAnswer</th>
            <th style={tableCellStyle}>Inquiry Date</th>
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
                style={
                  hovered?.rowIndex === index && hovered?.cellType === "content"
                    ? hoverCellStyle
                    : clickableCellStyle
                }
                onMouseEnter={() =>
                  setHovered({ rowIndex: index, cellType: "content" })
                }
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleInqueryClick(inquery)}
              >
                {renderInqueryContentPreview(inquery.inqueryContent)}
              </td>
              <td
                style={
                  hovered?.rowIndex === index && hovered?.cellType === "answer"
                    ? hoverCellStyle
                    : clickableCellStyle
                }
                onMouseEnter={() =>
                  setHovered({ rowIndex: index, cellType: "answer" })
                }
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleInqueryClick(inquery)}
              >
                <span onClick={() => handleInqueryClick(inquery)}>
                  {renderInqueryAnswerPreview(inquery.inqueryAnswer)}
                </span>
              </td>
              <td style={tableCellStyle}>{inquery.inqueryDate}</td>
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
