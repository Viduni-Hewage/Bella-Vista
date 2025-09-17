import React, { useState, useEffect } from "react";
import { CartContext } from "./cartContext";
import { useAuth0 } from "@auth0/auth0-react";

const CART_KEY = "cartData";
const EXPIRY_DAYS = 30;

const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();
  const [cartItems, setCartItems] = useState([]);
  const [purchasedItems, setPurchasedItems] = useState([]);

  const historyKey = isAuthenticated ? `purchaseHistory_${user.sub}` : null;

  useEffect(() => {
    if (historyKey) {
      const storedHistory = localStorage.getItem(historyKey);
      if (storedHistory) {
        setPurchasedItems(JSON.parse(storedHistory));
      } else {
        setPurchasedItems([]);
      }
    }
  }, [historyKey]);

  useEffect(() => {
    if (historyKey) {
      localStorage.setItem(historyKey, JSON.stringify(purchasedItems));
    }
  }, [purchasedItems, historyKey]);

  useEffect(() => {
    const stored = localStorage.getItem(CART_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const now = new Date().getTime();
      if (now - parsed.timestamp < EXPIRY_DAYS * 24 * 60 * 60 * 1000) {
        setCartItems(parsed.items);
      } else {
        localStorage.removeItem(CART_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem(
        CART_KEY,
        JSON.stringify({ items: cartItems, timestamp: new Date().getTime() })
      );
    } else {
      localStorage.removeItem(CART_KEY);
    }
  }, [cartItems]);

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

  const toggleSelect = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const getCartCount = () =>
    cartItems.reduce((sum, item) => sum + Number(item.qty), 0);

  const getCartSubTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);

  const isInCart = (productId) => cartItems.some((item) => item._id === productId);

  const getSelectedSubTotal = () =>
    cartItems
      .filter((item) => item.selected)
      .reduce((sum, item) => sum + item.price * item.qty, 0)
      .toFixed(2);

  const removeSelectedItems = () => {
    setCartItems(cartItems.filter((item) => !item.selected));
  };

  const addPurchasedItems = (items) => {
    if (isAuthenticated) {
      setPurchasedItems([...purchasedItems, ...items]);
    }
  };

  const removePurchasedItem = (id) => {
    setPurchasedItems(purchasedItems.filter((item) => item._id !== id));
  };

  const clearPurchaseHistory = () => {
    setPurchasedItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleSelect,
        clearCart,
        getCartCount,
        getCartSubTotal,
        getSelectedSubTotal,
        removeSelectedItems,
        isInCart,
        addPurchasedItems,
        purchasedItems,
        removePurchasedItem,
        clearPurchaseHistory,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
