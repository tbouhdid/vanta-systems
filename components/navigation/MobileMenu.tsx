"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

import { navigation } from "@/data/navigation";

const menuTransition = { duration: 0.24, ease: [0.22, 1, 0.36, 1] } as const;

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const restoreScrollRef = useRef(true);

  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const bodyOverflow = document.body.style.overflow;
    const bodyPosition = document.body.style.position;
    const bodyTop = document.body.style.top;
    const bodyWidth = document.body.style.width;
    const rootOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.documentElement.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 80);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = bodyOverflow;
      document.body.style.position = bodyPosition;
      document.body.style.top = bodyTop;
      document.body.style.width = bodyWidth;
      document.documentElement.style.overflow = rootOverflow;
      if (restoreScrollRef.current) {
        window.scrollTo(0, scrollY);
      }
    };
  }, [open]);

  function closeMenu(restoreScroll = true) {
    restoreScrollRef.current = restoreScroll;
    setOpen(false);
  }

  function openMenu() {
    restoreScrollRef.current = true;
    setIsRendered(true);
    setOpen(true);
  }

  return (
    <>
      <button
        type="button"
        aria-label="Apri il menu"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={openMenu}
        className="inline-flex size-9 items-center justify-center rounded-lg border border-white/[0.14] bg-white/[0.035] text-white transition duration-200 hover:border-[#8d939b] hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6d8dc] active:bg-white/[0.12]"
      >
        <Menu className="size-[18px]" strokeWidth={1.7} />
      </button>

      {isRendered &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence onExitComplete={() => setIsRendered(false)}>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={menuTransition}
                className="fixed inset-0 z-[9999] bg-black/72 p-0 backdrop-blur-md sm:p-3"
              >
                <motion.button
                  type="button"
                  aria-label="Chiudi menu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={menuTransition}
                  onClick={() => closeMenu()}
                  className="absolute inset-0 cursor-default"
                />

                <motion.section
                  id="mobile-navigation"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Navigazione mobile"
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={menuTransition}
                  className="relative flex h-full min-h-0 flex-col overflow-y-auto overscroll-contain border border-white/[0.11] bg-[radial-gradient(circle_at_84%_0%,rgba(214,216,220,0.13),transparent_30%),linear-gradient(145deg,#0d0e0f_0%,#060708_60%,#101112_100%)] px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-[calc(1.25rem+env(safe-area-inset-top))] shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:rounded-2xl sm:px-8 sm:py-7"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d6d8dc]/55 to-transparent" />

                  <header className="flex items-center justify-between border-b border-white/[0.09] pb-4">
                    <Link
                      href="/#home"
                      onClick={() => closeMenu(false)}
                      aria-label="Vanta Systems - home"
                      className="flex flex-col leading-none"
                    >
                      <span className="text-[16px] font-bold tracking-[0.36em] text-white">
                        VANTA
                      </span>
                      <span className="mt-1 text-[6px] font-semibold tracking-[0.46em] text-[#bfc3c9]">
                        SYSTEMS
                      </span>
                    </Link>

                    <button
                      ref={closeButtonRef}
                      type="button"
                      onClick={() => closeMenu()}
                      aria-label="Chiudi il menu"
                      className="inline-flex size-9 items-center justify-center rounded-lg border border-white/[0.14] bg-white/[0.04] text-white transition duration-200 hover:border-[#8d939b] hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6d8dc] active:bg-white/[0.14]"
                    >
                      <X className="size-[18px]" strokeWidth={1.7} />
                    </button>
                  </header>

                  <motion.nav
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={{
                      open: { transition: { staggerChildren: 0.045, delayChildren: 0.08 } },
                      closed: { transition: { staggerChildren: 0.025, staggerDirection: -1 } },
                    }}
                    className="my-auto py-5"
                  >
                    {navigation.map((item) => (
                      <motion.div
                        key={item.label}
                        variants={{
                          open: { opacity: 1, y: 0 },
                          closed: { opacity: 0, y: 8 },
                        }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => closeMenu(false)}
                          className="group flex min-h-14 items-center justify-between border-b border-white/[0.085] py-2 text-[clamp(2rem,9vw,2.5rem)] font-semibold leading-none tracking-[-0.055em] text-white transition duration-200 first:border-t hover:bg-white/[0.035] hover:pl-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#d6d8dc] active:bg-white/[0.07] active:pl-2"
                        >
                          <span>{item.label}</span>
                          <span className="flex size-8 items-center justify-center rounded-full border border-white/[0.12] text-[#bfc3c9] transition duration-200 group-hover:border-[#d6d8dc]/75 group-hover:bg-white/[0.08] group-hover:text-white group-active:bg-white/[0.12]">
                            <ArrowRight className="size-3.5" strokeWidth={1.7} />
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.nav>

                  <footer className="border-t border-white/[0.09] pt-4">
                    <Link
                      href="/contact"
                      onClick={() => closeMenu(false)}
                      className="flex h-12 w-full items-center justify-between rounded-xl border border-white/45 bg-[linear-gradient(135deg,#eef0f1_0%,#bfc3c9_52%,#8d939b_100%)] px-4 text-[12px] font-semibold text-[#111213] shadow-[0_12px_28px_rgba(0,0,0,0.2)] transition duration-200 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0c0d] active:brightness-95"
                    >
                      Richiedi una consulenza
                      <ArrowRight className="size-4" strokeWidth={1.8} />
                    </Link>
                    <p className="mt-4 text-center text-[9px] font-medium uppercase tracking-[0.16em] text-[#8d939b]">
                      Software Engineering <span className="px-1.5 text-[#d6d8dc]">•</span> AI <span className="px-1.5 text-[#d6d8dc]">•</span> Automation
                    </p>
                  </footer>
                </motion.section>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
