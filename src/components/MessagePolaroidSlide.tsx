import React, { useState, useRef } from 'react';
import { Camera, X, Heart, Sparkles, ArrowLeft, ArrowRight, Edit3, Check } from 'lucide-react';
import { sfx } from '../utils/audio';

interface MessagePolaroidSlideProps {
  recipientName: string;
  customMessage?: string;
  onUpdateMessage?: (newMsg: string) => void;
  photo1?: string;
  photo2?: string;
  photo3?: string;
  photo4?: string;
  onPhotoChange?: (index: 1 | 2 | 3 | 4, newUrl: string) => void;
  onBackToGifts: () => void;
  onNextPage: () => void;
}

export function MessagePolaroidSlide({
  recipientName = 'Olivia',
  customMessage,
  onUpdateMessage,
  photo1 = '/src/assets/images/couple_hats_1790359739368.jpg',
  photo2 = '/src/assets/images/couple_flower_1790359751908.jpg',
  photo3 = '/src/assets/images/polaroid_candid_smile_1790319059352.jpg',
  photo4 = '/src/assets/images/couple_selfie_1790359764568.jpg',
  onPhotoChange,
  onBackToGifts,
  onNextPage,
}: MessagePolaroidSlideProps) {
  const [isLetterExpanded, setIsLetterExpanded] = useState(false);
  const [isEditingMessage, setIsEditingMessage] = useState(false);
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);
  const [messageDraft, setMessageDraft] = useState(
    customMessage ||
      `Happy birthday! Wishing you a day filled with laughter, good vibes, and all the little things that make you genuinely happy. You deserve to feel appreciated & celebrated—not just today, but every day. May this year bring you new memories, fun adventures, and endless reasons to smile. Always remember that you are deeply loved! ♡`
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadIndex, setUploadIndex] = useState<1 | 2 | 3 | 4 | null>(null);

  const handleTriggerUpload = (index: 1 | 2 | 3 | 4, e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadIndex(index);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && uploadIndex && onPhotoChange) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onPhotoChange(uploadIndex, reader.result);
          sfx.playCameraShutter();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveMessage = () => {
    if (onUpdateMessage) {
      onUpdateMessage(messageDraft);
    }
    setIsEditingMessage(false);
    sfx.playSparkle();
  };

  return (
    <div className="relative w-full h-full min-h-[580px] overflow-hidden select-none flex flex-col justify-between">
      {/* Hidden File Input for uploading photo directly to polaroid */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* 1. BACKGROUND: Dreamy Blue Cafe Flatlay Table with Iced Coffee Glasses */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url('/src/assets/images/blue_cafe_flatlay_1790359722108.jpg')`,
        }}
      >
        {/* Soft Blue Atmospheric Overlay to match user's requested blue theme */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#053658]/85 via-[#085282]/70 to-[#0a6ca5]/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[#074775]/25 backdrop-blur-[0.5px]" />
      </div>

      {/* TOP NAVIGATION BAR */}
      <div className="relative z-30 flex items-center justify-between px-3 sm:px-8 pt-3 sm:pt-6">
        <button
          onClick={onBackToGifts}
          className="cursor-pointer group flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-black/35 hover:bg-black/55 backdrop-blur-md text-white/90 hover:text-white border border-white/20 text-xs sm:text-sm font-['Fredoka'] transition-all shadow-md active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Hadiah</span>
        </button>

        <button
          onClick={onNextPage}
          className="cursor-pointer group flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-[#087fbd]/80 hover:bg-[#087fbd] backdrop-blur-md text-white border border-white/30 text-xs sm:text-sm font-['Fredoka'] font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          <span>Album Kenangan</span>
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* CENTER CANVAS: ENVELOPE + LETTER (Left) & 4 POLAROIDS (Right) */}
      <div className="relative z-20 w-full max-w-6xl mx-auto h-full flex-1 flex flex-col md:flex-row items-center justify-between p-2 sm:p-6 overflow-visible">
        
        {/* ============================================================== */}
        {/* LEFT SECTION: ROYAL BLUE ENVELOPE WITH SCALLOPED LACE & LETTER */}
        {/* ============================================================== */}
        <div className="relative w-full md:w-[42%] max-w-md mt-auto md:my-auto md:ml-4 pb-4 sm:pb-0 z-20">
          
          {/* Envelope & Emerging Letter Container */}
          <div 
            className="relative cursor-pointer group"
            onClick={() => {
              sfx.playPageFlip();
              setIsLetterExpanded(true);
            }}
          >
            {/* FLOATING TEXT CARD (Sliding out of the envelope) */}
            <div 
              className="relative -mb-16 sm:-mb-24 w-[92%] sm:w-[90%] mx-auto bg-[#faf8f5] text-slate-800 rounded-t-xl sm:rounded-t-2xl shadow-xl p-3.5 sm:p-5 border border-amber-100/70 transition-transform duration-300 group-hover:-translate-y-4"
              style={{
                boxShadow: '0 -10px 25px rgba(0,0,0,0.25)',
              }}
            >
              {/* Top Hint: [change the message] (Exact match to reference photo) */}
              <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-dashed border-slate-300/80">
                <span 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditingMessage(true);
                  }}
                  className="font-['Caveat'] text-xs sm:text-sm text-sky-700 hover:text-sky-900 font-bold tracking-wide flex items-center gap-1 cursor-pointer"
                  title="Klik untuk mengubah teks surat"
                >
                  <Edit3 className="w-3 h-3" />
                  [change the message]
                </span>
                <span className="font-['Cormorant_Garamond'] italic text-xs text-slate-400">
                  for {recipientName}
                </span>
              </div>

              {/* Letter Snippet in charming handwritten font */}
              <p className="font-['Patrick_Hand'] text-xs sm:text-sm md:text-base text-slate-700 leading-snug line-clamp-4 sm:line-clamp-5">
                {customMessage || messageDraft}
              </p>

              {/* Little cute tap indicator */}
              <div className="mt-2 text-center">
                <span className="inline-block text-[11px] font-['Caveat'] text-slate-500 group-hover:text-sky-700 font-semibold underline underline-offset-2">
                  tap to read full letter ♡
                </span>
              </div>
            </div>

            {/* THE BLUE ENVELOPE BODY (Theme adapted to rich royal blue with lace edge) */}
            <div className="relative w-full aspect-[1.35/1] filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.5)]">
              <svg 
                viewBox="0 0 320 230" 
                className="w-full h-full overflow-visible"
              >
                <defs>
                  {/* Royal Blue Gradients */}
                  <linearGradient id="blueEnvBack" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1a5276" />
                    <stop offset="100%" stopColor="#0e3a57" />
                  </linearGradient>
                  <linearGradient id="blueEnvFront" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#1f618d" />
                    <stop offset="50%" stopColor="#1a5276" />
                    <stop offset="100%" stopColor="#154360" />
                  </linearGradient>
                  <linearGradient id="blueFlap" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2471a3" />
                    <stop offset="100%" stopColor="#1a5276" />
                  </linearGradient>
                  <linearGradient id="scallopCream" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#f5efe6" />
                  </linearGradient>
                </defs>

                {/* Back Plate of Envelope */}
                <rect x="10" y="30" width="300" height="190" rx="8" fill="url(#blueEnvBack)" />

                {/* Left & Right Fold Flaps */}
                <path d="M 10 30 L 160 140 L 10 220 Z" fill="#154360" opacity="0.6" />
                <path d="M 310 30 L 160 140 L 310 220 Z" fill="#154360" opacity="0.6" />

                {/* Bottom Triangle Flap */}
                <path d="M 10 220 L 160 135 L 310 220 Z" fill="url(#blueEnvFront)" stroke="#2874a6" strokeWidth="1" />

                {/* TOP OPEN FLAP WITH V-SHAPE & SCALLOPED DOILY LACE EDGE (Matching Reference Photo!) */}
                <g className="transition-transform duration-300 group-hover:-translate-y-1">
                  {/* Flap Base Triangle */}
                  <path 
                    d="M 10 30 L 160 -40 L 310 30 Z" 
                    fill="url(#blueFlap)" 
                    stroke="#2980b9" 
                    strokeWidth="1.2" 
                  />

                  {/* SCALLOPED LACE BORDER ALONG THE V-FLAP */}
                  <path 
                    d="M 10 30 
                       Q 25 20, 40 22 
                       Q 55 12, 70 14 
                       Q 85 4, 100 6 
                       Q 115 -4, 130 -2 
                       Q 145 -14, 160 -36 
                       Q 175 -14, 190 -2 
                       Q 205 -4, 220 6 
                       Q 235 4, 250 14 
                       Q 265 12, 280 22 
                       Q 295 20, 310 30 
                       L 160 -40 Z" 
                    fill="url(#scallopCream)" 
                    stroke="#d5c7b5" 
                    strokeWidth="1" 
                  />

                  {/* Scallop Dainty Pearl/Flower Holes along the lace edge */}
                  {[
                    { cx: 35, cy: 24 },
                    { cx: 65, cy: 16 },
                    { cx: 95, cy: 8 },
                    { cx: 125, cy: 0 },
                    { cx: 155, cy: -20 },
                    { cx: 165, cy: -20 },
                    { cx: 195, cy: 0 },
                    { cx: 225, cy: 8 },
                    { cx: 255, cy: 16 },
                    { cx: 285, cy: 24 },
                  ].map((dot, i) => (
                    <circle key={i} cx={dot.cx} cy={dot.cy} r="2.8" fill="#1b4f72" opacity="0.8" />
                  ))}

                  {/* Decorative Flower Studs on the lace corners (like in reference image) */}
                  <g transform="translate(10, 30)">
                    <circle cx="0" cy="0" r="7" fill="#ffffff" stroke="#d5c7b5" strokeWidth="1" />
                    <circle cx="0" cy="0" r="2.5" fill="#e74c3c" />
                  </g>
                  <g transform="translate(310, 30)">
                    <circle cx="0" cy="0" r="7" fill="#ffffff" stroke="#d5c7b5" strokeWidth="1" />
                    <circle cx="0" cy="0" r="2.5" fill="#e74c3c" />
                  </g>

                  {/* "Click to view" Cursive / Serif Text on top of flap */}
                  <text 
                    x="160" 
                    y="6" 
                    textAnchor="middle" 
                    className="font-['Cormorant_Garamond'] italic font-bold text-sm" 
                    fill="#c0392b"
                  >
                    Click to view
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* RIGHT SECTION: 4 AESTHETIC POLAROIDS SCATTERED LIKE REFERENCE  */}
        {/* ============================================================== */}
        <div className="relative w-full md:w-[58%] h-80 sm:h-96 md:h-[460px] select-none">
          
          {/* DOODLE 1: WHITE HAND-DRAWN HEART (Top Right) */}
          <div className="absolute top-1 sm:top-2 right-4 sm:right-8 z-20 pointer-events-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            <svg viewBox="0 0 60 60" className="w-9 h-9 sm:w-12 sm:h-12 text-white/90">
              <path 
                d="M 30 18 C 30 10, 20 4, 12 8 C 4 12, 3 24, 10 34 C 18 44, 28 50, 30 52 C 32 50, 42 44, 50 34 C 57 24, 56 12, 48 8 C 40 4, 30 10, 30 18 Z" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <path 
                d="M 28 20 C 28 14, 22 10, 16 12" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                opacity="0.7"
              />
            </svg>
          </div>

          {/* DOODLE 2: WHITE HAND-DRAWN BALLOONS (Bottom Center / Left of Polaroid 3) */}
          <div className="absolute bottom-2 sm:bottom-6 left-[18%] sm:left-[22%] z-20 pointer-events-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            <svg viewBox="0 0 70 85" className="w-10 h-14 sm:w-14 sm:h-18 text-white/90">
              {/* Left Balloon */}
              <ellipse cx="26" cy="26" rx="14" ry="18" fill="none" stroke="currentColor" strokeWidth="2.2" transform="rotate(-8 26 26)" />
              <path d="M 24 44 L 21 48 L 27 48 Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
              {/* Right Balloon */}
              <ellipse cx="44" cy="22" rx="13" ry="17" fill="none" stroke="currentColor" strokeWidth="2.2" transform="rotate(10 44 22)" />
              <path d="M 45 39 L 42 43 L 48 43 Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
              {/* Balloon Strings */}
              <path d="M 24 48 Q 28 62, 34 74" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M 45 43 Q 40 60, 34 74" fill="none" stroke="currentColor" strokeWidth="1.6" />
              {/* Bow / Ribbon */}
              <path d="M 34 74 C 28 72, 28 80, 34 78 C 40 80, 40 72, 34 74 Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M 33 78 L 28 84" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <path d="M 35 78 L 40 84" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </div>

          {/* ========================================================== */}
          {/* POLAROID 1 (Top Center-Left: Couple Animal Plush Hats)    */}
          {/* ========================================================== */}
          <div 
            onClick={() => setActivePhotoModal(photo1)}
            className="absolute left-[2%] sm:left-[6%] top-[2%] sm:top-[2%] z-10 w-28 sm:w-40 md:w-44 -rotate-8 hover:rotate-0 hover:scale-108 transition-all duration-300 cursor-pointer group"
          >
            <div className="bg-white p-2 sm:p-2.5 pb-6 sm:pb-8 rounded-xs shadow-[0_8px_20px_rgba(0,0,0,0.35)] border border-slate-200/60 relative">
              <div className="aspect-square w-full overflow-hidden bg-slate-100 rounded-2xs relative">
                <img 
                  src={photo1} 
                  alt="Animal Hats Couple" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <button
                  onClick={(e) => handleTriggerUpload(1, e)}
                  title="Ganti foto polaroid ini"
                  className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Camera className="w-3 h-3" />
                </button>
              </div>
              <span className="block text-center font-['Caveat'] text-slate-500 text-xs sm:text-sm mt-1">
                sweet memories ♡
              </span>
            </div>
          </div>

          {/* ========================================================== */}
          {/* POLAROID 2 (Top Right: Couple with Flower Bouquet)        */}
          {/* ========================================================== */}
          <div 
            onClick={() => setActivePhotoModal(photo2)}
            className="absolute right-[4%] sm:right-[10%] top-[4%] sm:top-[4%] z-10 w-28 sm:w-40 md:w-44 rotate-3 hover:rotate-0 hover:scale-108 transition-all duration-300 cursor-pointer group"
          >
            <div className="bg-white p-2 sm:p-2.5 pb-6 sm:pb-8 rounded-xs shadow-[0_8px_20px_rgba(0,0,0,0.35)] border border-slate-200/60 relative">
              <div className="aspect-square w-full overflow-hidden bg-slate-100 rounded-2xs relative">
                <img 
                  src={photo2} 
                  alt="Couple with Flowers" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <button
                  onClick={(e) => handleTriggerUpload(2, e)}
                  title="Ganti foto polaroid ini"
                  className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Camera className="w-3 h-3" />
                </button>
              </div>
              <span className="block text-center font-['Caveat'] text-slate-500 text-xs sm:text-sm mt-1">
                for you 🌸
              </span>
            </div>
          </div>

          {/* ========================================================== */}
          {/* POLAROID 3 (Bottom Center: Laughing Candid Smile)         */}
          {/* ========================================================== */}
          <div 
            onClick={() => setActivePhotoModal(photo3)}
            className="absolute left-[26%] sm:left-[30%] bottom-[4%] sm:bottom-[8%] z-10 w-28 sm:w-40 md:w-44 rotate-1 hover:rotate-0 hover:scale-108 transition-all duration-300 cursor-pointer group"
          >
            <div className="bg-white p-2 sm:p-2.5 pb-6 sm:pb-8 rounded-xs shadow-[0_8px_20px_rgba(0,0,0,0.35)] border border-slate-200/60 relative">
              <div className="aspect-square w-full overflow-hidden bg-slate-100 rounded-2xs relative">
                <img 
                  src={photo3} 
                  alt="Laughing Smile" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <button
                  onClick={(e) => handleTriggerUpload(3, e)}
                  title="Ganti foto polaroid ini"
                  className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Camera className="w-3 h-3" />
                </button>
              </div>
              <span className="block text-center font-['Caveat'] text-slate-500 text-xs sm:text-sm mt-1">
                pure joy ✨
              </span>
            </div>
          </div>

          {/* ========================================================== */}
          {/* POLAROID 4 (Bottom Right: Couple Playful Selfie)          */}
          {/* ========================================================== */}
          <div 
            onClick={() => setActivePhotoModal(photo4)}
            className="absolute right-[2%] sm:right-[6%] bottom-[2%] sm:bottom-[6%] z-10 w-28 sm:w-40 md:w-44 rotate-10 hover:rotate-0 hover:scale-108 transition-all duration-300 cursor-pointer group"
          >
            <div className="bg-white p-2 sm:p-2.5 pb-6 sm:pb-8 rounded-xs shadow-[0_8px_20px_rgba(0,0,0,0.35)] border border-slate-200/60 relative">
              <div className="aspect-square w-full overflow-hidden bg-slate-100 rounded-2xs relative">
                <img 
                  src={photo4} 
                  alt="Couple Selfie" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <button
                  onClick={(e) => handleTriggerUpload(4, e)}
                  title="Ganti foto polaroid ini"
                  className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Camera className="w-3 h-3" />
                </button>
              </div>
              <span className="block text-center font-['Caveat'] text-slate-500 text-xs sm:text-sm mt-1">
                always with you 🤍
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* FOOTER BAR (Mockup hints matching reference photo footer: "Resize on mobile", etc.) */}
      <div className="relative z-30 px-4 py-2 sm:py-3 flex items-center justify-between text-white/80 text-[11px] sm:text-xs font-sans border-t border-white/10 bg-black/20 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-sky-200">
            <Sparkles className="w-3 h-3 text-yellow-300" />
            <span>Tema Biru Spesial</span>
          </span>
          <span className="hidden sm:inline text-white/40">•</span>
          <span className="hidden sm:inline text-white/70">
            Klik foto polaroid atau amplop untuk melihat detail
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLetterExpanded(true)}
            className="cursor-pointer text-sky-200 hover:text-white underline underline-offset-2 transition-colors font-medium"
          >
            Buka Surat Lengkap 💌
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODAL 1: FULL EXPANDED LETTER READER                           */}
      {/* ============================================================== */}
      {isLetterExpanded && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsLetterExpanded(false)}
        >
          <div 
            className="w-full max-w-xl bg-[#fffefc] text-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 relative border-4 border-[#1a5276]/30 max-h-[88vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsLetterExpanded(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Letter Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-dashed border-slate-300">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-[#1a5276] text-white flex items-center justify-center shadow-sm">
                  <Heart className="w-5 h-5 fill-current text-sky-200" />
                </div>
                <div>
                  <h3 className="font-['Fredoka'] font-bold text-slate-800 text-lg leading-tight">
                    For {recipientName} 💌
                  </h3>
                  <p className="font-['Caveat'] text-slate-500 text-sm">
                    A special birthday message
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsLetterExpanded(false);
                  setIsEditingMessage(true);
                }}
                className="text-xs font-['Fredoka'] text-sky-700 hover:text-sky-900 font-semibold flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" />
                Edit Pesan
              </button>
            </div>

            {/* Letter Body */}
            <div className="font-['Caveat'] text-2xl sm:text-3xl text-slate-700 leading-relaxed whitespace-pre-line py-2">
              {customMessage || messageDraft}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center">
              <span className="font-['Cormorant_Garamond'] italic text-slate-400 text-sm">
                sealed with love
              </span>
              <button 
                onClick={() => setIsLetterExpanded(false)}
                className="px-5 py-2 bg-[#1a5276] hover:bg-[#154360] text-white text-sm font-sans font-bold rounded-xl shadow-md transition-all cursor-pointer hover:scale-102"
              >
                Tutup Surat ♡
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: QUICK EDIT MESSAGE MODAL                             */}
      {/* ============================================================== */}
      {isEditingMessage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsEditingMessage(false)}
        >
          <div 
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 relative border-2 border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-['Fredoka'] font-bold text-slate-800 text-lg sm:text-xl flex items-center gap-2">
                <span>Edit Pesan Surat</span>
                <span className="text-xs text-sky-600 font-normal">({recipientName})</span>
              </h3>
              <button 
                onClick={() => setIsEditingMessage(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-3 font-sans">
              Tuliskan pesan yang akan muncul di dalam amplop biru ini:
            </p>

            <textarea
              rows={6}
              value={messageDraft}
              onChange={(e) => setMessageDraft(e.target.value)}
              className="w-full border-2 border-slate-200 rounded-2xl p-3 text-sm text-slate-700 font-['Caveat'] text-xl focus:outline-none focus:border-[#1a5276] transition-colors"
              placeholder="Tulis pesan ulang tahunmu di sini..."
            />

            <div className="mt-4 flex gap-2 justify-end">
              <button
                onClick={() => setIsEditingMessage(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleSaveMessage}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#1a5276] hover:bg-[#154360] text-white flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                Simpan Pesan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 3: ENLARGED POLAROID PHOTO VIEWER                       */}
      {/* ============================================================== */}
      {activePhotoModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActivePhotoModal(null)}
        >
          <div 
            className="max-w-md w-full bg-white p-3 sm:p-4 pb-8 sm:pb-12 rounded-sm shadow-2xl relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setActivePhotoModal(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white text-slate-700 shadow-md flex items-center justify-center hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="aspect-square w-full bg-slate-100 rounded-xs overflow-hidden">
              <img 
                src={activePhotoModal} 
                alt="Enlarged Polaroid" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center font-['Caveat'] text-2xl text-slate-600 mt-4">
              Happy Birthday, {recipientName}! ♡
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
