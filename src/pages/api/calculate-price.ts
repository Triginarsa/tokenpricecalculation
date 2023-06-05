import { NextApiRequest, NextApiResponse } from "next";
import { calculatePrice } from "@/calculatePrice";

interface CalculatePriceRequest {
  prompt: string;
  maxOutputLength: number;
  model: string;
}

interface CalculatePriceResponse {
  price: string;
}

export default function calculatePriceHandler(req: NextApiRequest, res: NextApiResponse<CalculatePriceResponse>) {
  if (req.method !== "POST") {
    return res.status(405).json({ price: "Method Not Allowed" });
  }

  const { prompt, maxOutputLength, model }: CalculatePriceRequest = req.body;

  if (!prompt || typeof maxOutputLength !== "number" || !model) {
    return res.status(400).json({ price: "Invalid input" });
  }

  try {
    const totalPrice = calculatePrice(prompt, maxOutputLength, model);

    const response: CalculatePriceResponse = {
      price: totalPrice.toString(),
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ price: "Error: " + (error as Error).message });
  }
}
