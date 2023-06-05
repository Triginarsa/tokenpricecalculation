# Token Price Calculation Web App

This is a web application built with Next.js and TypeScript that allows you to calculate the price of token usage based on a given prompt, maximum output length, and model. It utilizes the OpenAI API to perform the calculations.

## Features

- Input a prompt, maximum output length, and model name.
- Calculate the price of token usage based on the provided input.
- API endpoint for external usage.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

2. Navigate to the project directory:

   ```bash
   cd your-repo
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your browser and visit [http://localhost:3000](http://localhost:3000) to access the web app.

3. Enter the prompt, maximum output length, and model name in the provided fields.

4. Click the "Calculate Price" button to calculate the price of token usage.

## API Endpoint

The web app also exposes an API endpoint for calculating the price programmatically.

- **Endpoint**: `/api/calculate-price`
- **Method**: POST
- **Request Payload**:

  ```json
  {
    "prompt": "Enter the prompt",
    "maxOutputLength": 100,
    "model": "gpt-4"
  }
  ```

- **Response**:

  ```json
  {
    "price": 0.1234
  }
  ```

## License

This project is licensed under the [MIT License](LICENSE).