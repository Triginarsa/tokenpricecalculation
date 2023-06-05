import { NextApiRequest, NextApiResponse } from "next";
import { calculatePrice, validateModel } from "@/calculatePrice";

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
    validateModel(model);

    const totalPrice = calculatePrice(prompt, maxOutputLength, model);

    const response: CalculatePriceResponse = {
      price: totalPrice.toFixed(4),
    };

    return res.status(200).json(response);
  } catch (error: any) {
    if (typeof error.message === "string" && error.message.startsWith("Unknown model")) {
      return res.status(400).json({ price: error.message });
    } else {
      return res.status(500).json({ price: `Error: ${error.message}` });
    }
  }
}
