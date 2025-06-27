import React, { createContext, useEffect, useMemo, useState } from 'react';

export const CartContext = createContext();

/* --------------------------------------------------------------
   Helpers
----------------------------------------------------------------*/
const LS_KEY = 'tollycart-cart';

const loadCart = () => {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveCart = (items) => {
  localStorage.setItem(LS_KEY, JSON.stringify(items));
};

/* --------------------------------------------------------------
   Provider
----------------------------------------------------------------*/
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(loadCart); // 🛒 restore on first render

  /* ---------- Core mutations ---------- */
  const addToCart = (product) =>
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      return existing
        ? prev.map((p) =>
            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
          )
        : [...prev, { ...product, quantity: 1 }];
    });

  const removeFromCart = (id) =>
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === id);
      if (!existing) return prev;
      return existing.quantity === 1
        ? prev.filter((p) => p.id !== id)
        : prev.map((p) =>
            p.id === id ? { ...p, quantity: p.quantity - 1 } : p
          );
    });

  const clearCart = () => setCartItems([]);

  const getItemQuantity = (id) =>
    cartItems.find((p) => p.id === id)?.quantity ?? 0;

  /* ---------- Derived values ---------- */
  const { totalItems, totalPrice } = useMemo(() => {
    const totalItems = cartItems.reduce((sum, p) => sum + p.quantity, 0);
    const totalPrice = cartItems.reduce(
      (sum, p) => sum + p.quantity * parseInt(p.price, 10),
      0
    );
    return { totalItems, totalPrice };
  }, [cartItems]);

  /* ---------- Persist to localStorage ---------- */
  useEffect(() => {
    saveCart(cartItems);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getItemQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
