import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "../ui/Button";

interface NavbarProps {
  onPartnerClick: () => void;
}

const navLink = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-bold transition hover:text-asel-yellow touch-manipulation ${isActive ? "text-asel-yellow" : "text-white"}`;

export function Navbar({ onPartnerClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const transparent = isHome && !scrolled && !mobileOpen;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${transparent ? "bg-asel-navy/25 backdrop-blur-sm" : "bg-asel-navy shadow-lg"}`}>
      <nav className="container-shell flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 touch-manipulation" onClick={() => setMobileOpen(false)}>
          <img
            src="/logo.png"
            alt="ASEL Africa"
            className="h-16 w-auto drop-shadow-sm"
          />
          <span className="font-display text-lg font-extrabold text-white">ASEL Africa</span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <Dropdown
            label="What We Do"
            items={[
              ["Our Approach", "/what-we-do"],
              ["Impact & Vision", "/what-we-do"],
              ["Sustainability Focus", "/what-we-do"],
            ]}
          />
          <NavLink to="/programs" className={navLink}>Our Programs</NavLink>
          <Dropdown
            label="About Us"
            items={[
              ["Our Story", "/about"],
              ["Meet the Team", "/about#meet-the-team"],
              ["Core Values", "/about"],
            ]}
          />
          <NavLink to="/contact" className={navLink}>Contact Us</NavLink>
        </div>

        <div className="hidden lg:block">
          <Button onClick={onPartnerClick}>Partner With Us</Button>
        </div>

        <button
          className="rounded-full p-2 text-white touch-manipulation lg:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Open menu"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {mobileOpen ? (
        <div className="container-shell grid gap-3 pb-8 lg:hidden">
          {[
            ["What We Do", "/what-we-do"],
            ["Our Programs", "/programs"],
            ["About Us", "/about"],
            ["Meet the Team", "/about#meet-the-team"],
            ["Contact Us", "/contact"],
          ].map(([label, href]) => (
            <Link
              key={label}
              to={href}
              onClick={() => setMobileOpen(false)}
              className="rounded-xl bg-white/10 px-4 py-3 font-bold text-white touch-manipulation transition hover:bg-white/20"
            >
              {label}
            </Link>
          ))}
          <Button
            className="touch-manipulation"
            onClick={() => {
              setMobileOpen(false);
              onPartnerClick();
            }}
          >
            Partner With Us
          </Button>
        </div>
      ) : null}
    </header>
  );
}

function Dropdown({ label, items }: { label: string; items: [string, string][] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking/tapping outside
  useEffect(() => {
    function handleOutside(e: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        className="flex items-center gap-1 text-sm font-bold text-white transition hover:text-asel-yellow touch-manipulation"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {label} <ChevronDown size={15} className={`transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-xl border border-white/10 bg-asel-navy p-3 shadow-2xl">
          {items.map(([item, href]) => (
            <Link
              key={item}
              to={href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-3 text-sm font-semibold text-white/80 touch-manipulation hover:bg-white/10 hover:text-asel-yellow"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
