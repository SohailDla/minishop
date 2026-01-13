import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: Record<number, CartItem>;
};

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ id: number; title: string; price: number }>) {
      const p = action.payload;
      const existing = state.items[p.id];
      if (existing) existing.quantity += 1;
      else state.items[p.id] = { ...p, quantity: 1 };
    },
    increment(state, action: PayloadAction<number>) {
      const item = state.items[action.payload];
      if (item) item.quantity += 1;
    },
    decrement(state, action: PayloadAction<number>) {
      const item = state.items[action.payload];
      if (!item) return;
      item.quantity -= 1;
      if (item.quantity <= 0) delete state.items[action.payload];
    },
    removeItem(state, action: PayloadAction<number>) {
      delete state.items[action.payload];
    },
  },
});

export const { addToCart, increment, decrement, removeItem } = cartSlice.actions;
export default cartSlice.reducer;

/* ===== REQUIRED SELECTORS ===== */

export const selectCartItems = (state: RootState) =>
  Object.values(state.cart.items);

export const selectTotalItems = (state: RootState) =>
  Object.values(state.cart.items).reduce((s, i) => s + i.quantity, 0);

export const selectSubtotal = (state: RootState) =>
  Object.values(state.cart.items).reduce((s, i) => s + i.price * i.quantity, 0);
