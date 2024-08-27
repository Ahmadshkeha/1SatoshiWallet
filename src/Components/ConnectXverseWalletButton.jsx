import React, { useState, useEffect } from 'react';
import { request, RpcErrorCode, AddressPurpose } from 'sats-connect';
import Wallet from 'sats-connect';

const ConnectXverseWalletButton = () => {
  const [walletAddress, setWalletAddress] = useState(""); // State to store the wallet address
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState(null); // State for error handling
  const [isConnected, setIsConnected] = useState(false); // State to track wallet connection status
  
  const connectWallet = async () => {
    setLoading(true); // Set loading to true when starting connection
    setError(null); // Clear any previous errors

    try {
      const result = await Wallet.request('getAccounts', {
        purposes: [AddressPurpose.Payment],
        message: 'Cool app wants to know your addresses!',
      });

      if (result && result.result && result.result.length > 0) {
        const address = result.result[0].address; // Access the address from the result
        setWalletAddress(address); // Store the address in the state
        console.log("User's Bitcoin Address:", address); // Log the address to the console
        setIsConnected(true); // Set connection status to true
      } else {
        setIsConnected(false); // No address means not connected
      }
    } catch (err) {
      setError('Failed to connect to Xverse Wallet.'); // Handle error
      setIsConnected(false); // Set connection status to false on error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <button 
        onClick={connectWallet}
        disabled={loading}
      >
        {loading ? 'Connecting to Xverse Wallet...' : (walletAddress ? `Connected to Xverse Bitcoin Address: ${walletAddress}` : 'Connect Xverse Wallet')}
      </button>
      {error && <p>{error}</p>} {/* Display error message */}
    </div>
  );
};

export default ConnectXverseWalletButton;
