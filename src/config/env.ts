import dotenv from "dotenv";
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

export const BACKEND_PORT = process.env.BACKEND_PORT
export const CURRENT_URL = `${process.env.URL_DEV}:${BACKEND_PORT}`

export const FRONTEND_URL = isProduction
  ? process.env.FRONTEND_URL_PROD
  : `${process.env.URL_DEV}:${process.env.FRONTEND_PORT}`;
