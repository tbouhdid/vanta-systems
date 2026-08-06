import { ArrowRight, CalendarDays } from "lucide-react";

export default function CTA() {
  return (
    <section id="contact" className="bg-[#0b0c0d] px-5 pb-12 sm:px-8 lg:px-12 lg:pb-14">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-lg border border-[#4b4e52] bg-[#121314] px-5 py-6 sm:px-8 sm:py-7">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#bfc3c9]/15 blur-[80px]" />
        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-md border border-[#53565a] bg-[#1a1b1d]">
              <CalendarDays className="size-5 text-white" />
            </div>
            <div>
              <h2 className="font-heading text-[21px] font-medium tracking-[-0.035em] text-white sm:text-[24px]">
                Pronto a trasformare le tue idee in soluzioni digitali?
              </h2>
              <p className="mt-1 text-[12px] text-zinc-300">
                Prenota una consulenza gratuita e scopri come possiamo aiutarti.
              </p>
            </div>
          </div>
          <a
            href="/contact"
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md border border-white/35 px-4 text-[12px] font-medium text-white transition hover:border-white/70 hover:bg-white/5"
          >
            Richiedi una consulenza <ArrowRight className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
