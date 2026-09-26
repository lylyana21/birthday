import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, ArrowRight, Heart, Sparkles, X, Check } from 'lucide-react';
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
  const [showBouquetMessage, setShowBouquetMessage] = useState(false);

  const handleBubbleClick = (index: number) => {
    setActiveBubble(index);
    sfx.playSparkle();
    setTimeout(() => setActiveBubble(null), 1200);
  };

  const handleTapBouquet = () => {
    sfx.playSparkle();
    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#ff72ba', '#60a5fa', '#ffe000', '#ffffff'],
    });
    setShowBouquetMessage(true);
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

      {/* 2. CORNER FLOWER BLOSSOMS (Top-Left & Right - Matching User's Flower) */}
      {/* Top-Left Flower Blossom */}
      <div className="absolute -top-10 -left-10 sm:-top-14 sm:-left-14 w-44 h-44 sm:w-60 sm:h-60 pointer-events-none z-10 opacity-90 filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)]">
        <img 
          src="/src/assets/images/denim_pearl_flower_1790397901343.jpg" 
          alt="Flower Blossom Accent" 
          className="w-full h-full object-contain rounded-full rotate-12"
        />
      </div>

      {/* Right Edge Flower Blossom */}
      <div className="absolute top-[20%] -right-12 sm:-right-20 w-48 h-48 sm:w-64 sm:h-64 pointer-events-none z-10 opacity-85 filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)]">
        <img 
          src="/src/assets/images/denim_pearl_flower_1790397901343.jpg" 
          alt="Flower Blossom Accent" 
          className="w-full h-full object-contain rounded-full -rotate-12"
        />
      </div>

      {/* Bottom Accent Flower Blossom */}
      <div className="absolute -bottom-8 left-[8%] w-36 h-36 sm:w-48 sm:h-48 pointer-events-none z-10 opacity-80 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]">
        <img 
          src="/src/assets/images/denim_pearl_flower_1790397901343.jpg" 
          alt="Flower Blossom Accent" 
          className="w-full h-full object-contain rounded-full rotate-45"
        />
      </div>

      {/* Floating Sparkles & Dust in the Blue Velvet Atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-40">
        <span className="absolute top-[16%] left-[22%] text-white text-lg animate-pulse">✦</span>
        <span className="absolute top-[28%] right-[25%] text-sky-200 text-sm animate-ping">✧</span>
        <span className="absolute bottom-[20%] left-[18%] text-blue-200 text-base animate-pulse">⋆</span>
        <span className="absolute bottom-[24%] right-[20%] text-white text-lg animate-bounce">✦</span>
      </div>

      {/* TOP HEADER & NAVIGATION BAR: Back and Next buttons (Buttons only, no text) */}
      <div className="relative z-30 pt-3 sm:pt-6 px-3 sm:px-8 flex items-center justify-between">
        {/* Top-Left Back Button (Button only) */}
        <button
          onClick={onBack}
          className="cursor-pointer group flex items-center justify-center p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white/90 hover:text-white border border-white/20 transition-all shadow-md active:scale-95"
          title="Kembali"
          aria-label="Kembali"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Cursive Calligraphy Title */}
        <div className="text-center px-2">
          <h1 className="font-['Alex_Brush'] text-3xl sm:text-5xl md:text-6xl text-white font-normal tracking-wide filter drop-shadow-[0_3px_12px_rgba(0,0,0,0.6)]">
            Flowers For You, My Sweetheart
          </h1>
          <p className="font-['Caveat'] text-sky-200 text-xs sm:text-sm tracking-wider">
            a bouquet that will never wilt for {recipientName} ♡
          </p>
        </div>

        {/* Top-Right Next Button (Button only) */}
        <button
          onClick={onNext}
          className="cursor-pointer group flex items-center justify-center p-2 sm:p-2.5 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 transition-all shadow-md active:scale-95"
          title="Selanjutnya"
          aria-label="Selanjutnya"
        >
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* ============================================================== */}
      {/* CENTER STAGE: BOUQUET & FLOATING SPEECH BUBBLES                */}
      {/* (No white background behind flowers and text per user request)  */}
      {/* ============================================================== */}
      <div className="relative z-20 w-full max-w-5xl mx-auto my-auto flex items-center justify-center px-2 sm:px-6">
        
        <div className="relative w-full max-w-3xl py-2 sm:py-6">

          {/* INTERIOR LAYOUT: BOUQUET IN CENTER + BUBBLES ON BOTH SIDES */}
          <div className="relative min-h-[320px] sm:min-h-[380px] md:min-h-[420px] flex items-center justify-center">
            
            {/* 1. CENTER BOUQUET */}
            <div className="relative z-10 w-44 sm:w-56 md:w-64 filter drop-shadow-[0_16px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105 cursor-pointer">
              <div 
                onClick={handleTapBouquet}
                className="aspect-square w-full rounded-2xl overflow-hidden relative shadow-2xl border-2 border-white/30"
              >
                <img 
                  src="/src/assets/images/flower_bouquet_kraft_1790360917725.jpg" 
                  alt="Flower Bouquet Wrapped in Kraft Paper" 
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Little Heart Badge underneath the bouquet */}
              <div 
                onClick={handleTapBouquet}
                className="text-center mt-2.5 flex flex-col items-center gap-1.5 cursor-pointer select-none"
              >
                <span className="inline-flex items-center gap-1.5 font-['Caveat'] text-sm sm:text-base text-pink-600 font-bold bg-white/90 hover:bg-white px-3 py-1 rounded-full shadow-md active:scale-95 transition-all">
                  <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" />
                  <span>tap bouquet for flowers!</span>
                </span>

                {/* Text "tungguin yaaa hihi" when clicked */}
                {showBouquetMessage && (
                  <div className="mt-1 animate-bounce">
                    <span className="inline-block font-['Caveat'] text-2xl sm:text-3xl text-yellow-300 font-bold bg-[#073b61]/85 backdrop-blur-md px-4 py-1.5 rounded-2xl border border-yellow-300/40 shadow-xl tracking-wide">
                      tungguin yaaa hihi ✨
                    </span>
                  </div>
                )}
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
