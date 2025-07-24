import { TProduct } from "./product";

export type TUserDB = {
  id: number;
  cart: {
    products: TProduct[];
    total_prices: {
      subtotal: number;
      total: number;
      discount: number;
      delivery_fee: number;
    };
  };
};


