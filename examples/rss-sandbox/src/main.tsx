import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Assuming your main application component is in App.tsx
import './index.css'; // Optional: Import global styles
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);