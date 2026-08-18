import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check, ShieldCheck } from "lucide-react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { ProjectCard } from "@/components/sections/Projects";
import Container from "@/components/shared/Container";
import { projects } from "@/data/projects";

const contactHref = "/contact?service=agency-pilot";

export const metadata: Metadata = {
  title: {
    absolute: "VANTA for Agencies | Produzione web white-label",
  },
  description:
    "Landing page e siti web white-label per agenzie, freelance e consulenti marketing. VANTA diventa il tuo reparto tecnico esterno.",
  alternates: {
    canonical: "/for-agencies",
  },
  openGraph: {
    title: "VANTA for Agencies | Produzione web white-label",
    description:
      "Landing page e siti web white-label per agenzie, freelance e consulenti marketing. VANTA diventa il tuo reparto tecnico esterno.",
    url: "/for-agencies",
    siteName: "VANTA Systems",
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VANTA for Agencies | Produzione web white-label",
    description:
      "Landing page e siti web white-label per agenzie, freelance e consulenti marketing.",
  },
};

const differentiators = [
  "Completamente white-label",
  "Tempi definiti",
  "Costi chiari",
  "Nessun contatto diretto con il cliente",
];

const problems = [
  "Ricevi richieste web ma non hai uno sviluppatore interno.",
  "Il tuo team è sovraccarico e rischia di rallentare le consegne.",
  "Vuoi ampliare i servizi senza aggiungere costi fissi.",
  "Non vuoi occuparti di codice, pubblicazione e gestione tecnica.",
];

const processSteps = [
  {
    title: "Brief",
    description: "Ci invii obiettivi, contenuti, brand e tempistiche.",
  },
  {
    title: "Produzione",
    description: "VANTA progetta e realizza il sito in white-label.",
  },
  {
    title: "Revisioni",
    description:
      "Tu raccogli il feedback del cliente e noi applichiamo le modifiche concordate.",
  },
  {
    title: "Consegna",
    description:
      "Prepariamo il progetto per la pubblicazione, in accordo con l’agenzia.",
  },
];

const sprintIncludes = [
  "Landing page personalizzata fino a 7 sezioni",
  "Design responsive",
  "Form di contatto e CTA",
  "Animazioni essenziali",
  "Ottimizzazione tecnica di base",
  "Configurazione tecnica e pubblicazione iniziale",
  "Due cicli di revisioni",
  "Consegna del progetto e degli asset previsti",
  "Branding dell’agenzia oppure modalità completamente white-label",
  "Consegna indicativa entro 5 giorni lavorativi dalla ricezione di tutti i materiali",
];

const benefits = [
  "Nessun costo fisso",
  "Capacità produttiva attivabile quando serve",
  "Prezzo definito prima dell’inizio",
  "Tempistiche concordate",
  "Completa riservatezza",
  "Libertà per l’agenzia di stabilire il prezzo finale",
  "Codice e progetto consegnabili",
  "Possibilità di collaborazione continuativa dopo il pilot",
];

const faqs = [
  {
    question: "Cosa significa white-label?",
    answer:
      "VANTA realizza il lavoro senza proporsi al cliente finale: il progetto può essere consegnato con il brand dell’agenzia o senza riferimenti a VANTA.",
  },
  {
    question: "VANTA parlerà direttamente con il nostro cliente?",
    answer:
      "No. La relazione commerciale rimane all’agenzia. VANTA non contatta né cerca di acquisire i clienti del partner senza autorizzazione.",
  },
  {
    question: "Chi possiede il codice e il progetto?",
    answer:
      "Il codice e gli asset prodotti specificamente per il progetto vengono consegnati dopo il saldo, salvo componenti, librerie, licenze o materiali di terze parti soggetti ai rispettivi termini.",
  },
  {
    question: "Hosting e dominio sono inclusi?",
    answer:
      "No. Sono voci separate e restano intestate e fatturate direttamente all’agenzia o al cliente finale, salvo diverso accordo scritto.",
  },
  {
    question: "Quando iniziano i cinque giorni lavorativi?",
    answer:
      "La tempistica indicativa decorre dalla ricezione di brief, contenuti, brand e materiali necessari per avviare il progetto.",
  },
  {
    question: "Quante revisioni sono comprese?",
    answer:
      "Il Landing Sprint include due cicli di revisioni sui materiali e sul perimetro concordati nel brief iniziale.",
  },
  {
    question: "Potete partire da un design già definito?",
    answer:
      "Sì. Possiamo partire da una direzione creativa o da un design fornito dall’agenzia, verificando prima che perimetro e materiali siano completi.",
  },
  {
    question: "Possiamo collaborare continuativamente?",
    answer:
      "Sì. Dopo il progetto pilota possiamo definire un flusso ricorrente in base al volume, ai tempi e alle esigenze dell’agenzia.",
  },
];

const showcaseProjects = projects.filter((project) =>
  ["vanta-crm", "vanta-desk"].includes(project.slug),
);

function AgencyModeLabel({ className = "" }: { className?: string }) {
  return (
    <p
      className={`text-[9px] font-medium uppercase tracking-[0.24em] text-[#8fa7d6] ${className}`}
    >
      VANTA / AGENCY MODE
    </p>
  );
}

export default function ForAgenciesPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-[#0b0c0d] text-white">
        <section className="relative isolate border-b border-white/[0.1] pb-14 pt-10 sm:pb-20 sm:pt-14 lg:pb-28">
          <div className="pointer-events-none absolute left-[7%] top-0 h-px w-40 bg-[#627cad]/80" />
          <Container>
            <div className="flex items-center justify-between border-b border-white/[0.1] pb-3 text-[9px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">
              <span className="text-[#d8e4ff]">VANTA FOR AGENCIES</span>
              <span>Folio 01 — 26</span>
            </div>

            <div className="grid grid-cols-1 gap-10 pt-10 lg:grid-cols-12 lg:gap-x-8 lg:pt-14 xl:gap-x-12">
              <div className="relative z-10 max-w-[760px] lg:col-span-7 lg:py-8">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#a8adb4]">
                  White-label web production
                </p>
                <h1 className="mt-5 font-heading text-[49px] font-medium leading-[0.98] tracking-[-0.07em] text-white sm:text-[66px] lg:text-[78px] xl:text-[88px]">
                  Il reparto web esterno della tua agenzia.
                </h1>
                <p className="mt-7 max-w-[580px] text-[15px] leading-7 text-zinc-300 sm:text-[17px]">
                  Landing page e siti per i tuoi clienti, sotto il tuo brand. Tu
                  tieni la direzione commerciale; VANTA segue la produzione.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Link
                    href={contactHref}
                    className="inline-flex h-11 items-center gap-2 rounded-md bg-[#d6d8dc] px-4 text-[12px] font-medium text-[#111213] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    Proponici un progetto pilota
                    <ArrowRight className="size-3.5" />
                  </Link>
                  <a
                    href="#come-funziona"
                    className="inline-flex h-11 items-center gap-2 rounded-md border border-[#627cad]/75 px-4 text-[12px] font-medium text-[#d8e4ff] transition hover:border-[#8fa7d6] hover:bg-[#627cad]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8fa7d6]"
                  >
                    Scopri come funziona
                    <ArrowDown className="size-3.5" />
                  </a>
                </div>
              </div>

              <figure className="relative mx-auto w-full max-w-[610px] lg:col-span-5 lg:mt-[-2rem] lg:max-w-none">
                <div className="relative h-[404px] overflow-visible sm:h-[500px] lg:h-[590px]">
                  <div className="absolute inset-x-6 bottom-0 top-8 overflow-hidden border border-white/[0.14] bg-[#151617] sm:inset-x-10 lg:left-7 lg:right-0">
                    <Image
                      src="/images/for-agencies/editorial-production-desk.webp"
                      alt=""
                      fill
                      priority
                      sizes="(max-width: 1024px) 90vw, 42vw"
                      className="object-cover object-center opacity-80"
                    />
                    <div className="absolute inset-0 bg-[#08101c]/25" />
                  </div>

                  <div className="absolute left-0 top-0 z-10 w-[410px] origin-top-left scale-[0.64] sm:left-5 sm:w-[470px] sm:scale-[0.78] lg:left-0 lg:w-[470px] lg:scale-[0.77] xl:w-[520px] xl:scale-[0.83]">
                    <ProjectCard project={showcaseProjects[0]} />
                  </div>
                  <div className="absolute bottom-[-1rem] right-[-1.5rem] z-20 hidden w-[350px] origin-bottom-right scale-[0.68] sm:block lg:right-[-2.75rem] lg:w-[390px] lg:scale-[0.73] xl:right-[-2rem]">
                    <ProjectCard project={showcaseProjects[1]} />
                  </div>

                  <p className="absolute bottom-4 left-2 z-30 max-w-[185px] border-l border-[#8fa7d6] bg-[#0b0c0d]/90 px-3 py-2 text-[8px] font-medium uppercase leading-4 tracking-[0.17em] text-[#d8e4ff] backdrop-blur-sm sm:left-7">
                    Elaborati di progetto / Concept Demo, non clienti reali
                  </p>
                  <p className="absolute right-0 top-[-0.5rem] z-30 border-y border-[#627cad]/70 bg-[#0b0c0d] px-3 py-2 text-[8px] font-medium uppercase tracking-[0.18em] text-[#8fa7d6]">
                    Layout selection
                  </p>
                  <span className="absolute bottom-[20%] right-[-0.55rem] z-20 h-14 w-px bg-[#8fa7d6]" />
                </div>
              </figure>
            </div>

            <ul className="mt-16 grid border-y border-white/[0.1] sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
              {differentiators.map((item, index) => (
                <li
                  key={item}
                  className={`flex min-h-14 items-center gap-3 border-b border-white/[0.1] px-0 py-4 text-[11px] text-zinc-200 sm:px-5 sm:even:border-l lg:border-b-0 lg:px-6 ${index === 0 ? "lg:pl-0" : ""}`}
                >
                  <span
                    className={`flex size-5 shrink-0 items-center justify-center rounded-full border text-[8px] ${index === 0 ? "border-[#627cad] bg-[#627cad]/15 text-[#8fa7d6]" : "border-white/[0.16] text-[#d6d8dc]"}`}
                  >
                    0{index + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section className="relative bg-[#111213] py-16 sm:py-20 lg:py-28">
          <Container>
            <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-8 xl:gap-x-12">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">
                  <span className="text-[#8fa7d6]">02</span>
                  <span className="h-px w-9 bg-[#627cad]/80" />
                  Il problema che risolviamo
                </div>
                <h2 className="mt-5 max-w-[690px] font-heading text-[43px] font-medium leading-[1] tracking-[-0.065em] text-white sm:text-[59px] lg:text-[72px]">
                  Più capacità produttiva, senza nuove assunzioni.
                </h2>
              </div>
              <aside className="self-end border-l border-[#627cad] bg-[#0d121c] px-5 py-5 lg:col-span-4 lg:col-start-9 lg:mb-2">
                <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#8fa7d6]">
                  Capacity, on demand
                </p>
                <p className="mt-3 text-[14px] leading-6 text-zinc-200">
                  Una produzione web attivabile quando serve, senza spostare
                  relazione, margine o direzione creativa.
                </p>
              </aside>
            </div>

            <ol className="mt-12 grid gap-x-8 gap-y-0 border-t border-white/[0.1] sm:grid-cols-2 lg:mt-16 lg:grid-cols-12 xl:gap-x-12">
              {problems.map((problem, index) => (
                <li
                  key={problem}
                  className={`group relative border-b border-white/[0.1] py-6 sm:py-8 lg:col-span-3 ${index === 1 ? "lg:mt-10" : ""} ${index === 2 ? "lg:mt-5" : ""} ${index === 3 ? "lg:mt-16" : ""}`}
                >
                  <span className="text-[10px] font-medium text-[#8d939b]">0{index + 1}</span>
                  <p className="mt-8 max-w-[250px] text-[14px] leading-6 text-zinc-200 transition group-hover:text-[#d8e4ff]">
                    {problem}
                  </p>
                  {index === 2 && <span className="absolute bottom-0 left-0 h-px w-16 bg-[#8fa7d6]" />}
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section id="come-funziona" className="scroll-mt-24 bg-[#0b0c0d] py-16 sm:py-20 lg:py-28">
          <Container>
            <div className="flex flex-col justify-between gap-6 border-b border-white/[0.1] pb-8 sm:flex-row sm:items-end lg:pb-10">
              <div className="max-w-[680px]">
                <AgencyModeLabel />
                <h2 className="mt-4 font-heading text-[39px] font-medium tracking-[-0.06em] text-white sm:text-[54px]">
                  Un passaggio di consegne, non un passaggio di controllo.
                </h2>
              </div>
              <p className="max-w-[290px] text-[12px] leading-5 text-zinc-400">
                VANTA non contatta direttamente né cerca di acquisire i clienti
                del partner senza autorizzazione.
              </p>
            </div>

            <ol className="relative mt-10 grid gap-9 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-8">
              <div className="absolute left-0 right-0 top-[51px] hidden h-px bg-white/[0.16] lg:block" />
              {processSteps.map((step, index) => (
                <li key={step.title} className="relative z-10 border-t border-white/[0.13] pt-5 lg:border-t-0">
                  <span className="inline-flex min-w-12 bg-[#0b0c0d] pr-4 font-heading text-[44px] font-medium leading-none tracking-[-0.06em] text-[#8d939b]">
                    0{index + 1}
                  </span>
                  <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.2em] text-[#8fa7d6]">
                    {step.title}
                  </p>
                  <p className="mt-3 max-w-[245px] text-[13px] leading-6 text-zinc-300">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section className="bg-[#f3f3f1] py-16 text-[#111213] sm:py-20 lg:py-28">
          <Container>
            <article className="relative overflow-hidden border border-[#bcc2cb] bg-[#fafaf8] px-6 py-8 shadow-[0_22px_60px_rgba(17,18,19,0.11)] sm:px-9 sm:py-10 lg:px-12 lg:py-14">
              <div className="pointer-events-none absolute right-0 top-0 h-px w-40 bg-[#627cad]" />
              <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-10">
                <div className="lg:col-span-7">
                  <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#50658e]">
                    Pilot engagement / VANTA white-label landing sprint
                  </p>
                  <h2 className="mt-5 max-w-[650px] font-heading text-[42px] font-medium leading-[1] tracking-[-0.065em] sm:text-[58px]">
                    Una landing page pronta per essere consegnata.
                  </h2>
                  <p className="mt-6 max-w-[580px] text-[14px] leading-6 text-[#55585c]">
                    Un primo progetto reale per verificare insieme qualità,
                    processo e affidabilità, senza vincoli continuativi.
                  </p>
                </div>
                <div className="border-l-2 border-[#627cad] pl-5 lg:col-span-4 lg:col-start-9 lg:self-end">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#50658e]">
                    Progetto pilota
                  </p>
                  <p className="mt-2 font-heading text-[56px] font-medium leading-none tracking-[-0.07em] text-[#111213] sm:text-[68px]">
                    390 €
                  </p>
                  <p className="mt-3 text-[12px] leading-5 text-[#55585c]">
                    Perimetro e condizioni definiti prima dell’avvio.
                  </p>
                </div>
              </div>

              <div className="mt-12 grid grid-cols-1 border-y border-[#d6d8dc] lg:grid-cols-12">
                <div className="py-6 lg:col-span-8 lg:pr-10">
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6b6d70]">
                    Cosa comprende l’incarico
                  </p>
                  <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
                    {sprintIncludes.map((item) => (
                      <li key={item} className="flex gap-2.5 border-t border-[#d6d8dc] py-3 text-[12px] leading-5 text-[#333538]">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-[#50658e]" strokeWidth={2.2} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-end py-6 lg:col-span-4 lg:border-l lg:border-[#d6d8dc] lg:pl-10">
                  <Link
                    href={contactHref}
                    className="inline-flex h-11 items-center gap-2 rounded-md bg-[#111213] px-5 text-[12px] font-medium text-white transition hover:bg-[#2a2c2f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111213] focus-visible:ring-offset-2"
                  >
                    Richiedi il pilot
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          </Container>
        </section>

        <section className="bg-[#111213] py-16 sm:py-20 lg:py-28">
          <Container>
            <div className="flex flex-col justify-between gap-6 border-b border-white/[0.1] pb-8 sm:flex-row sm:items-end lg:pb-10">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8fa7d6]">
                  05 / Partner index
                </p>
                <h2 className="mt-4 font-heading text-[39px] font-medium tracking-[-0.06em] text-white sm:text-[54px]">
                  Una capacità che resta dalla tua parte.
                </h2>
              </div>
              <p className="max-w-[290px] text-[12px] leading-5 text-zinc-400">
                Confini commerciali chiari, una produzione pronta ad adattarsi al
                ritmo dell’agenzia.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 border-y border-white/[0.1] sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
              {benefits.map((benefit, index) => (
                <article
                  key={benefit}
                  className={`group flex min-h-[168px] flex-col justify-between border-b border-white/[0.1] px-5 py-6 sm:px-6 lg:px-7 lg:py-8 ${index % 2 === 1 ? "sm:border-l" : ""} ${index % 4 !== 0 ? "lg:border-l" : ""} ${index >= 4 ? "lg:border-b-0" : ""}`}
                >
                  <span className={`text-[10px] font-medium ${index === 0 || index === 5 ? "text-[#8fa7d6]" : "text-[#8d939b]"}`}>
                    0{index + 1}
                  </span>
                  <p className={`mt-10 max-w-[230px] leading-[1.18] tracking-[-0.035em] transition group-hover:text-[#d8e4ff] ${index === 0 || index === 5 ? "text-[21px] text-[#d8e4ff]" : "text-[14px] text-zinc-200"}`}>
                    {benefit}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-[#0b0c0d] py-14 sm:py-16 lg:py-20">
          <Container>
            <div className="grid gap-8 border-y border-white/[0.1] py-9 sm:py-11 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <div>
                <div className="flex size-10 items-center justify-center border border-[#627cad]/65 bg-[#627cad]/10 text-[#8fa7d6]">
                  <ShieldCheck className="size-5" strokeWidth={1.55} />
                </div>
                <h2 className="mt-5 max-w-[440px] font-heading text-[29px] font-medium leading-[1.08] tracking-[-0.05em] text-white sm:text-[39px]">
                  L’infrastruttura rimane sotto il vostro controllo.
                </h2>
              </div>
              <div className="max-w-[750px] text-[13px] leading-6 text-zinc-400 sm:text-[14px] sm:leading-7">
                <p className="text-zinc-200">
                  Salvo diverso accordo scritto, il corrispettivo comprende la
                  configurazione tecnica e la pubblicazione iniziale del progetto.
                  I servizi di infrastruttura digitale, registrazione e rinnovo del
                  dominio, hosting, consumi, licenze e ulteriori servizi di terze
                  parti sono esclusi e restano intestati e fatturati direttamente
                  all’agenzia o al cliente finale.
                </p>
                <p className="mt-5">
                  VANTA potrà operare sugli ambienti messi a disposizione dal
                  Partner esclusivamente per le attività tecniche concordate. VANTA
                  non applica maggiorazioni né percepisce compensi sui servizi
                  forniti da terzi e non assume obblighi autonomi di disponibilità,
                  continuità o livelli di servizio, salvo specifico accordo scritto.
                </p>
                <p className="mt-5 border-l border-[#627cad] pl-4 text-[#d8e4ff]">
                  I costi infrastrutturali rimangono quindi separati e verificabili
                  direttamente dal Partner.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-[#f3f3f1] py-16 text-[#111213] sm:py-20 lg:py-24">
          <Container>
            <div className="flex flex-col justify-between gap-6 border-b border-[#d6d8dc] pb-9 sm:flex-row sm:items-end">
              <div className="max-w-[690px]">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#50658e]">
                  Esempi progettuali
                </p>
                <h2 className="mt-3 font-heading text-[35px] font-medium tracking-[-0.055em] sm:text-[48px]">
                  Esperienze digitali, progettate con cura.
                </h2>
                <p className="mt-4 max-w-[650px] text-[14px] leading-6 text-[#55585c]">
                  I progetti qui sotto sono Concept Demo, non clienti reali: li
                  usiamo per mostrare il tipo di interfacce e prodotti digitali che
                  possiamo progettare e realizzare.
                </p>
              </div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#50658e]">
                Concept / Not client work
              </p>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {showcaseProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-[#0b0c0d] py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
              <div>
                <AgencyModeLabel />
                <h2 className="mt-4 font-heading text-[35px] font-medium tracking-[-0.055em] text-white sm:text-[48px]">
                  Domande frequenti.
                </h2>
                <p className="mt-4 max-w-[360px] text-[14px] leading-6 text-zinc-400">
                  Condizioni chiare per capire se il primo progetto è quello
                  giusto da fare insieme.
                </p>
              </div>
              <div className="divide-y divide-white/[0.1] border-y border-white/[0.1]">
                {faqs.map((faq) => (
                  <details key={faq.question} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[14px] font-medium text-white sm:text-[15px]">
                      {faq.question}
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-white/[0.18] text-[16px] font-normal leading-none text-[#8fa7d6] transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="max-w-[700px] pt-3 pr-10 text-[13px] leading-6 text-zinc-400">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-[#0b0c0d] px-5 pb-14 sm:px-8 lg:px-12 lg:pb-16">
          <div className="relative mx-auto max-w-[1440px] overflow-hidden border border-[#627cad]/60 bg-[#11151d] px-6 py-9 sm:px-10 sm:py-11">
            <div className="pointer-events-none absolute right-10 top-0 h-px w-48 bg-[#8fa7d6]/70" />
            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-[760px]">
                <AgencyModeLabel />
                <h2 className="mt-4 font-heading text-[31px] font-medium tracking-[-0.045em] text-white sm:text-[41px]">
                  Hai già un progetto da consegnare?
                </h2>
                <p className="mt-3 text-[14px] leading-6 text-zinc-300">
                  Inviaci il brief, la scadenza e le funzionalità richieste. Ti
                  risponderemo con fattibilità, tempi e condizioni.
                </p>
              </div>
              <Link
                href={contactHref}
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-[#8fa7d6] px-5 text-[12px] font-medium text-[#10151f] transition hover:bg-[#afc2e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Proponici il primo progetto
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
