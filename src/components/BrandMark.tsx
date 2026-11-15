import Image from 'next/image';

interface BrandMarkProps {
  size?: number | 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

export function BrandMark({ size = 26, className = '', showText = true }: BrandMarkProps) {
  const pixelSize =
    typeof size === 'number'
      ? size
      : size === 'sm'
      ? 22
      : size === 'lg'
      ? 36
      : 26;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div
        className="relative shrink-0 rounded-lg overflow-hidden border border-[#343A40] bg-[#171F29] shadow-sm flex items-center justify-center transition-all duration-300 hover:border-[#9C8058]/50"
        style={{ width: `${pixelSize}px`, height: `${pixelSize}px` }}
      >
        <Image
          src="/icon.png"
          alt="A logo"
          width={pixelSize}
          height={pixelSize}
          priority
          className="object-contain"
        />
      </div>
      {showText && (
        <span className="font-mono text-xs sm:text-sm font-bold tracking-tight text-[#F1EEE8] flex items-center gap-1.5">
          <span>AMRIT</span>
          <span className="text-[#9C8058] font-normal hidden min-[400px]:inline">/</span>
          <span className="text-[#929BA4] font-normal text-[11px] hidden min-[400px]:inline">SIGNAL</span>
        </span>
      )}
    </div>
  );
}
