"use client";

import MobileMenu from "@/components/navigation/MobileMenu";
import { Button } from "@/components/ui/button";
import { navigation } from "@/data/navigation";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className="
        mx-auto
        mt-4
        flex
        max-w-7xl
        items-center
        justify-between
        rounded-2xl
        border
        border-border/70
        bg-background/70
        px-4
        py-3
        backdrop-blur-xl
        lg:px-6
        lg:py-4
    "
    >
        <a
            href="#"
            className="
            text-lg
            font-black
            tracking-[0.28em]
            lg:text-xl
            lg:tracking-[0.35em]
        "
        >
            VANTA
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

       <>
  {/* Desktop */}
  <a href="#cta" className="hidden md:block">
    <Button
      className="
        rounded-full
        px-6
        bg-zinc-100
        text-black
        hover:bg-white
      "
    >
      Richiedi consulenza
    </Button>
  </a>

    <MobileMenu />

</>
      </div>
    </header>
  );
}