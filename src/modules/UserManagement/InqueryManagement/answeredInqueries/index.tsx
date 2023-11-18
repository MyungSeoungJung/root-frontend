import React, { useState } from "react";
import { ProductInquery } from "../types";
import {
  StyledTable,
  clickableCellStyle,
  hoverCellStyle,
  modalContainerStyle,
  modalOverlayStyle,
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
      <StyledTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>고객이름</th>
            <th>제품ID</th>
            <th>제품명</th>
            <th>문의 카테고리</th>
            <th>문의 내용</th>
            <th>문의 답변내용</th>
            <th>문의 접수일자</th>
          </tr>
        </thead>
        <tbody>
          {inqueries.map((inquery, index) => (
            <tr key={inquery.id}>
              <td>{inquery.id}</td>
              <td>{inquery.username}</td>
              <td>{inquery.productId}</td>
              <td>{inquery.productName}</td>
              <td>{inquery.inqueryCategory}</td>
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
              <td>{inquery.inqueryDate}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
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
