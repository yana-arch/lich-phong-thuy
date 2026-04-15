'use client';

import { useSyncExternalStore } from 'react';
import { Solar } from 'lunar-javascript';
import { translateZodiac, translateYiJi } from '@/lib/translate';

const emptySubscribe = () => () => {};

export default function RecommendationsWidget() {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);

  if (!isClient) {
    return <div className="bg-[rgba(20,15,10,0.8)] rounded p-5 border border-[#d4af37]/15 min-h-[150px]"></div>;
  }

  const now = new Date();
  const lunar = Solar.fromDate(now).getLunar();
  const zodiacDay = translateZodiac(lunar.getDayShengXiao());
  const dayChong = translateZodiac(lunar.getDayChongShengXiao());

  const yiList = lunar.getDayYi().map(translateYiJi);
  const jiList = lunar.getDayJi().map(translateYiJi);

  return (
    <div className="bg-[rgba(20,15,10,0.8)] rounded p-5 border border-[#d4af37]/15 backdrop-blur-md">
      <div className="text-[14px] uppercase tracking-[2px] text-[#d4af37] border-b border-[#d4af37] pb-2 mb-4">
        <span>Khuyến Nghị Trong Ngày</span>
      </div>
      
      <div className="mb-5 bg-white/5 p-3 rounded border border-[#d4af37]/20">
        <p className="text-[13px] opacity-90 font-serif leading-relaxed">
          Ngày <strong className="text-[#f9e295]">{zodiacDay}</strong>, tuổi xung khắc trong ngày là <strong className="text-[#ff4500]">{dayChong}</strong>. Người tuổi {dayChong} nên cẩn trọng trong các việc lớn.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Nên làm */}
        <div>
          <h3 className="flex items-center gap-2 text-[12px] uppercase tracking-[1px] text-[#f9e295] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] shadow-[0_0_5px_#d4af37]"></span>
            Việc Nên Làm
          </h3>
          <ul className="space-y-2">
            {yiList.length > 0 ? yiList.map((item, idx) => (
              <li key={idx} className="text-[12px] font-serif opacity-80 flex items-start">
                <span className="text-[#d4af37] mr-2 mt-0.5">♦</span>
                <span>{item}</span>
              </li>
            )) : (
              <li className="text-[12px] font-serif opacity-50 italic flex items-start">
                <span className="text-[#d4af37] mr-2 mt-0.5">♦</span>
                <span>Không có việc đặc biệt</span>
              </li>
            )}
          </ul>
        </div>

        {/* Kiêng kỵ */}
        <div>
          <h3 className="flex items-center gap-2 text-[12px] uppercase tracking-[1px] text-[#ff4500] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#ff4500] shadow-[0_0_5px_#ff4500]"></span>
            Việc Kiêng Kỵ
          </h3>
          <ul className="space-y-2">
            {jiList.length > 0 ? jiList.map((item, idx) => (
              <li key={idx} className="text-[12px] font-serif opacity-80 flex items-start">
                <span className="text-[#ff4500] mr-2 mt-0.5">♦</span>
                <span>{item}</span>
              </li>
            )) : (
              <li className="text-[12px] font-serif opacity-50 italic flex items-start">
                <span className="text-[#ff4500] mr-2 mt-0.5">♦</span>
                <span>Không có việc đặc biệt</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
