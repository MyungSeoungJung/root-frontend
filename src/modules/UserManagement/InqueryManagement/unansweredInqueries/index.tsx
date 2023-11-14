import React, { useState } from "react";
import { ProductInquery } from "../types";
import {
  tableCellStyle,
  modalContentStyle,
  hoverCellStyle,
  clickableCellStyle,
  answerButtonStyle,
  modalOverlayStyle,
  answerModalStyle,
  inqueryContentModalStyle,
  answerInputStyle,
  answerButtonGroupStyle,
} from "../styles";

interface UnansweredInqueriesProps {
  inqueries: ProductInquery[];
  onInqueryAnswerSubmit: (inqueryId: number, answer: string) => void;
}

export const UnansweredInqueries: React.FC<UnansweredInqueriesProps> = ({
  inqueries,
  onInqueryAnswerSubmit,
}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [answer, setAnswer] = useState<string>("");
  const [selectedInqueryId, setSelectedInqueryId] = useState<number | null>(
    null
  );
  const [showInqueryContentModal, setShowInqueryContentModal] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [currentInquery, setCurrentInquery] = useState<ProductInquery | null>(
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
      setShowInqueryContentModal(false);
      setShowAnswerModal(false);
    }
  };

  const handleInqueryClick = (inqueryContent: ProductInquery) => {
    setCurrentInquery(inqueryContent);
    setShowInqueryContentModal(true);
  };

  const handleCloseModal = () => {
    setShowAnswerModal(false);
    setShowInqueryContentModal(false);
    setCurrentInquery(null);
  };

  const handleAnswerButtonClick = (inquery: ProductInquery) => {
    setSelectedInqueryId(inquery.id);
    setCurrentInquery(inquery);
    setShowAnswerModal(true);
  };

  const renderInqueryContentPreview = (inqueryContent: string) => {
    const previewLength = 4;
    return inqueryContent.length > previewLength
      ? inqueryContent.substring(0, previewLength) + "..."
      : inqueryContent;
  };

  return (
    <div>
      <h2>답변예정 문의들</h2>
      {showAnswerModal && (
        <div style={modalOverlayStyle} onClick={handleCloseModal}></div>
      )}
      {showAnswerModal && (
        <div style={answerModalStyle}>
          <h2>답변을 입력하세요</h2>
          <textarea
            style={answerInputStyle}
            value={answer}
            onChange={handleAnswerChange}
          ></textarea>
          <div style={answerButtonGroupStyle}>
            <button onClick={handleAnswerSubmit}>답변 등록</button>
            <button onClick={handleCloseModal}>닫기</button>
          </div>
        </div>
      )}
      {showInqueryContentModal && (
        <div style={modalOverlayStyle} onClick={handleCloseModal}></div>
      )}
      {showInqueryContentModal ? (
        <div style={inqueryContentModalStyle}>
          <div style={modalContentStyle}>
            <h3> ▼ 문의내용 전체보기</h3>
            <p>{currentInquery?.inqueryContent}</p>
            <button onClick={handleCloseModal}>닫기</button>
          </div>
        </div>
      ) : null}
      <table>
        <thead>
          <tr>
            <th style={tableCellStyle}>ID</th>
            <th style={tableCellStyle}>고객이름</th>
            <th style={tableCellStyle}>제품ID</th>
            <th style={tableCellStyle}>제품명</th>
            <th style={tableCellStyle}>문의 카테고리</th>
            <th style={tableCellStyle}>문의 내용</th>
            <th style={tableCellStyle}>문의 접수일자</th>
            <th style={tableCellStyle}>답변</th>
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
                <span onClick={() => handleInqueryClick(inquery)}>
                  {renderInqueryContentPreview(inquery.inqueryContent)}
                </span>
              </td>
              <td style={tableCellStyle}>{inquery.inqueryDate}</td>
              <td style={tableCellStyle}>
                <span onClick={() => handleInqueryClick(inquery)}></span>
                <button
                  onClick={() => handleAnswerButtonClick(inquery)}
                  style={answerButtonStyle}
                >
                  답변
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UnansweredInqueries;
