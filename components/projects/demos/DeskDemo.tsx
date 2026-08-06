"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Bell,
  CircleHelp,
  CreditCard,
  Download,
  Eye,
  FileText,
  FolderOpen,
  LayoutDashboard,
  LoaderCircle,
  MessageSquareText,
  Plus,
  ReceiptText,
  Search,
  ShieldCheck,
  UserRound,
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

type DeskSection =
  "dashboard" | "documents" | "tickets" | "invoices" | "profile";
type TicketFilter = "Tutti" | "Aperti" | "In lavorazione" | "Risolti";
type TicketStatus = "Aperto" | "In lavorazione" | "Risolto";

type DemoDocument = {
  id: string;
  title: string;
  category: "Contratti" | "Report" | "Guide" | "Amministrazione";
  updatedAt: string;
  size: string;
  status: "Nuovo" | "Consultato";
  description: string;
};

type Ticket = {
  id: string;
  title: string;
  category: "Assistenza" | "Richiesta" | "Miglioramento";
  status: TicketStatus;
  priority: "Bassa" | "Media" | "Alta";
  updatedAt: string;
  description: string;
  messages: Array<{
    author: string;
    date: string;
    text: string;
    internal?: boolean;
  }>;
};

type Invoice = {
  id: string;
  number: string;
  period: string;
  amount: number;
  dueDate: string;
  status: "Pagata" | "In scadenza" | "In elaborazione";
  items: Array<{ label: string; value: number }>;
};

type Profile = {
  contactName: string;
  role: string;
  email: string;
  phone: string;
  notifications: boolean;
};

type DeskNotification = {
  id: string;
  text: string;
  detail: string;
  read: boolean;
};

type DeskActivity = {
  id: string;
  title: string;
  detail: string;
  time: string;
  tone: "info" | "success" | "warning";
};

type DeskModal =
  | { kind: "document"; id: string }
  | { kind: "ticket"; id: string }
  | { kind: "invoice"; id: string }
  | { kind: "new-ticket" }
  | null;

const deskNavigation = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "documents", label: "Documenti", icon: FolderOpen },
  { id: "tickets", label: "Ticket", icon: MessageSquareText },
  { id: "invoices", label: "Fatture", icon: ReceiptText },
  { id: "profile", label: "Profilo", icon: UserRound },
];

const initialDocuments: DemoDocument[] = [
  {
    id: "dc-1",
    title: "Piano di progetto · Q3 2026",
    category: "Report",
    updatedAt: "Aggiornato oggi",
    size: "2,4 MB",
    status: "Nuovo",
    description:
      "Roadmap dimostrativa con obiettivi, fasi e responsabilità del prossimo trimestre.",
  },
  {
    id: "dc-2",
    title: "Verbale workshop operativo",
    category: "Report",
    updatedAt: "28 maggio 2026",
    size: "860 KB",
    status: "Consultato",
    description:
      "Sintesi dei requisiti condivisi durante il workshop di allineamento.",
  },
  {
    id: "dc-3",
    title: "Accordo di servizio",
    category: "Contratti",
    updatedAt: "14 maggio 2026",
    size: "1,1 MB",
    status: "Consultato",
    description:
      "Esempio di documento contrattuale disponibile nell'area riservata.",
  },
  {
    id: "dc-4",
    title: "Guida all'area clienti",
    category: "Guide",
    updatedAt: "10 maggio 2026",
    size: "3,2 MB",
    status: "Consultato",
    description: "Guida introduttiva ai flussi principali del portale clienti.",
  },
  {
    id: "dc-5",
    title: "Riepilogo fatturazione maggio",
    category: "Amministrazione",
    updatedAt: "03 maggio 2026",
    size: "740 KB",
    status: "Consultato",
    description:
      "Riepilogo amministrativo dimostrativo del periodo selezionato.",
  },
];

const initialTickets: Ticket[] = [
  {
    id: "tk-1048",
    title: "Richiesta accesso per nuovo utente",
    category: "Assistenza",
    status: "In lavorazione",
    priority: "Media",
    updatedAt: "Aggiornato 18 min fa",
    description:
      "Vorremmo aggiungere un utente al gruppo Amministrazione con permessi di sola consultazione.",
    messages: [
      {
        author: "Martina Conti",
        date: "Oggi, 09:14",
        text: "Possiamo aggiungere un utente al gruppo Amministrazione?",
      },
      {
        author: "Team VANTA",
        date: "Oggi, 09:32",
        text: "Richiesta presa in carico. Stiamo verificando i permessi richiesti.",
      },
    ],
  },
  {
    id: "tk-1044",
    title: "Esportazione report mensile",
    category: "Miglioramento",
    status: "Aperto",
    priority: "Bassa",
    updatedAt: "Aggiornato ieri",
    description:
      "Sarebbe utile esportare il report mensile direttamente in formato Excel.",
    messages: [
      {
        author: "Lorenzo Ferri",
        date: "Ieri, 16:44",
        text: "Possiamo aggiungere l'export XLSX al report mensile?",
      },
    ],
  },
  {
    id: "tk-1031",
    title: "Aggiornamento dati società",
    category: "Richiesta",
    status: "Risolto",
    priority: "Media",
    updatedAt: "Risolto 24 maggio",
    description: "Aggiornamento dell'indirizzo di fatturazione della società.",
    messages: [
      {
        author: "Martina Conti",
        date: "23 maggio, 10:18",
        text: "Potete aggiornare l'indirizzo di fatturazione?",
      },
      {
        author: "Team VANTA",
        date: "24 maggio, 11:02",
        text: "Aggiornamento completato e confermato.",
      },
    ],
  },
  {
    id: "tk-1018",
    title: "Chiarimento sul report KPI",
    category: "Assistenza",
    status: "Risolto",
    priority: "Bassa",
    updatedAt: "Risolto 17 maggio",
    description:
      "Richiesta di chiarimento sull'origine di un indicatore visualizzato nella dashboard.",
    messages: [
      {
        author: "Team VANTA",
        date: "17 maggio, 15:40",
        text: "Abbiamo condiviso la nota esplicativa del KPI richiesto.",
      },
    ],
  },
];

const initialInvoices: Invoice[] = [
  {
    id: "inv-1",
    number: "FT-2026-054",
    period: "Maggio 2026",
    amount: 2280,
    dueDate: "10 giugno 2026",
    status: "In scadenza",
    items: [
      { label: "Canone piattaforma", value: 1680 },
      { label: "Assistenza evolutiva", value: 600 },
    ],
  },
  {
    id: "inv-2",
    number: "FT-2026-042",
    period: "Aprile 2026",
    amount: 2280,
    dueDate: "10 maggio 2026",
    status: "Pagata",
    items: [
      { label: "Canone piattaforma", value: 1680 },
      { label: "Assistenza evolutiva", value: 600 },
    ],
  },
  {
    id: "inv-3",
    number: "FT-2026-031",
    period: "Marzo 2026",
    amount: 3480,
    dueDate: "10 aprile 2026",
    status: "Pagata",
    items: [
      { label: "Canone piattaforma", value: 1680 },
      { label: "Sviluppo dashboard", value: 1800 },
    ],
  },
  {
    id: "inv-4",
    number: "FT-2026-060",
    period: "Giugno 2026",
    amount: 2280,
    dueDate: "10 luglio 2026",
    status: "In elaborazione",
    items: [
      { label: "Canone piattaforma", value: 1680 },
      { label: "Assistenza evolutiva", value: 600 },
    ],
  },
];

const initialProfile: Profile = {
  contactName: "Martina Conti",
  role: "Responsabile operativa",
  email: "martina.conti@azienda.demo",
  phone: "+39 02 5550 1122",
  notifications: true,
};

const initialNotifications: DeskNotification[] = [
  {
    id: "notice-document",
    text: "Nuovo documento disponibile",
    detail: "Piano di progetto · Q3 2026",
    read: false,
  },
  {
    id: "notice-ticket",
    text: "Ticket aggiornato",
    detail: "Richiesta accesso per nuovo utente",
    read: false,
  },
];

const initialActivities: DeskActivity[] = [
  {
    id: "activity-1",
    title: "Documento condiviso",
    detail: "Piano di progetto · Q3 2026 è disponibile nell'area demo.",
    time: "Oggi",
    tone: "info",
  },
  {
    id: "activity-2",
    title: "Ticket preso in carico",
    detail: "TK-1048 è in lavorazione nel flusso di assistenza demo.",
    time: "18 min fa",
    tone: "success",
  },
];

function cloneInitialDocuments() {
  return initialDocuments.map((document) => ({ ...document }));
}

function cloneInitialTickets() {
  return initialTickets.map((ticket) => ({
    ...ticket,
    messages: ticket.messages.map((message) => ({ ...message })),
  }));
}

function cloneInitialInvoices() {
  return initialInvoices.map((invoice) => ({
    ...invoice,
    items: invoice.items.map((item) => ({ ...item })),
  }));
}

function cloneInitialProfile() {
  return { ...initialProfile };
}

function cloneInitialNotifications() {
  return initialNotifications.map((notification) => ({ ...notification }));
}

function cloneInitialActivities() {
  return initialActivities.map((activity) => ({ ...activity }));
}

const euro = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
const currency = (value: number) => euro.format(value);

function ticketTone(status: TicketStatus) {
  if (status === "Risolto") return "success" as const;
  if (status === "In lavorazione") return "running" as const;
  return "warning" as const;
}

function invoiceTone(status: Invoice["status"]) {
  if (status === "Pagata") return "success" as const;
  if (status === "In scadenza") return "warning" as const;
  return "neutral" as const;
}

export default function DeskDemo({ branding }: { branding: DemoBranding }) {
  const [section, setSection] = useState<DeskSection>("dashboard");
  const [documents, setDocuments] = useState<DemoDocument[]>(
    cloneInitialDocuments,
  );
  const [tickets, setTickets] = useState<Ticket[]>(cloneInitialTickets);
  const [invoices, setInvoices] = useState<Invoice[]>(cloneInitialInvoices);
  const [profile, setProfile] = useState<Profile>(cloneInitialProfile);
  const [profileDraft, setProfileDraft] =
    useState<Profile>(cloneInitialProfile);
  const [ticketFilter, setTicketFilter] = useState<TicketFilter>("Tutti");
  const [documentSearch, setDocumentSearch] = useState("");
  const [modal, setModal] = useState<DeskModal>(null);
  const [newTicket, setNewTicket] = useState({
    title: "",
    category: "Assistenza" as Ticket["category"],
    priority: "Media" as Ticket["priority"],
    description: "",
  });
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<DeskNotification[]>(
    cloneInitialNotifications,
  );
  const [activities, setActivities] = useState<DeskActivity[]>(
    cloneInitialActivities,
  );
  const [documentLoading, setDocumentLoading] = useState(false);
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [toasts, setToasts] = useState<DemoToast[]>([]);
  const toastId = useRef(0);
  const ticketSequence = useRef(1049);
  const notificationSequence = useRef(1);
  const activitySequence = useRef(3);
  const actionTimersRef = useRef<Set<number>>(new Set());

  useEffect(
    () => () => {
      actionTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      actionTimersRef.current.clear();
    },
    [],
  );

  const brandForeground = getBrandForeground(branding.brandColor);

  const selectedDocument =
    modal?.kind === "document"
      ? documents.find((document) => document.id === modal.id)
      : undefined;
  const selectedTicket =
    modal?.kind === "ticket"
      ? tickets.find((ticket) => ticket.id === modal.id)
      : undefined;
  const selectedInvoice =
    modal?.kind === "invoice"
      ? invoices.find((invoice) => invoice.id === modal.id)
      : undefined;
  const filteredDocuments = useMemo(() => {
    const query = documentSearch.trim().toLocaleLowerCase("it-IT");
    if (!query) return documents;
    return documents.filter((document) =>
      `${document.title} ${document.category}`
        .toLocaleLowerCase("it-IT")
        .includes(query),
    );
  }, [documentSearch, documents]);
  const filteredTickets = useMemo(() => {
    if (ticketFilter === "Tutti") return tickets;
    const status =
      ticketFilter === "Aperti"
        ? "Aperto"
        : ticketFilter === "In lavorazione"
          ? "In lavorazione"
          : "Risolto";
    return tickets.filter((ticket) => ticket.status === status);
  }, [ticketFilter, tickets]);
  const openTickets = tickets.filter(
    (ticket) => ticket.status !== "Risolto",
  ).length;
  const newDocuments = documents.filter(
    (document) => document.status === "Nuovo",
  ).length;
  const ticketsInProgress = tickets.filter(
    (ticket) => ticket.status === "In lavorazione",
  ).length;
  const unreadNotifications = notifications.filter(
    (notification) => !notification.read,
  ).length;
  const nextInvoice =
    invoices.find((invoice) => invoice.status === "In scadenza") ??
    invoices.find((invoice) => invoice.status !== "Pagata") ??
    invoices[0];
  const navItems = useMemo(
    () =>
      deskNavigation.map((item) => ({
        ...item,
        badge:
          item.id === "documents"
            ? newDocuments || undefined
            : item.id === "tickets"
              ? openTickets || undefined
              : undefined,
      })),
    [newDocuments, openTickets],
  );

  function addToast(
    title: string,
    description?: string,
    tone: DemoToast["tone"] = "success",
  ) {
    const id = ++toastId.current;
    setToasts((current) => [...current, { id, title, description, tone }]);
  }

  function scheduleAction(callback: () => void, delay = 420) {
    const timer: number = window.setTimeout(() => {
      actionTimersRef.current.delete(timer);
      callback();
    }, delay);

    actionTimersRef.current.add(timer);
  }

  function addActivity(
    title: string,
    detail: string,
    tone: DeskActivity["tone"] = "info",
  ) {
    const id = `activity-${activitySequence.current++}`;
    setActivities((current) =>
      [{ id, title, detail, time: "Adesso", tone }, ...current].slice(0, 5),
    );
  }

  function addNotification(text: string, detail: string) {
    if (!profile.notifications) return;
    const id = `notice-${notificationSequence.current++}`;
    setNotifications((current) =>
      [{ id, text, detail, read: false }, ...current].slice(0, 5),
    );
  }

  function navigate(id: string) {
    if (deskNavigation.some((item) => item.id === id))
      setSection(id as DeskSection);
  }

  function openDocument(document: DemoDocument) {
    if (pendingAction) return;

    const wasNew = document.status === "Nuovo";
    setPendingAction(`document:${document.id}`);
    setDocuments((current) =>
      current.map((entry) =>
        entry.id === document.id ? { ...entry, status: "Consultato" } : entry,
      ),
    );
    if (wasNew) {
      setNotifications((current) =>
        current.map((notification) =>
          notification.id === "notice-document"
            ? { ...notification, read: true }
            : notification,
        ),
      );
    }
    setDocumentLoading(true);
    setModal({ kind: "document", id: document.id });
    scheduleAction(() => {
      setDocumentLoading(false);
      addActivity(
        "Documento consultato",
        `${document.title} è stato aperto nell'area riservata demo.`,
        "info",
      );
      setPendingAction(null);
      addToast(
        "Documento aperto",
        wasNew
          ? `${document.title} è stato segnato come consultato.`
          : `Anteprima di ${document.title} aggiornata.`,
        "info",
      );
    }, 500);
  }

  function createTicket() {
    if (pendingAction) return;

    if (!newTicket.title.trim() || !newTicket.description.trim()) {
      addToast(
        "Completa i campi richiesti",
        "Aggiungi titolo e descrizione al ticket demo.",
        "warning",
      );
      return;
    }
    const id = `tk-demo-${ticketSequence.current++}`;
    const ticket: Ticket = {
      id,
      title: newTicket.title.trim(),
      category: newTicket.category,
      priority: newTicket.priority,
      status: "Aperto",
      updatedAt: "Creato ora",
      description: newTicket.description.trim(),
      messages: [
        {
          author: profile.contactName,
          date: "Ora",
          text: newTicket.description.trim(),
        },
      ],
    };
    setPendingAction("ticket-create");
    scheduleAction(() => {
      setTickets((current) => [ticket, ...current]);
      addNotification(
        "Ticket creato",
        `${ticket.id.toUpperCase()} · ${ticket.title}`,
      );
      addActivity(
        "Nuovo ticket inviato",
        `${ticket.id.toUpperCase()}: ${ticket.title}.`,
        "success",
      );
      setNewTicket({
        title: "",
        category: "Assistenza",
        priority: "Media",
        description: "",
      });
      setModal(null);
      setSection("tickets");
      setPendingAction(null);
      addToast(
        "Ticket creato",
        `${ticket.id.toUpperCase()} è stato inserito nella demo locale.`,
        "success",
      );
    }, 500);
  }

  function updateTicketStatus(ticket: Ticket, status: TicketStatus) {
    if (pendingAction || status === ticket.status) return;

    setPendingAction(`ticket:${ticket.id}`);
    scheduleAction(() => {
      setTickets((current) =>
        current.map((entry) =>
          entry.id === ticket.id
            ? {
                ...entry,
                status,
                updatedAt: "Aggiornato ora",
                messages: [
                  ...entry.messages,
                  {
                    author: "Team VANTA",
                    date: "Ora",
                    text: `Stato aggiornato a ${status.toLowerCase()} nella demo.`,
                  },
                ],
              }
            : entry,
        ),
      );
      addNotification(
        "Ticket aggiornato",
        `${ticket.id.toUpperCase()} · ${status}`,
      );
      addActivity(
        "Stato ticket aggiornato",
        `${ticket.id.toUpperCase()} è ora ${status.toLowerCase()}.`,
        status === "Risolto" ? "success" : "info",
      );
      setPendingAction(null);
      addToast(
        "Stato ticket aggiornato",
        `${ticket.title} è ora “${status}”.`,
        status === "Risolto" ? "success" : "info",
      );
    }, 420);
  }

  function saveProfile() {
    if (pendingAction) return;

    const nextProfile = { ...profileDraft };
    setPendingAction("profile");
    scheduleAction(() => {
      setProfile(nextProfile);
      setProfileDraft(nextProfile);
      addActivity(
        "Profilo aggiornato",
        `Le preferenze di ${nextProfile.contactName} sono state salvate nella demo.`,
        "success",
      );
      setPendingAction(null);
      addToast(
        "Profilo aggiornato",
        `Il portale demo ora mostra ${nextProfile.contactName}.`,
        "success",
      );
    }, 420);
  }

  function prepareInvoiceDocument() {
    if (!selectedInvoice || pendingAction) return;

    if (selectedInvoice.status === "Pagata") {
      setPendingAction(`invoice:${selectedInvoice.id}`);
      scheduleAction(() => {
        addActivity(
          "Documento fattura scaricato",
          `${selectedInvoice.number} è stato scaricato nella demo.`,
          "info",
        );
        setPendingAction(null);
        addToast(
          "Download simulato",
          `In un portale reale scaricheresti ${selectedInvoice.number}.`,
          "info",
        );
      }, 360);
      return;
    }

    if (selectedInvoice.status === "In elaborazione") return;

    setPendingAction(`invoice:${selectedInvoice.id}`);
    scheduleAction(() => {
      setInvoices((current) =>
        current.map((invoice) =>
          invoice.id === selectedInvoice.id
            ? { ...invoice, status: "In elaborazione" }
            : invoice,
        ),
      );
      addNotification(
        "Fattura in preparazione",
        `${selectedInvoice.number} · ${selectedInvoice.period}`,
      );
      addActivity(
        "Fattura in preparazione",
        `${selectedInvoice.number} è stata inserita nel flusso documentale demo.`,
        "info",
      );
      setPendingAction(null);
      addToast(
        "Documento in preparazione",
        `${selectedInvoice.number} è stata inserita nel flusso demo.`,
        "info",
      );
    }, 420);
  }

  function simulateDocumentDownload() {
    if (!selectedDocument || pendingAction) return;

    setPendingAction(`download:${selectedDocument.id}`);
    scheduleAction(() => {
      addActivity(
        "Download documento simulato",
        `${selectedDocument.title} è stato richiesto dall'area riservata demo.`,
        "info",
      );
      setPendingAction(null);
      addToast(
        "Download simulato",
        `In un portale reale scaricheresti ${selectedDocument.title}.`,
        "info",
      );
    }, 360);
  }

  function markNotificationsRead() {
    if (!unreadNotifications) {
      addToast(
        "Nessuna nuova notifica",
        "Tutte le notifiche demo sono già state lette.",
        "info",
      );
      return;
    }

    setNotifications((current) =>
      current.map((notification) => ({ ...notification, read: true })),
    );
    addToast(
      "Notifiche lette",
      "Le notifiche demo sono state segnate come lette.",
      "info",
    );
  }

  function resetDemo() {
    actionTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    actionTimersRef.current.clear();
    setPendingAction(null);

    setDocuments(cloneInitialDocuments());
    setTickets(cloneInitialTickets());
    setInvoices(cloneInitialInvoices());
    setProfile(cloneInitialProfile());
    setProfileDraft(cloneInitialProfile());
    setTicketFilter("Tutti");
    setDocumentSearch("");
    setModal(null);
    setNewTicket({
      title: "",
      category: "Assistenza",
      priority: "Media",
      description: "",
    });
    setNotificationsOpen(false);
    setNotifications(cloneInitialNotifications());
    setActivities(cloneInitialActivities());
    setDocumentLoading(false);
    setSection("dashboard");
    setToasts([]);
    ticketSequence.current = 1049;
    notificationSequence.current = 1;
    activitySequence.current = 3;
    toastId.current = 0;
    addToast(
      "Demo ripristinata",
      "I dati dimostrativi di VANTA Desk sono tornati allo stato iniziale.",
      "info",
    );
  }

  const actions = (
    <div className="relative flex items-center gap-2">
      <button
        type="button"
        onClick={() => setNotificationsOpen((current) => !current)}
        className="relative inline-flex size-8 items-center justify-center rounded-lg border border-current/10 bg-current/[0.04] transition hover:bg-current/[0.08]"
        title="Notifiche demo"
        aria-label="Apri notifiche demo"
        aria-expanded={notificationsOpen}
      >
        <Bell className="size-3.5" />
        {unreadNotifications > 0 && (
          <span
            className="absolute right-1 top-1 size-1.5 rounded-full"
            style={{ backgroundColor: branding.brandColor }}
          />
        )}
      </button>
      {notificationsOpen && (
        <div className="absolute right-0 top-10 z-20 w-72 rounded-xl border border-current/12 bg-[var(--demo-overlay,#1a1b1d)] p-2 shadow-2xl">
          <div className="flex items-center justify-between px-2 py-1.5">
            <p className="text-[11px] font-semibold">Notifiche</p>
            <button
              type="button"
              onClick={markNotificationsRead}
              disabled={!unreadNotifications}
              className="text-[9px] opacity-60 transition hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-35"
            >
              Segna come lette
            </button>
          </div>
          <div className="mt-1 space-y-1">
            {notifications.map((notification) => (
              <NotificationItem key={notification.id} {...notification} />
            ))}
            {notifications.length === 0 && (
              <p className="px-2 py-4 text-center text-[10px] opacity-50">
                Nessuna notifica nella demo.
              </p>
            )}
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => !pendingAction && setModal({ kind: "new-ticket" })}
        disabled={Boolean(pendingAction)}
        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-medium text-[#131415] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
        style={{ backgroundColor: branding.brandColor, color: brandForeground }}
      >
        {pendingAction === "ticket-create" ? (
          <LoaderCircle className="size-3.5 animate-spin" />
        ) : (
          <Plus className="size-3.5" />
        )}
        <span className="hidden sm:inline">Nuovo ticket</span>
      </button>
    </div>
  );

  return (
    <DemoAppShell
      branding={branding}
      title="VANTA Desk"
      subtitle="Area riservata · demo concettuale"
      navItems={navItems}
      activeSection={section}
      onSectionChange={navigate}
      actions={actions}
      onReset={resetDemo}
      className="min-h-[620px]"
    >
      <div className="space-y-5 p-3 sm:p-5 lg:p-6">
        {section === "dashboard" && (
          <DeskDashboard
            branding={branding}
            profile={profile}
            documents={documents}
            tickets={tickets}
            activities={activities}
            openTickets={openTickets}
            newDocuments={newDocuments}
            ticketsInProgress={ticketsInProgress}
            nextInvoice={nextInvoice}
            onSectionChange={setSection}
            onDocumentClick={openDocument}
            onTicketClick={(ticket) =>
              setModal({ kind: "ticket", id: ticket.id })
            }
          />
        )}
        {section === "documents" && (
          <DocumentsSection
            documents={filteredDocuments}
            search={documentSearch}
            onSearchChange={setDocumentSearch}
            onDocumentClick={openDocument}
          />
        )}
        {section === "tickets" && (
          <TicketsSection
            tickets={filteredTickets}
            filter={ticketFilter}
            onFilterChange={setTicketFilter}
            onTicketClick={(ticket) =>
              setModal({ kind: "ticket", id: ticket.id })
            }
            onNewTicket={() =>
              !pendingAction && setModal({ kind: "new-ticket" })
            }
            isBusy={Boolean(pendingAction)}
          />
        )}
        {section === "invoices" && (
          <InvoicesSection
            invoices={invoices}
            onInvoiceClick={(invoice) =>
              setModal({ kind: "invoice", id: invoice.id })
            }
          />
        )}
        {section === "profile" && (
          <ProfileSection
            profile={profileDraft}
            onChange={setProfileDraft}
            onSave={saveProfile}
            saving={pendingAction === "profile"}
          />
        )}
      </div>

      <DemoModal
        open={Boolean(selectedDocument)}
        onClose={() => setModal(null)}
        title={selectedDocument?.title ?? "Documento"}
        description={
          selectedDocument
            ? `${selectedDocument.category} · ${selectedDocument.size} · ${selectedDocument.updatedAt}`
            : undefined
        }
        size="xl"
        drawerOnMobile
        footer={
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={simulateDocumentDownload}
              disabled={Boolean(pendingAction)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-current/14 px-3 py-2 text-[11px] font-medium transition hover:bg-current/[0.05] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pendingAction === `download:${selectedDocument?.id}` ? (
                <LoaderCircle className="size-3.5 animate-spin" />
              ) : (
                <Download className="size-3.5" />
              )}
              Scarica
            </button>
            <button
              type="button"
              onClick={() => setModal(null)}
              className="rounded-lg px-3 py-2 text-[11px] font-medium text-[#131415]"
              style={{
                backgroundColor: branding.brandColor,
                color: brandForeground,
              }}
            >
              Chiudi anteprima
            </button>
          </div>
        }
      >
        {selectedDocument &&
          (documentLoading ? (
            <DocumentSkeleton />
          ) : (
            <DocumentPreview document={selectedDocument} branding={branding} />
          ))}
      </DemoModal>

      <DemoModal
        open={Boolean(selectedTicket)}
        onClose={() => setModal(null)}
        title={selectedTicket?.title ?? "Ticket"}
        description={
          selectedTicket
            ? `${selectedTicket.id.toUpperCase()} · aggiornato ${selectedTicket.updatedAt}`
            : undefined
        }
        size="lg"
        drawerOnMobile
        footer={
          selectedTicket ? (
            <div className="flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() =>
                  updateTicketStatus(
                    selectedTicket,
                    selectedTicket.status === "Risolto" ? "Aperto" : "Risolto",
                  )
                }
                disabled={Boolean(pendingAction)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-current/14 px-3 py-2 text-[11px] font-medium transition hover:bg-current/[0.05] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {pendingAction === `ticket:${selectedTicket.id}` && (
                  <LoaderCircle className="size-3.5 animate-spin" />
                )}
                {selectedTicket.status === "Risolto"
                  ? "Riapri ticket"
                  : "Segna risolto"}
              </button>
              <button
                type="button"
                onClick={() => setModal(null)}
                className="rounded-lg px-3 py-2 text-[11px] font-medium text-[#131415]"
                style={{
                  backgroundColor: branding.brandColor,
                  color: brandForeground,
                }}
              >
                Chiudi
              </button>
            </div>
          ) : undefined
        }
      >
        {selectedTicket && (
          <TicketDetail
            ticket={selectedTicket}
            onStatusChange={(status) =>
              updateTicketStatus(selectedTicket, status)
            }
            disabled={Boolean(pendingAction)}
          />
        )}
      </DemoModal>

      <DemoModal
        open={modal?.kind === "new-ticket"}
        onClose={() => setModal(null)}
        title="Apri un nuovo ticket"
        description="Questa azione crea una richiesta solo nello stato locale della demo."
        size="md"
        drawerOnMobile
        footer={
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => !pendingAction && setModal(null)}
              disabled={Boolean(pendingAction)}
              className="rounded-lg border border-current/14 px-3 py-2 text-[11px] font-medium transition hover:bg-current/[0.05] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Annulla
            </button>
            <button
              type="button"
              onClick={createTicket}
              disabled={Boolean(pendingAction)}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-medium text-[#131415] disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                backgroundColor: branding.brandColor,
                color: brandForeground,
              }}
            >
              {pendingAction === "ticket-create" ? (
                <LoaderCircle className="size-3.5 animate-spin" />
              ) : (
                <ArrowRight className="size-3.5" />
              )}
              {pendingAction === "ticket-create"
                ? "Invio in corso"
                : "Invia richiesta"}
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <Field
            label="Titolo della richiesta"
            value={newTicket.title}
            onChange={(value) =>
              setNewTicket((current) => ({ ...current, title: value }))
            }
            placeholder="Es. Nuovo accesso per il team"
            disabled={Boolean(pendingAction)}
          />
          <div className="grid grid-cols-2 gap-3">
            <SelectField
              label="Categoria"
              value={newTicket.category}
              onChange={(value) =>
                setNewTicket((current) => ({
                  ...current,
                  category: value as Ticket["category"],
                }))
              }
              options={["Assistenza", "Richiesta", "Miglioramento"]}
              disabled={Boolean(pendingAction)}
            />
            <SelectField
              label="Priorità"
              value={newTicket.priority}
              onChange={(value) =>
                setNewTicket((current) => ({
                  ...current,
                  priority: value as Ticket["priority"],
                }))
              }
              options={["Bassa", "Media", "Alta"]}
              disabled={Boolean(pendingAction)}
            />
          </div>
          <label>
            <span className="mb-1.5 block text-[10px] font-medium opacity-60">
              Descrizione
            </span>
            <textarea
              value={newTicket.description}
              onChange={(event) =>
                setNewTicket((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              rows={4}
              placeholder="Descrivi brevemente la richiesta…"
              disabled={Boolean(pendingAction)}
              className="w-full resize-none rounded-xl border border-current/12 bg-current/[0.035] px-3 py-2 text-[12px] outline-none transition focus:border-current/35 placeholder:text-current/35"
            />
          </label>
        </div>
      </DemoModal>

      <DemoModal
        open={Boolean(selectedInvoice)}
        onClose={() => setModal(null)}
        title={
          selectedInvoice ? `Fattura ${selectedInvoice.number}` : "Fattura"
        }
        description={
          selectedInvoice
            ? `${selectedInvoice.period} · Scadenza ${selectedInvoice.dueDate}`
            : undefined
        }
        size="lg"
        drawerOnMobile
        footer={
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={prepareInvoiceDocument}
              disabled={
                Boolean(pendingAction) ||
                selectedInvoice?.status === "In elaborazione"
              }
              className="inline-flex items-center gap-1.5 rounded-lg border border-current/14 px-3 py-2 text-[11px] font-medium transition hover:bg-current/[0.05] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pendingAction === `invoice:${selectedInvoice?.id}` ? (
                <LoaderCircle className="size-3.5 animate-spin" />
              ) : (
                <Download className="size-3.5" />
              )}
              {selectedInvoice?.status === "Pagata"
                ? "Scarica documento"
                : selectedInvoice?.status === "In elaborazione"
                  ? "Già in preparazione"
                  : "Prepara documento"}
            </button>
            <button
              type="button"
              onClick={() => setModal(null)}
              className="rounded-lg px-3 py-2 text-[11px] font-medium text-[#131415]"
              style={{
                backgroundColor: branding.brandColor,
                color: brandForeground,
              }}
            >
              Chiudi
            </button>
          </div>
        }
      >
        {selectedInvoice && (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-current/10 bg-current/[0.035] p-4">
              <div>
                <p className="text-[10px] opacity-55">Totale documento</p>
                <p className="mt-1 text-xl font-semibold">
                  {currency(selectedInvoice.amount)}
                </p>
              </div>
              <DemoStatusPill
                label={selectedInvoice.status}
                tone={invoiceTone(selectedInvoice.status)}
                dot
              />
            </div>
            <div className="space-y-2">
              {selectedInvoice.items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between border-b border-current/8 py-2 text-[12px]"
                >
                  <span className="opacity-70">{item.label}</span>
                  <span className="font-medium">{currency(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </DemoModal>
      <DemoToastStack
        toasts={toasts}
        onDismiss={(id) =>
          setToasts((current) => current.filter((toast) => toast.id !== id))
        }
      />
    </DemoAppShell>
  );
}

function DeskDashboard({
  branding,
  profile,
  documents,
  tickets,
  activities,
  openTickets,
  newDocuments,
  ticketsInProgress,
  nextInvoice,
  onSectionChange,
  onDocumentClick,
  onTicketClick,
}: {
  branding: DemoBranding;
  profile: Profile;
  documents: DemoDocument[];
  tickets: Ticket[];
  activities: DeskActivity[];
  openTickets: number;
  newDocuments: number;
  ticketsInProgress: number;
  nextInvoice?: Invoice;
  onSectionChange: (section: DeskSection) => void;
  onDocumentClick: (document: DemoDocument) => void;
  onTicketClick: (ticket: Ticket) => void;
}) {
  return (
    <div className="space-y-5">
      <SectionHeading
        eyebrow="Area clienti"
        title={`Benvenuta, ${profile.contactName.split(" ")[0]}.`}
        description={`Questa dashboard è una demo interattiva per ${branding.companyName}: contenuti e flussi verranno modellati sui processi della tua azienda.`}
        action={
          <span className="inline-flex items-center gap-1.5 text-[10px] opacity-60">
            <ShieldCheck className="size-3.5" /> Ambiente dimostrativo
          </span>
        }
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <DemoKpiCard
          label="Ticket aperti"
          value={String(openTickets)}
          detail={
            ticketsInProgress
              ? `${ticketsInProgress} in lavorazione`
              : "Nessuno in lavorazione"
          }
          trend="Assistenza"
          icon={MessageSquareText}
          onClick={() => onSectionChange("tickets")}
        />
        <DemoKpiCard
          label="Documenti nuovi"
          value={String(newDocuments)}
          detail="Da consultare"
          trend="Area riservata"
          icon={FolderOpen}
          onClick={() => onSectionChange("documents")}
        />
        <DemoKpiCard
          label="Stato account"
          value={profile.email ? "Attivo" : "Da configurare"}
          detail={
            profile.notifications ? "Notifiche attive" : "Notifiche disattivate"
          }
          trend="Operativo"
          icon={ShieldCheck}
          onClick={() => onSectionChange("profile")}
        />
        <DemoKpiCard
          label="Prossima scadenza"
          value={nextInvoice ? currency(nextInvoice.amount) : "—"}
          detail={nextInvoice?.dueDate ?? "Nessuna scadenza"}
          trend="Fatturazione"
          icon={CreditCard}
          onClick={() => onSectionChange("invoices")}
        />
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-2xl border border-current/10 bg-current/[0.025] p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-semibold">I tuoi documenti</p>
              <p className="mt-1 text-[10px] opacity-55">
                Disponibili nell&apos;area demo
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSectionChange("documents")}
              className="text-[10px] font-medium opacity-65 transition hover:opacity-100"
            >
              Vedi tutti
            </button>
          </div>
          <div className="mt-3 space-y-1">
            {documents.slice(0, 3).map((document) => (
              <button
                type="button"
                key={document.id}
                onClick={() => onDocumentClick(document)}
                className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition hover:bg-current/[0.055]"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-current/10 bg-current/[0.04]">
                  <FileText className="size-3.5 opacity-65" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11px] font-medium">
                    {document.title}
                  </span>
                  <span className="mt-0.5 block text-[9px] opacity-55">
                    {document.category} · {document.updatedAt}
                  </span>
                </span>
                {document.status === "Nuovo" && (
                  <span
                    className="size-1.5 rounded-full"
                    style={{ backgroundColor: branding.brandColor }}
                  />
                )}
              </button>
            ))}
          </div>
        </section>
        <section className="rounded-2xl border border-current/10 bg-current/[0.025] p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-semibold">Ticket recenti</p>
              <p className="mt-1 text-[10px] opacity-55">
                Stato delle tue richieste
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSectionChange("tickets")}
              className="text-[10px] font-medium opacity-65 transition hover:opacity-100"
            >
              Gestisci
            </button>
          </div>
          <div className="mt-3 space-y-2">
            {tickets.slice(0, 3).map((ticket) => (
              <button
                type="button"
                key={ticket.id}
                onClick={() => onTicketClick(ticket)}
                className="flex w-full items-center justify-between gap-3 rounded-xl border border-current/8 px-3 py-2.5 text-left transition hover:bg-current/[0.055]"
              >
                <span className="min-w-0">
                  <span className="block truncate text-[11px] font-medium">
                    {ticket.title}
                  </span>
                  <span className="mt-0.5 block text-[9px] opacity-55">
                    {ticket.id.toUpperCase()} · {ticket.updatedAt}
                  </span>
                </span>
                <DemoStatusPill
                  label={ticket.status}
                  tone={ticketTone(ticket.status)}
                />
              </button>
            ))}
          </div>
        </section>
      </div>
      <section className="rounded-2xl border border-current/10 bg-current/[0.025] p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[13px] font-semibold">Attività recenti</p>
            <p className="mt-1 text-[10px] opacity-55">
              Le azioni svolte nella demo vengono registrate qui.
            </p>
          </div>
          <span className="text-[9px] font-medium uppercase tracking-[0.12em] opacity-45">
            {activities.length} eventi
          </span>
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-3">
          {activities.slice(0, 3).map((activity) => (
            <article
              key={activity.id}
              className="rounded-xl border border-current/8 bg-current/[0.02] p-3"
            >
              <div className="flex items-start gap-2.5">
                <span
                  className="mt-1 size-1.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor:
                      activity.tone === "warning"
                        ? "#8D939B"
                        : branding.brandColor,
                  }}
                />
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-[10px] font-semibold">
                      {activity.title}
                    </p>
                    <span className="shrink-0 text-[9px] opacity-45">
                      {activity.time}
                    </span>
                  </div>
                  <p className="mt-1 text-[9px] leading-relaxed opacity-60">
                    {activity.detail}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="rounded-2xl border border-current/10 bg-current/[0.025] p-4 sm:p-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-[13px] font-semibold">Stato del servizio</p>
            <p className="mt-1 text-[10px] opacity-55">
              Esempio di monitoraggio trasparente dell&apos;account.
            </p>
          </div>
          <DemoStatusPill
            label="Tutti i servizi operativi"
            tone="success"
            dot
          />
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <ServiceStatus
            label="Portale clienti"
            detail="Ambiente demo disponibile"
            status="Operativo"
            branding={branding}
          />
          <ServiceStatus
            label="Documenti"
            detail={
              newDocuments
                ? `${newDocuments} da consultare`
                : "Tutti consultati"
            }
            status={newDocuments ? "Da consultare" : "Aggiornati"}
            branding={branding}
          />
          <ServiceStatus
            label="Supporto"
            detail={`${openTickets} ticket aperti nella demo`}
            status={
              ticketsInProgress ? "In gestione" : "Nessuna richiesta attiva"
            }
            branding={branding}
          />
        </div>
      </section>
    </div>
  );
}

function DocumentsSection({
  documents,
  search,
  onSearchChange,
  onDocumentClick,
}: {
  documents: DemoDocument[];
  search: string;
  onSearchChange: (value: string) => void;
  onDocumentClick: (document: DemoDocument) => void;
}) {
  return (
    <div className="space-y-5">
      <SectionHeading
        eyebrow="Area riservata"
        title="Documenti condivisi"
        description="Apri una risorsa per visualizzare un'anteprima dimostrativa e simulare il download."
        action={
          <label className="flex w-full max-w-56 items-center gap-2 rounded-lg border border-current/12 bg-current/[0.03] px-2.5 py-2 text-current/60">
            <Search className="size-3.5" />
            <input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Cerca documento"
              className="min-w-0 flex-1 bg-transparent text-[11px] outline-none placeholder:text-current/40"
            />
          </label>
        }
      />
      <DemoTable
        rows={documents}
        onRowClick={onDocumentClick}
        emptyMessage="Nessun documento corrisponde alla ricerca."
        columns={[
          {
            id: "title",
            label: "Documento",
            cell: (document) => (
              <div className="flex items-center gap-2.5">
                <span className="flex size-7 items-center justify-center rounded-lg border border-current/10 bg-current/[0.04]">
                  <FileText className="size-3.5 opacity-65" />
                </span>
                <div>
                  <p className="text-[11px] font-medium">{document.title}</p>
                  <p className="mt-0.5 text-[9px] opacity-55">
                    {document.category} · {document.size}
                  </p>
                </div>
              </div>
            ),
          },
          {
            id: "updated",
            label: "Aggiornato",
            cell: (document) => (
              <span className="text-[10px] opacity-60">
                {document.updatedAt}
              </span>
            ),
            hideOnMobile: true,
          },
          {
            id: "status",
            label: "Stato",
            cell: (document) => (
              <DemoStatusPill
                label={document.status}
                tone={document.status === "Nuovo" ? "warning" : "neutral"}
                dot={document.status === "Nuovo"}
              />
            ),
          },
          {
            id: "open",
            label: "",
            cell: () => <Eye className="size-3.5 opacity-55" />,
            className: "w-8",
          },
        ]}
      />
    </div>
  );
}

function TicketsSection({
  tickets,
  filter,
  onFilterChange,
  onTicketClick,
  onNewTicket,
  isBusy,
}: {
  tickets: Ticket[];
  filter: TicketFilter;
  onFilterChange: (filter: TicketFilter) => void;
  onTicketClick: (ticket: Ticket) => void;
  onNewTicket: () => void;
  isBusy: boolean;
}) {
  const filters: TicketFilter[] = [
    "Tutti",
    "Aperti",
    "In lavorazione",
    "Risolti",
  ];
  return (
    <div className="space-y-5">
      <SectionHeading
        eyebrow="Supporto"
        title="Ticket e richieste"
        description="Filtra le richieste aperte e consulta il dettaglio: ogni contenuto è un esempio dimostrativo."
        action={
          <button
            type="button"
            onClick={onNewTicket}
            disabled={isBusy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-current/14 px-3 py-2 text-[11px] font-medium transition hover:bg-current/[0.05] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus className="size-3.5" /> Nuovo ticket
          </button>
        }
      />
      <div className="flex max-w-full gap-1 overflow-x-auto rounded-lg border border-current/12 p-1">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onFilterChange(item)}
            className={`shrink-0 rounded-md px-2.5 py-1.5 text-[10px] font-medium transition ${filter === item ? "bg-current text-[var(--demo-inverse,#141516)]" : "opacity-60 hover:bg-current/[0.06]"}`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {tickets.map((ticket) => (
          <button
            type="button"
            key={ticket.id}
            onClick={() => onTicketClick(ticket)}
            className="flex w-full items-center gap-3 rounded-2xl border border-current/10 bg-current/[0.025] p-3 text-left transition hover:-translate-y-0.5 hover:bg-current/[0.055] sm:p-4"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-current/10 bg-current/[0.04]">
              <CircleHelp className="size-3.5 opacity-65" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className="truncate text-[11px] font-medium">
                  {ticket.title}
                </span>
                {ticket.priority === "Alta" && (
                  <span className="hidden rounded-full border border-current/12 px-1.5 py-0.5 text-[8px] font-medium opacity-65 sm:inline">
                    Priorità alta
                  </span>
                )}
              </span>
              <span className="mt-1 block truncate text-[9px] opacity-55">
                {ticket.id.toUpperCase()} · {ticket.category} ·{" "}
                {ticket.updatedAt}
              </span>
            </span>
            <span className="hidden sm:block">
              <DemoStatusPill
                label={ticket.status}
                tone={ticketTone(ticket.status)}
                dot
              />
            </span>
            <ArrowRight className="size-3.5 shrink-0 opacity-45" />
          </button>
        ))}
        {tickets.length === 0 && (
          <div className="rounded-2xl border border-dashed border-current/14 py-10 text-center text-[11px] opacity-55">
            Nessun ticket in questo filtro.
          </div>
        )}
      </div>
    </div>
  );
}

function InvoicesSection({
  invoices,
  onInvoiceClick,
}: {
  invoices: Invoice[];
  onInvoiceClick: (invoice: Invoice) => void;
}) {
  return (
    <div className="space-y-5">
      <SectionHeading
        eyebrow="Amministrazione"
        title="Fatture e pagamenti"
        description="Documenti dimostrativi per rappresentare una vista amministrativa chiara e accessibile."
      />
      <DemoTable
        rows={invoices}
        onRowClick={onInvoiceClick}
        columns={[
          {
            id: "number",
            label: "Documento",
            cell: (invoice) => (
              <div>
                <p className="text-[11px] font-medium">{invoice.number}</p>
                <p className="mt-0.5 text-[9px] opacity-55">{invoice.period}</p>
              </div>
            ),
          },
          {
            id: "amount",
            label: "Importo",
            cell: (invoice) => (
              <span className="text-[11px] font-medium">
                {currency(invoice.amount)}
              </span>
            ),
          },
          {
            id: "due",
            label: "Scadenza",
            cell: (invoice) => (
              <span className="text-[10px] opacity-60">{invoice.dueDate}</span>
            ),
            hideOnMobile: true,
          },
          {
            id: "status",
            label: "Stato",
            cell: (invoice) => (
              <DemoStatusPill
                label={invoice.status}
                tone={invoiceTone(invoice.status)}
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

function ProfileSection({
  profile,
  onChange,
  onSave,
  saving,
}: {
  profile: Profile;
  onChange: (profile: Profile) => void;
  onSave: () => void;
  saving: boolean;
}) {
  return (
    <div className="space-y-5">
      <SectionHeading
        eyebrow="Impostazioni account"
        title="Profilo e preferenze"
        description="Aggiorna i dati qui sotto per provare una personalizzazione locale della demo."
      />
      <div className="grid gap-4 lg:grid-cols-[1fr_0.7fr]">
        <section className="rounded-2xl border border-current/10 bg-current/[0.025] p-4 sm:p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Nome e cognome"
              value={profile.contactName}
              onChange={(value) => onChange({ ...profile, contactName: value })}
              disabled={saving}
            />
            <Field
              label="Ruolo"
              value={profile.role}
              onChange={(value) => onChange({ ...profile, role: value })}
              disabled={saving}
            />
            <Field
              label="Email"
              type="email"
              value={profile.email}
              onChange={(value) => onChange({ ...profile, email: value })}
              disabled={saving}
            />
            <Field
              label="Telefono"
              value={profile.phone}
              onChange={(value) => onChange({ ...profile, phone: value })}
              disabled={saving}
            />
          </div>
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-current px-3 py-2 text-[11px] font-medium text-[var(--demo-inverse,#141516)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving && <LoaderCircle className="size-3.5 animate-spin" />}
            {saving ? "Salvataggio" : "Salva modifiche demo"}
          </button>
        </section>
        <aside className="rounded-2xl border border-current/10 bg-current/[0.025] p-4 sm:p-5">
          <p className="text-[13px] font-semibold">Preferenze</p>
          <p className="mt-1 text-[10px] leading-relaxed opacity-55">
            Gestisci il tipo di aggiornamenti che ricevi dall&apos;area
            riservata.
          </p>
          <button
            type="button"
            onClick={() =>
              onChange({ ...profile, notifications: !profile.notifications })
            }
            disabled={saving}
            className="mt-5 flex w-full items-center justify-between rounded-xl border border-current/10 bg-current/[0.035] p-3 text-left transition hover:bg-current/[0.06] disabled:cursor-not-allowed disabled:opacity-55"
          >
            <span>
              <span className="block text-[11px] font-medium">
                Notifiche email
              </span>
              <span className="mt-1 block text-[9px] opacity-55">
                Aggiornamenti su ticket e documenti
              </span>
            </span>
            <span
              className={`relative h-5 w-9 rounded-full transition ${profile.notifications ? "bg-current" : "bg-current/15"}`}
            >
              <span
                className={`absolute top-0.5 size-4 rounded-full bg-[var(--demo-inverse,#141516)] shadow transition ${profile.notifications ? "left-[18px]" : "left-0.5"}`}
              />
            </span>
          </button>
          <div className="mt-4 rounded-xl border border-current/8 p-3">
            <p className="text-[10px] font-medium">Account demo</p>
            <p className="mt-1 text-[9px] leading-relaxed opacity-55">
              Questa interfaccia non contiene dati di clienti reali. Ogni
              modifica viene mantenuta solo nella sessione corrente.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function TicketDetail({
  ticket,
  onStatusChange,
  disabled = false,
}: {
  ticket: Ticket;
  onStatusChange: (status: TicketStatus) => void;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <DemoStatusPill
          label={ticket.status}
          tone={ticketTone(ticket.status)}
          dot
        />
        <span className="rounded-full border border-current/12 px-2 py-1 text-[9px] opacity-65">
          {ticket.category}
        </span>
        <span className="rounded-full border border-current/12 px-2 py-1 text-[9px] opacity-65">
          Priorità {ticket.priority}
        </span>
      </div>
      <p className="rounded-xl border border-current/10 bg-current/[0.035] p-3 text-[12px] leading-relaxed opacity-80">
        {ticket.description}
      </p>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] opacity-50">
            Conversazione
          </p>
          <select
            value={ticket.status}
            onChange={(event) =>
              onStatusChange(event.target.value as TicketStatus)
            }
            disabled={disabled}
            className="rounded-lg border border-current/12 bg-current/[0.03] px-2 py-1.5 text-[10px] outline-none"
          >
            <option>Aperto</option>
            <option>In lavorazione</option>
            <option>Risolto</option>
          </select>
        </div>
        <div className="mt-3 space-y-2">
          {ticket.messages.map((message, index) => (
            <div
              key={`${message.author}-${index}`}
              className={`rounded-xl border border-current/8 p-3 ${message.author === "Team VANTA" ? "bg-current/[0.035]" : "bg-transparent"}`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[10px] font-medium">{message.author}</p>
                <p className="text-[9px] opacity-45">{message.date}</p>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed opacity-70">
                {message.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DocumentPreview({
  document,
  branding,
}: {
  document: DemoDocument;
  branding: DemoBranding;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-current/10 bg-current/[0.025]">
      <div className="flex items-center justify-between border-b border-current/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <FileText className="size-4 opacity-60" />
          <span className="text-[10px] font-medium">Anteprima documento</span>
        </div>
        <span
          className="rounded-full px-2 py-1 text-[8px] font-medium text-[#131415]"
          style={{
            backgroundColor: branding.brandColor,
            color: getBrandForeground(branding.brandColor),
          }}
        >
          Demo sample
        </span>
      </div>
      <div className="space-y-4 p-5 sm:p-7">
        <div className="h-3 w-32 rounded bg-current/12" />
        <div className="h-7 w-4/5 rounded bg-current/16" />
        <div className="space-y-2 pt-2">
          {[100, 93, 96, 72, 88, 78].map((width, index) => (
            <div
              key={index}
              className="h-2 rounded-full bg-current/[0.08]"
              style={{ width: `${width}%` }}
            />
          ))}
        </div>
        <div className="mt-5 rounded-xl border border-current/8 p-4">
          <p className="text-[11px] font-medium">{document.description}</p>
          <p className="mt-2 text-[10px] leading-relaxed opacity-55">
            Contenuto illustrativo per mostrare come documenti, file e
            comunicazioni possano convivere in un unico spazio dedicato al
            cliente.
          </p>
        </div>
      </div>
    </div>
  );
}

function DocumentSkeleton() {
  return (
    <div className="space-y-4 rounded-xl border border-current/10 p-5 sm:p-7">
      <div className="h-3 w-24 animate-pulse rounded bg-current/10" />
      <div className="h-7 w-3/4 animate-pulse rounded bg-current/10" />
      <div className="space-y-2">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="h-2 animate-pulse rounded bg-current/[0.08]"
            style={{ width: `${100 - index * 7}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function ServiceStatus({
  label,
  detail,
  status,
  branding,
}: {
  label: string;
  detail: string;
  status: string;
  branding: DemoBranding;
}) {
  return (
    <div className="rounded-xl border border-current/8 p-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-medium">{label}</p>
        <span
          className="text-[9px] font-semibold"
          style={{ color: branding.brandColor }}
        >
          {status}
        </span>
      </div>
      <p className="mt-1 text-[9px] opacity-55">{detail}</p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-current/10">
        <div
          className="h-full rounded-full"
          style={{ width: "100%", backgroundColor: branding.brandColor }}
        />
      </div>
    </div>
  );
}
function NotificationItem({
  text,
  detail,
  read,
}: {
  text: string;
  detail: string;
  read: boolean;
}) {
  return (
    <div
      className={`rounded-lg px-2 py-2 transition hover:bg-current/[0.05] ${read ? "opacity-55" : "bg-current/[0.035]"}`}
    >
      <p className="text-[10px] font-medium">{text}</p>
      <p className="mt-0.5 text-[9px] opacity-55">{detail}</p>
    </div>
  );
}
function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
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
          {title}
        </h3>
        <p className="mt-1.5 max-w-2xl text-[10px] leading-relaxed opacity-60">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}
function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
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
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className="w-full rounded-xl border border-current/12 bg-current/[0.035] px-3 py-2 text-[12px] outline-none transition focus:border-current/35 placeholder:text-current/35 disabled:cursor-not-allowed disabled:opacity-55"
      />
    </label>
  );
}
function SelectField({
  label,
  value,
  onChange,
  options,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  disabled?: boolean;
}) {
  return (
    <label>
      <span className="mb-1.5 block text-[10px] font-medium opacity-60">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className="w-full rounded-xl border border-current/12 bg-current/[0.035] px-3 py-2 text-[12px] outline-none transition focus:border-current/35 disabled:cursor-not-allowed disabled:opacity-55"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
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
