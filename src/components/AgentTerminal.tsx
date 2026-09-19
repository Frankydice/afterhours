import { Terminal, Cpu, ShieldCheck, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { CatalystEvent } from '../types/catalyst';
import { AgentDecision } from '../types/trade';
import { DynamicServerWalletState, DynamicSigningReceipt } from '../types/wallet';

interface AgentTerminalProps {
  selectedCatalyst: CatalystEvent | null;
  decision: AgentDecision | null;
  isEvaluating: boolean;
  isExecuting: boolean;
  lastSigningReceipt: DynamicSigningReceipt | null;
  onExecuteTrade: () => void;
  wallet: DynamicServerWalletState;
}

export const AgentTerminal: React.FC<AgentTerminalProps> = ({
  selectedCatalyst,
  decision,
  isEvaluating,
  isExecuting,
  lastSigningReceipt,
  onExecuteTrade,
  wallet
}) => {
  if (!selectedCatalyst) {
    return (
      <div className="flex flex-col h-full bg-[#0d0d12] border border-[#22222c] rounded-xl overflow-hidden p-8 items-center justify-center text-center">
        <Cpu className="w-12 h-12 text-[#353545] mb-3" />
        <h3 className="font-mono text-sm font-bold text-white mb-1">Agent Standby Mode</h3>
        <p className="text-xs text-[#7e7e90] max-w-sm">
          Select an off-market catalyst from the left feed or click a "+[TICKER]" button to run the autonomous reasoning loop.
        </p>
      </div>
    );
  }

  const bracket = decision?.bracketParams;

  return (
    <div className="flex flex-col h-full bg-[#0d0d12] border border-[#22222c] rounded-xl overflow-hidden shadow-lg">
      
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#22222c] bg-[#121218] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#ff5d38]" />
          <h2 className="font-mono text-xs uppercase font-bold tracking-wider text-white">
            2. Autonomous Agent Terminal &amp; Risk Synthesizer
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-[10px] font-mono bg-[#ff5d38]/10 text-[#ff5d38] px-2 py-0.5 rounded border border-[#ff5d38]/30 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5d38] animate-ping"></span>
            GEMINI 1.5 PRO REASONER
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* Active Target Banner */}
        <div className="bg-[#14141e] border border-[#262638] rounded-lg p-3">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black font-mono text-white bg-[#ff5d38] px-2 py-0.5 rounded">
                {selectedCatalyst.ticker}
              </span>
              <span className="text-xs font-mono text-[#a8a8ba] font-bold">
                Target: {selectedCatalyst.tokenizedSymbol} on Base
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-[#22c55e]">
              Fundamental Surprise: +{selectedCatalyst.surprisePercent}%
            </span>
          </div>
          <p className="text-xs text-[#c8c8d8] font-medium leading-snug">
            {selectedCatalyst.headline}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-[#13131c] border border-[#232332] p-2.5 rounded-lg text-center">
            <span className="text-[10px] font-mono text-[#78788a] uppercase block mb-0.5">Model Confidence</span>
            <div className="text-lg font-mono font-bold text-white">
              {decision?.confidenceScore || 92}%
            </div>
          </div>
          <div className="bg-[#13131c] border border-[#232332] p-2.5 rounded-lg text-center">
            <span className="text-[10px] font-mono text-[#78788a] uppercase block mb-0.5">Sentiment Delta</span>
            <div className="text-lg font-mono font-bold text-[#22c55e]">
              +{decision?.sentimentScore.toFixed(2) || '0.84'}
            </div>
          </div>
          <div className="bg-[#13131c] border border-[#232332] p-2.5 rounded-lg text-center">
            <span className="text-[10px] font-mono text-[#78788a] uppercase block mb-0.5">Venue Arbitrage</span>
            <div className="text-lg font-mono font-bold text-amber-400">
              100% (24/7)
            </div>
          </div>
        </div>

        {/* Chain-of-Thought Reasoning Log */}
        <div className="bg-[#09090d] border border-[#22222e] rounded-lg p-3 font-mono text-[11px] space-y-1.5">
          <div className="text-[#8e8e9c] text-[10px] uppercase font-bold tracking-wider mb-1 flex items-center gap-1.5 border-b border-[#1b1b26] pb-1">
            <Cpu className="w-3 h-3 text-[#ff5d38]" />
            Chain of Thought &amp; Multi-Gate Verification Log
          </div>
          {isEvaluating ? (
            <div className="flex items-center gap-2 py-4 justify-center text-[#a0a0b2]">
              <RefreshCw className="w-4 h-4 animate-spin text-[#ff5d38]" />
              <span>Analyzing SEC filing &amp; sizing risk bracket...</span>
            </div>
          ) : (
            decision?.reasoning.map((step, idx) => (
              <div key={idx} className="text-[#c2c2d4] flex items-start gap-1.5 leading-relaxed">
                <span className="text-[#ff5d38] font-bold">›</span>
                <span>{step}</span>
              </div>
            ))
          )}
        </div>

        {/* Definitive Flash Bracket Order Spec */}
        {bracket && (
          <div className="bg-[#141420] border border-[#28283c] rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#ff5d38]" />
                Definitive Flash Bracket Order Parameters:
              </span>
              <span className="text-[10px] font-mono bg-[#ff5d38]/20 text-[#ff5d38] px-2 py-0.5 rounded font-bold">
                POST /v1/orders/bracket
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
              <div className="bg-[#0f0f17] p-2 rounded border border-[#202030]">
                <span className="text-[#7a7a8c] block text-[10px]">Entry Limit:</span>
                <strong className="text-white">${bracket.entryLimitPrice.toFixed(2)}</strong>
              </div>
              <div className="bg-[#0f0f17] p-2 rounded border border-[#202030]">
                <span className="text-[#7a7a8c] block text-[10px]">Take-Profit (+{bracket.takeProfitPercent}%):</span>
                <strong className="text-[#22c55e]">${bracket.takeProfitPrice.toFixed(2)}</strong>
              </div>
              <div className="bg-[#0f0f17] p-2 rounded border border-[#202030]">
                <span className="text-[#7a7a8c] block text-[10px]">Stop-Loss ({bracket.stopLossPercent}%):</span>
                <strong className="text-rose-400">${bracket.stopLossPrice.toFixed(2)}</strong>
              </div>
              <div className="bg-[#0f0f17] p-2 rounded border border-[#202030]">
                <span className="text-[#7a7a8c] block text-[10px]">Size (Max ${wallet.spendingPolicy.maxPerTradeUSDC}):</span>
                <strong className="text-white">${bracket.amountInUSDC.toLocaleString()} USDC</strong>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Signing Proof of Execution */}
        {lastSigningReceipt && (
          <div className="bg-[#10141a] border border-[#1e2a38] rounded-lg p-2.5 font-mono text-[10px]">
            <div className="flex items-center justify-between text-[#38bdf8] font-bold mb-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#38bdf8]" /> Dynamic Cryptographic Authorization Receipt:
              </span>
              <span className="text-[#7dd3fc]">Nonce: #{lastSigningReceipt.nonce}</span>
            </div>
            <div className="text-[#94a3b8] break-all leading-tight">
              Signer: <span className="text-white">{lastSigningReceipt.signerAddress}</span>
            </div>
            <div className="text-[#94a3b8] break-all leading-tight mt-0.5">
              Sig: <span className="text-white">{lastSigningReceipt.signature.slice(0, 36)}...</span>
            </div>
          </div>
        )}

      </div>

      {/* Execution Action Footer */}
      <div className="p-3.5 border-t border-[#22222c] bg-[#121218] flex items-center justify-between gap-3">
        <div className="text-[11px] font-mono text-[#8a8a9c] hidden sm:block">
          <span>Target Venue: </span>
          <strong className="text-white">Uniswap V3 ({selectedCatalyst.tokenizedSymbol}/USDC)</strong>
        </div>

        <button
          onClick={onExecuteTrade}
          disabled={isExecuting || isEvaluating || !bracket}
          className="w-full sm:w-auto flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff5d38] to-[#ff3b10] hover:from-[#ff6e4d] hover:to-[#ff4c24] disabled:opacity-50 text-white font-mono font-bold text-xs px-5 py-2.5 rounded-lg shadow-lg shadow-[#ff5d38]/25 transition-all"
        >
          {isExecuting ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Signing Dynamic &amp; Routing Flash Bracket...</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 fill-current" />
              <span>EXECUTE AFTERHOURS BRACKET ORDER</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

    </div>
  );
};
