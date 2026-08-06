import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Bot,
  Braces,
  Check,
  CheckCircle2,
  Cloud,
  Database,
  FileCheck2,
  FileInput,
  FileStack,
  GitBranch,
  KeyRound,
  Link2,
  Network,
  Radio,
  RefreshCw,
  Search,
  Server,
  ShieldCheck,
  ShoppingBag,
  TimerReset,
  Users,
  Webhook,
  Workflow,
  Zap,
} from "lucide-react";

import Footer from "@/components/layout/Footer";
import SystemIntegrationDemo from "@/components/services/SystemIntegrationDemo";
import { ProjectCard } from "@/components/sections/Projects";
import Container from "@/components/shared/Container";
import Navbar from "@/components/layout/Navbar";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: {
    absolute: "Integrazioni Software e API | VANTA Systems",
  },
  description:
    "Integrazioni su misura tra CRM, ERP, database, servizi cloud e API per sincronizzare dati e processi aziendali.",
  alternates: {
    canonical: "/services/system-integration",
  },
  openGraph: {
    title: "Integrazioni Software e API | VANTA Systems",
    description:
      "Integrazioni su misura tra CRM, ERP, database, servizi cloud e API per sincronizzare dati e processi aziendali.",
    url: "/services/system-integration",
    siteName: "VANTA Systems",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/images/services/system-integration.webp",
        width: 1672,
        height: 941,
        alt: "Dashboard enterprise con sistemi collegati a un API Gateway",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Integrazioni Software e API | VANTA Systems",
    description:
      "Integrazioni su misura tra CRM, ERP, database, servizi cloud e API per sincronizzare dati e processi aziendali.",
    images: ["/images/services/system-integration.webp"],
  },
};

const integrationProblems = [
  "Dati copiati manualmente",
  "Informazioni diverse tra CRM, ERP e fogli di calcolo",
  "Errori di sincronizzazione",
  "Aggiornamenti in ritardo",
  "Processi interrotti",
  "Software isolati",
  "Esportazioni e importazioni continue",
  "Scarsa visibilità sul flusso dei dati",
];

const solutionSteps = [
  {
    icon: Search,
    title: "Analisi dell’ecosistema",
    description:
      "Mappiamo software, database, flussi e dipendenze per capire dove il dato si interrompe.",
  },
  {
    icon: GitBranch,
    title: "Progettazione dell’integrazione",
    description:
      "Definiamo API, eventi, trasformazioni e responsabilità con una logica chiara.",
  },
  {
    icon: Link2,
    title: "Implementazione",
    description:
      "Colleghiamo i sistemi gestendo autenticazione, validazione e sincronizzazione.",
  },
  {
    icon: Activity,
    title: "Monitoraggio",
    description:
      "Controlliamo disponibilità, errori, log e qualità dei dati nel tempo.",
  },
];

const integrationCatalog = [
  {
    title: "CRM",
    description: "Clienti, lead, attività e trattative allineati con gli altri processi.",
    icon: Users,
  },
  {
    title: "ERP",
    description: "Ordini, magazzino, amministrazione e produzione connessi.",
    icon: Server,
  },
  {
    title: "E-commerce",
    description: "Vendite, catalogo e disponibilità sincronizzati con i sistemi interni.",
    icon: ShoppingBag,
  },
  {
    title: "Gestionali",
    description: "Flussi operativi collegati senza ripetere inserimenti tra reparti.",
    icon: Workflow,
  },
  {
    title: "Database",
    description: "Dati condivisi, trasformati e resi disponibili dove servono.",
    icon: Database,
  },
  {
    title: "Portali clienti",
    description: "Informazioni e documenti aggiornati tra area riservata e back office.",
    icon: FileCheck2,
  },
  {
    title: "Sistemi documentali",
    description: "Documenti, approvazioni e metadati in un flusso tracciabile.",
    icon: FileStack,
  },
  {
    title: "Software amministrativi",
    description: "Scadenze, fatture e dati contabili gestiti con meno passaggi manuali.",
    icon: TimerReset,
  },
  {
    title: "Servizi cloud",
    description: "Piattaforme cloud coordinate con i dati aziendali esistenti.",
    icon: Cloud,
  },
  {
    title: "Moduli web",
    description: "Richieste e dati raccolti dal web inviati ai sistemi corretti.",
    icon: FileInput,
  },
  {
    title: "Piattaforme SaaS",
    description: "Strumenti specializzati inseriti nel flusso senza creare silos.",
    icon: Network,
  },
  {
    title: "Modelli e servizi AI",
    description: "Servizi intelligenti collegati ai dati con il giusto livello di controllo.",
    icon: Bot,
  },
];

const integrationTypes = [
  {
    icon: Braces,
    title: "API REST",
    description:
      "Una comunicazione strutturata e controllata tra applicazioni, utile quando un sistema deve richiedere o aggiornare dati.",
  },
  {
    icon: Webhook,
    title: "Webhook",
    description:
      "Un avviso in tempo reale: quando avviene un evento, il sistema interessato viene informato senza attese.",
  },
  {
    icon: RefreshCw,
    title: "Sincronizzazione dati",
    description:
      "Allineamento periodico o continuo dei dati quando informazioni simili vivono in sistemi diversi.",
  },
  {
    icon: Zap,
    title: "Event-driven architecture",
    description:
      "Processi attivati da eventi e gestiti in modo asincrono, per rendere i flussi più continui.",
  },
  {
    icon: FileInput,
    title: "Import ed export",
    description:
      "Gestione controllata di file e flussi esistenti, utile quando non è disponibile una connessione diretta.",
  },
  {
    icon: Network,
    title: "Middleware personalizzato",
    description:
      "Un livello centrale che coordina software differenti, rendendo le regole di scambio più leggibili.",
  },
];

const beforeItems = [
  "Dati duplicati",
  "Aggiornamenti manuali",
  "Sistemi isolati",
  "Errori difficili da individuare",
  "Nessuna tracciabilità centrale",
];

const afterItems = [
  "Dati sincronizzati",
  "Flussi automatici",
  "Sistemi connessi",
  "Errori registrati",
  "Monitoraggio centralizzato",
];

const projectPhases = [
  {
    title: "Assessment",
    description: "Analizziamo software, API, dati e vincoli esistenti.",
  },
  {
    title: "Mappatura",
    description: "Definiamo origini, destinazioni e trasformazioni dei dati.",
  },
  {
    title: "Architettura",
    description: "Progettiamo sicurezza, affidabilità e gestione degli errori.",
  },
  {
    title: "Sviluppo",
    description: "Implementiamo connettori, endpoint e logica di sincronizzazione.",
  },
  {
    title: "Test",
    description: "Verifichiamo scenari normali, errori e casi limite.",
  },
  {
    title: "Monitoraggio",
    description: "Controlliamo disponibilità, log e corretto funzionamento.",
  },
];

const securityPoints = [
  {
    icon: KeyRound,
    title: "Autenticazione e autorizzazione",
    description:
      "Ogni connessione usa le credenziali e i permessi necessari, senza concedere accessi più ampi del dovuto.",
  },
  {
    icon: CheckCircle2,
    title: "Validazione dei dati",
    description:
      "Controlliamo formato e coerenza prima che un dato venga inviato a un sistema collegato.",
  },
  {
    icon: ShieldCheck,
    title: "Segreti ed endpoint protetti",
    description:
      "Chiavi, token e punti di accesso vengono gestiti con regole dedicate e protetti da abusi.",
  },
  {
    icon: FileStack,
    title: "Audit e minimizzazione",
    description:
      "Tracciamo i passaggi importanti e trasferiamo solo i dati utili al processo.",
  },
];

const reliabilityPoints = [
  {
    icon: RefreshCw,
    title: "Retry automatici",
    description:
      "Un’operazione temporaneamente non disponibile può essere ritentata con regole definite.",
  },
  {
    icon: Radio,
    title: "Code e timeout",
    description:
      "I flussi vengono gestiti in modo ordinato anche quando un servizio risponde più lentamente del previsto.",
  },
  {
    icon: Check,
    title: "Operazioni idempotenti",
    description:
      "Un retry non deve duplicare dati o ordini: progettiamo il flusso per riconoscere ciò che è già avvenuto.",
  },
  {
    icon: ShieldCheck,
    title: "Gestione degli errori",
    description:
      "Le anomalie non vengono nascoste: vengono registrate, notificate e rese risolvibili.",
  },
  {
    icon: TimerReset,
    title: "Fallback e notifiche",
    description:
      "Se serve un controllo manuale, il processo può fermarsi e avvisare la persona giusta.",
  },
  {
    icon: Activity,
    title: "Log e monitoraggio",
    description:
      "Stato, eventi e qualità del flusso restano consultabili nel tempo.",
  },
];

const technologies = [
  "API REST",
  "Webhook",
  "Node.js",
  "TypeScript",
  "Database SQL e NoSQL",
  "Message queue",
  "Cloud",
  "OAuth",
  "Sistemi event-driven",
  "Monitoring e logging",
];

const useCases = [
  "Sincronizzazione ordini tra e-commerce ed ERP",
  "Aggiornamento automatico del CRM",
  "Collegamento tra portale clienti e gestionale",
  "Allineamento anagrafiche",
  "Integrazione fatture e documenti",
  "Notifiche da sistemi esterni",
  "Centralizzazione dati per dashboard",
  "Collegamento con servizi AI",
  "Migrazione graduale da software legacy",
  "API per applicazioni mobile",
];

const faqs = [
  {
    question: "È possibile integrare software molto vecchi?",
    answer:
      "Dipende da come il sistema espone dati o funzionalità. Valutiamo API, database, file, connettori esistenti e vincoli di sicurezza prima di definire una strada affidabile.",
  },
  {
    question: "Cosa succede se un sistema non dispone di API?",
    answer:
      "Analizziamo alternative come import/export controllati, database, file strutturati o middleware. Non promettiamo una compatibilità universale senza prima una verifica tecnica.",
  },
  {
    question: "Come vengono gestiti gli errori di sincronizzazione?",
    answer:
      "Con log, notifiche, retry e punti di controllo manuale quando necessari. L’obiettivo è rendere l’errore visibile, tracciabile e risolvibile.",
  },
  {
    question: "È possibile sincronizzare i dati in tempo reale?",
    answer:
      "Quando gli strumenti e il processo lo richiedono, sì. In altri casi una sincronizzazione programmata è più adatta: la scelta dipende da criticità, volume e frequenza degli aggiornamenti.",
  },
  {
    question: "Come proteggete dati e credenziali?",
    answer:
      "Progettiamo autenticazione, permessi, validazione, protezione dei segreti e minimizzazione dei dati in base al contesto dell’integrazione.",
  },
  {
    question: "Possiamo integrare un solo processo inizialmente?",
    answer:
      "Sì. Partire da un flusso mirato permette di validare l’architettura e ottenere un miglioramento concreto prima di estendere il perimetro.",
  },
  {
    question: "Offrite monitoraggio e manutenzione?",
    answer:
      "Sì. Possiamo affiancare il team con monitoraggio, manutenzione, evolutive e ottimizzazione delle integrazioni nel tempo.",
  },
];

const flowProjects = projects.filter((project) => project.slug === "vanta-flow");

export default function SystemIntegrationPage() {
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
                  Integrazioni &amp; API
                </p>
                <h1 className="mt-4 font-heading text-[42px] font-medium leading-[1.04] tracking-[-0.055em] text-white sm:text-[57px] lg:text-[64px]">
                  Colleghiamo sistemi, dati e processi.
                </h1>
                <p className="mt-5 max-w-[600px] text-[15px] leading-7 text-zinc-300 sm:text-[17px]">
                  Realizziamo integrazioni affidabili tra software aziendali,
                  database, servizi cloud e API, creando un ecosistema digitale
                  connesso e controllabile.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#d6d8dc] px-4 text-[12px] font-medium text-[#111213] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0c0d]"
                  >
                    Parliamo dei tuoi sistemi
                    <ArrowRight className="size-3.5" />
                  </Link>
                  <a
                    href="#integration-demo"
                    className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/25 px-4 text-[12px] font-medium text-white transition hover:border-white/60 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6d8dc]"
                  >
                    Esplora una demo
                    <ArrowRight className="size-3.5" />
                  </a>
                </div>

                <div className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-[#bfc3c9]">
                  {[
                    "Dati sincronizzati",
                    "Flussi più continui",
                    "Controllo centrale",
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
                  src="/images/services/system-integration.webp"
                  alt="Dashboard enterprise con sistemi collegati a un API Gateway"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 56vw"
                  className="object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(9,10,11,0.38),transparent_48%),linear-gradient(0deg,rgba(9,10,11,0.27),transparent_38%)]" />
                <div className="absolute bottom-4 left-4 rounded-lg border border-white/[0.14] bg-black/35 px-3 py-2.5 backdrop-blur sm:bottom-5 sm:left-5">
                  <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#d6d8dc]">
                    Connected ecosystem
                  </p>
                  <p className="mt-1 text-[10px] text-zinc-300">
                    Sistemi e dati coordinati in un solo flusso.
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
                  Quando i sistemi non comunicano, il lavoro si frammenta.
                </h2>
              </div>

              <div>
                <p className="max-w-[680px] text-[15px] leading-7 text-zinc-300">
                  Gli strumenti della tua azienda devono comunicare tra loro.
                  Senza un collegamento affidabile, le persone diventano il
                  ponte manuale fra dati, reparti e applicazioni: un punto
                  fragile che rallenta tutto il processo.
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {integrationProblems.map((problem, index) => (
                    <article
                      key={problem}
                      className="relative overflow-hidden rounded-xl border border-white/[0.09] bg-white/[0.035] p-4"
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

            <div
              aria-hidden="true"
              className="mt-10 grid gap-3 rounded-2xl border border-white/[0.1] bg-[#0d0e0f] p-5 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center sm:p-6"
            >
              {[
                ["CRM", Users],
                ["ERP", Server],
                ["Fogli", FileInput],
              ].map(([label, Icon], index) => {
                const NodeIcon = Icon as typeof Users;
                return (
                  <div key={label as string} className="contents">
                    {index > 0 && (
                      <div className="hidden h-px w-10 border-t border-dashed border-[#8d939b]/60 sm:block" />
                    )}
                    <div className="rounded-xl border border-white/[0.09] bg-white/[0.035] p-4">
                      <NodeIcon className="size-4 text-[#a8adb4]" strokeWidth={1.55} />
                      <p className="mt-4 text-[12px] font-medium text-white">
                        {label as string}
                      </p>
                      <p className="mt-1 text-[10px] text-zinc-500">
                        Sistema isolato
                      </p>
                    </div>
                  </div>
                );
              })}
              <div className="sm:col-span-5">
                <p className="pt-2 text-center text-[10px] uppercase tracking-[0.18em] text-[#8d939b]">
                  Sistemi isolati · dati che non scorrono
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-[#f3f3f1] py-16 text-[#111213] sm:py-20 lg:py-24">
          <Container>
            <div className="max-w-[690px]">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6b6d70]">
                La soluzione VANTA
              </p>
              <h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] sm:text-[45px]">
                Costruiamo un’infrastruttura in cui i dati scorrono in modo affidabile.
              </h2>
              <p className="mt-4 text-[14px] leading-6 text-[#55585c]">
                Le integrazioni non sono soltanto codice: sono una regia
                operativa che rende le informazioni disponibili nel punto e nel
                momento in cui servono.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {solutionSteps.map(({ icon: Icon, title, description }) => (
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
                  Cosa possiamo integrare
                </p>
                <h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] text-white sm:text-[45px]">
                  Ogni strumento ha più valore quando dialoga con gli altri.
                </h2>
              </div>
              <p className="max-w-[350px] text-[13px] leading-6 text-zinc-400">
                Valutiamo ogni integrazione in base alle API disponibili, alla
                qualità dei dati e alla criticità del processo.
              </p>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {integrationCatalog.map(({ title, description, icon: Icon }) => (
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

        <section className="border-y border-[#d6d8dc] bg-[#f3f3f1] py-16 text-[#111213] sm:py-20 lg:py-24">
          <Container>
            <div className="max-w-[680px]">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6b6d70]">
                Tipologie di integrazione
              </p>
              <h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] sm:text-[45px]">
                Il collegamento giusto dipende dal dato e dal processo.
              </h2>
              <p className="mt-4 text-[14px] leading-6 text-[#55585c]">
                Scegliamo la modalità più adatta a ciò che deve accadere, senza
                trasformare un’esigenza operativa in un’infrastruttura più
                complessa del necessario.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {integrationTypes.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="rounded-xl border border-[#d6d8dc] bg-[#fafaf8] p-5 transition duration-300 hover:border-[#a8adb4] hover:shadow-[0_14px_28px_rgba(17,18,19,0.07)]"
                >
                  <Icon className="size-5 text-[#36393d]" strokeWidth={1.55} />
                  <h3 className="mt-5 font-heading text-[17px] font-medium tracking-[-0.03em]">
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

        <section
          id="integration-demo"
          className="scroll-mt-20 border-y border-white/[0.08] bg-[#111213] py-16 sm:py-20 lg:py-24"
        >
          <Container>
            <div className="max-w-[680px]">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">
                Demo interattiva
              </p>
              <h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] text-white sm:text-[45px]">
                Osserva il dato mentre attraversa l’ecosistema.
              </h2>
              <p className="mt-4 text-[14px] leading-6 text-zinc-400">
                Attiva o disattiva i sistemi, seleziona un flusso e simula una
                sincronizzazione. La demo mostra perché un’integrazione deve
                essere progettata per funzionare anche quando qualcosa cambia.
              </p>
            </div>

            <div className="mt-10">
              <SystemIntegrationDemo />
            </div>
            <p className="mt-4 text-center text-[11px] leading-5 text-[#a8adb4]">
              Demo dimostrativa: l’architettura reale viene progettata sulla
              base dei sistemi e dei requisiti dell’azienda.
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
                Da isole informative a un flusso controllabile.
              </h2>
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              <article className="rounded-2xl border border-[#d6d8dc] bg-[#e9e9e7] p-6 sm:p-7">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6b6d70]">
                  Prima
                </p>
                <h3 className="mt-3 font-heading text-[24px] font-medium tracking-[-0.04em]">
                  Informazioni affidate a passaggi manuali.
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
                  Un ecosistema connesso e leggibile.
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
                  Un percorso ordinato dalla prima analisi al monitoraggio.
                </h2>
                <p className="mt-4 max-w-[390px] text-[14px] leading-6 text-zinc-400">
                  I passaggi tecnici restano al servizio di una cosa semplice:
                  fare in modo che le informazioni arrivino correttamente dove
                  servono.
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

        <section className="bg-[#0b0c0d] py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">
                  Sicurezza
                </p>
                <h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] text-white sm:text-[45px]">
                  I dati devono muoversi senza perdere controllo.
                </h2>
                <p className="mt-4 max-w-[480px] text-[14px] leading-6 text-zinc-400">
                  Proteggere un’integrazione significa decidere chi può accedere
                  a cosa, validare ciò che passa tra i sistemi e non trasferire
                  più informazioni di quelle necessarie.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {securityPoints.map(({ icon: Icon, title, description }) => (
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
            </div>
          </Container>
        </section>

        <section className="border-y border-[#d6d8dc] bg-[#f3f3f1] py-16 text-[#111213] sm:py-20 lg:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6b6d70]">
                  Affidabilità
                </p>
                <h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] sm:text-[45px]">
                  Un’integrazione deve funzionare anche quando qualcosa va storto.
                </h2>
                <p className="mt-4 max-w-[480px] text-[14px] leading-6 text-[#55585c]">
                  Non basta collegare due sistemi: bisogna anche prevedere cosa
                  succede se un servizio è lento, un dato non è valido o una
                  risposta non arriva.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {reliabilityPoints.map(({ icon: Icon, title, description }) => (
                  <article
                    key={title}
                    className="rounded-xl border border-[#d6d8dc] bg-[#fafaf8] p-5 transition duration-300 hover:border-[#a8adb4] hover:shadow-[0_14px_28px_rgba(17,18,19,0.07)]"
                  >
                    <Icon className="size-5 text-[#36393d]" strokeWidth={1.55} />
                    <h3 className="mt-5 text-[14px] font-medium">{title}</h3>
                    <p className="mt-2 text-[12px] leading-5 text-[#55585c]">
                      {description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-[#f3f3f1] py-16 text-[#111213] sm:py-20 lg:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6b6d70]">
                  Tecnologie
                </p>
                <h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] sm:text-[45px]">
                  La scelta tecnica dipende da ciò che il processo richiede.
                </h2>
                <p className="mt-4 max-w-[500px] text-[14px] leading-6 text-[#55585c]">
                  Volume dei dati, frequenza degli aggiornamenti, criticità,
                  sicurezza e infrastruttura esistente guidano la scelta
                  dell’architettura. L’obiettivo è connettere bene, non
                  aggiungere tecnologia inutile.
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
                    Architetture solide, log leggibili e regole chiare.
                  </p>
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
                  Casi d’uso
                </p>
                <h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] text-white sm:text-[45px]">
                  Collegamenti concreti per processi più continui.
                </h2>
              </div>
              <p className="max-w-[320px] text-[13px] leading-6 text-zinc-400">
                Il perimetro viene definito sui dati, sui ruoli e sui sistemi
                che usi davvero.
              </p>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {useCases.map((useCase, index) => (
                <article
                  key={useCase}
                  className="group min-h-32 rounded-xl border border-white/[0.1] bg-white/[0.035] p-4 transition duration-300 hover:-translate-y-1 hover:border-[#8d939b] hover:bg-white/[0.06]"
                >
                  <span className="text-[10px] font-medium text-[#a8adb4]">
                    0{index + 1}
                  </span>
                  <p className="mt-7 text-[12px] font-medium leading-5 text-white">
                    {useCase}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-[#f3f3f1] pb-16 text-[#111213] sm:pb-20 lg:pb-24">
          <Container>
            <div className="flex flex-col justify-between gap-6 border-t border-[#d6d8dc] pt-14 sm:flex-row sm:items-end sm:pt-16">
              <div className="max-w-[640px]">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6b6d70]">
                  Concept Case Study
                </p>
                <h2 className="mt-3 font-heading text-[34px] font-medium tracking-[-0.05em] sm:text-[45px]">
                  VANTA FLOW: un workflow connesso ai tuoi sistemi.
                </h2>
                <p className="mt-4 text-[14px] leading-6 text-[#55585c]">
                  Una demo interattiva che mostra come processi, API e
                  integrazioni possono diventare un prodotto concreto, senza
                  fingere l’esistenza di un cliente reale.
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
                  Ogni integrazione parte da sistemi diversi. L’analisi iniziale
                  serve a definire una strada concreta e sostenibile.
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
                  Dal silos al sistema
                </p>
                <h2 className="mt-3 font-heading text-[30px] font-medium tracking-[-0.045em] text-white sm:text-[40px]">
                  I tuoi strumenti non devono lavorare come isole.
                </h2>
                <p className="mt-3 text-[14px] leading-6 text-zinc-300">
                  Raccontaci quali sistemi utilizzi e dove oggi il flusso si
                  interrompe.
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
