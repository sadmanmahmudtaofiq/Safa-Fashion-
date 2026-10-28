import React from 'react';
import { Heart, Eye, MessageCircle } from 'lucide-react';
import { formatPrice } from '../data/products.js';

export default function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onSelectProduct
}) {
  const isLimited = product.availability === 'Limited Stock';
  const discountAmount = product.originalPrice ? product.originalPrice - product.price : 0;
  const discountPercent = product.originalPrice
    ? Math.round((discountAmount / product.originalPrice) * 100)
    : 0;

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group bg-white rounded-xl overflow-hidden border border-stone-200/80 hover:border-stone-300 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
      id={`product-card-${product.id}`}
    >
      {/* Product Image Area */}
      <div className="relative aspect-3/4 overflow-hidden bg-stone-100">
        <img
          src={product.primaryImage}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2 sm:top-2.5 left-2 sm:left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.badge && (
            <span className="inline-block px-2 py-0.5 text-[9px] sm:text-[10px] font-bold tracking-wider uppercase rounded-full bg-[#5b1d28] text-white shadow-xs">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="inline-block px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase rounded-full bg-rose-600 text-white shadow-2xs">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          type="button"
          id={`fav-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product);
          }}
          className={`absolute top-2 sm:top-2.5 right-2 sm:right-2.5 p-2 rounded-full backdrop-blur-md transition-all z-10 shadow-xs ${
            isFavorite
              ? 'bg-white text-rose-600'
              : 'bg-white/80 text-stone-600 hover:bg-white hover:text-rose-600'
          }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-3.5 sm:w-4 h-3.5 sm:h-4 transition-transform ${isFavorite ? 'fill-rose-600 scale-110' : ''}`} />
        </button>

        {/* Stock pill on image */}
        {isLimited && (
          <div className="absolute bottom-2 left-2 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-bold tracking-wide rounded-full bg-amber-950/80 text-amber-200 backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Only {product.stockCount} Left
            </span>
          </div>
        )}
      </div>

      {/* Product Details Content */}
      <div className="p-3 sm:p-4 flex flex-col justify-between flex-1">
        <div>
          <span className="text-[10px] sm:text-[11px] font-mono text-stone-400 uppercase tracking-wider block mb-1">
            {product.code}
          </span>
          <h3 className="font-serif text-xs sm:text-sm md:text-base font-bold text-stone-900 group-hover:text-[#5b1d28] transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </div>

        {/* Price Row */}
        <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs sm:text-sm md:text-base font-bold text-[#5b1d28]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-xs text-stone-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <span className="text-[10px] text-stone-400 hidden sm:inline">3-Piece</span>
        </div>
      </div>
    </div>
  );
}
