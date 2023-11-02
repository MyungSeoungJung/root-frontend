import { useEffect } from "react";
import http from "../utils/http";

const PopularProduct = () => {
  useEffect(() => {
    async () => {
      const responce = await http.get("/");
    };
  });
  return (
    <div>
      <h1>wef</h1>
    </div>
  );
};

export default PopularProduct;
