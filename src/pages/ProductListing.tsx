import { useState } from 'react';

type Page = 'home' | 'listing' | 'detail';

interface ProductListingProps {
  onNavigate: (page: Page, productId?: number) => void;
}

const allProducts = [
  { id: 1, brand: 'Nike', name: 'Air Jordan 1 Retro High OG "Chicago"', price: 245, size: '10', color: 'Red', condition: 'New', img: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=500&h=500&fit=crop&auto=format', badge: 'HOT' },
  { id: 2, brand: 'Adidas', name: 'Yeezy Boost 350 V2 "Zebra"', price: 320, size: '9.5', color: 'White', condition: 'New', img: 'https://images.unsplash.com/photo-1656944227421-416b1d2186c9?w=500&h=500&fit=crop&auto=format', badge: 'RARE' },
  { id: 3, brand: 'New Balance', name: 'NB 550 "White Green"', price: 110, size: '11', color: 'White', condition: 'New', img: 'https://images.unsplash.com/photo-1637437757614-6491c8e915b5?w=500&h=500&fit=crop&auto=format', badge: null },
  { id: 4, brand: 'Nike', name: 'Dunk Low "Panda"', price: 155, size: '10', color: 'White', condition: 'New', img: 'https://images.unsplash.com/photo-1602231379593-b85a472e3c99?w=500&h=500&fit=crop&auto=format', badge: 'DROP' },
  { id: 5, brand: 'Nike', name: 'Air Force 1 Low "White"', price: 90, size: '8.5', color: 'White', condition: 'New', img: 'https://images.unsplash.com/photo-1731132198530-e4b2dc51d511?w=500&h=500&fit=crop&auto=format', badge: null },
  { id: 6, brand: 'Adidas', name: 'Samba OG "Black Gum"', price: 105, size: '9', color: 'Black', condition: 'New', img: 'https://images.unsplash.com/photo-1610664676282-55c8de64f746?w=500&h=500&fit=crop&auto=format', badge: 'TREND' },
  { id: 7, brand: 'Asics', name: 'Gel-Kayano 14 "Cream Navy"', price: 130, size: '10.5', color: 'Cream', condition: 'Pre-owned', img: 'https://images.unsplash.com/photo-1637437411360-b4607d62ddd3?w=500&h=500&fit=crop&auto=format', badge: null },
  { id: 8, brand: 'Nike', name: 'Air Jordan 4 Retro "Military Blue"', price: 398, size: '11', color: 'Blue', condition: 'New', img: 'https://images.unsplash.com/photo-1656944227480-98180d2a5155?w=500&h=500&fit=crop&auto=format', badge: 'GRAIL' },
  { id: 9, brand: 'New Balance', name: 'NB 2002R "Protection Pack"', price: 175, size: '10', color: 'Grey', condition: 'New', img: 'https://images.unsplash.com/photo-1637437735621-22472eee4875?w=500&h=500&fit=crop&auto=format', badge: null },
];

const brands = ['Nike', 'Adidas', 'New Balance', 'Asics', 'Puma', 'Reebok', 'Converse', 'Vans'];
const colors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Cream', 'Grey'];
const sizes = ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'];

export default function ProductListing({ onNavigate }: ProductListingProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [condition, setCondition] = useState<'All' | 'New' | 'Pre-owned'>('All');
  const [priceRange, setPriceRange] = useState(500);
  const [sortBy, setSortBy] = useState('Popularity');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleBrand = (b: string) =>
    setSelectedBrands((prev) => prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]);
  const toggleColor = (c: string) =>
    setSelectedColors((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);
  const toggleSize = (s: string) =>
    setSelectedSizes((prev) => prev.includes(s) ? prev.filter((x) => x !== x) : [...prev, s]);

  const filtered = allProducts.filter((p) => {
    if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
    if (selectedColors.length && !selectedColors.includes(p.color)) return false;
    if (selectedSizes.length && !selectedSizes.includes(p.size)) return false;
    if (condition !== 'All' && p.condition !== condition) return false;
    if (p.price > priceRange) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    return 0;
  });

  return (
    <div className="flex min-h-screen" style={{ background: '#0A0A0A', paddingTop: '64px' }}>
      {/* Sidebar */}
      <aside
        className="shrink-0 hidden lg:block"
        style={{
          width: sidebarOpen ? '260px' : '0',
          minHeight: '100vh',
          background: '#0D0D0D',
          borderRight: '1px solid #1A1A1A',
          overflow: 'hidden',
          transition: 'width 0.3s ease',
        }}
      >
        <div className="p-6" style={{ width: '260px' }}>
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-semibold tracking-[0.12em] uppercase" style={{ color: '#F0F0F0', fontFamily: "'Inter', sans-serif" }}>
              Filters
            </span>
            <button
              className="text-[10px] text-[#FF5500] hover:text-[#FF6B1A] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase' }}
              onClick={() => { setSelectedBrands([]); setSelectedColors([]); setSelectedSizes([]); setCondition('All'); setPriceRange(500); }}
            >
              Clear All
            </button>
          </div>

          {/* Brand */}
          <FilterSection title="Brand">
            <div className="space-y-2">
              {brands.map((b) => (
                <label key={b} className="flex items-center gap-3 cursor-pointer group">
                  <div
                    className="w-3.5 h-3.5 flex items-center justify-center shrink-0 transition-all"
                    style={{
                      border: selectedBrands.includes(b) ? 'none' : '1px solid #333',
                      background: selectedBrands.includes(b) ? '#FF5500' : 'transparent',
                    }}
                    onClick={() => toggleBrand(b)}
                  >
                    {selectedBrands.includes(b) && (
                      <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2">
                        <path d="m1 6 3.5 3.5L11 2"/>
                      </svg>
                    )}
                  </div>
                  <span
                    className="text-xs transition-colors"
                    style={{ color: selectedBrands.includes(b) ? '#F0F0F0' : '#666', fontFamily: "'Inter', sans-serif" }}
                    onClick={() => toggleBrand(b)}
                  >
                    {b}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Price Range */}
          <FilterSection title="Price Range">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px]" style={{ color: '#555', fontFamily: "'Inter', sans-serif" }}>$0</span>
                <span className="font-bold text-sm" style={{ color: '#FF5500', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.02em' }}>
                  Up to ${priceRange}
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </FilterSection>

          {/* Size */}
          <FilterSection title="Size (US)">
            <div className="grid grid-cols-4 gap-1.5">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSelectedSizes((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
                  }}
                  className="h-8 text-xs font-medium transition-all"
                  style={{
                    border: selectedSizes.includes(s) ? '1px solid #FF5500' : '1px solid #222',
                    background: selectedSizes.includes(s) ? 'rgba(255,85,0,0.12)' : 'transparent',
                    color: selectedSizes.includes(s) ? '#FF5500' : '#555',
                    fontFamily: "'Inter', sans-serif",
                    borderRadius: '2px',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Color */}
          <FilterSection title="Color">
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => toggleColor(c)}
                  className="px-3 h-6 text-[10px] font-medium transition-all"
                  style={{
                    border: selectedColors.includes(c) ? '1px solid #FF5500' : '1px solid #222',
                    background: selectedColors.includes(c) ? 'rgba(255,85,0,0.12)' : 'transparent',
                    color: selectedColors.includes(c) ? '#FF5500' : '#555',
                    fontFamily: "'Inter', sans-serif",
                    borderRadius: '2px',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </FilterSection>

          {/* Condition */}
          <FilterSection title="Condition">
            <div className="flex gap-2">
              {(['All', 'New', 'Pre-owned'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCondition(c)}
                  className="px-3 h-7 text-[10px] font-medium transition-all"
                  style={{
                    border: condition === c ? '1px solid #FF5500' : '1px solid #222',
                    background: condition === c ? 'rgba(255,85,0,0.12)' : 'transparent',
                    color: condition === c ? '#FF5500' : '#555',
                    fontFamily: "'Inter', sans-serif",
                    borderRadius: '2px',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </FilterSection>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              className="hidden lg:flex items-center gap-2 h-8 px-3 text-xs transition-all hover:bg-[#1A1A1A]"
              style={{ border: '1px solid #222', color: '#888', fontFamily: "'Inter', sans-serif", borderRadius: '2px' }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
              {sidebarOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
            <span className="text-xs text-[#555]" style={{ fontFamily: "'Inter', sans-serif" }}>
              <span className="text-white font-medium">{sorted.length}</span> results
            </span>

            {/* Active filter chips */}
            {selectedBrands.map((b) => (
              <div key={b} className="flex items-center gap-1.5 h-6 px-2.5 text-[10px]" style={{ background: 'rgba(255,85,0,0.12)', border: '1px solid rgba(255,85,0,0.3)', color: '#FF5500', borderRadius: '2px', fontFamily: "'Inter', sans-serif" }}>
                {b}
                <button onClick={() => toggleBrand(b)} className="opacity-70 hover:opacity-100">×</button>
              </div>
            ))}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-8 pl-3 pr-8 text-xs appearance-none outline-none cursor-pointer transition-all hover:border-[#333]"
              style={{
                background: '#111111',
                border: '1px solid #222',
                color: '#888',
                fontFamily: "'Inter', sans-serif",
                borderRadius: '2px',
              }}
            >
              <option>Popularity</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Release Date</option>
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          {sorted.map((p) => (
            <button
              key={p.id}
              onClick={() => onNavigate('detail', p.id)}
              className="relative text-left group card-hover"
              style={{ background: '#111111', border: '1px solid #1E1E1E', borderRadius: '2px', overflow: 'hidden' }}
              onMouseEnter={() => setHoveredProduct(p.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {p.badge && (
                <div
                  className="absolute top-3 left-3 z-10 px-2 py-0.5 text-[9px] font-bold tracking-widest"
                  style={{ background: p.badge === 'GRAIL' ? '#8B5CF6' : '#FF5500', color: 'white', fontFamily: "'Inter', sans-serif" }}
                >
                  {p.badge}
                </div>
              )}
              <div className="relative overflow-hidden" style={{ height: '200px', background: '#161616' }}>
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500"
                  style={{ transform: hoveredProduct === p.id ? 'scale(1.06)' : 'scale(1)' }}
                />
                <div
                  className="absolute inset-0 flex items-end p-3 transition-opacity duration-200"
                  style={{ opacity: hoveredProduct === p.id ? 1 : 0 }}
                >
                  <div
                    className="w-full py-2.5 text-center text-xs font-semibold text-white"
                    style={{ background: '#FF5500', fontFamily: "'Inter', sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase' }}
                  >
                    Add to Cart
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-semibold tracking-[0.12em] uppercase" style={{ color: '#FF5500', fontFamily: "'Inter', sans-serif" }}>{p.brand}</span>
                  <span className="text-[9px] px-1.5 py-0.5 uppercase tracking-wider" style={{ color: p.condition === 'New' ? '#10B981' : '#888', border: `1px solid ${p.condition === 'New' ? '#10B98140' : '#2A2A2A'}`, fontFamily: "'Inter', sans-serif" }}>
                    {p.condition}
                  </span>
                </div>
                <div className="text-sm font-medium leading-tight mb-3 text-[#CCCCCC] line-clamp-2" style={{ fontFamily: "'Inter', sans-serif" }}>{p.name}</div>
                <div className="text-xl font-bold" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#F0F0F0', letterSpacing: '0.02em' }}>
                  ${p.price}
                </div>
              </div>
            </button>
          ))}
        </div>

        {sorted.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4 opacity-30">👟</div>
            <h3 className="font-display font-bold text-2xl uppercase mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#F0F0F0' }}>No Results</h3>
            <p className="text-sm text-[#555]" style={{ fontFamily: "'Inter', sans-serif" }}>Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-6" style={{ borderBottom: '1px solid #1A1A1A', paddingBottom: '20px' }}>
      <button
        className="w-full flex items-center justify-between mb-4"
        onClick={() => setOpen(!open)}
      >
        <span className="text-[10px] font-semibold tracking-[0.15em] uppercase" style={{ color: '#888', fontFamily: "'Inter', sans-serif" }}>
          {title}
        </span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>
      {open && children}
    </div>
  );
}
