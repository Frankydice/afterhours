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
    <div className="flex flex-col h-full bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-xs">
      
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#e5e7eb] bg-[#fafafa] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-[#ff5d38]" />
          <h2 className="font-mono text-xs uppercase font-bold tracking-wider text-[#09090b]">
            1. Off-Market Catalysts (SEC &amp; Earnings)
          </h2>
        </div>
        <span className="text-[10px] font-mono text-[#71717a] bg-[#f4f4f6] px-2 py-0.5 rounded border border-[#e5e7eb] font-medium">
          Real-Time Feed
        </span>
      </div>

      {/* Simulator Quick-Trigger Bar for Judges */}
      <div className="px-3.5 py-2.5 bg-[#f8f9fa] border-b border-[#e5e7eb] flex items-center justify-between gap-2 flex-wrap">
        <span className="text-[11px] font-mono text-[#52525b] flex items-center gap-1 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#ff5d38]" />
          <span>Simulate Off-Hours 8-K Filing:</span>
        </span>
        <div className="flex items-center gap-1.5">
          {(['NVDA', 'TSLA', 'COIN', 'AAPL'] as const).map(ticker => (
            <button
              key={ticker}
              onClick={() => onSimulateNewCatalyst(ticker)}
              disabled={isProcessing}
              className="bg-white hover:bg-[#ff5d38] hover:text-white disabled:opacity-50 text-[#09090b] text-[10px] font-mono font-bold px-2.5 py-1 rounded transition-colors border border-[#e5e7eb] shadow-2xs"
            >
              +{ticker}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-3.5 py-1.5 bg-white border-b border-[#e5e7eb] flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono">
        {['ALL', 'NVDA', 'TSLA', 'COIN', 'AAPL'].map(t => (
          <button
            key={t}
            onClick={() => setFilterTicker(t)}
            className={`px-2.5 py-1 rounded transition-colors ${
              filterTicker === t
                ? 'bg-[#09090b] text-white font-bold'
                : 'text-[#71717a] hover:text-[#09090b] hover:bg-[#f4f4f6]'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Event List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-[#fcfcfd]">
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
              className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#fff9f8] border-[#ff5d38] shadow-sm ring-1 ring-[#ff5d38]/30'
                  : 'bg-white hover:bg-[#fafafa] border-[#e5e7eb]'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-mono text-xs font-black bg-[#ff5d38] text-white px-1.5 py-0.5 rounded">
                    {catalyst.ticker}
                  </span>
                  <span className="text-[10px] font-mono text-[#52525b] uppercase font-semibold bg-[#f4f4f6] px-1.5 py-0.5 rounded border border-[#e5e7eb]">
                    {catalyst.type.replace('_', ' ')}
                  </span>
                  <span className="bg-[#f4f4f6] text-[#52525b] text-[9px] font-mono px-1.5 py-0.5 rounded flex items-center gap-0.5 border border-[#e5e7eb] font-medium">
                    <Clock className="w-2.5 h-2.5 inline text-[#71717a]" /> OFF-HOURS
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#71717a] shrink-0 font-medium">
                  {formattedTime}
                </span>
              </div>

              <h4 className="text-xs font-bold text-[#09090b] leading-snug mb-1.5 line-clamp-2">
                {catalyst.headline}
              </h4>

              <p className="text-[11px] text-[#52525b] line-clamp-2 leading-relaxed mb-2.5 font-normal">
                {catalyst.rawText}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-[#f1f2f4] text-[10px] font-mono">
                <span className="text-[#52525b] font-medium">
                  Surprise: <strong className="text-[#09090b] font-bold">+{catalyst.surprisePercent}%</strong>
                </span>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCatalyst(catalyst);
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold font-mono transition-colors ${
                    isSelected
                      ? 'bg-[#ff5d38] text-white'
                      : 'bg-[#f4f4f6] text-[#09090b] hover:bg-[#09090b] hover:text-white border border-[#e5e7eb]'
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
