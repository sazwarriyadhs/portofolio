'use client';

import { useState } from 'react';

const links = [
  ['Work', '#work'],
  ['AI', '#ai'],
  ['Architecture', '#architecture'],
  ['Technology', '#technology'],
  ['GitHub', '#github'],
  ['Opportunity', '/opportunity'],
  ['Contact', '#contact'],
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        {/* BRAND */}
        <a
          href="/"
          className="mono text-sm font-bold tracking-widest"
        >
          AZWAR<span className="text-sky-300">.</span>
        </a>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-2 md:flex">
          {links.map(([label, href]) => {
            const isOpportunity = label === 'Opportunity';

            return (
              <a
                key={href}
                href={href}
                className={
                  isOpportunity
                    ? 'rounded-full border border-sky-300/30 bg-sky-300/10 px-4 py-2 text-sm font-semibold text-sky-200 backdrop-blur-sm transition-all duration-300 hover:border-sky-300/60 hover:bg-sky-300/20 hover:text-white hover:shadow-[0_0_20px_rgba(125,211,252,0.12)]'
                    : 'rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/[0.07] hover:text-white'
                }
              >
                {label}
              </a>
            );
          })}
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-sm transition-all duration-300 hover:border-white/25 hover:bg-white/[0.07] md:hidden"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* MOBILE NAV */}
      {open && (
        <nav className="container grid gap-2 border-t border-white/10 py-5 md:hidden">
          {links.map(([label, href]) => {
            const isOpportunity = label === 'Opportunity';

            return (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={
                  isOpportunity
                    ? 'rounded-xl border border-sky-300/30 bg-sky-300/10 px-4 py-3 font-semibold text-sky-200 transition-all duration-300 hover:border-sky-300/50 hover:bg-sky-300/20 hover:text-white'
                    : 'rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-slate-300 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white'
                }
              >
                {label}
              </a>
            );
          })}
        </nav>
      )}
    </header>
  );
}