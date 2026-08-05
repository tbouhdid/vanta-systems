"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessCardProps {
  email: string;
}

export default function SuccessCard({
  email,
}: SuccessCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45 }}
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/[0.02]
        p-10
        text-center
      "
    >
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
        <CheckCircle2
          className="h-10 w-10 text-green-400"
          strokeWidth={1.8}
        />
      </div>

      <h2 className="mt-8 text-4xl font-bold">
        Richiesta inviata.
      </h2>

      <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
        Grazie per aver contattato VANTA.
        <br />
        Abbiamo ricevuto la tua richiesta e la analizzeremo al più presto.
      </p>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
          Email di conferma inviata a
        </p>

        <p className="mt-3 text-xl font-semibold">
          {email}
        </p>

        <p className="mt-4 text-sm text-muted-foreground">
          Ti ricontatteremo entro <strong>48 ore lavorative</strong>.
        </p>
      </div>

      <div className="mt-10 grid gap-3 text-left text-sm text-zinc-400 md:grid-cols-3">
        <div>✓ Email di conferma inviata</div>
        <div>✓ Nessun impegno</div>
        <div>✓ Consulenza personalizzata</div>
      </div>

      <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
        <Link href="/">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Torna alla Home
          </Button>
        </Link>

        <Link href="/#services">
          <Button
            size="lg"
            className="rounded-full"
          >
            <Briefcase className="mr-2 h-4 w-4" />
            Scopri i servizi
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}