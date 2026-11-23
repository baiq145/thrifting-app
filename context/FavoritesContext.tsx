import React, { createContext, useContext, useMemo, useState } from "react";
import type { ThriftProduct } from "@/types/product";

interface FavoritesContextValue {
  favoriteIds: string[];
  favoriteProducts: ThriftProduct[];
  toggleFavorite: (product: ThriftProduct) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteProducts, setFavoriteProducts] = useState<ThriftProduct[]>([]);

  function toggleFavorite(product: ThriftProduct): void {
    setFavoriteProducts((current) =>
      current.some((item) => item.id === product.id)
        ? current.filter((item) => item.id !== product.id)
        : [...current, product]
    );
  }

  const value = useMemo<FavoritesContextValue>(() => ({
    favoriteIds: favoriteProducts.map((product) => product.id),
    favoriteProducts,
    toggleFavorite,
    isFavorite: (id: string) => favoriteProducts.some((product) => product.id === id)
  }), [favoriteProducts]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites harus digunakan di dalam FavoritesProvider");
  return context;
}
