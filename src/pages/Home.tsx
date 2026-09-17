import { useState } from 'react';

type Page = 'home' | 'listing' | 'detail';

interface HomeProps {
  onNavigate: (page: Page, productId?: number) => void;
}

const products = [
  {
    id: 1,
    brand: 'Nike',
    name: 'Air Jordan 1 Retro High OG "Chicago"',
    price: 245,
    retail: 170,
    img: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=600&h=600&fit=crop&auto=format',
    badge: 'HOT',
    condition: 'New',
  },
  {
    id: 2,
    brand: 'Adidas',
    name: 'Yeezy Boost 350 V2 "Zebra"',
    price: 320,
    retail: 220,
    img: 'https://images.unsplash.com/photo-1656944227421-416b1d2186c9?w=600&h=600&fit=crop&auto=format',
    badge: 'RARE',
    condition: 'New',
  },
  {
    id: 3,
    brand: 'New Balance',
    name: 'NB 550 "White Green"',
    price: 110,
    retail: 110,
    img: 'https://images.unsplash.com/photo-1637437757614-6491c8e915b5?w=600&h=600&fit=crop&auto=format',
    badge: null,
    condition: 'New',
  },
  {
    id: 4,
    brand: 'Nike',
    name: 'Dunk Low "Panda"',
    price: 155,
    retail: 110,
    img: 'https://images.unsplash.com/photo-1602231379593-b85a472e3c99?w=600&h=600&fit=crop&auto=format',
    badge: 'DROP',
    condition: 'New',
  },
  {
    id: 5,
    brand: 'Nike',
    name: 'Air Force 1 Low "White"',
    price: 90,
    retail: 90,
    img: 'https://images.unsplash.com/photo-1731132198530-e4b2dc51d511?w=600&h=600&fit=crop&auto=format',
    badge: null,
    condition: 'New',
  },
  {
    id: 6,
    brand: 'Adidas',
    name: 'Samba OG "Black Gum"',
    price: 105,
    retail: 100,
    img: 'https://images.unsplash.com/photo-1610664676282-55c8de64f746?w=600&h=600&fit=crop&auto=format',
    badge: 'TREND',
    condition: 'New',
  },
  {
    id: 7,
    brand: 'Asics',
    name: 'Gel-Kayano 14 "Cream Navy"',
    price: 130,
    retail: 130,
    img: 'https://images.unsplash.com/photo-1637437411360-b4607d62ddd3?w=600&h=600&fit=crop&auto=format',
    badge: null,
    condition: 'New',
  },
  {
    id: 8,
    brand: 'Nike',
    name: 'Air Jordan 4 Retro "Military Blue"',
    price: 398,
    retail: 200,
    img: 'https://images.unsplash.com/photo-1656944227480-98180d2a5155?w=600&h=600&fit=crop&auto=format',
    badge: 'GRAIL',
    condition: 'New',
  },
];

const categories = [
  {
    label: 'Trending',
    sub: '2,400+ pairs',
    color: '#FF5500',
    img: 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=400&h=300&fit=crop&auto=format',
  },
  {
    label: 'Limited Edition',
    sub: '180 drops',
    color: '#8B5CF6',
    img: 'https://images.unsplash.com/photo-1656944227421-416b1d2186c9?w=400&h=300&fit=crop&auto=format',
  },
  {
    label: 'Basketball',
    sub: '950+ styles',
    color: '#F59E0B',
    img: 'https://images.unsplash.com/photo-1602231379593-b85a472e3c99?w=400&h=300&fit=crop&auto=format',
  },
  {
    label: 'Everyday',
    sub: '3,200+ styles',
    color: '#10B981',
    img: 'https://images.unsplash.com/photo-1637437757614-6491c8e915b5?w=400&h=300&fit=crop&auto=format',
  },
];

const authSteps = [
  {
    num: '01',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF5500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
    title: 'Physical Inspection',
    desc: 'Every pair is individually examined by our certified authentication team against 30+ checkpoints.',
  },
  {
    num: '02',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF5500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="m8 11 2 2 4-4"/>
      </svg>
    ),
    title: 'Digital Verification',
    desc: 'UV scanning, stitch counting, and AI-assisted sole pattern analysis confirm authenticity.',
  },
  {
    num: '03',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF5500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    title: 'Certified & Shipped',
    desc: 'Authenticated pairs receive a KicksGrid certificate tag and are shipped in protective packaging.',
  },
];

export default function Home({ onNavigate }: HomeProps) {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [email, setEmail] = useState('');

  return (
    <div style={{ background: '#0A0A0A' }}>
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ paddingTop: '64px' }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=1600&h=900&fit=crop&auto=format)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
          }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.97) 30%, rgba(10,10,10,0.7) 60%, rgba(10,10,10,0.3) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, transparent 40%)' }} />

        {/* Orange accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: 'linear-gradient(to bottom, transparent, #FF5500, transparent)' }} />

        <div className="relative max-w-[1400px] mx-auto px-6 py-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: '#FF5500' }} />
              <span className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: '#FF5500', fontFamily: "'Inter', sans-serif" }}>
                New Drops Every Friday
              </span>
            </div>

            <h1
              className="font-display font-black uppercase leading-none mb-6"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 'clamp(72px, 10vw, 140px)',
                letterSpacing: '-0.01em',
                color: '#F0F0F0',
                lineHeight: 0.92,
              }}
            >
              FIND<br />
              <span style={{ color: '#FF5500' }}>YOUR</span><br />
              GRAIL
            </h1>

            <p
              className="text-base mb-8 leading-relaxed"
              style={{ color: '#888888', fontFamily: "'Inter', sans-serif", maxWidth: '420px' }}
            >
              The world's most verified sneaker marketplace. Every pair authenticated, every deal guaranteed.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('listing')}
                className="flex items-center gap-3 px-8 h-12 text-white font-semibold text-sm transition-all duration-200 hover:translate-x-1"
                style={{
                  background: '#FF5500',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '0.04em',
                  boxShadow: '0 0 32px rgba(255,85,0,0.35)',
                }}
              >
                SHOP LATEST DROPS
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m5 12 14 0M12 5l7 7-7 7"/>
                </svg>
              </button>
              <button
                onClick={() => onNavigate('listing')}
                className="flex items-center gap-3 px-8 h-12 text-white text-sm font-medium transition-all duration-200 hover:bg-[#1A1A1A]"
                style={{
                  border: '1px solid #2A2A2A',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '0.04em',
                }}
              >
                BROWSE ALL
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12">
              {[
                { val: '2.4M+', label: 'Pairs Sold' },
                { val: '99.8%', label: 'Auth Rate' },
                { val: '180K', label: 'Active Sellers' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-display font-bold text-2xl" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#F0F0F0', letterSpacing: '0.02em' }}>
                    {s.val}
                  </div>
                  <div className="text-xs text-[#555] mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] tracking-[0.2em] text-[#888]" style={{ fontFamily: "'Inter', sans-serif" }}>SCROLL</span>
          <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, #888, transparent)' }} />
        </div>
      </section>

      {/* Category Carousel */}
      <section className="py-20 max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase block mb-2" style={{ color: '#FF5500', fontFamily: "'Inter', sans-serif" }}>
              Shop By
            </span>
            <h2
              className="font-display font-bold uppercase text-4xl leading-none"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#F0F0F0', letterSpacing: '0.01em' }}
            >
              Categories
            </h2>
          </div>
          <button
            onClick={() => onNavigate('listing')}
            className="text-xs font-medium flex items-center gap-2 transition-colors hover:text-white"
            style={{ color: '#888', fontFamily: "'Inter', sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase' }}
          >
            All Categories
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m5 12 14 0M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => onNavigate('listing')}
              className="relative overflow-hidden group"
              style={{
                height: i % 2 === 0 ? '260px' : '220px',
                background: '#111111',
                border: '1px solid #1E1E1E',
                borderRadius: '2px',
              }}
            >
              <img
                src={cat.img}
                alt={cat.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ filter: 'brightness(0.35)' }}
              />
              <div
                className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{ background: `linear-gradient(135deg, ${cat.color}22, transparent)` }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 p-5 text-left"
              >
                <div
                  className="text-[10px] font-medium mb-1.5 tracking-[0.15em]"
                  style={{ color: cat.color, fontFamily: "'Inter', sans-serif", textTransform: 'uppercase' }}
                >
                  {cat.sub}
                </div>
                <div
                  className="font-display font-bold text-2xl uppercase leading-none"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#F0F0F0', letterSpacing: '0.01em' }}
                >
                  {cat.label}
                </div>
              </div>
              <div
                className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                style={{ background: cat.color }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="m5 12 14 0M12 5l7 7-7 7"/>
                </svg>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-20" style={{ borderTop: '1px solid #1A1A1A' }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-[10px] font-medium tracking-[0.25em] uppercase block mb-2" style={{ color: '#FF5500', fontFamily: "'Inter', sans-serif" }}>
                This Week
              </span>
              <h2
                className="font-display font-bold uppercase text-4xl leading-none"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#F0F0F0', letterSpacing: '0.01em' }}
              >
                Latest Drops
              </h2>
            </div>
            <button
              onClick={() => onNavigate('listing')}
              className="text-xs font-medium flex items-center gap-2 transition-colors hover:text-white"
              style={{ color: '#888', fontFamily: "'Inter', sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase' }}
            >
              View All
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="m5 12 14 0M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((p) => (
              <button
                key={p.id}
                onClick={() => onNavigate('detail', p.id)}
                className="relative text-left group card-hover"
                style={{
                  background: '#111111',
                  border: '1px solid #1E1E1E',
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}
                onMouseEnter={() => setHoveredProduct(p.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {p.badge && (
                  <div
                    className="absolute top-3 left-3 z-10 px-2 py-0.5 text-[9px] font-bold tracking-widest"
                    style={{
                      background: p.badge === 'GRAIL' ? '#8B5CF6' : p.badge === 'RARE' ? '#7C3AED' : '#FF5500',
                      color: 'white',
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {p.badge}
                  </div>
                )}

                <div
                  className="relative overflow-hidden"
                  style={{ height: '220px', background: '#161616' }}
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    style={{ transform: hoveredProduct === p.id ? 'scale(1.06)' : 'scale(1)' }}
                  />

                  {/* Add to cart hover overlay */}
                  <div
                    className="absolute inset-0 flex items-end p-3 transition-opacity duration-200"
                    style={{ opacity: hoveredProduct === p.id ? 1 : 0 }}
                  >
                    <div
                      className="w-full py-2.5 text-center text-xs font-semibold text-white transition-all"
                      style={{
                        background: '#FF5500',
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Add to Cart
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="text-[10px] font-semibold tracking-[0.12em] uppercase mb-1.5" style={{ color: '#FF5500', fontFamily: "'Inter', sans-serif" }}>
                    {p.brand}
                  </div>
                  <div className="text-sm font-medium leading-tight mb-3 text-[#CCCCCC] line-clamp-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {p.name}
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="price-tag text-xl font-bold text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.02em' }}>
                      ${p.price}
                    </span>
                    {p.price > p.retail && (
                      <span className="text-[11px] text-[#444] line-through" style={{ fontFamily: "'Inter', sans-serif" }}>
                        ${p.retail} retail
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Authenticity Section */}
      <section className="py-24" style={{ background: '#0D0D0D', borderTop: '1px solid #1A1A1A', borderBottom: '1px solid #1A1A1A' }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase block mb-3" style={{ color: '#FF5500', fontFamily: "'Inter', sans-serif" }}>
              KicksGrid Guarantee
            </span>
            <h2
              className="font-display font-bold uppercase leading-none"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 'clamp(36px, 5vw, 60px)',
                color: '#F0F0F0',
                letterSpacing: '0.01em',
              }}
            >
              100% Authenticity,<br />
              <span style={{ color: '#FF5500' }}>Every Single Time</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {authSteps.map((step, i) => (
              <div
                key={step.num}
                className="relative p-8"
                style={{
                  background: '#111111',
                  border: '1px solid #1E1E1E',
                  borderRadius: '2px',
                }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-14 h-14 flex items-center justify-center rounded-sm"
                    style={{ background: 'rgba(255,85,0,0.1)', border: '1px solid rgba(255,85,0,0.2)' }}
                  >
                    {step.icon}
                  </div>
                  <span
                    className="font-display font-black text-5xl opacity-15"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#FF5500', lineHeight: 1 }}
                  >
                    {step.num}
                  </span>
                </div>
                <h3
                  className="font-display font-bold text-xl uppercase mb-3"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#F0F0F0', letterSpacing: '0.02em' }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#666666', fontFamily: "'Inter', sans-serif" }}>
                  {step.desc}
                </p>
                {i < authSteps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-1/2 -right-px w-px h-16 -translate-y-1/2"
                    style={{ background: 'linear-gradient(to bottom, transparent, #2A2A2A, transparent)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#080808', borderTop: '1px solid #1A1A1A' }}>
        <div className="max-w-[1400px] mx-auto px-6 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
            {/* Brand */}
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-black" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#FF5500' }}>KICKS</span>
                <span className="text-3xl font-black" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#F0F0F0' }}>GRID</span>
              </div>
              <p className="text-xs leading-relaxed mb-6" style={{ color: '#555555', fontFamily: "'Inter', sans-serif" }}>
                The world's most trusted marketplace for authenticated sneakers and streetwear.
              </p>
              <div className="flex gap-3">
                {['twitter', 'instagram', 'tiktok', 'youtube'].map((s) => (
                  <button
                    key={s}
                    className="w-8 h-8 flex items-center justify-center rounded-sm transition-all hover:bg-[#FF5500] hover:border-transparent"
                    style={{ border: '1px solid #2A2A2A', color: '#555' }}
                  >
                    {s === 'instagram' && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                      </svg>
                    )}
                    {s === 'twitter' && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    )}
                    {s === 'tiktok' && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.23a8.16 8.16 0 0 0 4.77 1.52V7.27a4.85 4.85 0 0 1-1-.58z"/>
                      </svg>
                    )}
                    {s === 'youtube' && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#080808"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              {
                title: 'Shop',
                links: ['New Arrivals', 'Most Popular', 'Limited Edition', 'Under $150', 'Size Runs'],
              },
              {
                title: 'Sell',
                links: ['Start Selling', 'Seller Hub', 'Payout Options', 'Seller Protection', 'Verification Fees'],
              },
              {
                title: 'Company',
                links: ['About KicksGrid', 'Careers', 'Press', 'Blog', 'Authentication'],
              },
              {
                title: 'Support',
                links: ['Help Center', 'Shipping Info', 'Returns', 'Track Order', 'Contact Us'],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4
                  className="text-xs font-semibold tracking-[0.15em] uppercase mb-4"
                  style={{ color: '#F0F0F0', fontFamily: "'Inter', sans-serif" }}
                >
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-xs transition-colors hover:text-white"
                        style={{ color: '#555555', fontFamily: "'Inter', sans-serif" }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div
            className="p-8 mb-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
            style={{ background: '#111111', border: '1px solid #1E1E1E', borderRadius: '2px' }}
          >
            <div>
              <h3
                className="font-display font-bold text-2xl uppercase mb-1"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#F0F0F0', letterSpacing: '0.02em' }}
              >
                Get Early Drop Access
              </h3>
              <p className="text-sm" style={{ color: '#555555', fontFamily: "'Inter', sans-serif" }}>
                Subscribe for exclusive restocks, price alerts, and first look at new inventory.
              </p>
            </div>
            <div className="flex gap-0 w-full lg:w-auto lg:min-w-[380px]">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-11 px-4 text-sm text-white outline-none"
                style={{
                  background: '#0A0A0A',
                  border: '1px solid #2A2A2A',
                  borderRight: 'none',
                  fontFamily: "'Inter', sans-serif",
                  borderRadius: '2px 0 0 2px',
                }}
              />
              <button
                className="h-11 px-6 text-xs font-semibold text-white transition-colors hover:bg-[#FF6B1A] whitespace-nowrap"
                style={{
                  background: '#FF5500',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  borderRadius: '0 2px 2px 0',
                }}
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6" style={{ borderTop: '1px solid #1A1A1A', paddingTop: '24px' }}>
            <p className="text-[11px] text-[#3A3A3A]" style={{ fontFamily: "'Inter', sans-serif" }}>
              © 2026 KicksGrid Inc. All rights reserved.
            </p>

            {/* Payment methods */}
            <div className="flex items-center gap-3">
              {['VISA', 'MC', 'AMEX', 'PAYPAL', 'APPLE PAY'].map((pm) => (
                <div
                  key={pm}
                  className="h-6 px-2 flex items-center justify-center text-[9px] font-bold tracking-wider"
                  style={{
                    border: '1px solid #2A2A2A',
                    color: '#3A3A3A',
                    fontFamily: "'Inter', sans-serif",
                    borderRadius: '2px',
                    minWidth: '40px',
                  }}
                >
                  {pm}
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
