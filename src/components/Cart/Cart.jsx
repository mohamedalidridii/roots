"use client";
import "./Cart.css";
import { useRef, useEffect } from "react";
import Link from "next/link";

import useCartStore from "@/store/useCartStore";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", ".15, 1, .25, 1");

const Cart = () => {
  const cartRef = useRef(null);
  const overlayRef = useRef(null);

  const cartItems = useCartStore((state) => state.cartItems);
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const getCartTotal = useCartStore((state) => state.getCartTotal);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(e.target) &&
        isCartOpen
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isCartOpen]);

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsCartOpen(false);
      },
    });

    tl.to(cartRef.current, {
      x: "100%",
      duration: 1,
      ease: "hop",
      pointerEvents: "none",
    });
  };

  useGSAP(() => {
    if (isCartOpen) {
      gsap.to(cartRef.current, {
        x: "0%",
        duration: 1,
        ease: "hop",
        pointerEvents: "all",
      });
    }
  }, [isCartOpen]);

  const subtotal = getCartTotal();

  return (
    <>
      <div className="cart-overlay" ref={overlayRef} />
      <div className="cart-sidebar" ref={cartRef}>
        <div className="cart-nav">
          <div className="revealer">
            <p>Bag</p>
          </div>
          <div
            className="revealer"
            id="close-cart-sidebar"
            onClick={handleClose}
          >
            <p>Close</p>
          </div>
        </div>
        <div className="cart-items" data-lenis-prevent={true}>
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your bag is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-img">
                  <img
                    src={`/product_images/${item.previewImg}`}
                    alt={item.name}
                  />
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-info-row">
                    <div className="revealer cart-item-product-name">
                      <p>{item.name}</p>
                    </div>
                    <div className="revealer cart-item-product-price">
                      <p>${item.price}</p>
                    </div>
                  </div>
                  <div className="cart-item-info-row">
                    <div
                      className="revealer cart-item-remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <p>Remove</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-summary">
            <div className="cart-summary-row">
              <div className="revealer">
                <p>Shipping</p>
              </div>
              <div className="revealer">
                <p>At Checkout</p>
              </div>
            </div>
            <div className="cart-summary-row">
              <div className="revealer">
                <p>Subtotal</p>
              </div>
              <div className="revealer">
                <p>${subtotal}</p>
              </div>
            </div>
            <div className="cart-summary-row">
              <Link href="https://stripe.com/" target="_blank">
                <div className="checkout-btn">
                  <div className="revealer">
                    <p>Checkout</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
