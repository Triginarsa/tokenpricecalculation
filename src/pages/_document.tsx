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
        <meta property="og:url" content="https://metatags.io/" />
        <meta property="og:title" content="Token Price calculation" />
        <meta property="og:description" content="An calculator allows you to calculate the price of token usage based on a given prompt, maximum output length, and model. It utilizes the OpenAI API and VertexAI to perform the calculations." />
        <meta property="og:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta property="twitter:title" content="Token Price calculation" />
        <meta property="twitter:description" content="Calculator allows you to calculate the price of token usage based on a given prompt, maximum output length, and model. It utilizes the OpenAI API and VertexAI to perform the calculations." />
        <meta property="twitter:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png" />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
