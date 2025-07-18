import { Router } from "express";
import { productController } from "../controllers/productController";

export const productRouter = Router();
productRouter.get('/', productController.getAll);
// @ts-ignore
productRouter.get('/:id', productController.getById) 