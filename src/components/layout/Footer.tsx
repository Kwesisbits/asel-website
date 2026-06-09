import { Link } from "react-router-dom";
import { Globe2, Mail, Send, UsersRound } from "lucide-react";
import { Button } from "../ui/Button";

export function Footer() {
  return (
    <footer className="bg-asel-navy text-white">
      <div className="container-shell grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <img
            src="/logo.png"
            alt="ASEL Africa logo"
            className="h-20 w-auto"
          />
          <p className="mt-4 max-w-sm text-white/75">Powering Africa's energy future, one skilled practitioner at a time.</p>
          <div className="mt-5 flex gap-3">
            {[Globe2, UsersRound, Mail].map((Icon, index) => (
              <span key={index} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-asel-yellow">
                <Icon size={18} />
              </span>
            ))}
          </div>
        </div>
        <FooterColumn title="Programs" links={[["Technical Trainings", "/programs"], ["Digital Skills", "/programs"], ["Venture Support", "/programs"], ["Advisory", "/what-we-do"]]} />
        <FooterColumn title="Company" links={[["About", "/about"], ["What We Do", "/what-we-do"], ["Contact", "/contact"], ["Partner", "/contact"]]} />
        <div>
          <h3 className="font-display text-lg font-bold">Newsletter</h3>
          <p className="mt-3 text-sm text-white/70">Get cohort announcements and energy workforce insights.</p>
          <div className="mt-5 flex rounded-full bg-white p-1">
            <input aria-label="Email address" placeholder="Email address" className="min-w-0 flex-1 rounded-full px-4 text-asel-navy outline-none" />
            <Button className="px-4" aria-label="Subscribe"><Send size={16} /></Button>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-white/60">
        © 2026 ASEL Africa. Aligned with Ghana Energy Compact priorities for energy sector digitalization.
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h3 className="font-display text-lg font-bold">{title}</h3>
      <ul className="mt-4 grid gap-3 text-sm text-white/70">
        {links.map(([label, href]) => (
          <li key={label}><Link className="hover:text-asel-yellow" to={href}>{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
