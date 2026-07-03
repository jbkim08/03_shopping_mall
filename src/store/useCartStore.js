import { create } from "zustand";
//주스탠드 공유주머니
const useCartStore = create((set) => ({
  cart: [], //장바구니
  addToCart: (product) =>
    set((state) => {
      const isExist = state.cart.find((item) => item.id === product.id);
      if (isExist) {
        //이미 장바구니에 있는 상품일 경우에 qantity + 1
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return {
        //새 상품일 경우에 수량을 1로 한다
        cart: [...state.cart, { ...product, quantity: 1 }],
      };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
