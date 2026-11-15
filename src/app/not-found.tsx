import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { TriquetraIcon } from "@/components/CommandPalette";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#090D12] text-[#F1EEE8] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background radial gradient glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#9C8058]/5 blur-[120px] pointer-events-none" 
        aria-hidden="true"
      />

      <div className="max-w-md w-full relative z-10 text-center">
        {/* Brand Header */}
        <div className="flex justify-center mb-6">
          <BrandMark size="lg" />
        </div>

        <div className="corner-hud p-8 rounded-2xl bg-[#121923] border border-[#343A40] shadow-[0_20px_50px_rgba(0,0,0,0.8)] mb-8">
          <p className="text-xs font-mono tracking-widest text-[#9C8058] uppercase mb-2 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9C8058] animate-ping" />
            SIGNAL // 404: CARRIER LOST
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold font-display tracking-tight text-[#F1EEE8] mb-4">
            Route Not Found
          </h1>
          <p className="text-sm text-[#929BA4] leading-relaxed mb-6 font-sans">
            The requested coordinate in this engineering archive does not exist or has shifted across timeline cycles.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#9C8058] text-[#090D12] font-mono font-semibold text-xs hover:bg-[#9C8058]/90 transition-all active:scale-95 shadow-lg shadow-[#9C8058]/20"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Return to Origin</span>
            </Link>
            <Link
              href="/#projects"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#171F29] border border-[#343A40] text-[#F1EEE8] font-mono text-xs hover:border-[#9C8058]/60 hover:text-[#9C8058] transition-all active:scale-95"
            >
              <span>Explore Projects</span>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#929BA4]">
          <TriquetraIcon className="w-3.5 h-3.5 text-[#9C8058]" />
          <span>&ldquo;Der Anfang ist das Ende und das Ende ist der Anfang&rdquo;</span>
        </div>
      </div>
    </div>
  );
}
