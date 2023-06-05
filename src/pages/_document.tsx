import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import { getRandomValue } from '../utils/randomValue';

class MyDocument extends Document {
  render() {
    const randomValue = getRandomValue();
    return (
      <Html lang="en" data-theme={randomValue}>
        <Head />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <title>Token Price Calculator</title>
        <meta name="title" content="Token Price calculation" />
        <meta name="description" content="An calculator allows you to calculate the price of token usage based on a given prompt, maximum output length, and model. It utilizes the OpenAI API and VertexAI to perform the calculations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tokencalculation.vercel.app/" />
        <meta property="og:title" content="Token Price calculation" />
        <meta property="og:description" content="An calculator allows you to calculate the price of token usage based on a given prompt, maximum output length, and model. It utilizes the OpenAI API and VertexAI to perform the calculations." />
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://tokencalculation.vercel.app/" />
        <meta property="twitter:title" content="Token Price calculation" />
        <meta property="twitter:description" content="Calculator allows you to calculate the price of token usage based on a given prompt, maximum output length, and model. It utilizes the OpenAI API and VertexAI to perform the calculations." />
        <meta property="twitter:image" content="/thumbnail.png" />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
