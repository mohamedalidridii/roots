"use client";
import { useEffect, useState } from "react";

import useCartStore from "@/store/useCartStore";

export function StoreProvider({ children }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return <>{isHydrated ? children : null}</>;
}

export function useHydratedStore(selector, equalityFn) {
  const [isHydrated, setIsHydrated] = useState(false);
  const store = useCartStore(selector, equalityFn);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated
    ? store
    : typeof selector === "function"
    ? selector(useCartStore.getState())
    : {};
}
