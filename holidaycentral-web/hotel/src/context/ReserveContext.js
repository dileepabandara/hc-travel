import React, { createContext, useState } from "react";

export const ReserveContext = createContext({
  cartItems: [],
  cartCount: 0,
  addToCart: () => {},
  removeItem: () => {},
  total: 0,
});

export const ReserveContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (item) => {
    const existItemIndex = cartItems.findIndex(
      (room) => room.title === item.title
    );
    if (existItemIndex !== -1) {
      const newCartItems = [...cartItems];
      newCartItems[existItemIndex] = {
        ...newCartItems[existItemIndex],
        qty: newCartItems[existItemIndex].qty + 1,
      };
      setCartItems(newCartItems);
    } else {
      setCartItems([...cartItems, { ...item, qty: 1 }]);
    }
    setCartCount(cartCount + 1);
  };

  const removeItem = (item) => {
    const updatedCartItems = cartItems.filter(
      (room) => room.title !== item.title
    );
    setCartItems(updatedCartItems);
    setCartCount(cartCount - item.qty);
  };

  const total = cartItems.reduce((a, c) => a + c.qty * c.price, 0);

  return (
    <ReserveContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeItem,
        total,
      }}
    >
      {children}
    </ReserveContext.Provider>
  );
};
