"use client";
import DashboardPreview from "./DashboardPreview";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-background">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-white/8 blur-[180px]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[1500px] items-center justify-between px-12 pt-28">
        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="mb-8 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">
            Software Engineering • AI • Automation
          </div>

          <h1 className="font-heading text-8xl font-bold leading-[0.9] tracking-tight">
            Costruiamo
            <span className="text-zinc-300"> software</span>
            <br />
            che fa crescere
            <br />
            il tuo business.
          </h1>

          <p className="mt-10 max-w-xl text-lg leading-8 text-muted-foreground">
            Progettiamo software su misura, piattaforme web, automazioni e
            soluzioni basate sull'intelligenza artificiale per aiutare le
            aziende a digitalizzare i processi e crescere.
          </p>

          <div className="mt-14 flex gap-4">
            <Button size="lg" className="rounded-full">
              Richiedi una consulenza
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full"
            >
              Scopri i servizi
            </Button>
          </div>

          {/* Value Proposition */}

          <div className="mt-20 grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold">
                Software su misura
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Soluzioni progettate attorno ai processi e agli obiettivi della
                tua azienda.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                Tecnologie moderne
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Next.js, cloud, API, automazioni e intelligenza artificiale per
                costruire prodotti solidi e scalabili.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                Collaborazione
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Lavoriamo insieme al cliente in ogni fase del progetto, dalla
                strategia al rilascio.
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.9 }}
          className="
          hidden
          lg:block
          rotate-[-5deg]
          transition-transform
          duration-700
          hover:rotate-0
        "
        >
          <DashboardPreview />
        </motion.div>
      </div>
    </section>
  );
}