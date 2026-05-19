import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "../ui/Button";

interface NavbarProps {
  onPartnerClick: () => void;
}

const navLink = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-bold transition hover:text-asel-yellow ${isActive ? "text-asel-yellow" : "text-white"}`;

export function Navbar({ onPartnerClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition ${scrolled || mobileOpen ? "bg-asel-navy shadow-lg" : "bg-asel-navy/25 backdrop-blur-sm"}`}>
      <nav className="container-shell flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <img src="/logo.jpg" alt="ASEL Africa" className="h-12 w-12 rounded-full bg-white object-contain p-1" />
          <span className="font-display text-lg font-extrabold text-white">ASEL Africa</span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <Dropdown label="What We Do" items={[["Our Approach", "/what-we-do"], ["Impact & Vision", "/what-we-do"], ["Sustainability Focus", "/what-we-do"]]} />
          <NavLink to="/programs" className={navLink}>Our Programs</NavLink>
          <Dropdown label="About Us" items={[["Our Story", "/about"], ["Meet the Team", "/about"], ["Core Values", "/about"]]} />
          <NavLink to="/contact" className={navLink}>Contact Us</NavLink>
        </div>

        <div className="hidden lg:block">
          <Button onClick={onPartnerClick}>Partner With Us</Button>
        </div>

        <button className="rounded-full p-2 text-white lg:hidden" onClick={() => setMobileOpen((open) => !open)} aria-label="Open menu">
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {mobileOpen ? (
        <div className="container-shell grid gap-5 pb-8 lg:hidden">
          {[["What We Do", "/what-we-do"], ["Our Programs", "/programs"], ["About Us", "/about"], ["Contact Us", "/contact"]].map(([label, href]) => (
            <Link key={label} to={href} onClick={() => setMobileOpen(false)} className="rounded-xl bg-white/10 px-4 py-3 font-bold text-white">
              {label}
            </Link>
          ))}
          <Button onClick={() => { setMobileOpen(false); onPartnerClick(); }}>Partner With Us</Button>
        </div>
      ) : null}
    </header>
  );
}

function Dropdown({ label, items }: { label: string; items: [string, string][] }) {
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 text-sm font-bold text-white transition hover:text-asel-yellow">
        {label} <ChevronDown size={15} />
      </button>
      <div className="invisible absolute left-0 top-full w-64 translate-y-3 rounded-xl border border-white/10 bg-asel-navy p-3 opacity-0 shadow-2xl transition group-hover:visible group-hover:translate-y-2 group-hover:opacity-100">
        {items.map(([item, href]) => (
          <Link key={item} to={href} className="block rounded-lg px-4 py-3 text-sm font-semibold text-white/80 hover:bg-white/10 hover:text-asel-yellow">
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}
