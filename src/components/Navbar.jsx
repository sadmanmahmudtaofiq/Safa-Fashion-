import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Heart, Phone, MessageCircle, Menu, X } from 'lucide-react';

export default function Navbar({
  selectedCategory,
  onSelectCategory,
  favoriteCount,
  onOpenFavoritesDrawer
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isFavorites = location.pathname === '/favorites';

  const navItems = [
    { id: 'all', label: 'All Collection', category: 'All' },
    { id: 'lawn', label: 'Luxury Lawn', category: 'Lawn' },
    { id: 'cotton', label: 'Pure Cotton', category: 'Cotton' },
    { id: 'festive', label: 'Festive & Zari', category: 'Festive' },
  ];

  const handleNavClick = (category) => {
    onSelectCategory(category);
    if (!isHome) {
      navigate('/');
    }
    setMobileMenuOpen(false);
  };

  const handleFavoritesClick = () => {
    navigate('/favorites');
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    onSelectCategory('All');
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Announcement Bar - Clean & Slim */}
      <div className="bg-[#5b1d28] text-stone-100 text-[11px] sm:text-xs py-1.5 px-3 text-center tracking-wide font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span>Free Express Delivery Across Bangladesh on Orders Over ৳5,000</span>
          <span className="hidden md:inline text-rose-300/60">•</span>
          <span className="hidden md:inline text-rose-200">
            Cash on Delivery Available Nationwide
          </span>
        </div>
      </div>

      {/* Main Header - Clean, modern, uncluttered */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 -ml-2 rounded-lg text-stone-700 hover:text-[#5b1d28] hover:bg-stone-50"
                aria-label="Toggle navigation menu"
                id="mobile-menu-toggle"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Brand Logo - Sleek, refined, not oversized */}
            <div className="flex items-center">
              <button
                onClick={handleLogoClick}
                className="flex items-center gap-2.5 text-left group"
                aria-label="SAFA FASHION Home"
                id="header-brand-logo"
              >
                {/* Logo Icon */}
                <img
                  src="/images/logo-icon.png"
                  alt="Safa Fashion"
                  className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
                />
                {/* Brand Typography in Playfair Display */}
                <div className="flex flex-col">
                  <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.16em] text-[#5b1d28] leading-none uppercase">
                    SAFA FASHION
                  </span>
                  <span className="text-[8.5px] uppercase tracking-[0.25em] text-stone-400 font-medium mt-0.5">
                    Dhaka • Exclusive Three-Piece
                  </span>
                </div>
              </button>
            </div>

            {/* Desktop Navigation - Centered & Simple */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
              {navItems.map((item) => {
                const isActive = isHome && selectedCategory === item.category;
                return (
                  <button
                    key={item.id}
                    id={`nav-${item.id}`}
                    onClick={() => handleNavClick(item.category)}
                    className={`px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors relative ${
                      isActive
                        ? 'text-[#5b1d28]'
                        : 'text-stone-600 hover:text-[#5b1d28]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#5b1d28] rounded-full" />
                    )}
                  </button>
                );
              })}
              <button
                id="nav-favorites-link"
                onClick={handleFavoritesClick}
                className={`px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors relative flex items-center gap-1.5 ${
                  isFavorites
                    ? 'text-[#5b1d28]'
                    : 'text-stone-600 hover:text-[#5b1d28]'
                }`}
              >
                <span>Favorites</span>
                {favoriteCount > 0 && (
                  <span className="bg-[#5b1d28] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full leading-tight">
                    {favoriteCount}
                  </span>
                )}
                {isFavorites && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#5b1d28] rounded-full" />
                )}
              </button>
            </nav>

            {/* Right Header Actions - Clean & Minimal */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Hotline Link */}
              <a
                href="tel:+8801700123456"
                className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 text-xs text-stone-600 hover:text-[#5b1d28] transition-colors"
                title="Customer Hotline"
              >
                <Phone className="w-3.5 h-3.5 text-[#5b1d28]" />
                <span className="font-medium text-[11px]">01700-123456</span>
              </a>

              {/* WhatsApp Quick Link */}
              <a
                href="https://wa.me/8801700123456?text=Hello%20SAFA%20FASHION!%20I%20am%20interested%20in%20your%20luxury%20Three-Piece%20collections."
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-stone-600 hover:text-emerald-700 hover:bg-stone-50 rounded-full transition-colors"
                title="Chat on WhatsApp"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600" />
              </a>

              {/* Favorites Drawer Toggle */}
              <button
                type="button"
                id="header-fav-btn"
                onClick={onOpenFavoritesDrawer}
                className="relative p-2 text-stone-700 hover:text-[#5b1d28] hover:bg-stone-50 rounded-full transition-colors"
                aria-label={`View saved favorites (${favoriteCount} items)`}
                title="Saved Favorites"
              >
                <Heart className={`w-5 h-5 transition-colors ${favoriteCount > 0 ? 'text-[#8a2e3f] fill-[#8a2e3f]' : ''}`} />
                {favoriteCount > 0 && (
                  <span
                    id="header-fav-count"
                    className="absolute top-1 right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold text-white bg-[#5b1d28] rounded-full border-2 border-white"
                  >
                    {favoriteCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-1 shadow-lg animate-fade-in">
            {navItems.map((item) => {
              const isActive = isHome && selectedCategory === item.category;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.category)}
                  className={`block w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors ${
                    isActive
                      ? 'bg-[#fbf5f3] text-[#5b1d28]'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={handleFavoritesClick}
              className={`flex items-center justify-between w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors ${
                isFavorites
                  ? 'bg-[#fbf5f3] text-[#5b1d28]'
                  : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#8a2e3f]" />
                Saved Favorites
              </span>
              {favoriteCount > 0 && (
                <span className="bg-[#5b1d28] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {favoriteCount}
                </span>
              )}
            </button>
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600 px-3">
              <a href="tel:+8801700123456" className="flex items-center gap-1.5 font-medium hover:text-[#5b1d28]">
                <Phone className="w-3.5 h-3.5 text-[#5b1d28]" />
                <span>01700-123456</span>
              </a>
              <a
                href="https://wa.me/8801700123456"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-semibold"
              >
                WhatsApp Support
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
