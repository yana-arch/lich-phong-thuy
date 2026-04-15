'use client';

import { useState, useEffect } from 'react';
import { Solar } from 'lunar-javascript';
import { translateCanChi } from '@/lib/translate';

export default function HeaderInfo() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => {
      setNow(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  if (!now) {
    return (
      <div className="hidden md:flex gap-5 font-mono text-sm opacity-60">
        <span>Đang tính toán...</span>
      </div>
    );
  }

  const lunar = Solar.fromDate(now).getLunar();

  return (
    <div className="hidden md:flex gap-5 font-mono text-sm opacity-80">
      <span>{now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
      <span className="text-[#d4af37]/50">|</span>
      <span>Giờ: <strong className="text-[#d4af37]">{translateCanChi(lunar.getTimeInGanZhi())}</strong></span>
      <span>Ngày: <strong className="text-[#d4af37]">{translateCanChi(lunar.getDayInGanZhi())}</strong></span>
    </div>
  );
}
