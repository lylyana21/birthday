import React, { useState } from 'react';
import { X, Check, Sparkles } from 'lucide-react';
import { EventConfig } from '../types';

interface CelebrantConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: EventConfig;
  onSave: (newConfig: EventConfig) => void;
}

export function CelebrantConfigModal({
  isOpen,
  onClose,
  config,
  onSave,
}: CelebrantConfigModalProps) {
  const [formData, setFormData] = useState<EventConfig>(config);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#132238] border border-sky-600/40 rounded-2xl shadow-2xl p-6 text-slate-100">
        <div className="flex items-center justify-between pb-3 border-b border-slate-700">
          <h3 className="font-bubble text-lg text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400" />
            Pengaturan Acara & Sampul
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-sky-200 mb-1">
              Nama yang Merayakan / Mempelai
            </label>
            <input
              type="text"
              required
              value={formData.celebrantName}
              onChange={(e) => setFormData({ ...formData, celebrantName: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-sky-400"
            />
          </div>

          <div>
            <label className="block font-semibold text-sky-200 mb-1">
              Judul Acara Sampul (Denim Cover)
            </label>
            <input
              type="text"
              required
              value={formData.eventTitle}
              onChange={(e) => setFormData({ ...formData, eventTitle: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-sky-400"
            />
          </div>

          <div>
            <label className="block font-semibold text-sky-200 mb-1">
              Judul Halaman Pembuka Scrapbook
            </label>
            <input
              type="text"
              value={formData.eventHeading}
              onChange={(e) => setFormData({ ...formData, eventHeading: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-sky-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-sky-200 mb-1">
                Tanggal Acara
              </label>
              <input
                type="text"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-sky-400"
              />
            </div>
            <div>
              <label className="block font-semibold text-sky-200 mb-1">
                Tautan / Website Banner
              </label>
              <input
                type="text"
                value={formData.customUrl}
                onChange={(e) => setFormData({ ...formData, customUrl: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-sky-400"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-slate-400 hover:text-white"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
