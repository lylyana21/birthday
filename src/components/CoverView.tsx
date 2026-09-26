import React from 'react';
import { SpiralBinding } from './SpiralBinding';
import { WhiteSparkle, BlueCloud, LilacHeart, DoodleExclamation } from './Stickers';
import { BookOpen, QrCode, Sparkles, PlusCircle } from 'lucide-react';
import { EventConfig } from '../types';
import { sfx } from '../utils/audio';

interface CoverViewProps {
  eventConfig: EventConfig;
  memoriesCount: number;
  onOpenBook: () => void;
  onOpenQRStandee: () => void;
  onOpenSubmissionForm: () => void;
  onEditCelebrant: () => void;
}

export function CoverView({
  eventConfig,
  memoriesCount,
  onOpenBook,
  onOpenQRStandee,
  onOpenSubmissionForm,
  onEditCelebrant,
}: CoverViewProps) {
  const handleOpenBook = () => {
    sfx.playPageFlip();
    onOpenBook();
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top action quick bar */}
      <div className="w-full max-w-4xl mb-4 flex flex-wrap items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-sky-400 bg-sky-950/60 px-3 py-1 rounded-full border border-sky-800/60">
            {memoriesCount} Kenangan Terkumpul
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">·</span>
          <span className="text-xs text-slate-400 hidden sm:inline">{eventConfig.eventDate}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenQRStandee}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0271c7] hover:bg-[#0260aa] text-white text-xs font-semibold rounded-lg shadow-sm transition-all active:scale-95"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Poster QR Standee</span>
          </button>
          <button
            onClick={onOpenSubmissionForm}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all active:scale-95"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Kirim Kenangan</span>
          </button>
        </div>
      </div>

      {/* The Notebook Cover (Exact to Image 2) */}
      <div 
        onClick={handleOpenBook}
        className="relative w-full max-w-4xl aspect-[1.5/1] sm:aspect-[1.65/1] rounded-2xl overflow-hidden shadow-2xl denim-dark cursor-pointer group transition-all duration-300 hover:shadow-cyan-900/30 hover:shadow-3xl border border-sky-900/40"
      >
        {/* Left Double-Wire Spiral Notebook Binding (Image 2) */}
        <SpiralBinding loopsCount={18} position="left" />

        {/* Denim twill texture highlights and vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60 pointer-events-none" />

        {/* Center Frayed Denim Patch (Image 2) */}
        <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-12 pl-14 sm:pl-20">
          <div className="relative w-full max-w-xl aspect-[2/1] denim-patch rounded-xl flex items-center justify-center p-6 sm:p-8">
            {/* White running dashed stitching around the patch */}
            <div className="absolute inset-3 border-2 border-dashed border-white/90 rounded-lg pointer-events-none" />

            {/* Sticker: Top-Left 4-Point White Sparkle (Image 2) */}
            <div className="absolute -top-7 -left-5 sm:-top-9 sm:-left-7 z-20">
              <WhiteSparkle size={60} className="-rotate-12" />
            </div>

            {/* Sticker: Top-Right Blue Cloud with White Stitching (Image 2) */}
            <div className="absolute -top-8 -right-4 sm:-top-10 sm:-right-6 z-20">
              <BlueCloud size={88} className="rotate-6" />
            </div>

            {/* Sticker: Bottom-Left Lilac Felt Heart with White Stitching (Image 2) */}
            <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 z-20">
              <LilacHeart size={68} className="-rotate-12" />
            </div>

            {/* Sticker: Bottom-Right "!!" Badge (Image 2) */}
            <div className="absolute -bottom-5 right-10 sm:-bottom-6 sm:right-16 z-20">
              <DoodleExclamation size={48} className="rotate-12" />
            </div>

            {/* Title Text: "Happy Birthday Olivia !!" (Bubble Cursive matching Image 2) */}
            <div className="relative z-10 text-center flex flex-col items-center justify-center">
              <h1 className="font-cursive text-4xl sm:text-5xl md:text-6xl text-white bubble-text-white drop-shadow-lg tracking-wide leading-tight">
                {eventConfig.eventTitle || 'Happy Birthday'}
              </h1>
              <div className="font-cursive text-5xl sm:text-6xl md:text-7xl text-white bubble-text-white drop-shadow-xl mt-1 tracking-wider">
                {eventConfig.celebrantName || 'Olivia'}
              </div>
            </div>
          </div>
        </div>

        {/* Hover open invitation pill */}
        <div className="absolute bottom-5 inset-x-0 flex justify-center z-20">
          <div className="bg-slate-950/85 hover:bg-slate-900 text-sky-200 border border-sky-400/40 px-5 py-2 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl backdrop-blur-sm group-hover:scale-105 transition-transform">
            <BookOpen className="w-4 h-4 text-sky-400" />
            <span>Klik Untuk Membuka Buku Kenangan</span>
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          </div>
        </div>

        {/* Corner edit button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEditCelebrant();
          }}
          className="absolute top-4 right-4 z-30 p-2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-medium border border-slate-700 backdrop-blur-sm transition-colors"
          title="Ubah Nama & Judul Acara"
        >
          Ubah Judul / Nama
        </button>
      </div>
    </div>
  );
}
