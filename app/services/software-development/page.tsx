import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  AppWindow,
  ArrowLeft,
  ArrowRight,
  Braces,
  Check,
  Cloud,
  Code2,
  Database,
  FileStack,
  LayoutDashboard,
  Rocket,
  Search,
  Server,
  Users,
  Workflow,
} from "lucide-react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { ProjectCard } from "@/components/sections/Projects";
import Container from "@/components/shared/Container";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: {
    absolute: "Sviluppo Software su Misura | VANTA Systems",
  },
  description:
    "Applicazioni web, CRM, gestionali e piattaforme software sviluppate su misura per i processi della tua azienda.",
  alternates: {
    canonical: "/services/software-development",
  },
  openGraph: {
    title: "Sviluppo Software su Misura | VANTA Systems",
    description:
      "Applicazioni web, CRM, gestionali e piattaforme software sviluppate su misura per i processi della tua azienda.",
    url: "/services/software-development",
    siteName: "VANTA Systems",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/images/services/software-development.webp",
        width: 1672,
        height: 941,
        alt: "Laptop premium con dashboard software enterprise scura",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sviluppo Software su Misura | VANTA Systems",
    description:
      "Applicazioni web, CRM, gestionali e piattaforme software sviluppate su misura per i processi della tua azienda.",
    images: ["/images/services/software-development.webp"],
  },
};

const processProblems = [
  "Processi frammentati tra fogli Excel e strumenti diversi",
  "Dati importanti difficili da trovare e leggere",
  "Attività manuali che rallentano persone e reparti",
  "Software rigidi che impongono il loro modo di lavorare",
];

const solutionSteps = [
  {
    icon: Search,
    title: "Analisi dei processi",
    description: "Partiamo da chi usa il software ogni giorno, dai passaggi reali e dai dati che oggi rallentano il lavoro.",
  },
  {
    icon: LayoutDashboard,
    title: "Progettazione dell’esperienza",
    description: "Disegniamo flussi e interfacce essenziali, perché un prodotto solido deve essere anche chiaro da usare.",
  },
  {
    icon: Code2,
    title: "Sviluppo iterativo",
    description: "Costruiamo per cicli brevi, condividendo avanzamenti concreti e mantenendo le priorità sotto controllo.",
  },
  {
    icon: Rocket,
    title: "Rilascio e crescita",
    description: "Prepariamo il go-live e una base tecnica pronta a evolvere insieme alla tua organizzazione.",
  },
];

const products = [
  { title: "CRM personalizzati", icon: Users },
  { title: "Gestionali aziendali", icon: Database },
  { title: "Portali clienti", icon: FileStack },
  { title: "Dashboard operative", icon: LayoutDashboard },
  { title: "Applicazioni web", icon: AppWindow },
  { title: "Sistemi interni", icon: Workflow },
  { title: "Piattaforme SaaS", icon: Cloud },
  { title: "MVP", icon: Rocket },
];

const projectPhases = [
  {
    title: "Discovery",
    description: "Obiettivi, persone coinvolte e scenario attuale.",
  },
  {
    title: "Analisi",
    description: "Processi, dati, vincoli e opportunità da prioritizzare.",
  },
  {
    title: "Prototipo",
    description: "Flussi e interfacce da validare prima di costruire.",
  },
  {
    title: "Sviluppo",
    description: "Implementazione incrementale con rilasci verificabili.",
  },
  {
    title: "Rilascio",
    description: "Go-live, formazione e fondamenta per l’evoluzione.",
  },
];

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "API REST",
  "Database SQL/NoSQL",
  "Cloud",
  "AI integrations",
];

const faqs = [
  {
    question: "Quanto costa sviluppare un software su misura?",
    answer:
      "Il costo dipende da obiettivi, integrazioni, ruoli e complessità. Dopo la discovery definiamo priorità, rilasci e una proposta trasparente, calibrata sul progetto.",
  },
  {
    question: "Quanto tempo richiede il progetto?",
    answer:
      "Un MVP focalizzato può essere rilasciato in poche settimane; piattaforme più articolate vengono costruite per fasi. Prima di iniziare condividiamo una roadmap realistica.",
  },
  {
    question: "È possibile partire da un MVP?",
    answer:
      "Sì. Possiamo identificare il nucleo di valore, sviluppare una prima versione utile e costruire da subito un’architettura pronta a evolvere.",
  },
  {
    question: "Possiamo integrare software già esistenti?",
    answer:
      "Sì. CRM, ERP, database, servizi cloud e strumenti verticali possono diventare parte di un ecosistema più coerente tramite API, webhook o connettori dedicati.",
  },
  {
    question: "Offrite manutenzione dopo il rilascio?",
    answer:
      "Sì. Possiamo affiancare il team con manutenzione, monitoraggio, evolutive e supporto continuo dopo il go-live.",
  },
];

const relatedProjects = projects.filter((project) =>
  ["vanta-crm", "vanta-factory", "vanta-desk"].includes(project.slug),
);

export default function SoftwareDevelopmentPage() {
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
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#a8adb4]">Sviluppo software</p>
                <h1 className="mt-4 font-heading text-[42px] font-medium leading-[1.04] tracking-[-0.055em] text-white sm:text-[57px] lg:text-[64px]">Software costruito attorno alla tua azienda.</h1>
                <p className="mt-5 max-w-[610px] text-[15px] leading-7 text-zinc-300 sm:text-[17px]">Progettiamo applicazioni web, gestionali, CRM e piattaforme digitali sviluppate sui processi, sugli obiettivi e sulle esigenze reali del tuo business.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/contact" className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#d6d8dc] px-4 text-[12px] font-medium text-[#111213] transition hover:bg-white">
                    Parliamo del tuo progetto <ArrowRight className="size-3.5" />
                  </Link>
                  <a href="#case-studies" className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/25 px-4 text-[12px] font-medium text-white transition hover:border-white/60 hover:bg-white/5">
                    Esplora i case study <ArrowRight className="size-3.5" />
                  </a>
                </div>
                <div className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-[#bfc3c9]">
                  {["Software su misura", "Architetture scalabili", "Interfacce pensate per le persone"].map((item) => <span key={item} className="inline-flex items-center gap-2"><Check className="size-3" strokeWidth={2.2} />{item}</span>)}
                </div>
              </div>

              <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-white/[0.12] bg-[#111213] shadow-[0_28px_80px_rgba(0,0,0,0.35)] sm:min-h-[420px] lg:min-h-[500px]">
                <Image
                  src="/images/services/software-development.webp"
                  alt="Laptop premium con dashboard software enterprise scura"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 56vw"
                  className="object-cover object-right"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(9,10,11,0.45),transparent_48%),linear-gradient(0deg,rgba(9,10,11,0.24),transparent_38%)]" />
                <div className="absolute bottom-4 left-4 rounded-lg border border-white/[0.14] bg-black/35 px-3 py-2.5 backdrop-blur sm:bottom-5 sm:left-5">
                  <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#d6d8dc]">Enterprise software</p>
                  <p className="mt-1 text-[10px] text-zinc-300">Interfacce chiare per operazioni complesse.</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-y border-white/[0.08] bg-[#111213] py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">Il problema</p>
                <h2 className="mt-3 font-heading text-[32px] font-medium leading-[1.08] tracking-[-0.045em] text-white sm:text-[42px]">Il software standard spesso costringe l’azienda ad adattarsi.</h2>
              </div>
              <div>
                <p className="max-w-[660px] text-[15px] leading-7 text-zinc-300">Quando il lavoro quotidiano viene spezzato tra strumenti rigidi, file personali e passaggi manuali, le persone compensano con tempo e attenzione. Il risultato è poca visibilità e meno spazio per migliorare davvero.</p>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {processProblems.map((problem) => <li key={problem} className="rounded-xl border border-white/[0.09] bg-white/[0.035] p-4 text-[12px] leading-5 text-zinc-200"><span className="mb-3 flex size-7 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.045] text-[#d6d8dc]"><Check className="size-3.5" strokeWidth={2} /></span>{problem}</li>)}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-[#f3f3f1] py-16 text-[#111213] sm:py-20 lg:py-24">
          <Container>
            <div className="max-w-[650px]">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6b6d70]">La soluzione VANTA</p>
              <h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] sm:text-[45px]">Costruiamo il software intorno al processo.</h2>
              <p className="mt-4 text-[14px] leading-6 text-[#55585c]">Ogni progetto parte da come lavora davvero la tua azienda, non da un catalogo di funzioni da adattare.</p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {solutionSteps.map(({ icon: Icon, title, description }) => <article key={title} className="group rounded-xl border border-[#d6d8dc] bg-[#fafaf8] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#a8adb4] hover:shadow-[0_16px_32px_rgba(17,18,19,0.08)]"><span className="flex size-10 items-center justify-center rounded-lg border border-[#bfc3c9] bg-[#ececea] text-[#1a1b1d] transition group-hover:bg-[#d6d8dc]"><Icon className="size-[19px]" strokeWidth={1.55} /></span><h3 className="mt-6 font-heading text-[18px] font-medium tracking-[-0.03em]">{title}</h3><p className="mt-2 text-[12px] leading-5 text-[#55585c]">{description}</p></article>)}
            </div>
          </Container>
        </section>

        <section className="bg-[#0b0c0d] py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div className="max-w-[660px]"><p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">Cosa possiamo sviluppare</p><h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] text-white sm:text-[45px]">Prodotti che semplificano il lavoro reale.</h2></div>
              <p className="max-w-[330px] text-[13px] leading-6 text-zinc-400">Ogni soluzione può connettersi agli strumenti esistenti e crescere per fasi.</p>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {products.map(({ title, icon: Icon }) => <article key={title} className="group flex min-h-32 flex-col justify-between rounded-xl border border-white/[0.1] bg-white/[0.035] p-4 transition duration-300 hover:-translate-y-1 hover:border-[#8d939b] hover:bg-white/[0.06]"><span className="flex size-8 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.045] text-[#d6d8dc]"><Icon className="size-4" strokeWidth={1.65} /></span><h3 className="mt-7 text-[13px] font-medium text-white">{title}</h3></article>)}
            </div>
          </Container>
        </section>

        <section className="border-y border-white/[0.08] bg-[#111213] py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <div><p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">Processo di lavoro</p><h2 className="mt-3 font-heading text-[33px] font-medium tracking-[-0.05em] text-white sm:text-[43px]">Un percorso leggibile dall’idea al rilascio.</h2><p className="mt-4 max-w-[380px] text-[14px] leading-6 text-zinc-400">Il metodo è sufficientemente strutturato per prendere decisioni, ma abbastanza flessibile per affrontare ciò che scopriamo insieme.</p></div>
              <ol className="relative divide-y divide-white/[0.1] border-y border-white/[0.1]">
                {projectPhases.map((phase, index) => <li key={phase.title} className="grid gap-3 py-5 sm:grid-cols-[56px_1fr_auto] sm:items-center"><span className="flex size-9 items-center justify-center rounded-full border border-[#8d939b]/65 bg-white/[0.035] text-[10px] font-medium text-[#d6d8dc]">0{index + 1}</span><div><h3 className="text-[15px] font-medium text-white">{phase.title}</h3><p className="mt-1 text-[12px] leading-5 text-zinc-400">{phase.description}</p></div><span className="hidden text-[10px] uppercase tracking-[0.16em] text-[#8d939b] sm:block">Fase {index + 1}</span></li>)}
              </ol>
            </div>
          </Container>
        </section>

        <section className="bg-[#f3f3f1] py-16 text-[#111213] sm:py-20 lg:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
              <div><p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6b6d70]">Tecnologie</p><h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] sm:text-[45px]">Tecnologia scelta per il progetto, non per abitudine.</h2><p className="mt-4 max-w-[470px] text-[14px] leading-6 text-[#55585c]">Scegliamo lo stack in base a utenti, integrazioni, sicurezza, roadmap e capacità di evoluzione. L’obiettivo non è usare più tecnologia: è usare quella giusta.</p></div>
              <div className="rounded-2xl border border-[#d6d8dc] bg-[#fafaf8] p-6 sm:p-8"><div className="flex size-10 items-center justify-center rounded-lg border border-[#bfc3c9] bg-[#ececea] text-[#1a1b1d]"><Braces className="size-5" strokeWidth={1.55} /></div><div className="mt-7 flex flex-wrap gap-2.5">{technologies.map((technology) => <span key={technology} className="rounded-full border border-[#bfc3c9] bg-[#f3f3f1] px-3.5 py-2 text-[12px] text-[#36393d]">{technology}</span>)}</div><div className="mt-7 border-t border-[#d6d8dc] pt-5"><p className="flex items-center gap-2 text-[12px] font-medium"><Server className="size-4 text-[#55585c]" />Architetture solide, senza complessità superflua.</p></div></div>
            </div>
          </Container>
        </section>

        <section id="case-studies" className="bg-[#f3f3f1] pb-16 text-[#111213] sm:pb-20 lg:pb-24">
          <Container>
            <div className="flex flex-col justify-between gap-6 border-t border-[#d6d8dc] pt-14 sm:flex-row sm:items-end sm:pt-16">
              <div className="max-w-[620px]"><p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6b6d70]">Concept Case Study</p><h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] sm:text-[45px]">Esempi di soluzioni realizzabili.</h2><p className="mt-4 text-[14px] leading-6 text-[#55585c]">Non sono clienti reali: sono demo interattive che mostrano cosa possiamo progettare attorno a processi specifici.</p></div>
              <Link href="/#projects" className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg border border-[#8d939b] px-4 text-[12px] font-medium transition hover:bg-[#111213] hover:text-white">Vedi tutti i concept <ArrowRight className="size-3.5" /></Link>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">{relatedProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
          </Container>
        </section>

        <section className="bg-[#0b0c0d] py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20"><div><p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">FAQ</p><h2 className="mt-3 font-heading text-[33px] font-medium tracking-[-0.05em] text-white sm:text-[43px]">Domande frequenti.</h2><p className="mt-4 max-w-[340px] text-[14px] leading-6 text-zinc-400">Se hai un contesto particolare, raccontacelo: la prima consulenza serve proprio a chiarire il perimetro.</p></div><div className="divide-y divide-white/[0.1] border-y border-white/[0.1]">{faqs.map((faq) => <details key={faq.question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[14px] font-medium text-white sm:text-[15px]">{faq.question}<span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-white/[0.18] text-[16px] font-normal leading-none text-[#d6d8dc] transition group-open:rotate-45">+</span></summary><p className="max-w-[680px] pt-3 pr-10 text-[13px] leading-6 text-zinc-400">{faq.answer}</p></details>)}</div></div>
          </Container>
        </section>

        <section className="bg-[#0b0c0d] px-5 pb-14 sm:px-8 lg:px-12 lg:pb-16">
          <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-2xl border border-[#4b4e52] bg-[#121314] px-6 py-9 sm:px-10 sm:py-11"><div className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#bfc3c9]/15 blur-[90px]" /><div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between"><div className="max-w-[760px]"><p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">Dall’idea al prodotto</p><h2 className="mt-3 font-heading text-[30px] font-medium tracking-[-0.045em] text-white sm:text-[40px]">Il software deve adattarsi alla tua azienda. Non il contrario.</h2><p className="mt-3 text-[14px] leading-6 text-zinc-300">Raccontaci come lavori oggi e cosa vorresti migliorare.</p></div><Link href="/contact" className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#d6d8dc] px-5 text-[12px] font-medium text-[#111213] transition hover:bg-white">Richiedi una consulenza <ArrowRight className="size-3.5" /></Link></div></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
