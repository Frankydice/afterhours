import React, { useState } from 'react';
import { Newspaper, Sparkles, Clock, Play } from 'lucide-react';
import { CatalystEvent } from '../types/catalyst';

interface CatalystFeedProps {
  catalysts: CatalystEvent[];
  selectedCatalystId: string | null;
  onSelectCatalyst: (catalyst: CatalystEvent) => void;
  onSimulateNewCatalyst: (ticker: 'NVDA' | 'TSLA' | 'AAPL' | 'COIN') => void;
  isProcessing: boolean;
}

export const CatalystFeed: React.FC<CatalystFeedProps> = ({
  catalysts,
  selectedCatalystId,
  onSelectCatalyst,
  onSimulateNewCatalyst,
  isProcessing
}) => {
  const [filterTicker, setFilterTicker] = useState<string>('ALL');

  const filteredCatalysts = filterTicker === 'ALL'
    ? catalysts
    : catalysts.filter(c => c.ticker === filterTicker);

  return (
    <div className="flex flex-col h-full bg-[#0d0d12] border border-[#22222c] rounded-xl overflow-hidden shadow-lg">
      
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#22222c] bg-[#121218] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-[#ff5d38]" />
          <h2 className="font-mono text-xs uppercase font-bold tracking-wider text-white">
            1. Off-Market Catalysts (SEC &amp; Earnings)
          </h2>
        </div>
        <span className="text-[10px] font-mono text-[#8a8a9a] bg-[#191924] px-2 py-0.5 rounded border border-[#262638]">
          Real-Time WebSocket
        </span>
      </div>

      {/* Simulator Quick-Trigger Bar for Judges */}
      <div className="px-3.5 py-2.5 bg-[#161622] border-b border-[#252535] flex items-center justify-between gap-2 flex-wrap">
        <span className="text-[11px] font-mono text-[#a0a0b2] flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Simulate Off-Hours 8-K Filing:</span>
        </span>
        <div className="flex items-center gap-1.5">
          {(['NVDA', 'TSLA', 'COIN', 'AAPL'] as const).map(ticker => (
            <button
              key={ticker}
              onClick={() => onSimulateNewCatalyst(ticker)}
              disabled={isProcessing}
              className="bg-[#202030] hover:bg-[#ff5d38] hover:text-white disabled:opacity-50 text-[#c8c8d8] text-[10px] font-mono font-bold px-2 py-1 rounded transition-colors border border-[#303042]"
            >
              +{ticker}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-3.5 py-1.5 bg-[#0e0e14] border-b border-[#1f1f2a] flex items-center gap-2 overflow-x-auto text-[11px] font-mono">
        {['ALL', 'NVDA', 'TSLA', 'COIN', 'AAPL'].map(t => (
          <button
            key={t}
            onClick={() => setFilterTicker(t)}
            className={`px-2 py-0.5 rounded transition-colors ${
              filterTicker === t
                ? 'bg-[#ff5d38] text-white font-bold'
                : 'text-[#7e7e90] hover:text-white hover:bg-[#1a1a24]'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Event List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {filteredCatalysts.map(catalyst => {
          const isSelected = selectedCatalystId === catalyst.id;
          const formattedTime = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            month: 'short',
            day: 'numeric'
          }).format(new Date(catalyst.timestamp));

          return (
            <div
              key={catalyst.id}
              onClick={() => onSelectCatalyst(catalyst)}
              className={`p-3 rounded-lg border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#181824] border-[#ff5d38] shadow-md shadow-[#ff5d38]/10 ring-1 ring-[#ff5d38]/40'
                  : 'bg-[#121218] hover:bg-[#151520] border-[#22222e]'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-mono text-xs font-black bg-[#ff5d38]/15 text-[#ff5d38] px-1.5 py-0.5 rounded border border-[#ff5d38]/30">
                    {catalyst.ticker}
                  </span>
                  <span className="text-[10px] font-mono text-[#8a8a9a] uppercase font-semibold">
                    {catalyst.type.replace('_', ' ')}
                  </span>
                  <span className="bg-[#22c55e]/15 text-[#22c55e] text-[9px] font-mono px-1.5 py-0.5 rounded flex items-center gap-0.5 border border-[#22c55e]/30">
                    <Clock className="w-2.5 h-2.5 inline" /> OFF-HOURS
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#6e6e80] shrink-0">
                  {formattedTime}
                </span>
              </div>

              <h4 className="text-xs font-semibold text-white leading-snug mb-1.5 line-clamp-2">
                {catalyst.headline}
              </h4>

              <p className="text-[11px] text-[#9a9aa8] line-clamp-2 leading-relaxed mb-2">
                {catalyst.rawText}
              </p>

              <div className="flex items-center justify-between pt-1.5 border-t border-[#1e1e2a] text-[10px] font-mono">
                <span className="text-[#848496] flex items-center gap-1">
                  Surprise: <strong className="text-[#22c55e]">+{catalyst.surprisePercent}%</strong>
                </span>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCatalyst(catalyst);
                  }}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold font-mono transition-colors ${
                    isSelected
                      ? 'bg-[#ff5d38] text-white'
                      : 'bg-[#222230] text-[#ff5d38] hover:bg-[#ff5d38] hover:text-white'
                  }`}
                >
                  <Play className="w-2.5 h-2.5 fill-current" />
                  <span>{isSelected ? 'ACTIVE IN CONSOLE' : 'RUN AGENT'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
