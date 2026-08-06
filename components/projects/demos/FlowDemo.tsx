"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  CirclePlay,
  Clock3,
  Copy,
  Database,
  FileText,
  GitBranch,
  Link2,
  LoaderCircle,
  Play,
  Plus,
  RefreshCw,
  Settings2,
  Sparkles,
  Webhook,
  Workflow,
} from "lucide-react";

import {
  DemoAppShell,
  DemoKpiCard,
  DemoModal,
  DemoStatusPill,
  DemoTable,
  DemoToastStack,
} from "@/components/projects/demo/DemoPrimitives";
import type { DemoBranding, DemoToast } from "@/components/projects/demo/types";

type FlowSection = "workflow" | "templates" | "executions" | "integrations";
type NodeKind = "trigger" | "action" | "condition" | "notification";
type ExecutionStatus = "success" | "running" | "error";
type StatusTone = "neutral" | "success" | "running" | "warning" | "error";

type WorkflowNode = {
  id: string;
  title: string;
  description: string;
  kind: NodeKind;
  active: boolean;
};

type Execution = {
  id: string;
  workflow: string;
  status: ExecutionStatus;
  startedAt: string;
  duration: string;
  total: number;
  retryOf?: string;
};

type Integration = {
  id: string;
  name: string;
  detail: string;
  icon: "database" | "webhook" | "file" | "bot";
  connected: boolean;
  lastSync: string;
};

const initialNodes: WorkflowNode[] = [
  {
    id: "trigger",
    title: "Nuovo lead acquisito",
    description: "Quando un contatto completa il form commerciale.",
    kind: "trigger",
    active: true,
  },
  {
    id: "enrich",
    title: "Verifica dati",
    description: "Completa ragione sociale e settore da fonti disponibili.",
    kind: "action",
    active: true,
  },
  {
    id: "score",
    title: "Valuta priorità",
    description: "Assegna una priorità in base a budget e interesse.",
    kind: "condition",
    active: true,
  },
  {
    id: "notify",
    title: "Avvisa il team",
    description: "Invia una notifica al commerciale responsabile.",
    kind: "notification",
    active: true,
  },
];

const nodeOptions: Array<Omit<WorkflowNode, "id" | "active">> = [
  {
    title: "Crea attività di follow-up",
    description: "Programma un promemoria per il commerciale assegnato.",
    kind: "action",
  },
  {
    title: "Invia riepilogo via email",
    description: "Condivide i dati del contatto con il team interno.",
    kind: "notification",
  },
  {
    title: "Controlla disponibilità",
    description: "Verifica una condizione prima di proseguire il flusso.",
    kind: "condition",
  },
];

const initialExecutions: Execution[] = [
  {
    id: "run-2048",
    workflow: "Onboarding commerciale",
    status: "success",
    startedAt: "Oggi, 10:42",
    duration: "8,4 s",
    total: 4,
  },
  {
    id: "run-2047",
    workflow: "Onboarding commerciale",
    status: "success",
    startedAt: "Oggi, 09:18",
    duration: "7,9 s",
    total: 4,
  },
  {
    id: "run-2046",
    workflow: "Follow-up preventivo",
    status: "error",
    startedAt: "Ieri, 16:05",
    duration: "2,1 s",
    total: 3,
  },
];

const executionBaseline = {
  total: 148,
  success: 143,
  error: 5,
};

const initialIntegrations: Integration[] = [
  {
    id: "crm",
    name: "CRM aziendale",
    detail: "Contatti, attività e opportunità",
    icon: "database",
    connected: true,
    lastSync: "Sincronizzato 2 min fa",
  },
  {
    id: "webhook",
    name: "Webhook aziendale",
    detail: "Endpoint di acquisizione lead",
    icon: "webhook",
    connected: true,
    lastSync: "Sincronizzato 12 min fa",
  },
  {
    id: "drive",
    name: "Archivio documenti",
    detail: "Cartelle commerciali condivise",
    icon: "file",
    connected: false,
    lastSync: "Non collegato",
  },
  {
    id: "ai",
    name: "Assistente AI",
    detail: "Classificazione e suggerimenti",
    icon: "bot",
    connected: true,
    lastSync: "Sincronizzato 38 min fa",
  },
];

const templates = [
  {
    id: "lead",
    title: "Qualifica lead",
    description: "Verifica, punteggio e assegnazione automatica.",
    steps: 4,
  },
  {
    id: "quote",
    title: "Follow-up preventivo",
    description: "Promemoria, notifica e controllo risposta.",
    steps: 3,
  },
  {
    id: "support",
    title: "Escalation assistenza",
    description: "Priorità, assegnazione e aggiornamento cliente.",
    steps: 4,
  },
];

const templateNodes: Record<string, WorkflowNode[]> = {
  lead: initialNodes,
  quote: [
    {
      id: "quote-trigger",
      title: "Preventivo inviato",
      description: "Si attiva quando il documento viene condiviso.",
      kind: "trigger",
      active: true,
    },
    {
      id: "quote-wait",
      title: "Attendi 3 giorni",
      description: "Lascia tempo al cliente per valutare l'offerta.",
      kind: "action",
      active: true,
    },
    {
      id: "quote-notify",
      title: "Crea follow-up",
      description: "Apre un'attività per il commerciale.",
      kind: "notification",
      active: true,
    },
  ],
  support: [
    {
      id: "support-trigger",
      title: "Ticket prioritario",
      description: "Rileva una richiesta con priorità elevata.",
      kind: "trigger",
      active: true,
    },
    {
      id: "support-check",
      title: "Analizza categoria",
      description: "Valuta categoria e SLA di riferimento.",
      kind: "condition",
      active: true,
    },
    {
      id: "support-assign",
      title: "Assegna specialista",
      description: "Individua il team più adatto alla richiesta.",
      kind: "action",
      active: true,
    },
    {
      id: "support-notify",
      title: "Aggiorna cliente",
      description: "Invia una conferma di presa in carico.",
      kind: "notification",
      active: true,
    },
  ],
};

const sectionItems = [
  { id: "workflow", label: "Workflow", icon: Workflow },
  { id: "templates", label: "Template", icon: Copy },
  { id: "executions", label: "Esecuzioni", icon: Activity },
  { id: "integrations", label: "Integrazioni", icon: Link2 },
];

export default function FlowDemo({ branding }: { branding: DemoBranding }) {
  const [section, setSection] = useState<FlowSection>("workflow");
  const [workflowName, setWorkflowName] = useState("Onboarding commerciale");
  const [nodes, setNodes] = useState<WorkflowNode[]>(initialNodes);
  const [selectedNodeId, setSelectedNodeId] = useState("enrich");
  const [newNodeKind, setNewNodeKind] = useState(nodeOptions[0].title);
  const [executions, setExecutions] = useState<Execution[]>(initialExecutions);
  const [selectedExecutionId, setSelectedExecutionId] = useState(
    initialExecutions[0].id,
  );
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [isPreparingTemplate, setIsPreparingTemplate] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState("Bozza locale");
  const [toasts, setToasts] = useState<DemoToast[]>([]);
  const [modalNodeId, setModalNodeId] = useState<string | null>(null);
  const toastIdRef = useRef(1);
  const nodeIdRef = useRef(1);
  const runIdRef = useRef(2101);
  const runTimerRef = useRef<number | null>(null);
  const templateTimerRef = useRef<number | null>(null);
  const saveTimerRef = useRef<number | null>(null);
  const runLockRef = useRef(false);

  const selectedNode =
    nodes.find((node) => node.id === selectedNodeId) ?? nodes[0];
  const modalNode = nodes.find((node) => node.id === modalNodeId) ?? null;
  const latestExecution = executions[0];
  const selectedExecution =
    executions.find((execution) => execution.id === selectedExecutionId) ??
    latestExecution;
  const activeSteps = nodes.filter((node) => node.active).length;
  const connectedIntegrations = integrations.filter(
    (item) => item.connected,
  ).length;
  const executionStats = useMemo(() => {
    const localStats = {
      total: executions.length,
      success: executions.filter((execution) => execution.status === "success")
        .length,
      running: executions.filter((execution) => execution.status === "running")
        .length,
      error: executions.filter((execution) => execution.status === "error")
        .length,
    };
    const initialSuccess = initialExecutions.filter(
      (execution) => execution.status === "success",
    ).length;
    const initialError = initialExecutions.filter(
      (execution) => execution.status === "error",
    ).length;

    return {
      total:
        executionBaseline.total + localStats.total - initialExecutions.length,
      success: executionBaseline.success + localStats.success - initialSuccess,
      running: localStats.running,
      error: executionBaseline.error + localStats.error - initialError,
    };
  }, [executions]);
  const isRunning = executionStats.running > 0;
  const currentWorkflowExecution = executions.find(
    (execution) => execution.workflow === workflowName,
  );
  const workflowStatus = currentWorkflowExecution
    ? getWorkflowStatus(currentWorkflowExecution.status)
    : { label: "Pronto per il test", tone: "neutral" as const };
  const executionLog = useMemo(
    () =>
      executions.slice(0, 5).map((execution) => ({
        id: execution.id,
        message: `${execution.startedAt} · ${getExecutionLogMessage(execution)}`,
        tone: execution.status,
      })),
    [executions],
  );
  const executionTrend = useMemo(
    () =>
      executions
        .slice(0, 7)
        .reverse()
        .map((execution) => ({
          id: execution.id,
          label: execution.id.replace("run-", "#"),
          score:
            execution.status === "success"
              ? 100
              : execution.status === "running"
                ? 62
                : 26,
          status: execution.status,
        })),
    [executions],
  );
  const navItems = useMemo(
    () =>
      sectionItems.map((item) =>
        item.id === "executions"
          ? { ...item, badge: executionStats.total }
          : item,
      ),
    [executionStats.total],
  );
  const isLightTheme =
    branding.theme === "light" || branding.theme === "titanium";
  const nativeOptionClass = isLightTheme
    ? "bg-[#f4f4f1] text-[#171819]"
    : "bg-[#161718] text-white";
  const brandForeground = getBrandForeground(branding.brandColor);

  useEffect(() => {
    return () => {
      if (runTimerRef.current !== null)
        window.clearTimeout(runTimerRef.current);
      if (templateTimerRef.current !== null)
        window.clearTimeout(templateTimerRef.current);
      if (saveTimerRef.current !== null)
        window.clearTimeout(saveTimerRef.current);
    };
  }, []);

  function showToast(
    title: string,
    description?: string,
    tone: DemoToast["tone"] = "info",
  ) {
    const id = toastIdRef.current++;
    setToasts((current) => [...current, { id, title, description, tone }]);
  }

  function toggleNode(nodeId: string) {
    if (isRunning || isPreparingTemplate) {
      showToast(
        "Workflow in aggiornamento",
        "Attendi la fine dell'operazione in corso.",
        "warning",
      );
      return;
    }
    const toggledNode = nodes.find((node) => node.id === nodeId);
    if (!toggledNode) return;

    setNodes((current) =>
      current.map((node) =>
        node.id === nodeId ? { ...node, active: !node.active } : node,
      ),
    );
    showToast(
      toggledNode.active ? "Passaggio disattivato" : "Passaggio attivato",
      toggledNode.title,
      toggledNode.active ? "warning" : "success",
    );
  }

  function addNode() {
    if (isRunning || isPreparingTemplate) return;
    const option = nodeOptions.find((item) => item.title === newNodeKind);
    if (!option) return;
    const node: WorkflowNode = {
      ...option,
      id: `${option.kind}-custom-${nodeIdRef.current++}`,
      active: true,
    };
    setNodes((current) => [...current, node]);
    setSelectedNodeId(node.id);
    showToast(
      "Passaggio aggiunto",
      `${option.title} è ora nel workflow.`,
      "success",
    );
  }

  function runWorkflow(
    options: { workflow?: string; retryOf?: string; total?: number } = {},
  ) {
    if (runLockRef.current || isRunning || isPreparingTemplate) return;
    const activeNodeCount = nodes.filter((node) => node.active).length;
    if (!activeNodeCount) {
      showToast(
        "Attiva almeno un passaggio",
        "Il workflow non ha passaggi eseguibili.",
        "warning",
      );
      return;
    }

    const runId = `run-${runIdRef.current++}`;
    const total = options.total ?? activeNodeCount;
    const isRetry = Boolean(options.retryOf);
    const shouldFail = activeNodeCount > initialNodes.length && !isRetry;
    const runningExecution: Execution = {
      id: runId,
      workflow: options.workflow ?? workflowName,
      status: "running",
      startedAt: getCurrentExecutionTime(),
      duration: "In corso",
      total,
      retryOf: options.retryOf,
    };
    runLockRef.current = true;
    setExecutions((current) => [runningExecution, ...current]);
    setSelectedExecutionId(runId);
    showToast(
      isRetry ? "Retry in esecuzione" : "Workflow in esecuzione",
      `${total} passaggi in elaborazione per ${branding.companyName}.`,
      "info",
    );

    runTimerRef.current = window.setTimeout(() => {
      setExecutions((current) =>
        current.map((execution) =>
          execution.id === runId
            ? {
                ...execution,
                status: shouldFail ? "error" : "success",
                duration: shouldFail ? "5,8 s" : isRetry ? "6,4 s" : "7,2 s",
              }
            : execution,
        ),
      );
      runTimerRef.current = null;
      runLockRef.current = false;
      showToast(
        shouldFail
          ? "Esecuzione da verificare"
          : isRetry
            ? "Retry completato"
            : "Workflow completato",
        shouldFail
          ? "Il passaggio aggiuntivo attende la configurazione finale."
          : isRetry
            ? "La nuova esecuzione ha completato tutti i passaggi."
            : "Tutti i passaggi attivi sono stati elaborati.",
        shouldFail ? "error" : "success",
      );
    }, 1300);
  }

  function retryExecution(execution: Execution) {
    if (execution.status !== "error" || runLockRef.current || isRunning) return;
    runWorkflow({
      workflow: execution.workflow,
      retryOf: execution.id,
      total: execution.total,
    });
  }

  function applyTemplate(templateId: string) {
    if (isPreparingTemplate || isRunning) return;
    const template = templates.find((item) => item.id === templateId);
    const templateNodesForSelection = templateNodes[templateId];
    if (!template || !templateNodesForSelection) return;
    setIsPreparingTemplate(true);
    showToast(
      "Template in preparazione",
      "Aggiorniamo il canvas della demo.",
      "info",
    );
    templateTimerRef.current = window.setTimeout(() => {
      const nextNodes = templateNodesForSelection.map((node) => ({ ...node }));
      setNodes(nextNodes);
      setSelectedNodeId(nextNodes[0]?.id ?? "");
      setWorkflowName(template.title);
      setIsPreparingTemplate(false);
      templateTimerRef.current = null;
      setSection("workflow");
      showToast(
        "Template applicato",
        "Puoi ora personalizzare ogni passaggio.",
        "success",
      );
    }, 520);
  }

  function toggleIntegration(id: string) {
    const integration = integrations.find((item) => item.id === id);
    if (!integration) return;
    setIntegrations((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              connected: !item.connected,
              lastSync: !item.connected ? "Collegato adesso" : "Pausa manuale",
            }
          : item,
      ),
    );
    showToast(
      integration.connected ? "Integrazione sospesa" : "Integrazione collegata",
      getIntegrationName(integration, branding.companyName),
      integration.connected ? "warning" : "success",
    );
  }

  function saveWorkflow() {
    if (isSaving || isRunning || isPreparingTemplate) return;
    setIsSaving(true);
    saveTimerRef.current = window.setTimeout(() => {
      setLastSavedAt("Salvata ora");
      setIsSaving(false);
      saveTimerRef.current = null;
      showToast(
        "Workflow salvato",
        `Configurazione demo di ${branding.companyName} aggiornata per questa sessione.`,
        "success",
      );
    }, 260);
  }

  function resetDemo() {
    if (runTimerRef.current !== null) window.clearTimeout(runTimerRef.current);
    if (templateTimerRef.current !== null)
      window.clearTimeout(templateTimerRef.current);
    if (saveTimerRef.current !== null)
      window.clearTimeout(saveTimerRef.current);
    runTimerRef.current = null;
    templateTimerRef.current = null;
    saveTimerRef.current = null;
    runLockRef.current = false;
    runIdRef.current = 2101;
    nodeIdRef.current = 1;
    setSection("workflow");
    setWorkflowName("Onboarding commerciale");
    setNodes(initialNodes.map((node) => ({ ...node })));
    setSelectedNodeId("enrich");
    setNewNodeKind(nodeOptions[0].title);
    setExecutions(initialExecutions.map((execution) => ({ ...execution })));
    setSelectedExecutionId(initialExecutions[0].id);
    setIntegrations(
      initialIntegrations.map((integration) => ({ ...integration })),
    );
    setIsPreparingTemplate(false);
    setIsSaving(false);
    setLastSavedAt("Bozza locale");
    setModalNodeId(null);
    const id = toastIdRef.current++;
    setToasts([
      {
        id,
        title: "Demo ripristinata",
        description: "Le modifiche locali sono state rimosse.",
        tone: "info",
      },
    ]);
  }

  const actions = (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={saveWorkflow}
        disabled={isSaving || isRunning || isPreparingTemplate}
        className="hidden h-8 items-center gap-1.5 rounded-md border border-current/15 px-2.5 text-[10px] font-medium opacity-70 transition hover:opacity-100 disabled:cursor-wait disabled:opacity-45 sm:inline-flex"
      >
        {isSaving ? (
          <LoaderCircle className="size-3 animate-spin" />
        ) : (
          <Check className="size-3" />
        )}
        {isSaving ? "Salvataggio" : "Salva demo"}
      </button>
      <button
        type="button"
        onClick={() => runWorkflow()}
        disabled={isRunning || isPreparingTemplate}
        className="inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-[10px] font-semibold text-[#111213] transition disabled:cursor-wait disabled:opacity-65"
        style={{ backgroundColor: branding.brandColor, color: brandForeground }}
      >
        {isRunning ? (
          <LoaderCircle className="size-3 animate-spin" />
        ) : (
          <Play className="size-3" />
        )}
        {isRunning ? "Esecuzione" : "Esegui"}
      </button>
    </div>
  );

  return (
    <>
      <DemoAppShell
        branding={branding}
        title="FLOW"
        subtitle="Automation workspace · demo interattiva"
        navItems={navItems}
        activeSection={section}
        onSectionChange={(next) => setSection(next as FlowSection)}
        actions={actions}
        onReset={resetDemo}
      >
        {section === "workflow" && (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <DemoKpiCard
                label="Esecuzioni oggi"
                value={String(executionStats.total)}
                detail={`Ultima ${latestExecution.id}`}
                icon={CirclePlay}
              />
              <DemoKpiCard
                label="Success"
                value={String(executionStats.success)}
                detail="Completate senza anomalie"
                icon={CheckCircle2}
              />
              <DemoKpiCard
                label="Running"
                value={String(executionStats.running)}
                detail={
                  isRunning ? "Elaborazione in corso" : "Nessuna in corso"
                }
                icon={Clock3}
              />
              <DemoKpiCard
                label="Error"
                value={String(executionStats.error)}
                detail={
                  executionStats.error
                    ? "Retry disponibile nello storico"
                    : "Nessuna anomalia"
                }
                icon={AlertTriangle}
              />
            </div>

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
              <section className="overflow-hidden rounded-xl border border-current/10 bg-white/[0.035]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-current/10 px-4 py-3">
                  <div>
                    <p className="text-[12px] font-semibold">{workflowName}</p>
                    <p className="mt-0.5 text-[10px] opacity-55">
                      Workflow dimostrativo di {branding.companyName} ·
                      modifiche solo locali.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <DemoStatusPill
                      label={`${activeSteps} passaggi attivi`}
                      tone="success"
                      dot
                    />
                    <DemoStatusPill
                      label={workflowStatus.label}
                      tone={workflowStatus.tone}
                      dot
                    />
                    <span className="hidden text-[9px] opacity-50 lg:inline">
                      {lastSavedAt}
                    </span>
                  </div>
                </div>
                <div className="relative min-h-[330px] overflow-x-auto p-4 sm:p-6">
                  <div className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(currentColor_0.7px,transparent_0.7px)] [background-size:18px_18px]" />
                  <div className="relative mx-auto flex min-w-[620px] items-center justify-between gap-2 pt-10">
                    {nodes.map((node, index) => (
                      <div
                        key={node.id}
                        className="flex min-w-0 items-center gap-2"
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedNodeId(node.id)}
                          disabled={isPreparingTemplate}
                          aria-pressed={selectedNodeId === node.id}
                          className={`group w-[136px] rounded-lg border p-3 text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                            selectedNodeId === node.id
                              ? "border-current bg-white/[0.11] shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
                              : "border-current/12 bg-black/[0.08]"
                          } ${node.active ? "" : "opacity-45"}`}
                          style={
                            selectedNodeId === node.id
                              ? {
                                  borderColor: branding.brandColor,
                                  boxShadow: `0 0 0 1px ${branding.brandColor}44`,
                                }
                              : undefined
                          }
                        >
                          <NodeIcon kind={node.kind} className="size-4" />
                          <p className="mt-3 text-[10px] font-semibold leading-4">
                            {node.title}
                          </p>
                          <p className="mt-1 line-clamp-2 text-[9px] leading-3 opacity-55">
                            {node.description}
                          </p>
                          <span
                            className="mt-3 block h-1 rounded-full transition-colors"
                            style={{
                              backgroundColor: node.active
                                ? branding.brandColor
                                : "currentColor",
                            }}
                          />
                        </button>
                        {index !== nodes.length - 1 && (
                          <ArrowRight
                            className="size-4 shrink-0 opacity-35"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addNode}
                      disabled={isRunning || isPreparingTemplate}
                      title="Aggiungi il passaggio selezionato nel pannello laterale"
                      className="flex size-10 shrink-0 items-center justify-center rounded-full border border-dashed border-current/25 opacity-60 transition hover:border-current hover:opacity-100"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </div>
              </section>

              <aside className="rounded-xl border border-current/10 bg-black/[0.08] p-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[11px] font-semibold">
                      Passaggio selezionato
                    </p>
                    <p className="mt-0.5 text-[9px] opacity-55">
                      Configura il comportamento demo.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setModalNodeId(selectedNode?.id ?? null)}
                    disabled={isRunning || isPreparingTemplate}
                    className="rounded-md border border-current/15 p-1.5 opacity-60 transition hover:opacity-100"
                    title="Apri dettagli passaggio"
                  >
                    <Settings2 className="size-3" />
                  </button>
                </div>
                {selectedNode && (
                  <div className="mt-5">
                    <div className="flex items-center gap-2">
                      <span
                        className="flex size-8 items-center justify-center rounded-md"
                        style={{
                          backgroundColor: `${branding.brandColor}22`,
                          color: branding.brandColor,
                        }}
                      >
                        <NodeIcon kind={selectedNode.kind} className="size-4" />
                      </span>
                      <div>
                        <p className="text-[11px] font-semibold">
                          {selectedNode.title}
                        </p>
                        <p className="text-[9px] uppercase tracking-[0.12em] opacity-50">
                          {selectedNode.kind}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-[10px] leading-5 opacity-65">
                      {selectedNode.description}
                    </p>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={selectedNode.active}
                      onClick={() => toggleNode(selectedNode.id)}
                      disabled={isRunning || isPreparingTemplate}
                      className="mt-5 flex w-full items-center justify-between rounded-md border border-current/12 bg-white/[0.04] p-2.5 text-[10px] transition hover:bg-white/[0.08]"
                    >
                      <span>Passaggio attivo</span>
                      <span
                        className={`flex h-4 w-7 items-center rounded-full p-0.5 transition ${selectedNode.active ? "justify-end" : "justify-start"}`}
                        style={{
                          backgroundColor: selectedNode.active
                            ? branding.brandColor
                            : "currentColor",
                        }}
                      >
                        <span className="size-3 rounded-full bg-white shadow-sm" />
                      </span>
                    </button>
                  </div>
                )}
                <div className="mt-5 border-t border-current/10 pt-4">
                  <label className="text-[10px] font-medium">
                    Aggiungi passaggio
                  </label>
                  <select
                    value={newNodeKind}
                    onChange={(event) => setNewNodeKind(event.target.value)}
                    disabled={isRunning || isPreparingTemplate}
                    className="mt-2 h-9 w-full rounded-md border border-current/15 bg-black/10 px-2 text-[10px] outline-none"
                  >
                    {nodeOptions.map((option) => (
                      <option
                        key={option.title}
                        value={option.title}
                        className={nativeOptionClass}
                      >
                        {option.title}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={addNode}
                    disabled={isRunning || isPreparingTemplate}
                    className="mt-2 inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-md text-[10px] font-semibold transition disabled:cursor-wait disabled:opacity-55"
                    style={{
                      backgroundColor: branding.brandColor,
                      color: brandForeground,
                    }}
                  >
                    <Plus className="size-3" /> Aggiungi al flusso
                  </button>
                </div>
              </aside>
            </div>

            <section className="rounded-xl border border-current/10 bg-white/[0.035] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold">Storico attività</p>
                  <p className="mt-0.5 text-[9px] opacity-55">
                    Ultime {executionLog.length} esecuzioni; i KPI includono lo
                    storico demo della giornata.
                  </p>
                </div>
                <DemoStatusPill
                  label={latestExecution.id}
                  tone={getWorkflowStatus(latestExecution.status).tone}
                  dot
                />
              </div>
              <div className="mt-3 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-1">
                  {executionLog.slice(0, 3).map((entry) => (
                    <p
                      key={entry.id}
                      className="rounded-md border border-current/10 bg-black/[0.06] px-3 py-2 text-[9px] leading-4 opacity-70"
                    >
                      {entry.message}
                    </p>
                  ))}
                </div>
                <ExecutionTrend
                  trend={executionTrend}
                  brandColor={branding.brandColor}
                />
              </div>
            </section>
          </div>
        )}

        {section === "templates" && (
          <div>
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[13px] font-semibold">
                  Template pronti da adattare
                </p>
                <p className="mt-1 text-[10px] opacity-60">
                  Sono esempi dimostrativi: ogni flusso viene progettato sui
                  processi reali.
                </p>
              </div>
              {isPreparingTemplate && (
                <DemoStatusPill
                  label="Preparazione canvas"
                  tone="running"
                  dot
                />
              )}
            </div>
            <div className="grid gap-3 lg:grid-cols-3">
              {templates.map((template) => (
                <article
                  key={template.id}
                  className="rounded-xl border border-current/10 bg-white/[0.035] p-4 transition hover:-translate-y-0.5 hover:bg-white/[0.06]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className="flex size-9 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: `${branding.brandColor}20`,
                        color: branding.brandColor,
                      }}
                    >
                      <Sparkles className="size-4" />
                    </span>
                    <DemoStatusPill
                      label={`${template.steps} passaggi`}
                      tone="neutral"
                    />
                  </div>
                  <h3 className="mt-5 text-[13px] font-semibold">
                    {template.title}
                  </h3>
                  <p className="mt-2 text-[10px] leading-5 opacity-60">
                    {template.description}
                  </p>
                  <button
                    type="button"
                    disabled={isPreparingTemplate || isRunning}
                    onClick={() => applyTemplate(template.id)}
                    className="mt-5 inline-flex items-center gap-1.5 text-[10px] font-semibold transition hover:opacity-65 disabled:opacity-40"
                    style={{ color: branding.brandColor }}
                  >
                    Usa questo template <ArrowRight className="size-3" />
                  </button>
                </article>
              ))}
            </div>
          </div>
        )}

        {section === "executions" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[13px] font-semibold">Esecuzioni workflow</p>
                <p className="mt-1 text-[10px] opacity-60">
                  Le ultime esecuzioni sono visibili qui; gli indicatori
                  aggregano anche lo storico demo della giornata.
                </p>
              </div>
              <button
                type="button"
                onClick={() => runWorkflow()}
                disabled={isRunning || isPreparingTemplate}
                className="inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-[10px] font-semibold transition disabled:cursor-wait disabled:opacity-60"
                style={{
                  backgroundColor: branding.brandColor,
                  color: brandForeground,
                }}
              >
                {isRunning ? (
                  <LoaderCircle className="size-3 animate-spin" />
                ) : (
                  <RefreshCw className="size-3" />
                )}
                {isRunning ? "Esecuzione in corso" : "Simula esecuzione"}
              </button>
            </div>
            <div className="grid gap-2 sm:grid-cols-4">
              <ExecutionSummary label="Totale" value={executionStats.total} />
              <ExecutionSummary
                label="Success"
                value={executionStats.success}
                tone="success"
              />
              <ExecutionSummary
                label="Running"
                value={executionStats.running}
                tone="running"
              />
              <ExecutionSummary
                label="Error"
                value={executionStats.error}
                tone="error"
              />
            </div>
            <DemoTable
              rows={executions}
              selectedRowId={selectedExecution?.id}
              onRowClick={(execution) => {
                setSelectedExecutionId(execution.id);
              }}
              columns={[
                {
                  id: "workflow",
                  label: "Workflow",
                  cell: (execution) => (
                    <div>
                      <p className="font-medium">{execution.workflow}</p>
                      <p className="mt-0.5 text-[9px] opacity-50">
                        {execution.id} · {execution.total} passaggi
                        {execution.retryOf ? " · retry" : ""}
                      </p>
                    </div>
                  ),
                },
                {
                  id: "status",
                  label: "Stato",
                  cell: (execution) => (
                    <ExecutionPill status={execution.status} />
                  ),
                },
                {
                  id: "started",
                  label: "Avvio",
                  hideOnMobile: true,
                  cell: (execution) => execution.startedAt,
                },
                {
                  id: "duration",
                  label: "Durata",
                  hideOnMobile: true,
                  cell: (execution) => execution.duration,
                },
                {
                  id: "action",
                  label: "Azione",
                  cell: (execution) =>
                    execution.status === "error" ? (
                      <button
                        type="button"
                        disabled={isRunning}
                        onClick={(event) => {
                          event.stopPropagation();
                          retryExecution(execution);
                        }}
                        className="rounded-md border border-current/15 px-2 py-1 text-[9px] font-medium transition hover:bg-current/[0.08] disabled:cursor-wait disabled:opacity-45"
                      >
                        Riprova
                      </button>
                    ) : (
                      <span className="text-[9px] opacity-45">
                        {execution.status === "running" ? "In corso" : "—"}
                      </span>
                    ),
                },
              ]}
            />
            {selectedExecution && (
              <section className="flex flex-col gap-3 rounded-xl border border-current/10 bg-white/[0.035] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[11px] font-semibold">
                      {selectedExecution.workflow}
                    </p>
                    <ExecutionPill status={selectedExecution.status} />
                  </div>
                  <p className="mt-1 text-[10px] opacity-60">
                    {selectedExecution.id} · avviata{" "}
                    {selectedExecution.startedAt} · durata{" "}
                    {selectedExecution.duration}
                  </p>
                </div>
                {selectedExecution.status === "error" ? (
                  <button
                    type="button"
                    disabled={isRunning}
                    onClick={() => retryExecution(selectedExecution)}
                    className="inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-md px-3 text-[10px] font-semibold transition disabled:cursor-wait disabled:opacity-55"
                    style={{
                      backgroundColor: branding.brandColor,
                      color: brandForeground,
                    }}
                  >
                    {isRunning ? (
                      <LoaderCircle className="size-3 animate-spin" />
                    ) : (
                      <RefreshCw className="size-3" />
                    )}
                    Riprova esecuzione
                  </button>
                ) : (
                  <p className="text-[10px] opacity-55">
                    {getExecutionLogMessage(selectedExecution)}
                  </p>
                )}
              </section>
            )}
          </div>
        )}

        {section === "integrations" && (
          <div>
            <div className="mb-4">
              <p className="text-[13px] font-semibold">
                Integrazioni disponibili
              </p>
              <p className="mt-1 text-[10px] opacity-60">
                {connectedIntegrations} connesse in questa configurazione
                dimostrativa.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {integrations.map((integration) => (
                <article
                  key={integration.id}
                  className="rounded-xl border border-current/10 bg-white/[0.035] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className="flex size-9 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: `${branding.brandColor}20`,
                        color: branding.brandColor,
                      }}
                    >
                      <IntegrationIcon
                        icon={integration.icon}
                        className="size-4"
                      />
                    </span>
                    <DemoStatusPill
                      label={
                        integration.connected ? "Connessa" : "Non collegata"
                      }
                      tone={integration.connected ? "success" : "neutral"}
                      dot
                    />
                  </div>
                  <h3 className="mt-5 text-[12px] font-semibold">
                    {getIntegrationName(integration, branding.companyName)}
                  </h3>
                  <p className="mt-1 text-[10px] opacity-60">
                    {integration.detail}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-current/10 pt-3">
                    <span className="text-[9px] opacity-50">
                      {integration.lastSync}
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={integration.connected}
                      onClick={() => toggleIntegration(integration.id)}
                      className="flex items-center gap-2 text-[10px] font-medium"
                    >
                      <span>
                        {integration.connected ? "Sospendi" : "Collega"}
                      </span>
                      <span
                        className={`flex h-4 w-7 items-center rounded-full p-0.5 ${integration.connected ? "justify-end" : "justify-start"}`}
                        style={{
                          backgroundColor: integration.connected
                            ? branding.brandColor
                            : "currentColor",
                        }}
                      >
                        <span className="size-3 rounded-full bg-white shadow-sm" />
                      </span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </DemoAppShell>

      <DemoModal
        open={Boolean(modalNode)}
        onClose={() => setModalNodeId(null)}
        title={modalNode?.title ?? "Passaggio workflow"}
        description="Configurazione dimostrativa: i dati non vengono salvati."
        footer={
          <button
            type="button"
            onClick={() => {
              if (modalNode) toggleNode(modalNode.id);
              setModalNodeId(null);
            }}
            disabled={isRunning || isPreparingTemplate}
            className="h-9 rounded-md px-3 text-[10px] font-semibold transition disabled:cursor-wait disabled:opacity-55"
            style={{
              backgroundColor: branding.brandColor,
              color: brandForeground,
            }}
          >
            {modalNode?.active ? "Disattiva passaggio" : "Attiva passaggio"}
          </button>
        }
      >
        {modalNode && (
          <div className="space-y-4 text-[11px]">
            <div className="flex items-center gap-3 rounded-lg border border-current/10 bg-black/[0.06] p-3">
              <span
                className="flex size-9 items-center justify-center rounded-md"
                style={{
                  backgroundColor: `${branding.brandColor}20`,
                  color: branding.brandColor,
                }}
              >
                <NodeIcon kind={modalNode.kind} className="size-4" />
              </span>
              <div>
                <p className="font-medium">{modalNode.title}</p>
                <p className="mt-0.5 text-[10px] opacity-55">
                  Tipo: {modalNode.kind}
                </p>
              </div>
            </div>
            <p className="leading-5 opacity-70">{modalNode.description}</p>
            <p className="rounded-md border border-current/10 p-3 text-[10px] leading-5 opacity-60">
              In un progetto reale, questo pannello conterrebbe le regole, le
              condizioni e i dati specifici della tua organizzazione.
            </p>
          </div>
        )}
      </DemoModal>
      <DemoToastStack
        toasts={toasts}
        onDismiss={(id) =>
          setToasts((current) => current.filter((toast) => toast.id !== id))
        }
      />
    </>
  );
}

function NodeIcon({ kind, className }: { kind: NodeKind; className?: string }) {
  const Icon =
    kind === "trigger"
      ? CirclePlay
      : kind === "condition"
        ? GitBranch
        : kind === "notification"
          ? Webhook
          : Settings2;
  return <Icon className={className} />;
}

function IntegrationIcon({
  icon,
  className,
}: {
  icon: Integration["icon"];
  className?: string;
}) {
  const Icon =
    icon === "database"
      ? Database
      : icon === "webhook"
        ? Webhook
        : icon === "file"
          ? FileText
          : Bot;
  return <Icon className={className} />;
}

function ExecutionPill({ status }: { status: ExecutionStatus }) {
  const details = getWorkflowStatus(status);
  return <DemoStatusPill label={details.label} tone={details.tone} dot />;
}

function ExecutionSummary({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: number;
  tone?: StatusTone;
}) {
  const toneClass = {
    neutral: "border-current/10 bg-current/[0.035]",
    success: "border-[#809176]/30 bg-[#809176]/10",
    running: "border-[#8d939b]/45 bg-[#d6d8dc]/20",
    warning: "border-[#b58a52]/35 bg-[#b58a52]/10",
    error: "border-[#b46d68]/35 bg-[#b46d68]/10",
  }[tone];

  return (
    <div className={`rounded-lg border px-3 py-2.5 ${toneClass}`}>
      <p className="text-[9px] font-medium uppercase tracking-[0.1em] opacity-55">
        {label}
      </p>
      <p className="mt-1 text-[18px] font-semibold tracking-[-0.04em]">
        {value}
      </p>
    </div>
  );
}

function ExecutionTrend({
  trend,
  brandColor,
}: {
  trend: Array<{
    id: string;
    label: string;
    score: number;
    status: ExecutionStatus;
  }>;
  brandColor: string;
}) {
  return (
    <div className="rounded-lg border border-current/10 bg-black/[0.05] px-3 pb-2.5 pt-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] font-medium">Andamento esecuzioni</p>
        <p className="text-[9px] opacity-50">ultimi {trend.length}</p>
      </div>
      <div className="mt-4 flex h-16 items-end gap-1.5">
        {trend.map((item) => (
          <div
            key={item.id}
            className="group flex min-w-0 flex-1 flex-col justify-end"
          >
            <div
              title={`${item.label}: ${getWorkflowStatus(item.status).label}`}
              className="min-h-1 rounded-sm transition-all duration-500 group-hover:opacity-75"
              style={{
                height: `${item.score}%`,
                backgroundColor:
                  item.status === "error" ? "#b46d68" : brandColor,
              }}
            />
            <span className="mt-1.5 truncate text-center text-[8px] opacity-45">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function getWorkflowStatus(status: ExecutionStatus): {
  label: string;
  tone: StatusTone;
} {
  if (status === "running") return { label: "Running", tone: "running" };
  if (status === "error") return { label: "Da verificare", tone: "error" };
  return { label: "Success", tone: "success" };
}

function getExecutionLogMessage(execution: Execution) {
  if (execution.status === "running") {
    return `${execution.workflow} è in elaborazione.`;
  }
  if (execution.status === "error") {
    return `${execution.workflow} richiede una verifica prima del retry.`;
  }
  if (execution.retryOf) {
    return `Retry di ${execution.retryOf} completato senza anomalie.`;
  }
  return `${execution.workflow} completato senza anomalie.`;
}

function getCurrentExecutionTime() {
  const time = new Intl.DateTimeFormat("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

  return `Oggi, ${time}`;
}

function getIntegrationName(integration: Integration, companyName: string) {
  return integration.id === "crm" ? `${companyName} CRM` : integration.name;
}

function getBrandForeground(color: string) {
  const normalized = color.replace("#", "");
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((part) => `${part}${part}`)
          .join("")
      : normalized;

  if (!/^[\da-f]{6}$/i.test(expanded)) return "#111213";

  const red = Number.parseInt(expanded.slice(0, 2), 16);
  const green = Number.parseInt(expanded.slice(2, 4), 16);
  const blue = Number.parseInt(expanded.slice(4, 6), 16);
  const luminance = (red * 299 + green * 587 + blue * 114) / 1000;

  return luminance > 150 ? "#111213" : "#ffffff";
}
