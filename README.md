# MetaMatch: Decentralized NFT Marketplace with Cross-Chain Support

## Overview

**MetaMatch** is a decentralized platform that allows users to create profiles, mint NFTs, buy and sell NFTs, and interact with the marketplace across multiple blockchain networks. This project integrates **Analog GMP (Generic Message Passing)** for cross-chain communication, enabling users to interact with the platform from different blockchains like **Ethereum (Sepolia)** and **Binance Smart Chain (BSC Testnet)**.

This repository contains two parts:
1. **Smart Contract** (Solidity)
2. **Frontend Application** (React.js)

The smart contract provides the core functionality for managing user profiles, NFTs, and the marketplace, while the frontend application interacts with the contract, enabling users to mint and trade NFTs, view profiles, and more.

## Features

### 1. **User Profiles**
- Users can create a personalized profile with details such as name, image, gender, country, and more.
- Profiles are stored on-chain and are linked to each user’s address.

### 2. **NFT Marketplace**
- Users can mint, list, buy, and resell NFTs.
- Supports **ERC-721 tokens** for unique digital assets.
- Users can buy NFTs using **ETH** (Ethereum) or **BNB** (Binance Smart Chain).

### 3. **Cross-Chain Communication**
- The platform uses **Analog GMP** to facilitate cross-chain interaction, enabling users to send and receive messages between different blockchains (e.g., Ethereum and Binance Smart Chain).
- This allows the **MetaMatch** platform to extend its functionality across multiple chains, providing a seamless experience for users regardless of the chain they are on.


## Architecture

### 1. **Smart Contract (Solidity)**
The **MetaMatch** smart contract is built using Solidity and implements the following core features:
- **User Profile Management**: Users can create, update, and fetch their profiles.
- **NFT Minting and Marketplace**: Users can mint NFTs, list them for sale, buy, and resell NFTs.
- **Cross-Chain Communication**: The contract interacts with the **Analog GMP** protocol to send and receive messages across different blockchains.

The contract is deployed on **Ethereum (Sepolia)** and **Binance Smart Chain (BSC Testnet)** to enable cross-chain functionality.

### 2. **Frontend (React.js)**
The frontend of **MetaMatch** is built with **React.js** and interacts with the Ethereum and BSC blockchains using **Web3.js** or **Ethers.js**. It provides a user-friendly interface for:
- Creating and viewing user profiles.
- Minting, buying, and selling NFTs.
- Viewing and interacting with cross-chain messages.

The frontend communicates with the deployed smart contract on Ethereum and BSC via **Web3.js** and supports **MetaMask** for wallet integration.


## How it Works with Analog GMP

### Cross-Chain Interaction with Analog GMP

**Analog GMP** is a protocol that allows for communication between different blockchains. This is crucial for enabling cross-chain functionality in **MetaMatch**, allowing users to interact with the platform across multiple blockchain networks.

Here’s how **Analog GMP** is integrated into **MetaMatch**:

1. **Gateway Setup**:
   - The contract interacts with the **IGateway** interface, which acts as a bridge between different blockchains.
   - When a user sends a message (such as an NFT transaction or profile update) from one chain (e.g., Ethereum), it is forwarded to the **IGateway** on the other chain (e.g., Binance Smart Chain).
   
2. **Message Sending and Receiving**:
   - The **MetaMatch** contract implements the **IGmpReceiver** interface, which allows it to receive cross-chain messages.
   - When a message is sent from one blockchain, the contract listens for the message via the **onGmpReceived** function.
   - The contract processes the message (e.g., updating a user’s profile or updating the NFT marketplace) and responds accordingly.

3. **Cross-Chain Communication**:
   - This integration allows users on different blockchains (e.g., Ethereum and Binance Smart Chain) to interact with the same MetaMatch marketplace, send messages, and perform actions like minting or trading NFTs.

### Example Cross-Chain Interaction

1. **User on Ethereum (Sepolia)** wants to mint an NFT:
   - The user interacts with the **MetaMatch** frontend, which sends a message to the **MetaMatch** smart contract on Ethereum.
   - The contract mints the NFT and creates a market listing.

2. **User on Binance Smart Chain (BSC Testnet)** wants to purchase the NFT:
   - The user on BSC sends a cross-chain message via the **IGateway** to the **MetaMatch** contract on Ethereum.
   - The contract on Ethereum processes the purchase, transfers the NFT, and sends a confirmation back to the user on BSC.

This seamless interaction between blockchains allows for a smooth experience, even when users are on different chains.


## Conclusion

The **MetaMatch** project provides a decentralized, cross-chain NFT marketplace where users can create profiles, mint NFTs, and trade them across multiple blockchain networks. By integrating **Analog GMP**, **MetaMatch** enables seamless cross-chain communication, allowing users to interact with the platform no matter which blockchain they are using.

For further questions or contributions, feel free to open an issue or pull request in the repository.


### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

