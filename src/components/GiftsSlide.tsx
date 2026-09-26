import React, { useState } from 'react';
import { X, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sfx } from '../utils/audio';

interface GiftsSlideProps {
  recipientName: string;
  onNext: () => void;
  onOpenMessage?: () => void;
  onOpenFlower?: () => void;
  onOpenCake?: () => void;
  customMessage?: string;
  onUpdateMessage?: (newMsg: string) => void;
}

export function GiftsSlide({ 
  recipientName = 'Olivia', 
  onNext, 
  onOpenMessage,
  onOpenFlower,
  onOpenCake,
  customMessage 
}: GiftsSlideProps) {
  const [activeModal, setActiveModal] = useState<'message' | 'flower' | 'cake' | null>(null);
  const [candleBlown, setCandleBlown] = useState(false);

  const displayName = recipientName || 'Olivia';

  const defaultMessage = `Dear ${displayName},\n\nHappy Birthday! Today is a special day celebrating the wonderful person you are. Thank you for all the warmth, the laughs, and the sweet moments we share. You make the world a whole lot brighter just by being in it.\n\nI hope this year brings you endless joy, peace, and all the dreams your heart has been whispering. Always stay as amazing as you are! 🤍`;

  const letterText = customMessage || defaultMessage;

  const handleOpenGift = (type: 'message' | 'flower' | 'cake') => {
    sfx.playPop();
    if (type === 'message' && onOpenMessage) {
      onOpenMessage();
      return;
    }
    if (type === 'flower' && onOpenFlower) {
      onOpenFlower();
      return;
    }
    if (type === 'cake' && onOpenCake) {
      onOpenCake();
      return;
    }
    setActiveModal(type);
    if (type === 'cake') {
      setCandleBlown(false);
    }
  };

  const handleBlowCandle = () => {
    if (!candleBlown) {
      setCandleBlown(true);
      sfx.playFanfare();
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#71c4f9', '#ff72ba', '#ffe000', '#ffffff', '#22c55e'],
      });
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center px-4 py-8 sm:py-12 relative overflow-hidden select-none">
      
      {/* Background Subtle Sparkle Dust */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <span className="absolute top-[12%] left-[10%] text-white text-xl animate-pulse">✦</span>
        <span className="absolute top-[20%] right-[14%] text-sky-200 text-lg animate-ping">✧</span>
        <span className="absolute bottom-[22%] left-[15%] text-blue-200 text-base animate-pulse">⋆</span>
        <span className="absolute bottom-[18%] right-[12%] text-white text-xl animate-bounce">✦</span>
      </div>

      {/* TOP HEADER: "These are for you" (Exact match to reference image cursive) */}
      <div className="text-center mt-2 sm:mt-4 z-10">
        <h1 className="font-['Alex_Brush'] text-5xl sm:text-7xl md:text-8xl text-white font-normal leading-tight tracking-wide filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)]">
          These are for you
        </h1>
        <p className="font-['Caveat'] text-sky-100 text-base sm:text-xl mt-1 opacity-90">
          tap each gift to open ✨
        </p>
      </div>

      {/* CENTER ROW: 3 GIFTS (Message, Flower, Cake) */}
      <div className="w-full max-w-4xl my-auto z-10 grid grid-cols-3 gap-2 sm:gap-8 md:gap-12 items-center justify-items-center px-2">
        
        {/* ============================================================== */}
        {/* 1. MESSAGE (Envelope with Blue Wax Seal)                       */}
        {/* ============================================================== */}
        <div 
          onClick={() => handleOpenGift('message')}
          className="flex flex-col items-center cursor-pointer group transition-transform duration-300 hover:scale-108 active:scale-95"
        >
          {/* Envelope Graphic */}
          <div className="w-24 sm:w-44 md:w-56 aspect-[1.38/1] relative filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] group-hover:drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)] transition-all">
            <svg 
              viewBox="0 0 200 145" 
              className="w-full h-full overflow-visible"
            >
              <defs>
                <linearGradient id="envBodyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#e8f1f8" />
                </linearGradient>
                <linearGradient id="envFlapGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f5f9fc" />
                  <stop offset="100%" stopColor="#dce8f3" />
                </linearGradient>
                <linearGradient id="blueSealGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2980b9" />
                  <stop offset="50%" stopColor="#1a5276" />
                  <stop offset="100%" stopColor="#154360" />
                </linearGradient>
                <filter id="sealShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.4" />
                </filter>
              </defs>

              {/* Envelope Body */}
              <rect x="2" y="2" width="196" height="141" rx="8" fill="url(#envBodyGrad)" stroke="#c4d8e7" strokeWidth="1.5" />

              {/* Flap lines (Bottom & Side folds) */}
              <path d="M 2 143 L 100 80 L 198 143" fill="#e3edf5" stroke="#b9d0e2" strokeWidth="1" />
              <path d="M 2 2 L 78 80 L 2 143" fill="none" stroke="#cfdfec" strokeWidth="0.8" opacity="0.6" />
              <path d="M 198 2 L 122 80 L 198 143" fill="none" stroke="#cfdfec" strokeWidth="0.8" opacity="0.6" />

              {/* Top V Flap */}
              <path 
                d="M 2 2 L 100 82 L 198 2 Z" 
                fill="url(#envFlapGrad)" 
                stroke="#b9d0e2" 
                strokeWidth="1.2" 
                className="group-hover:-translate-y-1 transition-transform"
              />

              {/* Blue Wax Seal (Theme adapted from red to blue) */}
              <g transform="translate(100, 80)" filter="url(#sealShadow)" className="group-hover:scale-110 transition-transform">
                {/* Wavy melted wax edge */}
                <path 
                  d="M 0 -17 C 7 -19, 14 -15, 17 -10 C 21 -4, 20 5, 16 11 C 12 17, 4 20, -2 19 C -9 18, -16 14, -18 8 C -21 1, -19 -8, -14 -13 C -9 -17, -5 -16, 0 -17 Z" 
                  fill="url(#blueSealGrad)" 
                />
                {/* Inner pressed circle */}
                <circle cx="0" cy="0" r="11" fill="#1b4f72" stroke="#3498db" strokeWidth="0.8" opacity="0.8" />
                {/* Embossed Heart Monogram */}
                <path 
                  d="M 0 4 C -3 1, -5 -1, -5 -3 C -5 -5, -3 -7, -1 -7 C 0 -7, 0 -6, 0 -6 C 0 -6, 0 -7, 1 -7 C 3 -7, 5 -5, 5 -3 C 5 -1, 3 1, 0 4 Z" 
                  fill="#5dade2" 
                  opacity="0.9"
                />
              </g>
            </svg>
          </div>

          {/* Label underneath */}
          <span className="font-['Cormorant_Garamond'] text-lg sm:text-2xl md:text-3xl text-white font-bold tracking-wide mt-3 filter drop-shadow-md group-hover:text-yellow-200 transition-colors">
            Message
          </span>
        </div>

        {/* ============================================================== */}
        {/* 2. FLOWER (Wrapped Bouquet with Hearts Pattern)                */}
        {/* ============================================================== */}
        <div 
          onClick={() => handleOpenGift('flower')}
          className="flex flex-col items-center cursor-pointer group transition-transform duration-300 hover:scale-108 active:scale-95"
        >
          {/* Bouquet Graphic */}
          <div className="w-24 sm:w-44 md:w-56 aspect-[0.95/1] relative filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] group-hover:drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)] transition-all">
            <svg 
              viewBox="0 0 160 170" 
              className="w-full h-full overflow-visible"
            >
              <defs>
                <linearGradient id="kraftPaper" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fdfbf7" />
                  <stop offset="100%" stopColor="#f3ede2" />
                </linearGradient>
                <linearGradient id="paperInner" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e8dfd1" />
                  <stop offset="100%" stopColor="#d5c7b3" />
                </linearGradient>
                <linearGradient id="rosePink" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ff85b3" />
                  <stop offset="100%" stopColor="#e91e63" />
                </linearGradient>
                <linearGradient id="roseSoft" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffb3d1" />
                  <stop offset="100%" stopColor="#ff659c" />
                </linearGradient>
              </defs>

              {/* Behind leaves */}
              <ellipse cx="48" cy="52" rx="10" ry="18" fill="#48a868" transform="rotate(-35 48 52)" />
              <ellipse cx="112" cy="52" rx="10" ry="18" fill="#3f9b5d" transform="rotate(35 112 52)" />
              <ellipse cx="80" cy="36" rx="8" ry="15" fill="#52b774" />

              {/* Baby's breath / White tiny flowers */}
              <circle cx="50" cy="40" r="3.5" fill="#ffffff" />
              <circle cx="56" cy="34" r="3" fill="#ffffff" />
              <circle cx="106" cy="38" r="3.5" fill="#ffffff" />
              <circle cx="114" cy="45" r="3" fill="#ffffff" />

              {/* Back wrapping paper fold */}
              <path d="M 40 55 L 80 148 L 120 55 Z" fill="url(#paperInner)" stroke="#c4b59f" strokeWidth="0.8" />

              {/* Blooming Roses Cluster */}
              {/* Left rose */}
              <g transform="translate(54, 62)">
                <circle cx="0" cy="0" r="15" fill="url(#roseSoft)" />
                <path d="M -8 -4 C -4 -12 6 -12 8 -4 C 10 4 2 10 -4 9 C -10 7 -10 0 -8 -4 Z" fill="url(#rosePink)" />
                <circle cx="0" cy="0" r="4" fill="#ffffff" opacity="0.4" />
              </g>

              {/* Right rose */}
              <g transform="translate(104, 64)">
                <circle cx="0" cy="0" r="14" fill="url(#roseSoft)" />
                <path d="M -6 -5 C -2 -11 6 -11 8 -5 C 9 3 2 9 -3 8 C -8 7 -8 0 -6 -5 Z" fill="url(#rosePink)" />
              </g>

              {/* Center Main Rose */}
              <g transform="translate(80, 52)">
                <circle cx="0" cy="0" r="18" fill="url(#rosePink)" />
                <path d="M -10 -5 C -5 -15 8 -15 11 -5 C 13 6 3 13 -5 12 C -13 10 -13 0 -10 -5 Z" fill="#c2185b" />
                <circle cx="0" cy="0" r="6" fill="#f48fb1" />
                <path d="M -2 -1 C 0 -3 3 -3 3 -1 C 3 1 1 2 -1 2 Z" fill="#ffffff" opacity="0.7" />
              </g>

              {/* Front Flower buds */}
              <circle cx="70" cy="74" r="11" fill="url(#roseSoft)" />
              <circle cx="90" cy="74" r="10" fill="url(#rosePink)" />

              {/* FRONT WRAPPING PAPER CONE (With Hearts Pattern like in reference) */}
              <path 
                d="M 32 60 L 80 148 L 128 60 C 108 72 52 72 32 60 Z" 
                fill="url(#kraftPaper)" 
                stroke="#ded4c3" 
                strokeWidth="1.2" 
              />

              {/* Cute Little Hearts on the Wrapper (matching reference) */}
              {[
                { x: 52, y: 76, r: -10, s: 0.9 },
                { x: 78, y: 82, r: 8, s: 1.1 },
                { x: 104, y: 78, r: -5, s: 0.9 },
                { x: 62, y: 100, r: 15, s: 1.0 },
                { x: 86, y: 104, r: -12, s: 1.0 },
                { x: 74, y: 122, r: 5, s: 0.85 },
              ].map((h, i) => (
                <g key={i} transform={`translate(${h.x}, ${h.y}) rotate(${h.r}) scale(${h.s * 0.7})`}>
                  <path 
                    d="M 0 4 C -3 0 -6 -2 -6 -5 C -6 -8 -3 -10 0 -7 C 3 -10 6 -8 6 -5 C 6 -2 3 0 0 4 Z" 
                    fill="#e74c3c" 
                    opacity="0.85"
                  />
                </g>
              ))}

              {/* Stems at bottom tied with cream cuff */}
              <path d="M 72 148 L 70 162 L 90 162 L 88 148 Z" fill="#fdfbf7" stroke="#ded4c3" strokeWidth="1" />
              <line x1="77" y1="162" x2="77" y2="167" stroke="#48a868" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="83" y1="162" x2="83" y2="168" stroke="#3f9b5d" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Label underneath */}
          <span className="font-['Cormorant_Garamond'] text-lg sm:text-2xl md:text-3xl text-white font-bold tracking-wide mt-3 filter drop-shadow-md group-hover:text-yellow-200 transition-colors">
            Flower
          </span>
        </div>

        {/* ============================================================== */}
        {/* 3. CAKE (Slice of Birthday Cake with Strawberry)               */}
        {/* ============================================================== */}
        <div 
          onClick={() => handleOpenGift('cake')}
          className="flex flex-col items-center cursor-pointer group transition-transform duration-300 hover:scale-108 active:scale-95"
        >
          {/* Cake Slice Graphic */}
          <div className="w-24 sm:w-44 md:w-56 aspect-[1.25/1] relative filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] group-hover:drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)] transition-all">
            <svg 
              viewBox="0 0 180 145" 
              className="w-full h-full overflow-visible"
            >
              <defs>
                <linearGradient id="cakeCream" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#f3f4f6" />
                </linearGradient>
                <linearGradient id="spongeBerry" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#e74c3c" />
                  <stop offset="50%" stopColor="#d63031" />
                  <stop offset="100%" stopColor="#c0392b" />
                </linearGradient>
                <linearGradient id="strawberryGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff4d4d" />
                  <stop offset="100%" stopColor="#c0392b" />
                </linearGradient>
              </defs>

              {/* STRAWBERRY ON TOP */}
              <g transform="translate(108, 28)">
                {/* Leaves on top */}
                <ellipse cx="-4" cy="-4" rx="4" ry="9" fill="#2ecc71" transform="rotate(-40 -4 -4)" />
                <ellipse cx="4" cy="-4" rx="4" ry="9" fill="#27ae60" transform="rotate(40 4 -4)" />
                <ellipse cx="0" cy="-6" rx="3.5" ry="8" fill="#2ecc71" />

                {/* Strawberry Body */}
                <path 
                  d="M -12 0 C -14 10 -4 18 0 21 C 4 18 14 10 12 0 C 8 -3 -8 -3 -12 0 Z" 
                  fill="url(#strawberryGrad)" 
                />
                {/* Seeds */}
                <circle cx="-4" cy="5" r="0.8" fill="#ffeaa7" />
                <circle cx="2" cy="7" r="0.8" fill="#ffeaa7" />
                <circle cx="5" cy="3" r="0.8" fill="#ffeaa7" />
                <circle cx="-1" cy="12" r="0.8" fill="#ffeaa7" />
                {/* Shine */}
                <path d="M -8 2 C -8 7 -5 10 -5 10" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />
              </g>

              {/* CAKE SLICE 3D BODY */}
              {/* Back / Top Frosting Slope */}
              <path 
                d="M 18 68 C 18 52 140 18 145 42 L 145 68 L 18 68 Z" 
                fill="url(#cakeCream)" 
                stroke="#e2e8f0" 
                strokeWidth="1.5"
              />

              {/* Top Smooth Frosting Surface */}
              <path 
                d="M 18 68 L 75 42 L 145 42 L 18 68 Z" 
                fill="#ffffff" 
                stroke="#e5e7eb" 
                strokeWidth="1"
              />

              {/* CAKE SLICE FRONT FACE (Side view showing layers) */}
              {/* Overall cake side container */}
              <g>
                {/* Layer 1: Top Sponge Layer */}
                <path 
                  d="M 18 68 L 145 42 L 145 62 L 18 84 Z" 
                  fill="url(#spongeBerry)" 
                  stroke="#c0392b" 
                  strokeWidth="0.8" 
                />

                {/* Layer 2: Middle Cream Layer (Thick White Band) */}
                <path 
                  d="M 18 84 L 145 62 L 145 74 L 18 94 Z" 
                  fill="#ffffff" 
                  stroke="#e2e8f0" 
                  strokeWidth="0.8" 
                />

                {/* Layer 3: Bottom Sponge Layer */}
                <path 
                  d="M 18 94 L 145 74 L 145 96 L 18 116 Z" 
                  fill="url(#spongeBerry)" 
                  stroke="#c0392b" 
                  strokeWidth="0.8" 
                />

                {/* Base Bottom Cream Layer */}
                <path 
                  d="M 18 116 L 145 96 L 145 102 L 18 122 Z" 
                  fill="#ffffff" 
                  stroke="#e2e8f0" 
                  strokeWidth="0.8" 
                />

                {/* Left/Back Cream Border (Rounded fluffy cake back) */}
                <path 
                  d="M 18 68 C 12 76 12 114 18 122 L 24 121 C 20 114 20 76 24 69 Z" 
                  fill="#ffffff" 
                />
              </g>

              {/* Outer Crisp Outline matching reference clean art style */}
              <path 
                d="M 18 68 C 18 46 142 22 145 42 L 145 102 L 18 122 Z" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="3.5" 
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Label underneath */}
          <span className="font-['Cormorant_Garamond'] text-lg sm:text-2xl md:text-3xl text-white font-bold tracking-wide mt-3 filter drop-shadow-md group-hover:text-yellow-200 transition-colors">
            Cake
          </span>
        </div>

      </div>

      {/* BOTTOM NAVIGATION: "click here →" */}
      <div className="z-10 mb-2 sm:mb-4 flex flex-col items-center">
        <div 
          onClick={onNext}
          className="cursor-pointer select-none group inline-flex items-center gap-1.5 transition-transform hover:scale-105"
        >
          <span className="font-['Cormorant_Garamond'] italic text-2xl sm:text-3xl text-white group-hover:text-yellow-200 underline underline-offset-8 decoration-white/70 group-hover:decoration-yellow-200 font-semibold transition-colors filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            click here →
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODAL 1: MESSAGE (Parment letter with heart wax seal)         */}
      {/* ============================================================== */}
      {activeModal === 'message' && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="w-full max-w-lg bg-[#fffdfa] text-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 relative border-4 border-[#075b93]/20 -rotate-1 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Letter Header Stamp */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-dashed border-slate-300">
              <div className="w-10 h-10 rounded-full bg-[#1a5276] text-white flex items-center justify-center shadow-md">
                <Heart className="w-5 h-5 fill-current text-sky-200" />
              </div>
              <div>
                <p className="font-['Fredoka'] font-bold text-slate-800 text-lg leading-tight">
                  A letter for {displayName} 💌
                </p>
                <p className="font-['Caveat'] text-slate-500 text-sm">
                  written with all my heart
                </p>
              </div>
            </div>

            {/* Letter Content */}
            <div className="font-['Caveat'] text-xl sm:text-2xl text-slate-700 leading-relaxed whitespace-pre-line">
              {letterText}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
              <button 
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-[#075b93] hover:bg-[#064775] text-white text-sm font-sans font-bold rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Close with love ♡
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: FLOWER (Flower bouquet celebration)                  */}
      {/* ============================================================== */}
      {activeModal === 'flower' && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="w-full max-w-md bg-gradient-to-b from-pink-50 to-white text-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 relative border-4 border-pink-200 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 shadow-xs transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Big Blooming Icon */}
            <div className="text-6xl sm:text-7xl mb-3 animate-bounce">
              💐
            </div>

            <h3 className="font-['Fredoka'] text-2xl sm:text-3xl text-pink-600 font-bold mb-2">
              For You, {displayName}!
            </h3>

            <p className="font-['Caveat'] text-xl sm:text-2xl text-slate-600 leading-relaxed px-2">
              “Like flowers that bloom in the morning light, you bring beauty, kindness, and warmth into my world. Here is a bouquet that will never fade.” 🌸✨
            </p>

            <div className="mt-6">
              <button 
                onClick={() => {
                  sfx.playSparkle();
                  confetti({
                    particleCount: 50,
                    spread: 60,
                    origin: { y: 0.6 },
                    colors: ['#ff85b3', '#ff659c', '#ffffff', '#ffd166'],
                  });
                  setActiveModal(null);
                }}
                className="w-full py-3 bg-pink-500 hover:bg-pink-600 text-white font-sans font-bold rounded-2xl shadow-lg transition-transform hover:scale-102 cursor-pointer"
              >
                Thank you! 💖
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 3: CAKE (Interactive Make-a-Wish & Blow Candle)          */}
      {/* ============================================================== */}
      {activeModal === 'cake' && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="w-full max-w-md bg-gradient-to-b from-sky-50 via-white to-amber-50 text-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 relative border-4 border-sky-200 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 shadow-xs transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Candle & Cake Stage */}
            <div className="my-3 flex flex-col items-center justify-center">
              {/* Animated Candle Flame */}
              <div 
                onClick={handleBlowCandle}
                className="cursor-pointer group flex flex-col items-center"
                title="Klik untuk tiup lilin!"
              >
                {!candleBlown ? (
                  <div className="flex flex-col items-center">
                    <span className="text-4xl animate-pulse filter drop-shadow-[0_0_12px_rgba(255,200,0,0.9)]">
                      🔥
                    </span>
                    <div className="w-2.5 h-10 bg-gradient-to-b from-yellow-200 to-amber-400 rounded-t-xs border border-amber-500 shadow-xs" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-2xl animate-fade-out text-slate-400">
                      💨
                    </span>
                    <div className="w-2.5 h-10 bg-slate-300 rounded-t-xs border border-slate-400 shadow-xs" />
                  </div>
                )}

                {/* Cake base emoji/illustration */}
                <div className="text-6xl -mt-2">
                  🎂
                </div>
              </div>
            </div>

            <h3 className="font-['Fredoka'] text-2xl sm:text-3xl text-sky-900 font-bold mb-1">
              {!candleBlown ? "Make a wish! 🕯️" : "Wish Made! ✨"}
            </h3>

            <p className="font-['Caveat'] text-lg sm:text-2xl text-slate-600 px-3">
              {!candleBlown ? (
                <span>Close your eyes, think of something you really want, and tap the candle to blow it out!</span>
              ) : (
                <span className="text-pink-600 font-bold">
                  May every single wish you made today come true, {displayName}! 🎉
                </span>
              )}
            </p>

            <div className="mt-6 flex gap-3">
              {!candleBlown ? (
                <button 
                  onClick={handleBlowCandle}
                  className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-sans font-bold rounded-2xl shadow-lg transition-transform hover:scale-102 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>Tiup Lilin Sekarang! 💨</span>
                </button>
              ) : (
                <button 
                  onClick={() => setActiveModal(null)}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold rounded-2xl shadow-lg transition-transform hover:scale-102 cursor-pointer"
                >
                  Yaaay! Happy Birthday! 🥳
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
