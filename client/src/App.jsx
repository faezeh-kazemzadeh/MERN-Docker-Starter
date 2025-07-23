// client/src/App.jsx
import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0);

  // Define the base URL for API calls.
  // With Vite's proxy setup, all API calls will be prefixed with '/api'.
  // Vite will then forward these requests to the backend service within Docker.
  const API_BASE_URL = '/api';

  useEffect(() => {
    // Check if API_BASE_URL is defined before attempting to fetch.
    // This is a safeguard, though with the proxy setup, it should always be '/api'.
    if (API_BASE_URL) {
      // Fetch data from the backend.
      // The request to '/api' will be proxied by Vite to 'http://server:5000/'
      // (as configured in vite.config.js).
      fetch(`${API_BASE_URL}`) // Fetching from '/api' which proxies to backend's root '/'
        .then(res => {
          // Check if the response was successful (status code 2xx).
          if (!res.ok) {
            // If not successful, throw an error with the status.
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          // Parse the response as JSON.
          return res.json();
        })
        .then(data => {
          // Set the message received from the backend.
          setMessage(data.message);
        })
        .catch(err => {
          // Log any errors during the fetch operation.
          console.error("Error fetching from API:", err);
          // Update the message to indicate a failure.
          setMessage(`Failed to connect to backend API: ${err.message}`);
        });
    } else {
      // Fallback message if API_BASE_URL somehow isn't set (shouldn't happen with this setup).
      setMessage("API_BASE_URL is not determined.");
    }
  }, [API_BASE_URL]); // Re-run effect if API_BASE_URL changes (though it's constant here)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
       
        Click on the Vite and React logos to learn more
      </p>
      <h2>Message from Backend:</h2>
      <p>{message}</p>
    </>
  );
}

export default App;