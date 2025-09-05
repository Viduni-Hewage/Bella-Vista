import React, { useState } from "react";
import { CartContext } from "./cartContext";

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, qty = 1) => {
    const exist = cartItems.find((item) => item._id === product._id);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + qty } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
    } else {
      setCartItems(
        cartItems.map((item) => (item._id === id ? { ...item, qty } : item))
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartCount = () =>
    cartItems.reduce((sum, item) => sum + Number(item.qty), 0);

  const getCartSubTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);

  const isInCart = (productId) =>
    cartItems.some((item) => item._id === productId);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        getCartSubTotal,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;