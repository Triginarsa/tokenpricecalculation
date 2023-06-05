import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import { getRandomValue } from '../utils/randomValue';

class MyDocument extends Document {
  render() {
    const randomValue = getRandomValue();
    return (
      <Html lang="en" data-theme={randomValue}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
