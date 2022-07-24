import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Header } from './Header';
import { Input } from './Input';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <header>
        <div>
          <h1>CSV-to-Go</h1>
          <h2>Convert CSV to Go struct</h2>
        </div>
      </header>
      <Header />
      <Input />
    </>
  );
}

export default App;

const GlobalStyles = createGlobalStyle`
  body {
    font: 14px/1.25em sans-serif;
  }

  header {
    padding-left: 1.5em;
  }

  h1 {
    font-size: 34px;
    font-weight: bold;
    line-height: 1.5em;
    display: flex;
  }
  
  h2 {
    font-size: 24px;
    line-height: 1.3em;
    display: flex;
  }
`;
