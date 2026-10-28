import React, { useState } from 'react';
import {
  X,
  Heart,
  MessageCircle,
  Truck,
  ShieldCheck,
  Star,
  Ruler,
  Check,
  ChevronRight,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { formatPrice } from '../data/products.js';

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onOpenCodModal,
  onOpenSizeGuide
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('Unstitched 3-Piece');
  const [quantity, setQuantity] = useState(1);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50, isHovering: false });
  const [activeTab, setActiveTab] = useState('components'); // 'components' | 'fabric' | 'care'

  if (!isOpen || !product) return null;

  const isLimited = product.availability === 'Limited Stock';
  const currentImg = product.gallery && product.gallery[selectedImage]
    ? product.gallery[selectedImage]
    : product.primaryImage;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y, isHovering: true });
  };

  const handleMouseLeave = () => {
    setZoomPos((prev) => ({ ...prev, isHovering: false }));
  };

  const handleQtyChange = (delta) => {
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > product.stockCount) return product.stockCount;
      return next;
    });
  };

  const whatsappInquiryUrl = () => {
    const msg = `Hello SAFA FASHION! I am interested in ordering this luxury 3-Piece ensemble:%0A%0A👗 Product: ${product.name}%0A🏷️ Code: ${product.code}%0A📏 Selected Type: ${selectedSize}%0A🔢 Quantity: ${quantity}%0A💰 Total Price: ${formatPrice(product.price * quantity)}%0A%0APlease let me know how to proceed with Cash on Delivery!`;
    return `https://wa.me/8801700123456?text=${msg}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-stone-900/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl max-w-5xl w-full shadow-2xl border border-stone-200 relative max-h-[95vh] overflow-y-auto flex flex-col">
        {/* Header bar / Breadcrumb */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-3.5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="hover:text-stone-900 cursor-pointer" onClick={onClose}>Catalog</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
            <span className="text-stone-700 font-medium">{product.category}</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
            <span className="font-semibold text-stone-900 truncate max-w-xs">{product.name}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100 transition-colors ml-4 shrink-0"
            aria-label="Close product view"
            id="close-product-detail-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Two column layout */}
        <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Gallery (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {/* Main Image with Zoom Lens */}
            <div
              className="relative aspect-3/4 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 cursor-crosshair select-none"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={currentImg}
                alt={product.name}
                className="w-full h-full object-cover object-top transition-transform duration-200"
                style={{
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transform: zoomPos.isHovering ? 'scale(1.5)' : 'scale(1)'
                }}
              />

              {product.badge && (
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-[#5b1d28] text-white text-[11px] font-bold tracking-wider uppercase shadow-md">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails strip */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-2">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImage === idx
                        ? 'border-[#5b1d28] shadow-md ring-1 ring-[#5b1d28]'
                        : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Assurance Badges */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-stone-50 border border-stone-200/80 text-[11px] text-stone-600 text-center font-medium mt-1">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#5b1d28]" />
                <span>100% Authentic</span>
              </div>
              <div className="flex flex-col items-center gap-1 border-x border-stone-200">
                <Truck className="w-4 h-4 text-[#5b1d28]" />
                <span>Express Courier</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Cash on Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* SKU & Stock Pill */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono font-bold text-stone-400 tracking-wider">
                  CODE: {product.code}
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    isLimited
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isLimited ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'}`} />
                  {product.availabilityText}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-stone-800">{product.rating}</span>
                <span className="text-xs text-stone-400">({product.reviewCount} customer reviews)</span>
              </div>

              {/* Price Box */}
              <div className="mt-4 p-4 rounded-xl bg-[#fdf8f6] border border-[#f3e5df] flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-[#5b1d28]">
                  {formatPrice(product.price * quantity)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    {formatPrice(product.originalPrice * quantity)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-rose-600 text-white">
                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
                <span className="text-[11px] text-stone-500 ml-auto hidden sm:inline">
                  (Inclusive of all Bangladeshi VAT & Taxes)
                </span>
              </div>

              {/* Short Description */}
              <p className="mt-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
                {product.description}
              </p>

              {/* Size / Type Selector */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-stone-800 mb-2">
                  <span>Select Outfit Type / Size:</span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-[#5b1d28] hover:underline flex items-center gap-1 font-bold lowercase first-letter:uppercase"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>View Size Guide</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'Unstitched 3-Piece',
                    'Stitched S (36-38)',
                    'Stitched M (39-40)',
                    'Stitched L (42)',
                    'Stitched XL (44)',
                  ].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-left flex items-center justify-between ${
                        selectedSize === size
                          ? 'border-[#5b1d28] bg-[#fbf5f3] text-[#5b1d28] font-bold shadow-2xs'
                          : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                      }`}
                    >
                      <span>{size}</span>
                      {selectedSize === size && <Check className="w-3.5 h-3.5 text-[#5b1d28]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mt-5 flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-800">
                  Quantity:
                </span>
                <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 overflow-hidden shadow-2xs">
                  <button
                    onClick={() => handleQtyChange(-1)}
                    disabled={quantity <= 1}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-200 disabled:opacity-40 transition-colors text-sm font-bold"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-stone-800 bg-white min-w-10 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQtyChange(1)}
                    disabled={quantity >= product.stockCount}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-200 disabled:opacity-40 transition-colors text-sm font-bold"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <span className="text-[11px] text-stone-400">
                  (Maximum available: {product.stockCount} sets)
                </span>
              </div>

              {/* Specification Tabs */}
              <div className="mt-6 border-t border-stone-200 pt-4">
                <div className="flex gap-4 border-b border-stone-200 text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('components')}
                    className={`pb-2 transition-colors relative ${
                      activeTab === 'components'
                        ? 'text-[#5b1d28]'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    3-Piece Components
                    {activeTab === 'components' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b1d28]" />
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab('fabric')}
                    className={`pb-2 transition-colors relative ${
                      activeTab === 'fabric'
                        ? 'text-[#5b1d28]'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Fabric Specifications
                    {activeTab === 'fabric' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b1d28]" />
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab('care')}
                    className={`pb-2 transition-colors relative ${
                      activeTab === 'care'
                        ? 'text-[#5b1d28]'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Wash & Care
                    {activeTab === 'care' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b1d28]" />
                    )}
                  </button>
                </div>

                <div className="py-3 text-xs text-stone-600">
                  {activeTab === 'components' && (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <span className="font-bold text-stone-900 shrink-0 w-28">Kameez / Shirt:</span>
                        <span>{product.components.kameez}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-bold text-stone-900 shrink-0 w-28">Dupatta / Orna:</span>
                        <span>{product.components.dupatta}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-bold text-stone-900 shrink-0 w-28">Salwar / Trouser:</span>
                        <span>{product.components.salwar}</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'fabric' && (
                    <p className="leading-relaxed">{product.fabricDetails}</p>
                  )}

                  {activeTab === 'care' && (
                    <p className="leading-relaxed">{product.careInstructions}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons Stack */}
            <div className="mt-8 pt-4 border-t border-stone-200 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Cash on Delivery Button */}
                <button
                  id="detail-cod-btn"
                  onClick={() => onOpenCodModal(product, selectedSize, quantity)}
                  className="w-full py-3.5 px-4 bg-[#5b1d28] hover:bg-[#8a2e3f] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
                >
                  <Truck className="w-4 h-4" />
                  <span>Order via Cash on Delivery</span>
                </button>

                {/* WhatsApp Order Button */}
                <a
                  id="detail-whatsapp-btn"
                  href={whatsappInquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Inquire via WhatsApp</span>
                </a>
              </div>

              {/* Add to Favorites Toggle */}
              <button
                id="detail-fav-btn"
                onClick={() => onToggleFavorite(product)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase border flex items-center justify-center gap-2 transition-all ${
                  isFavorite
                    ? 'border-rose-400 bg-rose-50 text-rose-700'
                    : 'border-stone-300 hover:border-stone-400 text-stone-700 bg-white hover:bg-stone-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-600 text-rose-600' : 'text-stone-500'}`} />
                <span>{isFavorite ? 'Saved in Your Favorites' : 'Add to Favorites'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
