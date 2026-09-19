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
      <div className="flex flex-col h-full bg-white border border-[#e5e7eb] rounded-xl overflow-hidden p-8 items-center justify-center text-center shadow-xs">
        <Cpu className="w-12 h-12 text-[#9ca3af] mb-3" />
        <h3 className="font-mono text-sm font-bold text-[#09090b] mb-1">Agent Standby Mode</h3>
        <p className="text-xs text-[#71717a] max-w-sm">
          Select an off-market catalyst from the left feed or click a "+[TICKER]" button to run the autonomous reasoning loop.
        </p>
      </div>
    );
  }

  const bracket = decision?.bracketParams;

  return (
    <div className="flex flex-col h-full bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-xs">
      
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#e5e7eb] bg-[#fafafa] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#ff5d38]" />
          <h2 className="font-mono text-xs uppercase font-bold tracking-wider text-[#09090b]">
            2. Autonomous Agent Terminal &amp; Risk Sizing
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-[10px] font-mono bg-[#f4f4f6] text-[#09090b] px-2.5 py-0.5 rounded border border-[#e5e7eb] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5d38]"></span>
            EVENT REASONING ENGINE
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
        
        {/* Active Target Banner */}
        <div className="bg-[#f8f9fa] border border-[#e5e7eb] rounded-lg p-3">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black font-mono text-white bg-[#ff5d38] px-2 py-0.5 rounded">
                {selectedCatalyst.ticker}
              </span>
              <span className="text-xs font-mono text-[#52525b] font-bold">
                Target: {selectedCatalyst.tokenizedSymbol} on Base
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-[#09090b]">
              Surprise Delta: +{selectedCatalyst.surprisePercent}%
            </span>
          </div>
          <p className="text-xs text-[#18181b] font-semibold leading-snug">
            {selectedCatalyst.headline}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-[#f8f9fa] border border-[#e5e7eb] p-2.5 rounded-lg text-center">
            <span className="text-[10px] font-mono text-[#71717a] uppercase block mb-0.5 font-medium">Model Confidence</span>
            <div className="text-lg font-mono font-bold text-[#09090b]">
              {decision?.confidenceScore || 92}%
            </div>
          </div>
          <div className="bg-[#f8f9fa] border border-[#e5e7eb] p-2.5 rounded-lg text-center">
            <span className="text-[10px] font-mono text-[#71717a] uppercase block mb-0.5 font-medium">Sentiment Delta</span>
            <div className="text-lg font-mono font-bold text-[#09090b]">
              +{decision?.sentimentScore.toFixed(2) || '0.84'}
            </div>
          </div>
          <div className="bg-[#f8f9fa] border border-[#e5e7eb] p-2.5 rounded-lg text-center">
            <span className="text-[10px] font-mono text-[#71717a] uppercase block mb-0.5 font-medium">Venue Arbitrage</span>
            <div className="text-lg font-mono font-bold text-[#09090b]">
              100% (24/7)
            </div>
          </div>
        </div>

        {/* Chain-of-Thought Reasoning Log */}
        <div className="bg-[#f4f4f6] border border-[#e5e7eb] rounded-lg p-3 font-mono text-[11px] space-y-1.5">
          <div className="text-[#52525b] text-[10px] uppercase font-bold tracking-wider mb-1 flex items-center gap-1.5 border-b border-[#e2e4e8] pb-1">
            <Cpu className="w-3 h-3 text-[#ff5d38]" />
            Chain of Thought &amp; Multi-Gate Verification Log
          </div>
          {isEvaluating ? (
            <div className="flex items-center gap-2 py-4 justify-center text-[#71717a]">
              <RefreshCw className="w-4 h-4 animate-spin text-[#ff5d38]" />
              <span>Analyzing SEC filing &amp; sizing risk bracket...</span>
            </div>
          ) : (
            decision?.reasoning.map((step, idx) => (
              <div key={idx} className="text-[#27272a] flex items-start gap-1.5 leading-relaxed font-medium">
                <span className="text-[#ff5d38] font-bold">›</span>
                <span>{step}</span>
              </div>
            ))
          )}
        </div>

        {/* Definitive Flash Bracket Order Spec */}
        {bracket && (
          <div className="bg-[#f8f9fa] border border-[#e5e7eb] rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-[#09090b] flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#ff5d38]" />
                Definitive Flash Bracket Order Parameters:
              </span>
              <span className="text-[10px] font-mono bg-white border border-[#e5e7eb] text-[#09090b] px-2 py-0.5 rounded font-bold">
                POST /v1/orders/bracket
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
              <div className="bg-white p-2 rounded border border-[#e5e7eb]">
                <span className="text-[#71717a] block text-[10px]">Entry Limit:</span>
                <strong className="text-[#09090b]">${bracket.entryLimitPrice.toFixed(2)}</strong>
              </div>
              <div className="bg-white p-2 rounded border border-[#e5e7eb]">
                <span className="text-[#71717a] block text-[10px]">Take-Profit (+{bracket.takeProfitPercent}%):</span>
                <strong className="text-[#09090b]">${bracket.takeProfitPrice.toFixed(2)}</strong>
              </div>
              <div className="bg-white p-2 rounded border border-[#e5e7eb]">
                <span className="text-[#71717a] block text-[10px]">Stop-Loss ({bracket.stopLossPercent}%):</span>
                <strong className="text-[#09090b]">${bracket.stopLossPrice.toFixed(2)}</strong>
              </div>
              <div className="bg-white p-2 rounded border border-[#e5e7eb]">
                <span className="text-[#71717a] block text-[10px]">Size (Max ${wallet.spendingPolicy.maxPerTradeUSDC}):</span>
                <strong className="text-[#09090b]">${bracket.amountInUSDC.toLocaleString()} USDC</strong>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Signing Proof of Execution */}
        {lastSigningReceipt && (
          <div className="bg-[#f8f9fa] border border-[#e5e7eb] rounded-lg p-2.5 font-mono text-[10px]">
            <div className="flex items-center justify-between text-[#09090b] font-bold mb-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#ff5d38]" /> Dynamic Authorization Receipt:
              </span>
              <span className="text-[#52525b]">Nonce: #{lastSigningReceipt.nonce}</span>
            </div>
            <div className="text-[#52525b] break-all leading-tight">
              Signer: <span className="text-[#09090b] font-semibold">{lastSigningReceipt.signerAddress}</span>
            </div>
            <div className="text-[#52525b] break-all leading-tight mt-0.5">
              Sig: <span className="text-[#09090b] font-semibold">{lastSigningReceipt.signature.slice(0, 36)}...</span>
            </div>
          </div>
        )}

      </div>

      {/* Execution Action Footer */}
      <div className="p-3.5 border-t border-[#e5e7eb] bg-[#fafafa] flex items-center justify-between gap-3">
        <div className="text-[11px] font-mono text-[#71717a] hidden sm:block">
          <span>Target Venue: </span>
          <strong className="text-[#09090b]">Uniswap V3 ({selectedCatalyst.tokenizedSymbol}/USDC)</strong>
        </div>

        <button
          onClick={onExecuteTrade}
          disabled={isExecuting || isEvaluating || !bracket}
          className="w-full sm:w-auto flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-[#ff5d38] hover:bg-[#e04a27] disabled:opacity-50 text-white font-mono font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm transition-all"
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
