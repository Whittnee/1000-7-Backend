import { camelCase, snakeCase } from "lodash";
import { TCartDB, TCartProductDB } from "../types/cart";

export const formatPrice = (price: number): number =>
  Math.round(price * 100) / 100;

export function camelToSnakeDeep(obj: any): any {
  if (Array.isArray(obj)) return obj.map(camelToSnakeDeep);
  if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, val]) => [
        snakeCase(key),
        camelToSnakeDeep(val),
      ])
    );
  }
  return obj;
}

export function snakeToCamelDeep(obj: any): any {
  if (Array.isArray(obj)) return obj.map(snakeToCamelDeep);
  if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [camelCase(k), snakeToCamelDeep(v)])
    );
  }
  return obj;
}

export function createEmptyCart(): TCartDB {
  return {
    products: [],
    total_prices: {
      subtotal: 0,
      discount: 0,
      delivery_fee: 0,
      total: 0,
    },
  };
}

export function calculateTotals(
  products: TCartProductDB[]
): TCartDB["total_prices"] {
  const subtotal = formatPrice(
    products.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  const discount = formatPrice(
    products.reduce(
      (sum, item) => sum + (item.price - item.discounted_price) * item.quantity,
      0
    )
  );
  const delivery_fee = formatPrice((subtotal - discount) * 0.1);
  const total = formatPrice(subtotal - discount + delivery_fee);
  return { subtotal, discount, delivery_fee, total };
}
