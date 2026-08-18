"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Briefcase, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SuccessCardProps {
  email: string;
  confirmationSent: boolean;
  isAgency?: boolean;
}

export default function SuccessCard({
  email,
  confirmationSent,
  isAgency = false,
}: SuccessCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45 }}
      className="border border-white/[0.1] bg-[#111213] p-6 text-center sm:p-8"
    >
      <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full border ${isAgency ? "border-[#627cad]/65 bg-[#627cad]/15" : "border-[#8d939b]/50 bg-[#d6d8dc]/10"}`}>
        <CheckCircle2
          className={`h-8 w-8 ${isAgency ? "text-[#8fa7d6]" : "text-[#d6d8dc]"}`}
          strokeWidth={1.8}
        />
      </div>

      <h2 className="mt-6 font-heading text-[30px] font-medium tracking-[-0.045em] sm:text-[36px]">
        {isAgency ? "Brief inviato." : "Richiesta inviata."}
      </h2>

      <p className="mx-auto mt-4 max-w-xl text-[14px] leading-6 text-zinc-400">
        Grazie per aver contattato VANTA.
        <br />
        {isAgency
          ? "Abbiamo ricevuto il brief e valuteremo fattibilità, tempi e perimetro operativo."
          : "Abbiamo ricevuto la tua richiesta e la analizzeremo al più presto."}
      </p>

      <div className="mt-7 border border-white/[0.1] bg-white/[0.035] p-5">
        {confirmationSent ? (
          <>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#a8adb4]">
              Email di conferma inviata a
            </p>

            <p className="mt-3 text-[16px] font-medium text-white">{email}</p>

            <p className="mt-3 text-[11px] text-zinc-400">
              Ti ricontatteremo direttamente a questo indirizzo.
            </p>
          </>
        ) : (
          <p className="text-[11px] text-zinc-400">
            La richiesta è stata ricevuta correttamente. Ti contatteremo a questo
            indirizzo.
          </p>
        )}
      </div>

      <div className="mt-7 grid gap-2 text-left text-[10px] text-zinc-400 md:grid-cols-3">
        <div>{confirmationSent ? "✓ Email di conferma inviata" : "✓ Richiesta ricevuta"}</div>
        <div>✓ Nessun impegno</div>
        <div>{isAgency ? "✓ Perimetro in valutazione" : "✓ Consulenza personalizzata"}</div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link href="/">
          <Button variant="outline" size="lg" className="rounded-md">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Torna alla Home
          </Button>
        </Link>

        <Link href="/#services">
          <Button size="lg" className="rounded-md">
            <Briefcase className="mr-2 h-4 w-4" />
            Scopri i servizi
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
