import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePortfolio } from "../hooks/usePortfolio";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Navbar() {
  const { profile } = usePortfolio();
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  // ---------- active-section detection via IntersectionObserver ----------
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLinkClick = useCallback(() => {
    setMobileOpen(false);
  }, []);

  // ---- link classes helper ----
  const linkClasses = (section: string) =>
    `uppercase tracking-wider text-sm font-medium transition-colors duration-200 ${
      activeSection === section
        ? "text-text-primary"
        : "text-text-muted hover:text-text-primary"
    }`;

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-bg/80 backdrop-blur-xl border-b border-border/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* ---- brand ---- */}
          <a href="#home" className="hero-heading text-xl font-display font-bold select-none">
            {profile.shortName}
          </a>

          {/* ---- desktop links ---- */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className={linkClasses(href.slice(1))}>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* ---- mobile hamburger ---- */}
          <button
            type="button"
            className="md:hidden text-text-primary p-2 -mr-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* ---- mobile drawer ---- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-bg/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* panel */}
            <motion.div
              key="panel"
              className="fixed top-0 right-0 z-40 h-full w-3/4 max-w-xs bg-bg-card border-l border-border md:hidden flex flex-col pt-24 px-8 gap-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={handleLinkClick}
                  className={linkClasses(href.slice(1)) + " text-lg"}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  {label}
                </motion.a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
