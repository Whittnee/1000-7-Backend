import { productModel } from "../models/productModel";
import { Request, Response } from "express";

export const productController = {
  getAll: async function (req: Request, res: Response) {
    try {
      const products = await productModel.getProducts();
      const productList = products.map((product) => ({
        ...product,
        images: null,
        image: product.images[0],
      }));
      res.json(productList);
    } catch (e) {
      console.error("Ошибка при получении товаров:", e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getById: async function (req: Request<{ id: string }>, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Некорректный ID" });
    }
    try {
      const product = await productModel.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: "Товар не найден" });
      }
      res.json(product);
    } catch (e) {
      console.error("Ошибка при получении товара по ID:", e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
