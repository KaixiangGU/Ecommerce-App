import react, { createContext, useContext, useState, useEffect } from "react";
import toast, { Toast } from "react-hot-toast";

const Context = createContext();
export const useStateContext = () => useContext(Context);

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, settotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  //add to shopping cart
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((cartItem) => cartItem._id === product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    settotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === product.id)
          return {
            ...cartItem,
            quantity: cartItem.quantity + quantity,
          };
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart`);
  };

  //increase quantity
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  //decrease quantity
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};
