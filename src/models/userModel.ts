import { QueryResult } from "pg";
import { TProduct, TProductDB } from "../types/product";
import {} from "../types/user";
import pool from "../db/db";
import {
  calculateTotals,
  createEmptyCart,
  formatPrice,
  snakeToCamelDeep,
} from "../utils/utils";
import { TCart, TCartDB, TCartProduct, TCartProductDB } from "../types/cart";

export const userModel = {
  getCart: async function (userId: string): Promise<TCart> {
    const result: QueryResult<{ cart: TCartDB }> = await pool.query(
      "SELECT cart FROM users WHERE id = $1",
      [userId]
    );
    if (result.rowCount === 0) {
      const emptyCart = createEmptyCart();
      await pool.query(
        `INSERT INTO users (id, cart) VALUES ($1, $2)
        ON CONFLICT (id) DO NOTHING`,
        [userId, emptyCart]
      );
      return snakeToCamelDeep(emptyCart);
    }

    const cart = result.rows[0]?.cart;
    return snakeToCamelDeep(cart);
  },
  postItem: async function (
    userId: number,
    product: TCartProductDB
  ): Promise<void> {
    const result: QueryResult<{ cart: TCartDB }> = await pool.query(
      "SELECT cart FROM users WHERE id = $1",
      [userId]
    );
    if (result.rowCount === 0) {
      throw new Error("User not found");
    }
    const currentCart: TCartDB = result.rows[0]?.cart;

    const newProducts = [...(currentCart?.products || []), product];
    const total_prices = calculateTotals(newProducts);
    const newCart: TCartDB = {
      products: newProducts,
      total_prices: total_prices,
    };
    await pool.query("UPDATE users SET cart = $1 WHERE id = $2", [
      newCart,
      userId,
    ]);
  },
  patchItem: async function (
    userId: string,
    productId: number,
    quantity: number
  ): Promise<void> {
    const result: QueryResult<{ cart: TCartDB }> = await pool.query(
      "SELECT cart FROM users WHERE id = $1",
      [userId]
    );
    if (result.rowCount === 0) {
      throw new Error("User not found");
    }
    const cart = result.rows[0].cart;
    const currentProduct = cart.products.find((p) => p.id === productId);
    if (currentProduct) {
      currentProduct.quantity = Math.max(1, quantity);
      const total_prices = calculateTotals(cart.products);
      await pool.query("UPDATE users SET cart = $1 WHERE id = $2", [
        { products: cart.products, total_prices: total_prices },
        userId,
      ]);
    }
  },
  deleteCartItem: async function (userId: string, productId: number): Promise<void> {
    const result: QueryResult<{ cart: TCartDB }> = await pool.query(
      "SELECT cart FROM users WHERE id = $1",
      [userId]
    );
    if (result.rowCount === 0) {
      throw new Error("User not found");
    }
    const cart = result.rows[0].cart;
    const updatedProducts = cart.products.filter((p) => p.id !== productId);
    const total_prices = calculateTotals(updatedProducts);
    await pool.query("UPDATE users SET cart = $1 WHERE id = $2", [
      { products: updatedProducts, total_prices: total_prices },
      userId,
    ]);
  },
  clearCart: async function (userId: string): Promise<void> {
    const result: QueryResult<{ cart: TCartDB }> = await pool.query(
      "SELECT cart FROM users WHERE id = $1",
      [userId]
    );
    if (result.rowCount === 0) {
      throw new Error("User not found");
    }
    const cart = result.rows[0].cart
    cart.products = [];
    const total_prices = calculateTotals(cart.products)
    await pool.query("UPDATE users SET cart = $1 WHERE id = $2", [
      { products: cart.products, total_prices: total_prices}, userId
    ])
  },
};
