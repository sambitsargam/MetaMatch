import { IChainData } from './types';

const supportedChains: IChainData[] = [
  {
    name: "Localhost Testnet",
    short_name: "eth",
    chain: "ETH",
    network: "localhost",
    chain_id: 1337,
    network_id: 1,
    rpc_url: "",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "Ethereum Mainnet",
    short_name: "eth",
    chain: "ETH",
    network: "mainnet",
    chain_id: 1,
    network_id: 1,
    rpc_url: "https://virginia.rpc.blxrbdn.com",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  {
    name: "Ethereum Sepolia",
    short_name: "sep",
    chain: "ETH",
    network: "sepolia",
    chain_id: 11155111,
    network_id: 11155111,
    rpc_url: "https://ethereum-sepolia-rpc.publicnode.com",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
  // add for bsc testnet
  {
    name: "Binance Smart Chain Testnet",
    short_name: "bsc",
    chain: "BSC",
    network: "bsc",
    chain_id: 97,
    network_id: 97,
    rpc_url: "https://bsc-testnet-rpc.publicnode.com",
    native_currency: {
      symbol: "BNB",
      name: "Binance Coin",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },

  {
    name: "Arbitrum Testnet",
    short_name: "ark",
    chain: "ETH",
    network: "arbitrum",
    chain_id: 421611,
    network_id: 421611,
    rpc_url: "https://arb1.arbitrum.io/rpc",
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      contractAddress: "",
      balance: "",
    },
  },
];

export default supportedChains;