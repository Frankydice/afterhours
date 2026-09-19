import React from 'react';
import { Briefcase, ArrowUpRight, ArrowDownRight, CheckCircle2, ShieldAlert, ExternalLink } from 'lucide-react';
import { ActivePosition } from '../types/trade';

interface PositionBookProps {
  positions: ActivePosition[];
}

export const PositionBook: React.FC<PositionBookProps> = ({ positions }) => {
  return (
    <div className="flex flex-col h-full bg-[#0d0d12] border border-[#22222c] rounded-xl overflow-hidden shadow-lg">
      
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#22222c] bg-[#121218] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-[#ff5d38]" />
          <h2 className="font-mono text-xs uppercase font-bold tracking-wider text-white">
            3. Active Flash Bracket Orders &amp; Uniswap Positions
          </h2>
        </div>
        <span className="text-[10px] font-mono text-[#8a8a9a] bg-[#191924] px-2 py-0.5 rounded border border-[#262638]">
          {positions.length} Positions Tracked
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {positions.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 text-[#6c6c7d]">
            <Briefcase className="w-10 h-10 mb-2 opacity-40" />
            <p className="font-mono text-xs font-semibold">No Active Orders Yet</p>
            <p className="text-[11px] mt-1 max-w-xs">
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
                className="bg-[#12121a] border border-[#242434] rounded-lg p-3.5 space-y-3 hover:border-[#ff5d38]/30 transition-all"
              >
                {/* Top Row: Symbol, Status & PnL */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-sm text-white bg-[#ff5d38] px-1.5 py-0.5 rounded">
                        {pos.tokenizedSymbol}
                      </span>
                      <span className="text-xs text-[#a0a0b2] font-semibold">
                        {pos.companyName}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-[#78788c] mt-0.5">
                      Entry: ${pos.entryPrice.toFixed(2)} • Shares: {pos.shares}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="text-right">
                    {pos.status === 'BRACKET_ACTIVE' && (
                      <span className="inline-flex items-center gap-1 bg-amber-500/15 text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-amber-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                        FLASH BRACKET ACTIVE
                      </span>
                    )}
                    {pos.status === 'TP_FILLED' && (
                      <span className="inline-flex items-center gap-1 bg-[#22c55e]/15 text-[#22c55e] text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-[#22c55e]/30">
                        <CheckCircle2 className="w-3 h-3" />
                        TAKE-PROFIT FILLED (+${pos.pnlUsd})
                      </span>
                    )}
                    {pos.status === 'SL_TRIGGERED' && (
                      <span className="inline-flex items-center gap-1 bg-rose-500/15 text-rose-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-rose-500/30">
                        <ShieldAlert className="w-3 h-3" />
                        STOP-LOSS PROTECTED (${pos.pnlUsd})
                      </span>
                    )}

                    {/* PnL Display */}
                    <div className="flex items-center justify-end gap-1 mt-1 font-mono font-bold text-sm">
                      {isProfit ? (
                        <ArrowUpRight className="w-4 h-4 text-[#22c55e]" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-rose-400" />
                      )}
                      <span className={isProfit ? 'text-[#22c55e]' : 'text-rose-400'}>
                        {isProfit ? '+' : ''}${pos.pnlUsd.toFixed(2)} ({isProfit ? '+' : ''}{pos.pnlPercent}%)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bracket Progress Visualizer */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-rose-400 font-semibold">
                      SL: ${pos.stopLossPrice.toFixed(2)}
                    </span>
                    <span className="text-white font-bold">
                      Current: ${pos.currentPrice.toFixed(2)}
                    </span>
                    <span className="text-[#22c55e] font-semibold">
                      TP: ${pos.takeProfitPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Dual Bracket Bar */}
                  <div className="w-full bg-[#1c1c28] h-2 rounded-full relative overflow-hidden border border-[#29293a]">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isProfit ? 'bg-gradient-to-r from-amber-400 to-[#22c55e]' : 'bg-gradient-to-r from-rose-500 to-amber-400'
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Order Provenance & Receipt Info */}
                <div className="pt-2 border-t border-[#1e1e2c] flex items-center justify-between text-[10px] font-mono text-[#8a8a9c] flex-wrap gap-2">
                  <div className="flex items-center gap-1.5">
                    <span>Flash ID:</span>
                    <span className="text-white">{pos.flashOrderId.slice(0, 16)}...</span>
                  </div>

                  <a
                    href={`https://basescan.org/tx/${pos.baseTxHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#ff5d38] hover:underline"
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
