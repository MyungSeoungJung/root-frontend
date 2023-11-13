import React, { useState } from "react";
import { ProductInquery } from "../types";
import {
  tableCellStyle,
  modalBoxStyle,
  modalContentStyle,
  modalStyle,
  hoverCellStyle,
  clickableCellStyle,
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
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가
  const [currentInquery, setCurrentInquery] = useState<ProductInquery | null>(
    null
  ); // 현재 선택된 문의 상태 추가

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
      setShowModal(false);
    }
  };

  const handleInqueryClick = (inqueryContent: ProductInquery) => {
    setCurrentInquery(inqueryContent);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentInquery(null);
  };

  const renderInqueryContentPreview = (inqueryContent: string) => {
    const previewLength = 4;
    return inqueryContent.length > previewLength
      ? inqueryContent.substring(0, previewLength) + "..."
      : inqueryContent;
  };

  return (
    <div>
      <h2>Unanswered Inqueries</h2>
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
            <th style={tableCellStyle}>Answer</th>
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
                  onClick={() => setSelectedInqueryId(inquery.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Answer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedInqueryId && (
        <div style={modalBoxStyle}>
          <h3>Answer Inquiry</h3>
          <textarea value={answer} onChange={handleAnswerChange}></textarea>
          <button onClick={handleAnswerSubmit}>Submit Answer</button>
          <button onClick={() => setSelectedInqueryId(null)}>Close</button>
        </div>
      )}
      {showModal && currentInquery && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3> ▼ 전체 문의내용</h3>
            <p>{currentInquery.inqueryContent}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnansweredInqueries;
