import React from 'react';
import { TrendingUp, Layers } from 'lucide-react';
import { BASE_TOKENIZED_POOLS } from '../engine/uniswapRouter';
import { TOKENIZED_PRICES } from '../engine/agentReasoner';

export const EquityMatrix: React.FC = () => {
  return (
    <div className="bg-[#0e0e14] border-y border-[#202028] py-2.5 px-4 lg:px-8">
      <div className="max-w-[1680px] mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8a8a9a] uppercase font-bold shrink-0">
          <Layers className="w-3.5 h-3.5 text-[#ff5d38]" />
          <span>Base Tokenized Equities:</span>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          {Object.entries(BASE_TOKENIZED_POOLS).map(([symbol, pool]) => {
            const priceInfo = TOKENIZED_PRICES[symbol] || { price: 150.0, name: symbol };
            return (
              <div 
                key={symbol}
                className="flex items-center gap-3 bg-[#14141c] hover:bg-[#181822] border border-[#242432] hover:border-[#ff5d38]/30 px-3 py-1.5 rounded-lg transition-all"
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-sm text-white">{symbol}</span>
                  <span className="text-[10px] text-[#717182] font-mono">({priceInfo.name.split(' ')[0]})</span>
                </div>

                <div className="flex items-center gap-2 border-l border-[#282838] pl-2.5">
                  <span className="font-mono font-bold text-xs text-white">
                    ${priceInfo.price.toFixed(2)}
                  </span>
                  <span className="flex items-center text-[10px] font-mono text-[#22c55e] font-semibold">
                    <TrendingUp className="w-3 h-3 mr-0.5 inline" />
                    +{(priceInfo.price * 0.012).toFixed(1)}%
                  </span>
                </div>

                <div className="hidden xl:flex items-center gap-2 border-l border-[#282838] pl-2.5 text-[10px] font-mono text-[#8e8e9c]">
                  <span>TVL: ${(pool.tvlUSDC / 1000000).toFixed(1)}M</span>
                  <span>•</span>
                  <span>Fee: {pool.feeTierBps / 10000}%</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="hidden 2xl:flex items-center gap-2 text-[11px] font-mono text-[#a0a0b2] shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#22c55e]"></span>
          <span>Uniswap V3 Onchain Depth: <strong className="text-white">$22.6M</strong></span>
        </div>
      </div>
    </div>
  );
};
