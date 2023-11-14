import React, { useState, useEffect } from "react";
import { getCookie } from "../utils/cookie";
import { ProductInquery } from "./types";
import AnsweredInqueries from "./answeredInqueries";
import UnansweredInqueries from "./unansweredInqueries";

const InqueriesContainer: React.FC = () => {
  const token = getCookie("token");

  const [answeredInqueries, setAnsweredInqueries] = useState<ProductInquery[]>(
    []
  );
  const [unansweredInqueries, setUnansweredInqueries] = useState<
    ProductInquery[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [showAnswered, setShowAnswered] = useState<boolean>(false);

  const renderPageButtons = () => {
    return Array.from({ length: totalPages }, (_, index) => index + 1).map(
      (pageNumber) => (
        <button
          key={pageNumber}
          disabled={currentPage === pageNumber}
          onClick={() => setCurrentPage(pageNumber)}
        >
          {pageNumber}
        </button>
      )
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://192.168.100.152:5500/inqueries/${
            showAnswered ? "answered" : "unanswered"
          }?page=${currentPage - 1}&size=${pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (showAnswered) {
          setAnsweredInqueries(data.content);
        } else {
          setUnansweredInqueries(data.content);
        }
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [showAnswered, currentPage, pageSize, token]);

  const handleInqueryAnswerSubmit = async (
    inqueryId: number,
    inqueryAnswer: string
  ) => {
    try {
      const response = await fetch(
        `http://192.168.100.152:5500/inqueries/${inqueryId}/answer`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ inqueryId, inqueryAnswer }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit the answer");
      }

      const updatedInquery = unansweredInqueries.find(
        (inquery) => inquery.id === inqueryId
      );
      if (updatedInquery) {
        setAnsweredInqueries((prev) => [
          ...prev,
          { ...updatedInquery, inqueryAnswer },
        ]);
        setUnansweredInqueries((prev) =>
          prev.filter((inquery) => inquery.id !== inqueryId)
        );
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const toggleShowAnswered = () => setShowAnswered(!showAnswered);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading inqueries!</p>;

  return (
    <div>
      <button onClick={toggleShowAnswered}>
        {showAnswered ? "답변예정 문의들 보기" : "답변완료 문의들 보기"}
      </button>
      {showAnswered ? (
        <AnsweredInqueries inqueries={answeredInqueries} hovered={undefined} />
      ) : (
        <UnansweredInqueries
          inqueries={unansweredInqueries}
          onInqueryAnswerSubmit={handleInqueryAnswerSubmit}
        />
      )}
      <div>{renderPageButtons()}</div>
    </div>
  );
};

export default InqueriesContainer;
