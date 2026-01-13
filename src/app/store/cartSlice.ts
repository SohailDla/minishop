import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: Record<number, CartItem>;
};

const initialState: CartState = { items: {} };

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
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;

// selector (later voegen we subtotal ook toe)
export const selectTotalItems = (state: RootState) =>
  Object.values(state.cart.items).reduce((s, i) => s + i.quantity, 0);
