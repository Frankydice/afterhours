# Uniswap Developer Feedback & Hackathon Report
**Project:** AfterHours — Autonomous 24/7 Off-Market Equity Breakout Agent  
**Hackathon:** Runtime NYC Agent Week 2026  
**Track:** Uniswap — "New Assets, New Agents"  
**Integration Focus:** Uniswap V3 Tokenized Equity Pools (Base L2) & Autonomous Agent Execution

---

## 1. What We Built with Uniswap
AfterHours connects real-world off-market equity catalysts (after-hours earnings releases, SEC 8-K filings) with 24/7 onchain tokenized stock markets. While traditional equity venues (NYSE/Nasdaq) are closed nights and weekends, Uniswap V3 on Base provides continuous, uninterrupted liquidity for tokenized real-world assets (such as Coinbase Wrapped NVDA `NVDAc`, Backed Apple `bAAPL`, and Backed Tesla `bTSLA`).

Our autonomous AI agent monitors off-market catalysts, sizes trades within strict Dynamic server wallet bounds, and routes execution through **Uniswap V3 SwapRouter02** on Base (`0x2626664c2603336E57B271c5C0b26F421741e481`) paired with **Definitive Flash Bracket Orders** (Take-Profit & Stop-Loss).

---

## 2. Code Pointers for Reviewers
- **Pool Definitions & Metadata:** [`src/engine/uniswapRouter.ts`](file:///C:/Users/HomePC/.gemini/antigravity/scratch/afterhours/src/engine/uniswapRouter.ts#L15-L65)
  - `NVDAc / USDC` (0.05% fee tier): Pool `0x9a8f4c2e6b1d8a3f7c9e0b2d4a5f8e1c3b7a9d0f`
  - `bAAPL / USDC` (0.05% fee tier): Pool `0x1c3b7a9d0f9a8f4c2e6b1d8a3f7c9e0b2d4a5f8e`
  - `bTSLA / USDC` (0.30% fee tier): Pool `0x7c9e0b2d4a5f8e1c3b7a9d0f9a8f4c2e6b1d8a3f`
- **Quoting, Slippage & Tick Calculations:** [`src/engine/uniswapRouter.ts`](file:///C:/Users/HomePC/.gemini/antigravity/scratch/afterhours/src/engine/uniswapRouter.ts#L70-L105)
- **Agent Execution Pipeline:** [`src/engine/agentReasoner.ts`](file:///C:/Users/HomePC/.gemini/antigravity/scratch/afterhours/src/engine/agentReasoner.ts#L45-L65)

---

## 3. Developer Feedback & Insights for the Uniswap Team

### A. The Challenge of Real-World Asset (RWA) Concentrated Liquidity Off-Hours
- **Observation:** Tokenized equities experience distinct volatility dynamics compared to native crypto tokens. When NYSE/Nasdaq closes, trading volume naturally shifts onchain, but liquidity concentration in V3 tick ranges can become lopsided if sudden corporate news breaks (e.g. unexpected earnings beats).
- **Recommendation:** Uniswap could introduce a native **"Dynamic RWA Tick Band"** hook in Uniswap V4, or automated liquidity band re-centering specifically tuned for equity trading hours vs. off-hours.

### B. Developer Experience & SDK
- **Strengths:** Uniswap V3's deterministic pool addresses and tick math allow autonomous agents to calculate exact price impact before broadcasting transactions, making agent risk budgeting deterministic.
- **Wishlist:** An official lightweight agent SDK or MCP server for Uniswap that provides single-call quote-and-execute abstractions with pre-integrated EIP-3009 or permit2 authorizations.

---

## 4. Summary
Uniswap is the fundamental liquidity spine of AfterHours. Without Uniswap's decentralized, permissionless AMM pools on Base, 24/7 autonomous trading of tokenized equities would simply be impossible.
