export interface Price {
    prompt: number;
    completion: number;
  }
  
  export const PRICES: Record<string, Price> = {
    // OpenAI models' pricing per 1K tokens
    Ada: { prompt: 0.0004, completion: 0.0004 },
    Babbage: { prompt: 0.0005, completion: 0.0005 },
    Curie: { prompt: 0.0020, completion: 0.0020 },
    "Da Vinci": { prompt: 0.0200, completion: 0.0200 },
    "gpt-3.5-turbo": { prompt: 0.002, completion: 0.002 },
    "gpt-4": { prompt: 0.03, completion: 0.06 },
    "gpt-4-0314": { prompt: 0.03, completion: 0.06 },
    "gpt-4-32k": { prompt: 0.06, completion: 0.12 },
    "gpt-4-32k-0314": { prompt: 0.06, completion: 0.12 },
    // VertexAI models' pricing per 1K tokens
    "text-bison@001": { prompt: 0.0010, completion: 0.0010 },
    "chat-bison@001": { prompt: 0.0005, completion: 0.0005 },
  };
  
  export function calculatePrice(prompt: string, maxOutputLength: number, model: string): number {
    if (!(model in PRICES)) {
      throw new Error(`Unknown model ${model}. Available models: ${Object.keys(PRICES).join(", ")}`);
    }
  
    const { prompt: promptPrice, completion: completionPrice } = PRICES[model];
  
    const promptTokens = prompt.length / 4; // Assuming English and 4 bytes/character
    const maxOutputTokens = maxOutputLength;
  
    const promptPriceTotal = (promptPrice * promptTokens) / 1000;
    const completionPriceTotal = (completionPrice * maxOutputTokens) / 1000;
  
    const totalPrice = promptPriceTotal + completionPriceTotal;
  
    return parseFloat(totalPrice.toFixed(4));
  }
  