import { Request, Response } from "express";

type TGeoResponse = {
  country: string;
  city: string;
};
export const getLocation = async (req: Request, res: Response) => {
  const ip =
    (typeof req.headers["x-forwarded-for"] === "string"
      ? req.headers["x-forwarded-for"].split(",")[0]
      : undefined) || req.socket.remoteAddress;
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const result: TGeoResponse = await response.json();
    res.json({ country: result.country, city: result.city });
  } catch {
    res.status(500).json({ error: "Error getting location" });
  }
};
