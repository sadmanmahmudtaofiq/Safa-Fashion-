import React from 'react';
import { Sparkles, ShieldCheck, Truck, Banknote } from 'lucide-react';

export default function HeroBanner() {
  return (
    <section className="bg-gradient-to-b from-[#faf5f2] to-[#FAF8F5] border-b border-stone-200/60 py-6 sm:py-10 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Subtle Pill Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f3e5df] text-[#5b1d28] text-[11px] font-semibold tracking-widest uppercase mb-3">
          <Sparkles className="w-3 h-3 text-[#8a2e3f]" />
          <span>New Season 2026</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 uppercase leading-tight">
          Luxury Three-Piece <span className="text-[#5b1d28] italic font-normal">Collection</span>
        </h1>

        {/* Short clean tagline */}
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
          Finest breathable luxury lawn, pure combed cotton, and gold-zari festive suits with nationwide Cash on Delivery.
        </p>

        {/* Minimal single-line perks (Mobile friendly) */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] text-stone-500 font-medium">
          <span className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-[#5b1d28]" />
            Free Delivery Over ৳5,000
          </span>
          <span className="hidden sm:inline text-stone-300">•</span>
          <span className="flex items-center gap-1">
            <Banknote className="w-3.5 h-3.5 text-[#5b1d28]" />
            Cash on Delivery in All 64 Districts
          </span>
          <span className="hidden sm:inline text-stone-300">•</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#5b1d28]" />
            100% Authentic Quality
          </span>
        </div>
      </div>
    </section>
  );
}
