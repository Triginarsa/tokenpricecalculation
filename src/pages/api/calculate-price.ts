import { NextApiRequest, NextApiResponse } from "next";
import { calculatePrice, validateModel, ModelNotFoundError } from "@/calculatePrice";

interface CalculatePriceRequest {
  prompt: string;
  maxOutputLength: number;
  model: string;
}

interface CalculatePriceResponse {
  price: string;
  error?: {
    code: number;
    message: string;
  };
}

export default function calculatePriceHandler(req: NextApiRequest, res: NextApiResponse<CalculatePriceResponse>) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: { code: 405, message: "Method Not Allowed" }, price: "" });
  }

  const { prompt, maxOutputLength, model }: CalculatePriceRequest = req.body;

  if (!prompt || typeof maxOutputLength !== "number" || !model) {
    return res.status(400).json({ error: { code: 400, message: "Invalid input" }, price: "" });
  }

  try {
    validateModel(model);

    const totalPrice = calculatePrice(prompt, maxOutputLength, model);

    const response: CalculatePriceResponse = {
      price: totalPrice.toFixed(4),
    };

    return res.status(200).json(response);
  } catch (error: any) {
    if (error instanceof ModelNotFoundError) {
      return res.status(400).json({ error: { code: 400, message: error.message }, price: "" });
    } else {
      return res.status(500).json({ error: { code: 500, message: "An unexpected error occurred" }, price: "" });
    }
  }
}
