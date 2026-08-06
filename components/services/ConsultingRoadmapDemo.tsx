"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  CircleAlert,
  CircleDot,
  Compass,
  DatabaseZap,
  FileSearch,
  Gauge,
  Layers3,
  Lightbulb,
  Network,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
  X,
} from "lucide-react";

export type ConsultingRoadmapDemoProps = {
  className?: string;
  title?: string;
  description?: string;
};

type ObjectiveId = "processes" | "sales" | "costs" | "systems" | "experience";
type CurrentStateId =
  "manual" | "disconnected" | "legacy" | "fragmented" | "new";
type PriorityId = "speed" | "risk" | "efficiency" | "ux" | "scale";

type Choice<T extends string> = {
  id: T;
  label: string;
  description: string;
  icon: LucideIcon;
};

const objectives: Array<Choice<ObjectiveId>> = [
  {
    id: "processes",
    label: "Ridurre attività manuali",
    description: "Eliminare passaggi ripetitivi e tempi di gestione.",
    icon: Gauge,
  },
  {
    id: "sales",
    label: "Centralizzare i dati",
    description: "Rendere le informazioni affidabili e disponibili dove servono.",
    icon: BarChart3,
  },
  {
    id: "costs",
    label: "Migliorare il servizio clienti",
    description: "Rendere le richieste più semplici da gestire e seguire.",
    icon: DatabaseZap,
  },
  {
    id: "systems",
    label: "Creare un nuovo prodotto digitale",
    description: "Definire una prima soluzione utile e sostenibile.",
    icon: Network,
  },
  {
    id: "experience",
    label: "Collegare software esistenti",
    description: "Far dialogare strumenti, dati e team.",
    icon: UsersRound,
  },
];

const currentStates: Array<Choice<CurrentStateId>> = [
  {
    id: "manual",
    label: "Fogli di calcolo",
    description: "I dati principali vivono ancora in file e documenti condivisi.",
    icon: FileSearch,
  },
  {
    id: "disconnected",
    label: "Software non integrati",
    description: "I sistemi esistono, ma non dialogano tra loro.",
    icon: Network,
  },
  {
    id: "legacy",
    label: "Processi manuali",
    description: "Il lavoro richiede controlli, email e passaggi ripetitivi.",
    icon: Layers3,
  },
  {
    id: "fragmented",
    label: "Gestionale esistente",
    description: "C’è una base utile da analizzare ed eventualmente evolvere.",
    icon: DatabaseZap,
  },
  {
    id: "new",
    label: "Nessun sistema strutturato",
    description: "Il prodotto e il processo devono ancora essere definiti.",
    icon: Rocket,
  },
];

const priorities: Array<Choice<PriorityId>> = [
  {
    id: "speed",
    label: "Velocità",
    description: "Portare presto una prima soluzione in uso.",
    icon: Rocket,
  },
  {
    id: "risk",
    label: "Scalabilità",
    description: "Preparare una base in grado di evolvere con il progetto.",
    icon: ShieldCheck,
  },
  {
    id: "efficiency",
    label: "Controllo costi",
    description: "Concentrare l’investimento su ciò che genera più valore.",
    icon: Gauge,
  },
  {
    id: "ux",
    label: "Esperienza utente",
    description: "Costruire un percorso più chiaro per persone e team.",
    icon: Sparkles,
  },
  {
    id: "scale",
    label: "Automazione",
    description: "Ridurre i passaggi ripetitivi con workflow affidabili.",
    icon: Layers3,
  },
];

const objectiveRecommendations: Record<
  ObjectiveId,
  {
    focus: string;
    firstStep: string;
    solution: string;
    discovery: string;
    prototype: string;
    mvp: string;
    integrations: string;
    evolution: string;
  }
> = {
  processes: {
    focus:
      "Automatizzare il flusso operativo con il maggiore impatto quotidiano.",
    firstStep:
      "Mappa un processo critico dall'input al risultato e misura i tempi attuali.",
    solution: "Piattaforma operativa con workflow e automazioni su misura.",
    discovery:
      "Mappiamo attori, passaggi manuali e punti di attesa del processo.",
    prototype: "Visualizziamo il nuovo flusso operativo prima di costruirlo.",
    mvp: "Rilasciamo il primo workflow con ruoli, regole e notifiche essenziali.",
    integrations: "Colleghiamo dati e strumenti coinvolti nel processo.",
    evolution:
      "Estendiamo le automazioni ai flussi adiacenti in base ai risultati.",
  },
  sales: {
    focus:
      "Creare una fonte dati affidabile e flussi coerenti tra gli strumenti esistenti.",
    firstStep:
      "Elenca sistemi, responsabilità dei dati e sincronizzazioni oggi manuali.",
    solution:
      "Integration hub con API, mapping dati e monitoraggio dei flussi.",
    discovery:
      "Mappiamo origini, destinazioni, ownership e qualità delle informazioni.",
    prototype:
      "Rendiamo visibile il percorso dati e le regole di sincronizzazione.",
    mvp: "Attiviamo la prima integrazione ad alto valore con monitoraggio locale.",
    integrations:
      "Estendiamo API, sicurezza e gestione degli errori agli altri sistemi.",
    evolution:
      "Consolidiamo il modello dati e aggiungiamo nuove integrazioni in sicurezza.",
  },
  costs: {
    focus:
      "Semplificare il percorso cliente nei momenti che contano di più.",
    firstStep:
      "Identifica una richiesta ricorrente e ascolta dove il cliente incontra attrito.",
    solution:
      "Portale clienti o servizio digitale con area riservata e assistenza integrata.",
    discovery: "Analizziamo journey, domande ricorrenti e punti di frizione.",
    prototype:
      "Testiamo navigazione, contenuti e azioni chiave con un prototipo realistico.",
    mvp: "Rilasciamo il primo percorso self-service con documenti e richieste.",
    integrations:
      "Colleghiamo CRM, documenti e sistemi di assistenza necessari.",
    evolution:
      "Miglioriamo l’esperienza con feedback, dati d’uso e nuove funzionalità.",
  },
  systems: {
    focus:
      "Validare il problema e il nucleo di valore prima di costruire un prodotto più ampio.",
    firstStep:
      "Definisci utenti, scenario e risultato concreto che la prima versione deve generare.",
    solution:
      "MVP digitale focalizzato, pronto a evolvere dopo il confronto con gli utenti.",
    discovery:
      "Analizziamo utenti, bisogni, alternative e ipotesi da verificare.",
    prototype:
      "Testiamo flussi, interfacce e valore percepito prima dello sviluppo completo.",
    mvp: "Costruiamo la prima esperienza utile con le funzioni essenziali.",
    integrations:
      "Valutiamo solo le integrazioni necessarie a sostenere il primo rilascio.",
    evolution:
      "Estendiamo prodotto e architettura in base a utilizzo e feedback reali.",
  },
  experience: {
    focus:
      "Collegare gli strumenti che oggi costringono persone e dati a passaggi manuali.",
    firstStep:
      "Elenca sistemi, responsabilità dei dati e sincronizzazioni oggi manuali.",
    solution:
      "Integration hub con API, mapping dati e monitoraggio dei flussi.",
    discovery:
      "Mappiamo origini, destinazioni, ownership e qualità delle informazioni.",
    prototype:
      "Rendiamo visibile il percorso dati e le regole di sincronizzazione.",
    mvp: "Attiviamo la prima integrazione ad alto valore con monitoraggio locale.",
    integrations:
      "Estendiamo API, sicurezza e gestione degli errori agli altri sistemi.",
    evolution:
      "Consolidiamo il modello dati e aggiungiamo nuove integrazioni in sicurezza.",
  },
};

const priorityRecommendations: Record<
  PriorityId,
  { label: string; roadmapFocus: number }
> = {
  speed: {
    label:
      "Riduciamo il perimetro iniziale per arrivare rapidamente a un MVP usabile.",
    roadmapFocus: 2,
  },
  risk: {
    label:
      "Prepariamo dati, architettura e integrazioni per evolvere senza ricominciare da zero.",
    roadmapFocus: 3,
  },
  efficiency: {
    label:
      "Partiamo dal flusso con più volume o tempo sprecato e misuriamo il miglioramento.",
    roadmapFocus: 2,
  },
  ux: {
    label:
      "Diamo più spazio a prototipi, test e semplificazione dei percorsi utente.",
    roadmapFocus: 1,
  },
  scale: {
    label:
      "Partiamo dal flusso ripetitivo più critico e progettiamo regole, controlli e monitoraggio.",
    roadmapFocus: 2,
  },
};

const stateRisks: Record<CurrentStateId, string[]> = {
  manual: [
    "Regole non documentate",
    "Tempo assorbito da controlli manuali",
    "Errori di trascrizione",
  ],
  disconnected: [
    "Dati duplicati",
    "Sincronizzazioni non presidiate",
    "Responsabilità poco chiare",
  ],
  legacy: [
    "Vincoli tecnici da verificare",
    "Adozione graduale del nuovo flusso",
    "Compatibilità con i dati storici",
  ],
  fragmented: [
    "Qualità del dato disomogenea",
    "Fonti in conflitto",
    "KPI non confrontabili",
  ],
  new: [
    "Perimetro troppo ampio",
    "Assunzioni non validate",
    "Priorità da allineare",
  ],
};

const roadmapMeta: Array<{ title: string; icon: LucideIcon }> = [
  { title: "Discovery", icon: Compass },
  { title: "Prototipo", icon: Lightbulb },
  { title: "MVP", icon: Rocket },
  { title: "Integrazioni", icon: Network },
  { title: "Evoluzione", icon: Layers3 },
];

export default function ConsultingRoadmapDemo({
  className = "",
  title = "Costruisci la tua roadmap",
  description = "Seleziona obiettivo, punto di partenza e priorità per visualizzare un percorso progettuale dimostrativo.",
}: ConsultingRoadmapDemoProps) {
  const [objective, setObjective] = useState<ObjectiveId>("processes");
  const [currentState, setCurrentState] = useState<CurrentStateId>("manual");
  const [priority, setPriority] = useState<PriorityId>("risk");
  const [toast, setToast] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  const selectedObjective = useMemo(
    () => objectives.find((item) => item.id === objective) ?? objectives[0],
    [objective],
  );
  const selectedState = useMemo(
    () =>
      currentStates.find((item) => item.id === currentState) ??
      currentStates[0],
    [currentState],
  );
  const selectedPriority = useMemo(
    () => priorities.find((item) => item.id === priority) ?? priorities[0],
    [priority],
  );
  const recommendation = objectiveRecommendations[objective];
  const priorityRecommendation = priorityRecommendations[priority];
  const focusedRoadmapStep = priorityRecommendation.roadmapFocus;

  const roadmapDescriptions = [
    recommendation.discovery,
    recommendation.prototype,
    recommendation.mvp,
    recommendation.integrations,
    recommendation.evolution,
  ];

  useEffect(() => {
    const activeTimers = timers.current;
    return () => activeTimers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  function notify(message: string) {
    setToast(message);
    const timer = window.setTimeout(() => setToast(null), 3200);
    timers.current.push(timer);
  }

  function chooseObjective(next: ObjectiveId) {
    setObjective(next);
    const choice = objectives.find((item) => item.id === next);
    notify(`Obiettivo aggiornato: ${choice?.label ?? "Roadmap"}`);
  }

  function chooseCurrentState(next: CurrentStateId) {
    setCurrentState(next);
    const choice = currentStates.find((item) => item.id === next);
    notify(`Stato attuale: ${choice?.label ?? "aggiornato"}`);
  }

  function choosePriority(next: PriorityId) {
    setPriority(next);
    const choice = priorities.find((item) => item.id === next);
    notify(`Priorità: ${choice?.label ?? "aggiornata"}`);
  }

  return (
    <section
      aria-label="Demo interattiva roadmap di consulenza"
      className={`relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0e0f10] text-white shadow-[0_28px_80px_rgba(0,0,0,0.34)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_0%,rgba(214,216,220,0.13),transparent_32%),radial-gradient(circle_at_0%_100%,rgba(141,147,155,0.14),transparent_35%)]" />
      <header className="relative border-b border-white/[0.1] bg-[#151617]/95 px-4 py-3.5 backdrop-blur sm:px-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.14] bg-white/[0.06] text-[#d6d8dc]">
              <Compass className="size-4" strokeWidth={1.6} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[12px] font-medium">{title}</p>
              <p className="mt-0.5 truncate text-[9px] text-white/48">
                Strategic planning · demo locale
              </p>
            </div>
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#d6d8dc]/30 bg-[#d6d8dc]/10 px-2.5 py-1 text-[9px] font-medium text-[#f3f3f1]">
            <CircleDot className="size-3" />
            Roadmap personalizzata
          </span>
        </div>
      </header>

      <div className="relative grid gap-px bg-white/[0.08] xl:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="bg-[#111213] p-4 sm:p-5">
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/42">
              Brief guidato
            </p>
            <p className="mt-1 text-[13px] font-medium">
              Diamo una direzione al progetto
            </p>
            <p className="mt-1.5 text-[10px] leading-4 text-white/48">
              {description}
            </p>
          </div>

          <ChoiceGroup
            title="Obiettivo principale"
            hint="1 di 3"
            choices={objectives}
            selectedId={objective}
            onSelect={chooseObjective}
          />
          <ChoiceGroup
            title="Stato attuale"
            hint="2 di 3"
            choices={currentStates}
            selectedId={currentState}
            onSelect={chooseCurrentState}
          />
          <ChoiceGroup
            title="Priorità"
            hint="3 di 3"
            choices={priorities}
            selectedId={priority}
            onSelect={choosePriority}
          />
        </aside>

        <div className="min-w-0 bg-[#101112] p-4 sm:p-5 lg:p-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#a8adb4]">
                Output consigliato
              </p>
              <h3 className="mt-1.5 text-[19px] font-medium tracking-[-0.035em]">
                La tua roadmap in 5 fasi
              </h3>
              <p className="mt-1.5 max-w-2xl text-[10px] leading-4 text-white/48">
                Il percorso si aggiorna in base alle selezioni. È un esempio per
                iniziare una conversazione, non una stima o un piano vincolante.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                notify("Configurazione roadmap pronta per essere discussa")
              }
              className="inline-flex items-center gap-1.5 self-start rounded-lg bg-[#d6d8dc] px-3 py-2 text-[10px] font-medium text-[#131415] transition hover:bg-white"
            >
              <Check className="size-3.5" />
              Salva scenario demo
            </button>
          </div>

          <section className="mt-5 grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
            <InsightCard
              eyebrow="Focus consigliato"
              icon={Target}
              title={recommendation.focus}
              detail={priorityRecommendation.label}
              emphasis
            />
            <InsightCard
              eyebrow="Primo step"
              icon={ArrowRight}
              title={recommendation.firstStep}
              detail={`Punto di partenza: ${selectedState.label}.`}
            />
          </section>

          <section className="mt-4 rounded-2xl border border-white/[0.1] bg-white/[0.025] p-3 sm:p-4">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <p className="text-[10px] font-medium">Percorso consigliato</p>
                <p className="mt-1 text-[9px] text-white/46">
                  Ogni fase è progettata per ridurre incertezza e creare valore
                  progressivamente.
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-md border border-white/[0.11] px-2 py-1 text-[9px] text-white/60">
                <Target className="size-3" />
                {selectedObjective.label}
              </span>
            </div>
            <ol className="mt-5 grid gap-2 md:grid-cols-5">
              {roadmapMeta.map((step, index) => {
                const Icon = step.icon;
                const focused = index === focusedRoadmapStep;
                return (
                  <li key={step.title} className="relative min-w-0">
                    {index > 0 && (
                      <span className="absolute right-full top-1/2 hidden h-px w-2 -translate-y-1/2 bg-white/[0.12] md:block" />
                    )}
                    <article
                      className={`h-full rounded-xl border p-3 transition duration-300 ${
                        focused
                          ? "border-[#d6d8dc]/55 bg-[#d6d8dc]/11 shadow-[0_0_0_1px_rgba(214,216,220,0.1)]"
                          : "border-white/[0.09] bg-white/[0.02] hover:border-white/[0.2] hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`flex size-6 items-center justify-center rounded-md border ${
                            focused
                              ? "border-[#d6d8dc]/40 bg-[#d6d8dc]/12 text-[#d6d8dc]"
                              : "border-white/[0.1] bg-white/[0.04] text-white/55"
                          }`}
                        >
                          <Icon className="size-3" strokeWidth={1.5} />
                        </span>
                        <span className="text-[8px] font-medium uppercase tracking-[0.12em] text-white/38">
                          0{index + 1}
                        </span>
                      </div>
                      <p className="mt-3 text-[10px] font-medium">
                        {step.title}
                      </p>
                      <p className="mt-1 text-[9px] leading-4 text-white/48">
                        {roadmapDescriptions[index]}
                      </p>
                      {focused && (
                        <span className="mt-3 inline-flex items-center gap-1 text-[8px] font-medium uppercase tracking-[0.1em] text-[#d6d8dc]">
                          <Check className="size-2.5" /> Focus prioritario
                        </span>
                      )}
                    </article>
                  </li>
                );
              })}
            </ol>
          </section>

          <section className="mt-4 grid gap-3 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-2xl border border-white/[0.1] bg-white/[0.025] p-4">
              <div className="flex items-center gap-2 text-[#d6d8dc]">
                <Layers3 className="size-3.5" />
                <p className="text-[10px] font-medium">Soluzione suggerita</p>
              </div>
              <p className="mt-3 text-[12px] font-medium leading-5 text-white/88">
                {recommendation.solution}
              </p>
              <p className="mt-2 text-[9px] leading-4 text-white/48">
                Il perimetro viene definito insieme dopo aver validato le
                priorità reali.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.1] bg-white/[0.025] p-4">
              <div className="flex items-center gap-2 text-[#d6d8dc]">
                <CircleAlert className="size-3.5" />
                <p className="text-[10px] font-medium">
                  Rischi principali da presidiare
                </p>
              </div>
              <ul className="mt-3 grid gap-2 sm:grid-cols-3">
                {stateRisks[currentState].map((risk) => (
                  <li
                    key={risk}
                    className="rounded-xl border border-white/[0.08] bg-black/20 px-3 py-2.5 text-[9px] leading-4 text-white/63"
                  >
                    <span className="mb-1.5 block size-1.5 rounded-full bg-[#8d939b]" />
                    {risk}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-4 rounded-2xl border border-white/[0.1] bg-white/[0.025] p-4">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div className="flex min-w-0 items-start gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.04] text-[#d6d8dc]">
                  <CheckCircle2 className="size-3.5" />
                </span>
                <div>
                  <p className="text-[10px] font-medium">
                    Scenario selezionato
                  </p>
                  <p className="mt-1 text-[9px] leading-4 text-white/48">
                    {selectedObjective.label} · {selectedState.label} ·{" "}
                    {selectedPriority.label}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[9px] text-[#d6d8dc]">
                <ShieldCheck className="size-3" />
                Nessun dato viene salvato
              </span>
            </div>
          </section>
        </div>
      </div>

      {toast && (
        <div
          role="status"
          className="absolute bottom-4 right-4 z-10 flex max-w-[300px] items-center gap-2 rounded-xl border border-white/[0.16] bg-[#202224]/95 px-3 py-2.5 text-[10px] text-white shadow-xl backdrop-blur"
        >
          <Check className="size-3.5 shrink-0 text-[#d6d8dc]" />
          <span className="flex-1">{toast}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            aria-label="Chiudi notifica"
            className="rounded p-0.5 text-white/45 transition hover:bg-white/[0.08] hover:text-white"
          >
            <X className="size-3" />
          </button>
        </div>
      )}
    </section>
  );
}

function ChoiceGroup<T extends string>({
  title,
  hint,
  choices,
  selectedId,
  onSelect,
}: {
  title: string;
  hint: string;
  choices: Array<Choice<T>>;
  selectedId: T;
  onSelect: (id: T) => void;
}) {
  return (
    <section className="mt-6 first:mt-5">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-[10px] font-medium">{title}</p>
        <span className="text-[8px] uppercase tracking-[0.12em] text-white/38">
          {hint}
        </span>
      </div>
      <div className="space-y-1.5">
        {choices.map((choice) => {
          const Icon = choice.icon;
          const selected = selectedId === choice.id;
          return (
            <button
              key={choice.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(choice.id)}
              className={`flex w-full items-center gap-2.5 rounded-xl border p-2.5 text-left transition ${
                selected
                  ? "border-[#d6d8dc]/55 bg-[#d6d8dc]/11 text-white"
                  : "border-white/[0.08] bg-white/[0.018] text-white/62 hover:border-white/[0.2] hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded-lg border ${
                  selected
                    ? "border-[#d6d8dc]/35 bg-[#d6d8dc]/10 text-[#d6d8dc]"
                    : "border-white/[0.1] bg-white/[0.04] text-white/52"
                }`}
              >
                <Icon className="size-3.5" strokeWidth={1.5} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] font-medium">
                  {choice.label}
                </span>
                <span className="mt-0.5 block text-[9px] leading-4 opacity-58">
                  {choice.description}
                </span>
              </span>
              {selected ? (
                <Check className="size-3.5 shrink-0 text-[#d6d8dc]" />
              ) : (
                <span className="size-1.5 shrink-0 rounded-full bg-white/20" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function InsightCard({
  eyebrow,
  icon: Icon,
  title,
  detail,
  emphasis = false,
}: {
  eyebrow: string;
  icon: LucideIcon;
  title: string;
  detail: string;
  emphasis?: boolean;
}) {
  return (
    <article
      className={`rounded-2xl border p-4 transition ${
        emphasis
          ? "border-[#d6d8dc]/30 bg-[#d6d8dc]/[0.07]"
          : "border-white/[0.1] bg-white/[0.025]"
      }`}
    >
      <div className="flex items-center gap-2 text-[#d6d8dc]">
        <Icon className="size-3.5" />
        <p className="text-[9px] font-medium uppercase tracking-[0.13em]">
          {eyebrow}
        </p>
      </div>
      <p className="mt-3 text-[12px] font-medium leading-5 text-white/90">
        {title}
      </p>
      <p className="mt-2 text-[9px] leading-4 text-white/48">{detail}</p>
    </article>
  );
}
