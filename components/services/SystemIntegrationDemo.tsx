"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Box,
  Check,
  CheckCircle2,
  CircleAlert,
  CloudCog,
  Database,
  ExternalLink,
  LoaderCircle,
  Network,
  PackageCheck,
  Play,
  RefreshCw,
  ServerCog,
  ShoppingBag,
  SquareCode,
  UsersRound,
  X,
} from "lucide-react";

export type SystemIntegrationDemoProps = {
  className?: string;
  title?: string;
  description?: string;
};

type SystemId = "crm" | "erp" | "commerce" | "database" | "gateway";
type ConnectionState =
  "connected" | "syncing" | "success" | "error" | "offline";
type SyncState = "idle" | "syncing" | "success" | "error";

type IntegrationSystem = {
  id: SystemId;
  name: string;
  role: string;
  icon: LucideIcon;
  enabled: boolean;
  state: ConnectionState;
};

type IntegrationFlow = {
  id: "order" | "inventory" | "customer";
  label: string;
  description: string;
  requiredSystems: SystemId[];
  steps: Array<{ label: string; system: SystemId }>;
  payload: Record<string, string | number | boolean>;
  transferSummary: string;
};

type TechnicalLog = {
  id: number;
  time: string;
  message: string;
  tone: "neutral" | "syncing" | "success" | "error";
};

const initialSystems: IntegrationSystem[] = [
  {
    id: "crm",
    name: "CRM",
    role: "Clienti e trattative",
    icon: UsersRound,
    enabled: true,
    state: "connected",
  },
  {
    id: "erp",
    name: "ERP",
    role: "Ordini e contabilità",
    icon: ServerCog,
    enabled: true,
    state: "connected",
  },
  {
    id: "commerce",
    name: "E-commerce",
    role: "Canale di vendita",
    icon: ShoppingBag,
    enabled: true,
    state: "connected",
  },
  {
    id: "database",
    name: "Database",
    role: "Dati e catalogo",
    icon: Database,
    enabled: true,
    state: "connected",
  },
  {
    id: "gateway",
    name: "API Gateway",
    role: "Regole e sicurezza",
    icon: SquareCode,
    enabled: true,
    state: "connected",
  },
];

const flows: IntegrationFlow[] = [
  {
    id: "order",
    label: "Sincronizzazione nuovo ordine",
    description:
      "Collega vendita online, gestione operativa e relazione cliente.",
    requiredSystems: ["commerce", "gateway", "erp", "crm"],
    steps: [
      { label: "Nuovo ordine E-commerce", system: "commerce" },
      { label: "Validazione dati", system: "gateway" },
      { label: "Creazione ordine ERP", system: "erp" },
      { label: "Aggiornamento CRM", system: "crm" },
      { label: "Conferma cliente", system: "gateway" },
    ],
    payload: {
      event: "order.created",
      order_id: "EC-2026-0842",
      customer: "Azienda Demo S.r.l.",
      total: "€ 1.248,00",
      items: 3,
    },
    transferSummary: "1 ordine, 3 righe prodotto e 1 contatto aggiornati",
  },
  {
    id: "inventory",
    label: "Allineamento disponibilità",
    description: "Aggiorna le scorte tra ERP, database e canale di vendita.",
    requiredSystems: ["erp", "database", "commerce", "gateway"],
    steps: [
      { label: "Variazione magazzino ERP", system: "erp" },
      { label: "Verifica disponibilità", system: "database" },
      { label: "Pubblicazione stock E-commerce", system: "commerce" },
      { label: "Notifica completamento", system: "gateway" },
    ],
    payload: {
      event: "inventory.changed",
      sku: "VS-240-CH",
      warehouse: "Milano 01",
      available: 128,
      safety_stock: 24,
    },
    transferSummary: "1 SKU e 2 livelli di disponibilità sincronizzati",
  },
  {
    id: "customer",
    label: "Aggiornamento anagrafica cliente",
    description:
      "Rende coerenti i dati cliente fra front office e sistemi interni.",
    requiredSystems: ["crm", "gateway", "database"],
    steps: [
      { label: "Modifica anagrafica CRM", system: "crm" },
      { label: "Normalizzazione campi", system: "gateway" },
      { label: "Scrittura archivio centrale", system: "database" },
      { label: "Conferma aggiornamento", system: "gateway" },
    ],
    payload: {
      event: "customer.updated",
      customer_id: "CUS-01984",
      company: "Azienda Demo S.r.l.",
      vat_validated: true,
      profile: "business",
    },
    transferSummary: "1 anagrafica cliente validata e consolidata",
  },
];

const statePresentation: Record<
  ConnectionState,
  { label: string; className: string }
> = {
  connected: {
    label: "Connected",
    className: "border-white/[0.14] bg-white/[0.05] text-[#d6d8dc]",
  },
  syncing: {
    label: "Syncing",
    className: "border-[#d6d8dc]/35 bg-[#d6d8dc]/10 text-[#f3f3f1]",
  },
  success: {
    label: "Success",
    className: "border-[#d6d8dc]/45 bg-[#d6d8dc]/15 text-white",
  },
  error: {
    label: "Error",
    className: "border-[#8d939b]/55 bg-[#8d939b]/15 text-[#f3f3f1]",
  },
  offline: {
    label: "Offline",
    className: "border-white/[0.09] bg-white/[0.025] text-white/42",
  },
};

const logToneClasses: Record<TechnicalLog["tone"], string> = {
  neutral: "bg-[#8d939b]",
  syncing: "animate-pulse bg-[#d6d8dc]",
  success: "bg-[#d6d8dc]",
  error: "bg-[#8d939b]",
};

export default function SystemIntegrationDemo({
  className = "",
  title = "Integrazioni e API",
  description = "Una demo interattiva di come sistemi, dati e processi possono comunicare senza passaggi manuali.",
}: SystemIntegrationDemoProps) {
  const [systems, setSystems] = useState(initialSystems);
  const [flowId, setFlowId] = useState<IntegrationFlow["id"]>("order");
  const [syncState, setSyncState] = useState<SyncState>("idle");
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [logs, setLogs] = useState<TechnicalLog[]>([
    {
      id: 1,
      time: "10:14:26",
      message: "Connessioni demo pronte per la sincronizzazione",
      tone: "neutral",
    },
  ]);
  const [toast, setToast] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  const selectedFlow = useMemo(
    () => flows.find((flow) => flow.id === flowId) ?? flows[0],
    [flowId],
  );
  const enabledSystems = systems.filter((system) => system.enabled).length;

  useEffect(() => {
    const activeTimers = timers.current;

    return () => {
      activeTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  function schedule(callback: () => void, delay: number) {
    const timer = window.setTimeout(callback, delay);
    timers.current.push(timer);
  }

  function log(message: string, tone: TechnicalLog["tone"] = "neutral") {
    setLogs((current) => [
      ...current,
      {
        id: Date.now() + current.length,
        time: new Intl.DateTimeFormat("it-IT", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date()),
        message,
        tone,
      },
    ]);
  }

  function notify(message: string) {
    setToast(message);
    schedule(() => setToast(null), 3200);
  }

  function changeSystem(systemId: SystemId) {
    if (syncState === "syncing") return;

    setSystems((current) =>
      current.map((system) =>
        system.id === systemId
          ? {
              ...system,
              enabled: !system.enabled,
              state: system.enabled ? "offline" : "connected",
            }
          : system,
      ),
    );
    const system = systems.find((item) => item.id === systemId);
    if (system) {
      const nextState = system.enabled ? "disattivato" : "attivato";
      notify(`${system.name} ${nextState}`);
      log(`Connessione ${system.name}: ${nextState}`, "neutral");
    }
  }

  function selectFlow(nextFlowId: IntegrationFlow["id"]) {
    if (syncState === "syncing") return;
    setFlowId(nextFlowId);
    setActiveStep(null);
    setSyncState("idle");
    const flow = flows.find((item) => item.id === nextFlowId);
    notify(`Flusso selezionato: ${flow?.label ?? "Demo"}`);
  }

  function resetSystemStates() {
    setSystems((current) =>
      current.map((system) => ({
        ...system,
        state: system.enabled ? "connected" : "offline",
      })),
    );
  }

  function simulateSync(isRetry = false) {
    if (syncState === "syncing") return;

    const missingSystems = selectedFlow.requiredSystems.filter(
      (systemId) => !systems.find((system) => system.id === systemId)?.enabled,
    );

    setLogs([]);
    setActiveStep(0);
    setSyncState("syncing");
    setSystems((current) =>
      current.map((system) =>
        selectedFlow.requiredSystems.includes(system.id) && system.enabled
          ? { ...system, state: "syncing" }
          : system,
      ),
    );
    log(
      isRetry
        ? "Retry avviato per il flusso selezionato"
        : "Avvio sincronizzazione demo",
      "syncing",
    );

    if (missingSystems.length > 0) {
      schedule(() => {
        const disconnectedNames = missingSystems
          .map((id) => systems.find((system) => system.id === id)?.name)
          .filter(Boolean)
          .join(", ");
        setSystems((current) =>
          current.map((system) =>
            missingSystems.includes(system.id)
              ? { ...system, state: "error" }
              : selectedFlow.requiredSystems.includes(system.id) &&
                  system.enabled
                ? { ...system, state: "connected" }
                : system,
          ),
        );
        setActiveStep(null);
        setSyncState("error");
        log(
          `Errore connessione: ${disconnectedNames} non disponibile`,
          "error",
        );
        notify("Sincronizzazione interrotta: riattiva il sistema e riprova");
      }, 720);
      return;
    }

    selectedFlow.steps.forEach((step, index) => {
      schedule(
        () => {
          setActiveStep(index);
          log(`${step.label} · richiesta elaborata`, "syncing");
        },
        460 + index * 520,
      );
    });

    schedule(
      () => {
        setSystems((current) =>
          current.map((system) =>
            selectedFlow.requiredSystems.includes(system.id)
              ? { ...system, state: "success" }
              : system,
          ),
        );
        setActiveStep(null);
        setSyncState("success");
        log(
          `Trasferimento completato: ${selectedFlow.transferSummary}`,
          "success",
        );
        notify("Sincronizzazione completata con successo");
      },
      600 + selectedFlow.steps.length * 520,
    );
  }

  const topState =
    syncState === "syncing"
      ? "Syncing"
      : syncState === "success"
        ? "Success"
        : syncState === "error"
          ? "Error"
          : "Connected";

  return (
    <section
      aria-label="Demo interattiva integrazioni e API"
      className={`relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0e0f10] text-white shadow-[0_28px_80px_rgba(0,0,0,0.34)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_0%,rgba(214,216,220,0.13),transparent_32%),radial-gradient(circle_at_0%_100%,rgba(141,147,155,0.14),transparent_35%)]" />

      <div className="relative border-b border-white/[0.1] bg-[#151617]/95 px-4 py-3.5 backdrop-blur sm:px-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.14] bg-white/[0.06] text-[#d6d8dc]">
              <Network className="size-4" strokeWidth={1.6} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[12px] font-medium">{title}</p>
              <p className="mt-0.5 truncate text-[9px] text-white/48">
                Integration hub · dati demo locali
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusChip state={syncState} label={topState} />
            {syncState === "error" ? (
              <button
                type="button"
                onClick={() => simulateSync(true)}
                className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-[#d6d8dc] px-3 text-[10px] font-medium text-[#131415] transition hover:bg-white"
              >
                <RefreshCw className="size-3" />
                Riprova
              </button>
            ) : (
              <button
                type="button"
                onClick={() => simulateSync()}
                disabled={syncState === "syncing"}
                className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-[#d6d8dc] px-3 text-[10px] font-medium text-[#131415] transition hover:bg-white disabled:cursor-wait disabled:opacity-65"
              >
                {syncState === "syncing" ? (
                  <LoaderCircle className="size-3 animate-spin" />
                ) : (
                  <Play className="size-3" fill="currentColor" />
                )}
                {syncState === "syncing" ? "Sincronizzazione" : "Simula sync"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="relative grid gap-px bg-white/[0.08] xl:grid-cols-[244px_minmax(0,1fr)_304px]">
        <aside className="bg-[#111213] p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/42">
                Sistemi connessi
              </p>
              <p className="mt-1 text-[12px] font-medium">
                {enabledSystems}/5 attivi
              </p>
            </div>
            <CloudCog className="size-4 text-[#d6d8dc]" strokeWidth={1.5} />
          </div>
          <div className="mt-4 space-y-2">
            {systems.map((system) => (
              <SystemToggle
                key={system.id}
                system={system}
                disabled={syncState === "syncing"}
                onToggle={() => changeSystem(system.id)}
              />
            ))}
          </div>
          <div className="mt-5 rounded-xl border border-white/[0.1] bg-white/[0.035] p-3">
            <div className="flex items-center gap-2 text-[#d6d8dc]">
              <PackageCheck className="size-3.5" />
              <p className="text-[10px] font-medium">Sicurezza e mapping</p>
            </div>
            <p className="mt-1.5 text-[9px] leading-4 text-white/46">
              Nella soluzione reale vengono gestiti mapping, error handling e
              permessi per ogni endpoint.
            </p>
          </div>
        </aside>

        <div className="min-w-0 bg-[#101112] p-4 sm:p-5 lg:p-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#a8adb4]">
                Flussi dati
              </p>
              <h3 className="mt-1.5 text-[18px] font-medium tracking-[-0.035em]">
                {selectedFlow.label}
              </h3>
              <p className="mt-1.5 max-w-xl text-[10px] leading-4 text-white/48">
                {description}
              </p>
            </div>
            <button
              type="button"
              onClick={resetSystemStates}
              disabled={syncState === "syncing"}
              title="Ripristina gli stati delle connessioni"
              className="inline-flex items-center gap-1.5 self-start rounded-lg border border-white/[0.14] px-2.5 py-2 text-[10px] text-white/70 transition hover:border-white/30 hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <RefreshCw className="size-3.5" />
              Ripristina
            </button>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            {flows.map((flow) => {
              const selected = flow.id === flowId;
              return (
                <button
                  key={flow.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => selectFlow(flow.id)}
                  disabled={syncState === "syncing"}
                  className={`rounded-xl border p-3 text-left transition disabled:cursor-not-allowed ${
                    selected
                      ? "border-[#d6d8dc]/60 bg-[#d6d8dc]/12 text-white"
                      : "border-white/[0.09] bg-white/[0.025] text-white/62 hover:border-white/[0.22] hover:bg-white/[0.055] hover:text-white"
                  }`}
                >
                  <p className="text-[10px] font-medium">{flow.label}</p>
                  <p className="mt-1 text-[9px] leading-4 opacity-60">
                    {flow.description}
                  </p>
                </button>
              );
            })}
          </div>

          <section className="mt-5 rounded-2xl border border-white/[0.1] bg-white/[0.025] p-3 sm:p-4">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <p className="text-[10px] font-medium">Flusso selezionato</p>
                <p className="mt-1 text-[9px] text-white/46">
                  Seleziona un flusso e avvia una sincronizzazione dimostrativa.
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-md border border-white/[0.11] px-2 py-1 text-[9px] text-white/60">
                <Box className="size-3" /> {selectedFlow.steps.length} passaggi
              </span>
            </div>
            <div className="mt-5 grid gap-2 md:grid-cols-5">
              {selectedFlow.steps.map((step, index) => {
                const system = systems.find((item) => item.id === step.system);
                const Icon = system?.icon ?? Network;
                const isCurrent =
                  syncState === "syncing" && activeStep === index;
                const isDone =
                  syncState === "success" ||
                  (syncState === "syncing" &&
                    activeStep !== null &&
                    activeStep > index);
                return (
                  <div
                    key={`${step.label}-${index}`}
                    className="relative min-w-0"
                  >
                    {index > 0 && (
                      <span
                        className={`absolute right-full top-1/2 hidden h-px w-2 -translate-y-1/2 md:block ${isDone ? "bg-[#d6d8dc]/75" : "bg-white/[0.12]"}`}
                      />
                    )}
                    <div
                      className={`h-full rounded-xl border p-3 transition ${isCurrent ? "border-[#d6d8dc]/60 bg-[#d6d8dc]/12 shadow-[0_0_0_1px_rgba(214,216,220,0.12)]" : isDone ? "border-[#d6d8dc]/28 bg-[#d6d8dc]/[0.07]" : "border-white/[0.09] bg-white/[0.02]"}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`flex size-6 items-center justify-center rounded-md border ${isCurrent || isDone ? "border-[#d6d8dc]/35 bg-[#d6d8dc]/10 text-[#d6d8dc]" : "border-white/[0.1] bg-white/[0.04] text-white/55"}`}
                        >
                          <Icon className="size-3" strokeWidth={1.5} />
                        </span>
                        {isCurrent && (
                          <LoaderCircle className="size-3 animate-spin text-[#d6d8dc]" />
                        )}
                        {isDone && <Check className="size-3 text-[#d6d8dc]" />}
                      </div>
                      <p className="mt-3 text-[10px] font-medium leading-4">
                        {step.label}
                      </p>
                      <p className="mt-1 text-[8px] uppercase tracking-[0.1em] text-white/42">
                        {system?.name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-4 rounded-2xl border border-white/[0.1] bg-white/[0.025] p-3 sm:p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-medium">
                  Riepilogo trasferimento
                </p>
                <p className="mt-1 text-[9px] text-white/46">
                  Payload di esempio inviato attraverso il flusso.
                </p>
              </div>
              <button
                type="button"
                onClick={() => notify("Payload copiato nella demo")}
                title="Copia payload dimostrativo"
                className="inline-flex shrink-0 items-center gap-1 rounded-md border border-white/[0.12] px-2 py-1.5 text-[9px] text-white/65 transition hover:bg-white/[0.06] hover:text-white"
              >
                <ExternalLink className="size-3" /> Copia
              </button>
            </div>
            <div className="mt-3 grid gap-3 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="rounded-xl border border-white/[0.08] bg-black/20 p-3">
                <p className="text-[9px] uppercase tracking-[0.12em] text-white/40">
                  Risultato
                </p>
                <p className="mt-2 text-[11px] leading-5 text-white/80">
                  {syncState === "success"
                    ? selectedFlow.transferSummary
                    : syncState === "error"
                      ? "Nessun dato trasferito: la connessione richiesta non è disponibile."
                      : "Pronto a trasferire i dati del flusso selezionato."}
                </p>
              </div>
              <pre className="overflow-x-auto rounded-xl border border-white/[0.08] bg-black/20 p-3 text-[9px] leading-5 text-[#d6d8dc]">
                <code>{JSON.stringify(selectedFlow.payload, null, 2)}</code>
              </pre>
            </div>
          </section>
        </div>

        <aside className="bg-[#111213] p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/42">
                Monitor tecnico
              </p>
              <p className="mt-1 text-[12px] font-medium">Activity log</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setLogs([]);
                notify("Log tecnico ripristinato");
              }}
              className="rounded-md border border-white/[0.1] px-2 py-1 text-[9px] text-white/55 transition hover:bg-white/[0.06] hover:text-white"
            >
              Pulisci
            </button>
          </div>
          <div className="mt-4 rounded-xl border border-white/[0.08] bg-black/20 p-3">
            <div className="flex items-center justify-between text-[9px] text-white/48">
              <span>Endpoint</span>
              <span className="font-mono text-white/72">
                /v1/sync/{selectedFlow.id}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[9px] text-white/48">
              <span>Modalità</span>
              <span className="text-white/72">Demo locale</span>
            </div>
          </div>
          <ol
            aria-live="polite"
            className="mt-4 space-y-0 border-l border-white/[0.11] pl-3"
          >
            {logs.map((entry) => (
              <li key={entry.id} className="relative py-2.5 first:pt-0">
                <span
                  className={`absolute -left-[17px] top-[17px] size-1.5 rounded-full ${logToneClasses[entry.tone]}`}
                />
                <p className="text-[9px] text-white/42">{entry.time}</p>
                <p className="mt-1 text-[10px] leading-4 text-white/76">
                  {entry.message}
                </p>
              </li>
            ))}
          </ol>
          {syncState === "syncing" && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.035] px-2.5 py-2 text-[9px] text-[#d6d8dc]">
              <LoaderCircle className="size-3 animate-spin" /> Elaborazione in
              corso…
            </div>
          )}
          {syncState === "success" && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-[#d6d8dc]/25 bg-[#d6d8dc]/10 px-2.5 py-2 text-[9px] text-[#f3f3f1]">
              <CheckCircle2 className="size-3" /> Tutti i passaggi completati
            </div>
          )}
          {syncState === "error" && (
            <div className="mt-4 rounded-lg border border-[#8d939b]/30 bg-[#8d939b]/10 p-2.5">
              <div className="flex items-center gap-2 text-[9px] text-[#f3f3f1]">
                <CircleAlert className="size-3" /> Connessione non disponibile
              </div>
              <button
                type="button"
                onClick={() => simulateSync(true)}
                className="mt-2 inline-flex items-center gap-1 text-[9px] font-medium text-[#d6d8dc] transition hover:text-white"
              >
                <RefreshCw className="size-3" /> Riprova dopo aver riattivato il
                sistema
              </button>
            </div>
          )}
        </aside>
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

function SystemToggle({
  system,
  disabled,
  onToggle,
}: {
  system: IntegrationSystem;
  disabled: boolean;
  onToggle: () => void;
}) {
  const Icon = system.icon;
  const presentation = statePresentation[system.state];
  return (
    <div
      className={`rounded-xl border p-3 transition ${system.enabled ? "border-white/[0.1] bg-white/[0.03]" : "border-white/[0.06] bg-white/[0.015] opacity-55"}`}
    >
      <div className="flex items-center gap-2.5">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.04] text-[#d6d8dc]">
          <Icon className="size-3.5" strokeWidth={1.5} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[10px] font-medium">{system.name}</p>
          <p className="mt-0.5 truncate text-[8px] text-white/45">
            {system.role}
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={system.enabled}
          aria-label={`Attiva ${system.name}`}
          onClick={onToggle}
          disabled={disabled}
          className={`relative h-5 w-9 shrink-0 rounded-full transition disabled:cursor-not-allowed ${system.enabled ? "bg-[#d6d8dc]" : "bg-white/[0.16]"}`}
        >
          <span
            className={`absolute top-0.5 size-4 rounded-full bg-[#111213] shadow-sm transition ${system.enabled ? "left-[18px]" : "left-0.5"}`}
          />
        </button>
      </div>
      <div className="mt-2.5 flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[8px] font-medium ${presentation.className}`}
        >
          {system.state === "syncing" && (
            <LoaderCircle className="size-2.5 animate-spin" />
          )}
          {system.state === "success" && <Check className="size-2.5" />}
          {system.state === "error" && <CircleAlert className="size-2.5" />}
          {presentation.label}
        </span>
        <span className="text-[8px] text-white/35">REST API</span>
      </div>
    </div>
  );
}

function StatusChip({ state, label }: { state: SyncState; label: string }) {
  const className =
    state === "syncing"
      ? "border-[#d6d8dc]/35 bg-[#d6d8dc]/10 text-[#f3f3f1]"
      : state === "success"
        ? "border-[#d6d8dc]/45 bg-[#d6d8dc]/15 text-white"
        : state === "error"
          ? "border-[#8d939b]/55 bg-[#8d939b]/15 text-[#f3f3f1]"
          : "border-white/[0.12] bg-white/[0.04] text-[#bfc3c9]";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-medium ${className}`}
    >
      {state === "syncing" ? (
        <LoaderCircle className="size-3 animate-spin" />
      ) : state === "success" ? (
        <CheckCircle2 className="size-3" />
      ) : state === "error" ? (
        <CircleAlert className="size-3" />
      ) : (
        <span className="size-1.5 rounded-full bg-current" />
      )}
      {label}
    </span>
  );
}
