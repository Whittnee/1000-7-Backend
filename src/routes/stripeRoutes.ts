import { Router } from "express";
import { stripeCheckout } from "../controllers/stripeController";

export const stripeRouter = Router();

stripeRouter.post('/', stripeCheckout)
