import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      
          <ThemeProvider>
            <HashRouter>
              <App />
            </HashRouter>
          </ThemeProvider>
      
  </React.StrictMode>,
);
