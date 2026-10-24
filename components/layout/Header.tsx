"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Heart, Menu, Ruler, Search, ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HeaderDropdown, type MenuId } from "@/components/layout/HeaderDropdown";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { useStore } from "@/components/providers/StoreProvider";
import { buttonStyles } from "@/components/ui/Button";
import { mainNav } from "@/data/site";
import { cn } from "@/lib/utils";

function navLinkClass(active: boolean) {
  return cn(
    "rounded-full px-3 py-2 text-[0.8125rem] font-medium transition-colors",
    active ? "bg-foreground/[0.06] text-foreground" : "text-foreground/75 hover:text-foreground",
  );
}

function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span
      key={count}
      className="absolute -right-0.5 -top-0.5 flex h-[1.125rem] min-w-[1.125rem] animate-cart-pop items-center justify-center rounded-full bg-accent px-1 text-[0.625rem] font-bold leading-none text-white"
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const { cartCount, favoritesCount, hydrated } = useStore();
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!openMenu) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [openMenu]);

  useEffect(() => {
    if (!openMenu && !mobileOpen && !searchOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
        setSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openMenu, mobileOpen, searchOpen]);

  useEffect(() => {
    if (!mobileOpen && !searchOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen, searchOpen]);

  const openSearch = () => {
    setOpenMenu(null);
    setMobileOpen(false);
    setSearchOpen(true);
  };

  const toggleMenu = (id: MenuId) => {
    setOpenMenu((current) => (current === id ? null : id));
  };

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-50 border-b border-line/80 bg-background/92 shadow-header backdrop-blur-md supports-[backdrop-filter]:bg-background/80"
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 xl:h-20">
          <div className="flex min-w-0 items-center gap-5">
            <Logo className="min-h-11 shrink-0" />
            <nav aria-label="Основная навигация" className="hidden items-center gap-0.5 xl:flex">
              {mainNav.map((item) =>
                item.menu ? (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => toggleMenu(item.menu)}
                    aria-expanded={openMenu === item.menu}
                    aria-controls="header-dropdown"
                    className={cn(
                      navLinkClass(
                        openMenu === item.menu ||
                          (item.menu === "doors"
                            ? pathname.startsWith("/catalog/") &&
                                ["vhodnye-dveri", "mezhkomnatnye-dveri", "podezdnye-dveri"].includes(
                                  pathname.split("/")[2] ?? "",
                                )
                            : pathname.startsWith("/catalog")),
                      ),
                      "inline-flex items-center gap-1",
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden
                      className={cn(
                        "h-3.5 w-3.5 transition-transform",
                        openMenu === item.menu && "rotate-180",
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={navLinkClass(pathname === item.href)}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={openSearch}
              className="hidden h-11 w-11 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-foreground/[0.06] hover:text-foreground sm:flex"
              aria-label="Поиск по каталогу"
            >
              <Search aria-hidden className="h-[1.15rem] w-[1.15rem]" />
            </button>
            <Link
              href="/favorites"
              className="relative hidden h-11 w-11 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-foreground/[0.06] hover:text-foreground sm:flex"
              aria-label={
                hydrated && favoritesCount > 0
                  ? `Избранное, товаров: ${favoritesCount}`
                  : "Избранное"
              }
            >
              <Heart aria-hidden className="h-[1.15rem] w-[1.15rem]" />
              {hydrated ? <CountBadge count={favoritesCount} /> : null}
            </Link>
            <Link
              href="/cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
              aria-label={hydrated && cartCount > 0 ? `Корзина, товаров: ${cartCount}` : "Корзина"}
            >
              <ShoppingBag aria-hidden className="h-[1.15rem] w-[1.15rem]" />
              {hydrated ? <CountBadge count={cartCount} /> : null}
            </Link>
            <Link
              href="/services#request"
              className={buttonStyles({ size: "sm", className: "ml-1 hidden xl:inline-flex" })}
            >
              <Ruler aria-hidden className="h-4 w-4" />
              Заказать замер
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="ml-0.5 flex h-11 w-11 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-foreground/[0.06] hover:text-foreground xl:hidden"
              aria-label="Открыть меню"
              aria-expanded={mobileOpen}
            >
              <Menu aria-hidden className="h-5 w-5" />
            </button>
          </div>
        </div>

        {openMenu ? (
          <HeaderDropdown openMenu={openMenu} onClose={() => setOpenMenu(null)} />
        ) : null}
      </header>

      {searchOpen ? <SearchOverlay onClose={() => setSearchOpen(false)} /> : null}
      {mobileOpen ? (
        <MobileMenu
          onClose={() => setMobileOpen(false)}
          onSearch={openSearch}
          cartCount={hydrated ? cartCount : 0}
          favoritesCount={hydrated ? favoritesCount : 0}
        />
      ) : null}
    </>
  );
}
