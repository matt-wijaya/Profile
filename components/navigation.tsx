"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, FolderGit2, Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { profile } from "@/data/profile";
import { isPlaceholderLink } from "@/lib/utils";

import { FragmentIndicator, TemporalStatus, useTemporal } from "./temporal-archive";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Records" },
  { href: "#others", label: "Others" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { activeSector } = useTemporal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const socials = useMemo(
    () => [
      { href: profile.github, label: "GitHub", icon: FolderGit2 },
      { href: profile.linkedin, label: "LinkedIn", icon: BriefcaseBusiness },
    ],
    [],
  );

  return (
    <header className="fixed left-1/2 top-4 z-[1000] w-[min(92vw,920px)] -translate-x-1/2 sm:top-6">
      <div
        className={`w-full transition duration-300 ${
          scrolled
            ? "ambient-panel px-4 py-3 backdrop-blur-md"
            : "border border-[rgba(158,116,72,0.2)] bg-[rgba(21,8,4,0.86)] px-3 py-2 backdrop-blur-sm"
        }`}
      >
        <div className={`mb-2 hidden items-center justify-between gap-4 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] lg:flex ${scrolled ? "opacity-100" : "opacity-80"}`}>
          <span className="mono-font shrink-0">Temporal Archive</span>
          <div className="flex min-w-0 items-center gap-4">
            <TemporalStatus routeLabel={isHomepage ? undefined : "PROJECT ARCHIVE"} />
            <FragmentIndicator />
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <Link href={isHomepage ? "#about" : "/"} className="group min-h-11 px-3 py-2">
            <span className="block text-sm font-semibold tracking-[0.02em] text-[#f0e3ca]">Matthew Wijaya</span>
          </Link>
          <nav className="hidden items-center gap-3 lg:flex" aria-label="Primary">
            {navItems.map((item) => {
              const isActive = isHomepage && activeSector === item.href.slice(1);
              const href = isHomepage ? item.href : `/${item.href}`;
              const className = `relative inline-flex min-h-11 items-center px-0 text-sm uppercase tracking-[0.18em] transition ${
                isActive
                  ? "text-[var(--text)]"
                  : "text-[var(--muted)] hover:text-[var(--text)]"
              }`;

              return (
                <Link
                  key={item.label}
                  href={href}
                  className={className}
                  aria-current={isActive ? "location" : undefined}
                >
                  {item.label}
                  {isActive ? <span className="absolute inset-x-0 bottom-2 h-px bg-[var(--accent)]" /> : null}
                </Link>
              );
            })}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            {socials.map(({ href, label, icon: Icon }) =>
              isPlaceholderLink(href) ? (
                <span
                  key={label}
                  className="inline-flex h-11 w-11 items-center justify-center border border-[rgba(128,101,74,0.28)] text-[var(--muted)]"
                  aria-label={`${label} placeholder`}
                >
                  <Icon className="h-4 w-4" />
                </span>
              ) : (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center border border-[rgba(128,101,74,0.28)] text-[var(--muted)] transition hover:border-[rgba(224,120,45,0.4)] hover:text-[var(--accent)]"
                  aria-label={label}
                  data-cursor-label="EXIT ARCHIVE ↗"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ),
            )}
          </div>
          <button
            type="button"
            className="console-button inline-flex h-11 w-11 items-center justify-center border-[rgba(128,101,74,0.28)] bg-[linear-gradient(180deg,rgba(53,40,28,0.96),rgba(30,22,16,0.96))] text-[var(--text)] lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between gap-3 border-t border-[rgba(224,120,45,0.12)] pt-2 text-[9px] uppercase tracking-[0.12em] text-[var(--muted)] lg:hidden">
          <TemporalStatus routeLabel={isHomepage ? undefined : "PROJECT ARCHIVE"} />
          <FragmentIndicator />
        </div>
        {open ? (
          <div className="mt-3 space-y-2 border-t border-[rgba(224,120,45,0.16)] pt-3 lg:hidden">
            <div className="flex items-center justify-between px-1 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
              <span className="mono-font">Terminal M-01</span>
            </div>
            <nav className="grid gap-1" aria-label="Mobile">
              {navItems.map((item) => {
                const isActive = isHomepage && activeSector === item.href.slice(1);
                const href = isHomepage ? item.href : `/${item.href}`;

                return (
                  <Link
                    key={item.label}
                    href={href}
                    className={`relative border border-[rgba(128,101,74,0.26)] px-4 py-3 transition hover:border-[rgba(224,120,45,0.36)] hover:text-[var(--text)] ${
                      isActive ? "text-[var(--text)]" : "text-[var(--muted)]"
                    }`}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "location" : undefined}
                  >
                    {item.label}
                    {isActive ? <span className="absolute inset-x-4 bottom-2 h-px bg-[var(--accent)]" /> : null}
                  </Link>
                );
              })}
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
