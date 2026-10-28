import React from 'react';
import { Heart, CheckCircle2, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-stone-900/95 backdrop-blur-md text-white px-5 py-3.5 rounded-xl shadow-2xl border border-stone-700/50 animate-bounce-in transition-all">
      <div className={`p-1.5 rounded-full ${toast.type === 'added' ? 'bg-[#8a2e3f] text-white' : 'bg-stone-700 text-stone-300'}`}>
        {toast.type === 'added' ? <Heart className="w-4 h-4 fill-white" /> : <CheckCircle2 className="w-4 h-4" />}
      </div>
      <div className="text-sm">
        <p className="font-medium text-stone-100">{toast.title}</p>
        {toast.message && <p className="text-xs text-stone-400 mt-0.5">{toast.message}</p>}
      </div>
      <button
        onClick={onClose}
        className="ml-2 text-stone-400 hover:text-white transition-colors p-1"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
