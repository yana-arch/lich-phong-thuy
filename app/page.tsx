import CalendarWidget from '@/components/CalendarWidget';
import BatTrachCalculator from '@/components/BatTrachCalculator';
import CompassWidget from '@/components/CompassWidget';
import HeaderInfo from '@/components/HeaderInfo';
import DailyInfoWidget from '@/components/DailyInfoWidget';
import FlyingStarsWidget from '@/components/FlyingStarsWidget';
import RecommendationsWidget from '@/components/RecommendationsWidget';
import AuspiciousHoursWidget from '@/components/AuspiciousHoursWidget';

export default function Home() {
  return (
    <>
      <header className="h-[80px] px-5 md:px-10 flex justify-between items-center border-b border-[#d4af37]/20 bg-gradient-to-b from-black/80 to-transparent sticky top-0 z-50 backdrop-blur-md">
        <div className="text-xl md:text-2xl tracking-[4px] uppercase text-[#d4af37] font-bold drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
          Thiên Địa Vạn Vật
        </div>
        <HeaderInfo />
      </header>

      <main className="flex-1 flex flex-col lg:grid lg:grid-cols-[320px_1fr_320px] xl:grid-cols-[350px_1fr_350px] gap-6 xl:gap-10 p-4 md:p-8 w-full max-w-[1440px] mx-auto items-start">
        {/* Left Column - Order 2 on mobile, 1 on desktop */}
        <aside className="order-2 lg:order-1 flex flex-col gap-6">
          <CalendarWidget />
          <DailyInfoWidget />
          <AuspiciousHoursWidget />
        </aside>
        
        {/* Center Column - Order 1 on mobile, 2 on desktop */}
        <div className="order-1 lg:order-2 flex flex-col items-center justify-start relative min-h-[400px] lg:min-h-[600px] lg:sticky lg:top-[100px] z-10">
          <CompassWidget />
        </div>

        {/* Right Column - Order 3 on mobile, 3 on desktop */}
        <aside className="order-3 lg:order-3 flex flex-col gap-6">
          <BatTrachCalculator />
          <FlyingStarsWidget />
          <RecommendationsWidget />
        </aside>
      </main>

      <footer className="h-[40px] bg-black/50 flex items-center px-10 font-mono text-xs text-[#d4af37] gap-8 mt-auto border-t border-[#d4af37]/10">
        <span>LOCATION: AUTO</span>
        <span>PRECISION: ±0.01°</span>
        <span className="ml-auto">© 2024 CỔ HỌC TINH HOA</span>
      </footer>
    </>
  );
}
