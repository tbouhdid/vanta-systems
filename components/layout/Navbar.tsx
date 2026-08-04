"use client";

import { Button } from "@/components/ui/button";

const navigation = [
  { label: "Servizi", href: "#services" },
  { label: "Progetti", href: "#projects" },
  { label: "Chi siamo", href: "#about" },
  { label: "Contatti", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-5 flex max-w-7xl items-center justify-between rounded-2xl border border-border/70 bg-background/70 px-6 py-4 backdrop-blur-xl">
        <a href="/" className="text-xl font-black tracking-[0.35em]">
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
      </div>
    </header>
  );
}