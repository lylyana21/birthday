import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { FrillyHeartCake, YellowCurlyRibbon } from './Stickers';
import { Download, Sparkles, Send, Copy, Check } from 'lucide-react';
import { EventConfig } from '../types';

interface QRStandeePosterProps {
  eventConfig: EventConfig;
  onOpenSubmissionForm: () => void;
  className?: string;
  isEmbed?: boolean;
}

export function QRStandeePoster({
  eventConfig,
  onOpenSubmissionForm,
  className = '',
  isEmbed = false,
}: QRStandeePosterProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Generate QR code pointing to this app's submission URL
  useEffect(() => {
    const liveUrl = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}?submit=true` : 'https://kenangan-olivia.live';
    QRCode.toDataURL(liveUrl, {
      width: 320,
      margin: 1,
      color: {
        dark: '#0f294a',
        light: '#ffffff',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR code error', err));
  }, [eventConfig]);

  const handleCopyLink = () => {
    const liveUrl = `${window.location.origin}${window.location.pathname}?submit=true`;
    navigator.clipboard.writeText(liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Action bar for poster */}
      {!isEmbed && (
        <div className="w-full max-w-md mb-4 flex items-center justify-between gap-2 px-2">
          <button
            onClick={onOpenSubmissionForm}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-pink-500 hover:bg-pink-600 text-white font-bubble text-sm rounded-xl shadow-lg transition-transform active:scale-95"
          >
            <Send className="w-4 h-4" />
            Coba Kirim Kenangan Langsung!
          </button>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 transition-colors"
            title="Salin tautan formulir"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Tersalin!' : 'Salin Link'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 transition-colors"
            title="Cetak Poster Standee"
          >
            <Download className="w-4 h-4" />
            <span>Cetak</span>
          </button>
        </div>
      )}

      {/* The Standee Poster exact to Image 1 */}
      <div 
        id="printable-standee"
        className="relative w-full max-w-[400px] aspect-[1/1.42] bg-[#0271c7] rounded-3xl p-6 shadow-2xl overflow-hidden border-4 border-white/20 select-none flex flex-col items-center justify-between"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, #0382e2 0%, #0060ab 70%, #004580 100%)',
        }}
      >
        {/* Starry Sky Twinkle Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-80">
          {/* White sparkle stars */}
          <span className="absolute top-8 left-10 text-white/90 text-sm">✦</span>
          <span className="absolute top-20 right-12 text-white/70 text-xs">✦</span>
          <span className="absolute top-44 left-16 text-white/80 text-base">✦</span>
          <span className="absolute top-48 right-14 text-white/80 text-sm">✦</span>
          <span className="absolute bottom-32 left-12 text-white/70 text-xs">✦</span>
          <span className="absolute bottom-28 right-16 text-white/90 text-sm">✦</span>
          <span className="absolute top-1/2 left-8 text-white/50 text-xs">+</span>
          <span className="absolute top-2/3 right-8 text-white/50 text-xs">+</span>
          <span className="absolute top-12 left-1/2 text-white/60 text-xs">·</span>
          <span className="absolute bottom-16 left-1/3 text-white/60 text-xs">·</span>
        </div>

        {/* Yellow Curly Ribbons on sides (Image 1) */}
        <div className="absolute left-1 top-[42%] -translate-y-1/2 -rotate-12 pointer-events-none">
          <YellowCurlyRibbon size={36} />
        </div>
        <div className="absolute right-1 top-[42%] -translate-y-1/2 rotate-12 pointer-events-none">
          <YellowCurlyRibbon size={36} />
        </div>

        {/* 4 Frilly Heart Cakes in the 4 corners (Image 1) */}
        <div className="absolute top-36 left-4 pointer-events-none -rotate-12">
          <FrillyHeartCake size={56} />
        </div>
        <div className="absolute top-36 right-4 pointer-events-none rotate-12">
          <FrillyHeartCake size={56} />
        </div>
        <div className="absolute bottom-6 left-4 pointer-events-none -rotate-6">
          <FrillyHeartCake size={64} />
        </div>
        <div className="absolute bottom-6 right-4 pointer-events-none rotate-6">
          <FrillyHeartCake size={64} />
        </div>

        {/* TOP SECTION: Dark Blue Oval + Yellow Stars + Clouds + SCAN HERE! */}
        <div className="relative w-full flex flex-col items-center pt-2 z-10">
          {/* Dark Oval with yellow stars */}
          <div className="relative flex items-center justify-center">
            {/* Left yellow star */}
            <span className="absolute -left-6 top-1/2 -translate-y-1/2 text-yellow-300 text-3xl filter drop-shadow animate-pulse">
              ⭐
            </span>

            {/* Dark blue oval background */}
            <div className="w-48 h-20 bg-[#093568] rounded-[50%] flex items-center justify-center shadow-inner" />

            {/* Right yellow star */}
            <span className="absolute -right-6 top-1/2 -translate-y-1/2 text-yellow-300 text-3xl filter drop-shadow animate-pulse">
              ⭐
            </span>
          </div>

          {/* White scalloped fluffy cloud under the text */}
          <div className="relative -mt-10 w-full max-w-[280px]">
            <svg viewBox="0 0 280 85" className="w-full filter drop-shadow-md">
              <path
                d="M 30,75 C 10,75 0,60 0,45 C 0,30 15,20 30,22 C 35,8 55,0 80,0 C 110,0 125,12 135,20 C 150,5 180,5 200,18 C 220,5 250,12 260,28 C 275,32 280,48 280,60 C 280,75 260,75 250,75 Z"
                fill="#ffffff"
              />
            </svg>

            {/* Subtext inside/below the cloud */}
            <div className="absolute bottom-1 inset-x-0 text-center">
              <p className="font-marker text-slate-900 font-bold text-base leading-tight tracking-tight">
                Kirim Foto & Ucapan Kenangan!
              </p>
              <p className="text-[10px] text-slate-700 font-sans font-medium">
                {eventConfig.celebrantName ? `Untuk ${eventConfig.celebrantName}` : 'Live Memory Guestbook'}
              </p>
            </div>
          </div>

          {/* Big Pink 3D Bubble "SCAN HERE!" (exact to Image 1) */}
          <div className="absolute top-2 z-20 -rotate-3 hover:rotate-0 transition-transform">
            <h1 className="font-bubble text-5xl sm:text-6xl tracking-tight text-center bubble-text-pink leading-none">
              SCAN<br />HERE!
            </h1>
          </div>
        </div>

        {/* CENTER SECTION: White Rounded Box with Corner Brackets & QR Code */}
        <div 
          onClick={onOpenSubmissionForm}
          className="relative z-10 w-[240px] sm:w-[260px] aspect-square bg-white rounded-3xl p-5 shadow-xl flex flex-col items-center justify-center cursor-pointer group hover:scale-[1.02] transition-transform"
        >
          {/* 4 Camera Viewfinder Corner Brackets `[ ]` (Image 1) */}
          {/* Top-Left Bracket */}
          <div className="absolute top-3 left-3 w-7 h-7 border-t-5 border-l-5 border-slate-950 rounded-tl-xl" />
          {/* Top-Right Bracket */}
          <div className="absolute top-3 right-3 w-7 h-7 border-t-5 border-r-5 border-slate-950 rounded-tr-xl" />
          {/* Bottom-Left Bracket */}
          <div className="absolute bottom-3 left-3 w-7 h-7 border-b-5 border-l-5 border-slate-950 rounded-bl-xl" />
          {/* Bottom-Right Bracket */}
          <div className="absolute bottom-3 right-3 w-7 h-7 border-b-5 border-r-5 border-slate-950 rounded-br-xl" />

          {/* QR Code Container */}
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="QR Code untuk Kirim Kenangan"
                className="w-36 h-36 object-contain rounded-lg"
              />
            ) : (
              <div className="w-36 h-36 bg-slate-100 flex items-center justify-center rounded-lg text-slate-400 text-xs">
                Memuat QR...
              </div>
            )}

            {/* Stylized QR CODE PLACEMENT label */}
            <div className="mt-2 text-center">
              <span className="font-marker font-bold text-xs text-[#0a467e] tracking-wider block">
                QR CODE
              </span>
              <span className="font-marker text-[11px] text-slate-700 tracking-widest uppercase">
                PLACEMENT
              </span>
            </div>

            {/* Hover tooltip */}
            <div className="absolute inset-0 bg-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="bg-pink-600 text-white text-[11px] font-sans font-semibold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Klik untuk Membuka
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: White Wavy Hand-Drawn URL Pill (Image 1) */}
        <div className="relative z-10 w-full flex justify-center pb-2">
          <div className="bg-white/95 px-6 py-1.5 rounded-full shadow-md border border-white">
            <span className="font-marker text-[#0060ab] font-bold text-xs tracking-wide">
              {eventConfig.customUrl || 'kenangan-olivia.live'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
