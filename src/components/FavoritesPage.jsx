import React from 'react';
import { Heart, MessageCircle, ArrowLeft, Trash2 } from 'lucide-react';
import ProductCard from './ProductCard.jsx';
import { formatPrice } from '../data/products.js';

export default function FavoritesPage({
  favorites,
  onToggleFavorite,
  onSelectProduct,
  onBackToCatalog,
  onClearAll
}) {
  const totalEstimate = favorites.reduce((acc, item) => acc + item.price, 0);

  const whatsappInquireAllUrl = () => {
    if (favorites.length === 0) return '#';
    const itemsList = favorites
      .map((item, idx) => `${idx + 1}. ${item.name} (${item.code}) - ${formatPrice(item.price)}`)
      .join('%0A');
    const msg = `Hello SAFA FASHION! I am inquiring about my saved favorites list:%0A%0A${itemsList}%0A%0A💰 Total Value: ${formatPrice(totalEstimate)}%0A%0APlease let me know how to order these three-piece sets via Cash on Delivery!`;
    return `https://wa.me/8801700123456?text=${msg}`;
  };

  return (
    <div className="py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <button
          onClick={onBackToCatalog}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#5b1d28] mb-4 sm:mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Collections</span>
        </button>

        {/* Page Hero Header - Clean & Simple */}
        <div className="bg-white border border-stone-200/80 rounded-xl p-4 sm:p-6 mb-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#5b1d28] mb-1">
                <Heart className="w-4 h-4 fill-[#8a2e3f]" />
                <h1 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                  Saved Favorites
                </h1>
              </div>
              <p className="text-xs text-stone-500">
                Easily inquire or place orders for all your favorite outfits via Cash on Delivery or WhatsApp.
              </p>
            </div>

            {favorites.length > 0 && (
              <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 block uppercase font-medium">Total ({favorites.length} items)</span>
                  <span className="font-bold text-sm sm:text-base text-[#5b1d28]">{formatPrice(totalEstimate)}</span>
                </div>
                <a
                  href={whatsappInquireAllUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Favorites Grid or Empty State */}
        {favorites.length === 0 ? (
          <div className="bg-white rounded-xl border border-stone-200 p-8 sm:p-12 text-center max-w-sm mx-auto shadow-2xs">
            <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto mb-3">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">Your Wishlist is Empty</h3>
            <p className="text-xs text-stone-500 mt-1 mb-5">
              Explore our collections and tap the heart icon on designs you love.
            </p>
            <button
              onClick={onBackToCatalog}
              className="px-5 py-2 bg-[#5b1d28] hover:bg-[#8a2e3f] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all"
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-200 text-xs">
              <span className="font-semibold text-stone-600">
                {favorites.length} Saved {favorites.length === 1 ? 'Design' : 'Designs'}
              </span>
              <button
                onClick={onClearAll}
                className="text-stone-400 hover:text-rose-600 flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>

            {/* Mobile-first 2 columns */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {favorites.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={true}
                  onToggleFavorite={onToggleFavorite}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
