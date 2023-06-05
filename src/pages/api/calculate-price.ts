import { NextApiRequest, NextApiResponse } from "next";
import { calculatePrice, PRICES } from "@/calculatePrice";

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
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { prompt, maxOutputLength, model }: CalculatePriceRequest = req.body;

  if (!prompt || typeof maxOutputLength !== "number" || !model) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const totalPrice = calculatePrice(prompt, maxOutputLength, model);
    console.log("Total Price:", totalPrice, typeof totalPrice);

    if (typeof totalPrice !== "number") {
      throw new Error("Invalid price calculation");
    }

    const price = totalPrice.toFixed(4);

    const response: CalculatePriceResponse = {
      price,
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
