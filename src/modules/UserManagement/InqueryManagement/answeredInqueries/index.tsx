import React, { useState } from "react";
import { ProductInquery } from "../types";
import {
  clickableCellStyle,
  hoverCellStyle,
  modalContainerStyle,
  modalOverlayStyle,
  tableCellStyle,
  tableHeaderStyle,
  tableStyle,
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
  const [showContentModal, setShowContentModal] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [currentInquery, setCurrentInquery] = useState<ProductInquery | null>(
    null
  );

  const handleContentClick = (inqueryContent: ProductInquery) => {
    setCurrentInquery(inqueryContent);
    setShowContentModal(true);
    setShowAnswerModal(false);
  };

  const handleAnswerClick = (inquery: ProductInquery) => {
    setCurrentInquery(inquery);
    setShowAnswerModal(true);
    setShowContentModal(false);
  };

  const handleCloseModal = () => {
    setShowContentModal(false);
    setShowAnswerModal(false);
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

  return (
    <div>
      <h2>답변완료 문의들</h2>
      <table style={tableStyle}>
        <thead>
          <tr style={tableHeaderStyle}>
            <th style={tableCellStyle}>ID</th>
            <th style={tableCellStyle}>고객이름</th>
            <th style={tableCellStyle}>제품ID</th>
            <th style={tableCellStyle}>제품명</th>
            <th style={tableCellStyle}>문의 카테고리</th>
            <th style={tableCellStyle}>문의 내용</th>
            <th style={tableCellStyle}>문의 답변내용</th>
            <th style={tableCellStyle}>문의 접수일자</th>
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
                onClick={() => handleContentClick(inquery)}
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
                onClick={() => handleAnswerClick(inquery)}
              >
                <span onClick={() => handleAnswerClick(inquery)}>
                  {renderInqueryAnswerPreview(inquery.inqueryAnswer)}
                </span>
              </td>
              <td style={tableCellStyle}>{inquery.inqueryDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showContentModal && currentInquery && (
        <div style={modalOverlayStyle}>
          <div style={modalContainerStyle}>
            <h3>문의 전체 내용▼</h3>
            <p>{currentInquery.inqueryContent}</p>
            <button onClick={handleCloseModal}>닫기</button>
          </div>
        </div>
      )}
      {showAnswerModal && currentInquery && (
        <div style={modalOverlayStyle}>
          <div style={modalContainerStyle}>
            <h3>문의 답변 내용▼</h3>
            <p>{currentInquery.inqueryAnswer}</p>
            <button onClick={handleCloseModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnsweredInqueries;
