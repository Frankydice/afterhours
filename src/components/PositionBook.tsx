import React from 'react';
import { Briefcase, ArrowUpRight, ArrowDownRight, CheckCircle2, ShieldAlert, ExternalLink } from 'lucide-react';
import { ActivePosition } from '../types/trade';

interface PositionBookProps {
  positions: ActivePosition[];
}

export const PositionBook: React.FC<PositionBookProps> = ({ positions }) => {
  return (
    <div className="flex flex-col h-full bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-xs">
      
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#e5e7eb] bg-[#fafafa] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-[#ff5d38]" />
          <h2 className="font-mono text-xs uppercase font-bold tracking-wider text-[#09090b]">
            3. Active Flash Bracket Orders &amp; Uniswap Positions
          </h2>
        </div>
        <span className="text-[10px] font-mono text-[#71717a] bg-[#f4f4f6] px-2 py-0.5 rounded border border-[#e5e7eb] font-medium">
          {positions.length} Positions Tracked
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#fcfcfd]">
        {positions.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 text-[#9ca3af]">
            <Briefcase className="w-10 h-10 mb-2 opacity-30" />
            <p className="font-mono text-xs font-semibold text-[#52525b]">No Active Orders Yet</p>
            <p className="text-[11px] mt-1 max-w-xs text-[#71717a]">
              Execute a trade from the Agent Terminal to launch a live Definitive Flash Bracket Order on Base.
            </p>
          </div>
        ) : (
          positions.map(pos => {
            const isProfit = pos.pnlUsd >= 0;

            // Calculate bracket progress (0 to 100%)
            const totalRange = pos.takeProfitPrice - pos.stopLossPrice;
            const progress = Math.min(
              100,
              Math.max(0, ((pos.currentPrice - pos.stopLossPrice) / (totalRange || 1)) * 100)
            );

            return (
              <div
                key={pos.id}
                className="bg-white border border-[#e5e7eb] rounded-lg p-3.5 space-y-3 hover:border-[#d4d4d8] transition-all shadow-xs"
              >
                {/* Top Row: Symbol, Status & PnL */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-sm text-white bg-[#09090b] px-1.5 py-0.5 rounded">
                        {pos.tokenizedSymbol}
                      </span>
                      <span className="text-xs text-[#18181b] font-bold">
                        {pos.companyName}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-[#71717a] mt-0.5">
                      Entry: ${pos.entryPrice.toFixed(2)} • Shares: {pos.shares}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="text-right">
                    {pos.status === 'BRACKET_ACTIVE' && (
                      <span className="inline-flex items-center gap-1.5 bg-[#f4f4f6] text-[#09090b] text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-[#e5e7eb]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff5d38]"></span>
                        FLASH BRACKET ACTIVE
                      </span>
                    )}
                    {pos.status === 'TP_FILLED' && (
                      <span className="inline-flex items-center gap-1 bg-[#f0fdf4] text-[#15803d] text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-[#bbf7d0]">
                        <CheckCircle2 className="w-3 h-3" />
                        TAKE-PROFIT FILLED (+${pos.pnlUsd})
                      </span>
                    )}
                    {pos.status === 'SL_TRIGGERED' && (
                      <span className="inline-flex items-center gap-1 bg-[#fff1f2] text-[#be123c] text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-[#fecdd3]">
                        <ShieldAlert className="w-3 h-3" />
                        STOP-LOSS PROTECTED (${pos.pnlUsd})
                      </span>
                    )}

                    {/* PnL Display */}
                    <div className="flex items-center justify-end gap-1 mt-1 font-mono font-bold text-sm">
                      {isProfit ? (
                        <ArrowUpRight className="w-4 h-4 text-[#15803d]" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-[#be123c]" />
                      )}
                      <span className={isProfit ? 'text-[#15803d]' : 'text-[#be123c]'}>
                        {isProfit ? '+' : ''}${pos.pnlUsd.toFixed(2)} ({isProfit ? '+' : ''}{pos.pnlPercent}%)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bracket Progress Visualizer */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#be123c] font-semibold">
                      SL: ${pos.stopLossPrice.toFixed(2)}
                    </span>
                    <span className="text-[#09090b] font-bold">
                      Current: ${pos.currentPrice.toFixed(2)}
                    </span>
                    <span className="text-[#15803d] font-semibold">
                      TP: ${pos.takeProfitPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Single Clean Bracket Bar */}
                  <div className="w-full bg-[#f1f2f4] h-2 rounded-full relative overflow-hidden border border-[#e5e7eb]">
                    <div
                      className="h-full transition-all duration-500 bg-[#ff5d38]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Order Provenance & Receipt Info */}
                <div className="pt-2 border-t border-[#f1f2f4] flex items-center justify-between text-[10px] font-mono text-[#71717a] flex-wrap gap-2">
                  <div className="flex items-center gap-1.5">
                    <span>Flash ID:</span>
                    <span className="text-[#09090b] font-medium">{pos.flashOrderId.slice(0, 16)}...</span>
                  </div>

                  <a
                    href={`https://basescan.org/tx/${pos.baseTxHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#ff5d38] hover:underline font-medium"
                  >
                    <span>Basescan Tx</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
