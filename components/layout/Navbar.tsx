"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import MobileMenu from "@/components/navigation/MobileMenu";
import { navigation } from "@/data/navigation";

export default function Navbar() {
  return (
    <header className="relative z-50 border-b border-white/[0.07] bg-[#0b0c0d]">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          href="/#home"
          aria-label="Vanta Systems - home"
          className="flex flex-col leading-none"
        >
          <span className="text-[17px] font-bold tracking-[0.38em] text-white sm:text-[18px]">
            VANTA
          </span>
          <span className="mt-1 text-[7px] font-semibold tracking-[0.46em] text-zinc-300">
            SYSTEMS
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[13px] text-zinc-300 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <>
          <Link
            href="/contact"
            className="hidden h-9 items-center gap-2 rounded-md border border-white/25 px-3.5 text-[11px] font-medium text-white transition hover:border-white/60 hover:bg-white/5 lg:inline-flex"
          >
            Richiedi una consulenza
            <ArrowUpRight className="size-3.5" />
          </Link>

          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </>
      </div>
    </header>
  );
}
