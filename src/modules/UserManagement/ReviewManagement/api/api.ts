import { getCookie } from "../../utils/cookie";

export const submitReviewAnswer = async (reviewId: any, answer: string) => {
  const response = await fetch(
    `http://192.168.100.152:5500/review/${reviewId}/answer`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      body: JSON.stringify({ reviewAnswer: answer }),
    }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return await response.json();
};
