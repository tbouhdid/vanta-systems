import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  AppWindow,
  ArrowLeft,
  ArrowRight,
  Check,
  Code2,
  Search,
  Workflow,
} from "lucide-react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Container from "@/components/shared/Container";

export const metadata: Metadata = {
  title: {
    absolute: "Siti Web e Landing Page | VANTA Systems",
  },
  description:
    "Siti web e landing page veloci, responsive e orientati alla conversione, progettati su misura per il tuo brand e i tuoi obiettivi.",
  alternates: {
    canonical: "/services/websites-landing-pages",
  },
  openGraph: {
    title: "Siti Web e Landing Page | VANTA Systems",
    description:
      "Siti web e landing page veloci, responsive e orientati alla conversione, progettati su misura per il tuo brand e i tuoi obiettivi.",
    url: "/services/websites-landing-pages",
    siteName: "VANTA Systems",
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siti Web e Landing Page | VANTA Systems",
    description:
      "Siti web e landing page veloci, responsive e orientati alla conversione.",
  },
};

const benefits = [
  {
    title: "Esperienza chiara",
    description:
      "Contenuti, percorsi e call to action organizzati per aiutare le persone a capire e agire.",
    icon: Search,
  },
  {
    title: "Design responsive",
    description:
      "Ogni schermata viene progettata per funzionare bene su desktop, tablet e mobile.",
    icon: AppWindow,
  },
  {
    title: "Base tecnica solida",
    description:
      "Performance, accessibilità e SEO tecnico fanno parte della progettazione, non sono un’aggiunta finale.",
    icon: Code2,
  },
  {
    title: "Pronto a evolvere",
    description:
      "Il sito può connettersi a form, analytics, CRM e strumenti utili al tuo flusso commerciale.",
    icon: Workflow,
  },
];

const process = [
  {
    title: "Obiettivi e contenuti",
    description:
      "Definiamo pubblico, proposta di valore, pagine necessarie e materiali disponibili.",
  },
  {
    title: "Struttura e interfaccia",
    description:
      "Progettiamo una gerarchia chiara e un linguaggio visivo coerente con il brand.",
  },
  {
    title: "Sviluppo e integrazioni",
    description:
      "Costruiamo il sito, curiamo gli aspetti tecnici e colleghiamo gli strumenti concordati.",
  },
  {
    title: "Verifica e pubblicazione",
    description:
      "Controlliamo l’esperienza sui dispositivi principali e prepariamo il rilascio.",
  },
];

const faqs = [
  {
    question: "Realizzate anche landing page per campagne?",
    answer:
      "Sì. Possiamo progettare landing page focalizzate su una singola offerta, campagna o servizio, con form e call to action coerenti con l’obiettivo.",
  },
  {
    question: "Il sito sarà ottimizzato per mobile?",
    answer:
      "Sì. Responsive, leggibilità e interazioni vengono verificati lungo tutto il processo, non soltanto prima della pubblicazione.",
  },
  {
    question: "Potete integrare form, analytics o CRM?",
    answer:
      "Sì. Valutiamo le integrazioni necessarie e le configuriamo nel perimetro tecnico concordato.",
  },
  {
    question: "Possiamo partire da un design esistente?",
    answer:
      "Sì. Possiamo sviluppare da un design fornito oppure affiancarvi nella definizione di struttura e interfaccia.",
  },
];

export default function WebsitesLandingPagesPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-[#0b0c0d] text-white">
        <section className="relative isolate pb-16 pt-10 sm:pb-20 sm:pt-12 lg:pb-24">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[650px] bg-[radial-gradient(circle_at_78%_12%,rgba(214,216,220,0.14),transparent_33%),radial-gradient(circle_at_14%_48%,rgba(141,147,155,0.1),transparent_25%)]" />
          <Container>
            <Link href="/#services" className="inline-flex items-center gap-2 text-[12px] text-zinc-400 transition hover:text-white">
              <ArrowLeft className="size-3.5" />
              Torna ai servizi
            </Link>

            <div className="mt-10 grid items-center gap-10 lg:grid-cols-[0.87fr_1.13fr] lg:gap-14 xl:gap-20">
              <div className="max-w-[640px]">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#a8adb4]">Siti web &amp; landing page</p>
                <h1 className="mt-4 font-heading text-[42px] font-medium leading-[1.04] tracking-[-0.055em] text-white sm:text-[57px] lg:text-[64px]">Siti web progettati per essere chiari, veloci e utili.</h1>
                <p className="mt-5 max-w-[610px] text-[15px] leading-7 text-zinc-300 sm:text-[17px]">Realizziamo siti e landing page responsive, orientati alla conversione e costruiti per rappresentare bene il tuo brand in ogni punto di contatto.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/contact" className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#d6d8dc] px-4 text-[12px] font-medium text-[#111213] transition hover:bg-white">
                    Parliamo del tuo sito
                    <ArrowRight className="size-3.5" />
                  </Link>
                  <a href="#processo" className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/25 px-4 text-[12px] font-medium text-white transition hover:border-white/60 hover:bg-white/5">
                    Scopri il processo
                    <ArrowRight className="size-3.5" />
                  </a>
                </div>
                <div className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-[#bfc3c9]">
                  {["Siti corporate", "Landing page", "Esperienze responsive"].map((item) => <span key={item} className="inline-flex items-center gap-2"><Check className="size-3" strokeWidth={2.2} />{item}</span>)}
                </div>
              </div>

              <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-white/[0.12] bg-[#111213] shadow-[0_28px_80px_rgba(0,0,0,0.35)] sm:min-h-[420px] lg:min-h-[500px]">
                <Image
                  src="/images/hero-laptop.png?v=20260806-1541"
                  alt="Laptop con interfaccia digitale VANTA"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 56vw"
                  className="object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(9,10,11,0.48),transparent_50%),linear-gradient(0deg,rgba(9,10,11,0.32),transparent_40%)]" />
                <div className="absolute bottom-4 left-4 rounded-lg border border-white/[0.14] bg-black/35 px-3 py-2.5 backdrop-blur sm:bottom-5 sm:left-5">
                  <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#d6d8dc]">Web experiences</p>
                  <p className="mt-1 text-[10px] text-zinc-300">Interfacce che aiutano le persone a fare il passo successivo.</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-y border-white/[0.08] bg-[#111213] py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="max-w-[680px]">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">Cosa fa la differenza</p>
              <h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] text-white sm:text-[45px]">Non una vetrina: un punto di contatto che lavora per il business.</h2>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map(({ title, description, icon: Icon }) => (
                <article key={title} className="group rounded-xl border border-white/[0.1] bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#8d939b] hover:bg-white/[0.06]">
                  <span className="flex size-10 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.045] text-[#d6d8dc]"><Icon className="size-[19px]" strokeWidth={1.55} /></span>
                  <h3 className="mt-6 font-heading text-[18px] font-medium tracking-[-0.03em] text-white">{title}</h3>
                  <p className="mt-2 text-[12px] leading-5 text-zinc-400">{description}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section id="processo" className="scroll-mt-20 bg-[#f3f3f1] py-16 text-[#111213] sm:py-20 lg:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6b6d70]">Il processo</p>
                <h2 className="mt-3 font-heading text-[34px] font-medium leading-[1.08] tracking-[-0.05em] sm:text-[45px]">Una sequenza chiara, dall’idea al go-live.</h2>
                <p className="mt-4 max-w-[400px] text-[14px] leading-6 text-[#55585c]">Lavoriamo per rendere ogni scelta visibile prima di trasformarla in codice.</p>
              </div>
              <ol className="divide-y divide-[#d6d8dc] border-y border-[#d6d8dc]">
                {process.map((step, index) => (
                  <li key={step.title} className="grid gap-3 py-5 sm:grid-cols-[56px_1fr_auto] sm:items-center">
                    <span className="flex size-9 items-center justify-center rounded-full border border-[#8d939b]/65 bg-[#ececea] text-[10px] font-medium text-[#1a1b1d]">0{index + 1}</span>
                    <div><h3 className="text-[15px] font-medium">{step.title}</h3><p className="mt-1 text-[12px] leading-5 text-[#55585c]">{step.description}</p></div>
                    <span className="hidden text-[10px] uppercase tracking-[0.16em] text-[#6b6d70] sm:block">Fase {index + 1}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </section>

        <section className="bg-[#0b0c0d] py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">FAQ</p>
                <h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] text-white sm:text-[45px]">Domande frequenti.</h2>
              </div>
              <div className="divide-y divide-white/[0.1] border-y border-white/[0.1]">
                {faqs.map((faq) => (
                  <details key={faq.question} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[14px] font-medium text-white sm:text-[15px]">{faq.question}<span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-white/[0.18] text-[16px] font-normal leading-none text-[#d6d8dc] transition group-open:rotate-45">+</span></summary>
                    <p className="max-w-[680px] pt-3 pr-10 text-[13px] leading-6 text-zinc-400">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-[#0b0c0d] px-5 pb-14 sm:px-8 lg:px-12 lg:pb-16">
          <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-2xl border border-[#4b4e52] bg-[#121314] px-6 py-9 sm:px-10 sm:py-11">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#bfc3c9]/15 blur-[90px]" />
            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-[760px]"><p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">Il prossimo passo</p><h2 className="mt-3 font-heading text-[31px] font-medium tracking-[-0.045em] text-white sm:text-[41px]">Hai un sito da progettare o migliorare?</h2><p className="mt-3 text-[14px] leading-6 text-zinc-300">Raccontaci obiettivo, contenuti e priorità. Ti aiuteremo a definire il percorso più utile.</p></div>
              <Link href="/contact" className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#d6d8dc] px-5 text-[12px] font-medium text-[#111213] transition hover:bg-white">Parliamone<ArrowRight className="size-3.5" /></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
