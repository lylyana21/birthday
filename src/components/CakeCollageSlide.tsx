import React, { useState, useEffect, useRef } from 'react';
import { Camera, X, Sparkles, ArrowLeft, ArrowRight, Play, Pause, Volume2, Heart } from 'lucide-react';
import { sfx } from '../utils/audio';

interface CakeCollageSlideProps {
  recipientName: string;
  onBack: () => void;
  onNext: () => void;
  hatsPhoto?: string;
  clipPhoto?: string;
  camcorderPhoto?: string;
  stripPhotos?: string[];
  onPhotoChange?: (key: 'hats' | 'clip' | 'camcorder' | number, newUrl: string) => void;
}

export function CakeCollageSlide({
  recipientName = 'Olivia',
  onBack,
  onNext,
  hatsPhoto = '/src/assets/images/couple_hats_1790359739368.jpg',
  clipPhoto = '/src/assets/images/couple_peace_pose_1790361449273.jpg',
  camcorderPhoto = '/src/assets/images/polaroid_candid_smile_1790319059352.jpg',
  stripPhotos = [
    '/src/assets/images/couple_night_walk_1790361515816.jpg',
    '/src/assets/images/couple_flower_1790359751908.jpg',
    '/src/assets/images/frilly_heart_cake_1790319044352.jpg',
    '/src/assets/images/couple_selfie_1790359764568.jpg',
  ],
  onPhotoChange,
}: CakeCollageSlideProps) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);
  const stopMusicRef = useRef<(() => void) | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTarget, setUploadTarget] = useState<'hats' | 'clip' | 'camcorder' | number | null>(null);

  // Toggle vinyl music
  const handleToggleVinyl = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlayingMusic) {
      stopMusicRef.current?.();
      sfx.stopMusicBox();
      setIsPlayingMusic(false);
    } else {
      setIsPlayingMusic(true);
      sfx.playSparkle();
      stopMusicRef.current = sfx.startMusicBox(() => {
        setIsPlayingMusic(false);
      });
    }
  };

  useEffect(() => {
    return () => {
      stopMusicRef.current?.();
      sfx.stopMusicBox();
    };
  }, []);

  const handleTriggerUpload = (target: 'hats' | 'clip' | 'camcorder' | number, e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadTarget(target);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && uploadTarget !== null && onPhotoChange) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onPhotoChange(uploadTarget, reader.result);
          sfx.playCameraShutter();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[580px] overflow-hidden select-none flex flex-col justify-between">
      {/* Hidden file input for updating photos */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* 1. BACKGROUND: Deep Blue Velvet / Rich Sapphire Mood (Matching User's Blue Theme) */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url('/src/assets/images/blue_velvet_bg_1790360900288.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#031d33]/90 via-[#06385d]/80 to-[#042846]/85 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[#073b61]/25 backdrop-blur-[0.5px]" />
      </div>

      {/* Ambient Sparkles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <span className="absolute top-[14%] left-[12%] text-white text-base animate-pulse">✦</span>
        <span className="absolute top-[22%] right-[22%] text-sky-200 text-sm animate-ping">✧</span>
        <span className="absolute bottom-[24%] left-[28%] text-blue-200 text-base animate-pulse">⋆</span>
        <span className="absolute bottom-[16%] right-[16%] text-white text-xl animate-bounce">✦</span>
      </div>

      {/* TOP NAVIGATION BAR */}
      <div className="relative z-30 flex items-center justify-between px-3 sm:px-8 pt-3 sm:pt-6">
        <button
          onClick={onBack}
          className="cursor-pointer group flex items-center justify-center p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white/90 hover:text-white border border-white/20 transition-all shadow-md active:scale-95"
          title="Kembali ke Hadiah"
          aria-label="Kembali ke Hadiah"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <div className="flex items-center gap-2">
          {isPlayingMusic && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/30 border border-sky-400/40 text-sky-200 text-xs animate-pulse">
              <Volume2 className="w-3.5 h-3.5" />
              <span>Playing Music Box 🎵</span>
            </div>
          )}

          <button
            onClick={onNext}
            className="cursor-pointer group flex items-center justify-center p-2 sm:p-2.5 rounded-full bg-[#087fbd]/80 hover:bg-[#087fbd] backdrop-blur-md text-white border border-white/30 transition-all shadow-md hover:shadow-lg active:scale-95"
            title="Album Kenangan"
            aria-label="Album Kenangan"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MAIN COLLAGE STAGE (Exact Match to User Reference Layout)       */}
      {/* ============================================================== */}
      <div className="relative z-20 w-full max-w-6xl mx-auto h-full flex-1 flex flex-col md:flex-row items-center justify-between p-2 sm:p-6 overflow-visible">
        
        {/* ============================================================ */}
        {/* LEFT & CENTER: GINGHAM COLLAGE + VINTAGE CAMCORDER          */}
        {/* ============================================================ */}
        <div className="relative w-full md:w-[68%] h-full flex flex-col justify-between py-2 sm:py-4">
          
          {/* TORN BLUE GINGHAM COLLAGE PAPER BOARD */}
          <div className="relative w-full max-w-lg mx-auto sm:mx-0 sm:ml-4 mt-2 sm:mt-4">
            
            {/* Gingham Paper Background with Torn Edges */}
            <div 
              className="relative p-4 sm:p-6 rounded-md shadow-[0_16px_36px_rgba(0,0,0,0.55)] border-2 border-white/90"
              style={{
                backgroundColor: '#e6f2fa',
                backgroundImage: `
                  linear-gradient(45deg, #a5d2eb 25%, transparent 25%), 
                  linear-gradient(-45deg, #a5d2eb 25%, transparent 25%), 
                  linear-gradient(45deg, transparent 75%, #a5d2eb 75%), 
                  linear-gradient(-45deg, transparent 75%, #a5d2eb 75%)
                `,
                backgroundSize: '24px 24px',
                backgroundPosition: '0 0, 0 12px, 12px -12px, -12px 0px',
              }}
            >
              {/* White torn paper edge overlay along bottom & sides */}
              <div 
                className="absolute -bottom-3 left-0 right-0 h-4 bg-white/95 pointer-events-none"
                style={{
                  clipPath: 'polygon(0% 0%, 5% 100%, 10% 20%, 15% 90%, 20% 10%, 25% 100%, 30% 15%, 35% 85%, 40% 10%, 45% 95%, 50% 15%, 55% 100%, 60% 20%, 65% 90%, 70% 15%, 75% 100%, 80% 20%, 85% 95%, 90% 15%, 95% 100%, 100% 0%)',
                }}
              />

              {/* GRID OF TWO PHOTOS: SCALLOPED POSTAL FRAME + BINDER CLIP POLAROID */}
              <div className="relative flex items-center justify-around gap-2 sm:gap-4 pt-1 pb-4">
                
                {/* 1. SCALLOPED POSTAL STAMP / CAMEO FRAME (Left Photo: Plush animal hats) */}
                <div 
                  onClick={() => setActivePhotoModal(hatsPhoto)}
                  className="relative cursor-pointer group transition-transform duration-300 hover:scale-105 active:scale-95"
                >
                  {/* Red/Blue Scalloped Border Frame */}
                  <div className="w-32 sm:w-44 md:w-48 aspect-square p-2.5 bg-[#b92b3c] rounded-2xl shadow-xl relative border border-white/60">
                    
                    {/* Cute Bow Ribbon on Top-Left Corner (Exact match to reference) */}
                    <div className="absolute -top-3 -left-3 z-30 w-9 h-9 text-[#d63031] filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                      <svg viewBox="0 0 40 40" className="w-full h-full fill-current">
                        {/* Center Knot */}
                        <circle cx="20" cy="20" r="4.5" fill="#e74c3c" />
                        {/* Left Loop */}
                        <path d="M 20 20 C 14 10, 4 12, 6 22 C 8 28, 16 24, 20 20 Z" fill="#ff7675" stroke="#c0392b" strokeWidth="1" />
                        {/* Right Loop */}
                        <path d="M 20 20 C 26 10, 36 12, 34 22 C 32 28, 24 24, 20 20 Z" fill="#ff7675" stroke="#c0392b" strokeWidth="1" />
                        {/* Ribbon Tails */}
                        <path d="M 18 22 Q 12 32, 10 36 L 15 34 Q 18 28, 20 22 Z" fill="#c0392b" />
                        <path d="M 22 22 Q 28 32, 30 36 L 25 34 Q 22 28, 20 22 Z" fill="#c0392b" />
                      </svg>
                    </div>

                    {/* Cameo Oval/Rounded Photo Container */}
                    <div className="w-full h-full rounded-xl overflow-hidden border-2 border-white/80 bg-slate-100 relative">
                      <img 
                        src={hatsPhoto} 
                        alt="Couple in Plush Animal Hats" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <button
                        onClick={(e) => handleTriggerUpload('hats', e)}
                        title="Ganti foto frame ini"
                        className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Camera className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. POLAROID WITH RED BINDER CLIP & VINYL RECORD (Right Photo) */}
                <div className="relative">
                  
                  {/* Polaroid Frame */}
                  <div 
                    onClick={() => setActivePhotoModal(clipPhoto)}
                    className="w-32 sm:w-44 md:w-48 bg-white p-2 pb-6 sm:pb-7 rounded-sm shadow-xl border border-slate-200/80 cursor-pointer group transition-transform duration-300 hover:scale-105 active:scale-95 rotate-2"
                  >
                    {/* Red Binder Clip on Top Center (Exact match to reference photo!) */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 w-7 h-7 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                      <svg viewBox="0 0 32 32" className="w-full h-full">
                        {/* Metal Handles */}
                        <path d="M 12 14 L 12 4 C 12 2, 20 2, 20 4 L 20 14" fill="none" stroke="#718096" strokeWidth="2.2" strokeLinecap="round" />
                        {/* Red Clip Base Body */}
                        <path d="M 6 12 L 26 12 L 28 22 L 4 22 Z" fill="#e74c3c" stroke="#c0392b" strokeWidth="1" />
                        <rect x="8" y="16" width="16" height="2" fill="#c0392b" />
                      </svg>
                    </div>

                    {/* Photo area */}
                    <div className="aspect-square w-full rounded-xs overflow-hidden bg-slate-100 relative">
                      <img 
                        src={clipPhoto} 
                        alt="Couple Photo with Clip" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <button
                        onClick={(e) => handleTriggerUpload('clip', e)}
                        title="Ganti foto klip ini"
                        className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Camera className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* 3. VINYL RECORD: "Listen to music • CLICK ME" */}
                  <div 
                    onClick={handleToggleVinyl}
                    className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 z-30 cursor-pointer group"
                    title="Klik untuk memutar / menjeda lagu!"
                  >
                    <div className="relative w-20 h-20 sm:w-26 sm:h-26">
                      
                      {/* Black Vinyl Disc */}
                      <div className={`w-full h-full rounded-full bg-[#111111] p-1.5 shadow-2xl border border-white/20 flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] ${
                        isPlayingMusic ? 'animate-spin' : 'group-hover:scale-105'
                      }`}
                      style={{ animationDuration: '3.5s' }}
                      >
                        {/* Grooves on vinyl */}
                        <div className="w-full h-full rounded-full border border-slate-700/80 flex items-center justify-center p-1">
                          <div className="w-full h-full rounded-full border border-slate-600/60 flex items-center justify-center p-1">
                            {/* Curved Text along outer groove: Listen to music • CLICK ME */}
                            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                              <path 
                                id="vinylTextPath" 
                                d="M 50 15 A 35 35 0 1 1 49.9 15" 
                                fill="none" 
                              />
                              <text className="text-[8.5px] font-bold fill-white tracking-widest font-sans uppercase">
                                <textPath href="#vinylTextPath" startOffset="5%">
                                  Listen to music • CLICK ME
                                </textPath>
                              </text>
                            </svg>

                            {/* Center Red Record Label */}
                            <div className="absolute inset-0 m-auto w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#e74c3c] border-2 border-white/80 flex items-center justify-center shadow-inner">
                              {isPlayingMusic ? (
                                <Pause className="w-3.5 h-3.5 text-white fill-white" />
                              ) : (
                                <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
                              )}
                              <div className="w-1.5 h-1.5 rounded-full bg-black/60 absolute" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Tulip Sticker Doodle beside Vinyl (Exact from reference) */}
                      <div className="absolute -top-3 -right-2 w-6 h-6 pointer-events-none filter drop-shadow-xs">
                        <span className="text-xl">🌷</span>
                      </div>

                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* LOWER SECTION: VINTAGE DIGITAL CAMCORDER + BOW GARLAND DOODLE */}
          <div className="flex items-end justify-between mt-4 sm:mt-6 px-2 sm:px-4">
            
            {/* VINTAGE SILVER RETRO DIGITAL CAMERA / CAMCORDER (Bottom Left) */}
            <div 
              onClick={() => setActivePhotoModal(camcorderPhoto)}
              className="relative cursor-pointer group transition-transform duration-300 hover:scale-105 active:scale-95 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.55)]"
              title="Klik untuk melihat memori camcorder"
            >
              {/* Metallic Silver Body with Chrome Trim */}
              <div className="w-40 sm:w-56 md:w-64 bg-gradient-to-b from-[#f1f5f9] via-[#e2e8f0] to-[#cbd5e1] rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 border-2 sm:border-3 border-white shadow-xl flex items-center gap-2 sm:gap-3 relative">
                
                {/* LCD Screen Display */}
                <div className="w-[62%] aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden bg-black border-2 border-slate-400 relative">
                  <img 
                    src={camcorderPhoto} 
                    alt="Camcorder Screen" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" 
                  />
                  {/* Camcorder UI Overlay */}
                  <div className="absolute top-1 left-1.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    <span className="text-[8px] font-mono font-bold text-white bg-black/50 px-1 rounded-2xs">REC</span>
                  </div>
                  <div className="absolute bottom-1 right-1.5 text-[8px] font-mono text-white/90 bg-black/50 px-1 rounded-2xs">
                    04:14
                  </div>

                  <button
                    onClick={(e) => handleTriggerUpload('camcorder', e)}
                    title="Ganti foto camcorder"
                    className="absolute inset-0 m-auto w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Camera Control Panel (Dials, Buttons, Speaker holes) */}
                <div className="w-[38%] flex flex-col items-center justify-between py-1">
                  {/* Lens / Optical Sensor indicator */}
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-slate-400 via-slate-200 to-slate-500 border border-slate-300 flex items-center justify-center shadow-inner">
                    <div className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-slate-700 border border-slate-400" />
                  </div>

                  {/* Speaker Grill Dots */}
                  <div className="grid grid-cols-3 gap-0.5 my-1.5">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="w-1 h-1 rounded-full bg-slate-400" />
                    ))}
                  </div>

                  {/* Navigation Dial Wheel */}
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gradient-to-b from-slate-100 to-slate-300 border border-slate-400 shadow-md flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-slate-400" />
                  </div>
                </div>

              </div>
            </div>

            {/* WHITE DOODLE STRING OF BOWS (Exact match to reference bottom doodle) */}
            <div className="flex-1 ml-4 sm:ml-8 mb-2 sm:mb-4 overflow-hidden pointer-events-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              <p className="font-['Caveat'] text-white/90 text-xl sm:text-2xl tracking-widest whitespace-nowrap">
                ୨୧ ୨୧ ୨୧ ୨୧ ୨୧ ୨୧ ୨୧ ୨୧ ୨୧ ୨୧ ୨୧ ୨୧ ୨୧
              </p>
            </div>

          </div>

        </div>

        {/* ============================================================ */}
        {/* RIGHT SECTION: VERTICAL PHOTOBOOTH STRIP (Korean 4-Cut)     */}
        {/* ============================================================ */}
        <div className="relative w-full md:w-[30%] max-w-xs flex justify-center py-2 sm:py-4">
          
          {/* White Photobooth Strip Card */}
          <div className="bg-white p-2.5 sm:p-3 pb-6 sm:pb-8 rounded-sm shadow-[0_16px_36px_rgba(0,0,0,0.55)] border border-slate-200/80 rotate-2 hover:rotate-0 transition-transform duration-300 w-44 sm:w-56 md:w-60">
            
            {/* Header of Photostrip */}
            <div className="text-center pb-2 mb-1.5 border-b border-dashed border-slate-300 flex items-center justify-between px-1">
              <span className="font-['Fredoka'] text-[10px] sm:text-xs font-bold text-slate-700 tracking-wider">
                MEMORIES WITH YOU
              </span>
              <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
            </div>

            {/* 4 Vertical Photo Frames */}
            <div className="space-y-2">
              {stripPhotos.map((photoUrl, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActivePhotoModal(photoUrl)}
                  className="aspect-[4/3] w-full rounded-2xs overflow-hidden bg-slate-100 relative group cursor-pointer border border-slate-200/60"
                >
                  <img 
                    src={photoUrl} 
                    alt={`Photobooth Cut ${idx + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <button
                    onClick={(e) => handleTriggerUpload(idx, e)}
                    title="Ganti foto ini"
                    className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Camera className="w-2.5 h-2.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer of Photostrip with Date */}
            <div className="mt-3 text-center">
              <span className="font-['Caveat'] text-slate-500 text-sm font-bold block">
                always with you, {recipientName} ♡
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* ============================================================== */}
      {/* MODAL: ENLARGED PHOTO VIEWER                                   */}
      {/* ============================================================== */}
      {activePhotoModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActivePhotoModal(null)}
        >
          <div 
            className="max-w-md w-full bg-white p-3 sm:p-4 pb-8 sm:pb-10 rounded-sm shadow-2xl relative animate-in zoom-in-95 duration-200"
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
                alt="Enlarged Memory" 
                className="w-full h-full object-cover" 
              />
            </div>
            <p className="text-center font-['Caveat'] text-2xl text-slate-600 mt-4">
              A sweet memory with {recipientName} ♡
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
