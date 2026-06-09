import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { countries } from "../../data/countries";

interface CountrySelectProps {
  value?: string;
  onChange: (value: string) => void;
  name?: string;
  placeholder?: string;
}

export function CountrySelect({ value = "", onChange, name, placeholder = "Select country" }: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = countries.find((c) => c.name === value) ?? null;

  const filtered = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.iso.toLowerCase().includes(search.toLowerCase()),
  );

  // Close on outside click
  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  // Focus search when opening
  useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 50);
    } else {
      setSearch("");
    }
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <input type="hidden" name={name} value={value} />

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between gap-2 rounded-lg border border-asel-navy/15 px-4 py-3 text-left text-sm transition hover:border-asel-yellow focus:outline-none focus:ring-2 focus:ring-asel-yellow ${
          selected ? "text-asel-navy" : "text-asel-mid-gray"
        }`}
      >
        <span className="flex items-center gap-2">
          {selected && <span className="text-base leading-none">{selected.flag}</span>}
          <span>{selected ? selected.name : placeholder}</span>
        </span>
        <ChevronDown size={14} className={`shrink-0 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full min-w-[240px] overflow-hidden rounded-xl border border-asel-navy/10 bg-white shadow-2xl">
          <div className="border-b border-asel-navy/10 p-2">
            <div className="flex items-center gap-2 rounded-lg bg-asel-off-white px-3 py-2 text-sm text-asel-mid-gray">
              <Search size={14} />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search country…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-asel-mid-gray"
              />
            </div>
          </div>
          <ul className="max-h-56 overflow-y-auto">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-asel-mid-gray">No results</li>
            ) : (
              filtered.map((country) => (
                <li key={country.iso}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(country.name);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition hover:bg-asel-off-white ${
                      value === country.name ? "bg-asel-yellow/10 font-bold" : ""
                    }`}
                  >
                    <span className="text-base">{country.flag}</span>
                    <span className="flex-1">{country.name}</span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
