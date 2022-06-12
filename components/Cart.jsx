import React, { useRef } from "react";
import Link from "next/link";

import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";

import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";

import { loadStripe } from "@stripe/stripe-js";

function Cart() {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    removeCartItem,
  } = useStateContext();

  const handleCheckout = async () => {
    try {
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(cartItems),
      });

      const data = await response.json();

      toast.loading("Redirecting...");

      stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      res.status(err.statusCode || 500).json(err.message);
    }
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button type="button" className="cart-heading" onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>
        {/* IF CART IS EMPTY, SHOW CONTENT BELOW */}
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping cart is empty</h3>
            <Link href="/">
              <button type="button" onClick={() => setShowCart(false)} className="btn">
                Go Shopping
              </button>
            </Link>
          </div>
        )}
        {/* IF CART HAS AT LEAST 1 PRODUCT, SHOW CONTENT BELOW */}
        <div className="product-container">
          {/* LOOP THROUGH ALL THE CART ITEMS */}
          {cartItems.length >= 1 &&
            cartItems.map((cartItem, index) => (
              <div className="product" key={cartItem._id}>
                <img src={urlFor(cartItem?.image[0])} className="cart-product-image" />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{cartItem.name}</h5>
                    <h4>${cartItem.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      {/* PRODUCT QUANTITY */}
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() => decreaseCartItemQuantity(cartItem._id)}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{cartItem.quantity}</span>
                        <span
                          className="plus"
                          onClick={() => increaseCartItemQuantity(cartItem._id)}
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    {/* REMOVE PRODUCT */}
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => removeCartItem(cartItem._id)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* SUBTOTAL & TOTAL PRICE & PAY SECTION */}
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
