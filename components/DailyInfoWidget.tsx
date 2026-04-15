'use client';

import { useSyncExternalStore } from 'react';
import { Solar } from 'lunar-javascript';
import { translateDirection, translateJieQi, translateZhiXing, translateXiu } from '@/lib/translate';

const emptySubscribe = () => () => {};

export default function DailyInfoWidget() {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);

  if (!isClient) {
    return <div className="bg-[rgba(20,15,10,0.8)] rounded p-5 border border-[#d4af37]/15 min-h-[200px]"></div>;
  }

  const now = new Date();
  const lunar = Solar.fromDate(now).getLunar();

  const xi = translateDirection(lunar.getDayPositionXiDesc());
  const cai = translateDirection(lunar.getDayPositionCaiDesc());
  const fu = translateDirection(lunar.getDayPositionFuDesc());
  const jieQi = translateJieQi(lunar.getJieQi()) || 'Không có';
  const truc = translateZhiXing(lunar.getZhiXing());
  const tu = translateXiu(lunar.getXiu());

  // Pseudo-random percentages for 5 elements based on day
  const dayNum = now.getDate() + now.getMonth() * 31;
  const kim = 20 + (dayNum * 7) % 60;
  const moc = 20 + (dayNum * 13) % 60;
  const thuy = 20 + (dayNum * 17) % 60;
  const hoa = 20 + (dayNum * 23) % 60;
  const tho = 20 + (dayNum * 29) % 60;

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-[rgba(20,15,10,0.8)] rounded p-5 border border-[#d4af37]/15 backdrop-blur-md">
        <div className="text-[14px] uppercase tracking-[2px] text-[#d4af37] border-b border-[#d4af37] pb-2 mb-3 flex justify-between items-center">
          <span>Ngũ Hành & Thần Sát</span>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3 mb-4">
          <div className="border border-[#d4af37]/20 p-2 text-center bg-white/5">
            <span className="text-[11px] uppercase block mb-1 opacity-80">Kim</span>
            <span className="font-bold text-[#f9e295] font-mono">{kim}%</span>
          </div>
          <div className="border border-[#d4af37]/20 p-2 text-center bg-white/5">
            <span className="text-[11px] uppercase block mb-1 opacity-80">Mộc</span>
            <span className="font-bold text-[#f9e295] font-mono">{moc}%</span>
          </div>
          <div className="border border-[#d4af37]/20 p-2 text-center bg-white/5">
            <span className="text-[11px] uppercase block mb-1 opacity-80">Thủy</span>
            <span className="font-bold text-[#f9e295] font-mono">{thuy}%</span>
          </div>
          <div className="border border-[#d4af37]/20 p-2 text-center bg-white/5">
            <span className="text-[11px] uppercase block mb-1 opacity-80">Hỏa</span>
            <span className="font-bold text-[#f9e295] font-mono">{hoa}%</span>
          </div>
          <div className="border border-[#d4af37]/20 p-2 text-center bg-white/5">
            <span className="text-[11px] uppercase block mb-1 opacity-80">Thổ</span>
            <span className="font-bold text-[#f9e295] font-mono">{tho}%</span>
          </div>
          <div className="border border-[#d4af37]/20 p-2 text-center bg-white/5">
            <span className="text-[11px] uppercase block mb-1 opacity-80">Tiết Khí</span>
            <span className="font-bold text-[#ff4500] font-mono text-[11px]">{jieQi}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="border border-[#d4af37]/20 p-2 text-center bg-black/40">
            <span className="text-[11px] uppercase block mb-1 opacity-80 text-[#d4af37]">Trực</span>
            <span className="font-bold text-[#e0d5c1] font-serif tracking-wider">{truc}</span>
          </div>
          <div className="border border-[#d4af37]/20 p-2 text-center bg-black/40">
            <span className="text-[11px] uppercase block mb-1 opacity-80 text-[#d4af37]">Tú</span>
            <span className="font-bold text-[#e0d5c1] font-serif tracking-wider">{tu}</span>
          </div>
        </div>
      </div>

      <div className="bg-[rgba(20,15,10,0.8)] rounded p-5 border border-[#d4af37]/15 backdrop-blur-md">
        <div className="text-[14px] uppercase tracking-[2px] text-[#d4af37] border-b border-[#d4af37] pb-2 mb-3">
          <span>Hướng Xuất Hành</span>
        </div>
        <p className="text-[13px] leading-[1.6] opacity-80 font-serif">
          Hôm nay hướng <strong className="text-[#f9e295]">{xi}</strong> đón Hỷ Thần, hướng <strong className="text-[#f9e295]">{cai}</strong> đón Tài Thần, hướng <strong className="text-[#f9e295]">{fu}</strong> đón Phúc Thần.
        </p>
      </div>
    </div>
  );
}
