import { QueryResult } from "pg";
import pool from "../db/db";
import { TProduct, TProductDB } from "../types/product";
import { snakeToCamelDeep } from "../utils/utils";

export const productModel = {
  getProducts: async function (): Promise<TProduct[]> {
    const result: QueryResult<TProductDB> = await pool.query(
      "SELECT * FROM products"
    );
    const products: TProduct[] = result.rows.map((product) => ({
      ...product,
      discountedPrice: product.discounted_price,
      isNew: product.is_new,
    }));
    return products;
  },
  getProductById: async function (id: number): Promise<TProduct | null> {
    const product: QueryResult<TProductDB> = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );
    const row = product.rows[0];
    if (!row) return null;
    return snakeToCamelDeep(row);
  },
};
