import { ReactNode } from "react";

export interface Review {
  [x: string]: ReactNode;
  id: any;
  brandName: any;
  productId: any;
  age: any;
  gender: any;
  reviewContent: string;
  scope: any;
  userId: any;
  reviewAnswer?: any;
  isAnswered: boolean;
}
