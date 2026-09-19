import React from 'react';
import { ShieldCheck, Zap, Award, CheckCircle2, Lock } from 'lucide-react';
import { MarketHoursStatus } from '../engine/marketHours';
import { DynamicServerWalletState } from '../types/wallet';

interface HeaderProps {
  marketStatus: MarketHoursStatus;
  wallet: DynamicServerWalletState;
  onOpenSponsorsModal: () => void;
  openPositionsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  marketStatus,
  wallet,
  onOpenSponsorsModal,
  openPositionsCount
}) => {
  return (
    <header className="border-b border-[#22222a] bg-[#0c0c10]/95 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-3.5">
      <div className="max-w-[1680px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Brand & Mission */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff5d38] to-[#ff3b10] flex items-center justify-center shadow-lg shadow-[#ff5d38]/20 ring-1 ring-white/20">
            <Zap className="w-5 h-5 text-white stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white font-mono">AFTERHOURS</span>
              <span className="bg-[#ff5d38]/15 text-[#ff5d38] text-[11px] font-mono px-2 py-0.5 rounded border border-[#ff5d38]/30 font-semibold">
                BASE L2 • 24/7
              </span>
            </div>
            <p className="text-xs text-[#9a9aa8] hidden sm:block">
              Autonomous Off-Market Catalyst Breakout Engine for Tokenized Equities
            </p>
          </div>
        </div>

        {/* Center: TradFi Market Status vs Onchain Base Status */}
        <div className="flex items-center gap-3 bg-[#13131a] px-3.5 py-1.5 rounded-lg border border-[#272733]">
          <div className="flex items-center gap-2 border-r border-[#2d2d3c] pr-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            <div className="text-left">
              <div className="text-[10px] uppercase font-mono text-[#8a8a9a] font-semibold flex items-center gap-1">
                <Lock className="w-3 h-3 text-amber-400 inline" /> TradFi ({marketStatus.formattedEasternTime})
              </div>
              <div className="text-xs font-mono font-bold text-amber-300">
                NYSE/NASDAQ CLOSED
              </div>
            </div>
          </div>

          <div className="text-left pl-1">
            <div className="text-[10px] uppercase font-mono text-[#8a8a9a] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#22c55e] inline" /> Onchain Liquidity ({openPositionsCount} Active)
            </div>
            <div className="text-xs font-mono font-bold text-[#22c55e]">
              UNISWAP BASE ACTIVE 24/7
            </div>
          </div>
        </div>

        {/* Right: Dynamic Server Wallet & Sponsor Verification Trigger */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Dynamic Server Wallet Pill */}
          <div className="flex items-center gap-2 bg-[#14141d] border border-[#2c2c3c] px-3 py-1.5 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-[#ff5d38] animate-pulse"></div>
            <div className="text-right">
              <div className="text-[10px] text-[#8e8e9c] font-mono flex items-center justify-end gap-1">
                <ShieldCheck className="w-3 h-3 text-[#ff5d38]" /> Dynamic Server Wallet
              </div>
              <div className="text-xs font-mono font-semibold text-white">
                ${wallet.balanceUSDC.toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-[#6c6c7d]">USDC</span>
              </div>
            </div>
          </div>

          {/* Hackathon Sponsor Verification Button */}
          <button
            onClick={onOpenSponsorsModal}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#ff5d38]/20 to-[#ff3b10]/10 hover:from-[#ff5d38]/30 hover:to-[#ff3b10]/20 text-[#ff5d38] border border-[#ff5d38]/40 px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all shadow-sm"
          >
            <Award className="w-4 h-4 text-[#ff5d38]" />
            <span>Sponsor Verification</span>
          </button>
        </div>

      </div>
    </header>
  );
};
