import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Heart, Sparkles, Edit3, X, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sfx } from '../utils/audio';

interface FlowersSlideProps {
  recipientName: string;
  onBack: () => void;
  onNext: () => void;
  customPhrases?: string[];
  onUpdatePhrases?: (newPhrases: string[]) => void;
}

const defaultPhrases = [
  'Thank You For Loving Me',
  "I'm Happiest When It's You",
  'with you everything feels right',
  'to infinity & forever ♡',
  'I Love You So Much',
  'You feel like a home to me',
  'loving you is my favorite thing',
  'my heart chose you',
];

export function FlowersSlide({
  recipientName = 'Olivia',
  onBack,
  onNext,
  customPhrases,
  onUpdatePhrases,
}: FlowersSlideProps) {
  const [phrases, setPhrases] = useState<string[]>(customPhrases || defaultPhrases);
  const [activeBubble, setActiveBubble] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editList, setEditList] = useState<string[]>(customPhrases || defaultPhrases);

  const handleBubbleClick = (index: number) => {
    setActiveBubble(index);
    sfx.playSparkle();
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.5, x: index < 4 ? 0.35 : 0.65 },
      colors: ['#71c4f9', '#ff85b3', '#ffffff', '#ffd166'],
    });
    setTimeout(() => setActiveBubble(null), 1200);
  };

  const handleSavePhrases = () => {
    setPhrases(editList);
    if (onUpdatePhrases) {
      onUpdatePhrases(editList);
    }
    setIsEditing(false);
    sfx.playFanfare();
  };

  return (
    <div className="relative w-full h-full min-h-[580px] overflow-hidden select-none flex flex-col justify-between">
      
      {/* 1. BACKGROUND: Deep Royal Blue Velvet Fabric Backdrop with Ethereal Glow */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url('/src/assets/images/blue_velvet_bg_1790360900288.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#041c30]/75 via-[#063354]/55 to-[#031e36]/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[#07385d]/20 backdrop-blur-[0.5px]" />
      </div>

      {/* 2. CORNER FLOWER BLOSSOMS (Top-Left & Right - Matching Reference Photo) */}
      {/* Top-Left Flower Blossom */}
      <div className="absolute -top-12 -left-12 sm:-top-16 sm:-left-16 w-48 h-48 sm:w-64 sm:h-64 pointer-events-none z-10 opacity-80 mix-blend-screen filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
        <img 
          src="/src/assets/images/soft_blue_flower_1790360933316.jpg" 
          alt="Flower Blossom Accent" 
          className="w-full h-full object-cover rounded-full rotate-45"
        />
      </div>

      {/* Right Edge Flower Blossom */}
      <div className="absolute top-[20%] -right-16 sm:-right-24 w-52 h-52 sm:w-72 sm:h-72 pointer-events-none z-10 opacity-75 mix-blend-screen filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
        <img 
          src="/src/assets/images/soft_blue_flower_1790360933316.jpg" 
          alt="Flower Blossom Accent" 
          className="w-full h-full object-cover rounded-full -rotate-45"
        />
      </div>

      {/* Floating Sparkles & Dust in the Blue Velvet Atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-40">
        <span className="absolute top-[16%] left-[22%] text-white text-lg animate-pulse">✦</span>
        <span className="absolute top-[28%] right-[25%] text-sky-200 text-sm animate-ping">✧</span>
        <span className="absolute bottom-[20%] left-[18%] text-blue-200 text-base animate-pulse">⋆</span>
        <span className="absolute bottom-[24%] right-[20%] text-white text-lg animate-bounce">✦</span>
      </div>

      {/* TOP HEADER: "Flowers For You, My Sweetheart" (Exact cursive styling from reference) */}
      <div className="relative z-30 pt-4 sm:pt-6 px-4 flex flex-col sm:flex-row items-center justify-between">
        
        {/* Left spacing to center the title on larger screens */}
        <div className="hidden sm:block w-28" />

        {/* Cursive Calligraphy Title */}
        <div className="text-center sm:text-right sm:pr-8">
          <h1 className="font-['Alex_Brush'] text-4xl sm:text-6xl md:text-7xl text-white font-normal tracking-wide filter drop-shadow-[0_3px_12px_rgba(0,0,0,0.6)]">
            Flowers For You, My Sweetheart
          </h1>
          <p className="font-['Caveat'] text-sky-200 text-xs sm:text-sm -mt-1 sm:mt-0 tracking-wider">
            a bouquet that will never wilt for {recipientName} ♡
          </p>
        </div>

        {/* Top-Right Next Button */}
        <div className="mt-2 sm:mt-0">
          <button
            onClick={onNext}
            className="cursor-pointer group flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 text-xs sm:text-sm font-['Fredoka'] transition-all shadow-md active:scale-95"
          >
            <span>Selanjutnya</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* CENTER STAGE: VINTAGE HANDS HOLDING PRESENTATION CARD & BOUQUET */}
      {/* ============================================================== */}
      <div className="relative z-20 w-full max-w-5xl mx-auto my-auto flex items-center justify-center px-2 sm:px-6">
        
        {/* VINTAGE PAPER TAG BUTTON: "Back" (Left side of card like in reference) */}
        <div className="absolute left-1 sm:left-2 md:left-4 z-40">
          <button
            onClick={onBack}
            className="cursor-pointer group relative px-3.5 sm:px-5 py-1.5 sm:py-2 bg-[#f4ece1] hover:bg-[#fff9f0] text-slate-700 font-['Caveat'] text-lg sm:text-2xl font-bold rounded-sm shadow-[0_4px_12px_rgba(0,0,0,0.4)] border border-[#d8c8b4] transition-all hover:scale-105 active:scale-95 -rotate-2 flex items-center gap-1"
            title="Kembali ke pilihan hadiah"
          >
            {/* Vintage Paper Tag Holes/Notch */}
            <span className="w-2 h-2 rounded-full bg-[#1b4363] inline-block mr-1 opacity-70" />
            <span>Back</span>
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 2 VINTAGE COLLAGE CUT-OUT HANDS REACHING FROM SIDES            */}
        {/* ------------------------------------------------------------- */}
        {/* Left Vintage Hand */}
        <div className="absolute -left-4 sm:left-4 md:left-8 -bottom-6 sm:-bottom-8 md:-bottom-10 z-30 w-36 sm:w-56 md:w-68 pointer-events-none filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]">
          <svg viewBox="0 0 240 180" className="w-full h-auto overflow-visible">
            <defs>
              <pattern id="halftoneLeft" width="4" height="4" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.1" fill="#475569" />
              </pattern>
              <linearGradient id="handShadeL" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#8d99ae" />
                <stop offset="50%" stopColor="#d8e2dc" />
                <stop offset="100%" stopColor="#f8edeb" />
              </linearGradient>
            </defs>
            {/* White Cutout Border */}
            <path 
              d="M -20 180 Q 20 160, 60 130 Q 100 100, 140 85 Q 170 75, 195 70 C 205 68, 215 72, 220 78 C 225 84, 220 95, 205 105 L 180 120 C 190 122, 195 128, 192 134 C 188 140, 175 142, 160 142 L 140 148 Q 90 170, 40 185 Z" 
              fill="#ffffff" 
              stroke="#ffffff" 
              strokeWidth="6" 
              strokeLinejoin="round" 
            />
            {/* Hand Body */}
            <path 
              d="M -20 180 Q 20 160, 60 130 Q 100 100, 140 85 Q 170 75, 195 70 C 205 68, 215 72, 220 78 C 225 84, 220 95, 205 105 L 180 120 C 190 122, 195 128, 192 134 C 188 140, 175 142, 160 142 L 140 148 Q 90 170, 40 185 Z" 
              fill="url(#handShadeL)" 
            />
            {/* Halftone / Grayscale Texture Overlay */}
            <path 
              d="M -20 180 Q 20 160, 60 130 Q 100 100, 140 85 Q 170 75, 195 70 C 205 68, 215 72, 220 78 C 225 84, 220 95, 205 105 L 180 120 C 190 122, 195 128, 192 134 C 188 140, 175 142, 160 142 L 140 148 Q 90 170, 40 185 Z" 
              fill="url(#halftoneLeft)" 
              opacity="0.35" 
            />
            {/* Hand Contour Lines */}
            <path d="M 140 85 Q 170 75, 195 70" stroke="#334155" strokeWidth="1.5" fill="none" opacity="0.6" />
            <path d="M 155 105 Q 185 96, 205 105" stroke="#334155" strokeWidth="1.2" fill="none" opacity="0.6" />
            <path d="M 140 125 Q 170 122, 192 134" stroke="#334155" strokeWidth="1.2" fill="none" opacity="0.6" />
          </svg>
        </div>

        {/* Right Vintage Hand */}
        <div className="absolute -right-4 sm:right-4 md:right-8 -bottom-6 sm:-bottom-8 md:-bottom-10 z-30 w-36 sm:w-56 md:w-68 pointer-events-none filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]">
          <svg viewBox="0 0 240 180" className="w-full h-auto overflow-visible">
            <defs>
              <linearGradient id="handShadeR" x1="1" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#8d99ae" />
                <stop offset="50%" stopColor="#d8e2dc" />
                <stop offset="100%" stopColor="#f8edeb" />
              </linearGradient>
            </defs>
            {/* White Cutout Border */}
            <path 
              d="M 260 180 Q 220 160, 180 130 Q 140 100, 100 85 Q 70 75, 45 70 C 35 68, 25 72, 20 78 C 15 84, 20 95, 35 105 L 60 120 C 50 122, 45 128, 48 134 C 52 140, 65 142, 80 142 L 100 148 Q 150 170, 200 185 Z" 
              fill="#ffffff" 
              stroke="#ffffff" 
              strokeWidth="6" 
              strokeLinejoin="round" 
            />
            {/* Hand Body */}
            <path 
              d="M 260 180 Q 220 160, 180 130 Q 140 100, 100 85 Q 70 75, 45 70 C 35 68, 25 72, 20 78 C 15 84, 20 95, 35 105 L 60 120 C 50 122, 45 128, 48 134 C 52 140, 65 142, 80 142 L 100 148 Q 150 170, 200 185 Z" 
              fill="url(#handShadeR)" 
            />
            {/* Halftone / Grayscale Texture */}
            <path 
              d="M 260 180 Q 220 160, 180 130 Q 140 100, 100 85 Q 70 75, 45 70 C 35 68, 25 72, 20 78 C 15 84, 20 95, 35 105 L 60 120 C 50 122, 45 128, 48 134 C 52 140, 65 142, 80 142 L 100 148 Q 150 170, 200 185 Z" 
              fill="url(#halftoneLeft)" 
              opacity="0.35" 
            />
            {/* Hand Contour Lines */}
            <path d="M 100 85 Q 70 75, 45 70" stroke="#334155" strokeWidth="1.5" fill="none" opacity="0.6" />
            <path d="M 85 105 Q 55 96, 35 105" stroke="#334155" strokeWidth="1.2" fill="none" opacity="0.6" />
            <path d="M 100 125 Q 70 122, 48 134" stroke="#334155" strokeWidth="1.2" fill="none" opacity="0.6" />
          </svg>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* PARCHMENT PRESENTATION CARD WITH SCALLOPED / ZIGZAG BORDER    */}
        {/* ------------------------------------------------------------- */}
        <div 
          className="relative w-full max-w-2xl bg-[#faf7f0] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_16px_36px_rgba(0,0,0,0.55)] border-4 border-white z-20"
          style={{
            backgroundImage: `radial-gradient(#e8dfd3 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        >
          {/* Inner Scalloped / Perforated Pink Dotted Border */}
          <div className="absolute inset-2 sm:inset-3 border-2 border-dashed border-red-300/70 rounded-lg pointer-events-none" />

          {/* Quick Edit Button in top right of card */}
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-md hover:bg-black/5 cursor-pointer z-30"
            title="Edit kata-kata ucapan"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>

          {/* CARD INTERIOR LAYOUT: BOUQUET IN CENTER + BUBBLES ON BOTH SIDES */}
          <div className="relative min-h-[300px] sm:min-h-[360px] md:min-h-[390px] flex items-center justify-center">
            
            {/* 1. CENTER BOUQUET */}
            <div className="relative z-10 w-44 sm:w-56 md:w-64 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-105 cursor-pointer">
              <div 
                onClick={() => {
                  sfx.playSparkle();
                  confetti({
                    particleCount: 50,
                    spread: 70,
                    origin: { y: 0.5 },
                    colors: ['#ff85b3', '#71c4f9', '#ffffff', '#ffd166'],
                  });
                }}
                className="aspect-square w-full rounded-2xl overflow-hidden relative"
              >
                <img 
                  src="/src/assets/images/flower_bouquet_kraft_1790360917725.jpg" 
                  alt="Flower Bouquet Wrapped in Kraft Paper" 
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Little Heart Badge underneath the bouquet */}
              <div className="text-center mt-1">
                <span className="inline-flex items-center gap-1 font-['Caveat'] text-sm sm:text-base text-pink-600 font-bold bg-white/80 px-2 py-0.5 rounded-full shadow-xs">
                  <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
                  <span>tap bouquet for flowers!</span>
                </span>
              </div>
            </div>

            {/* 2. LEFT SIDE SPEECH BUBBLES (4 BUBBLES) */}
            <div className="absolute left-0 top-0 bottom-0 w-[42%] flex flex-col justify-between py-1 z-20 pointer-events-auto">
              
              {/* Bubble 1: "Thank You For Loving Me" */}
              <div 
                onClick={() => handleBubbleClick(0)}
                className={`cursor-pointer transition-all duration-300 transform -translate-x-1 sm:-translate-x-3 hover:scale-105 active:scale-95 ${
                  activeBubble === 0 ? 'scale-110 ring-2 ring-sky-400' : ''
                }`}
              >
                <div className="bg-white/95 text-slate-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-slate-200/90 relative inline-block max-w-[95%]">
                  <span className="font-['Fredoka'] text-xs sm:text-sm font-semibold text-slate-700 leading-tight block">
                    {phrases[0] || 'Thank You For Loving Me'}
                  </span>
                  {/* Tail pointing right */}
                  <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-6 border-l-white" />
                </div>
              </div>

              {/* Bubble 2: "I'm Happiest When It's You" */}
              <div 
                onClick={() => handleBubbleClick(1)}
                className={`cursor-pointer transition-all duration-300 transform translate-x-1 sm:translate-x-2 hover:scale-105 active:scale-95 ${
                  activeBubble === 1 ? 'scale-110 ring-2 ring-sky-400' : ''
                }`}
              >
                <div className="bg-white/95 text-slate-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-slate-200/90 relative inline-block max-w-[95%]">
                  <span className="font-['Fredoka'] text-xs sm:text-sm font-semibold text-slate-700 leading-tight block">
                    {phrases[1] || "I'm Happiest When It's You"}
                  </span>
                  {/* Tail */}
                  <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-6 border-l-white" />
                </div>
              </div>

              {/* Bubble 3: "with you everything feels right" */}
              <div 
                onClick={() => handleBubbleClick(2)}
                className={`cursor-pointer transition-all duration-300 transform -translate-x-1 sm:-translate-x-2 hover:scale-105 active:scale-95 ${
                  activeBubble === 2 ? 'scale-110 ring-2 ring-sky-400' : ''
                }`}
              >
                <div className="bg-white/95 text-slate-800 px-2.5 sm:px-3.5 py-1.5 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-slate-200/90 relative inline-block max-w-[95%]">
                  <span className="font-['Patrick_Hand'] text-xs sm:text-sm text-slate-700 leading-tight block">
                    {phrases[2] || 'with you everything feels right'}
                  </span>
                  {/* Tail */}
                  <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-6 border-l-white" />
                </div>
              </div>

              {/* Bubble 4: "to infinity & forever ♡" */}
              <div 
                onClick={() => handleBubbleClick(3)}
                className={`cursor-pointer transition-all duration-300 transform translate-x-2 sm:translate-x-4 hover:scale-105 active:scale-95 ${
                  activeBubble === 3 ? 'scale-110 ring-2 ring-sky-400' : ''
                }`}
              >
                <div className="bg-white/95 text-slate-800 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-slate-200/90 relative inline-block max-w-[95%]">
                  <span className="font-['Caveat'] text-xs sm:text-base font-bold text-sky-800 leading-tight block">
                    {phrases[3] || 'to infinity & forever ♡'}
                  </span>
                  {/* Tail */}
                  <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-6 border-l-white" />
                </div>
              </div>

            </div>

            {/* 3. RIGHT SIDE SPEECH BUBBLES (4 BUBBLES) */}
            <div className="absolute right-0 top-0 bottom-0 w-[42%] flex flex-col justify-between py-1 z-20 pointer-events-auto items-end">
              
              {/* Bubble 5: "I Love You So Much" */}
              <div 
                onClick={() => handleBubbleClick(4)}
                className={`cursor-pointer transition-all duration-300 transform translate-x-1 sm:translate-x-3 hover:scale-105 active:scale-95 ${
                  activeBubble === 4 ? 'scale-110 ring-2 ring-pink-400' : ''
                }`}
              >
                <div className="bg-white/95 text-slate-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-slate-200/90 relative inline-block max-w-[95%] text-right">
                  <span className="font-['Fredoka'] text-xs sm:text-sm font-semibold text-slate-700 leading-tight block">
                    {phrases[4] || 'I Love You So Much'}
                  </span>
                  {/* Tail pointing left */}
                  <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-6 border-r-white" />
                </div>
              </div>

              {/* Bubble 6: "You feel like a home to me" */}
              <div 
                onClick={() => handleBubbleClick(5)}
                className={`cursor-pointer transition-all duration-300 transform -translate-x-1 sm:-translate-x-2 hover:scale-105 active:scale-95 ${
                  activeBubble === 5 ? 'scale-110 ring-2 ring-pink-400' : ''
                }`}
              >
                <div className="bg-white/95 text-slate-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-slate-200/90 relative inline-block max-w-[95%] text-right">
                  <span className="font-['Patrick_Hand'] text-xs sm:text-sm text-slate-700 leading-tight block">
                    {phrases[5] || 'You feel like a home to me'}
                  </span>
                  {/* Tail */}
                  <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-6 border-r-white" />
                </div>
              </div>

              {/* Bubble 7: "loving you is my favorite thing" */}
              <div 
                onClick={() => handleBubbleClick(6)}
                className={`cursor-pointer transition-all duration-300 transform translate-x-1 sm:translate-x-2 hover:scale-105 active:scale-95 ${
                  activeBubble === 6 ? 'scale-110 ring-2 ring-pink-400' : ''
                }`}
              >
                <div className="bg-white/95 text-slate-800 px-2.5 sm:px-3.5 py-1.5 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-slate-200/90 relative inline-block max-w-[95%] text-right">
                  <span className="font-['Fredoka'] text-xs sm:text-sm font-semibold text-slate-700 leading-tight block">
                    {phrases[6] || 'loving you is my favorite thing'}
                  </span>
                  {/* Tail */}
                  <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-6 border-r-white" />
                </div>
              </div>

              {/* Bubble 8: "my heart chose you" */}
              <div 
                onClick={() => handleBubbleClick(7)}
                className={`cursor-pointer transition-all duration-300 transform -translate-x-2 sm:-translate-x-4 hover:scale-105 active:scale-95 ${
                  activeBubble === 7 ? 'scale-110 ring-2 ring-pink-400' : ''
                }`}
              >
                <div className="bg-white/95 text-slate-800 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-slate-200/90 relative inline-block max-w-[95%] text-right">
                  <span className="font-['Caveat'] text-xs sm:text-base font-bold text-pink-700 leading-tight block">
                    {phrases[7] || 'my heart chose you ♡'}
                  </span>
                  {/* Tail */}
                  <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-6 border-r-white" />
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* FOOTER BAR: HINT & INTERACTIVE TAPS */}
      <div className="relative z-30 px-4 py-2 sm:py-3 flex items-center justify-between text-white/80 text-[11px] sm:text-xs font-sans border-t border-white/10 bg-black/25 backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Ketuk setiap balon pesan untuk mendengar melodi cinta ✨</span>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="text-sky-200 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
        >
          Edit Kata-Kata Bubble ✍️
        </button>
      </div>

      {/* ============================================================== */}
      {/* EDIT MODAL FOR CUSTOMIZING THE SPEECH BUBBLE PHRASES           */}
      {/* ============================================================== */}
      {isEditing && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsEditing(false)}
        >
          <div 
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 relative border-2 border-slate-200 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
              <h3 className="font-['Fredoka'] font-bold text-slate-800 text-lg sm:text-xl flex items-center gap-2">
                <span>Edit 8 Pesan Balon Bunga 💐</span>
              </h3>
              <button 
                onClick={() => setIsEditing(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-4 font-sans">
              Ubah teks romantis yang melayang di sekitar buket bunga:
            </p>

            <div className="space-y-2.5">
              {editList.map((phrase, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 w-5 text-right">{idx + 1}.</span>
                  <input
                    type="text"
                    value={phrase}
                    onChange={(e) => {
                      const updated = [...editList];
                      updated[idx] = e.target.value;
                      setEditList(updated);
                    }}
                    className="flex-1 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:border-[#075b93]"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-2 justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleSavePhrases}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#075b93] hover:bg-[#05436c] text-white flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
