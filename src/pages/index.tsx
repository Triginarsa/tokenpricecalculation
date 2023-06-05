import { useState, ChangeEvent } from "react";
import axios from "axios";
import { PRICES, ModelNotFoundError } from "@/calculatePrice";
import Navbar from "@/components/navbar";

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
  const [isLoading, setIsLoading] = useState(false);

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

  const handleReset = () => {
    setPrompt("");
    setMaxOutputLength(0);
    setModel("");
  };

  return (
    <div className="container">
        <div className="z-50 flex h-screen flex-col">
        {/* <Navbar /> */}
          {/* main content */}
          <main className="flex w-full flex-grow">
            <div className="h-100 mx-auto flex max-w-2xl flex-grow flex-col">
              <div className="h-100 flex flex-grow items-center justify-center">
                <div className="mx-auto rounded-xl px-10 py-10">
                  <div className="mockup-window border bg-base-300">
                    <div className="px-4 py-16 bg-base-200 space-y-6">
                      <div>
                        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Token Price Calculator</h1>
                        <p className="leading-7">Calculate token pricing for LLM model (OpenAI & VertexAI)</p>
                        <div className="divider"></div> 
                        </div>
                        <div className="w-full">
                        <label htmlFor="prompt" className="label">
                          <span className="label-text">Enter the prompt:</span>
                        </label>
                          <textarea id="prompt" className="textarea textarea-bordered w-full" value={prompt} onChange={handlePromptChange} rows={4} />
                        </div>
                        <div className="flex flex-col space-y-6 space-x-3 md:flex-row md:space-y-0">
                          <div className="w-full">
                            <label htmlFor="maxOutputLength" className="label">
                              <span className="label-text">Maximum output length:</span>
                            </label>
                            <input
                              type="number"
                              id="maxOutputLength"
                              placeholder="Number of output length"
                              className="input input-bordered w-full max-w-xs"
                              value={maxOutputLength}
                              onChange={handleMaxOutputLengthChange}
                            />
                          </div>
                          <div className="w-full">
                            <label htmlFor="model" className="label">
                              <span className="label-text">Select the model:</span>
                            </label>
                            <select id="model" className="select select-bordered w-full max-w-xs" value={model} onChange={handleModelChange}>
                              <option value="" disabled selected>-- Select a model --</option>
                              {modelOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className=" space-x-3">
                        <button onClick={handleCalculatePrice} disabled={isLoading} className="btn btn-primary btn-wide">
                        {isLoading ? <span className="loading loading-dots loading-sm"></span> : "Calculate Price"}
                          </button>
                          <button className="btn btn-outline btn-error" onClick={handleReset}>Reset</button>
                        </div>
                        {totalPrice &&
                        <div className="alert alert-success">
                          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <span>Estimate Total Price: ${totalPrice}</span>
                        </div>
                        }
                        
                        {errorMessage &&
                          <div className="alert alert-warning">
                          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                          <span>Error: {errorMessage}</span>
                        </div>
                        }
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Curl API</h3>
                    <div className="mockup-code">
                      <pre data-prefix=">"><code>curl -X POST -H "Content-Type: application/json" -d '&#123;</code></pre> 
                      <pre data-prefix=" "><code>"prompt": "Enter the prompt",</code></pre> 
                      <pre data-prefix=" "><code>"maxOutputLength": 100,</code></pre>
                      <pre data-prefix=" "><code>"model": "gpt-4"</code></pre>
                      <pre data-prefix=" "><code>&#125;' https://tokencalculation.vercel.app/api/calculate-price</code></pre>
                      <pre data-prefix=" "><code></code></pre>
                      <pre data-prefix=" " className="bg-warning text-warning-content"><code>&#123;"price":"0.0061"&#125;%</code></pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
  );
}
