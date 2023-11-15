import React from "react";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  scope: number;
}

const StarRating: React.FC<StarRatingProps> = ({ scope }) => {
  const totalStars = 5;
  return (
    <div>
      {Array.from({ length: totalStars }, (_, index) => (
        <FaStar key={index} color={index < scope ? "#ffc107" : "#e4e5e9"} />
      ))}
    </div>
  );
};

export default StarRating;
