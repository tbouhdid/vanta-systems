"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { navigation } from "@/data/navigation";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
  <>
    <div className="fixed top-20 left-4 z-[9999] bg-red-500 p-2 text-white">
      TEST
    </div>
      {/* Bottone hamburger */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-full flex-col px-8 py-8">

              {/* Header */}
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="text-xl font-black tracking-[0.35em]"
                >
                  VANTA
                </Link>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Menu */}
              <nav className="mt-20 flex flex-col gap-8">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.05,
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="text-3xl font-semibold tracking-tight text-zinc-200 transition hover:text-white"
                    >
                      {item.label}
                    </a>
                  </motion.div>
                ))}
              </nav>

              {/* CTA */}
              <div className="mt-auto">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                >
                  <Button
                    size="lg"
                    className="w-full rounded-full"
                  >
                    Richiedi consulenza
                  </Button>
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}