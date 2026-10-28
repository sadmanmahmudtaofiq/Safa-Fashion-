import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import HeroBanner from './components/HeroBanner.jsx';
import FilterBar from './components/FilterBar.jsx';
import ProductCard from './components/ProductCard.jsx';
import ProductDetailPage from './components/ProductDetailPage.jsx';
import FavoritesDrawer from './components/FavoritesDrawer.jsx';
import FavoritesPage from './components/FavoritesPage.jsx';
import CashOnDeliveryModal from './components/CashOnDeliveryModal.jsx';
import SizeGuideModal from './components/SizeGuideModal.jsx';
import Footer from './components/Footer.jsx';
import Toast from './components/Toast.jsx';
import { PRODUCTS, getProductById } from './data/products.js';

const FAVORITES_STORAGE_KEY = 'safa_fashion_favorites_v1';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Category & Filter states
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [stockFilter, setStockFilter] = useState('All'); // 'All' | 'InStock' | 'Limited'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('featured');

  // Favorites state (persisted in localStorage)
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Modal states
  const [favoritesDrawerOpen, setFavoritesDrawerOpen] = useState(false);
  const [codModal, setCodModal] = useState({
    isOpen: false,
    product: null,
    selectedSize: 'Unstitched 3-Piece',
    quantity: 1
  });
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Sync favorites with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }, [favoriteIds]);

  // Toast trigger
  const showToast = (title, message = '', type = 'added') => {
    setToast({ title, message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Toggle favorite
  const handleToggleFavorite = (product) => {
    setFavoriteIds((prev) => {
      const isFav = prev.includes(product.id);
      if (isFav) {
        showToast('Removed from Favorites', product.name, 'removed');
        return prev.filter((id) => id !== product.id);
      } else {
        showToast('Added to Favorites', product.name, 'added');
        return [...prev, product.id];
      }
    });
  };

  const handleRemoveFavorite = (id) => {
    const prod = getProductById(id);
    setFavoriteIds((prev) => prev.filter((item) => item !== id));
    if (prod) {
      showToast('Removed from Favorites', prod.name, 'removed');
    }
  };

  const handleClearAllFavorites = () => {
    setFavoriteIds([]);
    showToast('Favorites Cleared', 'All saved items have been removed.', 'removed');
  };

  const isFavorite = (id) => favoriteIds.includes(Number(id));

  // Full favorited product objects
  const favoriteProducts = useMemo(() => {
    return favoriteIds
      .map((id) => getProductById(id))
      .filter(Boolean);
  }, [favoriteIds]);

  // Filtered & Sorted products for Catalog
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      if (stockFilter === 'InStock' && !item.inStock) {
        return false;
      }
      if (stockFilter === 'Limited' && item.availability !== 'Limited Stock') {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCode = item.code.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCode && !matchesCategory && !matchesDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      if (sortOption === 'newest') return b.id - a.id;
      return a.id - b.id;
    });
  }, [selectedCategory, stockFilter, searchQuery, sortOption]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setStockFilter('All');
    setSearchQuery('');
  };

  // Open Cash on Delivery Checkout modal
  const handleOpenCodModal = (product, size = 'Unstitched 3-Piece', qty = 1) => {
    setCodModal({
      isOpen: true,
      product,
      selectedSize: size,
      quantity: qty
    });
  };

  // When clicking a product card anywhere, navigate to its dedicated URL slug
  const handleSelectProduct = (product) => {
    navigate(`/${product.slug}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      {/* Header & Navigation */}
      <Navbar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        favoriteCount={favoriteIds.length}
        onOpenFavoritesDrawer={() => setFavoritesDrawerOpen(true)}
      />

      {/* React Router Route Views */}
      <div className="flex-1">
        <Routes>
          {/* Catalog Home Page */}
          <Route
            path="/"
            element={
              <main>
                <HeroBanner />

                <FilterBar
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  stockFilter={stockFilter}
                  onStockFilterChange={setStockFilter}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  sortOption={sortOption}
                  onSortChange={setSortOption}
                  totalCount={filteredProducts.length}
                  onResetFilters={handleResetFilters}
                />

                <section className="py-6 sm:py-10">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredProducts.length === 0 ? (
                      <div className="text-center py-16 bg-white rounded-2xl border border-stone-200/80 p-8 shadow-2xs max-w-lg mx-auto">
                        <div className="text-4xl mb-3">🔍</div>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                          No Three-Pieces Found
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-500 mt-2 mb-5 leading-relaxed">
                          We couldn't find any designer outfits matching your current filter criteria.
                        </p>
                        <button
                          onClick={handleResetFilters}
                          className="px-5 py-2.5 bg-[#5b1d28] hover:bg-[#8a2e3f] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
                        >
                          Reset All Filters
                        </button>
                      </div>
                    ) : (
                      <div
                        id="product-grid"
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6"
                      >
                        {filteredProducts.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            isFavorite={isFavorite(product.id)}
                            onToggleFavorite={handleToggleFavorite}
                            onSelectProduct={handleSelectProduct}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              </main>
            }
          />

          {/* Full Favorites Page */}
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favorites={favoriteProducts}
                onToggleFavorite={handleToggleFavorite}
                onSelectProduct={handleSelectProduct}
                onBackToCatalog={() => navigate('/')}
                onClearAll={handleClearAllFavorites}
              />
            }
          />

          {/* Dedicated Product Detail Page with URL like example.com/item-name */}
          <Route
            path="/:slug"
            element={
              <ProductDetailPage
                isFavorite={isFavorite}
                onToggleFavorite={handleToggleFavorite}
                onOpenCodModal={handleOpenCodModal}
                onOpenSizeGuide={() => setSizeGuideOpen(true)}
              />
            }
          />

          {/* Alias /product/:slug route */}
          <Route
            path="/product/:slug"
            element={
              <ProductDetailPage
                isFavorite={isFavorite}
                onToggleFavorite={handleToggleFavorite}
                onOpenCodModal={handleOpenCodModal}
                onOpenSizeGuide={() => setSizeGuideOpen(true)}
              />
            }
          />
        </Routes>
      </div>

      {/* Slide-out Favorites Drawer */}
      <FavoritesDrawer
        isOpen={favoritesDrawerOpen}
        onClose={() => setFavoritesDrawerOpen(false)}
        favorites={favoriteProducts}
        onRemoveFavorite={handleRemoveFavorite}
        onClearAll={handleClearAllFavorites}
        onViewProduct={(prod) => {
          setFavoritesDrawerOpen(false);
          handleSelectProduct(prod);
        }}
        onViewFavoritesPage={() => {
          setFavoritesDrawerOpen(false);
          navigate('/favorites');
        }}
      />

      {/* Cash on Delivery Modal */}
      <CashOnDeliveryModal
        isOpen={codModal.isOpen}
        onClose={() => setCodModal((prev) => ({ ...prev, isOpen: false }))}
        product={codModal.product}
        selectedSize={codModal.selectedSize}
        quantity={codModal.quantity}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />

      {/* Toast Alert */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Site Footer */}
      <Footer
        onSelectCategory={setSelectedCategory}
        onNavigate={(path) => navigate(path === 'favorites' ? '/favorites' : '/')}
      />
    </div>
  );
}
