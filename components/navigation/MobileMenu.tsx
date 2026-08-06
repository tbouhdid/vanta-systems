"use client";

import { useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { Menu, X, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { navigation } from "@/data/navigation";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {open &&
        createPortal(
          <>
            {/* Overlay */}
            <div
              className="
                fixed
                inset-0
                z-[9998]
                bg-black/40
                backdrop-blur-2xl
                backdrop-saturate-150
                transition-all
              "
              onClick={() => setOpen(false)}
            />

            {/* Menu */}
            <div
              className="
                fixed
                inset-0
                z-[9999]
                flex
                flex-col
                px-8
                py-8
              "
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-8">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="
                    text-xl
                    font-black
                    tracking-[0.35em]
                    text-white
                  "
                >
                  VANTA
                </Link>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  className="rounded-full hover:bg-white/10"
                >
                  <X className="h-6 w-6 text-white" />
                </Button>
              </div>

              {/* Navigation */}
              <nav className="mt-20 flex flex-col gap-2">
                {navigation.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="
                      group
                      flex
                      items-center
                      justify-between
                      py-5
                      text-5xl
                      font-bold
                      tracking-tight
                      text-zinc-300
                      transition-all
                      duration-300
                      hover:translate-x-2
                      hover:text-white
                    "
                  >
                    {item.label}

                    <ArrowRight
                      className="
                        h-6
                        w-6
                        opacity-0
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                        group-hover:opacity-100
                      "
                    />
                  </a>
                ))}
              </nav>

              {/* Footer */}
              <div className="mt-auto pt-12">
                <div className="mb-6 h-px bg-white/10" />

                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                >
                  <Button
                    size="lg"
                    className="
                      h-14
                      w-full
                      rounded-full
                      text-base
                      font-semibold
                    "
                  >
                    Richiedi una consulenza
                  </Button>
                </Link>
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
}
