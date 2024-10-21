import React, { useState } from 'react';
import './App.css';

function App() {
  const [sensorData, setSensorData] = useState([]);
  const [predictedRUL, setPredictedRUL] = useState(null);
  const [rulHistory, setRulHistory] = useState([]);
  const [meanValue, setMeanValue] = useState(null);
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);
  const [medianValue, setMedianValue] = useState(null);
  const threshold = 50; // Example threshold for alerts

  const handleInputChange = (e) => {
    const value = e.target.value.split(',').map(Number); // Convert input to array of numbers
    setSensorData(value);
    calculateStatistics(value);
  };

  const calculateStatistics = (data) => {
    if (data.length === 0) return;
    const mean = data.reduce((a, b) => a + b) / data.length;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const median = [...data].sort((a, b) => a - b)[Math.floor(data.length / 2)];
    setMeanValue(mean);
    setMinValue(min);
    setMaxValue(max);
    setMedianValue(median);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: sensorData }),
    });

    if (response.ok) {
      const data = await response.json();
      setPredictedRUL(data.predicted_rul);
      setRulHistory([...rulHistory, { timestamp: new Date().toLocaleString(), predictedRUL: data.predicted_rul }]);
    } else {
      console.error('Error predicting RUL');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Predictive Maintenance Tool</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Enter Sensor Data (comma-separated):
            <input type="text" onChange={handleInputChange} required />
          </label>
          <button type="submit" className="btn">Predict RUL</button>
        </form>
        
        <div className="summary">
          <h2>Sensor Data Summary</h2>
          {meanValue !== null && <p>Mean: {meanValue.toFixed(2)}</p>}
          {medianValue !== null && <p>Median: {medianValue}</p>}
          {maxValue !== null && <p>Max: {maxValue}</p>}
          {minValue !== null && <p>Min: {minValue}</p>}
        </div>

        {predictedRUL !== null && (
          <div className="card">
            <h2>Predicted Remaining Useful Life:</h2>
            <p>{predictedRUL} cycles</p>
          </div>
        )}

        {predictedRUL < threshold && (
          <div className="alert">Alert: RUL is critically low!</div>
        )}

        <div className="rul-history">
          <h2>Recent RUL Predictions</h2>
          <ul>
            {rulHistory.map((entry, index) => (
              <li key={index}>
                {entry.timestamp}: {entry.predictedRUL} cycles
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
