import React, { useState, useEffect } from 'react';
import { encrypt, decrypt } from 'fguard';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [keyValue, setKeyValue] = useState('');
  const [result, setResult] = useState('');

  const handleEncrypt = () => {
    if (message && keyValue) {
      setResult(encrypt(message, keyValue));
      setMessage('')
    }
  };

  useEffect(() => {
    setMessage('');
    setKeyValue('');
  }, []);

  const handleDecrypt = () => {
    if (message && keyValue) {
      try {
        setResult(decrypt(message, keyValue));
        setMessage('');
      } catch (error) {
        console.error('Decryption error:', error);
        setResult(''); // Clear the result
        alert('Decryption failed. Please check your key and try again.');
      }
    }
  };


  const copyToClipboard = (text) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => alert('Copied to clipboard'))
        .catch(error => console.error('Error copying to clipboard:', error));
    } else {
      // Fallback for mobile devices
      prompt('Copy the text below:', text);
    }
  };

  return (
    <div className="App">
      <h1>FGuard</h1>
      <div className="input-container">
        <label htmlFor="message">Message:</label>
        <input type="text" id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <div className="input-container">
        <label htmlFor="key">Key:</label>
        <input type="password" id="key" value={keyValue} onChange={(e) => setKeyValue(e.target.value)} />
      </div>
      <div className="button-container">
        <button onClick={handleEncrypt}>Encrypt</button>
        <button onClick={handleDecrypt}>Decrypt</button>
      </div>
     {result&&<div className="message-box">
        <div className="result">{result}</div>
        <button onClick={() => copyToClipboard(result)}>Copy</button>
      </div>}
    </div>
  );
}

export default App;
