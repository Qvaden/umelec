"use client";

import Link from "next/link";
import { Check, X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getProductById } from "@/lib/products";
import { getCartKey } from "@/lib/cart";
import { cn } from "@/lib/utils";
import type { CartEntry, CartLine } from "@/types";

const CART_STORAGE_KEY = "umelec-demo-cart-v1";
const FAVORITES_STORAGE_KEY = "umelec-demo-favorites-v1";

interface ToastData {
  id: number;
  message: string;
  href?: string;
  linkLabel?: string;
}

interface NotifyOptions {
  href?: string;
  linkLabel?: string;
}

interface StoreContextValue {
  cart: CartLine[];
  cartEntries: CartEntry[];
  cartCount: number;
  cartSubtotal: number;
  favorites: string[];
  favoritesCount: number;
  hydrated: boolean;
  addToCart: (line: CartLine, productName: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeFromCart: (key: string) => void;
  clearCart: () => void;
  toggleFavorite: (productId: string, productName: string) => boolean;
  isFavorite: (productId: string) => boolean;
  notify: (message: string, options?: NotifyOptions) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

function readCart(raw: string | null): CartLine[] {
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item): item is CartLine => {
        if (!item || typeof item !== "object") return false;
        const line = item as Partial<CartLine>;
        return (
          typeof line.productId === "string" &&
          typeof line.quantity === "number" &&
          Number.isFinite(line.quantity)
        );
      })
      .filter((line) => Boolean(getProductById(line.productId)))
      .map((line) => ({
        productId: line.productId,
        quantity: Math.min(99, Math.max(1, Math.round(line.quantity))),
        variant: typeof line.variant === "string" && line.variant ? line.variant : undefined,
      }));
  } catch {
    return [];
  }
}

function readFavorites(raw: string | null): string[] {
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (id): id is string => typeof id === "string" && Boolean(getProductById(id)),
    );
  } catch {
    return [];
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastId = useRef(0);

  useEffect(() => {
    setCart(readCart(window.localStorage.getItem(CART_STORAGE_KEY)));
    setFavorites(readFavorites(window.localStorage.getItem(FAVORITES_STORAGE_KEY)));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites, hydrated]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const notify = useCallback((message: string, options?: NotifyOptions) => {
    toastId.current += 1;
    setToast({ id: toastId.current, message, ...options });

    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 4200);
  }, []);

  const addToCart = useCallback(
    (line: CartLine, productName: string) => {
      const key = getCartKey(line.productId, line.variant);
      const quantity = Math.min(99, Math.max(1, Math.round(line.quantity)));

      setCart((current) => {
        const existing = current.find(
          (item) => getCartKey(item.productId, item.variant) === key,
        );

        if (existing) {
          return current.map((item) =>
            getCartKey(item.productId, item.variant) === key
              ? { ...item, quantity: Math.min(99, item.quantity + quantity) }
              : item,
          );
        }

        return [...current, { ...line, quantity }];
      });

      notify(`«${productName}» добавлен в корзину`, {
        href: "/cart",
        linkLabel: "Перейти в корзину",
      });
    },
    [notify],
  );

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setCart((current) => {
      if (quantity <= 0) {
        return current.filter((item) => getCartKey(item.productId, item.variant) !== key);
      }

      return current.map((item) =>
        getCartKey(item.productId, item.variant) === key
          ? { ...item, quantity: Math.min(99, Math.round(quantity)) }
          : item,
      );
    });
  }, []);

  const removeFromCart = useCallback((key: string) => {
    setCart((current) =>
      current.filter((item) => getCartKey(item.productId, item.variant) !== key),
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const toggleFavorite = useCallback(
    (productId: string, productName: string) => {
      const willAdd = !favorites.includes(productId);

      setFavorites((current) =>
        current.includes(productId)
          ? current.filter((id) => id !== productId)
          : [...current, productId],
      );

      notify(
        willAdd
          ? `«${productName}» добавлен в избранное`
          : `«${productName}» удалён из избранного`,
        willAdd ? { href: "/favorites", linkLabel: "Открыть избранное" } : undefined,
      );

      return willAdd;
    },
    [favorites, notify],
  );

  const isFavorite = useCallback(
    (productId: string) => favorites.includes(productId),
    [favorites],
  );

  const cartEntries = useMemo<CartEntry[]>(
    () =>
      cart.flatMap((line) => {
        const product = getProductById(line.productId);
        if (!product) return [];
        return [
          {
            key: getCartKey(line.productId, line.variant),
            line,
            product,
          },
        ];
      }),
    [cart],
  );

  const cartCount = useMemo(
    () => cart.reduce((total, line) => total + line.quantity, 0),
    [cart],
  );

  const cartSubtotal = useMemo(
    () =>
      cartEntries.reduce(
        (total, entry) => total + (entry.product.price ?? 0) * entry.line.quantity,
        0,
      ),
    [cartEntries],
  );

  const value = useMemo<StoreContextValue>(
    () => ({
      cart,
      cartEntries,
      cartCount,
      cartSubtotal,
      favorites,
      favoritesCount: favorites.length,
      hydrated,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      toggleFavorite,
      isFavorite,
      notify,
    }),
    [
      cart,
      cartEntries,
      cartCount,
      cartSubtotal,
      favorites,
      hydrated,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      toggleFavorite,
      isFavorite,
      notify,
    ],
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className={cn(
          "pointer-events-none fixed inset-x-4 bottom-4 z-[110] flex justify-center sm:bottom-6",
          !toast && "sr-only",
        )}
      >
        {toast ? (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl border border-white/10 bg-foreground px-4 py-3.5 text-surface shadow-lift",
              "animate-toast-in",
            )}
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-white">
              <Check aria-hidden className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
            <div className="min-w-0 flex-1 text-sm leading-snug">
              <p>{toast.message}</p>
              {toast.href && toast.linkLabel ? (
                <Link
                  href={toast.href}
                  className="mt-1 inline-block text-xs font-semibold text-sand underline underline-offset-4 hover:text-white"
                >
                  {toast.linkLabel}
                </Link>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="-mr-1 -mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-surface/60 transition-colors hover:bg-white/10 hover:text-surface"
              aria-label="Закрыть уведомление"
            >
              <X aria-hidden className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>
    </StoreContext.Provider>
  );
}

export function useStore(): StoreContextValue {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
}
