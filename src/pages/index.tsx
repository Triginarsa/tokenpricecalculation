import { useState, ChangeEvent } from "react";
import axios from "axios";
import { PRICES, ModelNotFoundError } from "@/calculatePrice";

interface SelectOption {
  value: string;
  label: string;
}

interface CalculatePriceResponse {
  price?: string;
  error?: {
    code: number;
    message: string;
  };
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [maxOutputLength, setMaxOutputLength] = useState(0);
  const [model, setModel] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePromptChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  };

  const handleMaxOutputLengthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMaxOutputLength(parseInt(event.target.value, 10));
  };

  const handleModelChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setModel(event.target.value);
  };

  const handleCalculatePrice = async () => {
    try {
      const response = await axios.post<CalculatePriceResponse>("/api/calculate-price", {
        prompt,
        maxOutputLength,
        model,
      });
  
      if (response.data.error) {
        setErrorMessage(response.data.error.message);
        setTotalPrice("");
      } else {
        setTotalPrice(response.data.price || "");
        setErrorMessage("");
      }
    } catch (error) {
      setErrorMessage("Error calculating price. Please try again."); // or use error.message to display the specific error
      console.error(error);
    }
  };
  

  const modelOptions: SelectOption[] = Object.keys(PRICES).map((modelName) => ({
    value: modelName,
    label: modelName,
  }));

  return (
    <div>
      <label htmlFor="prompt">Enter the prompt:</label>
      <textarea id="prompt" value={prompt} onChange={handlePromptChange} rows={4} cols={50} />

      <label htmlFor="maxOutputLength">Enter the maximum output length:</label>
      <input
        type="number"
        id="maxOutputLength"
        value={maxOutputLength}
        onChange={handleMaxOutputLengthChange}
      />

      <label htmlFor="model">Select the model:</label>
      <select id="model" value={model} onChange={handleModelChange}>
        <option value="">-- Select a model --</option>
        {modelOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button onClick={handleCalculatePrice}>Calculate Price</button>

      {totalPrice && <p>Total Price: {totalPrice}</p>}
      {errorMessage && <p>Error: {errorMessage}</p>}
    </div>
  );
}
