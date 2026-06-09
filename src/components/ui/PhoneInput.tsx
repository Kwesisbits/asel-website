import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { countries } from "../../data/countries";

interface PhoneInputProps {
  value?: string;
  onChange: (value: string) => void;
  name?: string;
}

const DEFAULT_ISO = "GH";
const defaultCountry = countries.find((c) => c.iso === DEFAULT_ISO) ?? countries[0];

export function PhoneInput({ value = "", onChange, name }: PhoneInputProps) {
  const [selected, setSelected] = useState(defaultCountry);
  const [number, setNumber] = useState("");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.iso.toLowerCase().includes(search.toLowerCase()) ||
      c.dial.includes(search),
  );

  // Sync combined value upward
  useEffect(() => {
    onChange(number ? `${selected.dial} ${number}` : "");
  }, [selected, number, onChange]);

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
    <div ref={containerRef} className="relative flex gap-2">
      {/* Hidden input for react-hook-form name binding */}
      <input type="hidden" name={name} value={number ? `${selected.dial} ${number}` : value} />

      {/* Country code button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex shrink-0 items-center gap-1.5 rounded-lg border border-asel-navy/15 bg-asel-off-white px-3 py-3 text-sm font-bold text-asel-navy transition hover:border-asel-yellow focus:outline-none focus:ring-2 focus:ring-asel-yellow"
        aria-label="Select country code"
      >
        <span className="text-base leading-none">{selected.flag}</span>
        <span className="font-mono">{selected.dial}</span>
        <ChevronDown size={14} className={`transition ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Number input */}
      <input
        type="tel"
        placeholder="Phone number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        className="min-w-0 flex-1 rounded-lg border border-asel-navy/15 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-asel-yellow"
      />

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-72 overflow-hidden rounded-xl border border-asel-navy/10 bg-white shadow-2xl">
          <div className="border-b border-asel-navy/10 p-2">
            <div className="flex items-center gap-2 rounded-lg bg-asel-off-white px-3 py-2 text-sm text-asel-mid-gray">
              <Search size={14} />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search country or code…"
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
                      setSelected(country);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition hover:bg-asel-off-white ${
                      selected.iso === country.iso ? "bg-asel-yellow/10 font-bold" : ""
                    }`}
                  >
                    <span className="text-base">{country.flag}</span>
                    <span className="flex-1 truncate">{country.name}</span>
                    <span className="font-mono text-asel-mid-gray">{country.dial}</span>
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
