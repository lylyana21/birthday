import React, { useState } from 'react';
import { MetalPaperclip } from './Stickers';
import { ZoomIn, Heart } from 'lucide-react';
import { sfx } from '../utils/audio';

interface PolaroidProps {
  imageSrc?: string;
  caption?: string;
  date?: string;
  rotation?: number;
  paperclipColor?: 'silver' | 'gold' | 'pink' | 'cyan';
  paperclipOffset?: number; // percentage from left
  className?: string;
  onLike?: () => void;
  likesCount?: number;
}

export function Polaroid({
  imageSrc = '/src/assets/images/polaroid_candid_smile_1790319059352.jpg',
  caption,
  date,
  rotation = -4,
  paperclipColor = 'silver',
  paperclipOffset = 24,
  className = '',
  onLike,
  likesCount = 0,
}: PolaroidProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  const handleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    sfx.playCameraShutter();
    setIsZoomed(true);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    sfx.playSparkle();
    setHasLiked(!hasLiked);
    if (onLike) onLike();
  };

  return (
    <>
      <div
        className={`relative inline-block transition-transform duration-300 hover:rotate-0 hover:scale-105 cursor-pointer ${className}`}
        style={{ transform: `rotate(${rotation}deg)` }}
        onClick={handleZoom}
      >
        {/* Paperclip attached at top edge */}
        <div
          className="absolute -top-4 z-20 pointer-events-none"
          style={{ left: `${paperclipOffset}%` }}
        >
          <MetalPaperclip color={paperclipColor} size={50} />
        </div>

        {/* Vintage Polaroid Frame */}
        <div className="bg-[#fcfaf4] p-3 pb-5 rounded-xs polaroid-lift border border-amber-950/10 w-52 sm:w-60 md:w-64 max-w-full">
          {/* Photo frame container */}
          <div className="relative aspect-square w-full bg-slate-200 overflow-hidden rounded-xs border border-black/10 shadow-inner group">
            <img
              src={imageSrc}
              alt={caption || 'Polaroid Memory'}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                // High-grade styled fallback container
                e.currentTarget.src = '/src/assets/images/polaroid_candid_smile_1790319059352.jpg';
              }}
            />
            {/* Subtle vintage film vignette overlay */}
            <div className="absolute inset-0 bg-radial from-transparent via-transparent to-amber-900/10 pointer-events-none" />

            {/* Hover zoom affordance */}
            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <span className="flex items-center gap-1.5 text-xs font-medium bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-xs">
                <ZoomIn className="w-3.5 h-3.5" />
                Perbesar
              </span>
            </div>
          </div>

          {/* Bottom margin with handwritten caption & date */}
          <div className="pt-2 px-1 flex items-end justify-between min-h-9">
            <div className="flex-1 pr-2">
              {caption && (
                <p className="font-hand text-slate-800 text-lg sm:text-xl font-bold leading-tight line-clamp-2">
                  {caption}
                </p>
              )}
              {date && (
                <p className="text-[11px] text-slate-500 font-sans tracking-wide">
                  {date}
                </p>
              )}
            </div>

            {/* Like button on polaroid */}
            <button
              onClick={handleLike}
              className="flex items-center gap-1 text-xs text-pink-600 hover:text-pink-700 transition-colors p-1 -m-1"
              title="Suka kenangan ini"
            >
              <Heart
                className={`w-4 h-4 transition-transform active:scale-125 ${
                  hasLiked ? 'fill-pink-500 text-pink-500' : 'text-slate-400'
                }`}
              />
              <span className="text-[11px] font-sans font-semibold text-slate-600">
                {likesCount + (hasLiked ? 1 : 0)}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative max-w-lg w-full bg-[#fdfbf7] p-5 sm:p-7 rounded-sm shadow-2xl polaroid-lift border border-amber-900/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-square w-full bg-slate-900 rounded-sm overflow-hidden mb-4 border border-black/10">
              <img
                src={imageSrc}
                alt={caption || 'Polaroid Memory Full'}
                className="w-full h-full object-contain bg-black/5"
              />
            </div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-hand text-slate-900 text-2xl font-bold">
                  {caption || 'Kenangan Spesial'}
                </h3>
                {date && <p className="text-xs text-slate-500 mt-1">{date}</p>}
              </div>
              <button
                onClick={() => setIsZoomed(false)}
                className="px-3 py-1.5 bg-slate-800 text-white rounded text-xs font-medium hover:bg-slate-700 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
