import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CartItem } from '@/hooks/useCart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  totalPrice: number;
}

export default function CartDrawer({ isOpen, onClose, items, onRemove, onUpdateQuantity, totalPrice }: CartDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-[100] bg-overlay-dark transition-opacity duration-400',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 z-[100] w-full max-w-md h-full bg-bg-secondary border-l border-[rgba(245,240,235,0.06)] flex flex-col transition-transform duration-500',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(245,240,235,0.06)]">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-accent" />
            <h2 className="font-display text-xl text-text-primary">Panier</h2>
            <span className="text-text-muted font-body text-body-sm">({items.length})</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-12 h-12 text-text-muted mb-4" />
              <p className="font-display text-lg text-text-secondary">Votre panier est vide</p>
              <p className="font-body text-body-sm text-text-muted mt-2">Decouvrez nos tirages d'exception</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-bg-primary p-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover"
                  />
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-display text-base text-text-primary">{item.title}</h3>
                    <p className="font-display text-accent mt-1">{item.price.toLocaleString('fr-FR')} &euro;</p>
                    <div className="flex items-center gap-2 mt-auto">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 border border-[rgba(245,240,235,0.06)] flex items-center justify-center text-text-secondary hover:text-accent transition-colors duration-200"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-body text-body-sm text-text-primary w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 border border-[rgba(245,240,235,0.06)] flex items-center justify-center text-text-secondary hover:text-accent transition-colors duration-200"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="ml-auto text-text-muted hover:text-error transition-colors duration-200 font-body text-caption"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[rgba(245,240,235,0.06)]">
            <div className="flex items-center justify-between mb-4">
              <span className="font-body text-body-md text-text-secondary">Total</span>
              <span className="font-display text-xl text-accent">
                {totalPrice.toLocaleString('fr-FR')} &euro;
              </span>
            </div>
            <button className="w-full py-4 bg-accent text-bg-primary font-body font-medium text-sm tracking-wide hover:bg-accent-light transition-colors duration-300">
              Commander
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 mt-2 border border-[rgba(245,240,235,0.06)] text-text-secondary font-body text-body-sm hover:text-text-primary transition-colors duration-200"
            >
              Continuer les achats
            </button>
          </div>
        )}
      </div>
    </>
  );
}
