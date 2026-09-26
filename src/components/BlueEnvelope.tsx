import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { sfx } from '../utils/audio';

interface BlueEnvelopeProps {
  recipientName: string;
  birthDate?: string;
  envelopePhoto?: string;
  onPhotoChange?: (newPhotoUrl: string) => void;
  onOpenEnvelope?: () => void;
}

// Line art gift box popping out confetti ribbons (as in Image 1 & 2)
export function GiftBoxDoodle({ className = '', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Box base */}
      <rect x="25" y="48" width="45" height="42" rx="3" />
      {/* Ribbon vertical */}
      <line x1="47.5" y1="48" x2="47.5" y2="90" />
      {/* Box Lid tilted to the left */}
      <g transform="rotate(-18 20 40)">
        <rect x="18" y="38" width="50" height="12" rx="2" />
        {/* Bow knot */}
        <path d="M 38,38 C 30,26 22,34 38,37" />
        <path d="M 48,38 C 56,26 64,34 48,37" />
        <circle cx="43" cy="37" r="2.5" />
      </g>
      {/* Bursting curly streamers & confetti */}
      <path d="M 32,40 C 25,28 15,30 20,18 C 22,14 28,15 26,10" strokeDasharray="1 0" />
      <path d="M 48,38 C 45,22 55,20 48,8" />
      <path d="M 60,40 C 65,26 78,28 72,14 C 70,10 75,6 80,8" />
      {/* Floating confetti dots and curls */}
      <path d="M 38,20 C 42,16 46,22 42,26" />
      <path d="M 58,22 C 63,18 67,23 63,27" />
      <circle cx="28" cy="26" r="1.5" fill={color} />
      <circle cx="68" cy="18" r="1.5" fill={color} />
      <circle cx="50" cy="14" r="1.5" fill={color} />
    </svg>
  );
}

// Line art trio of balloons tied together (as in Image 1 & 2)
export function BalloonsDoodle({ className = '', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 130" fill="none" className={className} stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Left balloon */}
      <ellipse cx="32" cy="40" rx="18" ry="22" />
      <path d="M 32,62 L 30,66 L 34,66 Z" fill={color} />
      {/* Center balloon (higher) */}
      <ellipse cx="55" cy="28" rx="20" ry="24" />
      <path d="M 55,52 L 53,56 L 57,56 Z" fill={color} />
      {/* Right balloon */}
      <ellipse cx="74" cy="46" rx="16" ry="20" />
      <path d="M 74,66 L 72,70 L 76,70 Z" fill={color} />
      {/* Curving strings meeting at knot */}
      <path d="M 32,66 C 36,80 44,95 50,110" />
      <path d="M 55,56 C 54,75 52,95 50,110" />
      <path d="M 74,70 C 68,85 58,98 50,110" />
      {/* Tied bow at the bottom */}
      <path d="M 50,110 C 44,115 42,122 46,126" />
      <path d="M 50,110 C 56,115 58,122 54,126" />
    </svg>
  );
}

// Golden wax seal with textured edge and realistic specular highlight
export function GoldWaxSeal({ className = '', isHovered = false }: { className?: string; isHovered?: boolean }) {
  return (
    <div className={`relative select-none ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.45)]">
        <defs>
          <radialGradient id="waxGoldGrad" cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#fff3b0" />
            <stop offset="35%" stopColor="#e5b839" />
            <stop offset="70%" stopColor="#b88618" />
            <stop offset="100%" stopColor="#6e4f0a" />
          </radialGradient>
          <linearGradient id="innerRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#d4a326" />
            <stop offset="100%" stopColor="#4a3404" />
          </linearGradient>
        </defs>
        
        {/* Organic melted wax edge */}
        <path
          d="M 50,4 
             C 62,3 74,10 82,18 
             C 90,26 97,38 96,50 
             C 95,62 88,74 80,82 
             C 72,90 60,97 48,96 
             C 36,95 24,88 16,80 
             C 8,72 3,60 4,48 
             C 5,36 12,24 20,16 
             C 28,8 38,5 50,4 Z"
          fill="url(#waxGoldGrad)"
        />

        {/* Outer stamped ridge */}
        <circle cx="50" cy="50" r="36" fill="none" stroke="url(#innerRimGrad)" strokeWidth="3" opacity="0.9" />

        {/* Inner recessed stamp circle */}
        <circle cx="50" cy="50" r="32" fill="#caa029" opacity="0.6" />

        {/* Embossed Emblem (Cute Heart with sparkles) */}
        <path
          d="M 50,65 C 38,54 28,45 28,36 C 28,29 33,24 40,24 C 45,24 48,27 50,30 C 52,27 55,24 60,24 C 67,24 72,29 72,36 C 72,45 62,54 50,65 Z"
          fill="#ffd966"
          stroke="#93680a"
          strokeWidth="1.5"
          className="filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
        />

        {/* Specular curved reflection on wax surface */}
        <path
          d="M 22,25 C 30,16 45,12 60,14"
          fill="none"
          stroke="#ffffff"
          strokeWidth="4"
          strokeLinecap="round"
          opacity={isHovered ? "0.9" : "0.6"}
        />
      </svg>
    </div>
  );
}

export function BlueEnvelope({
  onOpenEnvelope,
}: BlueEnvelopeProps) {
  const [isOpeningAnim, setIsOpeningAnim] = useState(false);
  const [isHoveredSeal, setIsHoveredSeal] = useState(false);

  const handleOpenEnvelope = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isOpeningAnim) return;
    
    sfx.playCameraShutter();
    setIsOpeningAnim(true);

    // Audio sparkle effect
    setTimeout(() => {
      sfx.playSparkle();
    }, 150);

    // Confetti celebration burst
    confetti({
      particleCount: 65,
      spread: 75,
      origin: { y: 0.55 },
      colors: ['#0072b2', '#56b4e9', '#ffe000', '#ff72ba', '#ffffff'],
    });

    // Directly trigger zoom transition to next slide without any blank paper
    setTimeout(() => {
      onOpenEnvelope?.();
      setIsOpeningAnim(false);
    }, 280);
  };

  return (
    <div className="w-full my-3 flex flex-col items-center select-none">
      {/* ========================================================================= */}
      {/* THE BLUE ENVELOPE (Directly on the cover without white background or title) */}
      {/* ========================================================================= */}
      <div className="relative w-full max-w-[460px] mx-auto select-none my-2 px-3">
        
        {/* Decorative Doodles on sides of the envelope */}
        {/* Left: Popping Gift Box Line Art in white */}
        <div className="absolute -left-2 sm:-left-9 bottom-3 w-16 h-16 sm:w-20 sm:h-20 text-white pointer-events-none opacity-90 filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.35)] z-20">
          <GiftBoxDoodle className="w-full h-full" color="#ffffff" />
        </div>

        {/* Right: Balloon Cluster Line Art in white */}
        <div className="absolute -right-2 sm:-right-9 bottom-2 w-16 h-20 sm:w-20 sm:h-24 text-white pointer-events-none opacity-90 filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.35)] z-20">
          <BalloonsDoodle className="w-full h-full" color="#ffffff" />
        </div>

        {/* Main Envelope Body Container */}
        <div className="relative w-full aspect-[1.5/1]">
          <div 
            onClick={handleOpenEnvelope}
            className={`relative w-full h-full rounded-2xl shadow-[0_22px_45px_rgba(0,0,0,0.42)] cursor-pointer group transition-all duration-300 border border-white/25 ${
              isOpeningAnim ? 'scale-105' : 'hover:scale-[1.03]'
            }`}
            style={{
              perspective: '1200px',
            }}
            title="Klik untuk membuka"
          >
            {/* Envelope Back Base (Deep Navy Blue) */}
            <div className="absolute inset-0 bg-[#073c68] rounded-2xl shadow-inner overflow-hidden">
              {/* Subtle denim/fabric twill grain */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
            </div>

            {/* Left & Right Envelope Folding Flaps (Side Triangles) */}
            <div 
              className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
              style={{
                clipPath: 'polygon(0 0, 50% 50%, 0 100%)',
                background: 'linear-gradient(135deg, #0b67aa 0%, #064577 100%)',
              }}
            />
            <div 
              className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
              style={{
                clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)',
                background: 'linear-gradient(-135deg, #0b67aa 0%, #064577 100%)',
              }}
            />

            {/* Bottom Folding Pocket Flap (Bottom Triangle) */}
            <div 
              className="absolute inset-0 pointer-events-none shadow-md rounded-2xl overflow-hidden"
              style={{
                clipPath: 'polygon(0 100%, 50% 48%, 100% 100%)',
                background: 'linear-gradient(to top, #053b66 0%, #0d5f9d 100%)',
              }}
            />

            {/* Top Envelope Flap (Triangular Folding Flap with 3D open animation) */}
            <div
              className="absolute inset-x-0 top-0 h-full origin-top transition-transform duration-500 ease-in-out pointer-events-none rounded-t-2xl overflow-hidden"
              style={{
                transformStyle: 'preserve-3d',
                transform: isOpeningAnim ? 'rotateX(180deg)' : 'rotateX(0deg)',
                clipPath: 'polygon(0 0, 100% 0, 50% 53%)',
                background: 'linear-gradient(to bottom, #0e7bca 0%, #0a568e 100%)',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.35))',
              }}
            />

            {/* Center Gold Wax Seal */}
            <div 
              className={`absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-300 ${
                isOpeningAnim ? 'scale-125 opacity-0 rotate-12' : 'group-hover:scale-110'
              }`}
              onMouseEnter={() => setIsHoveredSeal(true)}
              onMouseLeave={() => setIsHoveredSeal(false)}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20">
                <GoldWaxSeal isHovered={isHoveredSeal} />
              </div>
            </div>

            {/* Subtle glow on hover */}
            <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        </div>

        {/* Text Prompt Below Envelope: "click here to open" */}
        <div 
          onClick={handleOpenEnvelope}
          className="relative z-20 text-center pt-3 cursor-pointer group select-none"
        >
          <span className="font-['Cormorant_Garamond'] italic text-2xl sm:text-3xl text-yellow-200 group-hover:text-white font-semibold tracking-wider filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] underline underline-offset-6 decoration-yellow-200/80 group-hover:decoration-white transition-colors">
            click here to open
          </span>
        </div>
      </div>
    </div>
  );
}
