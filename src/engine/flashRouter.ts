import { FlashBracketParams, ActivePosition } from '../types/trade';
import { DynamicSigningReceipt } from '../types/wallet';

export interface FlashOrderReceipt {
  orderId: string;
  status: 'BRACKET_ACTIVE' | 'PENDING_FILL';
  chain: string;
  baseToken: string;
  quoteToken: string;
  entryPrice: number;
  takeProfitPrice: number;
  stopLossPrice: number;
  integratorFeeCollectedUSD: number;
  routedVenue: string;
  baseTxHash: string;
  createdAt: string;
}

export async function submitFlashBracketOrder(
  params: FlashBracketParams,
  signingReceipt: DynamicSigningReceipt,
  ticker: string,
  companyName: string
): Promise<ActivePosition> {
  // Simulate dispatch to Definitive Flash API endpoint: POST /v1/orders/bracket
  await new Promise(resolve => setTimeout(resolve, 800));

  const shares = Number((params.amountInUSDC / params.entryLimitPrice).toFixed(4));
  const baseTxHash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

  const position: ActivePosition = {
    id: `pos-${Date.now().toString(16)}`,
    catalystId: params.flashOrderId,
    ticker,
    tokenizedSymbol: params.baseToken,
    companyName,
    status: 'BRACKET_ACTIVE',
    entryPrice: params.entryLimitPrice,
    currentPrice: params.entryLimitPrice,
    takeProfitPrice: params.takeProfitPrice,
    stopLossPrice: params.stopLossPrice,
    pnlUsd: 0.0,
    pnlPercent: 0.0,
    shares,
    capitalCommittedUSDC: params.amountInUSDC,
    flashOrderId: params.flashOrderId,
    dynamicSignature: signingReceipt.signature,
    dynamicWalletAddress: signingReceipt.signerAddress,
    baseTxHash,
    createdAt: new Date().toISOString()
  };

  return position;
}

export function simulatePriceTick(
  pos: ActivePosition,
  bias: 'UP' | 'DOWN' | 'VOLATILE' = 'UP'
): ActivePosition {
  if (pos.status !== 'BRACKET_ACTIVE') return pos;

  const volatility = (Math.random() * 0.012 - (bias === 'UP' ? 0.003 : 0.007));
  const newPrice = Number((pos.currentPrice * (1 + volatility)).toFixed(2));
  const priceChange = newPrice - pos.entryPrice;
  const pnlPercent = Number(((priceChange / pos.entryPrice) * 100).toFixed(2));
  const pnlUsd = Number((pos.shares * priceChange).toFixed(2));

  // Check Flash Bracket triggers
  if (newPrice >= pos.takeProfitPrice) {
    return {
      ...pos,
      currentPrice: pos.takeProfitPrice,
      pnlPercent: Number((((pos.takeProfitPrice - pos.entryPrice) / pos.entryPrice) * 100).toFixed(2)),
      pnlUsd: Number((pos.shares * (pos.takeProfitPrice - pos.entryPrice)).toFixed(2)),
      status: 'TP_FILLED',
      closedAt: new Date().toISOString(),
      fillReason: `Definitive Flash Take-Profit Order Filled at Target $${pos.takeProfitPrice}`
    };
  }

  if (newPrice <= pos.stopLossPrice) {
    return {
      ...pos,
      currentPrice: pos.stopLossPrice,
      pnlPercent: Number((((pos.stopLossPrice - pos.entryPrice) / pos.entryPrice) * 100).toFixed(2)),
      pnlUsd: Number((pos.shares * (pos.stopLossPrice - pos.entryPrice)).toFixed(2)),
      status: 'SL_TRIGGERED',
      closedAt: new Date().toISOString(),
      fillReason: `Definitive Flash Stop-Loss Protective Reversal at $${pos.stopLossPrice}`
    };
  }

  return {
    ...pos,
    currentPrice: newPrice,
    pnlPercent,
    pnlUsd
  };
}
