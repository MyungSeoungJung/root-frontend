import { ReactNode } from "react";

export interface ProductInquery {
  [x: string]: ReactNode;
  id: number;
  receivedId: number;
  username: string;
  productId: number;
  userLoginId: string;
  productName: string;
  inqueryCategory: string;
  inqueryContent: string;
  inqueryAnswer: string | null;
  inqueryDate: string;
}
