import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, ShieldCheck, Truck, Banknote } from 'lucide-react';

export default function Footer({ onSelectCategory, onNavigate }) {
  const handleCategoryClick = (category) => {
    onSelectCategory(category);
    onNavigate('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 pt-10 sm:pt-14 pb-8 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
          {/* Col 1: Brand Info & Clean Logo */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src="/images/logo-icon.png"
                alt="Safa Fashion"
                className="h-8 w-auto object-contain brightness-110"
              />
              <div>
                <span className="font-serif text-lg font-bold tracking-widest text-white block uppercase leading-none">
                  SAFA FASHION
                </span>
                <span className="text-[8.5px] uppercase tracking-[0.25em] text-stone-400 block font-medium mt-1">
                  Dhaka • Exclusive Three-Piece
                </span>
              </div>
            </div>

            <p className="text-stone-400 leading-relaxed text-xs">
              Bangladesh's premier boutique for exquisite Luxury Lawn, Combed Cotton, and Festive Zari 3-Piece collections.
            </p>

            <div className="flex items-start gap-2 text-stone-400 pt-1 text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-[#8a2e3f] shrink-0 mt-0.5" />
              <span>Banani, Road 11, Dhaka-1213</span>
            </div>
          </div>

          {/* Col 2: Collections Links */}
          <div>
            <h4 className="font-serif text-xs font-bold tracking-widest uppercase text-white mb-3">
              Collections
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => handleCategoryClick('All')}
                  className="hover:text-white transition-colors text-left"
                >
                  All 3-Piece Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Lawn')}
                  className="hover:text-white transition-colors text-left"
                >
                  Luxury Lawn Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Cotton')}
                  className="hover:text-white transition-colors text-left"
                >
                  Pure Combed Cotton
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Festive')}
                  className="hover:text-white transition-colors text-left"
                >
                  Festive & Zari Suits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('favorites')}
                  className="hover:text-white transition-colors text-left"
                >
                  My Saved Favorites
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div>
            <h4 className="font-serif text-xs font-bold tracking-widest uppercase text-white mb-3">
              Direct Contact
            </h4>
            <ul className="space-y-2.5 text-stone-400 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#8a2e3f] shrink-0" />
                <a href="tel:+8801700123456" className="text-stone-200 hover:text-white font-medium">
                  +880 1700-123456
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#8a2e3f] shrink-0" />
                <a href="mailto:safafashion.bd@gmail.com" className="text-stone-200 hover:text-white">
                  safafashion.bd@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/8801700123456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Assurances */}
          <div>
            <h4 className="font-serif text-xs font-bold tracking-widest uppercase text-white mb-3">
              Customer Assurances
            </h4>
            <div className="space-y-2 text-stone-400 text-xs">
              <div className="flex items-center gap-2">
                <Banknote className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Cash on Delivery across all 64 districts</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Free delivery on orders over ৳5,000</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>100% Genuine Fabric Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-stone-500 text-[11px] gap-2 text-center sm:text-left">
          <p>© 2026 SAFA FASHION. All rights reserved. Dhaka, Bangladesh.</p>
          <div className="flex items-center gap-3">
            <span>Cash on Delivery</span>
            <span>•</span>
            <span>Express Shipping</span>
            <span>•</span>
            <span>WhatsApp Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
