'use client';

import { useSyncExternalStore } from 'react';
import { Solar } from 'lunar-javascript';
import { DI_CHI } from '@/lib/translate';

const emptySubscribe = () => () => {};

export default function AuspiciousHoursWidget() {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);

  if (!isClient) {
    return <div className="bg-[rgba(20,15,10,0.8)] rounded p-5 border border-[#d4af37]/15 min-h-[200px]"></div>;
  }

  const now = new Date();
  const lunar = Solar.fromDate(now).getLunar();
  const times = lunar.getTimes();

  const auspiciousHours = times.filter(t => t.getTianShenType() === '黄道');
  const inauspiciousHours = times.filter(t => t.getTianShenType() === '黑道');

  return (
    <div className="bg-[rgba(20,15,10,0.8)] rounded p-5 border border-[#d4af37]/15 backdrop-blur-md">
      <div className="text-[14px] uppercase tracking-[2px] text-[#d4af37] border-b border-[#d4af37] pb-2 mb-4 flex justify-between items-center">
        <span>Giờ Hoàng Đạo (Tốt)</span>
        <span className="w-2 h-2 rounded-full bg-[#d4af37] shadow-[0_0_5px_#d4af37]"></span>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-6">
        {auspiciousHours.map((t, i) => {
          const zhi = t.getZhi();
          return (
            <div key={i} className="border border-[#d4af37]/30 bg-gradient-to-b from-[#d4af37]/10 to-transparent p-2 rounded text-center flex flex-col justify-center transition-all hover:bg-[#d4af37]/20">
              <div className="font-bold text-[#f9e295] font-mono text-[13px] mb-1">{DI_CHI[zhi] || zhi}</div>
              <div className="text-[10px] text-[#e0d5c1]/70 bg-black/40 rounded px-1 py-0.5 inline-block mx-auto">{t.getMinHm()} - {t.getMaxHm()}</div>
            </div>
          );
        })}
      </div>

      <div className="text-[14px] uppercase tracking-[2px] text-[#ff4500] border-b border-[#ff4500]/30 pb-2 mb-4 flex justify-between items-center">
        <span>Giờ Hắc Đạo (Xấu)</span>
        <span className="w-2 h-2 rounded-full bg-[#ff4500] shadow-[0_0_5px_#ff4500]"></span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {inauspiciousHours.map((t, i) => {
          const zhi = t.getZhi();
          return (
            <div key={i} className="border border-[#ff4500]/20 bg-gradient-to-b from-[#ff4500]/5 to-transparent p-2 rounded text-center flex flex-col justify-center opacity-80">
              <div className="font-bold text-[#ff4500] font-mono text-[13px] mb-1">{DI_CHI[zhi] || zhi}</div>
              <div className="text-[10px] text-[#e0d5c1]/50 bg-black/40 rounded px-1 py-0.5 inline-block mx-auto">{t.getMinHm()} - {t.getMaxHm()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
