"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarClock,
  Check,
  CircleDollarSign,
  ClipboardList,
  LayoutDashboard,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  TrendingUp,
  UsersRound,
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

type CrmSection =
  "dashboard" | "clients" | "pipeline" | "offers" | "activities";
type DealStage = "Nuova" | "Qualificata" | "Proposta" | "Negoziazione";
type ActivityFilter = "Tutte" | "Da fare" | "Completate";

type Client = {
  id: string;
  company: string;
  contact: string;
  role: string;
  email: string;
  phone: string;
  segment: string;
  lastContact: string;
  notes: string;
};

type Deal = {
  id: string;
  clientId: string;
  title: string;
  client: string;
  amount: number;
  stage: DealStage;
  probability: number;
  owner: string;
  dueDate: string;
};

type Offer = {
  id: string;
  dealId?: string;
  reference: string;
  client: string;
  title: string;
  value: number;
  status: "Inviata" | "In revisione" | "Accettata";
  validUntil: string;
  lines: Array<{ label: string; value: number }>;
};

type Activity = {
  id: string;
  type: "Call" | "Email" | "Riunione" | "Follow-up";
  title: string;
  client: string;
  when: string;
  status: "Da fare" | "Completata";
  assignee: string;
};

type CrmModal =
  | { kind: "client"; id: string }
  | { kind: "deal"; id: string }
  | { kind: "offer"; id: string }
  | null;

const stages: DealStage[] = [
  "Nuova",
  "Qualificata",
  "Proposta",
  "Negoziazione",
];

const crmNavigation = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "clients", label: "Clienti", icon: UsersRound },
  { id: "pipeline", label: "Pipeline", icon: TrendingUp },
  { id: "offers", label: "Offerte", icon: BriefcaseBusiness },
  { id: "activities", label: "Attività", icon: ClipboardList },
];

const initialClients: Client[] = [
  {
    id: "cl-aurora",
    company: "Aurora Foods S.r.l.",
    contact: "Martina Conti",
    role: "Direttrice commerciale",
    email: "martina.conti@aurora.demo",
    phone: "+39 02 5550 1122",
    segment: "Enterprise",
    lastContact: "Oggi, 09:42",
    notes: "Interessati a un rollout CRM per la rete vendite italiana.",
  },
  {
    id: "cl-nord",
    company: "Nordline Logistics",
    contact: "Davide Riva",
    role: "Operations Manager",
    email: "davide.riva@nordline.demo",
    phone: "+39 02 5550 1834",
    segment: "Mid-market",
    lastContact: "Ieri, 16:20",
    notes: "Valutano integrazione con il sistema di gestione ordini.",
  },
  {
    id: "cl-verde",
    company: "VerdeForma Group",
    contact: "Elena Bassi",
    role: "CEO",
    email: "elena.bassi@verdeforma.demo",
    phone: "+39 051 555 7180",
    segment: "Enterprise",
    lastContact: "28 mag, 11:05",
    notes: "Progetto in fase di confronto con il board.",
  },
  {
    id: "cl-altair",
    company: "Altair Studio",
    contact: "Lorenzo Ferri",
    role: "Founder",
    email: "lorenzo.ferri@altair.demo",
    phone: "+39 06 5550 2441",
    segment: "Scale-up",
    lastContact: "27 mag, 14:18",
    notes: "Ha richiesto una proposta modulare per tre team.",
  },
];

const initialDeals: Deal[] = [
  {
    id: "dl-1",
    clientId: "cl-aurora",
    title: "CRM rete vendite",
    client: "Aurora Foods S.r.l.",
    amount: 48200,
    stage: "Qualificata",
    probability: 65,
    owner: "Lorenzo B.",
    dueDate: "12 giu",
  },
  {
    id: "dl-2",
    clientId: "cl-nord",
    title: "Portale partner",
    client: "Nordline Logistics",
    amount: 36500,
    stage: "Proposta",
    probability: 75,
    owner: "Marta R.",
    dueDate: "18 giu",
  },
  {
    id: "dl-3",
    clientId: "cl-verde",
    title: "Analytics commerciale",
    client: "VerdeForma Group",
    amount: 67900,
    stage: "Negoziazione",
    probability: 88,
    owner: "Lorenzo B.",
    dueDate: "07 giu",
  },
  {
    id: "dl-4",
    clientId: "cl-altair",
    title: "Automazione offerte",
    client: "Altair Studio",
    amount: 21400,
    stage: "Nuova",
    probability: 35,
    owner: "Marta R.",
    dueDate: "21 giu",
  },
  {
    id: "dl-5",
    clientId: "cl-aurora",
    title: "Integrazione ERP",
    client: "Aurora Foods S.r.l.",
    amount: 18700,
    stage: "Proposta",
    probability: 60,
    owner: "Lorenzo B.",
    dueDate: "25 giu",
  },
];

const initialOffers: Offer[] = [
  {
    id: "of-2048",
    dealId: "dl-1",
    reference: "OFF-2048",
    client: "Aurora Foods S.r.l.",
    title: "CRM commerciale · fase 1",
    value: 48200,
    status: "In revisione",
    validUntil: "14 giugno 2026",
    lines: [
      { label: "Discovery e UX", value: 7800 },
      { label: "Sviluppo piattaforma", value: 32400 },
      { label: "Integrazione dati", value: 8000 },
    ],
  },
  {
    id: "of-2044",
    dealId: "dl-2",
    reference: "OFF-2044",
    client: "Nordline Logistics",
    title: "Portale partner operativo",
    value: 36500,
    status: "Inviata",
    validUntil: "19 giugno 2026",
    lines: [
      { label: "Architettura applicativa", value: 9500 },
      { label: "Portale e ruoli", value: 21800 },
      { label: "Collaudo", value: 5200 },
    ],
  },
  {
    id: "of-2039",
    reference: "OFF-2039",
    client: "Marconi & Figli",
    title: "Dashboard performance",
    value: 14750,
    status: "Accettata",
    validUntil: "31 maggio 2026",
    lines: [
      { label: "KPI e data model", value: 6250 },
      { label: "Dashboard executive", value: 8500 },
    ],
  },
];

const initialActivities: Activity[] = [
  {
    id: "ac-1",
    type: "Call",
    title: "Allineamento su requisiti",
    client: "Aurora Foods S.r.l.",
    when: "Oggi · 11:30",
    status: "Da fare",
    assignee: "Lorenzo B.",
  },
  {
    id: "ac-2",
    type: "Email",
    title: "Inviare proposta aggiornata",
    client: "Nordline Logistics",
    when: "Oggi · 15:00",
    status: "Da fare",
    assignee: "Marta R.",
  },
  {
    id: "ac-3",
    type: "Riunione",
    title: "Workshop KPI",
    client: "VerdeForma Group",
    when: "Domani · 09:30",
    status: "Da fare",
    assignee: "Lorenzo B.",
  },
  {
    id: "ac-4",
    type: "Follow-up",
    title: "Conferma budget",
    client: "Altair Studio",
    when: "Domani · 16:00",
    status: "Da fare",
    assignee: "Marta R.",
  },
  {
    id: "ac-5",
    type: "Email",
    title: "Recap incontro",
    client: "Aurora Foods S.r.l.",
    when: "Ieri · 17:20",
    status: "Completata",
    assignee: "Lorenzo B.",
  },
  {
    id: "ac-6",
    type: "Call",
    title: "Check-in progetto",
    client: "Marconi & Figli",
    when: "Ieri · 10:00",
    status: "Completata",
    assignee: "Marta R.",
  },
];

const numberFormatter = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

function currency(value: number) {
  return numberFormatter.format(value);
}

function getClientPipelineValue(clientId: string, deals: Deal[]) {
  return deals
    .filter((deal) => deal.clientId === clientId)
    .reduce((total, deal) => total + deal.amount, 0);
}

function getBrandTextColor(brandColor: string) {
  const value = brandColor.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(value)) return "#111213";

  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);
  const luminance = (red * 299 + green * 587 + blue * 114) / 1000;

  return luminance > 150 ? "#111213" : "#f7f7f5";
}

function stageTone(stage: DealStage) {
  if (stage === "Negoziazione") return "success" as const;
  if (stage === "Proposta") return "running" as const;
  if (stage === "Qualificata") return "warning" as const;
  return "neutral" as const;
}

function offerTone(status: Offer["status"]) {
  if (status === "Accettata") return "success" as const;
  if (status === "In revisione") return "running" as const;
  return "warning" as const;
}

function activityTone(status: Activity["status"]) {
  return status === "Completata" ? ("success" as const) : ("warning" as const);
}

export default function CrmDemo({ branding }: { branding: DemoBranding }) {
  const [section, setSection] = useState<CrmSection>("dashboard");
  const [clients, setClients] = useState(initialClients);
  const [deals, setDeals] = useState(initialDeals);
  const [offers, setOffers] = useState(initialOffers);
  const [activities, setActivities] = useState(initialActivities);
  const [activityFilter, setActivityFilter] = useState<ActivityFilter>("Tutte");
  const [modal, setModal] = useState<CrmModal>(null);
  const [clientDraft, setClientDraft] = useState({
    contact: "",
    email: "",
    notes: "",
  });
  const [search, setSearch] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dashboardUpdatedAt, setDashboardUpdatedAt] = useState("Dati correnti");
  const [isSavingClient, setIsSavingClient] = useState(false);
  const [isAcceptingOffer, setIsAcceptingOffer] = useState(false);
  const [isCreatingClient, setIsCreatingClient] = useState(false);
  const [isCreatingDeal, setIsCreatingDeal] = useState(false);
  const [isCreatingActivity, setIsCreatingActivity] = useState(false);
  const [movingDealId, setMovingDealId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<DemoToast[]>([]);
  const toastId = useRef(0);
  const actionTimers = useRef<number[]>([]);

  const clearPendingActions = useCallback(() => {
    actionTimers.current.forEach((timer) => window.clearTimeout(timer));
    actionTimers.current = [];
  }, []);

  const scheduleAction = useCallback((callback: () => void, delay: number) => {
    const timer = window.setTimeout(() => {
      actionTimers.current = actionTimers.current.filter(
        (item) => item !== timer,
      );
      callback();
    }, delay);
    actionTimers.current.push(timer);
  }, []);

  useEffect(() => clearPendingActions, [clearPendingActions]);

  const openActivities = activities.filter(
    (activity) => activity.status === "Da fare",
  ).length;
  const pipelineValue = deals.reduce((sum, deal) => sum + deal.amount, 0);
  const acceptedOffers = offers.filter(
    (offer) => offer.status === "Accettata",
  ).length;
  const acceptanceRate = offers.length
    ? Math.round((acceptedOffers / offers.length) * 100)
    : 0;
  const weightedForecast = pipelineValue
    ? Math.round(
        (deals.reduce(
          (total, deal) => total + deal.amount * (deal.probability / 100),
          0,
        ) /
          pipelineValue) *
          100,
      )
    : 0;
  const clientPipelineValues = useMemo(
    () =>
      Object.fromEntries(
        clients.map((client) => [
          client.id,
          getClientPipelineValue(client.id, deals),
        ]),
      ) as Record<string, number>,
    [clients, deals],
  );
  const navigationItems = useMemo(
    () =>
      crmNavigation.map((item) => ({
        ...item,
        badge:
          item.id === "clients"
            ? clients.length
            : item.id === "offers"
              ? offers.filter((offer) => offer.status !== "Accettata").length
              : item.id === "activities"
                ? openActivities
                : undefined,
      })),
    [clients.length, offers, openActivities],
  );
  const brandTextColor = getBrandTextColor(branding.brandColor);
  const filteredClients = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("it-IT");
    if (!query) return clients;
    return clients.filter((client) =>
      `${client.company} ${client.contact}`
        .toLocaleLowerCase("it-IT")
        .includes(query),
    );
  }, [clients, search]);
  const filteredActivities = useMemo(() => {
    return activityFilter === "Tutte"
      ? activities
      : activities.filter((activity) => activity.status === activityFilter);
  }, [activities, activityFilter]);

  const selectedClient =
    modal?.kind === "client"
      ? clients.find((client) => client.id === modal.id)
      : undefined;
  const selectedDeal =
    modal?.kind === "deal"
      ? deals.find((deal) => deal.id === modal.id)
      : undefined;
  const selectedOffer =
    modal?.kind === "offer"
      ? offers.find((offer) => offer.id === modal.id)
      : undefined;

  const addToast = useCallback(function addToast(
    title: string,
    description?: string,
    tone: DemoToast["tone"] = "success",
  ) {
    const id = ++toastId.current;
    setToasts((current) => [...current, { id, title, description, tone }]);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  function navigate(id: string) {
    if (crmNavigation.some((item) => item.id === id)) {
      setSection(id as CrmSection);
      setSearch("");
    }
  }

  function openClient(client: Client) {
    setClientDraft({
      contact: client.contact,
      email: client.email,
      notes: client.notes,
    });
    setModal({ kind: "client", id: client.id });
  }

  function saveClient() {
    if (!selectedClient || isSavingClient) return;
    setIsSavingClient(true);
    scheduleAction(() => {
      setClients((current) =>
        current.map((client) =>
          client.id === selectedClient.id
            ? { ...client, ...clientDraft, lastContact: "Aggiornato ora" }
            : client,
        ),
      );
      setIsSavingClient(false);
      addToast(
        "Scheda cliente aggiornata",
        `${selectedClient.company} è stata aggiornata nella demo.`,
      );
      setModal(null);
    }, 280);
  }

  function moveDeal(deal: Deal, direction: "previous" | "next") {
    if (movingDealId) return;
    const currentIndex = stages.indexOf(deal.stage);
    const nextIndex =
      direction === "next" ? currentIndex + 1 : currentIndex - 1;
    const stage = stages[nextIndex];
    if (!stage) return;
    setMovingDealId(deal.id);
    scheduleAction(() => {
      setDeals((current) =>
        current.map((currentDeal) =>
          currentDeal.id === deal.id
            ? {
                ...currentDeal,
                stage,
                probability: Math.max(
                  20,
                  Math.min(
                    95,
                    currentDeal.probability + (direction === "next" ? 12 : -12),
                  ),
                ),
              }
            : currentDeal,
        ),
      );
      setMovingDealId(null);
      addToast(
        "Opportunità aggiornata",
        `${deal.title} è ora in fase “${stage}”.`,
        "info",
      );
    }, 240);
  }

  function toggleActivity(id: string) {
    const activity = activities.find((current) => current.id === id);
    if (!activity) return;
    const nextStatus = activity.status === "Da fare" ? "Completata" : "Da fare";
    setActivities((current) =>
      current.map((currentActivity) =>
        currentActivity.id === id
          ? { ...currentActivity, status: nextStatus }
          : currentActivity,
      ),
    );
    addToast(
      nextStatus === "Completata" ? "Attività completata" : "Attività riaperta",
      activity.title,
      nextStatus === "Completata" ? "success" : "warning",
    );
  }

  function refreshDashboard() {
    if (isRefreshing) return;
    setIsRefreshing(true);
    scheduleAction(() => {
      setIsRefreshing(false);
      setDashboardUpdatedAt("Aggiornata ora");
      addToast(
        "Dashboard ricalcolata",
        "KPI e grafico ora riflettono lo stato locale corrente.",
        "info",
      );
    }, 700);
  }

  function markOfferReviewed() {
    if (!selectedOffer || isAcceptingOffer) return;
    setIsAcceptingOffer(true);
    scheduleAction(() => {
      setOffers((current) =>
        current.map((offer) =>
          offer.id === selectedOffer.id
            ? { ...offer, status: "Accettata" }
            : offer,
        ),
      );
      if (selectedOffer.dealId) {
        setDeals((current) =>
          current.map((deal) =>
            deal.id === selectedOffer.dealId
              ? {
                  ...deal,
                  stage: "Negoziazione",
                  probability: Math.max(deal.probability, 92),
                }
              : deal,
          ),
        );
      }
      setIsAcceptingOffer(false);
      addToast(
        "Offerta accettata",
        selectedOffer.dealId
          ? "La proposta e la relativa opportunità sono state aggiornate."
          : `${selectedOffer.reference} è stata aggiornata nella demo.`,
        "success",
      );
      setModal(null);
    }, 300);
  }

  function createDemoClient() {
    if (isCreatingClient) return;
    if (clients.some((client) => client.id === "cl-demo")) {
      setSection("clients");
      setSearch("");
      addToast(
        "Cliente demo già presente",
        "Puoi aprirlo e modificare la scheda nella rubrica.",
        "info",
      );
      return;
    }

    setIsCreatingClient(true);
    scheduleAction(() => {
      setClients((current) => [
        {
          id: "cl-demo",
          company: "Officina Nova S.r.l.",
          contact: "Giulia Serra",
          role: "Responsabile innovazione",
          email: "giulia.serra@officinanova.demo",
          phone: "+39 02 5550 3012",
          segment: "Mid-market",
          lastContact: "Creato ora",
          notes: "Cliente dimostrativo aggiunto in questa sessione.",
        },
        ...current,
      ]);
      setSection("clients");
      setSearch("");
      setIsCreatingClient(false);
      addToast(
        "Cliente demo creato",
        "La nuova scheda è disponibile in rubrica e nei conteggi dashboard.",
      );
    }, 320);
  }

  function createDemoDeal() {
    if (isCreatingDeal) return;
    const client = clients.find((item) => item.id === "cl-demo") ?? clients[0];
    if (!client) return;
    if (deals.some((deal) => deal.id === "dl-demo")) {
      addToast(
        "Opportunità demo già presente",
        "Spostala tra le fasi per aggiornare pipeline e forecast.",
        "info",
      );
      return;
    }

    setIsCreatingDeal(true);
    scheduleAction(() => {
      setDeals((current) => [
        {
          id: "dl-demo",
          clientId: client.id,
          title: "Portale self-service",
          client: client.company,
          amount: 28400,
          stage: "Nuova",
          probability: 30,
          owner: "Marta R.",
          dueDate: "30 giu",
        },
        ...current,
      ]);
      setIsCreatingDeal(false);
      addToast(
        "Opportunità aggiunta",
        `${client.company} è ora presente nella pipeline demo.`,
      );
    }, 300);
  }

  function createDemoActivity() {
    if (isCreatingActivity) return;
    if (activities.some((activity) => activity.id === "ac-demo")) {
      setSection("activities");
      setActivityFilter("Tutte");
      addToast(
        "Attività demo già presente",
        "Puoi completarla o riaprirla dall'agenda commerciale.",
        "info",
      );
      return;
    }

    const client = clients.find((item) => item.id === "cl-demo") ?? clients[0];
    if (!client) return;

    setIsCreatingActivity(true);
    scheduleAction(() => {
      setActivities((current) => [
        {
          id: "ac-demo",
          type: "Follow-up",
          title: "Confermare obiettivi del progetto",
          client: client.company,
          when: "Oggi · 16:30",
          status: "Da fare",
          assignee: "Marta R.",
        },
        ...current,
      ]);
      setSection("activities");
      setActivityFilter("Tutte");
      setIsCreatingActivity(false);
      addToast(
        "Attività aggiunta",
        `${client.company} è ora presente anche nell'agenda della demo.`,
      );
    }, 260);
  }

  function resetDemo() {
    clearPendingActions();
    setClients(initialClients);
    setDeals(initialDeals);
    setOffers(initialOffers);
    setActivities(initialActivities);
    setSection("dashboard");
    setActivityFilter("Tutte");
    setModal(null);
    setClientDraft({ contact: "", email: "", notes: "" });
    setSearch("");
    setIsRefreshing(false);
    setDashboardUpdatedAt("Dati correnti");
    setIsSavingClient(false);
    setIsAcceptingOffer(false);
    setIsCreatingClient(false);
    setIsCreatingDeal(false);
    setIsCreatingActivity(false);
    setMovingDealId(null);
    setToasts([]);
    addToast(
      "Demo ripristinata",
      "Clienti, offerte, pipeline e attività sono tornati allo stato iniziale.",
      "info",
    );
  }

  const actions = (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={refreshDashboard}
        className="inline-flex size-8 items-center justify-center rounded-lg border border-current/10 bg-current/[0.04] transition hover:bg-current/[0.08] disabled:cursor-wait"
        aria-label="Aggiorna dati demo"
        title="Aggiorna dati demo"
        disabled={isRefreshing}
      >
        <RefreshCw
          className={`size-3.5 ${isRefreshing ? "animate-spin" : ""}`}
        />
      </button>
      <button
        type="button"
        onClick={createDemoClient}
        disabled={isCreatingClient}
        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-medium transition hover:brightness-95 disabled:cursor-wait disabled:opacity-65"
        style={{
          backgroundColor: branding.brandColor,
          color: brandTextColor,
        }}
      >
        {isCreatingClient ? (
          <RefreshCw className="size-3.5 animate-spin" />
        ) : (
          <Plus className="size-3.5" />
        )}
        <span className="hidden sm:inline">
          {isCreatingClient ? "Creazione" : "Nuovo cliente"}
        </span>
      </button>
    </div>
  );

  return (
    <DemoAppShell
      branding={branding}
      title="VANTA CRM"
      subtitle="Workspace commerciale · demo concettuale"
      navItems={navigationItems}
      activeSection={section}
      onSectionChange={navigate}
      actions={actions}
      onReset={resetDemo}
      className="min-h-[620px]"
    >
      <div className="space-y-5 p-3 sm:p-5 lg:p-6">
        {section === "dashboard" && (
          <CrmDashboard
            branding={branding}
            clients={clients}
            deals={deals}
            activities={activities}
            isRefreshing={isRefreshing}
            dashboardUpdatedAt={dashboardUpdatedAt}
            pipelineValue={pipelineValue}
            openActivities={openActivities}
            acceptanceRate={acceptanceRate}
            weightedForecast={weightedForecast}
            clientPipelineValues={clientPipelineValues}
            onClientClick={openClient}
            onDealClick={(deal) => setModal({ kind: "deal", id: deal.id })}
            onActivityToggle={toggleActivity}
            onSectionChange={setSection}
          />
        )}
        {section === "clients" && (
          <ClientsSection
            clients={filteredClients}
            clientPipelineValues={clientPipelineValues}
            search={search}
            onSearchChange={setSearch}
            onClientClick={openClient}
          />
        )}
        {section === "pipeline" && (
          <PipelineSection
            branding={branding}
            deals={deals}
            isCreatingDeal={isCreatingDeal}
            onDealClick={(deal) => setModal({ kind: "deal", id: deal.id })}
            onMoveDeal={moveDeal}
            onCreateDeal={createDemoDeal}
            movingDealId={movingDealId}
          />
        )}
        {section === "offers" && (
          <OffersSection
            offers={offers}
            onOfferClick={(offer) => setModal({ kind: "offer", id: offer.id })}
          />
        )}
        {section === "activities" && (
          <ActivitiesSection
            activities={filteredActivities}
            filter={activityFilter}
            branding={branding}
            isCreatingActivity={isCreatingActivity}
            onCreateActivity={createDemoActivity}
            onFilterChange={setActivityFilter}
            onToggle={toggleActivity}
          />
        )}
      </div>

      <DemoModal
        open={Boolean(selectedClient)}
        onClose={() => {
          if (!isSavingClient) setModal(null);
        }}
        title={selectedClient?.company ?? "Cliente"}
        description={
          selectedClient
            ? `Scheda cliente dimostrativa · ${selectedClient.segment}`
            : undefined
        }
        size="lg"
        drawerOnMobile
        footer={
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setModal(null)}
              disabled={isSavingClient}
              className="rounded-lg border border-current/15 px-3 py-2 text-[11px] font-medium transition hover:bg-current/[0.05] disabled:cursor-wait disabled:opacity-55"
            >
              Annulla
            </button>
            <button
              type="button"
              onClick={saveClient}
              disabled={isSavingClient}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-medium disabled:cursor-wait disabled:opacity-65"
              style={{
                backgroundColor: branding.brandColor,
                color: brandTextColor,
              }}
            >
              {isSavingClient && <RefreshCw className="size-3 animate-spin" />}
              {isSavingClient ? "Salvataggio" : "Salva modifiche"}
            </button>
          </div>
        }
      >
        {selectedClient && (
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoLine
              label="Pipeline attiva"
              value={currency(clientPipelineValues[selectedClient.id] ?? 0)}
              emphasis
            />
            <InfoLine
              label="Ultimo contatto"
              value={selectedClient.lastContact}
            />
            <Field
              label="Referente"
              value={clientDraft.contact}
              onChange={(value) =>
                setClientDraft((current) => ({ ...current, contact: value }))
              }
              disabled={isSavingClient}
            />
            <Field
              label="Email"
              type="email"
              value={clientDraft.email}
              onChange={(value) =>
                setClientDraft((current) => ({ ...current, email: value }))
              }
              disabled={isSavingClient}
            />
            <Field label="Telefono" value={selectedClient.phone} disabled />
            <Field label="Ruolo" value={selectedClient.role} disabled />
            <label className="sm:col-span-2">
              <span className="mb-1.5 block text-[10px] font-medium opacity-60">
                Nota interna
              </span>
              <textarea
                value={clientDraft.notes}
                disabled={isSavingClient}
                onChange={(event) =>
                  setClientDraft((current) => ({
                    ...current,
                    notes: event.target.value,
                  }))
                }
                rows={3}
                className="w-full resize-none rounded-xl border border-current/12 bg-current/[0.035] px-3 py-2 text-[12px] outline-none transition focus:border-current/35 disabled:cursor-wait disabled:opacity-55"
              />
            </label>
          </div>
        )}
      </DemoModal>

      <DemoModal
        open={Boolean(selectedDeal)}
        onClose={() => {
          if (!movingDealId) setModal(null);
        }}
        title={selectedDeal?.title ?? "Opportunità"}
        description={
          selectedDeal
            ? `${selectedDeal.client} · ${currency(selectedDeal.amount)} · ${selectedDeal.probability}% di probabilità`
            : undefined
        }
        size="md"
        drawerOnMobile
      >
        {selectedDeal && (
          <div className="space-y-5">
            <div className="rounded-xl border border-current/10 bg-current/[0.035] p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] opacity-60">Fase attuale</span>
                <DemoStatusPill
                  label={selectedDeal.stage}
                  tone={stageTone(selectedDeal.stage)}
                  dot
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <InfoLine label="Owner" value={selectedDeal.owner} />
                <InfoLine
                  label="Chiusura stimata"
                  value={selectedDeal.dueDate}
                />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] opacity-50">
                Aggiorna fase demo
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={
                    selectedDeal.stage === stages[0] ||
                    movingDealId === selectedDeal.id
                  }
                  onClick={() => moveDeal(selectedDeal, "previous")}
                  className="rounded-lg border border-current/14 px-3 py-2 text-[11px] font-medium transition hover:bg-current/[0.05] disabled:cursor-not-allowed disabled:opacity-35"
                >
                  Fase precedente
                </button>
                <button
                  type="button"
                  disabled={
                    selectedDeal.stage === stages.at(-1) ||
                    movingDealId === selectedDeal.id
                  }
                  onClick={() => moveDeal(selectedDeal, "next")}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-medium transition disabled:cursor-not-allowed disabled:opacity-35"
                  style={{
                    backgroundColor: branding.brandColor,
                    color: brandTextColor,
                  }}
                >
                  {movingDealId === selectedDeal.id ? (
                    <RefreshCw className="size-3.5 animate-spin" />
                  ) : (
                    <ArrowRight className="size-3.5" />
                  )}
                  {movingDealId === selectedDeal.id
                    ? "Aggiornamento"
                    : "Avanza opportunità"}
                </button>
              </div>
            </div>
          </div>
        )}
      </DemoModal>

      <DemoModal
        open={Boolean(selectedOffer)}
        onClose={() => {
          if (!isAcceptingOffer) setModal(null);
        }}
        title={
          selectedOffer
            ? `${selectedOffer.reference} · ${selectedOffer.title}`
            : "Offerta"
        }
        description={
          selectedOffer
            ? `${selectedOffer.client} · Valida fino al ${selectedOffer.validUntil}`
            : undefined
        }
        size="lg"
        drawerOnMobile
        footer={
          selectedOffer?.status !== "Accettata" ? (
            <button
              type="button"
              onClick={markOfferReviewed}
              disabled={isAcceptingOffer}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-medium disabled:cursor-wait disabled:opacity-65"
              style={{
                backgroundColor: branding.brandColor,
                color: brandTextColor,
              }}
            >
              {isAcceptingOffer && (
                <RefreshCw className="size-3 animate-spin" />
              )}
              {isAcceptingOffer ? "Aggiornamento" : "Segna come accettata"}
            </button>
          ) : undefined
        }
      >
        {selectedOffer && (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-current/10 bg-current/[0.035] p-4">
              <div>
                <p className="text-[10px] opacity-55">Valore della proposta</p>
                <p className="mt-1 text-xl font-semibold">
                  {currency(selectedOffer.value)}
                </p>
              </div>
              <DemoStatusPill
                label={selectedOffer.status}
                tone={offerTone(selectedOffer.status)}
                dot
              />
            </div>
            <div className="space-y-2">
              {selectedOffer.lines.map((line) => (
                <div
                  key={line.label}
                  className="flex items-center justify-between border-b border-current/8 py-2 text-[12px]"
                >
                  <span className="opacity-70">{line.label}</span>
                  <span className="font-medium">{currency(line.value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </DemoModal>
      <DemoToastStack toasts={toasts} onDismiss={dismissToast} />
    </DemoAppShell>
  );
}

function CrmDashboard({
  branding,
  clients,
  deals,
  activities,
  isRefreshing,
  dashboardUpdatedAt,
  pipelineValue,
  openActivities,
  acceptanceRate,
  weightedForecast,
  clientPipelineValues,
  onClientClick,
  onDealClick,
  onActivityToggle,
  onSectionChange,
}: {
  branding: DemoBranding;
  clients: Client[];
  deals: Deal[];
  activities: Activity[];
  isRefreshing: boolean;
  dashboardUpdatedAt: string;
  pipelineValue: number;
  openActivities: number;
  acceptanceRate: number;
  weightedForecast: number;
  clientPipelineValues: Record<string, number>;
  onClientClick: (client: Client) => void;
  onDealClick: (deal: Deal) => void;
  onActivityToggle: (id: string) => void;
  onSectionChange: (section: CrmSection) => void;
}) {
  return (
    <div className="space-y-5">
      <SectionHeading
        eyebrow="Panoramica commerciale"
        title="Buongiorno, {company}"
        titleSuffix={branding.companyName}
        description="Dati di esempio aggiornati per mostrarti il comportamento di una dashboard CRM."
        action={
          <button
            type="button"
            onClick={() => onSectionChange("pipeline")}
            className="inline-flex items-center gap-1 text-[11px] font-medium opacity-70 transition hover:opacity-100"
          >
            Apri pipeline <ArrowRight className="size-3.5" />
          </button>
        }
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <DemoKpiCard
          label="Clienti attivi"
          value={String(clients.length)}
          detail="presenti in rubrica"
          trend="Dati live"
          icon={UsersRound}
          onClick={() => onSectionChange("clients")}
        />
        <DemoKpiCard
          label="Pipeline aperta"
          value={currency(pipelineValue)}
          detail={`${deals.length} opportunità`}
          trend={`${weightedForecast}% forecast`}
          icon={TrendingUp}
          onClick={() => onSectionChange("pipeline")}
        />
        <DemoKpiCard
          label="Tasso di chiusura"
          value={`${acceptanceRate}%`}
          detail="offerte accettate"
          trend={`${acceptanceRate}% live`}
          icon={CircleDollarSign}
          onClick={() => onSectionChange("offers")}
        />
        <DemoKpiCard
          label="Attività da fare"
          value={String(openActivities)}
          detail="entro domani"
          trend="Priorità"
          icon={CalendarClock}
          onClick={() => onSectionChange("activities")}
        />
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.85fr]">
        <section className="rounded-2xl border border-current/10 bg-current/[0.025] p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[13px] font-semibold">Andamento pipeline</p>
              <p className="mt-1 text-[10px] opacity-55">
                Valore stimato delle opportunità per fase
              </p>
            </div>
            <span className="rounded-md border border-current/10 px-2 py-1 text-[10px] opacity-65">
              {dashboardUpdatedAt}
            </span>
          </div>
          {isRefreshing ? (
            <ChartSkeleton />
          ) : (
            <PipelineChart branding={branding} deals={deals} />
          )}
          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-current/8 pt-4 text-[10px]">
            <MetricMini
              label="Media deal"
              value={currency(
                deals.length ? Math.round(pipelineValue / deals.length) : 0,
              )}
            />
            <MetricMini label="Opportunità" value={`${deals.length} aperte`} />
            <MetricMini label="Forecast" value={`${weightedForecast}%`} />
          </div>
        </section>
        <section className="rounded-2xl border border-current/10 bg-current/[0.025] p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-semibold">Da gestire</p>
              <p className="mt-1 text-[10px] opacity-55">
                Click per completare
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSectionChange("activities")}
              className="text-[10px] font-medium opacity-65 transition hover:opacity-100"
            >
              Vedi tutte
            </button>
          </div>
          <div className="mt-4 space-y-2">
            {activities
              .filter((activity) => activity.status === "Da fare")
              .slice(0, 4)
              .map((activity) => (
                <button
                  key={activity.id}
                  type="button"
                  onClick={() => onActivityToggle(activity.id)}
                  className="flex w-full items-center gap-3 rounded-xl border border-current/8 px-3 py-2.5 text-left transition hover:bg-current/[0.055]"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-current/14">
                    <Check className="size-3 opacity-55" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[11px] font-medium">
                      {activity.title}
                    </span>
                    <span className="mt-0.5 block truncate text-[9px] opacity-55">
                      {activity.client} · {activity.when}
                    </span>
                  </span>
                </button>
              ))}
          </div>
        </section>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <section className="rounded-2xl border border-current/10 bg-current/[0.025] p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-semibold">Clienti prioritari</p>
              <p className="mt-1 text-[10px] opacity-55">
                Contatti demo con maggiore potenziale
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSectionChange("clients")}
              className="text-[10px] font-medium opacity-65 transition hover:opacity-100"
            >
              Gestisci
            </button>
          </div>
          <div className="mt-3 space-y-1">
            {[...clients]
              .sort(
                (left, right) =>
                  (clientPipelineValues[right.id] ?? 0) -
                  (clientPipelineValues[left.id] ?? 0),
              )
              .slice(0, 3)
              .map((client) => (
                <button
                  key={client.id}
                  type="button"
                  onClick={() => onClientClick(client)}
                  className="flex w-full items-center justify-between gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-current/[0.05]"
                >
                  <span>
                    <span className="block text-[11px] font-medium">
                      {client.company}
                    </span>
                    <span className="mt-0.5 block text-[9px] opacity-55">
                      {client.contact} · {client.segment}
                    </span>
                  </span>
                  <span className="text-[10px] font-medium">
                    {currency(clientPipelineValues[client.id] ?? 0)}
                  </span>
                </button>
              ))}
          </div>
        </section>
        <section className="rounded-2xl border border-current/10 bg-current/[0.025] p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-semibold">
                Opportunità in evidenza
              </p>
              <p className="mt-1 text-[10px] opacity-55">
                Pipeline in aggiornamento locale
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSectionChange("pipeline")}
              className="text-[10px] font-medium opacity-65 transition hover:opacity-100"
            >
              Apri board
            </button>
          </div>
          <div className="mt-3 space-y-2">
            {[...deals]
              .sort((left, right) => right.probability - left.probability)
              .slice(0, 3)
              .map((deal) => (
                <button
                  key={deal.id}
                  type="button"
                  onClick={() => onDealClick(deal)}
                  className="flex w-full items-center justify-between gap-3 rounded-xl border border-current/8 px-3 py-2.5 text-left transition hover:bg-current/[0.055]"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-[11px] font-medium">
                      {deal.title}
                    </span>
                    <span className="mt-0.5 block truncate text-[9px] opacity-55">
                      {deal.client}
                    </span>
                  </span>
                  <span className="flex shrink-0 flex-col items-end gap-1">
                    <span className="text-[10px] font-medium">
                      {currency(deal.amount)}
                    </span>
                    <DemoStatusPill
                      label={deal.stage}
                      tone={stageTone(deal.stage)}
                    />
                  </span>
                </button>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function ClientsSection({
  clients,
  clientPipelineValues,
  search,
  onSearchChange,
  onClientClick,
}: {
  clients: Client[];
  clientPipelineValues: Record<string, number>;
  search: string;
  onSearchChange: (value: string) => void;
  onClientClick: (client: Client) => void;
}) {
  return (
    <div className="space-y-5">
      <SectionHeading
        eyebrow="Rubrica commerciale"
        title="Clienti e contatti"
        description="Dati demo locali: apri una scheda e aggiorna alcuni campi per vedere la UI in azione."
        action={
          <label className="flex w-full max-w-56 items-center gap-2 rounded-lg border border-current/12 bg-current/[0.03] px-2.5 py-2 text-current/60">
            <Search className="size-3.5" />
            <input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Cerca cliente"
              className="min-w-0 flex-1 bg-transparent text-[11px] outline-none placeholder:text-current/40"
            />
          </label>
        }
      />
      <DemoTable
        rows={clients}
        selectedRowId={undefined}
        onRowClick={onClientClick}
        emptyMessage="Nessun cliente corrisponde alla ricerca."
        columns={[
          {
            id: "company",
            label: "Azienda",
            cell: (client) => (
              <div>
                <p className="text-[11px] font-medium">{client.company}</p>
                <p className="mt-0.5 text-[9px] opacity-55">{client.segment}</p>
              </div>
            ),
          },
          {
            id: "contact",
            label: "Referente",
            cell: (client) => (
              <div>
                <p className="text-[11px]">{client.contact}</p>
                <p className="mt-0.5 text-[9px] opacity-55">{client.role}</p>
              </div>
            ),
            hideOnMobile: true,
          },
          {
            id: "value",
            label: "Pipeline",
            cell: (client) => (
              <span className="text-[11px] font-medium">
                {currency(clientPipelineValues[client.id] ?? 0)}
              </span>
            ),
          },
          {
            id: "last",
            label: "Ultimo contatto",
            cell: (client) => (
              <span className="text-[10px] opacity-60">
                {client.lastContact}
              </span>
            ),
            hideOnMobile: true,
          },
          {
            id: "open",
            label: "",
            cell: () => <ArrowRight className="size-3.5 opacity-55" />,
            className: "w-8",
          },
        ]}
      />
    </div>
  );
}

function PipelineSection({
  branding,
  deals,
  isCreatingDeal,
  onDealClick,
  onMoveDeal,
  onCreateDeal,
  movingDealId,
}: {
  branding: DemoBranding;
  deals: Deal[];
  isCreatingDeal: boolean;
  onDealClick: (deal: Deal) => void;
  onMoveDeal: (deal: Deal, direction: "previous" | "next") => void;
  onCreateDeal: () => void;
  movingDealId: string | null;
}) {
  return (
    <div className="space-y-5">
      <SectionHeading
        eyebrow="Pipeline demo"
        title="Trattative in corso"
        description="Sposta un'opportunità tra le fasi: l'aggiornamento resta nella sessione della demo."
        action={
          <div className="flex flex-wrap items-center gap-2">
            <span className="hidden items-center gap-1.5 text-[10px] opacity-60 sm:inline-flex">
              <Sparkles className="size-3.5" /> Click su una card per i dettagli
            </span>
            <button
              type="button"
              onClick={onCreateDeal}
              disabled={isCreatingDeal}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[10px] font-medium transition hover:brightness-95 disabled:cursor-wait disabled:opacity-65"
              style={{
                backgroundColor: branding.brandColor,
                color: getBrandTextColor(branding.brandColor),
              }}
            >
              {isCreatingDeal ? (
                <RefreshCw className="size-3 animate-spin" />
              ) : (
                <Plus className="size-3" />
              )}
              {isCreatingDeal ? "Creazione" : "Nuova opportunità"}
            </button>
          </div>
        }
      />
      <div className="grid gap-3 xl:grid-cols-4">
        {stages.map((stage) => {
          const stageDeals = deals.filter((deal) => deal.stage === stage);
          return (
            <section
              key={stage}
              className="min-w-0 rounded-2xl border border-current/10 bg-current/[0.025] p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <DemoStatusPill label={stage} tone={stageTone(stage)} dot />
                <span className="text-[10px] opacity-55">
                  {stageDeals.length}
                </span>
              </div>
              <p className="mt-3 text-[10px] font-medium opacity-65">
                {currency(
                  stageDeals.reduce((sum, deal) => sum + deal.amount, 0),
                )}
              </p>
              <div className="mt-3 space-y-2">
                {stageDeals.map((deal) => (
                  <article
                    key={deal.id}
                    className="rounded-xl border border-current/10 bg-current/[0.035] p-3 shadow-sm transition hover:-translate-y-0.5 hover:bg-current/[0.065]"
                  >
                    <button
                      type="button"
                      onClick={() => onDealClick(deal)}
                      disabled={movingDealId === deal.id}
                      className="w-full text-left disabled:cursor-wait disabled:opacity-65"
                    >
                      <p className="truncate text-[11px] font-medium">
                        {deal.title}
                      </p>
                      <p className="mt-1 truncate text-[9px] opacity-55">
                        {deal.client}
                      </p>
                      <div className="mt-3 flex items-end justify-between">
                        <span className="text-[12px] font-semibold">
                          {currency(deal.amount)}
                        </span>
                        <span className="text-[9px] opacity-55">
                          {deal.probability}%
                        </span>
                      </div>
                      <div className="mt-2 h-1 overflow-hidden rounded-full bg-current/10">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${deal.probability}%`,
                            backgroundColor: branding.brandColor,
                          }}
                        />
                      </div>
                    </button>
                    <div className="mt-3 flex items-center justify-between border-t border-current/8 pt-2">
                      <button
                        type="button"
                        aria-label="Sposta alla fase precedente"
                        disabled={
                          deal.stage === stages[0] || movingDealId === deal.id
                        }
                        onClick={() => onMoveDeal(deal, "previous")}
                        className="rounded-md px-1.5 py-1 text-[10px] opacity-55 transition hover:bg-current/[0.08] disabled:pointer-events-none disabled:opacity-20"
                      >
                        ←
                      </button>
                      <span className="text-[8px] opacity-45">
                        {movingDealId === deal.id ? "Aggiorno…" : deal.owner}
                      </span>
                      <button
                        type="button"
                        aria-label="Sposta alla fase successiva"
                        disabled={
                          deal.stage === stages.at(-1) ||
                          movingDealId === deal.id
                        }
                        onClick={() => onMoveDeal(deal, "next")}
                        className="rounded-md px-1.5 py-1 text-[10px] opacity-55 transition hover:bg-current/[0.08] disabled:pointer-events-none disabled:opacity-20"
                      >
                        →
                      </button>
                    </div>
                  </article>
                ))}
                {stageDeals.length === 0 && (
                  <div className="rounded-xl border border-dashed border-current/12 px-3 py-7 text-center text-[10px] opacity-45">
                    Nessuna opportunità
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function OffersSection({
  offers,
  onOfferClick,
}: {
  offers: Offer[];
  onOfferClick: (offer: Offer) => void;
}) {
  return (
    <div className="space-y-5">
      <SectionHeading
        eyebrow="Proposte commerciali"
        title="Offerte e preventivi"
        description="Apri una proposta dimostrativa per consultarne righe, stato e valore."
      />
      <DemoTable
        rows={offers}
        onRowClick={onOfferClick}
        columns={[
          {
            id: "reference",
            label: "Riferimento",
            cell: (offer) => (
              <div>
                <p className="text-[11px] font-medium">{offer.reference}</p>
                <p className="mt-0.5 text-[9px] opacity-55">{offer.title}</p>
              </div>
            ),
          },
          {
            id: "client",
            label: "Cliente",
            cell: (offer) => (
              <span className="text-[11px]">{offer.client}</span>
            ),
            hideOnMobile: true,
          },
          {
            id: "value",
            label: "Valore",
            cell: (offer) => (
              <span className="text-[11px] font-medium">
                {currency(offer.value)}
              </span>
            ),
          },
          {
            id: "status",
            label: "Stato",
            cell: (offer) => (
              <DemoStatusPill
                label={offer.status}
                tone={offerTone(offer.status)}
                dot
              />
            ),
          },
          {
            id: "open",
            label: "",
            cell: () => <ArrowRight className="size-3.5 opacity-55" />,
            className: "w-8",
          },
        ]}
      />
    </div>
  );
}

function ActivitiesSection({
  branding,
  activities,
  filter,
  isCreatingActivity,
  onCreateActivity,
  onFilterChange,
  onToggle,
}: {
  branding: DemoBranding;
  activities: Activity[];
  filter: ActivityFilter;
  isCreatingActivity: boolean;
  onCreateActivity: () => void;
  onFilterChange: (filter: ActivityFilter) => void;
  onToggle: (id: string) => void;
}) {
  const filters: ActivityFilter[] = ["Tutte", "Da fare", "Completate"];
  return (
    <div className="space-y-5">
      <SectionHeading
        eyebrow="Agenda commerciale"
        title="Attività e follow-up"
        description="Filtra l'elenco e completa un'attività: lo stato si aggiorna nella demo."
        action={
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-lg border border-current/12 p-1">
              {filters.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => onFilterChange(item)}
                  className={`rounded-md px-2 py-1.5 text-[10px] font-medium transition ${filter === item ? "bg-current text-[var(--demo-inverse,#141516)]" : "opacity-60 hover:bg-current/[0.06]"}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={onCreateActivity}
              disabled={isCreatingActivity}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[10px] font-medium transition hover:brightness-95 disabled:cursor-wait disabled:opacity-65"
              style={{
                backgroundColor: branding.brandColor,
                color: getBrandTextColor(branding.brandColor),
              }}
            >
              {isCreatingActivity ? (
                <RefreshCw className="size-3 animate-spin" />
              ) : (
                <Plus className="size-3" />
              )}
              {isCreatingActivity ? "Creazione" : "Nuova attività"}
            </button>
          </div>
        }
      />
      <div className="space-y-2">
        {activities.map((activity) => (
          <article
            key={activity.id}
            className="flex items-center gap-3 rounded-2xl border border-current/10 bg-current/[0.025] p-3 sm:p-4"
          >
            <button
              type="button"
              onClick={() => onToggle(activity.id)}
              className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition ${activity.status === "Completata" ? "border-current bg-current text-[var(--demo-inverse,#141516)]" : "border-current/16 hover:bg-current/[0.06]"}`}
              aria-label={
                activity.status === "Completata"
                  ? "Riapri attività"
                  : "Completa attività"
              }
            >
              {activity.status === "Completata" ? (
                <Check className="size-3.5" />
              ) : (
                <span className="size-1.5 rounded-full bg-current/35" />
              )}
            </button>
            <div className="min-w-0 flex-1">
              <p
                className={`truncate text-[11px] font-medium ${activity.status === "Completata" ? "line-through opacity-50" : ""}`}
              >
                {activity.title}
              </p>
              <p className="mt-1 truncate text-[9px] opacity-55">
                {activity.type} · {activity.client} · {activity.assignee}
              </p>
            </div>
            <div className="hidden text-right sm:block">
              <p className="text-[10px] opacity-65">{activity.when}</p>
              <div className="mt-1">
                <DemoStatusPill
                  label={activity.status}
                  tone={activityTone(activity.status)}
                />
              </div>
            </div>
          </article>
        ))}
        {activities.length === 0 && (
          <div className="rounded-2xl border border-dashed border-current/14 py-10 text-center text-[11px] opacity-55">
            Nessuna attività in questo filtro.
          </div>
        )}
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  titleSuffix,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  titleSuffix?: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] opacity-45">
          {eyebrow}
        </p>
        <h3 className="mt-1.5 text-lg font-semibold tracking-[-0.035em] sm:text-xl">
          {titleSuffix ? title.replace("{company}", titleSuffix) : title}
        </h3>
        <p className="mt-1.5 max-w-2xl text-[10px] leading-relaxed opacity-60">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}

function PipelineChart({
  branding,
  deals,
}: {
  branding: DemoBranding;
  deals: Deal[];
}) {
  const values = stages.map((stage) => ({
    stage,
    value: deals
      .filter((deal) => deal.stage === stage)
      .reduce((total, deal) => total + deal.amount, 0),
  }));
  const highestValue = Math.max(...values.map((item) => item.value), 1);

  return (
    <div className="mt-5 h-36 overflow-hidden rounded-xl border border-current/8 bg-current/[0.02] p-3">
      <div className="flex h-full items-end gap-2">
        {values.map(({ stage, value }) => {
          const height = value ? Math.max(14, (value / highestValue) * 100) : 8;
          return (
            <div
              key={stage}
              className="group relative flex h-full flex-1 flex-col justify-end"
            >
              <span className="mb-2 text-center text-[8px] opacity-50">
                {stage}
              </span>
              <div className="relative flex flex-1 items-end">
                <div
                  className="w-full rounded-t-sm opacity-65 transition-all duration-500 group-hover:opacity-100"
                  style={{
                    height: `${height}%`,
                    backgroundColor: branding.brandColor,
                  }}
                />
                <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-current px-1.5 py-1 text-[8px] text-[var(--demo-inverse,#141516)] group-hover:block">
                  {currency(value)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="mt-5 flex h-36 items-end gap-2 overflow-hidden rounded-xl border border-current/8 bg-current/[0.02] p-3">
      {Array.from({ length: 12 }, (_, index) => (
        <div
          key={index}
          className="flex-1 animate-pulse rounded-t-sm bg-current/8"
          style={{ height: `${36 + ((index * 17) % 55)}%` }}
        />
      ))}
    </div>
  );
}

function MetricMini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] opacity-50">{label}</p>
      <p className="mt-1 text-[11px] font-medium">{value}</p>
    </div>
  );
}
function InfoLine({
  label,
  value,
  emphasis,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] opacity-55">{label}</p>
      <p className={`mt-1 text-[12px] ${emphasis ? "font-semibold" : ""}`}>
        {value}
      </p>
    </div>
  );
}
function Field({
  label,
  value,
  onChange,
  type = "text",
  disabled,
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <label>
      <span className="mb-1.5 block text-[10px] font-medium opacity-60">
        {label}
      </span>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.value)}
        className="w-full rounded-xl border border-current/12 bg-current/[0.035] px-3 py-2 text-[12px] outline-none transition focus:border-current/35 disabled:cursor-not-allowed disabled:opacity-55"
      />
    </label>
  );
}
