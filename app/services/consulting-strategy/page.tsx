import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Braces,
  Check,
  CheckCircle2,
  Database,
  FileCheck2,
  FileInput,
  FileStack,
  GitBranch,
  Link2,
  Network,
  RefreshCw,
  Search,
  Server,
  TimerReset,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ConsultingRoadmapDemo from "@/components/services/ConsultingRoadmapDemo";
import { ProjectCard } from "@/components/sections/Projects";
import Container from "@/components/shared/Container";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: {
    absolute: "Consulenza Software e Strategia Digitale | VANTA Systems",
  },
  description:
    "Analisi dei processi, product discovery, definizione MVP e roadmap tecnologiche per trasformare esigenze aziendali in progetti software concreti.",
  alternates: {
    canonical: "/services/consulting-strategy",
  },
  openGraph: {
    title: "Consulenza Software e Strategia Digitale | VANTA Systems",
    description:
      "Analisi dei processi, product discovery, definizione MVP e roadmap tecnologiche per trasformare esigenze aziendali in progetti software concreti.",
    url: "/services/consulting-strategy",
    siteName: "VANTA Systems",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/images/services/consulting-strategy.webp",
        width: 1672,
        height: 941,
        alt: "Dashboard strategica con roadmap di prodotto e matrice impatto-sforzo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Consulenza Software e Strategia Digitale | VANTA Systems",
    description:
      "Analisi dei processi, product discovery, definizione MVP e roadmap tecnologiche per trasformare esigenze aziendali in progetti software concreti.",
    images: ["/images/services/consulting-strategy.webp"],
  },
};

const projectProblems = [
  "Requisiti poco chiari",
  "Troppe idee senza priorità",
  "Software acquistati senza analisi",
  "Processi non mappati",
  "Budget speso su funzioni secondarie",
  "MVP troppo grande",
  "Strumenti scelti prima degli obiettivi",
  "Dipendenza da fogli di calcolo e procedure informali",
  "Difficoltà nel trasformare un’esigenza in specifiche tecniche",
];

const consultingSteps = [
  {
    icon: Search,
    title: "Discovery",
    description:
      "Comprendiamo il contesto, gli obiettivi e i problemi reali da risolvere.",
  },
  {
    icon: Activity,
    title: "Process Analysis",
    description:
      "Mappiamo attività, strumenti, dati, responsabilità e colli di bottiglia.",
  },
  {
    icon: GitBranch,
    title: "Product Strategy",
    description:
      "Definiamo priorità, funzionalità, MVP e una roadmap che abbia senso.",
  },
  {
    icon: Braces,
    title: "Technical Direction",
    description:
      "Valutiamo architettura, integrazioni, rischi e sostenibilità tecnica.",
  },
];

const consultingServices = [
  {
    title: "Analisi dei processi",
    description: "Individuiamo come il lavoro avviene oggi e dove si blocca.",
    icon: Activity,
  },
  {
    title: "Digitalizzazione operativa",
    description: "Separiamo le attività da migliorare da quelle da mantenere umane.",
    icon: Workflow,
  },
  {
    title: "Definizione requisiti",
    description: "Trasformiamo esigenze e vincoli in un perimetro comprensibile.",
    icon: FileCheck2,
  },
  {
    title: "Product discovery",
    description: "Validiamo il problema prima di decidere quali funzioni costruire.",
    icon: Search,
  },
  {
    title: "Roadmap di sviluppo",
    description: "Ordiniamo fasi, dipendenze e risultati verificabili nel tempo.",
    icon: GitBranch,
  },
  {
    title: "Definizione MVP",
    description: "Identifichiamo la prima versione utile, evitando prodotti troppo grandi.",
    icon: Zap,
  },
  {
    title: "Audit software esistente",
    description: "Valutiamo limiti, qualità e possibilità di evoluzione degli strumenti attuali.",
    icon: Server,
  },
  {
    title: "Valutazione build vs buy",
    description: "Confrontiamo soluzioni standard e custom in base al problema reale.",
    icon: RefreshCw,
  },
  {
    title: "Architettura preliminare",
    description: "Definiamo una direzione tecnica concreta senza sovraprogettare.",
    icon: Braces,
  },
  {
    title: "Strategia integrazioni",
    description: "Capire quali sistemi devono parlarsi prima di costruire nuovi silos.",
    icon: Link2,
  },
  {
    title: "Prioritizzazione funzionalità",
    description: "Distinguiamo ciò che genera valore da ciò che può aspettare.",
    icon: CheckCircle2,
  },
  {
    title: "Supporto alla selezione fornitori",
    description: "Aiutiamo a leggere opzioni, rischi e responsabilità tecniche.",
    icon: Users,
  },
];

const methodPhases = [
  {
    title: "Ascolto",
    description: "Comprendiamo obiettivi, vincoli e aspettative.",
  },
  {
    title: "Analisi",
    description: "Studiamo processi, dati, strumenti e criticità.",
  },
  {
    title: "Priorità",
    description: "Separiamo ciò che è utile da ciò che è secondario.",
  },
  {
    title: "Prototipo",
    description: "Visualizziamo la soluzione prima dello sviluppo completo.",
  },
  {
    title: "Roadmap",
    description: "Definiamo fasi, dipendenze e prossimi passi.",
  },
  {
    title: "Decisione",
    description: "Consegniamo una direzione chiara e sostenibile.",
  },
];

const deliverables = [
  "Sintesi del problema",
  "Mappa del processo",
  "Requisiti principali",
  "Priorità",
  "Proposta di MVP",
  "Roadmap",
  "Rischi",
  "Ipotesi tecniche",
  "Indicazioni sulle integrazioni",
  "Prossimi passi",
];

const audiences = [
  {
    title: "PMI che vogliono digitalizzare processi",
    description: "Per fare ordine prima di scegliere strumenti o costruire software.",
    icon: Workflow,
  },
  {
    title: "Aziende con software frammentati",
    description: "Per capire cosa collegare, sostituire o rendere più coerente.",
    icon: Network,
  },
  {
    title: "Startup che devono definire un MVP",
    description: "Per trasformare un’idea in una prima versione realmente focalizzata.",
    icon: Zap,
  },
  {
    title: "Professionisti con attività manuali",
    description: "Per individuare i passaggi ripetitivi che meritano di essere semplificati.",
    icon: TimerReset,
  },
  {
    title: "Imprese che devono sostituire un gestionale",
    description: "Per non spostare complessità e problemi in un nuovo strumento.",
    icon: Database,
  },
  {
    title: "Team con un’idea ma senza roadmap tecnica",
    description: "Per scegliere una direzione concreta prima di impegnare budget e persone.",
    icon: FileInput,
  },
];

const faqs = [
  {
    question: "Quando serve una consulenza prima dello sviluppo?",
    answer:
      "Quando il problema è complesso, le priorità non sono ancora chiare o il progetto coinvolge più processi e sistemi. Serve a evitare di costruire la cosa sbagliata con grande efficienza.",
  },
  {
    question: "Possiamo richiedere solo l’analisi senza sviluppare il progetto?",
    answer:
      "Sì. La consulenza può essere un intervento indipendente, utile per chiarire il contesto, valutare opzioni e decidere come procedere.",
  },
  {
    question: "Ci aiutate a definire un MVP?",
    answer:
      "Sì. Identifichiamo il nucleo di valore del prodotto e cosa può essere rimandato, per creare una prima versione sostenibile e verificabile.",
  },
  {
    question: "Potete valutare software già presenti?",
    answer:
      "Sì. Analizziamo processi, limiti, dati, integrazioni e possibilità di evoluzione prima di suggerire sostituzioni o nuove piattaforme.",
  },
  {
    question: "Come stabilite le priorità?",
    answer:
      "Valutiamo impatto sul processo, frequenza del problema, utenti coinvolti, rischi, dipendenze e sostenibilità della soluzione.",
  },
  {
    question:
      "La consulenza produce documentazione utilizzabile anche con altri fornitori?",
    answer:
      "Sì. I deliverable possono essere strutturati per rendere chiari problema, requisiti, priorità e direzione anche a team o fornitori diversi.",
  },
  {
    question: "Quanto dura una fase di discovery?",
    answer:
      "Dipende da numero di persone, processi e sistemi coinvolti. Definiamo il perimetro iniziale in modo proporzionato alla decisione da prendere.",
  },
  {
    question: "Quanto costa una consulenza strategica?",
    answer:
      "Dipende dal livello di analisi necessario. Dopo un primo confronto definiamo attività, output attesi e una proposta trasparente.",
  },
];

const relatedProjects = projects.filter((project) =>
  ["vanta-crm", "vanta-flow", "vanta-factory", "vanta-desk"].includes(
    project.slug,
  ),
);

export default function ConsultingStrategyPage() {
  return (
    <>
      <Navbar />

      <main className="overflow-hidden bg-[#0b0c0d] text-white">
        <section className="relative isolate pb-16 pt-10 sm:pb-20 sm:pt-12 lg:pb-24">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[680px] bg-[radial-gradient(circle_at_78%_12%,rgba(214,216,220,0.14),transparent_34%),radial-gradient(circle_at_15%_45%,rgba(141,147,155,0.1),transparent_27%)]" />

          <Container>
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 text-[12px] text-zinc-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6d8dc]"
            >
              <ArrowLeft className="size-3.5" />
              Torna ai servizi
            </Link>

            <div className="mt-10 grid items-center gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:gap-14 xl:gap-20">
              <div className="max-w-[630px]">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#a8adb4]">
                  Consulenza &amp; Strategy
                </p>
                <h1 className="mt-4 font-heading text-[42px] font-medium leading-[1.04] tracking-[-0.055em] text-white sm:text-[57px] lg:text-[64px]">
                  Trasformiamo esigenze complesse in una roadmap concreta.
                </h1>
                <p className="mt-5 max-w-[610px] text-[15px] leading-7 text-zinc-300 sm:text-[17px]">
                  Analizziamo processi, strumenti e obiettivi per definire la
                  soluzione digitale più adatta, ridurre l’incertezza e
                  costruire un piano di sviluppo sostenibile.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#d6d8dc] px-4 text-[12px] font-medium text-[#111213] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0c0d]"
                  >
                    Parliamo del tuo progetto
                    <ArrowRight className="size-3.5" />
                  </Link>
                  <a
                    href="#method"
                    className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/25 px-4 text-[12px] font-medium text-white transition hover:border-white/60 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6d8dc]"
                  >
                    Scopri il nostro metodo
                    <ArrowRight className="size-3.5" />
                  </a>
                </div>

                <div className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-[#bfc3c9]">
                  {[
                    "Decisioni più chiare",
                    "Priorità verificabili",
                    "Investimenti più consapevoli",
                  ].map((item) => (
                    <span key={item} className="inline-flex items-center gap-2">
                      <Check className="size-3" strokeWidth={2.2} />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-white/[0.12] bg-[#111213] shadow-[0_28px_80px_rgba(0,0,0,0.35)] sm:min-h-[420px] lg:min-h-[500px]">
                <Image
                  src="/images/services/consulting-strategy.webp"
                  alt="Dashboard strategica con roadmap di prodotto e matrice impatto-sforzo"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 56vw"
                  className="object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(9,10,11,0.38),transparent_48%),linear-gradient(0deg,rgba(9,10,11,0.27),transparent_38%)]" />
                <div className="absolute bottom-4 left-4 rounded-lg border border-white/[0.14] bg-black/35 px-3 py-2.5 backdrop-blur sm:bottom-5 sm:left-5">
                  <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#d6d8dc]">
                    Product direction
                  </p>
                  <p className="mt-1 text-[10px] text-zinc-300">
                    Discovery, priorità e roadmap nello stesso quadro.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-y border-white/[0.08] bg-[#111213] py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">
                  Il problema
                </p>
                <h2 className="mt-3 font-heading text-[32px] font-medium leading-[1.08] tracking-[-0.045em] text-white sm:text-[42px]">
                  Molti progetti software partono dalla soluzione sbagliata.
                </h2>
              </div>

              <div>
                <p className="max-w-[680px] text-[15px] leading-7 text-zinc-300">
                  Prima di costruire software, definiamo cosa deve davvero
                  produrre valore. Senza questa fase, si rischia di rendere più
                  veloce un processo che non è stato ancora compreso.
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {projectProblems.map((problem, index) => (
                    <article
                      key={problem}
                      className="rounded-xl border border-white/[0.09] bg-white/[0.035] p-4"
                    >
                      <span className="mb-3 flex size-7 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.045] text-[10px] font-medium text-[#d6d8dc]">
                        0{index + 1}
                      </span>
                      <p className="text-[12px] leading-5 text-zinc-200">
                        {problem}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-[#f3f3f1] py-16 text-[#111213] sm:py-20 lg:py-24">
          <Container>
            <div className="max-w-[670px]">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6b6d70]">
                Cosa facciamo
              </p>
              <h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] sm:text-[45px]">
                Definiamo cosa costruire, perché e in quale ordine.
              </h2>
              <p className="mt-4 text-[14px] leading-6 text-[#55585c]">
                La consulenza collega la conoscenza del tuo business a una
                direzione di prodotto e tecnica che il team possa usare davvero.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {consultingSteps.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="group rounded-xl border border-[#d6d8dc] bg-[#fafaf8] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#a8adb4] hover:shadow-[0_16px_32px_rgba(17,18,19,0.08)]"
                >
                  <span className="flex size-10 items-center justify-center rounded-lg border border-[#bfc3c9] bg-[#ececea] text-[#1a1b1d] transition group-hover:bg-[#d6d8dc]">
                    <Icon className="size-[19px]" strokeWidth={1.55} />
                  </span>
                  <h3 className="mt-6 font-heading text-[18px] font-medium tracking-[-0.03em]">
                    {title}
                  </h3>
                  <p className="mt-2 text-[12px] leading-5 text-[#55585c]">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-[#0b0c0d] py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div className="max-w-[680px]">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">
                  Servizi di consulenza
                </p>
                <h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] text-white sm:text-[45px]">
                  Strumenti concreti per prendere decisioni migliori.
                </h2>
              </div>
              <p className="max-w-[330px] text-[13px] leading-6 text-zinc-400">
                Il perimetro viene adattato alla decisione da prendere, non
                riempito con attività standard.
              </p>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {consultingServices.map(({ title, description, icon: Icon }) => (
                <article
                  key={title}
                  className="group rounded-xl border border-white/[0.1] bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#8d939b] hover:bg-white/[0.06]"
                >
                  <span className="flex size-8 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.045] text-[#d6d8dc]">
                    <Icon className="size-4" strokeWidth={1.65} />
                  </span>
                  <h3 className="mt-5 text-[14px] font-medium text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-[12px] leading-5 text-zinc-400">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-y border-white/[0.08] bg-[#111213] py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="max-w-[690px]">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">
                Demo interattiva
              </p>
              <h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] text-white sm:text-[45px]">
                Costruisci la tua roadmap.
              </h2>
              <p className="mt-4 text-[14px] leading-6 text-zinc-400">
                Scegli un obiettivo, il contesto attuale e una priorità: la
                simulazione compone una possibile direzione per iniziare a
                ragionare sul progetto.
              </p>
            </div>

            <div className="mt-10">
              <ConsultingRoadmapDemo />
            </div>
            <p className="mt-4 text-center text-[11px] leading-5 text-[#a8adb4]">
              Questa è una simulazione orientativa. La roadmap reale viene
              definita dopo l’analisi del contesto aziendale.
            </p>
          </Container>
        </section>

        <section className="bg-[#f3f3f1] py-16 text-[#111213] sm:py-20 lg:py-24">
          <Container>
            <div className="max-w-[680px]">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6b6d70]">
                Build vs Buy
              </p>
              <h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] sm:text-[45px]">
                Non ogni problema richiede software su misura.
              </h2>
              <p className="mt-4 text-[14px] leading-6 text-[#55585c]">
                Valutiamo la scelta più efficace per il contesto. Se una
                soluzione standard risolve bene il problema, lo diremo
                chiaramente.
              </p>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              <article className="rounded-2xl border border-[#d6d8dc] bg-[#e9e9e7] p-6 sm:p-7">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6b6d70]">
                  Software standard
                </p>
                <h3 className="mt-3 font-heading text-[24px] font-medium tracking-[-0.04em]">
                  Una soluzione già pronta da valutare bene.
                </h3>
                <ul className="mt-7 space-y-3">
                  {[
                    "Avvio più rapido",
                    "Costo iniziale prevedibile",
                    "Personalizzazione limitata",
                    "Adattamento ai processi del prodotto",
                    "Dipendenza dal fornitore",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 border-t border-[#d1d2d2] pt-3 text-[13px] text-[#55585c]"
                    >
                      <span className="size-1.5 rounded-full bg-[#8d939b]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-2xl border border-[#4b4e52] bg-[#121314] p-6 text-white sm:p-7">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">
                  Software su misura
                </p>
                <h3 className="mt-3 font-heading text-[24px] font-medium tracking-[-0.04em]">
                  Una soluzione costruita attorno al processo.
                </h3>
                <ul className="mt-7 space-y-3">
                  {[
                    "Costruito sui processi",
                    "Maggiore controllo",
                    "Integrazioni dedicate",
                    "Investimento iniziale superiore",
                    "Evoluzione progressiva",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 border-t border-white/[0.1] pt-3 text-[13px] text-zinc-300"
                    >
                      <Check className="size-3.5 text-[#d6d8dc]" strokeWidth={2.3} />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </Container>
        </section>

        <section
          id="method"
          className="scroll-mt-20 border-y border-white/[0.08] bg-[#111213] py-16 sm:py-20 lg:py-24"
        >
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">
                  Il nostro metodo
                </p>
                <h2 className="mt-3 font-heading text-[33px] font-medium tracking-[-0.05em] text-white sm:text-[43px]">
                  Una direzione prima di una lista di funzionalità.
                </h2>
                <p className="mt-4 max-w-[400px] text-[14px] leading-6 text-zinc-400">
                  Il metodo serve a ridurre l’incertezza, non a rallentare
                  l’avvio: ogni fase prepara una decisione più chiara.
                </p>
              </div>

              <ol className="relative divide-y divide-white/[0.1] border-y border-white/[0.1]">
                {methodPhases.map((phase, index) => (
                  <li
                    key={phase.title}
                    className="grid gap-3 py-5 sm:grid-cols-[56px_1fr_auto] sm:items-center"
                  >
                    <span className="flex size-9 items-center justify-center rounded-full border border-[#8d939b]/65 bg-white/[0.035] text-[10px] font-medium text-[#d6d8dc]">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="text-[15px] font-medium text-white">
                        {phase.title}
                      </h3>
                      <p className="mt-1 text-[12px] leading-5 text-zinc-400">
                        {phase.description}
                      </p>
                    </div>
                    <span className="hidden text-[10px] uppercase tracking-[0.16em] text-[#8d939b] sm:block">
                      Fase {index + 1}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </section>

        <section className="bg-[#f3f3f1] py-16 text-[#111213] sm:py-20 lg:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6b6d70]">
                  Cosa ricevi
                </p>
                <h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] sm:text-[45px]">
                  Output utilizzabili per la prossima decisione.
                </h2>
                <p className="mt-4 max-w-[500px] text-[14px] leading-6 text-[#55585c]">
                  I deliverable dipendono dal tipo di consulenza e dal contesto,
                  ma servono sempre a rendere più visibile il problema e il
                  percorso per affrontarlo.
                </p>
              </div>

              <div className="rounded-2xl border border-[#d6d8dc] bg-[#fafaf8] p-6 sm:p-8">
                <div className="flex size-10 items-center justify-center rounded-lg border border-[#bfc3c9] bg-[#ececea] text-[#1a1b1d]">
                  <FileStack className="size-5" strokeWidth={1.55} />
                </div>
                <div className="mt-7 grid gap-2 sm:grid-cols-2">
                  {deliverables.map((item) => (
                    <p
                      key={item}
                      className="flex items-center gap-2 rounded-lg border border-[#d6d8dc] bg-[#f3f3f1] px-3 py-2.5 text-[12px] text-[#36393d]"
                    >
                      <Check className="size-3.5 text-[#55585c]" strokeWidth={2.1} />
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-[#0b0c0d] py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div className="max-w-[670px]">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">
                  Per chi è utile
                </p>
                <h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] text-white sm:text-[45px]">
                  Quando serve una direzione prima di costruire.
                </h2>
              </div>
              <p className="max-w-[330px] text-[13px] leading-6 text-zinc-400">
                Un confronto strategico è utile ogni volta che una decisione
                tecnica ha conseguenze operative rilevanti.
              </p>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {audiences.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="rounded-xl border border-white/[0.1] bg-white/[0.035] p-5 transition duration-300 hover:border-[#8d939b] hover:bg-white/[0.06]"
                >
                  <Icon className="size-5 text-[#d6d8dc]" strokeWidth={1.55} />
                  <h3 className="mt-5 text-[14px] font-medium text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-[12px] leading-5 text-zinc-400">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-[#f3f3f1] py-16 text-[#111213] sm:py-20 lg:py-24">
          <Container>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div className="max-w-[650px]">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6b6d70]">
                  Concept Case Study
                </p>
                <h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] sm:text-[45px]">
                  Dalla strategia alla soluzione.
                </h2>
                <p className="mt-4 text-[14px] leading-6 text-[#55585c]">
                  Questi concept mostrano come un’esigenza definita bene possa
                  diventare una soluzione concreta, senza fingere che si tratti
                  di clienti reali.
                </p>
              </div>
              <Link
                href="/#projects"
                className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg border border-[#8d939b] px-4 text-[12px] font-medium transition hover:bg-[#111213] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111213]"
              >
                Vedi tutti i concept
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-[#0b0c0d] py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">
                  FAQ
                </p>
                <h2 className="mt-3 font-heading text-[33px] font-medium tracking-[-0.05em] text-white sm:text-[43px]">
                  Domande frequenti.
                </h2>
                <p className="mt-4 max-w-[350px] text-[14px] leading-6 text-zinc-400">
                  La consulenza serve a rendere più chiaro il prossimo passo,
                  anche quando la risposta non è costruire un nuovo software.
                </p>
              </div>

              <div className="divide-y divide-white/[0.1] border-y border-white/[0.1]">
                {faqs.map((faq) => (
                  <details key={faq.question} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[14px] font-medium text-white sm:text-[15px]">
                      {faq.question}
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-white/[0.18] text-[16px] font-normal leading-none text-[#d6d8dc] transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="max-w-[680px] pt-3 pr-10 text-[13px] leading-6 text-zinc-400">
                      {faq.answer}
                    </p>
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
              <div className="max-w-[780px]">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">
                  Dall’incertezza alla direzione
                </p>
                <h2 className="mt-3 font-heading text-[30px] font-medium tracking-[-0.045em] text-white sm:text-[40px]">
                  Una buona soluzione nasce da una domanda definita bene.
                </h2>
                <p className="mt-3 text-[14px] leading-6 text-zinc-300">
                  Raccontaci cosa vuoi migliorare. Ti aiuteremo a capire da
                  dove iniziare.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#d6d8dc] px-5 text-[12px] font-medium text-[#111213] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Richiedi una consulenza
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
