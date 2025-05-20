import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      isCartOpen: false,

      setIsCartOpen: (value) => set({ isCartOpen: value }),

      addToCart: (product) => {
        const { cartItems } = get();
        const existingItem = cartItems.find((item) => item.id === product.id);

        if (existingItem) {
          const updatedItems = cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          set({ cartItems: updatedItems });
        } else {
          set({ cartItems: [...cartItems, { ...product, quantity: 1 }] });
        }
      },

      removeFromCart: (productId) => {
        const { cartItems } = get();
        set({ cartItems: cartItems.filter((item) => item.id !== productId) });
      },

      clearCart: () => set({ cartItems: [] }),

      openCart: () => set({ isCartOpen: true }),

      closeCart: () => {},

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      getCartTotal: () => {
        const { cartItems } = get();
        return cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getCartCount: () => {
        const { cartItems } = get();
        return cartItems.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "format-archive-cart",
      getStorage: () =>
        typeof window !== "undefined" ? window.localStorage : null,
      skipHydration: true,
    }
  )
);

export default useCartStore;
