import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { productRouter } from "./routes/productRoutes";
import { stripeRouter } from "./routes/stripeRoutes";
import { getLocation } from "./controllers/locationController";
import { CURRENT_URL, BACKEND_PORT } from "./config/env";
import { userRouter } from "./routes/userRoutes";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/images", express.static("public/images"));

app.use('/products', productRouter)

app.use('/cart', userRouter)

app.use('/create-checkout-session', stripeRouter)

app.get("/get-location", getLocation)

app.listen(BACKEND_PORT, () =>
  console.log(`Server is running on ${CURRENT_URL}`)
);