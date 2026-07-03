import { create } from "zustand";
//주스탠드 공유주머니
const useCartStore = create((set) => ({
  cart: [], //장바구니
  addToCart: (product) =>
    set((state) => ({
      cart: [...state.cart, product],
    })),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
