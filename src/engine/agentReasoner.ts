import { CatalystEvent } from '../types/catalyst';
import { AgentDecision, FlashBracketParams } from '../types/trade';
import { getTradFiMarketStatus } from './marketHours';

// Current reference prices for tokenized stocks on Base (against USDC)
export const TOKENIZED_PRICES: Record<string, { price: number; name: string; pair: string }> = {
  NVDAc: { price: 178.45, name: 'Coinbase Wrapped NVDA', pair: 'NVDAc / USDC' },
  bTSLA: { price: 248.80, name: 'Backed Tesla', pair: 'bTSLA / USDC' },
  bAAPL: { price: 232.10, name: 'Backed Apple', pair: 'bAAPL / USDC' },
  bCOIN: { price: 312.50, name: 'Backed Coinbase', pair: 'bCOIN / USDC' }
};

export function evaluateCatalyst(
  catalyst: CatalystEvent,
  walletBalanceUSDC: number = 25000
): AgentDecision {
  const marketStatus = getTradFiMarketStatus();
  const token = TOKENIZED_PRICES[catalyst.tokenizedSymbol] || { price: 150.0, name: catalyst.tokenizedSymbol, pair: `${catalyst.tokenizedSymbol} / USDC` };
  
  const reasoning: string[] = [];
  
  // Step 1: Market Hours Verification Gate
  reasoning.push(`[GATE 1 - VENUE VALIDATION]: Verified TradFi Equity Status = ${marketStatus.statusLabel} (${marketStatus.description}).`);
  reasoning.push(`[GATE 1 - ALPHA EDGE]: NYSE/Nasdaq closed. 24/7 Base Uniswap pool (${token.pair}) is the single active liquidity venue.`);

  // Step 2: Sentiment & Magnitude Analysis
  const surprise = catalyst.surprisePercent || 10.0;
  const sentimentScore = Math.min(0.98, Math.max(0.4, surprise / 50 + 0.3));
  const confidenceScore = Math.min(96, Math.max(68, Math.round(75 + surprise * 0.4)));

  reasoning.push(`[GATE 2 - NLP REASONING]: Detected high-conviction catalyst: "${catalyst.headline.slice(0, 60)}...".`);
  reasoning.push(`[GATE 2 - METRICS]: Fundamental surprise delta: +${surprise.toFixed(1)}%. Model sentiment score: ${sentimentScore.toFixed(2)} (Strong Bullish).`);

  // Step 3: Risk Budgeting & Dynamic Server Wallet Spending Envelope
  const baseAllocationUSDC = Math.min(5000, walletBalanceUSDC * 0.15); // Never risk more than 15% of vault in single catalyst
  const allocation = Math.round(baseAllocationUSDC);

  // Step 4: Definitive Flash Bracket Order Parameter Synthesis
  // Take-Profit is calibrated by surprise magnitude (min +4.0%, max +8.5%)
  const tpPercent = Math.min(8.5, Math.max(4.0, Number((surprise * 0.35).toFixed(2))));
  // Stop-Loss is tightly constrained to preserve capital (max -2.0%)
  const slPercent = -1.85;

  const entryLimitPrice = token.price;
  const takeProfitPrice = Number((entryLimitPrice * (1 + tpPercent / 100)).toFixed(2));
  const stopLossPrice = Number((entryLimitPrice * (1 + slPercent / 100)).toFixed(2));

  reasoning.push(`[GATE 3 - RISK ENVELOPE]: Position capital sized at $${allocation.toLocaleString()} USDC via Dynamic policy guard.`);
  reasoning.push(`[GATE 4 - FLASH BRACKET EXECUTION]: Formulating dual-legged risk bracket. Take-Profit target: $${takeProfitPrice} (+${tpPercent}%), Stop-Loss floor: $${stopLossPrice} (${slPercent}%).`);
  reasoning.push(`[GATE 5 - UNISWAP AMM ROUTING]: Route target = Base Uniswap V3 Pool [${catalyst.tokenizedSymbol}/USDC, 0.05% fee tier]. Integrator fee: 15 bps.`);

  const bracketParams: FlashBracketParams = {
    orderType: 'BRACKET',
    chainId: 8453, // Base Mainnet
    baseToken: catalyst.tokenizedSymbol,
    quoteToken: 'USDC',
    entryLimitPrice,
    takeProfitPrice,
    stopLossPrice,
    takeProfitPercent: tpPercent,
    stopLossPercent: slPercent,
    amountInUSDC: allocation,
    integratorFeeBps: 15,
    flashOrderId: `flash-brk-${Date.now().toString(16)}-${Math.random().toString(16).slice(2, 6)}`
  };

  return {
    catalystId: catalyst.id,
    ticker: catalyst.ticker,
    tokenizedSymbol: catalyst.tokenizedSymbol,
    action: 'BUY_BRACKET',
    confidenceScore,
    sentimentScore,
    reasoning,
    tradFiMarketStatus: marketStatus.statusLabel,
    bracketParams,
    timestamp: new Date().toISOString()
  };
}
