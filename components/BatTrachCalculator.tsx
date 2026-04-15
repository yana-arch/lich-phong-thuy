'use client';

import { useState } from 'react';
import { calculateBatTrach, Gender, CungMenh } from '@/lib/phongthuy';
import { motion, AnimatePresence } from 'motion/react';

export default function BatTrachCalculator() {
  const [year, setYear] = useState<string>('1990');
  const [gender, setGender] = useState<Gender>('male');
  const [result, setResult] = useState<CungMenh | null>(null);

  const handleCalculate = () => {
    const y = parseInt(year, 10);
    if (isNaN(y) || y < 1900 || y > 2100) {
      alert('Vui lòng nhập năm sinh hợp lệ (1900 - 2100)');
      return;
    }
    const res = calculateBatTrach(y, gender);
    setResult(res);
  };

  return (
    <div className="bg-[rgba(20,15,10,0.8)] rounded p-5 border border-[#d4af37]/15 backdrop-blur-md">
      <div className="text-center mb-6">
        <h2 className="text-[14px] uppercase tracking-[2px] text-[#d4af37] border-b border-[#d4af37] pb-2 mb-3">Trạch Mệnh Chi Tiết</h2>
        <p className="opacity-60 font-mono text-[13px]">Xem cung mệnh và hướng tốt xấu theo năm sinh</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-[11px] uppercase text-[#e0d5c1] mb-1">Năm Sinh (Âm Lịch)</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full bg-black/50 border border-[#d4af37]/30 rounded px-3 py-2.5 text-[#f9e295] font-mono text-[14px] focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/50 outline-none transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"
            placeholder="VD: 1990"
          />
        </div>
        <div className="flex-1">
          <label className="block text-[11px] uppercase text-[#e0d5c1] mb-1">Giới Tính</label>
          <div className="flex gap-2">
            <button
              onClick={() => setGender('male')}
              className={`flex-1 py-2.5 rounded text-[13px] font-mono transition-all border ${
                gender === 'male' 
                  ? 'bg-gradient-to-b from-[#d4af37]/30 to-[#d4af37]/10 border-[#d4af37] text-[#f9e295] shadow-[0_0_10px_rgba(212,175,55,0.2)]' 
                  : 'bg-black/50 border-[#d4af37]/30 text-[#e0d5c1]/60 hover:border-[#d4af37]/60 hover:text-[#e0d5c1]'
              }`}
            >
              Nam
            </button>
            <button
              onClick={() => setGender('female')}
              className={`flex-1 py-2.5 rounded text-[13px] font-mono transition-all border ${
                gender === 'female' 
                  ? 'bg-gradient-to-b from-[#d4af37]/30 to-[#d4af37]/10 border-[#d4af37] text-[#f9e295] shadow-[0_0_10px_rgba(212,175,55,0.2)]' 
                  : 'bg-black/50 border-[#d4af37]/30 text-[#e0d5c1]/60 hover:border-[#d4af37]/60 hover:text-[#e0d5c1]'
              }`}
            >
              Nữ
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full bg-gradient-to-b from-[#6a0505] to-[#4a0404] hover:from-[#8a0a0a] hover:to-[#6a0505] border border-[#ff4500]/50 text-[#f9e295] font-mono py-3 rounded transition-all uppercase tracking-[2px] text-[13px] shadow-[0_4px_15px_rgba(74,4,4,0.5)] active:scale-[0.98]"
      >
        Xem Kết Quả
      </button>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-6 border-t border-[#d4af37]/20">
              <div className="text-center mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-black/50 rounded border border-[#d4af37]/30 mb-4 font-mono text-[13px]">
                  <span className="opacity-60 mr-2">Cung Mệnh:</span>
                  <span className="text-[#ff4500] font-bold">{result.cung}</span>
                  <span className="mx-3 text-[#d4af37]/30">|</span>
                  <span className="opacity-60 mr-2">Ngũ Hành:</span>
                  <span className="text-[#f9e295] font-bold">{result.hanh}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Hướng Tốt */}
                <div>
                  <h3 className="flex items-center justify-between text-[14px] uppercase tracking-[2px] text-[#d4af37] border-b border-[#d4af37] pb-2 mb-3">
                    <span>Hướng Tốt</span>
                    <span className="bg-[#4a0404] text-white px-2 py-0.5 text-[11px] rounded-sm font-mono">CÁT</span>
                  </h3>
                  <div className="space-y-2">
                    {result.huongTot.map((h, i) => (
                      <div key={i} className="bg-white/5 p-3 rounded border border-[#d4af37]/20">
                        <div className="flex justify-between items-center mb-1 font-mono text-[13px]">
                          <span className="font-bold text-[#f9e295]">{h.huong}</span>
                          <span className="text-[11px] font-bold px-2 py-0.5 bg-[#d4af37]/20 text-[#f9e295] rounded">{h.ten}</span>
                        </div>
                        <p className="text-[12px] opacity-80 leading-relaxed font-serif">{h.yNghia}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hướng Xấu */}
                <div>
                  <h3 className="flex items-center justify-between text-[14px] uppercase tracking-[2px] text-[#d4af37] border-b border-[#d4af37] pb-2 mb-3">
                    <span>Hướng Xấu</span>
                    <span className="bg-[#4a0404] text-white px-2 py-0.5 text-[11px] rounded-sm font-mono">HUNG</span>
                  </h3>
                  <div className="space-y-2">
                    {result.huongXau.map((h, i) => (
                      <div key={i} className="bg-white/5 p-3 rounded border border-[#ff4500]/30">
                        <div className="flex justify-between items-center mb-1 font-mono text-[13px]">
                          <span className="font-bold text-[#ff4500]">{h.huong}</span>
                          <span className="text-[11px] font-bold px-2 py-0.5 bg-[#ff4500]/20 text-[#ff4500] rounded">{h.ten}</span>
                        </div>
                        <p className="text-[12px] opacity-80 leading-relaxed font-serif">{h.yNghia}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
