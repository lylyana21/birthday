import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Sparkles, 
  Heart, 
  Camera, 
  Check, 
  Paperclip, 
  Palette 
} from 'lucide-react';
import { Memory, Sticker } from '../types';
import { sfx } from '../utils/audio';
import { 
  DenimHeart, 
  LilacHeart, 
  BlueCloud, 
  WhiteSparkle, 
  EightPointBurst, 
  PurpleFlower, 
  FrillyHeartCake,
  MetalPaperclip
} from './Stickers';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (memory: Memory) => void;
  celebrantName: string;
}

export function SubmissionModal({
  isOpen,
  onClose,
  onSubmit,
  celebrantName,
}: SubmissionModalProps) {
  const [senderName, setSenderName] = useState('');
  const [relationship, setRelationship] = useState('Sahabat');
  const [message, setMessage] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string>('/src/assets/images/polaroid_birthday_friends_1790319071128.jpg');
  const [paperclipColor, setPaperclipColor] = useState<'silver' | 'gold' | 'pink' | 'cyan'>('pink');
  const [selectedStickers, setSelectedStickers] = useState<Sticker[]>([
    { id: '1', type: 'star-burst', x: 80, y: 75, rotation: 12 },
    { id: '2', type: 'lilac-heart', x: 10, y: 80, rotation: -10 }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoUrl(event.target.result as string);
          sfx.playCameraShutter();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (url: string) => {
    setPhotoUrl(url);
    sfx.playCameraShutter();
  };

  const handleToggleSticker = (type: Sticker['type']) => {
    sfx.playSparkle();
    const exists = selectedStickers.find((s) => s.type === type);
    if (exists) {
      setSelectedStickers(selectedStickers.filter((s) => s.type !== type));
    } else {
      setSelectedStickers([
        ...selectedStickers,
        {
          id: Math.random().toString(),
          type,
          x: Math.floor(Math.random() * 50) + 20,
          y: Math.floor(Math.random() * 40) + 40,
          rotation: Math.floor(Math.random() * 30) - 15,
        },
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) return;

    sfx.playSparkle();

    const newMemory: Memory = {
      id: Date.now().toString(),
      senderName: senderName.trim(),
      relationship: relationship.trim() || 'Tamu Undangan',
      message: message.trim(),
      photoUrl: photoUrl || undefined,
      photoCaption: photoCaption.trim() || undefined,
      paperclipColor,
      stickers: selectedStickers,
      createdAt: 'Baru saja',
      likesCount: 1,
    };

    onSubmit(newMemory);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0f1f38] border-2 border-sky-600/40 rounded-2xl shadow-2xl overflow-hidden my-4 text-slate-100 flex flex-col">
        
        {/* Header with Cute Y2K style */}
        <div className="relative bg-[#0271c7] px-6 py-4 flex items-center justify-between border-b border-sky-400/30">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <div>
              <h3 className="font-bubble text-xl sm:text-2xl text-white tracking-wide">
                Kirim Kenangan Secara Langsung!
              </h3>
              <p className="text-xs text-sky-100 font-sans">
                Kenanganmu akan langsung ditempel di buku kenangan {celebrantName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[82vh] overflow-y-auto">
          {/* Section 1: Guest Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-sky-200 mb-1">
                Nama Lengkap / Panggilan *
              </label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Contoh: Chelsea / Kevin"
                className="w-full bg-slate-900/90 border border-sky-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-sky-200 mb-1">
                Hubungan / Meja
              </label>
              <input
                type="text"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                placeholder="Contoh: Sahabat SMA / Meja 4"
                className="w-full bg-slate-900/90 border border-sky-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
              />
            </div>
          </div>

          {/* Section 2: Polaroid Photo Customizer */}
          <div className="bg-slate-900/80 rounded-xl p-4 border border-sky-900/60">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold text-sky-200 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-sky-400" />
                <span>Foto Polaroid Bersama {celebrantName}</span>
              </label>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-medium text-pink-400 hover:text-pink-300 flex items-center gap-1"
              >
                <Upload className="w-3.5 h-3.5" />
                Unggah Foto Sendiri
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              {/* Polaroid Live Preview */}
              <div className="flex justify-center sm:justify-start">
                <div className="relative bg-[#fcfaf4] p-2.5 pb-4 rounded-xs shadow-md border border-slate-300 w-36 rotate-[-2deg]">
                  {/* Paperclip */}
                  <div className="absolute -top-3 left-4 z-20">
                    <MetalPaperclip color={paperclipColor} size={36} />
                  </div>
                  <div className="aspect-square w-full bg-slate-200 overflow-hidden rounded-xs border border-black/10">
                    <img
                      src={photoUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-hand text-slate-800 text-sm font-bold text-center mt-1 truncate">
                    {photoCaption || senderName || 'Kenangan Spesial'}
                  </p>
                </div>
              </div>

              {/* Photo Options */}
              <div className="sm:col-span-2 space-y-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Caption di Bawah Foto Polaroid:
                  </label>
                  <input
                    type="text"
                    value={photoCaption}
                    onChange={(e) => setPhotoCaption(e.target.value)}
                    placeholder="Contoh: Best moments ever! ✨"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                {/* Paperclip Color */}
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1 flex items-center gap-1">
                    <Paperclip className="w-3 h-3" />
                    Warna Penjepit Kertas (Paperclip):
                  </label>
                  <div className="flex gap-2">
                    {[
                      { id: 'silver', label: 'Silver', color: 'bg-slate-300' },
                      { id: 'gold', label: 'Gold', color: 'bg-amber-400' },
                      { id: 'pink', label: 'Pink', color: 'bg-pink-400' },
                      { id: 'cyan', label: 'Cyan', color: 'bg-sky-400' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setPaperclipColor(item.id as typeof paperclipColor)}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 border transition-all ${
                          paperclipColor === item.id
                            ? 'border-white bg-slate-800 text-white'
                            : 'border-slate-700 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preset Photos */}
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">
                    Pilih Dari Koleksi Foto Acara:
                  </label>
                  <div className="flex gap-2">
                    {[
                      { url: '/src/assets/images/polaroid_candid_smile_1790319059352.jpg', title: 'Olivia Candid' },
                      { url: '/src/assets/images/polaroid_birthday_friends_1790319071128.jpg', title: 'Party Crew' },
                      { url: '/src/assets/images/frilly_heart_cake_1790319044352.jpg', title: 'Birthday Cake' },
                    ].map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectPreset(preset.url)}
                        className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-transform active:scale-95 ${
                          photoUrl === preset.url ? 'border-pink-500 scale-105' : 'border-slate-700 opacity-70 hover:opacity-100'
                        }`}
                        title={preset.title}
                      >
                        <img src={preset.url} alt={preset.title} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Heartfelt Handwritten Message */}
          <div>
            <label className="block text-xs font-semibold text-sky-200 mb-1">
              Pesan & Ucapan Kenangan (Tulisan Tangan) *
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan ucapan selamat, doa terbaik, atau kenangan indahmu bersamanya..."
              className="w-full bg-slate-900/90 border border-sky-800 rounded-xl p-3.5 text-base font-hand text-sky-100 placeholder:font-sans placeholder:text-sm placeholder:text-slate-500 focus:outline-none focus:border-sky-400 transition-colors leading-relaxed"
            />
          </div>

          {/* Section 4: Sticker Picker Palette */}
          <div>
            <label className="block text-xs font-semibold text-sky-200 mb-2 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-pink-400" />
              <span>Tempel Stiker Hiasan (Klik untuk memilih):</span>
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 bg-slate-900/60 p-3 rounded-xl border border-sky-950">
              {[
                { type: 'denim-heart', label: 'Denim Heart', comp: <DenimHeart size={40} /> },
                { type: 'lilac-heart', label: 'Lilac Felt', comp: <LilacHeart size={36} /> },
                { type: 'blue-cloud', label: 'Stitched Cloud', comp: <BlueCloud size={44} /> },
                { type: 'white-sparkle', label: 'Sparkle Star', comp: <WhiteSparkle size={32} /> },
                { type: 'star-burst', label: '8-Pt Star', comp: <EightPointBurst size={34} /> },
                { type: 'purple-flower', label: 'Purple Flower', comp: <PurpleFlower size={32} /> },
              ].map((st) => {
                const isSelected = selectedStickers.some((s) => s.type === st.type);
                return (
                  <button
                    key={st.type}
                    type="button"
                    onClick={() => handleToggleSticker(st.type as Sticker['type'])}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${
                      isSelected
                        ? 'border-pink-500 bg-pink-500/15 scale-105'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-950/40'
                    }`}
                  >
                    <div className="h-10 flex items-center justify-center">
                      {st.comp}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 truncate max-w-full">
                      {st.label}
                    </span>
                    {isSelected && (
                      <span className="text-[9px] text-pink-400 font-semibold flex items-center gap-0.5">
                        <Check className="w-2.5 h-2.5" /> Terpilih
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bubble text-sm rounded-xl shadow-lg shadow-pink-500/25 transition-transform active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-yellow-200" />
              <span>Kirim Kenangan Sekarang!</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
