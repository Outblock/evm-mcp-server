import { type Chain } from 'viem';
import {
  flowMainnet,
  flowTestnet
} from 'viem/chains';

// Default configuration values
export const DEFAULT_RPC_URL = 'https://mainnet.evm.nodes.onflow.org';
export const DEFAULT_CHAIN_ID = 747;

// Map chain IDs to chains
export const chainMap: Record<number, Chain> = {
  747: flowMainnet,
  545: flowTestnet,
};

// Map network names to chain IDs for easier reference
export const networkNameMap: Record<string, number> = {
  'flow': 747,
  'flow-testnet': 545,
};

// Map chain IDs to RPC URLs
export const rpcUrlMap: Record<number, string> = {
  747: 'https://mainnet.evm.nodes.onflow.org',
  545: 'https://testnet.evm.nodes.onflow.org',
};

/**
 * Resolves a chain identifier (number or string) to a chain ID
 * @param chainIdentifier Chain ID (number) or network name (string)
 * @returns The resolved chain ID
 */
export function resolveChainId(chainIdentifier: number | string): number {
  if (typeof chainIdentifier === 'number') {
    return chainIdentifier;
  }
  const networkName = chainIdentifier.toLowerCase();
  if (networkName in networkNameMap) {
    return networkNameMap[networkName];
  }
  const parsedId = parseInt(networkName);
  if (!isNaN(parsedId)) {
    return parsedId;
  }
  return DEFAULT_CHAIN_ID;
}

/**
 * Returns the chain configuration for the specified chain ID or network name
 * @param chainIdentifier Chain ID (number) or network name (string)
 * @returns The chain configuration
 * @throws Error if the network is not supported (when string is provided)
 */
export function getChain(chainIdentifier: number | string = DEFAULT_CHAIN_ID): Chain {
  if (typeof chainIdentifier === 'string') {
    const networkName = chainIdentifier.toLowerCase();
    if (networkNameMap[networkName]) {
      return chainMap[networkNameMap[networkName]];
    }
    throw new Error(`Unsupported network: ${chainIdentifier}`);
  }
  return chainMap[chainIdentifier];
}

/**
 * Gets the appropriate RPC URL for the specified chain ID or network name
 * @param chainIdentifier Chain ID (number) or network name (string)
 * @returns The RPC URL for the specified chain
 */
export function getRpcUrl(chainIdentifier: number | string = DEFAULT_CHAIN_ID): string {
  const chainId = typeof chainIdentifier === 'string' 
    ? resolveChainId(chainIdentifier) 
    : chainIdentifier;
  return rpcUrlMap[chainId] || DEFAULT_RPC_URL;
}

/**
 * Get a list of supported networks
 * @returns Array of supported network names
 */
export function getSupportedNetworks(): string[] {
  return Object.keys(networkNameMap).sort();
} 
