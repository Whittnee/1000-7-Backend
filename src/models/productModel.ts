import { QueryResult } from "pg";
import pool from "../db/db";
import { TProduct, TProductDB } from "../types/product";
import { snakeToCamelDeep } from "../utils/utils";

export const productModel = {
  getProducts: async function (): Promise<TProduct[]> {
    const products: QueryResult<TProductDB> = await pool.query(
      "SELECT * FROM products"
    );
    if (products.rowCount === 0) {
      throw new Error("Products not found");
    }
    const row = products.rows;
    return snakeToCamelDeep(row);
  },
  getProductById: async function (id: number): Promise<TProduct> {
    const product: QueryResult<TProductDB> = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );
    if (product.rowCount === 0) {
      throw new Error("Product not found");
    }
    const row = product.rows[0];

    return snakeToCamelDeep(row);
  },
};
