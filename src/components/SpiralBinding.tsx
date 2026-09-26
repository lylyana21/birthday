import React from 'react';

interface SpiralBindingProps {
  loopsCount?: number;
  position?: 'center' | 'left';
  className?: string;
}

export function SpiralBinding({ 
  loopsCount = 20, 
  position = 'center',
  className = '' 
}: SpiralBindingProps) {
  const loops = Array.from({ length: loopsCount }, (_, i) => i);

  return (
    <div 
      className={`absolute z-30 pointer-events-none flex flex-col justify-between py-6 ${
        position === 'center' 
          ? 'left-1/2 -translate-x-1/2 w-14 top-0 bottom-0' 
          : 'left-2 md:left-4 w-12 top-0 bottom-0'
      } ${className}`}
    >
      {loops.map((i) => (
        <div key={i} className="relative w-full h-5 flex items-center justify-center">
          {/* Punched holes on left and right of the spine wire */}
          {position === 'center' && (
            <>
              {/* Left hole */}
              <div className="absolute left-1 w-2.5 h-3.5 bg-slate-950/90 rounded-sm shadow-inner" />
              {/* Right hole */}
              <div className="absolute right-1 w-2.5 h-3.5 bg-slate-950/90 rounded-sm shadow-inner" />
            </>
          )}

          {position === 'left' && (
            <div className="absolute left-3 w-2.5 h-3.5 bg-slate-950/90 rounded-sm shadow-inner" />
          )}

          {/* Realistic Twin-Wire Coil */}
          <svg viewBox="0 0 54 22" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id={`wireGrad-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="30%" stopColor="#e2e8f0" />
                <stop offset="65%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
              <linearGradient id={`highlight-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* Top Loop shadow */}
            <path
              d="M 6,11 C 12,3 42,3 48,11"
              fill="none"
              stroke="rgba(0,0,0,0.4)"
              strokeWidth="4"
              strokeLinecap="round"
              transform="translate(0, 2)"
            />
            {/* Top Loop wire */}
            <path
              d="M 6,10 C 12,2 42,2 48,10"
              fill="none"
              stroke={`url(#wireGrad-${i})`}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Specular highlight */}
            <path
              d="M 12,5 C 22,3 32,3 42,5"
              fill="none"
              stroke={`url(#highlight-${i})`}
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Bottom Loop return wire */}
            <path
              d="M 8,14 C 14,20 40,20 46,14"
              fill="none"
              stroke={`url(#wireGrad-${i})`}
              strokeWidth="3.2"
              strokeLinecap="round"
              opacity="0.85"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
