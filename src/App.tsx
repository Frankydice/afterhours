import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { EquityMatrix } from './components/EquityMatrix';
import { CatalystFeed } from './components/CatalystFeed';
import { AgentTerminal } from './components/AgentTerminal';
import { PositionBook } from './components/PositionBook';
import { SponsorVerify } from './components/SponsorVerify';
import { INITIAL_CATALYSTS, createSimulatedCatalyst } from './engine/catalystEngine';
import { evaluateCatalyst } from './engine/agentReasoner';
import { INITIAL_DYNAMIC_WALLET, signBracketExecutionWithDynamic } from './engine/dynamicWallet';
import { submitFlashBracketOrder, simulatePriceTick } from './engine/flashRouter';
import { getTradFiMarketStatus } from './engine/marketHours';
import { CatalystEvent } from './types/catalyst';
import { AgentDecision, ActivePosition } from './types/trade';
import { DynamicServerWalletState, DynamicSigningReceipt } from './types/wallet';

export const App: React.FC = () => {
  const [catalysts, setCatalysts] = useState<CatalystEvent[]>(INITIAL_CATALYSTS);
  const [selectedCatalyst, setSelectedCatalyst] = useState<CatalystEvent | null>(INITIAL_CATALYSTS[0]);
  const [decision, setDecision] = useState<AgentDecision | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [wallet, setWallet] = useState<DynamicServerWalletState>(INITIAL_DYNAMIC_WALLET);
  const [lastSigningReceipt, setLastSigningReceipt] = useState<DynamicSigningReceipt | null>(null);
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState<boolean>(false);
  const [marketStatus] = useState(getTradFiMarketStatus());

  // Initial sample active position on TSLA to showcase live bracket tracking immediately
  const [positions, setPositions] = useState<ActivePosition[]>([
    {
      id: 'pos-init-tsla',
      catalystId: 'cat-tsla-earn-02',
      ticker: 'TSLA',
      tokenizedSymbol: 'bTSLA',
      companyName: 'Tesla, Inc.',
      status: 'BRACKET_ACTIVE',
      entryPrice: 248.80,
      currentPrice: 254.40,
      takeProfitPrice: 265.00,
      stopLossPrice: 244.20,
      pnlUsd: 84.00,
      pnlPercent: 2.25,
      shares: 15.0,
      capitalCommittedUSDC: 3732.00,
      flashOrderId: 'flash-brk-tsla-live-09',
      dynamicSignature: '0x9b4c8a2e1f4d7b2c9e6a5f1d8c2b7a4e0f9c2d1b8a3e6f5c8b1c41f3d8e9c2b7',
      dynamicWalletAddress: INITIAL_DYNAMIC_WALLET.address,
      baseTxHash: '0x8f2d5e1c4b7a9d0f9a8f4c2e6b1d8a3f7c9e0b2d4a5f8e1c3b7a9d0f9a8f4c2e',
      createdAt: new Date(Date.now() - 1000 * 60 * 42).toISOString()
    }
  ]);

  // Evaluate the selected catalyst on change
  useEffect(() => {
    if (!selectedCatalyst) return;

    setIsEvaluating(true);
    const timer = setTimeout(() => {
      const evalResult = evaluateCatalyst(selectedCatalyst, wallet.balanceUSDC);
      setDecision(evalResult);
      setIsEvaluating(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [selectedCatalyst, wallet.balanceUSDC]);

  // Price ticker simulation for active positions to showcase bracket triggers
  useEffect(() => {
    const interval = setInterval(() => {
      setPositions(prev =>
        prev.map(pos => {
          if (pos.status !== 'BRACKET_ACTIVE') return pos;
          return simulatePriceTick(pos, 'UP');
        })
      );
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  // Handler: Select catalyst from feed
  const handleSelectCatalyst = (cat: CatalystEvent) => {
    setSelectedCatalyst(cat);
  };

  // Handler: Simulate new filing
  const handleSimulateNewCatalyst = (ticker: 'NVDA' | 'TSLA' | 'AAPL' | 'COIN') => {
    const newCat = createSimulatedCatalyst(ticker);
    setCatalysts(prev => [newCat, ...prev]);
    setSelectedCatalyst(newCat);
  };

  // Handler: Execute trade via Dynamic + Definitive Flash + Uniswap
  const handleExecuteTrade = async () => {
    if (!decision || !decision.bracketParams || isExecuting) return;

    setIsExecuting(true);
    try {
      // Step 1: Dynamic Server Wallet Signs the execution authorization
      const { receipt, updatedWallet } = await signBracketExecutionWithDynamic(
        decision.bracketParams,
        wallet
      );
      setLastSigningReceipt(receipt);
      setWallet(updatedWallet);

      // Step 2: Definitive Flash dispatches the dual-legged Bracket Order to Uniswap Base pool
      const newPosition = await submitFlashBracketOrder(
        decision.bracketParams,
        receipt,
        decision.ticker,
        selectedCatalyst?.companyName || decision.ticker
      );

      setPositions(prev => [newPosition, ...prev]);
    } catch (err: any) {
      alert(`Execution Error: ${err.message || err}`);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#09090b] flex flex-col selection:bg-[#ff5d38] selection:text-white">
      {/* Top Navbar */}
      <Header
        marketStatus={marketStatus}
        wallet={wallet}
        onOpenSponsorsModal={() => setIsSponsorModalOpen(true)}
        openPositionsCount={positions.filter(p => p.status === 'BRACKET_ACTIVE').length}
      />

      {/* Base Tokenized Equities Ticker Bar */}
      <EquityMatrix />

      {/* Main Terminal Grid (3-Column Workspace) */}
      <main className="flex-1 max-w-[1680px] w-full mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Catalyst Ingestion (4 cols) */}
        <section className="lg:col-span-4 h-[720px]">
          <CatalystFeed
            catalysts={catalysts}
            selectedCatalystId={selectedCatalyst?.id || null}
            onSelectCatalyst={handleSelectCatalyst}
            onSimulateNewCatalyst={handleSimulateNewCatalyst}
            isProcessing={isEvaluating || isExecuting}
          />
        </section>

        {/* Center Column: Agent Reasoning Terminal (4 cols) */}
        <section className="lg:col-span-4 h-[720px]">
          <AgentTerminal
            selectedCatalyst={selectedCatalyst}
            decision={decision}
            isEvaluating={isEvaluating}
            isExecuting={isExecuting}
            lastSigningReceipt={lastSigningReceipt}
            onExecuteTrade={handleExecuteTrade}
            wallet={wallet}
          />
        </section>

        {/* Right Column: Active Flash Bracket Orders (4 cols) */}
        <section className="lg:col-span-4 h-[720px]">
          <PositionBook positions={positions} />
        </section>

      </main>

      {/* Footer Info */}
      <footer className="border-t border-[#e5e7eb] bg-white py-3.5 px-6 text-center text-xs font-mono text-[#71717a] flex flex-col sm:flex-row items-center justify-between gap-2 shadow-2xs">
        <div className="flex items-center gap-2">
          <span>RUNTIME AGENT WEEK 2026</span>
          <span>•</span>
          <span className="text-[#09090b] font-bold">AFTERHOURS AGENT</span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span>Tracks: </span>
          <strong className="text-[#09090b]">Bankr Grand Prize ($20k)</strong>
          <span>•</span>
          <strong className="text-[#09090b]">Definitive Flash</strong>
          <span>•</span>
          <strong className="text-[#09090b]">Dynamic</strong>
          <span>•</span>
          <strong className="text-[#09090b]">Uniswap</strong>
        </div>
      </footer>

      {/* Hackathon Sponsor Verification Guide Modal */}
      <SponsorVerify
        isOpen={isSponsorModalOpen}
        onClose={() => setIsSponsorModalOpen(false)}
      />
    </div>
  );
};
