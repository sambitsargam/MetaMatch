import React, { useState } from 'react';

const Storage = () => {
  const [data, setData] = useState('');
  const [status, setStatus] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [uploadedData, setUploadedData] = useState(null);

  // Available blockchain networks
  const networks = [
    { name: 'Ethereum', value: 'ethereum' },
    { name: 'Binance Smart Chain', value: 'bsc' },
  ];

  // Handle network selection
  const handleNetworkChange = (event) => {
    setSelectedNetwork(event.target.value);
  };

  // Handle data upload simulation
  const handleDataUpload = () => {
    if (!data) {
      setStatus('Please enter some data to upload');
      return;
    }
    if (!selectedNetwork) {
      setStatus('Please select a network');
      return;
    }

    // Simulate data upload and show status
    setUploadedData({ data, network: selectedNetwork });
    setStatus(`Data uploaded successfully to ${selectedNetwork}`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f5f5f5', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Upload Data to Blockchain (Mock with Analog GMP)</h1>

      {/* Data Input */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Enter data to upload"
          style={{
            padding: '10px',
            width: '100%',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginBottom: '20px',
            fontSize: '16px',
          }}
        />
      </div>

      {/* Network Selection Dropdown */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="network" style={{ fontSize: '16px', color: '#333' }}>Select Network to Send Data:</label>
        <select
          id="network"
          value={selectedNetwork}
          onChange={handleNetworkChange}
          style={{
            padding: '10px',
            width: '100%',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
            backgroundColor: '#fff',
          }}
        >
          <option value="">Select Network</option>
          {networks.map((network) => (
            <option key={network.value} value={network.value}>
              {network.name}
            </option>
          ))}
        </select>
      </div>

      {/* Upload Button */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={handleDataUpload}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Upload Data
        </button>
      </div>

      {/* Status Message */}
      {status && (
        <div style={{ marginTop: '20px', fontWeight: 'bold', textAlign: 'center', color: '#333' }}>
          <p>{status}</p>
        </div>
      )}

      {/* Display Uploaded Data */}
      {uploadedData && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h3>Uploaded Data:</h3>
          <p><strong>Data:</strong> {uploadedData.data}</p>
          <p><strong>Network:</strong> {uploadedData.network}</p>
        </div>
      )}
    </div>
  );
};

export default Storage;
