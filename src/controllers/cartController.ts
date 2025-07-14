import { userModel } from "../models/userModel";
import { Request, Response } from "express";
import { productModel } from "../models/productModel";
import { TCartProduct } from "../types/cart";
import { camelToSnakeDeep } from "../utils/utils";

export const cartController = {
  getCart: async function (req: Request, res: Response) {
    const userId = req.params.userId;
    try {
      const cart = await userModel.getCart(userId);
      res.json(cart);
    } catch (e) {
      console.error("Ошибка при получении корзины:", e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  postItem: async function (req: Request, res: Response) {
    const { userId, productId, size, color } = req.body;
    try {
      const product = await productModel.getProductById(Number(productId));
      if (!product) return res.status(404).json({ error: "Product not found" });
      const updatedProduct: TCartProduct = {
        ...product,
        size,
        color,
        quantity: 1,
      };
      await userModel.postItem(userId, camelToSnakeDeep(updatedProduct));
      res.status(204).send();
    } catch (e) {
      console.error("Ошибка при добавлении товара в корзину:", e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  patchItem: async function (req: Request, res: Response) {
    const { userId, productId, quantity } = req.body;
    try {
      await userModel.patchItem(userId, Number(productId), quantity);
      res.status(204).send();
    } catch (e) {
      console.error("Ошибка при обновлении корзины", e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  deleteItem: async function (req: Request, res: Response) {
    const { userId, productId } = req.body;
    try {
      await userModel.deleteCartItem(userId, Number(productId));
      res.status(204).send();
    } catch (e) {
      console.error("Ошибка при удалении товара из корзины", e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  clearCart: async function (req: Request, res: Response) {
    const { userId } = req.params;
    try {
      await userModel.clearCart(userId);
      res.status(204).send();
    } catch (e) {
      console.error("Ошибка при очистке корзины", e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
