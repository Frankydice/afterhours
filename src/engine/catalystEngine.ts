import { CatalystEvent } from '../types/catalyst';

export const INITIAL_CATALYSTS: CatalystEvent[] = [
  {
    id: 'cat-nvda-8k-01',
    ticker: 'NVDA',
    tokenizedSymbol: 'NVDAc',
    companyName: 'NVIDIA Corporation',
    type: 'SEC_8K',
    headline: 'SEC 8-K: NVIDIA Enters Exclusive Hyperscaler Sovereign AI Infrastructure Deal',
    source: 'SEC EDGAR / Electronic Data Gathering',
    timestamp: '2026-09-18T20:14:00Z',
    filingUrl: 'https://www.sec.gov/edgar/searchedgar/companysearch',
    rawText: 'Item 8.01 Other Events. On September 18, 2026, post-market close, NVIDIA entered into a definitive $4.2B multi-year sovereign compute hardware agreement with European datacenter consortium. Revenue recognition begins Q4 2026 with gross margins exceeding 74%.',
    surprisePercent: 12.8,
    impliedVolatilityImpact: 'EXTREME',
    verifiedOffHours: true
  },
  {
    id: 'cat-tsla-earn-02',
    ticker: 'TSLA',
    tokenizedSymbol: 'bTSLA',
    companyName: 'Tesla, Inc.',
    type: 'EARNINGS_SURPRISE',
    headline: 'Q3 Earnings Beat: Robotaxi Commercial Regulatory Clearance in 4 States',
    source: 'Tesla Investor Relations Wire',
    timestamp: '2026-09-18T21:05:00Z',
    rawText: 'Tesla, Inc. reports Q3 GAAP EPS of $1.18 vs $0.78 consensus (+51% beat). Autonomous fleet deployment granted commercial permits across 4 tier-1 states effective October 1.',
    surprisePercent: 51.2,
    impliedVolatilityImpact: 'EXTREME',
    verifiedOffHours: true
  },
  {
    id: 'cat-coin-macro-03',
    ticker: 'COIN',
    tokenizedSymbol: 'bCOIN',
    companyName: 'Coinbase Global, Inc.',
    type: 'MACRO_OFF_HOURS',
    headline: 'Off-Hours Regulatory Milestone: CFTC Finalizes 24/7 Perpetual Clearing Rules',
    source: 'Federal Register Notice / Bloomberg Terminal',
    timestamp: '2026-09-19T02:40:00Z',
    rawText: 'CFTC issues comprehensive guidance approving licensed custody exchanges to clear tokenized equities 24/7/365. Base network designated as primary compliant settlement layer for Base-native equities.',
    surprisePercent: 18.5,
    impliedVolatilityImpact: 'HIGH',
    verifiedOffHours: true
  },
  {
    id: 'cat-aapl-wire-04',
    ticker: 'AAPL',
    tokenizedSymbol: 'bAAPL',
    companyName: 'Apple Inc.',
    type: 'BREAKING_WIRE',
    headline: 'Weekend Supply Chain Wire: Apple M5 Ultra AI Silicon Tape-Out Complete at TSMC',
    source: 'Taiwan Commercial Times / Reuters',
    timestamp: '2026-09-19T06:15:00Z',
    rawText: 'TSMC 2nm wafer yields for Apple M5 Ultra chip family surpass 82%, 6 months ahead of schedule. On-device neural processing capability 3.8x higher than previous generation.',
    surprisePercent: 8.4,
    impliedVolatilityImpact: 'MODERATE',
    verifiedOffHours: true
  }
];

export function createSimulatedCatalyst(ticker: 'NVDA' | 'TSLA' | 'AAPL' | 'COIN', customText?: string): CatalystEvent {
  const configs = {
    NVDA: {
      tokenizedSymbol: 'NVDAc',
      companyName: 'NVIDIA Corporation',
      headline: 'Flash Filing: NVIDIA Next-Gen Quantum-AI Architecture Exceeds Benchmarks',
      surprisePercent: 15.6,
      defaultText: 'Item 7.01 Regulation FD Disclosure: Preliminary testing of B300 chips demonstrates 2.4x energy efficiency advantage over competing ASIC solutions.'
    },
    TSLA: {
      tokenizedSymbol: 'bTSLA',
      companyName: 'Tesla, Inc.',
      headline: 'Unscheduled Disclosure: Full-Self-Driving European Union Commercial Approval',
      surprisePercent: 22.4,
      defaultText: 'European Transport Authority grants cross-border autonomous operations permit for next-generation Tesla vehicles.'
    },
    AAPL: {
      tokenizedSymbol: 'bAAPL',
      companyName: 'Apple Inc.',
      headline: '8-K: Apple Announces Special Capital Return & AI Services Subscription Surge',
      surprisePercent: 11.2,
      defaultText: 'Services revenue hits record $32B in single quarter driven by onchain creator monetization.'
    },
    COIN: {
      tokenizedSymbol: 'bCOIN',
      companyName: 'Coinbase Global, Inc.',
      headline: 'Flash Filing: Base Network Daily Transaction Volume Surpasses All TradFi Clearing Houses Combined',
      surprisePercent: 28.0,
      defaultText: 'Base onchain settlement fees reach all-time annualized run rate of $1.8B with 99.999% uptime.'
    }
  };

  const cfg = configs[ticker];
  const now = new Date();

  return {
    id: `cat-${ticker.toLowerCase()}-${Date.now().toString().slice(-6)}`,
    ticker,
    tokenizedSymbol: cfg.tokenizedSymbol,
    companyName: cfg.companyName,
    type: 'SEC_8K',
    headline: cfg.headline,
    source: 'SEC EDGAR Real-Time Stream (Off-Hours Socket)',
    timestamp: now.toISOString(),
    rawText: customText || cfg.defaultText,
    surprisePercent: cfg.surprisePercent,
    impliedVolatilityImpact: 'EXTREME',
    verifiedOffHours: true
  };
}
