import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from "zustand/middleware"

import { ProductProps } from '@/utils/data/products';

import * as cartInMemory from "./helpers/cart-in-memory"

export type ProductCartProps = ProductProps & {
    quantity: number
}

type StateProps = {
    products: ProductCartProps[]
    add: (product: ProductProps) => void
    remove: (productID: string) => void
    clear: () => void
}

export const useCartStore = create(
    persist<StateProps>((set) => ({
    products: [],

    add: (product: ProductProps) => set((state) => ({
        products: cartInMemory.add(state.products, product),
    })),    

    remove: (productID: string) => set((state) => ({
        products: cartInMemory.remove(state.products, productID),
    })),

    clear: () => set(() => ({ products: [] })),

}), {
    name: "nlw-expert-rn:cart",
    storage: createJSONStorage(() => AsyncStorage)
}))