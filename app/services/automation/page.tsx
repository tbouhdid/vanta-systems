import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BellRing,
  Bot,
  Braces,
  Check,
  CheckCircle2,
  FileCheck2,
  FileStack,
  Gauge,
  GitBranch,
  KeyRound,
  Link2,
  MessageSquare,
  MonitorCheck,
  RefreshCw,
  Search,
  Server,
  ShieldCheck,
  TimerReset,
  Workflow,
  Users,
} from "lucide-react";

import AutomationWorkflowDemo from "@/components/services/AutomationWorkflowDemo";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { ProjectCard } from "@/components/sections/Projects";
import Container from "@/components/shared/Container";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: {
    absolute: "Automazione Processi Aziendali | VANTA Systems",
  },
  description:
    "Workflow, integrazioni e automazioni su misura per ridurre attività manuali, errori e tempi di gestione nei processi aziendali.",
  alternates: {
    canonical: "/services/automation",
  },
  openGraph: {
    title: "Automazione Processi Aziendali | VANTA Systems",
    description:
      "Workflow, integrazioni e automazioni su misura per ridurre attività manuali, errori e tempi di gestione nei processi aziendali.",
    url: "/services/automation",
    siteName: "VANTA Systems",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/images/services/automation.webp",
        width: 1672,
        height: 941,
        alt: "Interfaccia workflow enterprise scura con nodi collegati",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automazione Processi Aziendali | VANTA Systems",
    description:
      "Workflow, integrazioni e automazioni su misura per ridurre attività manuali, errori e tempi di gestione nei processi aziendali.",
    images: ["/images/services/automation.webp"],
  },
};

const processProblems = [
  "Inserimento manuale degli stessi dati in più strumenti",
  "Passaggi continui tra software diversi",
  "Email e notifiche inviate una alla volta",
  "Approvazioni lente e poco visibili",
  "Attività dimenticate o affidate alla memoria",
  "File duplicati e informazioni non allineate",
  "Aggiornamenti che non si sincronizzano",
  "Processi che dipendono da una sola persona",
];

const workflowSteps = [
  {
    icon: Search,
    title: "Analisi del processo",
    description:
      "Mappiamo attività, strumenti, responsabilità e punti critici prima di decidere cosa automatizzare.",
  },
  {
    icon: GitBranch,
    title: "Progettazione del workflow",
    description:
      "Definiamo trigger, condizioni, azioni, controlli ed eccezioni con una logica comprensibile.",
  },
  {
    icon: Link2,
    title: "Integrazione",
    description:
      "Colleghiamo software, API, database, email e servizi cloud in un flusso unico e affidabile.",
  },
  {
    icon: Activity,
    title: "Monitoraggio",
    description:
      "Registriamo esecuzioni, errori e risultati per mantenere ogni passaggio sempre sotto controllo.",
  },
];

const automationExamples = [
  {
    title: "Acquisizione automatica dei lead",
    description:
      "Un nuovo contatto viene acquisito, qualificato e inviato al team corretto senza passaggi manuali.",
    icon: Users,
  },
  {
    title: "Creazione e invio preventivi",
    description:
      "I dati della richiesta alimentano documenti e comunicazioni pronti per la revisione o l’invio.",
    icon: FileCheck2,
  },
  {
    title: "Onboarding clienti",
    description:
      "Checklist, messaggi, documenti e attività si attivano in modo ordinato all’avvio della collaborazione.",
    icon: MonitorCheck,
  },
  {
    title: "Aggiornamento CRM",
    description:
      "Informazioni e stati vengono aggiornati nel CRM quando un evento avviene in un altro sistema.",
    icon: RefreshCw,
  },
  {
    title: "Sincronizzazione ordini",
    description:
      "Ordini, disponibilità e avanzamenti vengono allineati tra sistemi commerciali e operativi.",
    icon: Workflow,
  },
  {
    title: "Approvazione documenti",
    description:
      "Richieste e documenti raggiungono la persona giusta, con promemoria e una traccia verificabile.",
    icon: CheckCircle2,
  },
  {
    title: "Notifiche e promemoria",
    description:
      "Il sistema avvisa le persone interessate solo quando serve davvero intervenire.",
    icon: BellRing,
  },
  {
    title: "Generazione report",
    description:
      "Dati distribuiti in più fonti diventano report periodici e leggibili, senza estrazioni manuali.",
    icon: Gauge,
  },
  {
    title: "Gestione ticket",
    description:
      "Nuove richieste vengono classificate, assegnate e aggiornate con regole coerenti.",
    icon: MessageSquare,
  },
  {
    title: "Backup e archiviazione",
    description:
      "File e dati importanti vengono archiviati secondo regole definite e facilmente consultabili.",
    icon: FileStack,
  },
  {
    title: "Flussi amministrativi",
    description:
      "Scadenze, raccolta dati e passaggi approvativi diventano attività guidate e tracciate.",
    icon: TimerReset,
  },
  {
    title: "Automazioni AI",
    description:
      "Classificazione, sintesi e instradamento dei contenuti supportano il lavoro del team nei punti ripetitivi.",
    icon: Bot,
  },
];

const beforeItems = [
  "Copia manuale dei dati",
  "Email inviate una alla volta",
  "Attività affidate alla memoria",
  "Strumenti non sincronizzati",
  "Scarsa visibilità sul processo",
];

const afterItems = [
  "Dati sincronizzati",
  "Notifiche automatiche",
  "Attività generate dal sistema",
  "Workflow monitorati",
  "Log e stato sempre disponibili",
];

const projectPhases = [
  {
    title: "Analisi",
    description: "Comprendiamo il processo attuale e gli obiettivi.",
  },
  {
    title: "Mappatura",
    description: "Individuiamo trigger, decisioni, dati ed eccezioni.",
  },
  {
    title: "Prototipo",
    description: "Costruiamo una prima versione verificabile del workflow.",
  },
  {
    title: "Implementazione",
    description: "Colleghiamo i sistemi e testiamo tutti gli scenari.",
  },
  {
    title: "Monitoraggio",
    description:
      "Controlliamo esecuzioni, anomalie e possibili miglioramenti.",
  },
];

const integrations = [
  "CRM",
  "ERP",
  "Email",
  "Moduli web",
  "Database",
  "Fogli di calcolo",
  "E-commerce",
  "Sistemi documentali",
  "Servizi cloud",
  "API di terze parti",
  "Strumenti di messaggistica",
  "Modelli AI",
];

const reliabilityPoints = [
  {
    title: "Log delle esecuzioni",
    description:
      "Ogni passaggio importante lascia una traccia consultabile dal team.",
    icon: FileStack,
  },
  {
    title: "Gestione degli errori",
    description:
      "Prevediamo anomalie, notifiche e casi in cui serve una verifica umana.",
    icon: ShieldCheck,
  },
  {
    title: "Retry automatici",
    description:
      "Le operazioni temporaneamente non disponibili possono essere ritentate con regole definite.",
    icon: RefreshCw,
  },
  {
    title: "Permessi e protezione dati",
    description:
      "Accessi, dati scambiati e responsabilità vengono progettati con il giusto livello di controllo.",
    icon: KeyRound,
  },
];

const technologies = [
  "API REST",
  "Webhook",
  "Node.js",
  "TypeScript",
  "Database",
  "Code e processi asincroni",
  "Servizi cloud",
  "AI integrations",
];

const faqs = [
  {
    question: "Quali processi possono essere automatizzati?",
    answer:
      "Quelli ripetitivi, misurabili e basati su regole o eventi: passaggi di dati, notifiche, approvazioni, aggiornamenti tra sistemi e attività operative. Li valutiamo insieme a partire dal flusso reale.",
  },
  {
    question: "Possiamo integrare software già presenti in azienda?",
    answer:
      "Sì. Se uno strumento espone un’API, webhook o un modo sicuro per scambiare dati, possiamo valutarne l’integrazione nel workflow.",
  },
  {
    question: "Cosa succede se un’automazione genera un errore?",
    answer:
      "Progettiamo log, notifiche, retry e punti di controllo manuale. L’obiettivo è rendere le anomalie visibili e gestibili, non nasconderle.",
  },
  {
    question: "È possibile mantenere approvazioni manuali?",
    answer:
      "Sì. Un workflow può preparare dati e attività, fermarsi per una conferma e proseguire soltanto dopo l’approvazione della persona responsabile.",
  },
  {
    question: "Quanto tempo serve per realizzare un workflow?",
    answer:
      "Dipende da sistemi coinvolti, eccezioni e criticità. Un primo flusso mirato può essere prototipato rapidamente; il perimetro viene chiarito durante l’analisi.",
  },
  {
    question: "Possiamo iniziare automatizzando un solo processo?",
    answer:
      "Sì. Spesso è il modo migliore per validare il metodo, ottenere un primo miglioramento concreto e costruire una base riutilizzabile.",
  },
  {
    question: "Offrite monitoraggio e manutenzione?",
    answer:
      "Sì. Possiamo affiancare il team con controllo delle esecuzioni, manutenzione, evolutive e ottimizzazione nel tempo.",
  },
];

const flowProjects = projects.filter((project) => project.slug === "vanta-flow");

export default function AutomationPage() {
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
                  Automazioni
                </p>
                <h1 className="mt-4 font-heading text-[42px] font-medium leading-[1.04] tracking-[-0.055em] text-white sm:text-[57px] lg:text-[64px]">
                  Trasforma i processi manuali in flussi automatici.
                </h1>
                <p className="mt-5 max-w-[600px] text-[15px] leading-7 text-zinc-300 sm:text-[17px]">
                  Progettiamo automazioni che collegano strumenti, dati e persone,
                  riducendo attività ripetitive, errori operativi e tempi di
                  gestione.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#d6d8dc] px-4 text-[12px] font-medium text-[#111213] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0c0d]"
                  >
                    Analizziamo il tuo processo
                    <ArrowRight className="size-3.5" />
                  </Link>
                  <Link
                    href="/projects/vanta-flow"
                    className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/25 px-4 text-[12px] font-medium text-white transition hover:border-white/60 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6d8dc]"
                  >
                    Esplora VANTA FLOW
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>

                <div className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-[#bfc3c9]">
                  {[
                    "Workflow misurabili",
                    "Integrazioni affidabili",
                    "Controllo sempre visibile",
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
                  src="/images/services/automation.webp"
                  alt="Interfaccia workflow enterprise scura con nodi collegati"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 56vw"
                  className="object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(9,10,11,0.38),transparent_48%),linear-gradient(0deg,rgba(9,10,11,0.27),transparent_38%)]" />
                <div className="absolute bottom-4 left-4 rounded-lg border border-white/[0.14] bg-black/35 px-3 py-2.5 backdrop-blur sm:bottom-5 sm:left-5">
                  <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#d6d8dc]">
                    Workflow orchestration
                  </p>
                  <p className="mt-1 text-[10px] text-zinc-300">
                    Trigger, decisioni e azioni nello stesso flusso.
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
                  Il lavoro ripetitivo rallenta le persone e aumenta gli errori.
                </h2>
              </div>

              <div>
                <p className="max-w-[680px] text-[15px] leading-7 text-zinc-300">
                  Quando un processo vive tra inbox, fogli, gestionali e messaggi
                  personali, le persone diventano il collegamento fragile tra i
                  sistemi. L’automazione elimina passaggi inutili senza togliere
                  controllo al team.
                </p>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {processProblems.map((problem) => (
                    <li
                      key={problem}
                      className="rounded-xl border border-white/[0.09] bg-white/[0.035] p-4 text-[12px] leading-5 text-zinc-200"
                    >
                      <span className="mb-3 flex size-7 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.045] text-[#d6d8dc]">
                        <Check className="size-3.5" strokeWidth={2} />
                      </span>
                      {problem}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-[#f3f3f1] py-16 text-[#111213] sm:py-20 lg:py-24">
          <Container>
            <div className="max-w-[660px]">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6b6d70]">
                La soluzione VANTA
              </p>
              <h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] sm:text-[45px]">
                Disegniamo workflow che lavorano insieme al tuo team.
              </h2>
              <p className="mt-4 text-[14px] leading-6 text-[#55585c]">
                Partiamo dal processo reale, includendo ciò che deve restare
                umano e rendendo automatico il resto in modo leggibile.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {workflowSteps.map(({ icon: Icon, title, description }) => (
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
              <div className="max-w-[670px]">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">
                  Esempi di automazioni
                </p>
                <h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] text-white sm:text-[45px]">
                  Meno passaggi manuali, più continuità nel processo.
                </h2>
              </div>
              <p className="max-w-[340px] text-[13px] leading-6 text-zinc-400">
                Questi sono esempi di flussi realizzabili: il perimetro viene
                definito sui ruoli, i dati e gli strumenti già in uso.
              </p>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {automationExamples.map(({ title, description, icon: Icon }) => (
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
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-[660px]">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">
                  Demo interattiva
                </p>
                <h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] text-white sm:text-[45px]">
                  Prova la logica di un workflow.
                </h2>
                <p className="mt-4 text-[14px] leading-6 text-zinc-400">
                  Configura un passaggio essenziale e avvia una simulazione:
                  è una rappresentazione semplice di come un flusso può
                  orchestrare eventi, decisioni e azioni.
                </p>
              </div>
              <Link
                href="/projects/vanta-flow"
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-white/25 px-4 text-[12px] font-medium text-white transition hover:border-white/60 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6d8dc]"
              >
                Vedi la demo completa
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="mt-10">
              <AutomationWorkflowDemo />
            </div>
            <p className="mt-4 text-center text-[11px] leading-5 text-[#a8adb4]">
              Demo dimostrativa: ogni automazione viene progettata sui processi
              e sugli strumenti reali dell’azienda.
            </p>
          </Container>
        </section>

        <section className="bg-[#f3f3f1] py-16 text-[#111213] sm:py-20 lg:py-24">
          <Container>
            <div className="max-w-[660px]">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6b6d70]">
                Prima e dopo
              </p>
              <h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] sm:text-[45px]">
                Il processo resta tuo. Cambia il modo in cui scorre.
              </h2>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              <article className="rounded-2xl border border-[#d6d8dc] bg-[#e9e9e7] p-6 sm:p-7">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6b6d70]">
                  Prima
                </p>
                <h3 className="mt-3 font-heading text-[24px] font-medium tracking-[-0.04em]">
                  Operazioni affidate a passaggi sparsi.
                </h3>
                <ul className="mt-7 space-y-3">
                  {beforeItems.map((item) => (
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
                  Dopo
                </p>
                <h3 className="mt-3 font-heading text-[24px] font-medium tracking-[-0.04em]">
                  Un workflow guidato, visibile e controllabile.
                </h3>
                <ul className="mt-7 space-y-3">
                  {afterItems.map((item) => (
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

        <section className="border-y border-white/[0.08] bg-[#111213] py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">
                  Processo di lavoro
                </p>
                <h2 className="mt-3 font-heading text-[33px] font-medium tracking-[-0.05em] text-white sm:text-[43px]">
                  Dalla mappa del processo a un flusso affidabile.
                </h2>
                <p className="mt-4 max-w-[390px] text-[14px] leading-6 text-zinc-400">
                  Procediamo per fasi brevi e verificabili, mantenendo chiaro
                  cosa accade in ogni passaggio e perché.
                </p>
              </div>

              <ol className="relative divide-y divide-white/[0.1] border-y border-white/[0.1]">
                {projectPhases.map((phase, index) => (
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
                  Integrazioni
                </p>
                <h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] sm:text-[45px]">
                  I tuoi strumenti, un processo più continuo.
                </h2>
                <p className="mt-4 max-w-[480px] text-[14px] leading-6 text-[#55585c]">
                  Se uno strumento espone un’API o consente lo scambio di dati,
                  possiamo valutarne l’integrazione nel workflow.
                </p>
              </div>

              <div className="rounded-2xl border border-[#d6d8dc] bg-[#fafaf8] p-6 sm:p-8">
                <div className="flex size-10 items-center justify-center rounded-lg border border-[#bfc3c9] bg-[#ececea] text-[#1a1b1d]">
                  <Link2 className="size-5" strokeWidth={1.55} />
                </div>
                <div className="mt-7 flex flex-wrap gap-2.5">
                  {integrations.map((integration) => (
                    <span
                      key={integration}
                      className="rounded-full border border-[#bfc3c9] bg-[#f3f3f1] px-3.5 py-2 text-[12px] text-[#36393d]"
                    >
                      {integration}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-[#0b0c0d] py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">
                  Affidabilità e controllo
                </p>
                <h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] text-white sm:text-[45px]">
                  Automatico non significa fuori controllo.
                </h2>
                <p className="mt-4 max-w-[450px] text-[14px] leading-6 text-zinc-400">
                  Un buon workflow non è una scatola nera: chi lo usa deve poter
                  capire cosa è successo, intervenire e proteggere i dati.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {reliabilityPoints.map(({ title, description, icon: Icon }) => (
                  <article
                    key={title}
                    className="rounded-xl border border-white/[0.1] bg-white/[0.035] p-5 transition duration-300 hover:border-[#8d939b] hover:bg-white/[0.06]"
                  >
                    <Icon
                      className="size-5 text-[#d6d8dc]"
                      strokeWidth={1.55}
                    />
                    <h3 className="mt-5 text-[14px] font-medium text-white">
                      {title}
                    </h3>
                    <p className="mt-2 text-[12px] leading-5 text-zinc-400">
                      {description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="border-y border-[#d6d8dc] bg-[#f3f3f1] py-16 text-[#111213] sm:py-20 lg:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6b6d70]">
                  Tecnologie
                </p>
                <h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] sm:text-[45px]">
                  La tecnologia segue il processo, non il contrario.
                </h2>
                <p className="mt-4 max-w-[500px] text-[14px] leading-6 text-[#55585c]">
                  L’architettura viene scelta in base a volume, criticità,
                  continuità operativa e strumenti già usati dall’azienda. Il
                  risultato deve essere robusto quanto serve, senza complessità
                  superflua.
                </p>
              </div>

              <div className="rounded-2xl border border-[#d6d8dc] bg-[#fafaf8] p-6 sm:p-8">
                <div className="flex size-10 items-center justify-center rounded-lg border border-[#bfc3c9] bg-[#ececea] text-[#1a1b1d]">
                  <Braces className="size-5" strokeWidth={1.55} />
                </div>
                <div className="mt-7 flex flex-wrap gap-2.5">
                  {technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-[#bfc3c9] bg-[#f3f3f1] px-3.5 py-2 text-[12px] text-[#36393d]"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
                <div className="mt-7 border-t border-[#d6d8dc] pt-5">
                  <p className="flex items-center gap-2 text-[12px] font-medium">
                    <Server className="size-4 text-[#55585c]" />
                    Integrazioni solide, eventi tracciabili e processi
                    asincroni quando servono.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-[#f3f3f1] pb-16 text-[#111213] sm:pb-20 lg:pb-24">
          <Container>
            <div className="flex flex-col justify-between gap-6 border-t border-[#d6d8dc] pt-14 sm:flex-row sm:items-end sm:pt-16">
              <div className="max-w-[620px]">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6b6d70]">
                  Concept Case Study
                </p>
                <h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] sm:text-[45px]">
                  Esplora una soluzione dimostrativa.
                </h2>
                <p className="mt-4 text-[14px] leading-6 text-[#55585c]">
                  VANTA FLOW mostra come workflow, integrazioni e controlli
                  possono diventare un prodotto concreto, adattabile ai tuoi
                  processi.
                </p>
              </div>
              <Link
                href="/projects/vanta-flow"
                className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg border border-[#8d939b] px-4 text-[12px] font-medium transition hover:bg-[#111213] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111213]"
              >
                Apri VANTA FLOW
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="mt-10 max-w-[440px]">
              {flowProjects.map((project) => (
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
                  Ogni flusso ha un contesto diverso. L’analisi iniziale serve
                  proprio a individuare quello utile da automatizzare.
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
                  Dalla ripetizione al controllo
                </p>
                <h2 className="mt-3 font-heading text-[30px] font-medium tracking-[-0.045em] text-white sm:text-[40px]">
                  Se un’attività viene ripetuta ogni giorno, probabilmente può
                  essere migliorata.
                </h2>
                <p className="mt-3 text-[14px] leading-6 text-zinc-300">
                  Raccontaci il processo che oggi richiede più tempo.
                  Valuteremo insieme come semplificarlo.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#d6d8dc] px-5 text-[12px] font-medium text-[#111213] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Richiedi un’analisi
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
