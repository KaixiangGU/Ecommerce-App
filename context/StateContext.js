import react, { createContext, useContext, useState, useEffect } from "react";
import toast, { Toast } from "react-hot-toast";

const Context = createContext();
export const useStateContext = () => useContext(Context);

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  //add to shopping cart
  const onAdd = (product, quantity) => {
    //check whether chosen product is in shopping cart
    const checkProductInCart = cartItems.find((cartItem) => cartItem._id === product._id);
    //update shopping cart total price
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);

    //update shopping cart total quantities
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === product._id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + quantity,
          };
        }
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to the cart`);
  };

  //increase quantity on shopping cart page
  const increaseCartItemQuantity = (id) => {
    const selectedItem = cartItems.find((cartItem) => cartItem._id === id);
    const newCartItems = cartItems.map((cartItem) =>
      cartItem._id === id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
    setCartItems([...newCartItems]);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + selectedItem.price);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
  };

  //decrease quantity on shopping cart page
  const decreaseCartItemQuantity = (id) => {
    const selectedItem = cartItems.find((cartItem) => cartItem._id === id);
    if (selectedItem.quantity > 1) {
      const newCartItems = cartItems.map((cartItem) =>
        cartItem._id === id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
      );
      setCartItems([...newCartItems]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice - selectedItem.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
    }
  };

  //remove cart item
  const removeCartItem = (id) => {
    const selectedItem = cartItems.find((cartItem) => cartItem._id === id);
    const newCartItems = cartItems.filter((cartItem) => cartItem._id !== id);
    setCartItems([...newCartItems]);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - selectedItem.quantity);
    setTotalPrice((prevTotalPrice) => prevTotalPrice - selectedItem.quantity * selectedItem.price);
  };

  //increase quantity on product details page
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  //decrease quantity on product details page
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
        increaseCartItemQuantity,
        decreaseCartItemQuantity,
        removeCartItem,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};
