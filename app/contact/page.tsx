"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  Clock3,
  Code2,
  Database,
  FileStack,
  LockKeyhole,
  MailCheck,
  MessageCircle,
  Phone,
  PlugZap,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

import SuccessCard from "@/components/contact/SuccessCard";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Container from "@/components/shared/Container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ContactForm = {
  name: string;
  email: string;
  company: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
};

const initialForm: ContactForm = {
  name: "",
  email: "",
  company: "",
  phone: "",
  projectType: "",
  budget: "",
  message: "",
};

const trustPoints = [
  "Consulenza iniziale gratuita",
  "Risposta entro 48 ore lavorative",
  "Nessun impegno",
];

const processSteps = [
  "Analizziamo la richiesta",
  "Organizziamo una call conoscitiva",
  "Definiamo soluzione e priorità",
  "Prepariamo una proposta personalizzata",
];

const capabilities = [
  { label: "Software su misura", icon: Code2 },
  { label: "CRM e gestionali", icon: Database },
  { label: "Automazioni", icon: Workflow },
  { label: "Integrazioni e API", icon: PlugZap },
  { label: "Soluzioni AI", icon: Bot },
  { label: "Portali web", icon: FileStack },
];

const projectTypes = [
  "Software su misura",
  "CRM",
  "Gestionale",
  "Automazione",
  "Intelligenza Artificiale",
  "Portale Web",
  "Altro",
];

const budgets = [
  "Meno di 5.000 €",
  "5.000–10.000 €",
  "10.000–25.000 €",
  "Oltre 25.000 €",
  "Da definire",
];

const faqs = [
  {
    question: "Quanto costa un software su misura?",
    answer:
      "Dipende da obiettivi, integrazioni e livello di complessità. Dopo una prima analisi prepariamo una proposta trasparente, costruita sulle priorità reali del progetto.",
  },
  {
    question: "Quanto tempo serve per sviluppare un progetto?",
    answer:
      "Un MVP può richiedere alcune settimane; progetti più articolati vengono pianificati per fasi. Prima della proposta condividiamo tempi, rilasci e punti di verifica.",
  },
  {
    question: "Lavorate anche con PMI e professionisti?",
    answer:
      "Sì. Adattiamo scoperta, roadmap e investimento alla fase dell’azienda, mantenendo sempre attenzione a valore, usabilità e possibilità di evoluzione.",
  },
  {
    question: "È possibile partire da un MVP?",
    answer:
      "Certamente. Possiamo definire una prima versione focalizzata sulle funzioni che portano valore subito, lasciando una base tecnica pronta a crescere.",
  },
  {
    question: "Offrite assistenza dopo il rilascio?",
    answer:
      "Sì. Possiamo affiancarti dopo il go-live con manutenzione, evolutive, monitoraggio e supporto, secondo le necessità della tua organizzazione.",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function updateField(field: keyof ContactForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(data?.error ?? "Non è stato possibile inviare la richiesta. Riprova tra poco.");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Errore durante l’invio. Verifica la connessione e riprova.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-[#0b0c0d] text-white">
        <section className="relative isolate pb-16 pt-11 sm:pb-20 sm:pt-14 lg:pb-24">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[680px] bg-[radial-gradient(circle_at_75%_5%,rgba(214,216,220,0.16),transparent_32%),radial-gradient(circle_at_7%_36%,rgba(141,147,155,0.11),transparent_28%)]" />
          <Container>
            <div className="max-w-[680px]">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#a8adb4]">
                Contatti
              </p>
              <h1 className="mt-4 font-heading text-[40px] font-medium leading-[1.04] tracking-[-0.055em] text-white sm:text-[54px] lg:text-[64px]">
                Parliamo del tuo prossimo software.
              </h1>
              <p className="mt-5 max-w-[650px] text-[15px] leading-7 text-zinc-300 sm:text-[17px]">
                Raccontaci la tua idea. Ti aiuteremo a trasformarla in una soluzione concreta, scalabile e costruita intorno ai processi della tua azienda.
              </p>
              <ul className="mt-7 grid gap-2.5 sm:grid-cols-3">
                {trustPoints.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-[11px] text-[#d6d8dc]">
                    <span className="flex size-4 shrink-0 items-center justify-center rounded-full border border-[#8d939b]/60 bg-white/[0.04]">
                      <Check className="size-2.5" strokeWidth={2.2} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16 xl:gap-20">
              <aside className="space-y-10 lg:pt-3">
                <section>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">
                    Cosa succede dopo
                  </p>
                  <ol className="mt-5 space-y-1 border-t border-white/[0.1]">
                    {processSteps.map((step, index) => (
                      <li key={step} className="flex items-center gap-4 border-b border-white/[0.1] py-4">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-[#8d939b]/65 bg-white/[0.035] text-[10px] font-medium text-[#d6d8dc]">
                          0{index + 1}
                        </span>
                        <span className="text-[13px] text-zinc-200">{step}</span>
                      </li>
                    ))}
                  </ol>
                </section>

                <section>
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">
                    Cosa realizziamo
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-2.5">
                    {capabilities.map(({ label, icon: Icon }) => (
                      <div key={label} className="group rounded-xl border border-white/[0.1] bg-white/[0.035] p-3.5 transition duration-300 hover:-translate-y-0.5 hover:border-[#8d939b]/70 hover:bg-white/[0.06]">
                        <span className="flex size-8 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.045] text-[#d6d8dc] transition group-hover:bg-[#d6d8dc] group-hover:text-[#111213]">
                          <Icon className="size-4" strokeWidth={1.65} />
                        </span>
                        <p className="mt-4 text-[11px] font-medium text-zinc-200">{label}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-2xl border border-white/[0.1] bg-[linear-gradient(145deg,rgba(214,216,220,0.08),rgba(255,255,255,0.025))] p-5">
                  <ShieldCheck className="size-5 text-[#d6d8dc]" strokeWidth={1.6} />
                  <p className="mt-4 text-[13px] font-medium text-white">Un confronto concreto, senza impegno.</p>
                  <p className="mt-2 text-[11px] leading-5 text-zinc-400">La prima conversazione serve a capire contesto, priorità e il modo più sensato per procedere.</p>
                </section>
              </aside>

              <div className="min-w-0">
                <AvailabilityCard />

                <section id="contact-form" className="mt-4 scroll-mt-24 rounded-2xl border border-white/[0.12] bg-[#151617]/95 p-5 shadow-[0_24px_64px_rgba(0,0,0,0.22)] sm:p-7 lg:p-8">
                  {success ? (
                    <SuccessCard email={form.email} />
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="flex flex-col gap-1.5 border-b border-white/[0.09] pb-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                          <h2 className="font-heading text-[25px] font-medium tracking-[-0.04em] text-white">Raccontaci il progetto</h2>
                          <p className="mt-1 text-[11px] leading-5 text-zinc-400">Più dettagli condividi, più utile sarà il nostro primo confronto.</p>
                        </div>
                        <span className="text-[10px] text-[#a8adb4]">Campi con * obbligatori</span>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Nome e cognome" htmlFor="name" required>
                          <Input id="name" autoComplete="name" value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Mario Rossi" required className={inputClassName} />
                        </Field>
                        <Field label="Email" htmlFor="email" required>
                          <Input id="email" type="email" autoComplete="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} placeholder="mario@azienda.it" required className={inputClassName} />
                        </Field>
                        <Field label="Azienda" htmlFor="company">
                          <Input id="company" autoComplete="organization" value={form.company} onChange={(event) => updateField("company", event.target.value)} placeholder="Nome dell’azienda" className={inputClassName} />
                        </Field>
                        <Field label="Telefono" htmlFor="phone" optional>
                          <Input id="phone" type="tel" autoComplete="tel" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="+39 000 000 0000" className={inputClassName} />
                        </Field>
                        <Field label="Tipo di progetto" htmlFor="projectType" required>
                          <select id="projectType" value={form.projectType} onChange={(event) => updateField("projectType", event.target.value)} required className={selectClassName}>
                            <option value="" disabled>Seleziona una tipologia</option>
                            {projectTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                          </select>
                        </Field>
                        <Field label="Budget indicativo" htmlFor="budget" required>
                          <select id="budget" value={form.budget} onChange={(event) => updateField("budget", event.target.value)} required className={selectClassName}>
                            <option value="" disabled>Seleziona un intervallo</option>
                            {budgets.map((budget) => <option key={budget} value={budget}>{budget}</option>)}
                          </select>
                        </Field>
                      </div>

                      <Field label="Raccontaci il progetto" htmlFor="message" required>
                        <Textarea id="message" rows={7} value={form.message} onChange={(event) => updateField("message", event.target.value)} placeholder="Quale processo vorresti migliorare? Quali strumenti usi oggi? Quali risultati vuoi ottenere?" required className="min-h-[156px] resize-y border-white/[0.14] bg-black/20 px-3 py-3 text-[13px] text-white placeholder:text-zinc-600 focus-visible:border-[#bfc3c9] focus-visible:ring-2 focus-visible:ring-[#bfc3c9]/25" />
                      </Field>

                      {error && <p role="alert" className="rounded-lg border border-[#b46d68]/40 bg-[#b46d68]/10 px-3 py-2 text-[11px] text-[#edb2ac]">{error}</p>}

                      <button type="submit" disabled={loading} className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#d6d8dc] px-5 text-[12px] font-medium text-[#111213] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#151617] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
                        {loading ? "Invio in corso..." : "Richiedi una consulenza"}
                        {!loading && <ArrowRight className="size-3.5" />}
                      </button>
                    </form>
                  )}
                </section>

                {!success && (
                  <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                    <TrustMessage icon={MailCheck} title="Nessuno spam" text="Solo aggiornamenti sulla richiesta." />
                    <TrustMessage icon={MessageCircle} title="Risposta personale" text="Parli con persone, non bot." />
                    <TrustMessage icon={LockKeyhole} title="Informazioni riservate" text="Usate solo per il confronto." />
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>

        <section className="border-y border-white/[0.08] bg-[#111213] py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">FAQ</p>
                <h2 className="mt-3 font-heading text-[32px] font-medium tracking-[-0.045em] text-white sm:text-[42px]">Domande frequenti.</h2>
                <p className="mt-4 max-w-[330px] text-[14px] leading-6 text-zinc-400">Se hai già in mente un’esigenza specifica, puoi descriverla direttamente nel form.</p>
              </div>
              <div className="divide-y divide-white/[0.1] border-y border-white/[0.1]">
                {faqs.map((faq) => (
                  <details key={faq.question} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[14px] font-medium text-white sm:text-[15px]">
                      {faq.question}
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-white/[0.18] text-[16px] font-normal leading-none text-[#d6d8dc] transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="max-w-[680px] pt-3 pr-10 text-[13px] leading-6 text-zinc-400">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-[#0b0c0d] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-2xl border border-[#4b4e52] bg-[#141516] px-6 py-9 sm:px-10 sm:py-11">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#bfc3c9]/15 blur-[90px]" />
            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">Il prossimo passo</p>
                <h2 className="mt-3 font-heading text-[30px] font-medium tracking-[-0.045em] text-white sm:text-[40px]">Hai già un’idea?</h2>
                <p className="mt-3 max-w-[680px] text-[14px] leading-6 text-zinc-300">Raccontacela. Ti aiuteremo a capire come trasformarla in un progetto concreto.</p>
              </div>
              <a href="#contact-form" className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#d6d8dc] px-5 text-[12px] font-medium text-[#111213] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#141516]">
                Richiedi una consulenza <ArrowRight className="size-3.5" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const inputClassName = "h-11 border-white/[0.14] bg-black/20 px-3 text-[13px] text-white placeholder:text-zinc-600 focus-visible:border-[#bfc3c9] focus-visible:ring-2 focus-visible:ring-[#bfc3c9]/25";
const selectClassName = "h-11 w-full rounded-lg border border-white/[0.14] bg-black/20 px-3 text-[13px] text-white outline-none transition focus:border-[#bfc3c9] focus:ring-2 focus:ring-[#bfc3c9]/25 disabled:cursor-not-allowed [&>option]:bg-[#151617]";

function Field({ label, htmlFor, required = false, optional = false, children }: { label: string; htmlFor: string; required?: boolean; optional?: boolean; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} className="text-[11px] font-medium text-zinc-200">
        {label} {required && <span className="text-[#bfc3c9]">*</span>}
        {optional && <span className="ml-1 font-normal text-zinc-500">(facoltativo)</span>}
      </Label>
      {children}
    </div>
  );
}

function AvailabilityCard() {
  const rows = [
    { label: "Stato", value: "Disponibili", icon: CheckCircle2 },
    { label: "Tempo medio di risposta", value: "Entro 48 ore", icon: Clock3 },
    { label: "Consulenza iniziale", value: "Gratuita", icon: Sparkles },
  ];

  return (
    <section aria-label="Disponibilità progetti" className="rounded-2xl border border-[#8d939b]/45 bg-[linear-gradient(135deg,rgba(214,216,220,0.16),rgba(255,255,255,0.035))] p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#d6d8dc]">Disponibilità progetti</p>
          <p className="mt-1 text-[11px] text-zinc-300">Informazioni aggiornate per il primo contatto.</p>
        </div>
        <span className="flex size-9 items-center justify-center rounded-lg border border-white/[0.14] bg-white/[0.06] text-[#d6d8dc]"><Phone className="size-4" strokeWidth={1.7} /></span>
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-3">
        {rows.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl border border-white/[0.1] bg-black/15 p-3">
            <Icon className="size-3.5 text-[#d6d8dc]" strokeWidth={1.65} />
            <p className="mt-3 text-[9px] text-zinc-400">{label}</p>
            <p className="mt-1 text-[11px] font-medium text-white">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TrustMessage({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="rounded-xl border border-white/[0.09] bg-white/[0.025] p-3">
      <Icon className="size-3.5 text-[#d6d8dc]" strokeWidth={1.65} />
      <p className="mt-3 text-[10px] font-medium text-zinc-200">{title}</p>
      <p className="mt-1 text-[9px] leading-4 text-zinc-500">{text}</p>
    </div>
  );
}
