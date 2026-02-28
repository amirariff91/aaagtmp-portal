"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Feed" },
  { href: "/review", label: "Review" },
  { href: "/audit", label: "Audit" },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs tracking-[0.22em] text-teal-400">AURION</p>
          <h1 className="text-sm font-semibold text-slate-100 sm:text-base">AAAGTMP</h1>
        </div>
        <nav className="flex items-center gap-4 text-sm text-slate-300">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-2 py-1 transition hover:bg-slate-800 hover:text-white ${
                pathname === link.href
                  ? "text-teal-300 bg-slate-800"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
