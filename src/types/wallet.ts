export interface DynamicServerWalletState {
  address: string;
  walletType: 'DYNAMIC_SERVER_WALLET' | 'DYNAMIC_EMBEDDED_DELEGATED';
  environmentId: string;
  network: 'Base Mainnet (8453)' | 'Base Sepolia (84532)';
  balanceUSDC: number;
  balanceETH: number;
  sessionExpiry: string;
  spendingPolicy: {
    maxPerTradeUSDC: number;
    dailyLimitUSDC: number;
    dailySpentUSDC: number;
    enforceBracketProtection: boolean;
  };
  connected: boolean;
}

export interface DynamicSigningReceipt {
  signature: string;
  signerAddress: string;
  nonce: number;
  rawPayloadHash: string;
  timestamp: string;
  policyCheckPassed: boolean;
}
