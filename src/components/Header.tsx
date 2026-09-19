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
    <header className="border-b border-[#e5e7eb] bg-white sticky top-0 z-40 px-4 lg:px-8 py-3.5 shadow-sm">
      <div className="max-w-[1680px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Brand & Mission */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#ff5d38] flex items-center justify-center shadow-sm">
            <Zap className="w-5 h-5 text-white stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-[#09090b] font-mono">AFTERHOURS</span>
              <span className="bg-[#fff2ee] text-[#ff5d38] text-[11px] font-mono px-2 py-0.5 rounded border border-[#ffcdbf] font-bold">
                BASE L2 • 24/7
              </span>
            </div>
            <p className="text-xs text-[#52525b] hidden sm:block font-medium">
              Autonomous Off-Market Catalyst Breakout Engine for Tokenized Equities
            </p>
          </div>
        </div>

        {/* Center: TradFi Market Status vs Onchain Base Status */}
        <div className="flex items-center gap-3 bg-[#f4f4f6] px-3.5 py-1.5 rounded-lg border border-[#e5e7eb]">
          <div className="flex items-center gap-2 border-r border-[#e0e0e4] pr-3">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#71717a]"></span>
            </span>
            <div className="text-left">
              <div className="text-[10px] uppercase font-mono text-[#71717a] font-semibold flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#71717a] inline" /> TradFi ({marketStatus.formattedEasternTime})
              </div>
              <div className="text-xs font-mono font-bold text-[#09090b]">
                NYSE/NASDAQ CLOSED
              </div>
            </div>
          </div>

          <div className="text-left pl-1">
            <div className="text-[10px] uppercase font-mono text-[#71717a] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#09090b] inline" /> Onchain Liquidity ({openPositionsCount} Active)
            </div>
            <div className="text-xs font-mono font-bold text-[#09090b]">
              UNISWAP BASE ACTIVE 24/7
            </div>
          </div>
        </div>

        {/* Right: Dynamic Server Wallet & Sponsor Verification Trigger */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Dynamic Server Wallet Pill */}
          <div className="flex items-center gap-2.5 bg-[#f4f4f6] border border-[#e5e7eb] px-3 py-1.5 rounded-lg">
            <ShieldCheck className="w-4 h-4 text-[#ff5d38]" />
            <div className="text-right">
              <div className="text-[10px] text-[#71717a] font-mono font-medium">
                Dynamic Server Wallet
              </div>
              <div className="text-xs font-mono font-bold text-[#09090b]">
                ${wallet.balanceUSDC.toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-[#a1a1aa] font-normal">USDC</span>
              </div>
            </div>
          </div>

          {/* Hackathon Sponsor Verification Button */}
          <button
            onClick={onOpenSponsorsModal}
            className="flex items-center gap-1.5 bg-white hover:bg-[#f4f4f6] text-[#09090b] hover:text-[#ff5d38] border border-[#e5e7eb] hover:border-[#ff5d38]/50 px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all shadow-sm"
          >
            <Award className="w-4 h-4 text-[#ff5d38]" />
            <span>Sponsor Verification</span>
          </button>
        </div>

      </div>
    </header>
  );
};
