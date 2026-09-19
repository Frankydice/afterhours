/**
 * Utilities for detecting TradFi Equity Market Hours (NYSE/Nasdaq)
 * Regular trading: Monday - Friday, 9:30 AM - 4:00 PM Eastern Time (EDT/EST)
 * 
 * When TradFi is closed (Nights, Weekends, Holidays), AfterHours activates its
 * autonomous 24/7 tokenized stock breakout strategy on Base!
 */

export interface MarketHoursStatus {
  isOpen: boolean;
  statusLabel: 'CLOSED_WEEKEND' | 'CLOSED_NIGHT' | 'PRE_MARKET' | 'AFTER_HOURS' | 'OPEN';
  description: string;
  nextBell: string;
  formattedEasternTime: string;
  onchainTradingActive: boolean; // Always true for tokenized stocks on Base!
}

export function getTradFiMarketStatus(mockDate?: Date): MarketHoursStatus {
  const now = mockDate || new Date();
  
  // Format to US Eastern Time
  const easternFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    weekday: 'short',
    hour12: false
  });
  
  const parts = easternFormatter.formatToParts(now);
  const findPart = (type: string) => parts.find(p => p.type === type)?.value || '';
  
  const weekday = findPart('weekday'); // Mon, Tue, Wed, Thu, Fri, Sat, Sun
  const hour = parseInt(findPart('hour'), 10);
  const minute = parseInt(findPart('minute'), 10);
  const totalMinutes = hour * 60 + minute;

  const marketOpen = 9 * 60 + 30; // 9:30 AM = 570 mins
  const marketClose = 16 * 60;    // 4:00 PM = 960 mins
  const preMarketOpen = 4 * 60;   // 4:00 AM = 240 mins
  const afterHoursClose = 20 * 60;// 8:00 PM = 1200 mins

  const isWeekend = weekday === 'Sat' || weekday === 'Sun';
  const easternTimeString = `${weekday} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} EDT`;

  if (isWeekend) {
    return {
      isOpen: false,
      statusLabel: 'CLOSED_WEEKEND',
      description: 'NYSE & Nasdaq Closed for Weekend. TradFi retail completely locked out.',
      nextBell: 'Monday 9:30 AM EDT',
      formattedEasternTime: easternTimeString,
      onchainTradingActive: true
    };
  }

  if (totalMinutes >= marketOpen && totalMinutes < marketClose) {
    return {
      isOpen: true,
      statusLabel: 'OPEN',
      description: 'TradFi Regular Trading Session Active.',
      nextBell: 'Today 4:00 PM EDT (Closing Bell)',
      formattedEasternTime: easternTimeString,
      onchainTradingActive: true
    };
  }

  if (totalMinutes >= preMarketOpen && totalMinutes < marketOpen) {
    return {
      isOpen: false,
      statusLabel: 'PRE_MARKET',
      description: 'TradFi Pre-Market (Illiquid, wide retail spreads).',
      nextBell: 'Today 9:30 AM EDT (Opening Bell)',
      formattedEasternTime: easternTimeString,
      onchainTradingActive: true
    };
  }

  if (totalMinutes >= marketClose && totalMinutes < afterHoursClose) {
    return {
      isOpen: false,
      statusLabel: 'AFTER_HOURS',
      description: 'TradFi After-Hours Session. Corporate 8-K & Earnings Release Window.',
      nextBell: 'Tomorrow 9:30 AM EDT (Opening Bell)',
      formattedEasternTime: easternTimeString,
      onchainTradingActive: true
    };
  }

  return {
    isOpen: false,
    statusLabel: 'CLOSED_NIGHT',
    description: 'TradFi Overnight Closed. Zero TradFi retail execution available.',
    nextBell: 'Today 9:30 AM EDT (Opening Bell)',
    formattedEasternTime: easternTimeString,
    onchainTradingActive: true
  };
}
