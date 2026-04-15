'use client';

import { useSyncExternalStore } from 'react';
import { Solar, Lunar } from 'lunar-javascript';
import { translateCanChi, translateZodiac, translateYueXiang } from '@/lib/translate';

const emptySubscribe = () => () => {};

export default function CalendarWidget() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isClient) {
    return (
      <div className="bg-[rgba(20,15,10,0.8)] rounded p-5 border border-[#d4af37]/15 backdrop-blur-md relative overflow-hidden min-h-[250px] flex items-center justify-center">
        <div className="text-[#d4af37] font-mono text-sm opacity-60">Đang tải lịch...</div>
      </div>
    );
  }

  const now = new Date();
  const solar = Solar.fromDate(now);
  const lunar = solar.getLunar();

  const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

  const dateInfo = {
    solarDate: `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`,
    solarDayOfWeek: daysOfWeek[now.getDay()],
    lunarDate: `${lunar.getDay()}`,
    lunarMonth: `${lunar.getMonth()}`,
    lunarYear: `${lunar.getYear()}`,
    canChiNam: translateCanChi(lunar.getYearInGanZhi()),
    canChiThang: translateCanChi(lunar.getMonthInGanZhi()),
    canChiNgay: translateCanChi(lunar.getDayInGanZhi()),
    canChiGio: translateCanChi(lunar.getTimeInGanZhi()),
    zodiacYear: translateZodiac(lunar.getYearShengXiao()),
    zodiacMonth: translateZodiac(lunar.getMonthShengXiao()),
    zodiacDay: translateZodiac(lunar.getDayShengXiao()),
    zodiacTime: translateZodiac(lunar.getTimeShengXiao()),
    yueXiang: translateYueXiang(lunar.getYueXiang()),
  };

  return (
    <div className="bg-[rgba(20,15,10,0.8)] rounded p-5 border border-[#d4af37]/15 backdrop-blur-md relative overflow-hidden">
      
      <div className="flex flex-col gap-6 items-center justify-between relative z-10">
        <div className="text-center w-full">
          <h2 className="text-[14px] uppercase tracking-[2px] text-[#d4af37] border-b border-[#d4af37] pb-2 mb-3 flex justify-between">
            <span>Dương Lịch</span>
            <span className="bg-[#4a0404] text-white px-2 py-0.5 text-[10px] rounded-sm font-mono">HÔM NAY</span>
          </h2>
          <div className="font-mono text-4xl text-[#f9e295] mb-1">
            {dateInfo.solarDate.split('/')[0]}
            <span className="text-2xl opacity-60 mx-1">/</span>
            <span className="text-3xl">{dateInfo.solarDate.split('/')[1]}</span>
          </div>
          <div className="opacity-60 font-mono text-[13px]">{dateInfo.solarDayOfWeek}, Năm {dateInfo.solarDate.split('/')[2]}</div>
        </div>

        <div className="w-full h-px bg-[#d4af37]/20"></div>

        <div className="text-center w-full">
          <h2 className="text-[14px] uppercase tracking-[2px] text-[#d4af37] border-b border-[#d4af37] pb-2 mb-3">Âm Lịch</h2>
          <div className="font-mono text-4xl text-[#f9e295] mb-1">
            {dateInfo.lunarDate}
            <span className="text-2xl opacity-50 mx-1">/</span>
            <span className="text-3xl">{dateInfo.lunarMonth}</span>
          </div>
          <div className="opacity-60 font-mono text-[13px] mb-1">Năm {dateInfo.canChiNam}</div>
          <div className="text-[11px] font-mono text-[#d4af37]/80 uppercase tracking-wider bg-[#d4af37]/10 inline-block px-2 py-1 rounded">
            Nguyệt Tướng: {dateInfo.yueXiang}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[#d4af37]/20 grid grid-cols-2 gap-2 text-center">
        <div className="border border-[#d4af37]/20 p-2 bg-white/5">
          <div className="text-[11px] uppercase text-[#e0d5c1] mb-1 block">Giờ</div>
          <div className="font-bold text-[#f9e295] font-mono text-[13px]">{dateInfo.canChiGio}</div>
          <div className="text-[11px] text-[#e0d5c1]/60 mt-1">{dateInfo.zodiacTime}</div>
        </div>
        <div className="border border-[#d4af37]/20 p-2 bg-white/5">
          <div className="text-[11px] uppercase text-[#e0d5c1] mb-1 block">Ngày</div>
          <div className="font-bold text-[#f9e295] font-mono text-[13px]">{dateInfo.canChiNgay}</div>
          <div className="text-[11px] text-[#e0d5c1]/60 mt-1">{dateInfo.zodiacDay}</div>
        </div>
        <div className="border border-[#d4af37]/20 p-2 bg-white/5">
          <div className="text-[11px] uppercase text-[#e0d5c1] mb-1 block">Tháng</div>
          <div className="font-bold text-[#f9e295] font-mono text-[13px]">{dateInfo.canChiThang}</div>
          <div className="text-[11px] text-[#e0d5c1]/60 mt-1">{dateInfo.zodiacMonth}</div>
        </div>
        <div className="border border-[#d4af37]/20 p-2 bg-white/5">
          <div className="text-[11px] uppercase text-[#e0d5c1] mb-1 block">Năm</div>
          <div className="font-bold text-[#f9e295] font-mono text-[13px]">{dateInfo.canChiNam}</div>
          <div className="text-[11px] text-[#e0d5c1]/60 mt-1">{dateInfo.zodiacYear}</div>
        </div>
      </div>
    </div>
  );
}
