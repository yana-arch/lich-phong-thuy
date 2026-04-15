'use client';

import { useState, useSyncExternalStore } from 'react';
import { Solar } from 'lunar-javascript';

const emptySubscribe = () => () => {};

export default function FlyingStarsWidget() {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const [mode, setMode] = useState<'year' | 'day'>('year');

  if (!isClient) {
    return <div className="bg-[rgba(20,15,10,0.8)] rounded p-5 border border-[#d4af37]/15 min-h-[200px]"></div>;
  }

  const now = new Date();
  const lunar = Solar.fromDate(now).getLunar();
  
  const star = mode === 'year' ? lunar.getYearNineStar() : lunar.getDayNineStar();
  const numStr = star.getNumber();
  
  let n = parseInt(numStr, 10);
  if (isNaN(n)) {
    const map: Record<string, number> = {
      '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9,
      '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9
    };
    n = map[numStr] || 5;
  }

  // Calculate 9 grid (Lo Shu Square path)
  // SE(0), S(1), SW(2)
  // E(3), C(4), W(5)
  // NE(6), N(7), NW(8)
  const grid = [
    (n + 8 - 1) % 9 + 1, // SE
    (n + 4 - 1) % 9 + 1, // S
    (n + 6 - 1) % 9 + 1, // SW
    (n + 7 - 1) % 9 + 1, // E
    n,                   // C
    (n + 2 - 1) % 9 + 1, // W
    (n + 3 - 1) % 9 + 1, // NE
    (n + 5 - 1) % 9 + 1, // N
    (n + 1 - 1) % 9 + 1, // NW
  ];

  const directions = ['ĐN', 'N', 'TN', 'Đ', 'Trung', 'T', 'ĐB', 'B', 'TB'];

  return (
    <div className="bg-[rgba(20,15,10,0.8)] rounded p-5 border border-[#d4af37]/15 backdrop-blur-md">
      <div className="flex justify-between items-center border-b border-[#d4af37] pb-2 mb-4">
        <span className="text-[14px] uppercase tracking-[2px] text-[#d4af37]">Cửu Cung Phi Tinh</span>
        <div className="flex gap-1 bg-black/50 p-1 rounded border border-[#d4af37]/30">
          <button
            onClick={() => setMode('year')}
            className={`px-3 py-1 text-[10px] uppercase tracking-wider font-mono rounded transition-colors ${
              mode === 'year' ? 'bg-[#d4af37] text-black font-bold' : 'text-[#d4af37] hover:bg-[#d4af37]/20'
            }`}
          >
            Năm
          </button>
          <button
            onClick={() => setMode('day')}
            className={`px-3 py-1 text-[10px] uppercase tracking-wider font-mono rounded transition-colors ${
              mode === 'day' ? 'bg-[#d4af37] text-black font-bold' : 'text-[#d4af37] hover:bg-[#d4af37]/20'
            }`}
          >
            Ngày
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-[2px] bg-[#d4af37]/30 p-[2px] border-2 border-[#d4af37]/50 rounded-sm shadow-[0_0_15px_rgba(212,175,55,0.1)]">
        {grid.map((num, idx) => (
          <div 
            key={idx} 
            className={`aspect-square flex flex-col items-center justify-center bg-[rgba(15,10,5,0.95)] transition-colors relative ${
              num === 5 ? 'bg-[#4a0404]/40' : ''
            }`}
          >
            <span className="absolute top-1 left-1 text-[9px] text-[#e0d5c1]/40 font-mono">{directions[idx]}</span>
            <span className={`font-mono text-3xl md:text-4xl ${
              num === 9 || num === 5 ? 'text-[#ff4500] font-bold drop-shadow-[0_0_5px_rgba(255,69,0,0.5)]' : 
              num === 2 ? 'text-[#ff4500]/80' : 'text-[#e0d5c1]'
            }`}>
              {num}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 text-[11px] font-mono text-[#e0d5c1]/60 flex justify-between px-1">
        <span>* Số 5 (Ngũ Hoàng) - Đại Hung</span>
        <span>* Số 9 (Cửu Tử) - Đại Cát</span>
      </div>
    </div>
  );
}
