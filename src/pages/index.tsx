import { useState } from "react";
import axios from "axios";
import { PRICES } from "@/calculatePrice";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [maxOutputLength, setMaxOutputLength] = useState(0);
  const [model, setModel] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  };

  const handleMaxOutputLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxOutputLength(parseInt(event.target.value, 10));
  };

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setModel(event.target.value);
  };

  const handleCalculatePrice = async () => {
    try {
      const response = await axios.post("/api/calculate-price", {
        prompt,
        maxOutputLength,
        model,
      });

      const { price } = response.data;

      setTotalPrice(price);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <label htmlFor="prompt">Enter the prompt:</label>
      <textarea id="prompt" value={prompt} onChange={handlePromptChange} rows={4} cols={50} />

      <label htmlFor="maxOutputLength">Enter the maximum output length in tokens:</label>
      <input
        id="maxOutputLength"
        type="number"
        value={maxOutputLength}
        onChange={handleMaxOutputLengthChange}
      />

      <label htmlFor="model">Enter the model name:</label>
      <select id="model" value={model} onChange={handleModelChange}>
        <option value="">-- Select a model --</option>
        {Object.keys(PRICES).map((modelName) => (
          <option key={modelName} value={modelName}>
            {modelName}
          </option>
        ))}
      </select>

      <button onClick={handleCalculatePrice}>Calculate Price</button>

      <p>Estimated price for your query would be: {totalPrice && `$${totalPrice}`}</p>
    </div>
  );
}
