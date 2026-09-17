import { useState } from 'react';

type Page = 'home' | 'listing' | 'detail';

interface ProductDetailProps {
  onNavigate: (page: Page, productId?: number) => void;
  productId?: number;
}

const galleryImages = [
  'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=800&h=800&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1656944227421-416b1d2186c9?w=800&h=800&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1602231379593-b85a472e3c99?w=800&h=800&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1731132198530-e4b2dc51d511?w=800&h=800&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1610664676282-55c8de64f746?w=800&h=800&fit=crop&auto=format',
];

const relatedProducts = [
  { id: 2, brand: 'Nike', name: 'Air Jordan 1 "Shadow 2.0"', price: 280, img: 'https://images.unsplash.com/photo-1602231379593-b85a472e3c99?w=400&h=400&fit=crop&auto=format' },
  { id: 3, brand: 'Nike', name: 'Air Jordan 1 "University Blue"', price: 320, img: 'https://images.unsplash.com/photo-1656944227421-416b1d2186c9?w=400&h=400&fit=crop&auto=format' },
  { id: 4, brand: 'Nike', name: 'Air Jordan 1 "Bred Toe"', price: 265, img: 'https://images.unsplash.com/photo-1731132198530-e4b2dc51d511?w=400&h=400&fit=crop&auto=format' },
  { id: 5, brand: 'Nike', name: 'Air Jordan 4 "Military Blue"', price: 398, img: 'https://images.unsplash.com/photo-1656944227480-98180d2a5155?w=400&h=400&fit=crop&auto=format' },
];

const usSizes = ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'];
const euSizes = ['40', '40.5', '41', '42', '42.5', '43', '44', '44.5', '45', '45.5', '46', '47.5'];

const tabs = ['Details', 'Sizing Guide', 'Related Sneakers'];

export default function ProductDetail({ onNavigate }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeUnit, setSizeUnit] = useState<'US' | 'EU'>('US');
  const [activeTab, setActiveTab] = useState('Details');
  const [wishlist, setWishlist] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const sizes = sizeUnit === 'US' ? usSizes : euSizes;

  return (
    <div style={{ background: '#0A0A0A', paddingTop: '64px', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-[11px]" style={{ fontFamily: "'Inter', sans-serif" }}>
          <button onClick={() => onNavigate('home')} className="text-[#444] hover:text-[#888] transition-colors">Home</button>
          <span className="text-[#333]">/</span>
          <button onClick={() => onNavigate('listing')} className="text-[#444] hover:text-[#888] transition-colors">Sneakers</button>
          <span className="text-[#333]">/</span>
          <button onClick={() => onNavigate('listing')} className="text-[#444] hover:text-[#888] transition-colors">Nike</button>
          <span className="text-[#333]">/</span>
          <span className="text-[#888]">Air Jordan 1 Retro High OG "Chicago"</span>
        </nav>
      </div>

      {/* Main content */}
      <div className="max-w-[1400px] mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Left: Gallery */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2 shrink-0">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className="relative overflow-hidden shrink-0 transition-all"
                  style={{
                    width: '60px',
                    height: '60px',
                    background: '#111',
                    border: selectedImage === i ? '1px solid #FF5500' : '1px solid #1E1E1E',
                    borderRadius: '2px',
                  }}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" style={{ filter: selectedImage === i ? 'none' : 'brightness(0.5)' }} />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div
              className="flex-1 relative overflow-hidden cursor-zoom-in"
              style={{
                background: '#111111',
                border: '1px solid #1E1E1E',
                borderRadius: '2px',
                aspectRatio: '1',
              }}
              onClick={() => setZoom(!zoom)}
            >
              <img
                src={galleryImages[selectedImage]}
                alt="Air Jordan 1 Retro High OG Chicago"
                className="w-full h-full object-cover transition-transform duration-500"
                style={{ transform: zoom ? 'scale(1.4)' : 'scale(1)' }}
              />

              {/* Zoom icon */}
              <div className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid #2A2A2A', borderRadius: '2px' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  {zoom ? <path d="M8 11h6"/> : <path d="M11 8v6M8 11h6"/>}
                </svg>
              </div>

              {/* Auth badge */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5" style={{ background: 'rgba(10,10,10,0.9)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '2px' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
                </svg>
                <span className="text-[10px] font-medium" style={{ color: '#10B981', fontFamily: "'Inter', sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Authenticated
                </span>
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase block mb-1.5" style={{ color: '#FF5500', fontFamily: "'Inter', sans-serif" }}>
                  Nike
                </span>
                <h1
                  className="font-display font-black uppercase leading-tight"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 'clamp(28px, 4vw, 42px)',
                    color: '#F0F0F0',
                    letterSpacing: '0.01em',
                  }}
                >
                  Air Jordan 1 Retro<br />
                  High OG "Chicago"
                </h1>
              </div>
              <button
                onClick={() => setWishlist(!wishlist)}
                className="w-10 h-10 flex items-center justify-center shrink-0 transition-all hover:bg-[#1A1A1A]"
                style={{ border: '1px solid #222', borderRadius: '2px' }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill={wishlist ? '#FF5500' : 'none'} stroke={wishlist ? '#FF5500' : '#666'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>

            {/* Auth Badge */}
            <div className="flex items-center gap-2 mb-5 px-4 py-2.5 inline-flex" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '2px', display: 'inline-flex' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
              </svg>
              <span className="text-xs font-medium" style={{ color: '#10B981', fontFamily: "'Inter', sans-serif" }}>
                100% Authentic Verified by KicksGrid
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span
                className="font-display font-black"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '48px', color: '#F0F0F0', letterSpacing: '0.01em', lineHeight: 1 }}
              >
                $245
              </span>
              <div>
                <span className="text-sm text-[#444] line-through block" style={{ fontFamily: "'Inter', sans-serif" }}>$170 retail</span>
                <span className="text-xs font-medium" style={{ color: '#FF5500', fontFamily: "'Inter', sans-serif" }}>+44% above retail</span>
              </div>
            </div>

            {/* Size unit toggle */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase" style={{ color: '#888', fontFamily: "'Inter', sans-serif" }}>
                Select Size
              </span>
              <div className="flex" style={{ border: '1px solid #222', borderRadius: '2px' }}>
                {(['US', 'EU'] as const).map((unit) => (
                  <button
                    key={unit}
                    onClick={() => setSizeUnit(unit)}
                    className="w-10 h-6 text-[10px] font-semibold transition-all"
                    style={{
                      background: sizeUnit === unit ? '#FF5500' : 'transparent',
                      color: sizeUnit === unit ? 'white' : '#555',
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>

            {/* Size grid */}
            <div className="grid grid-cols-6 gap-1.5 mb-6">
              {sizes.map((s, i) => {
                const unavailable = i === 2 || i === 7;
                return (
                  <button
                    key={s}
                    disabled={unavailable}
                    onClick={() => setSelectedSize(s)}
                    className="h-9 text-xs font-medium transition-all"
                    style={{
                      border: selectedSize === s ? '1px solid #FF5500' : unavailable ? '1px solid #1A1A1A' : '1px solid #222',
                      background: selectedSize === s ? 'rgba(255,85,0,0.12)' : 'transparent',
                      color: unavailable ? '#2A2A2A' : selectedSize === s ? '#FF5500' : '#666',
                      fontFamily: "'Inter', sans-serif",
                      borderRadius: '2px',
                      cursor: unavailable ? 'not-allowed' : 'pointer',
                      textDecoration: unavailable ? 'line-through' : 'none',
                    }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase" style={{ color: '#888', fontFamily: "'Inter', sans-serif" }}>Qty</span>
              <div className="flex items-center" style={{ border: '1px solid #222', borderRadius: '2px' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-[#666] hover:text-white transition-colors"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-medium text-white" style={{ fontFamily: "'Inter', sans-serif" }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(5, quantity + 1))}
                  className="w-8 h-8 flex items-center justify-center text-[#666] hover:text-white transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 mb-6">
              <button
                className="flex-1 h-12 text-white font-semibold text-sm transition-all hover:bg-[#FF6B1A] active:scale-[0.98]"
                style={{
                  background: '#FF5500',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                  boxShadow: '0 0 24px rgba(255,85,0,0.25)',
                }}
              >
                Buy Now — ${245 * quantity}
              </button>
              <button
                className="flex-1 h-12 text-white font-semibold text-sm transition-all hover:bg-[#1A1A1A]"
                style={{
                  border: '1px solid #3A3A3A',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                }}
              >
                Place Bid
              </button>
            </div>

            {/* Meta info */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Style Code', val: 'CZ0790-100' },
                { label: 'Colorway', val: 'White/Black-Varsity Red' },
                { label: 'Release Date', val: 'Oct 14, 2022' },
                { label: 'Avg Sale', val: '$248 (last 7d)' },
              ].map((m) => (
                <div key={m.label} className="p-3" style={{ background: '#111111', border: '1px solid #1A1A1A', borderRadius: '2px' }}>
                  <div className="text-[9px] tracking-[0.12em] uppercase mb-1" style={{ color: '#444', fontFamily: "'Inter', sans-serif" }}>{m.label}</div>
                  <div className="text-xs font-medium text-[#CCCCCC]" style={{ fontFamily: "'Inter', sans-serif" }}>{m.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16" style={{ borderTop: '1px solid #1A1A1A' }}>
          <div className="flex gap-8" style={{ borderBottom: '1px solid #1A1A1A' }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="py-4 text-xs font-semibold tracking-[0.1em] uppercase transition-colors relative"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: activeTab === tab ? '#F0F0F0' : '#444',
                  borderBottom: activeTab === tab ? '2px solid #FF5500' : '2px solid transparent',
                  marginBottom: '-1px',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="py-10">
            {activeTab === 'Details' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <h3 className="font-display font-bold text-xl uppercase mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#F0F0F0', letterSpacing: '0.02em' }}>
                    About This Sneaker
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#666', fontFamily: "'Inter', sans-serif" }}>
                    The Air Jordan 1 Retro High OG "Chicago" brings back one of the most iconic colorways in sneaker history. Originally released in 1985 alongside Michael Jordan's rookie season, the "Chicago" remains the most sought-after colorway in the Jordan 1 lineage.
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: '#666', fontFamily: "'Inter', sans-serif" }}>
                    This iteration features a full-grain leather upper in the classic red, white, and black color blocking with a Wings logo on the ankle. Nike Air cushioning and a cupsole rubber outsole deliver classic comfort and durability.
                  </p>
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl uppercase mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#F0F0F0', letterSpacing: '0.02em' }}>
                    Specifications
                  </h3>
                  <div className="space-y-3">
                    {[
                      ['Upper Material', 'Full-grain leather'],
                      ['Midsole', 'Polyurethane with Air-Sole unit'],
                      ['Outsole', 'Rubber cupsole'],
                      ['Lace System', 'Flat woven laces'],
                      ['Ankle', 'Padded collar with Swoosh detail'],
                      ['Origin', 'Vietnam'],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid #1A1A1A' }}>
                        <span className="text-[11px] text-[#444]" style={{ fontFamily: "'Inter', sans-serif" }}>{k}</span>
                        <span className="text-[11px] text-[#AAAAAA] font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Sizing Guide' && (
              <div>
                <h3 className="font-display font-bold text-xl uppercase mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#F0F0F0', letterSpacing: '0.02em' }}>
                  Size Conversion Chart
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#111111' }}>
                        {['US Men', 'US Women', 'EU', 'UK', 'CM'].map((h) => (
                          <th key={h} className="px-4 py-3 text-[10px] font-semibold tracking-[0.1em] uppercase" style={{ color: '#FF5500', fontFamily: "'Inter', sans-serif", borderBottom: '1px solid #1A1A1A' }}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['7', '8.5', '40', '6', '25'],
                        ['8', '9.5', '41', '7', '26'],
                        ['9', '10.5', '42.5', '8', '27'],
                        ['10', '11.5', '44', '9', '28'],
                        ['11', '12.5', '45', '10', '29'],
                        ['12', '13.5', '46', '11', '30'],
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? '#0D0D0D' : '#111111' }}>
                          {row.map((cell, j) => (
                            <td key={j} className="px-4 py-3 text-xs" style={{ color: '#888', fontFamily: "'Inter', sans-serif", borderBottom: '1px solid #1A1A1A' }}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-xs" style={{ color: '#444', fontFamily: "'Inter', sans-serif" }}>
                  Air Jordan 1 fits true to size. For wider feet, we recommend going up half a size.
                </p>
              </div>
            )}

            {activeTab === 'Related Sneakers' && (
              <div>
                <h3 className="font-display font-bold text-xl uppercase mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#F0F0F0', letterSpacing: '0.02em' }}>
                  You Might Also Like
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {relatedProducts.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => onNavigate('detail', p.id)}
                      className="text-left group card-hover"
                      style={{ background: '#111111', border: '1px solid #1E1E1E', borderRadius: '2px', overflow: 'hidden' }}
                    >
                      <div className="relative overflow-hidden" style={{ height: '160px', background: '#161616' }}>
                        <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="p-3">
                        <div className="text-[9px] font-semibold tracking-[0.12em] uppercase mb-1" style={{ color: '#FF5500', fontFamily: "'Inter', sans-serif" }}>{p.brand}</div>
                        <div className="text-xs font-medium leading-tight mb-2 text-[#CCCCCC] line-clamp-2" style={{ fontFamily: "'Inter', sans-serif" }}>{p.name}</div>
                        <div className="font-bold text-lg" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#F0F0F0', letterSpacing: '0.02em' }}>${p.price}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
