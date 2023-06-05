export interface Price {
    prompt: number;
    completion: number;
  }
  
  export const PRICES: Record<string, Price> = {
    // OpenAI models' pricing per 1K tokens
    ada: { prompt: 0.0004, completion: 0.0004 },
    babbage: { prompt: 0.0005, completion: 0.0005 },
    curie: { prompt: 0.0020, completion: 0.0020 },
    "da vinci": { prompt: 0.0200, completion: 0.0200 },
    "gpt-3.5-turbo": { prompt: 0.002, completion: 0.002 },
    "gpt-4": { prompt: 0.03, completion: 0.06 },
    "gpt-4-0314": { prompt: 0.03, completion: 0.06 },
    "gpt-4-32k": { prompt: 0.06, completion: 0.12 },
    "gpt-4-32k-0314": { prompt: 0.06, completion: 0.12 },
    // VertexAI models' pricing per 1K tokens
    "text-bison@001": { prompt: 0.0010, completion: 0.0010 },
    "chat-bison@001": { prompt: 0.0005, completion: 0.0005 },
  };
  
  export class ModelNotFoundError extends Error {
    constructor(model: string) {
      super(`Unknown model ${model}. Available models: ${Object.keys(PRICES).join(", ")}`);
      this.name = "ModelNotFoundError";
    }
  }
  
  export function validateModel(model: string): void {
    if (!(model in PRICES)) {
      throw new ModelNotFoundError(model);
    }
  }
  
  export function calculatePrice(prompt: string, maxOutputLength: number, model: string): number {
    // Calculate the price
    validateModel(model);
  
    const { prompt: promptPrice, completion: completionPrice } = PRICES[model];
  
    const promptTokens = prompt.length / 4; // Assuming English and 4 bytes/character
    const maxOutputTokens = maxOutputLength;
  
    const promptPriceTotal = (promptPrice * promptTokens) / 1000;
    const completionPriceTotal = (completionPrice * maxOutputTokens) / 1000;
  
    const totalPrice = promptPriceTotal + completionPriceTotal;
  
    return parseFloat(totalPrice.toFixed(4));
  }
  