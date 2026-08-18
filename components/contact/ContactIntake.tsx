"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  LockKeyhole,
  MailCheck,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

import SuccessCard from "@/components/contact/SuccessCard";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Container from "@/components/shared/Container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  agencyPartnershipProjectType,
  agencyPilotProjectType,
  budgets,
  isAgencyProjectType,
  materialsStatuses,
  projectCategories,
  projectTypes,
} from "@/lib/contactLead";

const transitionEase = [0.22, 1, 0.36, 1] as const;

type ContactIntakeProps = {
  initialService: string | null;
};

type ContactForm = {
  name: string;
  email: string;
  company: string;
  website: string;
  phone: string;
  projectType: string;
  projectCategory: string;
  deadline: string;
  materialsStatus: string;
  budget: string;
  message: string;
};

const trustPoints = [
  "Consulenza iniziale gratuita",
  "Risposta entro 48 ore lavorative",
  "Nessun impegno",
];

const genericProcessSteps = [
  "Leggiamo il contesto e le priorità",
  "Organizziamo un confronto conoscitivo",
  "Definiamo perimetro e prossimi passi",
];

const agencyPilotSummary = [
  "Pilot engagement",
  "A partire da 390 €",
  "Perimetro e tempi definiti prima dell’avvio",
  "Modalità white-label",
  "Nessun vincolo continuativo",
];

const partnershipSummary = [
  "Partnership continuativa",
  "Capacità produttiva attivabile quando serve",
  "Perimetro e tempi definiti progetto per progetto",
  "Modalità white-label",
  "Nessun vincolo di volume minimo",
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
      "Certamente. Possiamo definire una prima versione focalizzata sulle funzioni che portano valore subito, lasciando una base pronta a crescere.",
  },
];

function projectTypeForService(service: string | null) {
  if (service === "agency-pilot") {
    return agencyPilotProjectType;
  }

  if (service === "agency-partnership") {
    return agencyPartnershipProjectType;
  }

  return "";
}

function createInitialForm(initialService: string | null): ContactForm {
  return {
    name: "",
    email: "",
    company: "",
    website: "",
    phone: "",
    projectType: projectTypeForService(initialService),
    projectCategory: "",
    deadline: "",
    materialsStatus: "",
    budget: "",
    message: "",
  };
}

function syncServiceInUrl(projectType: string) {
  const url = new URL(window.location.href);

  if (projectType === agencyPilotProjectType) {
    url.searchParams.set("service", "agency-pilot");
  } else if (projectType === agencyPartnershipProjectType) {
    url.searchParams.set("service", "agency-partnership");
  } else {
    url.searchParams.delete("service");
  }

  window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
}

export default function ContactIntake({ initialService }: ContactIntakeProps) {
  const [form, setForm] = useState<ContactForm>(() => createInitialForm(initialService));
  const initialIsAgency = isAgencyProjectType(projectTypeForService(initialService));
  const [ctaIsAgency, setCtaIsAgency] = useState(initialIsAgency);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(true);
  const [error, setError] = useState("");
  const ctaTimer = useRef<number | null>(null);
  const reducedMotion = useReducedMotion() ?? false;

  const isAgencyContext = isAgencyProjectType(form.projectType);
  const isPilot = form.projectType === agencyPilotProjectType;
  const transition = {
    duration: reducedMotion ? 0.16 : 0.52,
    ease: transitionEase,
  };
  const contentOffset = reducedMotion ? 0 : 10;
  const formAccentClass = isAgencyContext
    ? "focus-visible:border-[#8fa7d6] focus-visible:ring-[#8fa7d6]/30"
    : "focus-visible:border-[#bfc3c9] focus-visible:ring-[#bfc3c9]/25";
  const selectAccentClass = isAgencyContext
    ? "focus:border-[#8fa7d6] focus:ring-[#8fa7d6]/30"
    : "focus:border-[#bfc3c9] focus:ring-[#bfc3c9]/25";

  useEffect(() => {
    return () => {
      if (ctaTimer.current !== null) {
        window.clearTimeout(ctaTimer.current);
      }
    };
  }, []);

  function updateField(field: keyof ContactForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function updateProjectType(value: string) {
    const nextIsAgency = isAgencyProjectType(value);

    setForm((current) => ({ ...current, projectType: value }));
    syncServiceInUrl(value);

    if (nextIsAgency === isAgencyContext) {
      setCtaIsAgency(nextIsAgency);
      return;
    }

    if (ctaTimer.current !== null) {
      window.clearTimeout(ctaTimer.current);
    }

    if (reducedMotion) {
      setCtaIsAgency(nextIsAgency);
      return;
    }

    ctaTimer.current = window.setTimeout(() => {
      setCtaIsAgency(nextIsAgency);
      ctaTimer.current = null;
    }, 460);
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
      const data = (await response.json().catch(() => null)) as
        | { error?: string; confirmationSent?: boolean }
        | null;

      if (!response.ok) {
        setError(
          data?.error ??
            "Non è stato possibile inviare la richiesta. Riprova tra poco.",
        );
        return;
      }

      setConfirmationSent(data?.confirmationSent !== false);
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
        <section className="relative isolate pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pb-24">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[680px] bg-[radial-gradient(circle_at_75%_5%,rgba(214,216,220,0.16),transparent_32%),radial-gradient(circle_at_7%_36%,rgba(141,147,155,0.11),transparent_28%)]" />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[680px] bg-[radial-gradient(circle_at_78%_4%,rgba(98,124,173,0.19),transparent_30%),radial-gradient(circle_at_10%_42%,rgba(141,147,155,0.1),transparent_28%)]"
            animate={{ opacity: isAgencyContext ? 1 : 0 }}
            transition={transition}
          />
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.02fr)] lg:gap-16 xl:gap-24">
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <div className="relative min-h-[266px] sm:min-h-[248px] lg:min-h-[272px]">
                  <AnimatePresence initial={false} mode="sync">
                    <motion.div
                      key={isAgencyContext ? "agency-intro" : "generic-intro"}
                      initial={{ opacity: 0, y: contentOffset }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -contentOffset * 0.8 }}
                      transition={transition}
                      className="absolute inset-x-0 top-0"
                    >
                      <p className={`text-[10px] font-medium uppercase tracking-[0.22em] ${isAgencyContext ? "text-[#8fa7d6]" : "text-[#a8adb4]"}`}>
                        {isAgencyContext
                          ? "VANTA FOR AGENCIES / PROJECT INTAKE"
                          : "VANTA SYSTEMS / PROJECT INTAKE"}
                      </p>
                      <h1 className="mt-5 max-w-[650px] font-heading text-[43px] font-medium leading-[1.01] tracking-[-0.06em] text-white sm:text-[57px] lg:text-[61px]">
                        {isAgencyContext
                          ? "Raccontaci il progetto da consegnare."
                          : "Parliamo del tuo prossimo progetto."}
                      </h1>
                      <p className="mt-5 max-w-[560px] text-[15px] leading-7 text-zinc-300 sm:text-[16px]">
                        {isAgencyContext
                          ? "Condividi obiettivi, materiali disponibili e tempistiche. Valuteremo il progetto e ti proporremo un perimetro operativo chiaro."
                          : "Raccontaci la tua idea. Ti aiuteremo a trasformarla in una soluzione concreta, costruita intorno alle priorità della tua azienda."}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="relative min-h-[300px] sm:min-h-[288px]">
                  <AnimatePresence initial={false} mode="sync">
                    {isAgencyContext ? (
                      <motion.section
                        key={isPilot ? "pilot-summary" : "partnership-summary"}
                        aria-label="Riepilogo del percorso Agencies"
                        initial={{ opacity: 0, y: contentOffset }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -contentOffset * 0.8 }}
                        transition={transition}
                        className="absolute inset-x-0 top-0 border-y border-[#627cad]/55 py-5"
                      >
                        <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#8fa7d6]">
                          {isPilot ? "Pilot engagement" : "Partnership continuativa"}
                        </p>
                        <ul className="mt-4 space-y-3">
                          {(isPilot ? agencyPilotSummary : partnershipSummary).map((item) => (
                            <li key={item} className="flex gap-3 text-[12px] leading-5 text-zinc-200">
                              <span className="mt-[7px] size-1 shrink-0 rounded-full bg-[#8fa7d6]" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </motion.section>
                    ) : (
                      <motion.div
                        key="generic-summary"
                        initial={{ opacity: 0, y: contentOffset }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -contentOffset * 0.8 }}
                        transition={transition}
                        className="absolute inset-x-0 top-0"
                      >
                        <ul className="space-y-3 border-y border-white/[0.1] py-5">
                          {trustPoints.map((point) => (
                            <li key={point} className="flex items-center gap-2 text-[11px] text-[#d6d8dc]">
                              <span className="flex size-4 shrink-0 items-center justify-center rounded-full border border-[#8d939b]/60 bg-white/[0.04]">
                                <Check className="size-2.5" strokeWidth={2.2} />
                              </span>
                              {point}
                            </li>
                          ))}
                        </ul>
                        <section className="mt-7" aria-label="Cosa succede dopo il contatto">
                          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">
                            Dopo il messaggio
                          </p>
                          <ol className="mt-4 divide-y divide-white/[0.1] border-y border-white/[0.1]">
                            {genericProcessSteps.map((step, index) => (
                              <li key={step} className="flex gap-4 py-4">
                                <span className="text-[10px] font-medium text-[#8d939b]">0{index + 1}</span>
                                <span className="text-[12px] leading-5 text-zinc-300">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </section>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.div
                  className="mt-10 flex gap-3 border-l px-4 py-1"
                  animate={{ borderColor: isAgencyContext ? "#627cad" : "#8d939b" }}
                  transition={transition}
                >
                  <ShieldCheck className={`mt-0.5 size-4 shrink-0 ${isAgencyContext ? "text-[#8fa7d6]" : "text-[#d6d8dc]"}`} strokeWidth={1.65} />
                  <p className="text-[11px] leading-5 text-zinc-400">
                    Le informazioni condivise vengono usate solo per valutare la
                    richiesta e preparare il prossimo passo.
                  </p>
                </motion.div>
              </aside>

              <motion.section
                id="contact-form"
                layout
                className="relative scroll-mt-24 border bg-[#151617]/95 p-5 shadow-[0_24px_64px_rgba(0,0,0,0.22)] sm:p-7 lg:p-8"
                animate={{ borderColor: isAgencyContext ? "rgba(98,124,173,0.75)" : "rgba(255,255,255,0.12)" }}
                transition={transition}
              >
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_4%,rgba(98,124,173,0.13),transparent_32%)]"
                  animate={{ opacity: isAgencyContext ? 1 : 0 }}
                  transition={transition}
                />
                {success ? (
                  <SuccessCard email={form.email} confirmationSent={confirmationSent} isAgency={isAgencyContext} />
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative min-h-[73px] border-b border-white/[0.1] pb-6">
                      <AnimatePresence initial={false} mode="sync">
                        <motion.div
                          key={isAgencyContext ? "agency-form-heading" : "generic-form-heading"}
                          initial={{ opacity: 0, y: contentOffset * 0.7 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -contentOffset * 0.55 }}
                          transition={transition}
                          className="absolute inset-x-0 top-0 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
                        >
                          <div>
                            <p className={`text-[9px] font-medium uppercase tracking-[0.2em] ${isAgencyContext ? "text-[#8fa7d6]" : "text-[#a8adb4]"}`}>
                              {isAgencyContext ? "Apri un incarico" : "Inizia il confronto"}
                            </p>
                            <h2 className="mt-2 font-heading text-[29px] font-medium tracking-[-0.045em] text-white">
                              {isAgencyContext ? "Brief di progetto" : "Raccontaci il progetto"}
                            </h2>
                          </div>
                          <span className="text-[10px] text-zinc-500">Campi con * obbligatori</span>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
                      <Field label="Nome e cognome" htmlFor="name" required>
                        <Input id="name" autoComplete="name" value={form.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Mario Rossi" required className={getInputClassName(formAccentClass)} />
                      </Field>
                      <Field label="Email professionale" htmlFor="email" required>
                        <Input id="email" type="email" autoComplete="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} placeholder="mario@azienda.it" required className={getInputClassName(formAccentClass)} />
                      </Field>
                      <Field label="Telefono" htmlFor="phone" optional>
                        <Input id="phone" type="tel" autoComplete="tel" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="+39 000 000 0000" className={getInputClassName(formAccentClass)} />
                      </Field>
                      <Field label="Servizio" htmlFor="projectType" required>
                        <select id="projectType" value={form.projectType} onChange={(event) => updateProjectType(event.target.value)} required className={getSelectClassName(selectAccentClass)}>
                          <option value="" disabled>Seleziona una tipologia</option>
                          {projectTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                        </select>
                      </Field>
                      <Field label={isAgencyContext ? "Agenzia o studio" : "Azienda"} htmlFor="company" optional>
                        <Input id="company" autoComplete="organization" value={form.company} onChange={(event) => updateField("company", event.target.value)} placeholder={isAgencyContext ? "Nome dell’agenzia" : "Nome dell’azienda"} className={getInputClassName(formAccentClass)} />
                      </Field>
                      <Field label="Fascia di budget" htmlFor="budget" required>
                        <select id="budget" value={form.budget} onChange={(event) => updateField("budget", event.target.value)} required className={getSelectClassName(selectAccentClass)}>
                          <option value="" disabled>Seleziona un intervallo</option>
                          {budgets.map((budget) => <option key={budget} value={budget}>{budget}</option>)}
                        </select>
                      </Field>
                    </div>

                    <AnimatePresence initial={false}>
                      {isAgencyContext && (
                        <motion.div
                          key="agency-fields"
                          initial={{ height: 0, opacity: 0, y: contentOffset * 0.7 }}
                          animate={{ height: "auto", opacity: 1, y: 0 }}
                          exit={{ height: 0, opacity: 0, y: -contentOffset * 0.45 }}
                          transition={{
                            ...transition,
                            delay: reducedMotion ? 0 : 0.12,
                          }}
                          className="overflow-hidden"
                        >
                          <div className="grid gap-x-5 gap-y-5 border-t border-[#627cad]/35 pt-6 sm:grid-cols-2">
                            <Field label="Sito dell’agenzia o dello studio" htmlFor="website" optional>
                              <Input id="website" type="url" autoComplete="url" value={form.website} onChange={(event) => updateField("website", event.target.value)} placeholder="https://esempio.it" className={getInputClassName(formAccentClass)} />
                            </Field>
                            <Field label="Tipologia di progetto" htmlFor="projectCategory" required>
                              <select id="projectCategory" value={form.projectCategory} onChange={(event) => updateField("projectCategory", event.target.value)} required className={getSelectClassName(selectAccentClass)}>
                                <option value="" disabled>Seleziona una tipologia</option>
                                {projectCategories.map((category) => <option key={category} value={category}>{category}</option>)}
                              </select>
                            </Field>
                            <Field label="Scadenza desiderata" htmlFor="deadline" required>
                              <Input id="deadline" value={form.deadline} onChange={(event) => updateField("deadline", event.target.value)} placeholder="Es. entro il 18 settembre" required className={getInputClassName(formAccentClass)} />
                            </Field>
                            <Field label="Stato dei materiali" htmlFor="materialsStatus" required>
                              <select id="materialsStatus" value={form.materialsStatus} onChange={(event) => updateField("materialsStatus", event.target.value)} required className={getSelectClassName(selectAccentClass)}>
                                <option value="" disabled>Seleziona lo stato</option>
                                {materialsStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
                              </select>
                            </Field>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Field label={isAgencyContext ? "Descrizione o brief" : "Raccontaci il progetto"} htmlFor="message" required>
                      <Textarea id="message" rows={7} value={form.message} onChange={(event) => updateField("message", event.target.value)} placeholder={isAgencyContext ? "Obiettivi, contenuti disponibili, funzionalità richieste e qualsiasi nota utile." : "Quale risultato vuoi ottenere? Quali priorità deve risolvere il progetto?"} required className={`min-h-[156px] resize-y border-white/[0.14] bg-black/20 px-3 py-3 text-[13px] text-white placeholder:text-zinc-600 focus-visible:ring-2 ${formAccentClass}`} />
                    </Field>

                    {error && <p role="alert" className="rounded-md border border-[#b46d68]/40 bg-[#b46d68]/10 px-3 py-2 text-[11px] text-[#edb2ac]">{error}</p>}

                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="inline-flex h-11 min-w-[182px] items-center justify-center gap-2 rounded-md bg-[#d6d8dc] px-5 text-[12px] font-medium text-[#111213] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#151617] disabled:cursor-not-allowed disabled:opacity-60"
                      animate={{
                        backgroundColor: ctaIsAgency ? "#8fa7d6" : "#d6d8dc",
                        color: ctaIsAgency ? "#10151f" : "#111213",
                      }}
                      transition={transition}
                    >
                      {loading ? "Invio in corso..." : ctaIsAgency ? "Invia il brief" : "Richiedi una consulenza"}
                      {!loading && <ArrowRight className="size-3.5" />}
                    </motion.button>
                  </form>
                )}
              </motion.section>
            </div>

            {!success && (
              <div className="mt-5 grid gap-2.5 sm:grid-cols-3 lg:ml-[44%]">
                <TrustMessage icon={MailCheck} title="Nessuno spam" text="Solo aggiornamenti sulla richiesta." />
                <TrustMessage icon={MessageCircle} title="Risposta personale" text="Parli con persone, non bot." />
                <TrustMessage icon={LockKeyhole} title="Informazioni riservate" text="Usate solo per il confronto." />
              </div>
            )}
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
          <div className="relative mx-auto max-w-[1440px] overflow-hidden border border-[#4b4e52] bg-[#141516] px-6 py-9 sm:px-10 sm:py-11">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#bfc3c9]/15 blur-[90px]" />
            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">Il prossimo passo</p>
                <h2 className="mt-3 font-heading text-[30px] font-medium tracking-[-0.045em] text-white sm:text-[40px]">Hai già un’idea?</h2>
                <p className="mt-3 max-w-[680px] text-[14px] leading-6 text-zinc-300">Raccontacela. Ti aiuteremo a capire come trasformarla in un progetto concreto.</p>
              </div>
              <a href="#contact-form" className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-[#d6d8dc] px-5 text-[12px] font-medium text-[#111213] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#141516]">
                Torna al form <ArrowRight className="size-3.5" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function getInputClassName(accentClass: string) {
  return `h-11 border-white/[0.14] bg-black/20 px-3 text-[13px] text-white placeholder:text-zinc-600 focus-visible:ring-2 ${accentClass}`;
}

function getSelectClassName(accentClass: string) {
  return `h-11 w-full rounded-md border border-white/[0.14] bg-black/20 px-3 text-[13px] text-white outline-none transition focus:ring-2 disabled:cursor-not-allowed [&>option]:bg-[#151617] ${accentClass}`;
}

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

function TrustMessage({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="border border-white/[0.09] bg-white/[0.025] p-3">
      <Icon className="size-3.5 text-[#d6d8dc]" strokeWidth={1.65} />
      <p className="mt-3 text-[10px] font-medium text-zinc-200">{title}</p>
      <p className="mt-1 text-[9px] leading-4 text-zinc-500">{text}</p>
    </div>
  );
}
