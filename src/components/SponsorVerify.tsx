import { X, CheckCircle2, Award, ShieldCheck, Zap, Layers } from 'lucide-react';

interface SponsorVerifyProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SponsorVerify: React.FC<SponsorVerifyProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#0f0f15] border border-[#2b2b3b] rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl shadow-black">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#252535] bg-[#14141e] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-[#ff5d38]" />
            <div>
              <h2 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                Hackathon Sponsor Track Verification Guide
              </h2>
              <p className="text-xs text-[#8e8e9e]">
                Runtime Agent Week 2026 • Code Paths &amp; Requirement Compliance
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8a8a9a] hover:text-white hover:bg-[#20202e] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* 1. Bankr Grand Prize */}
          <div className="bg-[#141420] border border-[#ff5d38]/30 rounded-xl p-4.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="bg-[#ff5d38] text-white text-[11px] font-mono font-black px-2 py-0.5 rounded">
                  BANKR
                </span>
                <h3 className="text-sm font-bold text-white">
                  Grand Prize ($20,000) • "The New Bankrs"
                </h3>
              </div>
              <span className="text-xs font-mono text-[#22c55e] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Qualifies + Bonus Area
              </span>
            </div>
            <p className="text-xs text-[#b4b4c4] leading-relaxed">
              <strong>Official Criteria Match:</strong> Solves a critical financial problem: TradFi retail is locked out of trading after 4:00 PM EST and all weekend, yet major earnings and SEC 8-K filings occur off-hours. AfterHours uses AI reasoning and onchain tokenized stocks on Base to trade these catalysts 24/7.
            </p>
            <div className="bg-[#0b0b10] p-2.5 rounded border border-[#222230] text-[11px] font-mono text-[#ff5d38]">
              ⭐ <strong>Stated Bonus Met:</strong> <em>"Bonus: building around onchain equities receives bonus consideration."</em> (Tokenized NVDAc, bAAPL, bTSLA, bCOIN).
            </div>
          </div>

          {/* 2. Definitive Flash Track */}
          <div className="bg-[#141420] border border-[#262638] rounded-xl p-4.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">
                  Definitive Flash Track ($1,000) • Best Social Trading Build
                </h3>
              </div>
              <span className="text-xs font-mono text-[#22c55e] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Bracket Order Verified
              </span>
            </div>
            <p className="text-xs text-[#b4b4c4] leading-relaxed">
              <strong>Requirement:</strong> Must use one or more Flash advanced order types.
            </p>
            <ul className="text-xs text-[#a0a0b2] space-y-1.5 list-disc list-inside">
              <li>
                <strong>Flash Bracket Order:</strong> Combines entry limit with dual-legged Take-Profit target and Stop-Loss floor.
              </li>
              <li>
                <strong>Monetization:</strong> Integrator fee parameter included (<code className="text-white">integratorFeeBps: 15</code>).
              </li>
              <li>
                <strong>Code Verification:</strong> <code className="text-[#ff5d38]">src/engine/flashRouter.ts</code> (Lines 22-55).
              </li>
            </ul>
          </div>

          {/* 3. Dynamic Track */}
          <div className="bg-[#141420] border border-[#262638] rounded-xl p-4.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#38bdf8]" />
                <h3 className="text-sm font-bold text-white">
                  Dynamic Track ($2,000) • Best Agentic Wallet or Payment Experience
                </h3>
              </div>
              <span className="text-xs font-mono text-[#22c55e] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Server Wallet Pattern
              </span>
            </div>
            <p className="text-xs text-[#b4b4c4] leading-relaxed">
              <strong>Requirement:</strong> Use a documented Dynamic wallet pattern to power a working autonomous decision and execution.
            </p>
            <ul className="text-xs text-[#a0a0b2] space-y-1.5 list-disc list-inside">
              <li>
                <strong>Wallet Pattern:</strong> Dynamic Server Wallet (Headless agent authentication via developer API / session keys).
              </li>
              <li>
                <strong>Spending Policy Envelope:</strong> Hard bounds enforced: max $5,000/trade, $20,000 daily limit, bracket protection mandatory.
              </li>
              <li>
                <strong>Cryptographic Receipts:</strong> Generates verifiable signature logs with nonce and hash for counterparty audit.
              </li>
              <li>
                <strong>Code Verification:</strong> <code className="text-[#ff5d38]">src/engine/dynamicWallet.ts</code> (Lines 21-70).
              </li>
            </ul>
          </div>

          {/* 4. Uniswap Track */}
          <div className="bg-[#141420] border border-[#262638] rounded-xl p-4.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#ec4899]" />
                <h3 className="text-sm font-bold text-white">
                  Uniswap Track ($1,000) • "New Assets, New Agents"
                </h3>
              </div>
              <span className="text-xs font-mono text-[#22c55e] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> FEEDBACK.md Included
              </span>
            </div>
            <p className="text-xs text-[#b4b4c4] leading-relaxed">
              <strong>Requirement:</strong> AI agents trading real-world assets on Uniswap AMM + public repository with FEEDBACK.md.
            </p>
            <ul className="text-xs text-[#a0a0b2] space-y-1.5 list-disc list-inside">
              <li>
                <strong>Target Pools:</strong> Uniswap V3 on Base for Backed/Coinbase wrapped equities (NVDAc, bAAPL, bTSLA, bCOIN paired with USDC).
              </li>
              <li>
                <strong>FEEDBACK.md:</strong> Provided in repository root covering off-hours liquidity, tick range optimization, and developer experience.
              </li>
              <li>
                <strong>Code Verification:</strong> <code className="text-[#ff5d38]">src/engine/uniswapRouter.ts</code> (Lines 15-85) &amp; <code className="text-[#ff5d38]">FEEDBACK.md</code>.
              </li>
            </ul>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-[#252535] bg-[#12121a] flex items-center justify-between">
          <span className="text-xs font-mono text-[#8a8a9a]">
            Project: <strong className="text-white">AfterHours (Runtime NYC 2026)</strong>
          </span>
          <button
            onClick={onClose}
            className="bg-[#242434] hover:bg-[#ff5d38] text-white text-xs font-mono font-bold px-4 py-2 rounded-lg transition-colors"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
