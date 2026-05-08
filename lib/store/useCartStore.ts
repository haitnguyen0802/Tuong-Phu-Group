"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartItem } from "@/types";

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  hydrated: boolean;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  markHydrated: () => void;
};

function clampQty(qty: number, max: number) {
  if (qty < 1) return 1;
  if (qty > max) return max;
  return qty;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      hydrated: false,
      addItem: (item, quantity = 1) =>
        set((state) => {
          const idx = state.items.findIndex((cartItem) => cartItem.productId === item.productId);
          if (idx === -1) {
            const safeQty = clampQty(quantity, item.stock);
            return {
              items: [...state.items, { ...item, quantity: safeQty }],
              isOpen: true,
            };
          }

          const next = [...state.items];
          const current = next[idx];
          next[idx] = {
            ...current,
            quantity: clampQty(current.quantity + quantity, current.stock),
          };
          return { items: next, isOpen: true };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
      updateQty: (productId, quantity) =>
        set((state) => {
          const next = state.items
            .map((item) => {
              if (item.productId !== productId) return item;
              if (quantity < 1) return null;
              return { ...item, quantity: clampQty(quantity, item.stock) };
            })
            .filter((item): item is CartItem => item !== null);
          return { items: next };
        }),
      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      markHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "verdara-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
      },
    },
  ),
);

export const useCartCount = () =>
  useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );
