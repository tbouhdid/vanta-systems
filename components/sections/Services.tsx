import { ArrowRight } from "lucide-react";
import Link from "next/link";

import Container from "@/components/shared/Container";
import { services } from "@/data/services";

export default function Services() {
  return (
    <section id="services" className="bg-[#0b0c0d] py-16 sm:py-20 lg:py-[74px]">
      <Container>
        <div className="max-w-2xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-400">
            Cosa facciamo
          </p>
          <h2 className="mt-2 font-heading text-[28px] font-medium tracking-[-0.04em] text-white sm:text-[33px]">
            Soluzioni complete per le tue sfide digitali.
          </h2>
        </div>

        <div className="mt-9 grid items-stretch border-t border-white/[0.12] md:auto-rows-fr md:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:border-t-0">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group flex h-full min-h-[224px] flex-col border-b border-white/[0.12] px-0 py-7 md:px-6 md:odd:border-r md:even:pl-8 lg:border-b-0 lg:border-r lg:px-7 lg:py-0 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <div className="mb-4 inline-flex rounded-md border border-white/[0.08] bg-white/[0.06] p-2.5">
                  <Icon size={19} className="text-zinc-100" strokeWidth={1.6} />
                </div>

                <h3 className="font-heading text-[17px] font-medium tracking-[-0.025em] text-white">
                  {service.title}
                </h3>

                <p className="mt-2 max-w-[220px] text-[12px] leading-5 text-zinc-400">
                  {service.description}
                </p>

                {service.href ? (
                  <Link
                    href={service.href}
                    className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[12px] text-white transition group-hover:text-[#d6d8dc]"
                  >
                    Scopri di più <ArrowRight className="size-3.5" />
                  </Link>
                ) : (
                  <a
                    href="/contact"
                    className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[12px] text-white transition group-hover:text-[#d6d8dc]"
                  >
                    Scopri di più <ArrowRight className="size-3.5" />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
