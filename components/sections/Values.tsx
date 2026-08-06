import type { LucideIcon } from "lucide-react";
import { Cpu, MessageCircle, ShieldCheck, Users } from "lucide-react";

import Container from "@/components/shared/Container";

const values: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    icon: ShieldCheck,
    title: "Qualità",
    description:
      "Realizziamo software curato nei minimi dettagli, performante e pensato per durare nel tempo.",
  },
  {
    icon: MessageCircle,
    title: "Trasparenza",
    description:
      "Comunichiamo in modo chiaro durante ogni fase del progetto.",
  },
  {
    icon: Cpu,
    title: "Innovazione",
    description:
      "Utilizziamo tecnologie moderne, AI e automazioni per creare valore reale.",
  },
  {
    icon: Users,
    title: "Partnership",
    description:
      "Non siamo semplici fornitori ma partner tecnologici a lungo termine.",
  },
];

export default function Values() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#0b0c0d] py-16 sm:py-20 lg:py-[76px]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8d939b]/45 to-transparent" />

      <Container>
        <div className="max-w-2xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#a8adb4]">
            Il nostro approccio
          </p>
          <h2 className="mt-2 font-heading text-[28px] font-medium tracking-[-0.04em] text-white sm:text-[33px]">
            I NOSTRI VALORI
          </h2>
          <p className="mt-3 max-w-xl text-[13px] leading-6 text-zinc-400">
            Principi concreti che guidano ogni scelta, dal primo confronto al rilascio del prodotto.
          </p>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <article
                key={value.title}
                className="group relative min-h-[202px] overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.035] p-5 backdrop-blur-sm transition duration-300 ease-out hover:-translate-y-1 hover:border-[#8d939b]/70 hover:bg-white/[0.06] hover:shadow-[0_18px_42px_rgba(0,0,0,0.24)]"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.16] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="flex size-10 items-center justify-center rounded-lg border border-[#bfc3c9]/20 bg-[#d6d8dc]/[0.08] text-[#d6d8dc] transition duration-300 group-hover:scale-105 group-hover:bg-[#d6d8dc]/[0.14]">
                  <Icon className="size-[19px]" strokeWidth={1.55} />
                </div>
                <h3 className="mt-6 font-heading text-[18px] font-medium tracking-[-0.03em] text-white">
                  {value.title}
                </h3>
                <p className="mt-2 text-[12px] leading-5 text-zinc-400">
                  {value.description}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
