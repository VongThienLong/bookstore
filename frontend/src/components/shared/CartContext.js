import React, { createContext, useContext, useState } from 'react';

// Create Cart Context
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const updateCartLocalStorage = (updatedCart) => {
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };
  
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.some((item) => item.id === product.id)
        ? prevItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prevItems, { ...product, quantity: 1 }];
      updateCartLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      console.log("Before removal:", prevItems);
      const updatedCart = prevItems.filter((item) => item.id !== productId);
      console.log("After removal:", updatedCart);
      updateCartLocalStorage(updatedCart);
      return updatedCart;
    });
  };
  

  const increaseQuantity = (productId) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      updateCartLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      updateCartLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, cartItemsCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
