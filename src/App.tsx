import { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';

type Page = 'home' | 'listing' | 'detail';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [productId, setProductId] = useState<number | undefined>(undefined);

  const navigate = (target: Page, id?: number) => {
    setPage(target);
    if (id !== undefined) setProductId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <Header currentPage={page} onNavigate={navigate} />

      {page === 'home' && <Home onNavigate={navigate} />}
      {page === 'listing' && <ProductListing onNavigate={navigate} />}
      {page === 'detail' && <ProductDetail onNavigate={navigate} productId={productId} />}
    </div>
  );
}
