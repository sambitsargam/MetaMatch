## Overview

The **MetaMatch Smart Contract** is a decentralized application (dApp) that integrates an NFT marketplace with user profiles and cross-chain functionality. It allows users to create profiles, mint and trade NFTs, and interact across multiple blockchain networks using the **Analog GMP (Generic Message Passing)** protocol.

This contract uses:
- **ERC-721 Tokens** for NFTs.
- **Cross-Chain Communication** through the `IGmpReceiver` and `IGateway` interfaces.


## Features

### 1. **User Profiles**
- Users can create personalized profiles with details such as name, image, gender, country, and more.
- Profiles are stored on-chain and are associated with each user’s address.

### 2. **NFT Marketplace**
- Users can mint, list, buy, and resell NFTs.
- The marketplace supports ERC-721 tokens for unique digital assets.

### 3. **Cross-Chain Communication**
- The contract allows cross-chain interactions via **Analog GMP** to send messages between different blockchain networks.
- This feature enables users to interact with NFTs and profiles across various supported blockchains.

## Contract Breakdown

### 1. **User Profile Management**
- **createProfile**: Allows users to create and store their profile with personal details.
- **fetchAllUsers**: Fetches all registered users.
- **getSingleUser**: Fetches the profile of the currently connected user.
- **isRegistered**: Checks if the user has already created a profile.

### 2. **NFT Minting and Marketplace**
- **createToken**: Mints a new NFT and lists it in the marketplace.
- **createMarketItem**: Lists the NFT for sale in the marketplace.
- **resellToken**: Allows users to resell NFTs they have purchased.
- **createMarketSale**: Completes the sale of an NFT between the buyer and seller.
- **fetchMarketItems**: Returns all unsold market items.
- **fetchMyNFTs**: Returns the NFTs owned by the currently connected user.
- **fetchItemsListed**: Returns the NFTs listed for sale by the currently connected user.

### 3. **Cross-Chain Functionality**
- **IGmpReceiver**: The contract implements this interface to handle messages received from other chains.
- **IGateway**: The contract interacts with this interface to send messages to other chains, enabling cross-chain communication.


## Cross-Chain Communication

### 1. **Setting Up the IGateway Interface**
- Deploy the **IGateway** contract on the source chain (e.g., Shibuya).
- Fund the destination gateway to cover gas fees for cross-chain transactions.

### 2. **Sending Cross-Chain Messages**
- Use the **submitMessage** function to send cross-chain messages to the **MetaMatch** contract on Sepolia.
- Provide the destination address (Sepolia contract address), network ID, gas limit, and payload.


## Functions and Events

### Functions

- **createProfile**: 
    - Arguments: `_name`, `_image`, `_profile`, `_gender`, `_year`, `_country`
    - Description: Creates a new user profile.
  
- **createToken**: 
    - Arguments: `tokenURI`, `price`, `_name`, `_description`, `_image`
    - Description: Mints a new NFT and lists it for sale in the marketplace.
  
- **createMarketItem**: 
    - Arguments: `tokenId`, `price`, `_name`, `_description`, `_image`
    - Description: Lists an NFT for sale in the marketplace.
  
- **resellToken**: 
    - Arguments: `tokenId`, `price`
    - Description: Allows users to resell NFTs they have purchased.
  
- **createMarketSale**: 
    - Arguments: `tokenId`
    - Description: Completes the sale of an NFT.

- **fetchMarketItems**: 
    - Description: Returns all unsold NFTs in the marketplace.
  
- **fetchMyNFTs**: 
    - Description: Returns the NFTs owned by the current user.

- **fetchItemsListed**: 
    - Description: Returns the NFTs listed for sale by the current user.

### Events

- **UserCreated**: Emitted when a new user profile is created.
- **MarketItemCreated**: Emitted when a new NFT is listed for sale.
- **MarketItemSold**: Emitted when an NFT is sold.


## Conclusion

The **MetaMatch** smart contract provides a robust solution for managing user profiles, minting and trading NFTs, and supporting cross-chain interactions. By leveraging **Analog GMP**, users can seamlessly interact across different blockchain networks.

For further questions or issues, feel free to open an issue or contribute to the repository.

