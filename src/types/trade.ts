export type OrderStatus = 
  | 'PENDING_DECISION'
  | 'SIGNING_DYNAMIC'
  | 'DISPATCHING_FLASH'
  | 'BRACKET_ACTIVE'
  | 'TP_FILLED'
  | 'SL_TRIGGERED'
  | 'CANCELLED';

export interface FlashBracketParams {
  orderType: 'BRACKET';
  chainId: number; // 8453 (Base Mainnet) or 84532 (Base Sepolia)
  baseToken: string; // Tokenized Stock Address (e.g. NVDAc)
  quoteToken: string; // USDC Address on Base
  entryLimitPrice: number; // Entry trigger/limit
  takeProfitPrice: number; // Target upper bound
  stopLossPrice: number; // Downside floor protection
  takeProfitPercent: number; // e.g. +5.5%
  stopLossPercent: number; // e.g. -2.0%
  amountInUSDC: number;
  integratorFeeBps: number; // 15 bps monetized to AfterHours
  flashOrderId: string;
}

export interface AgentDecision {
  catalystId: string;
  ticker: string;
  tokenizedSymbol: string;
  action: 'BUY_BRACKET' | 'PASS_RISK_TOO_HIGH' | 'PASS_THIN_LIQUIDITY';
  confidenceScore: number; // 0 to 100
  sentimentScore: number; // -1.0 to +1.0
  reasoning: string[];
  tradFiMarketStatus: 'CLOSED_WEEKEND' | 'CLOSED_NIGHT' | 'PRE_MARKET' | 'AFTER_HOURS' | 'OPEN';
  bracketParams?: FlashBracketParams;
  timestamp: string;
}

export interface ActivePosition {
  id: string;
  catalystId: string;
  ticker: string;
  tokenizedSymbol: string;
  companyName: string;
  status: OrderStatus;
  entryPrice: number;
  currentPrice: number;
  takeProfitPrice: number;
  stopLossPrice: number;
  pnlUsd: number;
  pnlPercent: number;
  shares: number;
  capitalCommittedUSDC: number;
  flashOrderId: string;
  dynamicSignature: string;
  dynamicWalletAddress: string;
  baseTxHash: string;
  createdAt: string;
  closedAt?: string;
  fillReason?: string;
}
