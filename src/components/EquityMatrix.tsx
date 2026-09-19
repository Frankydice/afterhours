import React from 'react';
import { Layers } from 'lucide-react';
import { BASE_TOKENIZED_POOLS } from '../engine/uniswapRouter';
import { TOKENIZED_PRICES } from '../engine/agentReasoner';

export const EquityMatrix: React.FC = () => {
  return (
    <div className="bg-white border-b border-[#e5e7eb] py-2.5 px-4 lg:px-8">
      <div className="max-w-[1680px] mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 text-xs font-mono text-[#52525b] uppercase font-bold shrink-0">
          <Layers className="w-3.5 h-3.5 text-[#ff5d38]" />
          <span>Base Tokenized Equities:</span>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          {Object.entries(BASE_TOKENIZED_POOLS).map(([symbol, pool]) => {
            const priceInfo = TOKENIZED_PRICES[symbol] || { price: 150.0, name: symbol };
            return (
              <div 
                key={symbol}
                className="flex items-center gap-3 bg-[#f8f9fa] hover:bg-[#f1f2f4] border border-[#e5e7eb] px-3 py-1.5 rounded-lg transition-all shadow-xs"
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-sm text-[#09090b]">{symbol}</span>
                  <span className="text-[10px] text-[#71717a] font-mono font-medium">({priceInfo.name.split(' ')[0]})</span>
                </div>

                <div className="flex items-center gap-2 border-l border-[#e2e4e8] pl-2.5">
                  <span className="font-mono font-bold text-xs text-[#09090b]">
                    ${priceInfo.price.toFixed(2)}
                  </span>
                  <span className="text-[10px] font-mono text-[#15803d] font-semibold">
                    +{(priceInfo.price * 0.012).toFixed(1)}%
                  </span>
                </div>

                <div className="hidden xl:flex items-center gap-2 border-l border-[#e2e4e8] pl-2.5 text-[10px] font-mono text-[#71717a]">
                  <span>TVL: ${(pool.tvlUSDC / 1000000).toFixed(1)}M</span>
                  <span>•</span>
                  <span>Fee: {pool.feeTierBps / 10000}%</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="hidden 2xl:flex items-center gap-2 text-[11px] font-mono text-[#52525b] shrink-0 font-medium">
          <span className="w-2 h-2 rounded-full bg-[#ff5d38]"></span>
          <span>Uniswap V3 Onchain Depth: <strong className="text-[#09090b]">$22.6M</strong></span>
        </div>
      </div>
    </div>
  );
};
