import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Heart,
  MessageCircle,
  Truck,
  ShieldCheck,
  Star,
  Ruler,
  Check,
  ChevronRight,
  ArrowLeft,
  Share2,
  Sparkles
} from 'lucide-react';
import { PRODUCTS, getProductBySlug, formatPrice } from '../data/products.js';
import ProductCard from './ProductCard.jsx';

export default function ProductDetailPage({
  isFavorite,
  onToggleFavorite,
  onOpenCodModal,
  onOpenSizeGuide
}) {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find product by slug or fallback
  const product = getProductBySlug(slug) || PRODUCTS[0];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('Unstitched 3-Piece');
  const [quantity, setQuantity] = useState(1);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50, isHovering: false });
  const [activeTab, setActiveTab] = useState('components');
  const [copiedLink, setCopiedLink] = useState(false);

  // Scroll to top whenever slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedImage(0);
    setQuantity(1);
    if (product) {
      document.title = `${product.name} | SAFA FASHION`;
    }
  }, [slug, product]);

  if (!product) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <h2 className="font-serif text-2xl font-bold text-stone-900">Outfit Not Found</h2>
        <p className="text-xs text-stone-500 mt-2 mb-6">The requested three-piece design is no longer available.</p>
        <Link
          to="/"
          className="px-5 py-2.5 bg-[#5b1d28] text-white text-xs font-bold uppercase tracking-wider rounded-xl"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

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
    const pageUrl = window.location.href;
    const msg = `Hello SAFA FASHION! I would like to order this 3-Piece:%0A%0A👗 Product: ${product.name}%0A🏷️ Code: ${product.code}%0A📏 Selected Size: ${selectedSize}%0A🔢 Quantity: ${quantity}%0A💰 Total Price: ${formatPrice(product.price * quantity)}%0A🔗 Link: ${encodeURIComponent(pageUrl)}%0A%0APlease let me know how to proceed with Cash on Delivery!`;
    return `https://wa.me/8801700123456?text=${msg}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Related products
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb Bar */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200/80">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#5b1d28] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Collection</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs text-stone-400 hidden sm:flex">
            <Link to="/" className="hover:text-stone-700">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to={`/#${product.category.toLowerCase()}`} className="hover:text-stone-700">
              {product.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-stone-800 truncate max-w-xs">{product.name}</span>
          </div>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 transition-colors"
            title="Share this product link"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
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
                  transform: zoomPos.isHovering ? 'scale(1.4)' : 'scale(1)'
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
                        ? 'border-[#5b1d28] shadow-sm ring-1 ring-[#5b1d28]'
                        : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Assurance Badges */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-white border border-stone-200/80 text-[11px] text-stone-600 text-center font-medium mt-1">
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

          {/* Right Column: Product Info & Actions (7 cols) */}
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

              {/* Title in bold Playfair Display */}
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 leading-snug">
                {product.name}
              </h1>

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
              <div className="mt-4 p-4 rounded-xl bg-[#fbf6f3] border border-[#f1ded6] flex items-baseline gap-3">
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
                  (Stock: {product.stockCount} sets in Dhaka warehouse)
                </span>
              </div>

              {/* Action Buttons Stack */}
              <div className="mt-6 pt-4 border-t border-stone-200 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Cash on Delivery Button */}
                  <button
                    id="page-cod-btn"
                    onClick={() => onOpenCodModal(product, selectedSize, quantity)}
                    className="w-full py-3.5 px-4 bg-[#5b1d28] hover:bg-[#8a2e3f] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Order via Cash on Delivery</span>
                  </button>

                  {/* WhatsApp Order Button */}
                  <a
                    id="page-whatsapp-btn"
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
                  id="page-fav-btn"
                  onClick={() => onToggleFavorite(product)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase border flex items-center justify-center gap-2 transition-all ${
                    isFavorite(product.id)
                      ? 'border-rose-400 bg-rose-50 text-rose-700'
                      : 'border-stone-300 hover:border-stone-400 text-stone-700 bg-white hover:bg-stone-50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite(product.id) ? 'fill-rose-600 text-rose-600' : 'text-stone-500'}`} />
                  <span>{isFavorite(product.id) ? 'Saved in Your Favorites' : 'Add to Favorites'}</span>
                </button>
              </div>

              {/* Specification Tabs */}
              <div className="mt-8 border-t border-stone-200 pt-5">
                <div className="flex gap-4 border-b border-stone-200 text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('components')}
                    className={`pb-2.5 transition-colors relative ${
                      activeTab === 'components' ? 'text-[#5b1d28]' : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    3-Piece Components
                    {activeTab === 'components' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b1d28]" />
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab('fabric')}
                    className={`pb-2.5 transition-colors relative ${
                      activeTab === 'fabric' ? 'text-[#5b1d28]' : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Fabric Details
                    {activeTab === 'fabric' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b1d28]" />
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab('care')}
                    className={`pb-2.5 transition-colors relative ${
                      activeTab === 'care' ? 'text-[#5b1d28]' : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Wash & Care
                    {activeTab === 'care' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5b1d28]" />
                    )}
                  </button>
                </div>

                <div className="py-4 text-xs text-stone-600">
                  {activeTab === 'components' && (
                    <div className="space-y-2.5">
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
          </div>
        </div>

        {/* Related Collections Section */}
        <section className="mt-16 pt-10 border-t border-stone-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#5b1d28] block mb-1">
                Curated For You
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                You May Also Like
              </h2>
            </div>
            <Link
              to="/"
              className="text-xs font-semibold text-[#5b1d28] hover:underline"
            >
              View All Sets
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {relatedProducts.map((relProd) => (
              <ProductCard
                key={relProd.id}
                product={relProd}
                isFavorite={isFavorite(relProd.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectProduct={() => navigate(`/${relProd.slug}`)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
