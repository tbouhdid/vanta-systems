"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Cpu,
  Database,
  ShieldCheck,
  Workflow,
} from "lucide-react";

const HERO_IMAGE = "/images/hero-laptop.png?v=20260806-1541";

export default function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-[#0b0c0d]">
      <div className="pointer-events-none absolute inset-y-0 left-[46%] hidden w-[62%] lg:block">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="70vw"
          className="origin-right scale-[0.84] object-cover object-[54%_center] opacity-90"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0b0c0d_0%,rgba(11,12,13,0.98)_10%,rgba(11,12,13,0.58)_42%,rgba(11,12,13,0.04)_75%,#0b0c0d_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0b0c0d] to-transparent" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(214,216,220,0.075),transparent_30%)]" />

      <div className="relative mx-auto max-w-[1440px] px-5 pb-10 pt-16 sm:px-8 lg:px-12 lg:pb-11 lg:pt-[96px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="max-w-[625px]"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#bfc3c9]">
            Soluzioni digitali su misura
          </p>

          <h1 className="mt-5 max-w-[610px] font-heading text-[42px] font-medium leading-[1.06] tracking-[-0.045em] text-white sm:text-[54px] lg:text-[61px]">
            Software, siti web e
            <br />
            automazioni per far
            <br />
            crescere <span className="font-normal italic text-[#d6d8dc]">il tuo business.</span>
          </h1>

          <p className="mt-5 max-w-[510px] text-[14px] leading-6 text-zinc-300 sm:text-[15px]">
            Progettiamo soluzioni digitali su misura per aziende e lavoriamo come
            partner tecnico white-label per agenzie e professionisti.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/contact"
              className="inline-flex h-10 items-center gap-2 rounded-md bg-[#d6d8dc] px-4 text-[12px] font-medium text-[#111213] transition hover:bg-white"
            >
              Parlaci del tuo progetto <ArrowRight className="size-3.5" />
            </a>
            <a
              href="/for-agencies"
              className="inline-flex h-10 items-center gap-2 rounded-md border border-white/35 px-4 text-[12px] font-medium text-white transition hover:border-white/70 hover:bg-white/5"
            >
              Sei un&apos;agenzia? <ArrowRight className="size-3.5" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.65 }}
          className="relative mx-auto mt-11 w-[84%] overflow-hidden rounded-lg border border-white/10 lg:hidden"
        >
          <Image
            src={HERO_IMAGE}
            alt="Dashboard Vanta su laptop"
            width={1536}
            height={1024}
            priority
            className="aspect-[16/9] w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0d]/45 to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.55 }}
          className="mt-12 border-t border-white/[0.1] pt-5 lg:mt-16"
        >
          <p className="mb-4 text-center text-[8px] font-medium uppercase tracking-[0.18em] text-zinc-400">
            Soluzioni digitali che generano risultati
          </p>
          <div className="grid grid-cols-2 gap-y-4 lg:grid-cols-4">
            <Feature icon={<Workflow size={15} />} text="Processi più efficienti" />
            <Feature icon={<Database size={15} />} text="Dati sempre sotto controllo" />
            <Feature icon={<ShieldCheck size={15} />} text="Scalabilità e sicurezza" />
            <Feature icon={<Cpu size={15} />} text="Tecnologie moderne" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Feature({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex items-center justify-center gap-2 text-center text-[10px] text-zinc-200 sm:text-[11px]">
      <span className="text-zinc-300">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
