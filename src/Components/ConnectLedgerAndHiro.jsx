import React, { useState } from 'react';
import { request, RpcErrorCode, AddressPurpose } from 'sats-connect';
import Wallet from 'sats-connect';

const ConnectWalletButtons = () => {
  const [walletAddress, setWalletAddress] = useState(""); // State to store the wallet address
  const [loadingHiro, setLoadingHiro] = useState(false); // State for Hiro wallet loading status
  const [loadingLedger, setLoadingLedger] = useState(false); // State for Ledger wallet loading status
  const [error, setError] = useState(null); // State for error handling
  const [isConnectedHiro, setIsConnectedHiro] = useState(false); // State for Hiro wallet connection status
  const [isConnectedLedger, setIsConnectedLedger] = useState(false); // State for Ledger wallet connection status
  
  const connectHiroWallet = async () => {
    setLoadingHiro(true); // Set loading to true when starting connection
    setError(null); // Clear any previous errors

    try {
      const result = await Wallet.request('getAccounts', {
        purposes: [AddressPurpose.Payment],
        message: 'Cool app wants to know your addresses!',
        walletType: 'hiro' // Specify Hiro wallet
      });

      if (result && result.result && result.result.length > 0) {
        const address = result.result[0].address; // Access the address from the result
        setWalletAddress(address); // Store the address in the state
        console.log("User's Hiro Bitcoin Address:", address); // Log the address to the console
        setIsConnectedHiro(true); // Set connection status to true
      } else {
        setIsConnectedHiro(false); // No address means not connected
      }
    } catch (err) {
      setError('Failed to connect to Hiro Wallet.'); // Handle error
      setIsConnectedHiro(false); // Set connection status to false on error
    } finally {
      setLoadingHiro(false); // Stop loading
    }
  };

  const connectLedgerWallet = async () => {
    setLoadingLedger(true); // Set loading to true when starting connection
    setError(null); // Clear any previous errors

    try {
      const result = await Wallet.request('getAccounts', {
        purposes: [AddressPurpose.Payment],
        message: 'Cool app wants to know your addresses!',
        walletType: 'ledger' // Specify Ledger wallet
      });

      if (result && result.result && result.result.length > 0) {
        const address = result.result[0].address; // Access the address from the result
        setWalletAddress(address); // Store the address in the state
        console.log("User's Ledger Bitcoin Address:", address); // Log the address to the console
        setIsConnectedLedger(true); // Set connection status to true
      } else {
        setIsConnectedLedger(false); // No address means not connected
      }
    } catch (err) {
      setError('Failed to connect to Ledger Wallet.'); // Handle error
      setIsConnectedLedger(false); // Set connection status to false on error
    } finally {
      setLoadingLedger(false); // Stop loading
    }
  };

  return (
    <div>
      <button 
        onClick={connectHiroWallet}
        disabled={loadingHiro}
        style={{ marginRight: '10px' }} // Add some margin between buttons
      >
        {loadingHiro ? 'Connecting to Hiro Wallet...' : (isConnectedHiro ? `Connected to Hiro: ${walletAddress}` : 'Connect Hiro Wallet')}
      </button>

      <button 
        onClick={connectLedgerWallet}
        disabled={loadingLedger}
      >
        {loadingLedger ? 'Connecting to Ledger Wallet...' : (isConnectedLedger ? `Connected to Ledger: ${walletAddress}` : 'Connect Ledger Wallet')}
      </button>

      {/* Display error message */}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ConnectWalletButtons;
