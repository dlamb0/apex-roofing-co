"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { NAV_ITEMS, COMPANY } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Reset menus when the route changes — adjusted during render per React 19 guidance
  // (https://react.dev/reference/react/useState#storing-information-from-previous-renders).
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setActiveDropdown(null);
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";

  return (
    <>
      {/* Top bar */}
      <div className="bg-brand-charcoal text-white py-2 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <span className="text-gray-400">{COMPANY.serviceRadius} · {COMPANY.license} · {COMPANY.insurance}</span>
          <a href={`tel:${COMPANY.phone.replace(/\D/g, "")}`} className="flex items-center gap-2 hover:text-brand-orange transition-colors font-semibold">
            <Phone size={14} />
            {COMPANY.phone}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled || !isHome
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Logo
                size="md"
                variant={isScrolled || !isHome ? "full" : "white"}
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="relative">
                  {item.children ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button
                        className={cn(
                          "flex items-center gap-1 px-4 py-2 rounded-md text-sm font-semibold transition-colors",
                          isScrolled || !isHome
                            ? "text-brand-charcoal hover:text-brand-orange hover:bg-gray-50"
                            : "text-white hover:text-brand-orange hover:bg-white/10"
                        )}
                      >
                        {item.label}
                        <ChevronDown size={14} className={cn("transition-transform", activeDropdown === item.label && "rotate-180")} />
                      </button>
                      {activeDropdown === item.label && (
                        // Outer wrapper uses pt-1 (padding) instead of mt-1 (margin)
                        // so the 4px gap between the trigger and the panel is part of
                        // the wrapper's hit area. Without this, the parent's
                        // onMouseLeave fires the moment the cursor crosses the gap
                        // and the dropdown unmounts before the user can click anything.
                        <div className="absolute top-full left-0 pt-1 w-52 z-50">
                          <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="block px-4 py-2.5 text-sm text-brand-charcoal hover:text-brand-orange hover:bg-brand-cream transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "px-4 py-2 rounded-md text-sm font-semibold transition-colors",
                        pathname === item.href
                          ? "text-brand-orange"
                          : isScrolled || !isHome
                          ? "text-brand-charcoal hover:text-brand-orange hover:bg-gray-50"
                          : "text-white hover:text-brand-orange hover:bg-white/10"
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={`tel:${COMPANY.phone.replace(/\D/g, "")}`}
                className={cn(
                  "text-sm font-semibold transition-colors flex items-center gap-1.5",
                  isScrolled || !isHome ? "text-brand-charcoal hover:text-brand-orange" : "text-white hover:text-brand-orange"
                )}
              >
                <Phone size={15} />
                {COMPANY.phone}
              </a>
              <Button href="/quote" size="sm">
                Free Estimate
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "md:hidden p-2 rounded-md transition-colors",
                isScrolled || !isHome ? "text-brand-charcoal hover:bg-gray-100" : "text-white hover:bg-white/10"
              )}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-brand-charcoal/95 backdrop-blur-sm pt-20 pb-8 overflow-y-auto">
          <div className="px-6 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                      className="w-full flex items-center justify-between py-3 text-white font-semibold text-lg border-b border-white/10"
                    >
                      {item.label}
                      <ChevronDown size={18} className={cn("transition-transform", activeDropdown === item.label && "rotate-180")} />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="pl-4 py-2 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block py-2.5 text-gray-300 hover:text-brand-orange transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-3 text-white font-semibold text-lg border-b border-white/10 hover:text-brand-orange transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-6 space-y-4">
              <a
                href={`tel:${COMPANY.phone.replace(/\D/g, "")}`}
                className="flex items-center gap-3 text-white text-lg font-semibold"
              >
                <Phone size={20} className="text-brand-orange" />
                {COMPANY.phone}
              </a>
              <Button href="/quote" size="lg" className="w-full justify-center">
                Get Free Estimate
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
