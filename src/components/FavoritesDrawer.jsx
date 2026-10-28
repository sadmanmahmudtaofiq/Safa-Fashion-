import React from 'react';
import { X, Heart, Trash2, MessageCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../data/products.js';

export default function FavoritesDrawer({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onClearAll,
  onViewProduct,
  onViewFavoritesPage
}) {
  if (!isOpen) return null;

  const totalEstimate = favorites.reduce((acc, item) => acc + item.price, 0);

  const whatsappInquireAllUrl = () => {
    if (favorites.length === 0) return '#';
    const itemsList = favorites
      .map((item, idx) => `${idx + 1}. ${item.name} (${item.code}) - ${formatPrice(item.price)}`)
      .join('%0A');
    const msg = `Hello SAFA FASHION! I would like to inquire about my saved favorite three-piece outfits:%0A%0A${itemsList}%0A%0A💰 Estimated Total: ${formatPrice(totalEstimate)}%0A%0APlease let me know the availability and ordering process via Cash on Delivery!`;
    return `https://wa.me/8801700123456?text=${msg}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-stone-200 animate-slide-left"
          aria-label="Saved Favorites Panel"
        >
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
            <div className="flex items-center gap-2 text-[#5b1d28]">
              <Heart className="w-5 h-5 fill-[#8a2e3f] text-[#8a2e3f]" />
              <h3 className="font-serif text-lg font-bold">My Saved Favorites</h3>
              <span className="text-xs bg-[#5b1d28] text-white font-bold px-2 py-0.5 rounded-full ml-1">
                {favorites.length}
              </span>
            </div>
            <button
              id="close-drawer-btn"
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-200 transition-colors"
              aria-label="Close favorites drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-stone-100">
            {favorites.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mb-3">
                  <Heart className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-lg font-bold text-stone-800">Your Wishlist is Empty</h4>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Save your favorite three-piece designs to easily compare, share, or order on WhatsApp later.
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 px-4 py-2 bg-[#5b1d28] text-white text-xs font-semibold rounded-lg hover:bg-[#8a2e3f] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              favorites.map((product) => (
                <div key={product.id} className="py-3.5 flex gap-3 group">
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    className="w-16 h-20 object-cover object-top rounded-lg shrink-0 border border-stone-200 cursor-pointer"
                    onClick={() => {
                      onViewProduct(product);
                      onClose();
                    }}
                  />
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-stone-400">
                          {product.code}
                        </span>
                        <button
                          onClick={() => onRemoveFavorite(product.id)}
                          className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                          title="Remove from favorites"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4
                        className="font-serif text-sm font-bold text-stone-900 truncate hover:text-[#5b1d28] cursor-pointer"
                        onClick={() => {
                          onViewProduct(product);
                          onClose();
                        }}
                      >
                        {product.name}
                      </h4>
                      <span className="text-[11px] text-stone-500">{product.category} Collection</span>
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <span className="font-bold text-xs text-[#5b1d28]">
                        {formatPrice(product.price)}
                      </span>
                      <button
                        onClick={() => {
                          onViewProduct(product);
                          onClose();
                        }}
                        className="text-[11px] font-semibold text-stone-700 hover:text-[#5b1d28] flex items-center gap-0.5"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {favorites.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50/70 space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-600">
                <span>Estimated Value ({favorites.length} items):</span>
                <span className="font-bold text-base text-[#5b1d28]">
                  {formatPrice(totalEstimate)}
                </span>
              </div>

              <div className="space-y-2">
                <a
                  href={whatsappInquireAllUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Inquire All via WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    onViewFavoritesPage();
                    onClose();
                  }}
                  className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <span>View Full Favorites Page</span>
                </button>

                <div className="flex justify-center pt-1">
                  <button
                    onClick={onClearAll}
                    className="text-[11px] text-stone-400 hover:text-rose-600 transition-colors"
                  >
                    Clear All Saved Items
                  </button>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
