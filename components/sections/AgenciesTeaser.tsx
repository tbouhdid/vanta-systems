import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import Container from "@/components/shared/Container";

const points = [
  "Produzione completamente white-label",
  "Tempi e perimetro condivisi prima di partire",
  "Nessun contatto diretto con il cliente finale",
];

export default function AgenciesTeaser() {
  return (
    <section className="border-y border-white/[0.08] bg-[#111213] py-16 sm:py-20 lg:py-[76px]">
      <Container>
        <div className="grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">
              VANTA for Agencies
            </p>
            <h2 className="mt-3 max-w-[560px] font-heading text-[32px] font-medium leading-[1.08] tracking-[-0.045em] text-white sm:text-[42px]">
              Produzione web per la tua agenzia, sotto il tuo brand.
            </h2>
          </div>

          <div>
            <p className="max-w-[610px] text-[15px] leading-7 text-zinc-300">
              Realizziamo landing page e siti per i clienti della tua agenzia.
              Tu mantieni la relazione e il tuo margine; VANTA gestisce la
              produzione tecnica.
            </p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-3">
              {points.map((point) => (
                <li key={point} className="flex gap-2 text-[11px] leading-5 text-[#d6d8dc]">
                  <Check className="mt-0.5 size-3.5 shrink-0" strokeWidth={2.1} />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href="/for-agencies"
              className="mt-8 inline-flex h-11 items-center gap-2 rounded-lg border border-white/35 px-4 text-[12px] font-medium text-white transition hover:border-white/70 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6d8dc]"
            >
              Scopri VANTA for Agencies
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
