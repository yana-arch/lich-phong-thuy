'use client';

import { useState, useEffect } from 'react';
import { Compass } from 'lucide-react';

export default function CompassWidget() {
  const [heading, setHeading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);

  const requestAccess = async () => {
    setIsRequesting(true);
    try {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          window.addEventListener('deviceorientationabsolute', handleOrientation, true);
        } else {
          setError('Quyền truy cập la bàn bị từ chối.');
        }
      } else {
        // Non-iOS 13+ devices
        window.addEventListener('deviceorientationabsolute', handleOrientation, true);
        // Fallback for devices that don't support absolute
        window.addEventListener('deviceorientation', handleOrientation, true);
      }
    } catch (err) {
      setError('Không thể truy cập la bàn trên thiết bị này.');
    }
    setIsRequesting(false);
  };

  const handleOrientation = (event: any) => {
    let compassHeading = null;
    if (event.webkitCompassHeading) {
      // Apple devices
      compassHeading = event.webkitCompassHeading;
    } else if (event.absolute && event.alpha !== null) {
      // Android devices
      compassHeading = 360 - event.alpha;
    }

    if (compassHeading !== null) {
      setHeading(compassHeading);
    }
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('deviceorientationabsolute', handleOrientation, true);
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, []);

  const getDirectionName = (degree: number) => {
    const directions = ['Bắc', 'Đông Bắc', 'Đông', 'Đông Nam', 'Nam', 'Tây Nam', 'Tây', 'Tây Bắc'];
    const index = Math.round(degree / 45) % 8;
    return directions[index];
  };

  const mountains24 = [
    'Tý', 'Quý', 'Sửu', 'Cấn', 'Dần', 'Giáp', 'Mão', 'Ất', 'Thìn', 'Tốn', 'Tỵ', 'Bính',
    'Ngọ', 'Đinh', 'Mùi', 'Khôn', 'Thân', 'Canh', 'Dậu', 'Tân', 'Tuất', 'Càn', 'Hợi', 'Nhâm'
  ];

  const trigrams = [
    { name: 'KHẢM', deg: 0 },
    { name: 'CẤN', deg: 45 },
    { name: 'CHẤN', deg: 90 },
    { name: 'TỐN', deg: 135 },
    { name: 'LY', deg: 180 },
    { name: 'KHÔN', deg: 225 },
    { name: 'ĐOÀI', deg: 270 },
    { name: 'CÀN', deg: 315 }
  ];

  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[400px]">
      <div className="relative z-10 text-center w-full flex flex-col items-center justify-center">
        {heading === null ? (
          <div className="flex flex-col items-center bg-[rgba(20,15,10,0.8)] p-8 md:p-12 rounded-2xl border border-[#d4af37]/20 backdrop-blur-md w-full max-w-[500px] shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <h2 className="text-[16px] uppercase tracking-[3px] text-[#d4af37] border-b border-[#d4af37]/50 pb-3 mb-8 w-full text-center font-serif">La Bàn Phong Thủy</h2>
            
            <div className="w-56 h-56 md:w-72 md:h-72 rounded-full border border-[#d4af37]/30 flex items-center justify-center mb-8 bg-[#0a0a0a] shadow-[inset_0_0_50px_rgba(212,175,55,0.05)] relative group">
              {/* Decorative Rings */}
              <div className="absolute inset-2 rounded-full border border-[#d4af37]/10 border-dashed animate-[spin_60s_linear_infinite]"></div>
              <div className="absolute inset-6 rounded-full border border-[#d4af37]/10 animate-[spin_40s_linear_infinite_reverse]"></div>
              <div className="absolute inset-10 rounded-full border border-[#d4af37]/5"></div>
              
              <Compass className="w-20 h-20 md:w-24 md:h-24 text-[#d4af37] opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
            </div>

            {error ? (
              <p className="text-[#ff4500] text-[13px] font-mono mb-4">{error}</p>
            ) : (
              <p className="opacity-60 text-[13px] font-mono mb-6 max-w-xs text-center">
                Sử dụng điện thoại của bạn để xem hướng thực tế.
              </p>
            )}
            <button
              onClick={requestAccess}
              disabled={isRequesting}
              className="bg-gradient-to-b from-[#6a0505] to-[#4a0404] hover:from-[#8a0a0a] hover:to-[#6a0505] border border-[#ff4500]/50 text-[#f9e295] font-mono py-3 px-8 rounded transition-all uppercase tracking-[2px] text-[13px] shadow-[0_4px_15px_rgba(74,4,4,0.5)] active:scale-[0.98]"
            >
              {isRequesting ? 'Đang kết nối...' : 'Bật La Bàn'}
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="relative w-[320px] h-[320px] md:w-[480px] md:h-[480px] rounded-full bg-[#111] border-[8px] md:border-[12px] border-[#222] shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_0_30px_rgba(212,175,55,0.1)] flex items-center justify-center mb-8">
              {/* Rings */}
              <div className="absolute rounded-full border border-[#d4af37]/30 w-[90%] h-[90%]"></div>
              <div className="absolute rounded-full border border-[#d4af37]/30 w-[75%] h-[75%]"></div>
              <div className="absolute rounded-full border border-[#d4af37]/30 w-[60%] h-[60%]"></div>
              <div className="absolute rounded-full border-2 border-[#d4af37] w-[25%] h-[25%] bg-[radial-gradient(circle,#333,#000)] z-10"></div>
              
              {/* Compass Ring that rotates */}
              <div 
                className="absolute inset-0 rounded-full transition-transform duration-100 ease-out z-0"
                style={{ transform: `rotate(${-heading}deg)` }}
              >
                {/* 360 Degree Tick marks */}
                {[...Array(72)].map((_, i) => (
                  <div 
                    key={`tick-${i}`}
                    className="absolute inset-0 flex justify-center pt-1"
                    style={{ transform: `rotate(${i * 5}deg)` }}
                  >
                    <div className={`w-[1px] ${i % 9 === 0 ? 'h-3 md:h-4 bg-[#ff4500]' : i % 3 === 0 ? 'h-2 md:h-3 bg-[#d4af37]' : 'h-1.5 md:h-2 bg-[#d4af37]/40'}`}></div>
                  </div>
                ))}

                {/* 24 Mountains Ring */}
                {mountains24.map((mountain, i) => (
                  <div
                    key={`m24-${i}`}
                    className="absolute inset-0 flex justify-center"
                    style={{ transform: `rotate(${i * 15}deg)` }}
                  >
                    <span className="mt-5 md:mt-7 text-[#e0d5c1] font-bold text-[10px] md:text-[13px]">
                      {mountain}
                    </span>
                  </div>
                ))}

                {/* 8 Trigrams Ring */}
                {trigrams.map((trigram, i) => (
                  <div
                    key={`tri-${i}`}
                    className="absolute inset-0 flex justify-center"
                    style={{ transform: `rotate(${trigram.deg}deg)` }}
                  >
                    <span className={`mt-11 md:mt-16 font-bold text-[12px] md:text-[16px] tracking-widest ${trigram.deg === 180 ? 'text-[#ff4500]' : 'text-[#d4af37]'}`}>
                      {trigram.name}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Center Needle */}
              <div className="absolute w-1 h-[40%] bg-gradient-to-b from-[#ff4500] 50%, to-white 50% z-20 shadow-[0_0_15px_rgba(255,69,0,0.4)]"></div>
              
              {/* Fixed Crosshair */}
              <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#ff4500]/30 z-10"></div>
              <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#ff4500]/30 z-10"></div>
              
              {/* North Pointer Arrow (Fixed at top) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[16px] border-l-transparent border-r-transparent border-b-[#ff4500] z-20"></div>
            </div>

            <div className="bg-[rgba(20,15,10,0.8)] border border-[#d4af37]/15 px-6 py-3 rounded backdrop-blur-md flex items-center gap-4">
              <div className="text-3xl font-mono text-[#f9e295]">
                {Math.round(heading)}°
              </div>
              <div className="w-px h-8 bg-[#d4af37]/30"></div>
              <div className="text-lg text-[#d4af37] font-bold uppercase tracking-widest">
                {getDirectionName(heading)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
