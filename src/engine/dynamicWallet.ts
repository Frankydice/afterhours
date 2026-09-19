import { DynamicServerWalletState, DynamicSigningReceipt } from '../types/wallet';
import { FlashBracketParams } from '../types/trade';

// Mock initial state for AfterHours Dynamic Server Wallet
export const INITIAL_DYNAMIC_WALLET: DynamicServerWalletState = {
  address: '0x8f45a16F2E23E9995583b24B5C1B33eDDE459C51',
  walletType: 'DYNAMIC_SERVER_WALLET',
  environmentId: 'dyn_env_runtime_afterhours_2026',
  network: 'Base Mainnet (8453)',
  balanceUSDC: 28450.0,
  balanceETH: 1.45,
  sessionExpiry: '2026-09-30T00:00:00Z',
  spendingPolicy: {
    maxPerTradeUSDC: 5000.0,
    dailyLimitUSDC: 20000.0,
    dailySpentUSDC: 3750.0,
    enforceBracketProtection: true
  },
  connected: true
};

let currentNonce = 104;

export async function signBracketExecutionWithDynamic(
  params: FlashBracketParams,
  wallet: DynamicServerWalletState
): Promise<{ receipt: DynamicSigningReceipt; updatedWallet: DynamicServerWalletState }> {
  // Simulate cryptographic ECDSA signing roundtrip via Dynamic Server Wallet API
  await new Promise(resolve => setTimeout(resolve, 600));

  // Dynamic Policy Guard Enforcement
  if (params.amountInUSDC > wallet.spendingPolicy.maxPerTradeUSDC) {
    throw new Error(`Dynamic Policy Violation: Trade amount ($${params.amountInUSDC}) exceeds maxPerTrade limit of $${wallet.spendingPolicy.maxPerTradeUSDC}`);
  }

  if (wallet.spendingPolicy.dailySpentUSDC + params.amountInUSDC > wallet.spendingPolicy.dailyLimitUSDC) {
    throw new Error(`Dynamic Policy Violation: Daily spending ceiling exceeded.`);
  }

  currentNonce += 1;
  const rawPayload = JSON.stringify({
    orderType: params.orderType,
    baseToken: params.baseToken,
    quoteToken: params.quoteToken,
    entryPrice: params.entryLimitPrice,
    tp: params.takeProfitPrice,
    sl: params.stopLossPrice,
    amount: params.amountInUSDC,
    nonce: currentNonce,
    timestamp: Date.now()
  });

  // Simulated Keccak256 / SHA-256 hash
  let hash = 0;
  for (let i = 0; i < rawPayload.length; i++) {
    hash = ((hash << 5) - hash) + rawPayload.charCodeAt(i);
    hash |= 0;
  }
  const hexHash = '0x' + Math.abs(hash).toString(16).padStart(64, '0');
  const signature = `0x${hexHash.slice(2, 34)}7a4c9b1f2e8d3c5b8a0e1f4d7b2c9e6a5f1d8c2b7a4e0f9c2d1b8a3e6f5c8b1c`;

  const receipt: DynamicSigningReceipt = {
    signature,
    signerAddress: wallet.address,
    nonce: currentNonce,
    rawPayloadHash: hexHash,
    timestamp: new Date().toISOString(),
    policyCheckPassed: true
  };

  const updatedWallet: DynamicServerWalletState = {
    ...wallet,
    balanceUSDC: Number((wallet.balanceUSDC - params.amountInUSDC).toFixed(2)),
    spendingPolicy: {
      ...wallet.spendingPolicy,
      dailySpentUSDC: Number((wallet.spendingPolicy.dailySpentUSDC + params.amountInUSDC).toFixed(2))
    }
  };

  return { receipt, updatedWallet };
}
