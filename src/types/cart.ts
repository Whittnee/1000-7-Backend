import { TProduct, TProductDB } from "./product";

export type TCartProduct = TProduct & {
  quantity: number;
  size: string;
  color: string;
};

export type TCartProductDB = TProductDB & {
  quantity: number;
  size: string;
  color: string;
};

export type TCart = {
  products: TCartProduct[];
  totalPrices: {
    subtotal: number;
    total: number;
    discount: number;
    deliveryFee: number;
  };
};

export type TCartDB = {
  products: TCartProductDB[];
  total_prices: {
    subtotal: number;
    total: number;
    discount: number;
    delivery_fee: number;
  };
}