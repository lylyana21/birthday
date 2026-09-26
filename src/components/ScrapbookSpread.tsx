import React from 'react';
import { SpiralBinding } from './SpiralBinding';
import { Polaroid } from './Polaroid';
import { 
  EightPointBurst, 
  PurpleFlower, 
  DoodleRibbonTape, 
  DenimHeart, 
  WhiteSparkle, 
  LilacHeart, 
  BlueCloud, 
  FrillyHeartCake,
  StickerItem 
} from './Stickers';
import { ChevronLeft, ChevronRight, Book, Plus, Play, Pause, Volume2, VolumeX, Maximize2, Share2 } from 'lucide-react';
import { Memory, EventConfig } from '../types';
import { sfx } from '../utils/audio';

interface ScrapbookSpreadProps {
  leftMemory?: Memory;
  rightMemory?: Memory;
  currentPageIndex: number; // 0, 2, 4...
  totalPages: number;
  eventConfig: EventConfig;
  isPlayingSlideshow: boolean;
  onToggleSlideshow: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onGoToCover: () => void;
  onOpenSubmissionForm: () => void;
  onLikeMemory?: (id: string) => void;
  onToggleFullscreen?: () => void;
}

export function ScrapbookSpread({
  leftMemory,
  rightMemory,
  currentPageIndex,
  totalPages,
  eventConfig,
  isPlayingSlideshow,
  onToggleSlideshow,
  onPrevPage,
  onNextPage,
  onGoToCover,
  onOpenSubmissionForm,
  onLikeMemory,
  onToggleFullscreen,
}: ScrapbookSpreadProps) {
  const [soundEnabled, setSoundEnabled] = React.useState(sfx.isEnabled());

  const handleToggleSound = () => {
    const next = sfx.toggleSound();
    setSoundEnabled(next);
  };

  const handlePrev = () => {
    sfx.playPageFlip();
    onPrevPage();
  };

  const handleNext = () => {
    sfx.playPageFlip();
    onNextPage();
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Controls & Navigation Bar */}
      <div className="w-full max-w-6xl mb-3 flex flex-wrap items-center justify-between gap-2 px-2 text-xs">
        {/* Left: Book Cover link & Page counter */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sfx.playPageFlip();
              onGoToCover();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 font-medium transition-colors"
          >
            <Book className="w-3.5 h-3.5" />
            <span>Lihat Sampul</span>
          </button>
          <span className="text-slate-400 font-mono">
            Halaman {currentPageIndex + 1} - {Math.min(currentPageIndex + 2, totalPages)} dari {totalPages}
          </span>
        </div>

        {/* Center: Flip navigation buttons */}
        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 shadow-sm">
          <button
            onClick={handlePrev}
            disabled={currentPageIndex === 0}
            className={`p-1.5 rounded-lg flex items-center gap-1 font-medium transition-colors ${
              currentPageIndex === 0
                ? 'text-slate-600 cursor-not-allowed'
                : 'text-slate-200 hover:bg-slate-800 hover:text-white'
            }`}
            title="Halaman Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Sebelumnya</span>
          </button>

          <span className="h-4 w-px bg-slate-700 mx-1" />

          <button
            onClick={handleNext}
            disabled={currentPageIndex + 2 >= totalPages}
            className={`p-1.5 rounded-lg flex items-center gap-1 font-medium transition-colors ${
              currentPageIndex + 2 >= totalPages
                ? 'text-slate-600 cursor-not-allowed'
                : 'text-slate-200 hover:bg-slate-800 hover:text-white'
            }`}
            title="Halaman Berikutnya"
          >
            <span className="hidden sm:inline">Berikutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSlideshow}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors border ${
              isPlayingSlideshow
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
            }`}
            title={isPlayingSlideshow ? 'Hentikan Putar Otomatis' : 'Putar Otomatis untuk Layar Acara'}
          >
            {isPlayingSlideshow ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isPlayingSlideshow ? 'Pause Slide' : 'Slide Acara'}</span>
          </button>

          <button
            onClick={handleToggleSound}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors"
            title={soundEnabled ? 'Matikan Suara Efek' : 'Nyalakan Suara Efek'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenSubmissionForm}
            className="flex items-center gap-1 px-3 py-1.5 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold shadow-sm transition-transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Kirim Kenangan</span>
          </button>
        </div>
      </div>

      {/* THE OPEN DENIM SCRAPBOOK SPREAD (Exact to Image 3) */}
      <div className="relative w-full max-w-6xl aspect-[1.75/1] min-h-[520px] sm:min-h-[580px] md:min-h-[640px] denim-dark rounded-2xl p-4 sm:p-7 md:p-9 shadow-2xl overflow-hidden border-2 border-sky-950 flex flex-col justify-center">
        
        {/* Denim twill texture and shading */}
        <div className="absolute inset-0 bg-radial from-transparent via-black/15 to-black/50 pointer-events-none" />

        {/* Center Spine Vertical Stitching Lines (Image 3) */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-12 w-0.5 border-l-2 border-dashed border-white/60 pointer-events-none hidden md:block" />
        <div className="absolute top-0 bottom-0 left-1/2 translate-x-12 w-0.5 border-r-2 border-dashed border-white/60 pointer-events-none hidden md:block" />

        {/* Center Metal Double-Wire Spiral Notebook Binding (Image 3) */}
        <SpiralBinding loopsCount={22} position="center" />

        {/* Two Pages Grid Container (Left Page & Right Page) */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 h-full w-full">
          
          {/* ===================== LEFT PAGE ===================== */}
          <div className="relative w-full h-full flex flex-col">
            {/* Torn Grid Paper Sheet (Image 3) */}
            <div className="relative w-full h-full grid-paper torn-paper-edge p-5 sm:p-7 flex flex-col justify-between overflow-hidden shadow-xl">
              
              {/* Header: "Welcome to the Celebration" (Image 3) */}
              <div className="relative z-10 pb-2">
                <h2 className="font-cursive text-3xl sm:text-4xl text-[#0b2847] tracking-wide filter drop-shadow-xs">
                  {currentPageIndex === 0 
                    ? (eventConfig.eventHeading || 'Welcome to the Celebration')
                    : `Kenangan #${currentPageIndex + 1}`}
                </h2>
                <div className="w-16 h-0.5 bg-blue-300/60 mt-1" />
              </div>

              {/* Main Content: Polaroid with Paperclip and Stickers */}
              <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-2">
                {leftMemory ? (
                  <div className="relative">
                    {/* The Polaroid Photo */}
                    <Polaroid
                      imageSrc={leftMemory.photoUrl || '/src/assets/images/polaroid_candid_smile_1790319059352.jpg'}
                      caption={leftMemory.photoCaption || leftMemory.senderName}
                      date={leftMemory.createdAt}
                      rotation={-4}
                      paperclipColor={leftMemory.paperclipColor || 'silver'}
                      paperclipOffset={26}
                      likesCount={leftMemory.likesCount}
                      onLike={() => onLikeMemory && onLikeMemory(leftMemory.id)}
                    />

                    {/* Sticker: 8-Pointed Star Burst Doodle at bottom corner of polaroid (Image 3) */}
                    <div className="absolute -bottom-5 -right-6 z-30">
                      <EightPointBurst size={56} />
                    </div>

                    {/* Sticker: Pastel Purple 5-Petal Flower near top-right of polaroid (Image 3) */}
                    <div className="absolute -top-3 -right-8 z-30">
                      <PurpleFlower size={48} />
                    </div>

                    {/* Extra user-selected stickers */}
                    {leftMemory.stickers?.map((st) => (
                      <div 
                        key={st.id} 
                        className="absolute z-30 pointer-events-none"
                        style={{
                          left: `${st.x}%`,
                          top: `${st.y}%`,
                          transform: `rotate(${st.rotation}deg) scale(${st.scale || 1})`,
                        }}
                      >
                        <StickerItem sticker={st} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-blue-300 rounded-xl bg-white/40">
                    <p className="font-hand text-2xl text-slate-700">Halaman ini siap untuk kenanganmu!</p>
                    <button
                      onClick={onOpenSubmissionForm}
                      className="mt-3 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg text-xs font-semibold shadow"
                    >
                      Unggah Foto & Cerita Pertama
                    </button>
                  </div>
                )}
              </div>

              {/* Left Page Footer Note */}
              <div className="relative z-10 pt-2 flex items-center justify-between text-slate-500 font-sans text-xs">
                <span className="font-hand text-lg text-slate-600">
                  {leftMemory ? `Dari: ${leftMemory.senderName} (${leftMemory.relationship})` : eventConfig.celebrantName}
                </span>
                <span className="text-[11px] font-mono text-slate-400">Hal. {currentPageIndex + 1}</span>
              </div>
            </div>
          </div>

          {/* ===================== RIGHT PAGE ===================== */}
          <div className="relative w-full h-full flex flex-col">
            {/* Torn Grid Paper Sheet (Image 3) */}
            <div className="relative w-full h-full grid-paper torn-paper-edge p-5 sm:p-7 flex flex-col justify-between overflow-hidden shadow-xl">
              
              {/* Sticker: Top-Left Wavy Doodle Ribbon / Loop Tape (Image 3) */}
              <div className="absolute top-3 left-4 z-20">
                <DoodleRibbonTape size={52} />
              </div>

              {/* Top empty spacer for sticker */}
              <div className="h-6" />

              {/* Main Handwritten Letter / Message Content (Image 3) */}
              <div className="relative z-10 flex-1 flex flex-col justify-center px-2 sm:px-4">
                {rightMemory ? (
                  <div className="space-y-4">
                    {/* Handwritten letter */}
                    <p className="font-hand text-xl sm:text-2xl md:text-[23px] text-[#0d2a4a] leading-relaxed font-semibold">
                      "{rightMemory.message}"
                    </p>

                    {/* Sender sign-off */}
                    <div className="pt-2">
                      <div className="font-hand text-2xl sm:text-3xl text-pink-700 font-bold">
                        - {rightMemory.senderName}
                      </div>
                      <div className="text-xs text-slate-500 font-sans mt-0.5 flex items-center gap-1.5">
                        <span>{rightMemory.relationship}</span>
                        <span>·</span>
                        <span>{rightMemory.createdAt}</span>
                      </div>
                    </div>

                    {/* If right page also has a photo */}
                    {rightMemory.photoUrl && rightMemory.photoUrl !== leftMemory?.photoUrl && (
                      <div className="pt-2">
                        <span className="inline-block font-sans text-xs text-slate-500 bg-white/80 px-2 py-1 rounded border border-slate-200">
                          📷 Foto terlampir di album
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="font-hand text-2xl text-slate-700 leading-relaxed">
                      "Semoga di usia yang baru ini, setiap langkah dipenuhi tawa, cinta, dan impian yang menjadi nyata!"
                    </p>
                    <p className="font-hand text-xl text-pink-600 mt-2 font-bold">- Buku Tamu Kenangan</p>
                  </div>
                )}
              </div>

              {/* Sticker: Bottom-Right Denim Stitched Heart (Image 3) */}
              <div className="absolute bottom-3 right-4 z-20">
                <DenimHeart size={74} className="rotate-6" />
              </div>

              {/* Right Page Footer */}
              <div className="relative z-10 pt-2 flex items-center justify-between text-slate-500 font-sans text-xs">
                <span className="text-[11px] font-mono text-slate-400">Hal. {currentPageIndex + 2}</span>
                <span className="text-xs text-slate-400 italic">kenangan secara langsung ✨</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
