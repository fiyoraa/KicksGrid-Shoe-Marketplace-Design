import { useState } from 'react';

type Page = 'home' | 'listing' | 'detail';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const categories = ['Sneakers', 'Running', 'Luxury', 'Resell'];

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount] = useState(2);
  const [wishlistCount] = useState(5);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const catItems: Record<string, string[]> = {
    Sneakers: ['Air Jordan', 'Nike Dunk', 'Air Force 1', 'Yeezy'],
    Running: ['Adidas Ultraboost', 'Nike Pegasus', 'Asics Gel', 'Hoka One One'],
    Luxury: ['Balenciaga', 'Gucci', 'Prada', 'Off-White'],
    Resell: ['Highest Bids', 'Recent Sales', 'Price Drops', 'Grails'],
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1E1E1E' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center gap-6">
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 shrink-0 group"
        >
          <span
            className="text-2xl font-black tracking-tighter leading-none"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", color: '#FF5500' }}
          >
            KICKS
          </span>
          <span
            className="text-2xl font-black tracking-tighter leading-none text-white"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            GRID
          </span>
        </button>

        {/* Search */}
        <div
          className="flex-1 max-w-sm relative"
          style={{ maxWidth: '360px' }}
        >
          <div
            className="flex items-center gap-2 px-4 h-9 rounded-sm transition-all duration-200"
            style={{
              background: searchFocused ? '#1A1A1A' : '#141414',
              border: `1px solid ${searchFocused ? '#FF5500' : '#2A2A2A'}`,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search sneakers, brands…"
              className="flex-1 bg-transparent text-xs outline-none text-white placeholder-[#555]"
              style={{ fontFamily: "'Inter', sans-serif" }}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <span className="text-[10px] text-[#444] font-mono">⌘K</span>
          </div>
        </div>

        {/* Nav categories */}
        <nav className="hidden lg:flex items-center gap-1">
          {categories.map((cat) => (
            <div key={cat} className="relative" onMouseLeave={() => setActiveDropdown(null)}>
              <button
                className="flex items-center gap-1 px-3 h-9 text-[11px] font-medium tracking-wide transition-colors rounded-sm"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: activeDropdown === cat ? '#FF5500' : '#AAAAAA',
                  background: activeDropdown === cat ? 'rgba(255,85,0,0.08)' : 'transparent',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
                onMouseEnter={() => setActiveDropdown(cat)}
                onClick={() => onNavigate('listing')}
              >
                {cat}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              {activeDropdown === cat && (
                <div
                  className="absolute top-full left-0 mt-2 w-40 py-2 rounded-sm"
                  style={{ background: '#141414', border: '1px solid #222', boxShadow: '0 16px 40px rgba(0,0,0,0.6)' }}
                >
                  {catItems[cat].map((item) => (
                    <button
                      key={item}
                      onClick={() => { onNavigate('listing'); setActiveDropdown(null); }}
                      className="w-full text-left px-4 py-2 text-xs text-[#888] hover:text-white hover:bg-[#1A1A1A] transition-colors"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex-1" />

        {/* Icons */}
        <div className="flex items-center gap-1">
          {/* Wishlist */}
          <button className="relative w-9 h-9 flex items-center justify-center rounded-sm transition-colors hover:bg-[#1A1A1A] group">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#AAAAAA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-colors">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full text-[9px] font-bold flex items-center justify-center text-white" style={{ background: '#FF5500', fontFamily: "'Inter', sans-serif" }}>
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            className="relative w-9 h-9 flex items-center justify-center rounded-sm transition-colors hover:bg-[#1A1A1A] group"
            onClick={() => onNavigate('detail')}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#AAAAAA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-colors">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full text-[9px] font-bold flex items-center justify-center text-white" style={{ background: '#FF5500', fontFamily: "'Inter', sans-serif" }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile */}
          <button className="w-9 h-9 flex items-center justify-center rounded-sm transition-colors hover:bg-[#1A1A1A] group">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#AAAAAA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-white transition-colors">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </button>

          {/* Mobile menu */}
          <button
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-sm transition-colors hover:bg-[#1A1A1A]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#AAAAAA" strokeWidth="1.8">
              {mobileMenuOpen ? (
                <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              ) : (
                <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden" style={{ borderTop: '1px solid #1E1E1E', background: '#0D0D0D' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className="w-full text-left px-6 py-3 text-xs font-medium text-[#888] hover:text-white hover:bg-[#141414] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase' }}
              onClick={() => { onNavigate('listing'); setMobileMenuOpen(false); }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
