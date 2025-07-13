import { Response, Request } from "express"
import Stripe from "stripe";
import dotenv from "dotenv";
import { FRONTEND_URL } from "../config/env";
import { TStripeProduct } from "../types/stripe";
dotenv.config();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia",
});

export const stripeCheckout = async (req: Request, res: Response) => {
   try {
    const { items, userId } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: TStripeProduct) => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.name },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${FRONTEND_URL}/?status=success`,
      cancel_url: `${FRONTEND_URL}/cart`,
      metadata: { userId },
    });
    res.json({ url: session.url });
  } catch (e) {
    console.error("Ошибка при создании сессии:", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
}