import React from 'react';
import { Search, X, ArrowUpDown, SlidersHorizontal, Check } from 'lucide-react';

export default function FilterBar({
  selectedCategory,
  onSelectCategory,
  stockFilter,
  onStockFilterChange,
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  totalCount,
  onResetFilters
}) {
  const isFiltered = selectedCategory !== 'All' || stockFilter !== 'All' || searchQuery.trim() !== '';

  const categories = [
    { id: 'All', label: 'All Sets' },
    { id: 'Lawn', label: 'Luxury Lawn' },
    { id: 'Cotton', label: 'Pure Cotton' },
    { id: 'Festive', label: 'Festive & Zari' },
  ];

  return (
    <section className="bg-white border-b border-stone-200 sticky top-16 sm:top-18 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-2.5">
          {/* Category Tabs - Clean, horizontally scrollable on mobile */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`filter-category-${cat.id.toLowerCase()}`}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#5b1d28] text-white shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}

            {/* Quick stock toggle */}
            <button
              id="filter-stock-toggle"
              onClick={() => onStockFilterChange(stockFilter === 'InStock' ? 'All' : 'InStock')}
              className={`ml-1 px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap border transition-all flex items-center gap-1.5 ${
                stockFilter === 'InStock'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                  : 'border-stone-200 text-stone-500 hover:border-stone-300'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${stockFilter === 'InStock' ? 'bg-emerald-600' : 'bg-stone-300'}`} />
              <span>In Stock Only</span>
            </button>

            {isFiltered && (
              <button
                onClick={onResetFilters}
                className="ml-auto sm:ml-2 px-2.5 py-1 text-xs text-rose-700 hover:text-rose-900 font-medium whitespace-nowrap flex items-center gap-1"
                title="Reset filters"
              >
                <X className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>

          {/* Search & Sort Controls - Compact & clean */}
          <div className="flex items-center gap-2">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-52 md:w-60">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                id="catalog-search-input"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search designs..."
                className="w-full pl-8 pr-7 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-[#5b1d28] focus:bg-white transition-all"
                aria-label="Search three-piece designs"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative shrink-0">
              <select
                id="catalog-sort-select"
                value={sortOption}
                onChange={(e) => onSortChange(e.target.value)}
                className="appearance-none bg-stone-50 border border-stone-200 text-stone-800 text-xs py-1.5 pl-2.5 pr-7 rounded-lg focus:outline-hidden focus:border-[#5b1d28] font-medium cursor-pointer"
                aria-label="Sort three-pieces"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
              <ArrowUpDown className="w-3 h-3 text-stone-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Count - Desktop only to save mobile space */}
            <span className="hidden md:inline text-xs font-medium text-stone-400 whitespace-nowrap pl-2 border-l border-stone-200">
              {totalCount} Items
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
