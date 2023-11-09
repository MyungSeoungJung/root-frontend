import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { Review } from "../types";
import { getCookie } from "../../utils/cookie";

interface ReviewContextProps {
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  answeredReviews: Review[];
  setAnsweredReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  brandName: string | null;
  setBrandName: React.Dispatch<React.SetStateAction<string | null>>;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}

const ReviewContext = createContext<ReviewContextProps | undefined>(undefined);

export const useReviewContext = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error("useReviews must be used within a ReviewProvider");
  }
  return context;
};

interface ReviewProviderProps {
  children: ReactNode;
}

const token = getCookie("token");

export const ReviewProvider: React.FC<ReviewProviderProps> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [answeredReviews, setAnsweredReviews] = useState<Review[]>([]);
  const [brandName, setBrandName] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchBrandName = async () => {
      try {
        const response = await fetch(
          "http://192.168.100.152:5500/user/brandName/review",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setBrandName(data.brandName);
        setReviews(data.content);
        console.log("Reviews data:", data);
        console.log(data.brandName);
        console.log(token);
      } catch (error) {
        console.error("Failed to fetch brand name:", error.message);
      }
    };

    fetchBrandName();
  }, []);

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        setReviews,
        answeredReviews,
        setAnsweredReviews,
        brandName,
        setBrandName,
        totalPages,
        setTotalPages,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
