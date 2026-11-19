import React, { useEffect, useState } from 'react';
import AboutUs from './AboutUs.jsx';
import CartItem from './CartItem.jsx';
import ProductList from './ProductList.jsx';
import './App.css';

function readPage() {
  const page = window.location.hash.slice(1);
  return page === 'plants' || page === 'cart' ? page : 'home';
}

export default function App() {
  const [page, setPage] = useState(readPage);

  useEffect(() => {
    function handleNavigation() {
      setPage(readPage());
      window.scrollTo(0, 0);
    }

    window.addEventListener('hashchange', handleNavigation);
    return () => window.removeEventListener('hashchange', handleNavigation);
  }, []);

  if (page === 'plants') return <ProductList />;
  if (page === 'cart') return <CartItem />;

  return (
    <main className="landing">
      <div className="landing-copy">
        <a className="wordmark" href="#home">
          <span className="leaf-mark" aria-hidden="true" />
          Paradise Nursery
        </a>

        <div className="landing-intro">
          <h1>Paradise<br />Nursery</h1>
          <AboutUs />
          <button className="button landing-button" onClick={() => { window.location.hash = 'plants'; }}>
            Get Started <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
      <div className="landing-photo" role="img" aria-label="Sunlit greenhouse filled with houseplants" />
    </main>
  );
}
