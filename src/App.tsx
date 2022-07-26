import React from 'react';
import { createGlobalStyle } from 'styled-components';
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
      <Input />
      <footer>
        &bull; <a href="https://github.com/d-tsuji/csv-to-go">View on GitHub</a><br></br>
        &copy; 2022 Tsuji Daishiro<br></br>
      </footer>
    </>
  );
}

export default App;

const GlobalStyles = createGlobalStyle`
  body {
    font: 14px/1.25em sans-serif;
  }

  header {
    text-align:center;
  }

  h1 {
    font: inherit;
    font-size: 34px;
    font-weight: bold;
    line-height: 1.5em;
  }
  
  h2 {
    font: inherit;
    font-size: 24px;
    line-height: 1.3em;
  }

  footer {
    color: #888;
    text-align: right;
    padding: 25px 25px 50px;
    line-height: 2em;
  }
`;
