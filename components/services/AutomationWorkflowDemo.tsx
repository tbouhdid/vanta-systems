"use client";

import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import {
  BellRing,
  Bot,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  CirclePlay,
  Clock3,
  Database,
  FileInput,
  Filter,
  LoaderCircle,
  Play,
  Plus,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";

export type AutomationWorkflowDemoProps = {
  className?: string;
  title?: string;
  description?: string;
};

type TriggerId = "form" | "contact" | "schedule";
type ConditionId = "budget" | "priority" | "region";
type RunState = "idle" | "running" | "success" | "error";

type WorkflowAction = {
  id: "lead" | "assignee" | "email" | "follow-up";
  title: string;
  description: string;
  icon: LucideIcon;
  enabled: boolean;
};

type WorkflowLog = {
  id: number;
  time: string;
  message: string;
  tone: "neutral" | "running" | "success" | "error";
};

const triggers: Array<{
  id: TriggerId;
  label: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    id: "form",
    label: "Nuovo modulo ricevuto",
    description: "Quando un visitatore invia una richiesta.",
    icon: FileInput,
  },
  {
    id: "contact",
    label: "Nuovo contatto CRM",
    description: "Quando un lead viene creato nel CRM.",
    icon: Database,
  },
  {
    id: "schedule",
    label: "Ogni lunedì alle 09:00",
    description: "Avvio pianificato per il team commerciale.",
    icon: Clock3,
  },
];

const conditions: Array<{
  id: ConditionId;
  label: string;
  description: string;
}> = [
  {
    id: "budget",
    label: "Budget superiore a 5.000 €",
    description: "Continua con richieste ad alta priorità commerciale.",
  },
  {
    id: "priority",
    label: "Richiesta prioritaria",
    description: "Attiva il workflow se il modulo richiede un contatto rapido.",
  },
  {
    id: "region",
    label: "Area servita",
    description: "Procedi solo per le sedi coperte dal team di riferimento.",
  },
];

const initialActions: WorkflowAction[] = [
  {
    id: "lead",
    title: "Crea lead nel CRM",
    description: "Registra il nuovo contatto e i dati della richiesta.",
    icon: Database,
    enabled: true,
  },
  {
    id: "assignee",
    title: "Assegna commerciale",
    description: "Individua il referente in base a regole e disponibilità.",
    icon: Workflow,
    enabled: true,
  },
  {
    id: "email",
    title: "Invia email",
    description: "Invia una risposta iniziale con i prossimi passaggi.",
    icon: BellRing,
    enabled: true,
  },
  {
    id: "follow-up",
    title: "Crea attività di follow-up",
    description: "Aggiunge una task di contatto nella pipeline commerciale.",
    icon: CheckCircle2,
    enabled: true,
  },
];

const initialLog: WorkflowLog[] = [
  {
    id: 1,
    time: "09:42:18",
    message: "Workflow pronto per la simulazione",
    tone: "neutral",
  },
];

const runToneClasses: Record<RunState, string> = {
  idle: "border-white/[0.12] bg-white/[0.04] text-[#bfc3c9]",
  running: "border-[#d6d8dc]/35 bg-[#d6d8dc]/10 text-[#f0f1ef]",
  success: "border-[#d6d8dc]/45 bg-[#d6d8dc]/15 text-white",
  error: "border-[#8d939b]/55 bg-[#8d939b]/15 text-[#f3f3f1]",
};

const logToneClasses: Record<WorkflowLog["tone"], string> = {
  neutral: "bg-[#8d939b]",
  running: "bg-[#d6d8dc] animate-pulse",
  success: "bg-[#d6d8dc]",
  error: "bg-[#8d939b]",
};

export default function AutomationWorkflowDemo({
  className = "",
  title = "Workflow commerciale",
  description = "Configura una piccola automazione dimostrativa e osserva come si comporta in tempo reale.",
}: AutomationWorkflowDemoProps) {
  const [trigger, setTrigger] = useState<TriggerId>("form");
  const [condition, setCondition] = useState<ConditionId>("budget");
  const [conditionEnabled, setConditionEnabled] = useState(true);
  const [actions, setActions] = useState(initialActions);
  const [runState, setRunState] = useState<RunState>("idle");
  const [logs, setLogs] = useState<WorkflowLog[]>(initialLog);
  const [toast, setToast] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

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

  function addLog(message: string, tone: WorkflowLog["tone"] = "neutral") {
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

  function toggleAction(id: WorkflowAction["id"]) {
    setActions((current) =>
      current.map((action) =>
        action.id === id ? { ...action, enabled: !action.enabled } : action,
      ),
    );
    const action = actions.find((item) => item.id === id);
    if (action) {
      notify(
        `${action.title}: ${action.enabled ? "passaggio disattivato" : "passaggio attivato"}`,
      );
    }
  }

  function runWorkflow() {
    if (runState === "running") return;

    const selectedTrigger = triggers.find((item) => item.id === trigger);
    const selectedCondition = conditions.find((item) => item.id === condition);
    const activeActions = actions.filter((action) => action.enabled);

    setRunState("running");
    setLogs([]);
    addLog(
      `Evento ricevuto: ${selectedTrigger?.label ?? "Trigger demo"}`,
      "running",
    );

    schedule(() => {
      if (conditionEnabled) {
        addLog(
          [
            "Condizione verificata:",
            selectedCondition?.label ?? "regola demo",
          ].join(" "),
          "running",
        );
      } else {
        addLog("Condizione ignorata: flusso impostato senza filtro", "neutral");
      }
    }, 520);

    activeActions.forEach((action, index) => {
      schedule(
        () => {
          addLog(`${action.title} completato`, "running");
        },
        940 + index * 440,
      );
    });

   schedule(
     () => {
        if (activeActions.length === 0) {
          setRunState("error");
          addLog(
            "Esecuzione interrotta: attiva almeno un’azione del workflow",
            "error",
          );
          notify("Simulazione interrotta: nessuna azione attiva");
          return;
        }

       setRunState("success");
       addLog(
          [
            "Esecuzione completata:",
            String(activeActions.length),
            "passaggi eseguiti",
          ].join(" "),
         "success",
       );
       notify("Simulazione completata con successo");
      },
      1350 + activeActions.length * 440,
    );
  }

  const selectedTrigger =
    triggers.find((item) => item.id === trigger) ?? triggers[0];
  const selectedCondition =
    conditions.find((item) => item.id === condition) ?? conditions[0];
  const statusLabel =
    runState === "running"
      ? "Running"
      : runState === "success"
        ? "Success"
        : runState === "error"
          ? "Error"
          : "Pronto";

  return (
    <section
      aria-label="Demo interattiva workflow"
      className={`relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0e0f10] text-white shadow-[0_28px_80px_rgba(0,0,0,0.34)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_0%,rgba(214,216,220,0.13),transparent_32%),radial-gradient(circle_at_0%_100%,rgba(141,147,155,0.14),transparent_35%)]" />
      <div className="relative border-b border-white/[0.1] bg-[#151617]/95 px-4 py-3.5 backdrop-blur sm:px-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.14] bg-white/[0.06] text-[#d6d8dc]">
              <Workflow className="size-4" strokeWidth={1.6} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[12px] font-medium">{title}</p>
              <p className="mt-0.5 truncate text-[9px] text-white/48">
                Demo automation · dati locali
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-medium transition-colors duration-300 ${runToneClasses[runState]}`}
            >
              {runState === "running" ? (
                <LoaderCircle className="size-3 animate-spin" />
              ) : runState === "success" ? (
                <CheckCircle2 className="size-3" />
              ) : runState === "error" ? (
                <CircleAlert className="size-3" />
              ) : (
                <span className="size-1.5 rounded-full bg-current" />
              )}
              {statusLabel}
            </span>
            <button
              type="button"
              onClick={runWorkflow}
              disabled={runState === "running"}
              title="Simula un evento del workflow"
              className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-[#d6d8dc] px-3 text-[10px] font-medium text-[#131415] transition hover:bg-white disabled:cursor-wait disabled:opacity-65"
            >
              {runState === "running" ? (
                <LoaderCircle className="size-3 animate-spin" />
              ) : (
                <Play className="size-3" fill="currentColor" />
              )}
              {runState === "running" ? "In esecuzione" : "Simula"}
            </button>
          </div>
        </div>
      </div>

      <div className="relative grid gap-px bg-white/[0.08] lg:grid-cols-[220px_minmax(0,1fr)_280px]">
        <aside className="bg-[#111213] p-4 sm:p-5">
          <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/42">
            Workflow
          </p>
          <p className="mt-2 text-[13px] font-medium">Acquisizione lead</p>
          <p className="mt-1 text-[10px] leading-4 text-white/48">
            {description}
          </p>
          <div className="mt-5 space-y-1">
            {[
              ["Workflow", Workflow],
              ["Esecuzioni", CirclePlay],
              ["Template", Sparkles],
              ["Log attività", Clock3],
            ].map(([label, Icon], index) => {
              const MenuIcon = Icon as LucideIcon;
              return (
                <button
                  key={label as string}
                  type="button"
                  onClick={() =>
                    notify(
                      index === 0
                        ? "Sei già nel workflow demo"
                        : `${label} disponibile nella soluzione completa`,
                    )
                  }
                  className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[10px] transition ${
                    index === 0
                      ? "bg-white/[0.1] text-white"
                      : "text-white/48 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <MenuIcon className="size-3.5" strokeWidth={1.5} />
                  {label as string}
                </button>
              );
            })}
          </div>
          <div className="mt-6 rounded-xl border border-white/[0.1] bg-white/[0.035] p-3">
            <div className="flex items-center gap-2 text-[#d6d8dc]">
              <Bot className="size-3.5" />
              <p className="text-[10px] font-medium">Automazione assistita</p>
            </div>
            <p className="mt-1.5 text-[9px] leading-4 text-white/46">
              Gli step vengono progettati sulle regole operative reali.
            </p>
          </div>
        </aside>

        <div className="min-w-0 bg-[#101112] p-4 sm:p-5 lg:p-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-[#a8adb4]">
                Builder dimostrativo
              </p>
              <h3 className="mt-1.5 text-[18px] font-medium tracking-[-0.035em]">
                Costruisci il flusso
              </h3>
              <p className="mt-1.5 max-w-lg text-[10px] leading-4 text-white/48">
                Seleziona trigger, regola e passaggi. La simulazione aggiorna il
                log qui a fianco.
              </p>
            </div>
            <button
              type="button"
              title="Aggiungi un passaggio dimostrativo"
              onClick={() =>
                notify(
                  "Nella soluzione finale potrai aggiungere integrazioni e azioni personalizzate",
                )
              }
              className="inline-flex items-center gap-1.5 self-start rounded-lg border border-white/[0.14] px-2.5 py-2 text-[10px] text-white/72 transition hover:border-white/30 hover:bg-white/[0.05] hover:text-white"
            >
              <Plus className="size-3.5" />
              Aggiungi nodo
            </button>
          </div>

          <div className="mt-6 space-y-3">
            <WorkflowNodeCard
              title="Quando accade"
              number="01"
              icon={CirclePlay}
            >
              <div className="grid gap-2 sm:grid-cols-3">
                {triggers.map((item) => {
                  const Icon = item.icon;
                  const selected = trigger === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => {
                        setTrigger(item.id);
                        notify(`Trigger selezionato: ${item.label}`);
                      }}
                      className={`rounded-xl border p-3 text-left transition ${
                        selected
                          ? "border-[#d6d8dc]/60 bg-[#d6d8dc]/12 text-white"
                          : "border-white/[0.09] bg-white/[0.025] text-white/62 hover:border-white/[0.22] hover:bg-white/[0.055] hover:text-white"
                      }`}
                    >
                      <Icon className="size-3.5" strokeWidth={1.55} />
                      <p className="mt-3 text-[10px] font-medium">
                        {item.label}
                      </p>
                      <p className="mt-1 text-[9px] leading-4 opacity-62">
                        {item.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </WorkflowNodeCard>

            <Connector enabled />

            <WorkflowNodeCard
              title="Verifica una condizione"
              number="02"
              icon={Filter}
              trailing={
                <Toggle
                  enabled={conditionEnabled}
                  onToggle={() => {
                    setConditionEnabled((current) => !current);
                    notify(
                      conditionEnabled
                        ? "Condizione disattivata"
                        : "Condizione attivata",
                    );
                  }}
                  label="Attiva condizione"
                />
              }
            >
              <div
                className={`flex flex-col gap-3 rounded-xl border p-3 transition sm:flex-row sm:items-center sm:justify-between ${conditionEnabled ? "border-white/[0.11] bg-white/[0.035]" : "border-white/[0.06] bg-white/[0.02] opacity-55"}`}
              >
                <div>
                  <p className="text-[10px] font-medium">
                    {conditionEnabled
                      ? ["Se", selectedCondition.label].join(" ")
                      : "Condizione disattivata"}
                  </p>
                  <p className="mt-1 text-[9px] text-white/48">
                    {conditionEnabled
                      ? selectedCondition.description
                      : "Il workflow procede senza applicare filtri."}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-white/[0.12] px-2 py-1 text-[9px] text-white/62">
                  <Filter className="size-3" /> Qualifica lead
                </span>
              </div>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {conditions.map((item) => {
                  const selected = condition === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={selected}
                      disabled={!conditionEnabled}
                      onClick={() => {
                        setCondition(item.id);
                        notify(
                          ["Condizione selezionata:", item.label].join(" "),
                        );
                      }}
                      className={[
                        "rounded-lg border px-2.5 py-2 text-left text-[9px] transition",
                        selected
                          ? "border-[#d6d8dc]/55 bg-[#d6d8dc]/10 text-white"
                          : "border-white/[0.09] bg-white/[0.02] text-white/55 hover:border-white/[0.2] hover:text-white",
                        !conditionEnabled &&
                          "cursor-not-allowed opacity-40 hover:border-white/[0.09] hover:text-white/55",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <span className="block font-medium">{item.label}</span>
                      <span className="mt-1 block leading-4 opacity-60">
                        {item.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </WorkflowNodeCard>

            <Connector enabled={actions.some((action) => action.enabled)} />

            <WorkflowNodeCard
              title="Esegui le azioni"
              number="03"
              icon={Sparkles}
            >
              <div className="space-y-2">
                {actions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <div
                      key={action.id}
                      className={`flex items-center gap-3 rounded-xl border p-3 transition ${action.enabled ? "border-white/[0.11] bg-white/[0.035]" : "border-white/[0.06] bg-white/[0.015] opacity-48"}`}
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.04] text-[#d6d8dc]">
                        <Icon className="size-3.5" strokeWidth={1.55} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[10px] font-medium">
                          {action.title}
                        </span>
                        <span className="mt-0.5 block text-[9px] text-white/48">
                          {action.description}
                        </span>
                      </span>
                      <Toggle
                        enabled={action.enabled}
                        onToggle={() => toggleAction(action.id)}
                        label={`Attiva ${action.title}`}
                      />
                    </div>
                  );
                })}
              </div>
            </WorkflowNodeCard>
          </div>
        </div>

        <aside className="bg-[#111213] p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-white/42">
                Esecuzione demo
              </p>
              <p className="mt-1 text-[12px] font-medium">Activity log</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setLogs(initialLog);
                notify("Log demo ripristinato");
              }}
              className="rounded-md border border-white/[0.1] px-2 py-1 text-[9px] text-white/55 transition hover:bg-white/[0.06] hover:text-white"
            >
              Pulisci
            </button>
          </div>
          <div className="mt-4 rounded-xl border border-white/[0.08] bg-black/20 p-3">
            <div className="flex items-center justify-between text-[9px] text-white/48">
              <span>Trigger corrente</span>
              <span className="max-w-[130px] truncate text-right text-white/72">
                {selectedTrigger.label}
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[9px] text-white/48">
              <span>Passaggi attivi</span>
              <span className="text-white/72">
                {actions.filter((action) => action.enabled).length}/4
              </span>
            </div>
          </div>
          <ol className="mt-4 space-y-0 border-l border-white/[0.11] pl-3">
            {logs.map((log) => (
              <li key={log.id} className="relative py-2.5 first:pt-0">
                <span
                  className={`absolute -left-[17px] top-[17px] size-1.5 rounded-full ${logToneClasses[log.tone]}`}
                />
                <p className="text-[9px] text-white/42">{log.time}</p>
                <p className="mt-1 text-[10px] leading-4 text-white/76">
                  {log.message}
                </p>
              </li>
            ))}
          </ol>
          {runState === "running" && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.035] px-2.5 py-2 text-[9px] text-[#d6d8dc]">
              <LoaderCircle className="size-3 animate-spin" /> Elaborazione
              passaggi in corso…
            </div>
          )}
          {runState === "success" && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-[#d6d8dc]/25 bg-[#d6d8dc]/10 px-2.5 py-2 text-[9px] text-[#f3f3f1]">
              <CheckCircle2 className="size-3" /> Workflow completato
              correttamente
            </div>
          )}
        </aside>
      </div>

      {toast && (
        <div
          role="status"
          className="absolute bottom-4 right-4 z-10 flex max-w-[290px] items-center gap-2 rounded-xl border border-white/[0.16] bg-[#202224]/95 px-3 py-2.5 text-[10px] text-white shadow-xl backdrop-blur"
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

function WorkflowNodeCard({
  title,
  number,
  icon: Icon,
  children,
  trailing,
}: {
  title: string;
  number: string;
  icon: LucideIcon;
  children: ReactNode;
  trailing?: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/[0.1] bg-white/[0.025] p-3 sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-lg border border-white/[0.12] bg-[#d6d8dc]/10 text-[#d6d8dc]">
            <Icon className="size-3.5" strokeWidth={1.5} />
          </span>
          <div>
            <p className="text-[10px] font-medium">{title}</p>
            <p className="mt-0.5 text-[8px] uppercase tracking-[0.12em] text-white/38">
              Step {number}
            </p>
          </div>
        </div>
        {trailing}
      </div>
      {children}
    </section>
  );
}

function Connector({ enabled }: { enabled: boolean }) {
  return (
    <div className="flex h-5 items-center pl-7">
      <span
        className={`h-full w-px ${enabled ? "bg-[#bfc3c9]/55" : "bg-white/[0.12]"}`}
      />
      <ChevronRight
        className={`-ml-[7px] size-3 rotate-90 ${enabled ? "text-[#d6d8dc]" : "text-white/35"}`}
      />
    </div>
  );
}

function Toggle({
  enabled,
  onToggle,
  label,
}: {
  enabled: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={onToggle}
      className={`relative h-5 w-9 shrink-0 rounded-full transition ${enabled ? "bg-[#d6d8dc]" : "bg-white/[0.15]"}`}
    >
      <span
        className={`absolute top-0.5 size-4 rounded-full bg-[#111213] shadow-sm transition ${enabled ? "left-[18px]" : "left-0.5"}`}
      />
    </button>
  );
}
