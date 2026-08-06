"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  Archive,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  Factory,
  Gauge,
  LoaderCircle,
  PackageCheck,
  PackageOpen,
  Plus,
  RefreshCw,
  Settings2,
  SlidersHorizontal,
  Truck,
  Wrench,
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

type FactorySection =
  "production" | "orders" | "inventory" | "machines" | "kpi";
type ProductionStatus =
  "Pianificato" | "In lavorazione" | "Controllo qualità" | "Pronto";
type MachineStatus = "Operativo" | "Attenzione" | "Manutenzione";

type ProductionOrder = {
  id: string;
  code: string;
  product: string;
  department: string;
  quantity: number;
  completed: number;
  dueDate: string;
  status: ProductionStatus;
  priority: "Normale" | "Alta";
};

type InventoryItem = {
  id: string;
  name: string;
  sku: string;
  stock: number;
  reorderAt: number;
  location: string;
  unit: string;
};

type Machine = {
  id: string;
  name: string;
  area: string;
  status: MachineStatus;
  efficiency: number;
  nextService: string;
  output: string;
};

type FactoryActivity = {
  id: string;
  title: string;
  detail: string;
  time: string;
  tone: "info" | "success" | "warning";
};

const initialOrders: ProductionOrder[] = [
  {
    id: "ord-2481",
    code: "PR-2481",
    product: "Modulo Serie A-42",
    department: "Assemblaggio 01",
    quantity: 480,
    completed: 336,
    dueDate: "12 giu",
    status: "In lavorazione",
    priority: "Alta",
  },
  {
    id: "ord-2480",
    code: "PR-2480",
    product: "Unità di controllo M-10",
    department: "Collaudo",
    quantity: 160,
    completed: 160,
    dueDate: "10 giu",
    status: "Controllo qualità",
    priority: "Normale",
  },
  {
    id: "ord-2479",
    code: "PR-2479",
    product: "Kit componenti C-08",
    department: "Preparazione",
    quantity: 920,
    completed: 0,
    dueDate: "14 giu",
    status: "Pianificato",
    priority: "Normale",
  },
  {
    id: "ord-2478",
    code: "PR-2478",
    product: "Pannello industriale P-3",
    department: "Assemblaggio 02",
    quantity: 240,
    completed: 240,
    dueDate: "09 giu",
    status: "Pronto",
    priority: "Alta",
  },
];

const initialInventory: InventoryItem[] = [
  {
    id: "inv-1",
    name: "Scheda controllo SC-11",
    sku: "SC-11-02",
    stock: 42,
    reorderAt: 55,
    location: "A-03",
    unit: "pz",
  },
  {
    id: "inv-2",
    name: "Connettore industriale",
    sku: "CN-845",
    stock: 680,
    reorderAt: 250,
    location: "B-12",
    unit: "pz",
  },
  {
    id: "inv-3",
    name: "Telaio Serie A",
    sku: "TL-A42",
    stock: 118,
    reorderAt: 80,
    location: "C-04",
    unit: "pz",
  },
  {
    id: "inv-4",
    name: "Guarnizione termoelastica",
    sku: "GT-710",
    stock: 24,
    reorderAt: 40,
    location: "A-08",
    unit: "pz",
  },
  {
    id: "inv-5",
    name: "Kit cablaggio M-10",
    sku: "KB-M10",
    stock: 310,
    reorderAt: 120,
    location: "B-06",
    unit: "kit",
  },
];

const initialMachines: Machine[] = [
  {
    id: "mc-01",
    name: "Centro CNC 01",
    area: "Lavorazioni meccaniche",
    status: "Operativo",
    efficiency: 94,
    nextService: "18 giu",
    output: "128 pz / turno",
  },
  {
    id: "mc-02",
    name: "Linea assemblaggio 02",
    area: "Assemblaggio",
    status: "Attenzione",
    efficiency: 78,
    nextService: "Oggi",
    output: "82 pz / turno",
  },
  {
    id: "mc-03",
    name: "Banco collaudo 03",
    area: "Controllo qualità",
    status: "Operativo",
    efficiency: 91,
    nextService: "26 giu",
    output: "56 test / turno",
  },
  {
    id: "mc-04",
    name: "Robot saldatura 01",
    area: "Produzione",
    status: "Manutenzione",
    efficiency: 0,
    nextService: "In corso",
    output: "—",
  },
];

const initialActivities: FactoryActivity[] = [
  {
    id: "activity-1",
    title: "Piano di produzione aggiornato",
    detail: "PR-2481 è in lavorazione presso Assemblaggio 01.",
    time: "18 min fa",
    tone: "info",
  },
  {
    id: "activity-2",
    title: "Controllo qualità pianificato",
    detail: "PR-2480 è pronta per la verifica finale.",
    time: "42 min fa",
    tone: "success",
  },
];

const sectionItems = [
  { id: "production", label: "Produzione", icon: Factory },
  { id: "orders", label: "Ordini", icon: ClipboardList },
  { id: "inventory", label: "Magazzino", icon: Archive },
  { id: "machines", label: "Macchinari", icon: Settings2 },
  { id: "kpi", label: "KPI", icon: BarChart3 },
];

const productionStatuses: ProductionStatus[] = [
  "Pianificato",
  "In lavorazione",
  "Controllo qualità",
  "Pronto",
];

function cloneInitialOrders() {
  return initialOrders.map((order) => ({ ...order }));
}

function cloneInitialInventory() {
  return initialInventory.map((item) => ({ ...item }));
}

function cloneInitialMachines() {
  return initialMachines.map((machine) => ({ ...machine }));
}

function cloneInitialActivities() {
  return initialActivities.map((activity) => ({ ...activity }));
}

export default function FactoryDemo({ branding }: { branding: DemoBranding }) {
  const [section, setSection] = useState<FactorySection>("production");
  const [orders, setOrders] = useState<ProductionOrder[]>(cloneInitialOrders);
  const [inventory, setInventory] = useState<InventoryItem[]>(
    cloneInitialInventory,
  );
  const [machines, setMachines] = useState<Machine[]>(cloneInitialMachines);
  const [activities, setActivities] = useState<FactoryActivity[]>(
    cloneInitialActivities,
  );
  const [selectedOrderId, setSelectedOrderId] = useState("ord-2481");
  const [selectedMachineId, setSelectedMachineId] = useState<string | null>(
    null,
  );
  const [productionFilter, setProductionFilter] = useState<
    "Tutti" | ProductionStatus
  >("Tutti");
  const [orderFilter, setOrderFilter] = useState<"Tutti" | ProductionStatus>(
    "Tutti",
  );
  const [stockFilter, setStockFilter] = useState<"Tutti" | "Sotto scorta">(
    "Tutti",
  );
  const [toasts, setToasts] = useState<DemoToast[]>([]);
  const [pendingAction, setPendingAction] = useState<string | null>(null);
  const [lastKpiRefresh, setLastKpiRefresh] = useState("all'apertura");
  const toastIdRef = useRef(1);
  const orderSequenceRef = useRef(2482);
  const activitySequenceRef = useRef(3);
  const actionTimersRef = useRef<Set<number>>(new Set());

  useEffect(
    () => () => {
      actionTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      actionTimersRef.current.clear();
    },
    [],
  );

  const brandForeground = getBrandForeground(branding.brandColor);

  const selectedOrder =
    orders.find((order) => order.id === selectedOrderId) ?? orders[0];
  const selectedMachine =
    machines.find((machine) => machine.id === selectedMachineId) ?? null;
  const lowStockItems = inventory.filter(
    (item) => item.stock <= item.reorderAt,
  );
  const filteredProduction = orders.filter(
    (order) =>
      productionFilter === "Tutti" || order.status === productionFilter,
  );
  const filteredOrders = orders.filter(
    (order) => orderFilter === "Tutti" || order.status === orderFilter,
  );
  const filteredInventory = inventory.filter(
    (item) => stockFilter === "Tutti" || item.stock <= item.reorderAt,
  );
  const activeMachines = machines.filter(
    (machine) => machine.status === "Operativo",
  ).length;
  const machinesInMaintenance = machines.filter(
    (machine) => machine.status === "Manutenzione",
  ).length;
  const machinesNeedingAttention = machines.filter(
    (machine) => machine.status === "Attenzione",
  ).length;
  const operationalMachines = machines.filter(
    (machine) => machine.status !== "Manutenzione",
  );
  const averageEfficiency = operationalMachines.length
    ? Math.round(
        operationalMachines.reduce(
          (sum, machine) => sum + machine.efficiency,
          0,
        ) / operationalMachines.length,
      )
    : 0;
  const activeOrders = orders.filter((order) => order.status !== "Pronto");
  const ordersInProgress = orders.filter(
    (order) => order.status === "In lavorazione",
  );
  const highPriorityOrders = activeOrders.filter(
    (order) => order.priority === "Alta",
  );
  const readyOrders = orders.filter((order) => order.status === "Pronto");
  const totalQuantity = orders.reduce((sum, order) => sum + order.quantity, 0);
  const totalCompleted = orders.reduce(
    (sum, order) => sum + order.completed,
    0,
  );
  const completionRate = totalQuantity
    ? Math.round((totalCompleted / totalQuantity) * 100)
    : 0;
  const navItems = useMemo(
    () =>
      sectionItems.map((item) => ({
        ...item,
        badge:
          item.id === "orders"
            ? activeOrders.length || undefined
            : item.id === "inventory"
              ? lowStockItems.length || undefined
              : undefined,
      })),
    [activeOrders.length, lowStockItems.length],
  );

  const kpiSeries = useMemo(
    () => [
      Math.max(42, averageEfficiency - 12),
      Math.max(42, averageEfficiency - 6),
      Math.max(42, averageEfficiency - 9),
      Math.max(42, averageEfficiency - 2),
      Math.max(42, averageEfficiency - 5),
      Math.max(42, averageEfficiency + Math.min(5, completionRate / 25)),
      averageEfficiency,
    ],
    [averageEfficiency, completionRate],
  );

  function showToast(
    title: string,
    description?: string,
    tone: DemoToast["tone"] = "info",
  ) {
    const id = toastIdRef.current++;
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
    tone: FactoryActivity["tone"] = "info",
  ) {
    const id = `activity-${activitySequenceRef.current++}`;
    setActivities((current) =>
      [{ id, title, detail, time: "Adesso", tone }, ...current].slice(0, 5),
    );
  }

  function advanceOrder(orderId: string) {
    const order = orders.find((item) => item.id === orderId);
    if (!order || pendingAction) return;
    const position = productionStatuses.indexOf(order.status);
    const nextStatus =
      productionStatuses[Math.min(position + 1, productionStatuses.length - 1)];
    if (nextStatus === order.status) {
      showToast(
        "Lavorazione completata",
        `${order.code} è pronta per la spedizione.`,
        "success",
      );
      return;
    }

    setPendingAction(`order:${orderId}`);
    scheduleAction(() => {
      setOrders((current) =>
        current.map((item) =>
          item.id === orderId
            ? {
                ...item,
                status: nextStatus,
                completed:
                  nextStatus === "Pianificato"
                    ? 0
                    : nextStatus === "In lavorazione"
                      ? Math.max(
                          item.completed,
                          Math.round(item.quantity * 0.55),
                        )
                      : item.quantity,
              }
            : item,
        ),
      );
      addActivity(
        "Lavorazione aggiornata",
        `${order.code}: avanzata a ${nextStatus.toLowerCase()}.`,
        "success",
      );
      setPendingAction(null);
      showToast("Stato aggiornato", `${order.code}: ${nextStatus}.`, "success");
    }, 500);
  }

  function updateOrderStatus(orderId: string, status: ProductionStatus) {
    const order = orders.find((item) => item.id === orderId);
    if (!order || status === order.status || pendingAction) return;
    setPendingAction(`order:${orderId}`);
    scheduleAction(() => {
      setOrders((current) =>
        current.map((item) =>
          item.id === orderId
            ? {
                ...item,
                status,
                completed:
                  status === "Pianificato"
                    ? 0
                    : status === "In lavorazione"
                      ? Math.max(
                          item.completed,
                          Math.round(item.quantity * 0.55),
                        )
                      : item.quantity,
              }
            : item,
        ),
      );
      addActivity(
        "Pianificazione aggiornata",
        `${order.code} è ora ${status.toLowerCase()}.`,
        "success",
      );
      setPendingAction(null);
      showToast(
        "Pianificazione aggiornata",
        `${order.code} è ora ${status.toLowerCase()}.`,
        "success",
      );
    }, 360);
  }

  function registerInventoryMovement(itemId: string) {
    const item = inventory.find((entry) => entry.id === itemId);
    if (!item || pendingAction) return;

    setPendingAction(`inventory:${itemId}`);
    scheduleAction(() => {
      setInventory((current) =>
        current.map((entry) =>
          entry.id === itemId ? { ...entry, stock: entry.stock + 40 } : entry,
        ),
      );
      addActivity(
        "Carico di magazzino registrato",
        `${item.name}: +40 ${item.unit} nella posizione ${item.location}.`,
        "success",
      );
      setPendingAction(null);
      showToast(
        "Carico registrato",
        `${item.name}: da ${item.stock} a ${item.stock + 40} ${item.unit}.`,
        "success",
      );
    }, 420);
  }

  function updateMachineStatus(machineId: string, closeAfterUpdate = false) {
    const machine = machines.find((item) => item.id === machineId);
    if (!machine || pendingAction) return;
    const nextStatus: MachineStatus =
      machine.status === "Operativo" ? "Manutenzione" : "Operativo";
    setPendingAction(`machine:${machineId}`);
    scheduleAction(() => {
      setMachines((current) =>
        current.map((item) =>
          item.id === machineId
            ? {
                ...item,
                status: nextStatus,
                efficiency:
                  nextStatus === "Operativo"
                    ? Math.max(item.efficiency, 89)
                    : 0,
                nextService: nextStatus === "Operativo" ? "26 giu" : "In corso",
              }
            : item,
        ),
      );
      if (closeAfterUpdate) setSelectedMachineId(null);
      addActivity(
        nextStatus === "Operativo"
          ? "Macchinario riattivato"
          : "Manutenzione pianificata",
        `${machine.name}: stato ${nextStatus.toLowerCase()}.`,
        nextStatus === "Operativo" ? "success" : "warning",
      );
      setPendingAction(null);
      showToast(
        nextStatus === "Operativo"
          ? "Macchinario riattivato"
          : "Manutenzione pianificata",
        machine.name,
        nextStatus === "Operativo" ? "success" : "warning",
      );
    }, 500);
  }

  function createDemoOrder() {
    if (pendingAction) return;

    const sequence = orderSequenceRef.current++;
    const newOrder: ProductionOrder = {
      id: `ord-${sequence}`,
      code: `PR-${sequence}`,
      product: `Lotto demo ${branding.companyName}`,
      department: "Pianificazione",
      quantity: 320,
      completed: 0,
      dueDate: "18 giu",
      status: "Pianificato",
      priority: "Normale",
    };

    setPendingAction("new-order");
    scheduleAction(() => {
      setOrders((current) => [newOrder, ...current]);
      setSelectedOrderId(newOrder.id);
      setSection("orders");
      addActivity(
        "Nuovo ordine pianificato",
        `${newOrder.code}: ${newOrder.quantity} pz in attesa di lavorazione.`,
        "success",
      );
      setPendingAction(null);
      showToast(
        "Ordine creato",
        `${newOrder.code} è stato aggiunto alla pianificazione demo.`,
        "success",
      );
    }, 420);
  }

  function refreshKpis() {
    if (pendingAction) return;

    setPendingAction("kpi-refresh");
    scheduleAction(() => {
      setLastKpiRefresh("ora");
      addActivity(
        "KPI ricalcolati",
        `Indicatori aggiornati su ${orders.length} ordini e ${machines.length} macchinari demo.`,
        "info",
      );
      setPendingAction(null);
      showToast(
        "KPI ricalcolati",
        `Indicatori aggiornati su ${orders.length} ordini e ${machines.length} macchinari demo.`,
        "success",
      );
    }, 420);
  }

  function resetDemo() {
    actionTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    actionTimersRef.current.clear();
    setPendingAction(null);

    setOrders(cloneInitialOrders());
    setInventory(cloneInitialInventory());
    setMachines(cloneInitialMachines());
    setActivities(cloneInitialActivities());
    setSelectedOrderId("ord-2481");
    setSelectedMachineId(null);
    setProductionFilter("Tutti");
    setOrderFilter("Tutti");
    setStockFilter("Tutti");
    setSection("production");
    setLastKpiRefresh("all'apertura");
    setToasts([]);
    orderSequenceRef.current = 2482;
    activitySequenceRef.current = 3;
    toastIdRef.current = 1;
    showToast(
      "Demo ripristinata",
      "Ordini, scorte e macchinari sono tornati allo stato iniziale.",
      "info",
    );
  }

  const actions = (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={Boolean(pendingAction)}
        onClick={refreshKpis}
        className="hidden h-8 items-center gap-1.5 rounded-md border border-current/15 px-2.5 text-[10px] font-medium opacity-70 transition hover:opacity-100 disabled:cursor-wait disabled:opacity-45 sm:inline-flex"
      >
        {pendingAction === "kpi-refresh" ? (
          <LoaderCircle className="size-3 animate-spin" />
        ) : (
          <RefreshCw className="size-3" />
        )}{" "}
        Aggiorna
      </button>
      <button
        type="button"
        disabled={Boolean(pendingAction)}
        onClick={createDemoOrder}
        className="inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-[10px] font-semibold text-[#111213] disabled:cursor-wait disabled:opacity-65"
        style={{ backgroundColor: branding.brandColor, color: brandForeground }}
      >
        {pendingAction === "new-order" ? (
          <LoaderCircle className="size-3 animate-spin" />
        ) : (
          <Plus className="size-3" />
        )}{" "}
        Nuovo ordine
      </button>
    </div>
  );

  return (
    <>
      <DemoAppShell
        branding={branding}
        title="Factory"
        subtitle="Operations cockpit · demo interattiva"
        navItems={navItems}
        activeSection={section}
        onSectionChange={(next) => setSection(next as FactorySection)}
        actions={actions}
        onReset={resetDemo}
      >
        {section === "production" && (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <DemoKpiCard
                label="OEE medio"
                value={`${averageEfficiency}%`}
                detail={`${operationalMachines.length} linee monitorate`}
                icon={Gauge}
                onClick={() => setSection("kpi")}
              />
              <DemoKpiCard
                label="Ordini aperti"
                value={String(activeOrders.length)}
                detail={`${ordersInProgress.length} in lavorazione`}
                icon={ClipboardList}
                onClick={() => setSection("orders")}
              />
              <DemoKpiCard
                label="Macchinari attivi"
                value={`${activeMachines}/${machines.length}`}
                detail={`${machinesInMaintenance} in manutenzione`}
                icon={Settings2}
                onClick={() => setSection("machines")}
              />
              <DemoKpiCard
                label="Alert scorte"
                value={String(lowStockItems.length)}
                detail={
                  lowStockItems.length
                    ? "Richiedono attenzione"
                    : "Scorte sopra soglia"
                }
                icon={AlertTriangle}
                onClick={() => setSection("inventory")}
              />
            </div>

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_290px]">
              <section className="rounded-xl border border-current/10 bg-white/[0.035]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-current/10 px-4 py-3">
                  <div>
                    <p className="text-[12px] font-semibold">
                      Piano di produzione · {branding.companyName}
                    </p>
                    <p className="mt-0.5 text-[10px] opacity-55">
                      Clicca una lavorazione per consultarne lo stato.
                    </p>
                  </div>
                  <label className="flex items-center gap-2 rounded-md border border-current/12 px-2.5 py-1.5 text-[10px] opacity-70">
                    <SlidersHorizontal className="size-3" />
                    <select
                      value={productionFilter}
                      disabled={Boolean(pendingAction)}
                      onChange={(event) =>
                        setProductionFilter(
                          event.target.value as "Tutti" | ProductionStatus,
                        )
                      }
                      className="bg-transparent outline-none"
                      aria-label="Filtra produzione"
                    >
                      <option className="bg-[#171819] text-white">Tutti</option>
                      {productionStatuses.map((status) => (
                        <option
                          key={status}
                          className="bg-[#171819] text-white"
                        >
                          {status}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="grid gap-2 p-3 sm:grid-cols-2">
                  {filteredProduction.map((order) => {
                    const progress = Math.round(
                      (order.completed / order.quantity) * 100,
                    );
                    const selected = selectedOrderId === order.id;
                    return (
                      <button
                        key={order.id}
                        type="button"
                        onClick={() => setSelectedOrderId(order.id)}
                        className={`rounded-lg border p-3 text-left transition hover:-translate-y-0.5 hover:bg-white/[0.075] ${selected ? "border-current bg-white/[0.09]" : "border-current/10 bg-black/[0.05]"}`}
                        style={
                          selected
                            ? {
                                borderColor: branding.brandColor,
                                boxShadow: `0 0 0 1px ${branding.brandColor}38`,
                              }
                            : undefined
                        }
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-[10px] font-semibold">
                              {order.code}
                            </p>
                            <p className="mt-1 text-[10px] opacity-60">
                              {order.product}
                            </p>
                          </div>
                          <StatusPill status={order.status} />
                        </div>
                        <div className="mt-4 flex items-center justify-between text-[9px] opacity-55">
                          <span>{order.department}</span>
                          <span>
                            {order.completed}/{order.quantity} pz
                          </span>
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-current/10">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${progress}%`,
                              backgroundColor: branding.brandColor,
                            }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              <aside className="rounded-xl border border-current/10 bg-black/[0.08] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold">
                      Lavorazione selezionata
                    </p>
                    <p className="mt-0.5 text-[9px] opacity-55">
                      Aggiornamento solo nello stato demo.
                    </p>
                  </div>
                  {selectedOrder && (
                    <StatusPill status={selectedOrder.status} />
                  )}
                </div>
                {selectedOrder && (
                  <>
                    <div className="mt-5 rounded-lg border border-current/10 bg-white/[0.04] p-3">
                      <p className="text-[10px] font-semibold">
                        {selectedOrder.code}
                      </p>
                      <p className="mt-1 text-[11px] font-medium">
                        {selectedOrder.product}
                      </p>
                      <p className="mt-2 text-[9px] opacity-55">
                        Reparto: {selectedOrder.department} · Scadenza:{" "}
                        {selectedOrder.dueDate}
                      </p>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-[10px]">
                      <div className="rounded-md border border-current/10 p-2.5">
                        <p className="opacity-50">Quantità</p>
                        <p className="mt-1 font-semibold">
                          {selectedOrder.quantity} pz
                        </p>
                      </div>
                      <div className="rounded-md border border-current/10 p-2.5">
                        <p className="opacity-50">Completati</p>
                        <p className="mt-1 font-semibold">
                          {selectedOrder.completed} pz
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      disabled={Boolean(pendingAction)}
                      onClick={() => advanceOrder(selectedOrder.id)}
                      className="mt-4 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-md text-[10px] font-semibold text-[#111213] disabled:opacity-60"
                      style={{
                        backgroundColor: branding.brandColor,
                        color: brandForeground,
                      }}
                    >
                      {pendingAction === `order:${selectedOrder.id}` ? (
                        <LoaderCircle className="size-3 animate-spin" />
                      ) : (
                        <ArrowRight className="size-3" />
                      )}
                      {pendingAction === `order:${selectedOrder.id}`
                        ? "Aggiornamento"
                        : selectedOrder.status === "Pronto"
                          ? "Già pronta"
                          : "Avanza lavorazione"}
                    </button>
                  </>
                )}
              </aside>
            </div>

            <section className="rounded-xl border border-current/10 bg-white/[0.035] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[12px] font-semibold">Attività recenti</p>
                  <p className="mt-0.5 text-[10px] opacity-55">
                    Ogni operazione della demo aggiorna questo storico locale.
                  </p>
                </div>
                <span className="text-[9px] font-medium uppercase tracking-[0.12em] opacity-45">
                  {activities.length} eventi
                </span>
              </div>
              <div className="mt-3 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                {activities.slice(0, 3).map((activity) => (
                  <article
                    key={activity.id}
                    className="rounded-lg border border-current/8 bg-black/[0.04] p-3"
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

            {lowStockItems.length > 0 && (
              <button
                type="button"
                onClick={() => setSection("inventory")}
                className="flex w-full items-center justify-between gap-3 rounded-xl border border-[#8d939b]/40 bg-[#8d939b]/[0.10] px-4 py-3 text-left transition hover:bg-[#8d939b]/[0.16]"
              >
                <span className="flex items-center gap-2 text-[10px]">
                  <AlertTriangle
                    className="size-3.5"
                    style={{ color: branding.brandColor }}
                  />{" "}
                  <span>
                    <strong className="font-semibold">
                      {lowStockItems.length} alert di magazzino.
                    </strong>{" "}
                    Alcuni materiali sono sotto la soglia di riordino.
                  </span>
                </span>
                <ArrowRight className="size-3.5 opacity-55" />
              </button>
            )}
          </div>
        )}

        {section === "orders" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[13px] font-semibold">
                  Ordini di produzione
                </p>
                <p className="mt-1 text-[10px] opacity-60">
                  Ogni modifica simula un&apos;operazione nel gestionale.
                </p>
              </div>
              <select
                value={orderFilter}
                disabled={Boolean(pendingAction)}
                onChange={(event) =>
                  setOrderFilter(
                    event.target.value as "Tutti" | ProductionStatus,
                  )
                }
                className="h-8 rounded-md border border-current/12 bg-transparent px-2 text-[10px] outline-none"
                aria-label="Filtra ordini"
              >
                <option className="bg-[#171819] text-white">Tutti</option>
                {productionStatuses.map((status) => (
                  <option key={status} className="bg-[#171819] text-white">
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <DemoTable
              rows={filteredOrders}
              selectedRowId={selectedOrderId}
              onRowClick={(order) => {
                setSelectedOrderId(order.id);
                showToast(
                  "Ordine selezionato",
                  `${order.code} · ${order.product}`,
                  "info",
                );
              }}
              columns={[
                {
                  id: "code",
                  label: "Ordine",
                  cell: (order) => (
                    <div>
                      <p className="font-medium">{order.code}</p>
                      <p className="mt-0.5 text-[9px] opacity-50">
                        {order.product}
                      </p>
                    </div>
                  ),
                },
                {
                  id: "department",
                  label: "Reparto",
                  hideOnMobile: true,
                  cell: (order) => order.department,
                },
                {
                  id: "progress",
                  label: "Avanzamento",
                  cell: (order) => (
                    <span>
                      {order.completed}/{order.quantity}
                    </span>
                  ),
                },
                {
                  id: "status",
                  label: "Stato",
                  cell: (order) => (
                    <select
                      aria-label={`Aggiorna stato ${order.code}`}
                      value={order.status}
                      disabled={Boolean(pendingAction)}
                      onClick={(event) => event.stopPropagation()}
                      onChange={(event) =>
                        updateOrderStatus(
                          order.id,
                          event.target.value as ProductionStatus,
                        )
                      }
                      className="rounded-md border border-current/15 bg-transparent px-2 py-1 text-[9px] outline-none"
                    >
                      {productionStatuses.map((status) => (
                        <option
                          key={status}
                          className="bg-[#171819] text-white"
                        >
                          {status}
                        </option>
                      ))}
                    </select>
                  ),
                },
              ]}
            />
          </div>
        )}

        {section === "inventory" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[13px] font-semibold">Magazzino e scorte</p>
                <p className="mt-1 text-[10px] opacity-60">
                  Scorte dimostrative, posizioni e soglie di riordino.
                </p>
              </div>
              <div className="flex rounded-md border border-current/12 p-0.5 text-[10px]">
                {(["Tutti", "Sotto scorta"] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    disabled={Boolean(pendingAction)}
                    onClick={() => setStockFilter(filter)}
                    className={`rounded px-2.5 py-1.5 transition ${stockFilter === filter ? "bg-white/[0.12] font-medium" : "opacity-55 hover:opacity-100"}`}
                    style={
                      stockFilter === filter
                        ? { color: branding.brandColor }
                        : undefined
                    }
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {filteredInventory.map((item) => {
                const isLow = item.stock <= item.reorderAt;
                return (
                  <article
                    key={item.id}
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
                        <PackageOpen className="size-4" />
                      </span>
                      <DemoStatusPill
                        label={isLow ? "Sotto scorta" : "Disponibile"}
                        tone={isLow ? "warning" : "success"}
                        dot
                      />
                    </div>
                    <h3 className="mt-4 text-[11px] font-semibold">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-[9px] opacity-55">
                      {item.sku} · Posizione {item.location}
                    </p>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <p className="text-[9px] opacity-50">Giacenza</p>
                        <p className="mt-1 text-[18px] font-semibold tracking-tight">
                          {item.stock}{" "}
                          <span className="text-[10px] opacity-55">
                            {item.unit}
                          </span>
                        </p>
                      </div>
                      <p className="text-right text-[9px] opacity-50">
                        Soglia
                        <br />
                        {item.reorderAt} {item.unit}
                      </p>
                    </div>
                    <button
                      type="button"
                      disabled={Boolean(pendingAction)}
                      onClick={() => registerInventoryMovement(item.id)}
                      className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-semibold transition hover:opacity-65 disabled:cursor-wait disabled:opacity-45"
                      style={{ color: branding.brandColor }}
                    >
                      {pendingAction === `inventory:${item.id}` ? (
                        <LoaderCircle className="size-3 animate-spin" />
                      ) : (
                        <Plus className="size-3" />
                      )}{" "}
                      {pendingAction === `inventory:${item.id}`
                        ? "Registrazione"
                        : "Registra carico demo"}
                    </button>
                  </article>
                );
              })}
              {filteredInventory.length === 0 && (
                <div className="rounded-xl border border-dashed border-current/14 p-6 text-center text-[10px] opacity-60">
                  Nessun materiale richiede un riordino in questa demo.
                </div>
              )}
            </div>
          </div>
        )}

        {section === "machines" && (
          <div>
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[13px] font-semibold">Stato macchinari</p>
                <p className="mt-1 text-[10px] opacity-60">
                  Apri un macchinario per consultarne i dettagli e simulare un
                  intervento.
                </p>
              </div>
              <DemoStatusPill
                label={
                  machinesNeedingAttention
                    ? `${machinesNeedingAttention} da verificare`
                    : `${activeMachines} operativi`
                }
                tone={machinesNeedingAttention ? "warning" : "success"}
                dot
              />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {machines.map((machine) => (
                <button
                  key={machine.id}
                  type="button"
                  disabled={Boolean(pendingAction)}
                  onClick={() => setSelectedMachineId(machine.id)}
                  className={`rounded-xl border p-4 text-left transition hover:-translate-y-0.5 hover:bg-white/[0.065] disabled:cursor-wait disabled:opacity-55 ${selectedMachineId === machine.id ? "border-current bg-white/[0.08]" : "border-current/10 bg-white/[0.035]"}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className="flex size-9 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: `${branding.brandColor}20`,
                        color: branding.brandColor,
                      }}
                    >
                      <Settings2 className="size-4" />
                    </span>
                    <MachinePill status={machine.status} />
                  </div>
                  <h3 className="mt-5 text-[12px] font-semibold">
                    {machine.name}
                  </h3>
                  <p className="mt-1 text-[10px] opacity-55">{machine.area}</p>
                  <div className="mt-4 flex items-center justify-between text-[10px]">
                    <span>Efficienza</span>
                    <span className="font-semibold">{machine.efficiency}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-current/10">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${machine.efficiency}%`,
                        backgroundColor: branding.brandColor,
                      }}
                    />
                  </div>
                  <div className="mt-3 flex justify-between text-[9px] opacity-50">
                    <span>{machine.output}</span>
                    <span>Intervento: {machine.nextService}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {section === "kpi" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[13px] font-semibold">KPI industriali</p>
                <p className="mt-1 text-[10px] opacity-60">
                  Valori calcolati sui dati locali di ordini, scorte e
                  macchinari.
                </p>
              </div>
              <button
                type="button"
                disabled={Boolean(pendingAction)}
                onClick={refreshKpis}
                className="inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-[10px] font-semibold text-[#111213] disabled:cursor-wait disabled:opacity-65"
                style={{
                  backgroundColor: branding.brandColor,
                  color: brandForeground,
                }}
              >
                {pendingAction === "kpi-refresh" ? (
                  <LoaderCircle className="size-3 animate-spin" />
                ) : (
                  <RefreshCw className="size-3" />
                )}{" "}
                Ricalcola KPI
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <DemoKpiCard
                label="OEE"
                value={`${averageEfficiency}%`}
                detail={`${operationalMachines.length} linee attive`}
                icon={Gauge}
              />
              <DemoKpiCard
                label="Pezzi completati"
                value={totalCompleted.toLocaleString("it-IT")}
                detail={`su ${totalQuantity.toLocaleString("it-IT")} pianificati`}
                icon={PackageCheck}
              />
              <DemoKpiCard
                label="Avanzamento"
                value={`${completionRate}%`}
                detail={`${ordersInProgress.length} ordini in lavorazione`}
                icon={Truck}
              />
              <DemoKpiCard
                label="Ordini pronti"
                value={String(readyOrders.length)}
                detail={`${highPriorityOrders.length} prioritari ancora aperti`}
                icon={CheckCircle2}
              />
            </div>
            <section className="rounded-xl border border-current/10 bg-white/[0.035] p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[12px] font-semibold">
                    Efficienza di linea
                  </p>
                  <p className="mt-1 text-[10px] opacity-55">
                    Serie dimostrativa aggiornata {lastKpiRefresh} sui dati
                    della demo.
                  </p>
                </div>
                <DemoStatusPill
                  label={
                    averageEfficiency >= 90 ? "Sopra target" : "Da monitorare"
                  }
                  tone={averageEfficiency >= 90 ? "success" : "warning"}
                  dot
                />
              </div>
              <div className="mt-8 flex h-48 items-end gap-2 sm:gap-3">
                {kpiSeries.map((value, index) => (
                  <div
                    key={`${value}-${index}`}
                    className="group flex flex-1 flex-col justify-end"
                  >
                    <div
                      className="relative rounded-t-md transition-all duration-500 group-hover:opacity-75"
                      style={{
                        height: `${value}%`,
                        backgroundColor: branding.brandColor,
                      }}
                    >
                      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] opacity-0 transition group-hover:opacity-70">
                        {Math.round(value)}%
                      </span>
                    </div>
                    <span className="mt-2 text-center text-[9px] opacity-45">
                      T{index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </DemoAppShell>

      <DemoModal
        open={Boolean(selectedMachine)}
        onClose={() => setSelectedMachineId(null)}
        title={selectedMachine?.name ?? "Macchinario"}
        description="Dettaglio dimostrativo del macchinario selezionato."
        size="md"
        footer={
          selectedMachine ? (
            <button
              type="button"
              disabled={Boolean(pendingAction)}
              onClick={() => updateMachineStatus(selectedMachine.id, true)}
              className="inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-[10px] font-semibold text-[#111213] disabled:cursor-wait disabled:opacity-65"
              style={{
                backgroundColor: branding.brandColor,
                color: brandForeground,
              }}
            >
              {pendingAction === `machine:${selectedMachine.id}` ? (
                <LoaderCircle className="size-3 animate-spin" />
              ) : (
                <Wrench className="size-3" />
              )}
              {pendingAction === `machine:${selectedMachine.id}`
                ? "Aggiornamento"
                : selectedMachine.status === "Operativo"
                  ? "Pianifica manutenzione"
                  : "Segna operativo"}
            </button>
          ) : undefined
        }
      >
        {selectedMachine && (
          <div className="space-y-4 text-[11px]">
            <div className="grid grid-cols-2 gap-2">
              <InfoTile label="Area" value={selectedMachine.area} />
              <InfoTile label="Output" value={selectedMachine.output} />
              <InfoTile
                label="Efficienza"
                value={`${selectedMachine.efficiency}%`}
              />
              <InfoTile
                label="Prossimo intervento"
                value={selectedMachine.nextService}
              />
            </div>
            <div className="rounded-lg border border-current/10 bg-black/[0.05] p-3 text-[10px] leading-5 opacity-65">
              Questa vista mostra il tipo di informazioni operative che potremmo
              integrare con i processi, le macchine e l&apos;ERP della tua
              azienda.
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
    </>
  );
}

function StatusPill({ status }: { status: ProductionStatus }) {
  if (status === "Pronto")
    return <DemoStatusPill label="Pronto" tone="success" dot />;
  if (status === "Controllo qualità")
    return <DemoStatusPill label="Controllo qualità" tone="running" dot />;
  if (status === "In lavorazione")
    return <DemoStatusPill label="In lavorazione" tone="running" dot />;
  return <DemoStatusPill label="Pianificato" tone="neutral" dot />;
}

function MachinePill({ status }: { status: MachineStatus }) {
  if (status === "Operativo")
    return <DemoStatusPill label="Operativo" tone="success" dot />;
  if (status === "Attenzione")
    return <DemoStatusPill label="Attenzione" tone="warning" dot />;
  return <DemoStatusPill label="Manutenzione" tone="error" dot />;
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-current/10 bg-black/[0.05] p-3">
      <p className="text-[9px] opacity-50">{label}</p>
      <p className="mt-1 text-[10px] font-medium">{value}</p>
    </div>
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
