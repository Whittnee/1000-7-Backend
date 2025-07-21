import { Router } from "express";
import { cartController } from "../controllers/cartController";

export const userRouter = Router();
userRouter.get('/:userId', cartController.getCart)
// @ts-ignore
userRouter.post('/', cartController.postItem)
userRouter.patch('/', cartController.patchItem)
userRouter.delete('/', cartController.deleteItem)
userRouter.delete('/:userId', cartController.clearCart)