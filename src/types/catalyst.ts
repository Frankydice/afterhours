export type CatalystType = 'SEC_8K' | 'EARNINGS_SURPRISE' | 'FDA_APPROVAL' | 'MACRO_OFF_HOURS' | 'BREAKING_WIRE';

export interface CatalystEvent {
  id: string;
  ticker: string; // Real ticker: NVDA, AAPL, TSLA, COIN
  tokenizedSymbol: string; // Onchain token: NVDAc, bAAPL, bTSLA, bCOIN
  companyName: string;
  type: CatalystType;
  headline: string;
  source: string;
  timestamp: string; // ISO format
  filingUrl?: string;
  rawText: string;
  surprisePercent?: number; // e.g. +14.2% EPS beat
  impliedVolatilityImpact: 'HIGH' | 'EXTREME' | 'MODERATE';
  verifiedOffHours: boolean;
}
