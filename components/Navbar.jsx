import React, { useEffect } from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

function Navbar() {
  const {
    showCart,
    setShowCart,
    totalQuantities,
    cartItems,
    setCartItems,
    setTotalQuantities,
    setTotalPrice,
  } = useStateContext();

  useEffect(() => {
    const localCartItem = JSON.parse(localStorage.getItem("cart_items") || "[]");
    console.log(localCartItem);
    if (localCartItem != null) {
      setCartItems(localCartItem);
      localCartItem.map((item) => {
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + item.quantity);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + item.price * item.quantity);
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Kevin &apos;s Store</Link>
      </p>

      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
}

export default Navbar;
