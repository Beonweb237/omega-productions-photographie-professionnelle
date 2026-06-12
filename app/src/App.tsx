import { useState, createContext, useContext, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Boutique from './pages/Boutique';
import About from './pages/About';
import Contact from './pages/Contact';
import CartDrawer from './components/CartDrawer';
import { useCart } from './hooks/useCart';
import type { CartItem } from './hooks/useCart';

interface CartContextType {
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  items: CartItem[];
}

const CartContext = createContext<CartContextType | null>(null);

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCartContext must be used within CartProvider');
  return ctx;
}

export default function App() {
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const wrappedAddItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    cart.addItem(item);
    setCartOpen(true);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        addItem: wrappedAddItem,
        removeItem: cart.removeItem,
        updateQuantity: cart.updateQuantity,
        clearCart: cart.clearCart,
        totalItems: cart.totalItems,
        totalPrice: cart.totalPrice,
        items: cart.items,
      }}
    >
      <Layout cartCount={cart.totalItems} onCartClick={() => setCartOpen(true)}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/boutique" element={<Boutique />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart.items}
        onRemove={cart.removeItem}
        onUpdateQuantity={cart.updateQuantity}
        totalPrice={cart.totalPrice}
      />
    </CartContext.Provider>
  );
}
