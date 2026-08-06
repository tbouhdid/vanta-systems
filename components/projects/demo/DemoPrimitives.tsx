"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import type { CSSProperties, KeyboardEvent, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  CheckCircle2,
  CircleAlert,
  Info,
  RotateCcw,
  X,
} from "lucide-react";

import type { DemoBranding, DemoToast } from "./types";
import { demoViewportLayers } from "./layers";

const subscribeToViewport = () => () => undefined;
const getViewportSnapshot = () => true;
const getServerViewportSnapshot = () => false;

type DemoNavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string | number;
};

const themeClasses = {
  dark: {
    frame: "bg-[#111213] text-[#f4f4f1]",
    header: "border-white/[0.09] bg-[#18191a]",
    sidebar: "border-white/[0.09] bg-[#0d0e0f]",
    muted: "text-white/48",
    inverse: "#111213",
  },
  titanium: {
    frame:
      "bg-[linear-gradient(140deg,#c8ccd1_0%,#969ca4_100%)] text-[#171819]",
    header: "border-white/45 bg-[#e2e4e6]/75",
    sidebar: "border-white/40 bg-[#a8adb4]/58",
    muted: "text-[#454a50]",
    inverse: "#f8f8f6",
  },
  light: {
    frame: "bg-[#f0f1ef] text-[#171819]",
    header: "border-[#d4d7da] bg-[#fafaf8]",
    sidebar: "border-[#d4d7da] bg-[#e3e5e3]",
    muted: "text-[#686c70]",
    inverse: "#f8f8f6",
  },
  midnight: {
    frame: "bg-[#080909] text-[#f3f3f0]",
    header: "border-white/[0.08] bg-[#111213]",
    sidebar: "border-white/[0.08] bg-[#0b0c0d]",
    muted: "text-white/45",
    inverse: "#111213",
  },
} as const;

export function DemoAppShell({
  branding,
  title,
  subtitle,
  navItems,
  activeSection,
  onSectionChange,
  children,
  actions,
  onReset,
  className,
}: {
  branding: DemoBranding;
  title?: string;
  subtitle?: string;
  navItems: DemoNavItem[];
  activeSection: string;
  onSectionChange: (id: string) => void;
  children: ReactNode;
  actions?: ReactNode;
  onReset?: () => void;
  className?: string;
}) {
  const styles = themeClasses[branding.theme];
  const themeLabel = branding.theme[0].toUpperCase() + branding.theme.slice(1);
  const variables = {
    "--demo-brand": branding.brandColor,
    "--demo-inverse": styles.inverse,
  } as CSSProperties;

  return (
    <section
      style={variables}
      className={`overflow-hidden border-y border-white/[0.08] transition-colors duration-500 ${styles.frame} ${className ?? ""}`}
    >
      <header
        className={`flex min-h-16 items-center justify-between gap-3 border-b px-3 py-3 sm:px-5 ${styles.header}`}
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <DemoBrandMark branding={branding} />
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold tracking-[-0.02em]">
              {branding.companyName} · {title ?? branding.productName}
            </p>
            <p className={`mt-0.5 truncate text-[9px] ${styles.muted}`}>
              {subtitle ?? "Demo interattiva"}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span
            className={`hidden rounded-full border border-current/15 px-2.5 py-1 text-[9px] sm:inline-flex ${styles.muted}`}
          >
            {themeLabel}
          </span>
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              title="Ripristina i dati dimostrativi"
              className={`inline-flex size-8 items-center justify-center gap-1.5 rounded-lg border border-current/12 text-[9px] font-medium transition hover:bg-current/[0.07] sm:w-auto sm:px-2.5 ${styles.muted}`}
            >
              <RotateCcw className="size-3" strokeWidth={1.7} />
              <span className="sr-only sm:not-sr-only">Ripristina</span>
            </button>
          )}
          {actions}
        </div>
      </header>

      <div className="border-b border-current/10 px-3 py-2 md:hidden">
        <nav
          aria-label="Navigazione demo"
          className="flex gap-1 overflow-x-auto pb-0.5"
        >
          {navItems.map((item) => (
            <DemoNavButton
              key={item.id}
              item={item}
              active={item.id === activeSection}
              onClick={() => onSectionChange(item.id)}
              compact
            />
          ))}
        </nav>
      </div>

      <div className="flex min-h-[520px]">
        <aside
          className={`hidden w-[186px] shrink-0 flex-col border-r p-3 md:flex ${styles.sidebar}`}
        >
          <p
            className={`px-2 pb-2 pt-1 text-[8px] font-semibold uppercase tracking-[0.18em] ${styles.muted}`}
          >
            Area demo
          </p>
          <nav aria-label="Navigazione demo" className="space-y-1">
            {navItems.map((item) => (
              <DemoNavButton
                key={item.id}
                item={item}
                active={item.id === activeSection}
                onClick={() => onSectionChange(item.id)}
              />
            ))}
          </nav>
          <div
            className={`mt-auto rounded-xl border border-current/10 bg-current/[0.035] p-3 ${styles.muted}`}
          >
            <p className="text-[9px] font-medium">Concept Case Study</p>
            <p className="mt-1 text-[8px] leading-4 opacity-75">
              Dati locali e interazioni dimostrative.
            </p>
          </div>
        </aside>
        <main className="min-w-0 flex-1 overflow-hidden">{children}</main>
      </div>
    </section>
  );
}

function DemoNavButton({
  item,
  active,
  onClick,
  compact = false,
}: {
  item: DemoNavItem;
  active: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      className={`group flex shrink-0 items-center gap-2 rounded-lg text-left text-[10px] font-medium transition duration-200 ${compact ? "px-2.5 py-2" : "w-full px-2.5 py-2.5"} ${active ? "bg-[var(--demo-brand)] text-[#111213] shadow-sm" : "opacity-60 hover:bg-current/[0.07] hover:opacity-100"}`}
    >
      <Icon className="size-3.5 shrink-0" strokeWidth={1.7} />
      <span>{item.label}</span>
      {item.badge !== undefined && (
        <span
          className={`ml-auto rounded-full px-1.5 py-0.5 text-[8px] ${active ? "bg-black/10" : "bg-current/[0.09]"}`}
        >
          {item.badge}
        </span>
      )}
    </button>
  );
}

export function DemoBrandMark({
  branding,
  size = "md",
  className,
}: {
  branding: DemoBranding;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dimensions = {
    sm: "size-7 text-[8px]",
    md: "size-8 text-[9px]",
    lg: "size-10 text-[11px]",
  }[size];
  const initials = branding.companyName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-black/10 font-semibold text-[#111213] shadow-sm ${dimensions} ${className ?? ""}`}
      style={{
        backgroundColor: branding.logoUrl
          ? "rgba(255,255,255,0.92)"
          : branding.brandColor,
        color: branding.logoUrl
          ? "#111213"
          : getBrandForeground(branding.brandColor),
      }}
    >
      {branding.logoUrl ? (
        // A blob preview URL is local to the browser and cannot use next/image.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={branding.logoUrl}
          alt="Logo aziendale caricato"
          className="size-full object-contain p-0.5"
        />
      ) : (
        initials || "V"
      )}
    </span>
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

export function DemoKpiCard({
  label,
  value,
  detail,
  trend,
  icon: Icon,
  onClick,
  className,
}: {
  label: string;
  value: string;
  detail?: string;
  trend?: string;
  icon?: LucideIcon;
  onClick?: () => void;
  className?: string;
}) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-2">
        <p className="text-[9px] font-medium opacity-55">{label}</p>
        {Icon && <Icon className="size-3.5 opacity-45" strokeWidth={1.65} />}
      </div>
      <p className="mt-3 text-[20px] font-semibold tracking-[-0.05em] sm:text-[23px]">
        {value}
      </p>
      <div className="mt-3 flex items-center justify-between gap-2 text-[9px] opacity-55">
        <span className="truncate">{detail}</span>
        {trend && (
          <span className="shrink-0 font-medium opacity-90">{trend}</span>
        )}
      </div>
      <span className="mt-3 block h-px w-8 bg-[var(--demo-brand)] transition-colors duration-500" />
    </>
  );

  const classNames = `min-w-0 rounded-xl border border-current/10 bg-current/[0.035] p-3.5 text-left transition duration-200 ${onClick ? "cursor-pointer hover:-translate-y-0.5 hover:bg-current/[0.07] hover:shadow-md" : ""} ${className ?? ""}`;
  return onClick ? (
    <button type="button" onClick={onClick} className={classNames}>
      {content}
    </button>
  ) : (
    <div className={classNames}>{content}</div>
  );
}

type DemoTableColumn<Row> = {
  id: string;
  label: ReactNode;
  cell: (row: Row, index: number) => ReactNode;
  className?: string;
  hideOnMobile?: boolean;
};

export function DemoTable<Row extends { id: string | number }>({
  rows,
  columns,
  onRowClick,
  emptyMessage = "Nessun elemento disponibile.",
  selectedRowId,
  className,
}: {
  rows: Row[];
  columns: DemoTableColumn<Row>[];
  onRowClick?: (row: Row) => void;
  emptyMessage?: string;
  selectedRowId?: string | number;
  className?: string;
}) {
  function onRowKeyDown(event: KeyboardEvent<HTMLTableRowElement>, row: Row) {
    if (onRowClick && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onRowClick(row);
    }
  }

  return (
    <div
      className={`overflow-x-auto rounded-xl border border-current/10 bg-current/[0.025] ${className ?? ""}`}
    >
      <table className="w-full min-w-[540px] border-collapse text-left">
        <thead className="border-b border-current/10 text-[9px] uppercase tracking-[0.12em] opacity-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.id}
                className={`px-4 py-3 font-medium ${column.hideOnMobile ? "hidden sm:table-cell" : ""} ${column.className ?? ""}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.id}
              role={onRowClick ? "button" : undefined}
              tabIndex={onRowClick ? 0 : undefined}
              onClick={() => onRowClick?.(row)}
              onKeyDown={(event) => onRowKeyDown(event, row)}
              className={`border-b border-current/[0.08] last:border-b-0 transition ${onRowClick ? "cursor-pointer hover:bg-current/[0.055] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[var(--demo-brand)]" : ""} ${selectedRowId === row.id ? "bg-current/[0.07]" : ""}`}
            >
              {columns.map((column) => (
                <td
                  key={column.id}
                  className={`px-4 py-3 ${column.hideOnMobile ? "hidden sm:table-cell" : ""} ${column.className ?? ""}`}
                >
                  {column.cell(row, index)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && (
        <p className="px-4 py-10 text-center text-[11px] opacity-55">
          {emptyMessage}
        </p>
      )}
    </div>
  );
}

export function DemoStatusPill({
  label,
  tone = "neutral",
  dot = false,
}: {
  label: string;
  tone?: "neutral" | "success" | "running" | "warning" | "error";
  dot?: boolean;
}) {
  const tones = {
    neutral: "border-current/12 bg-current/[0.06] text-current/70",
    success: "border-[#809176]/45 bg-[#809176]/15 text-[#789069]",
    running: "border-[#8d939b]/60 bg-[#d6d8dc]/40 text-[#31353a]",
    warning: "border-[#b58a52]/50 bg-[#b58a52]/15 text-[#a67942]",
    error: "border-[#b46d68]/50 bg-[#b46d68]/15 text-[#a95f5a]",
  }[tone];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[8px] font-medium ${tones}`}
    >
      {dot && (
        <span
          className={`size-1.5 rounded-full ${tone === "running" ? "animate-pulse" : ""} bg-current`}
        />
      )}
      {label}
    </span>
  );
}

export function DemoModal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  drawerOnMobile = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  drawerOnMobile?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;
  const widths = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  }[size];
  return (
    <DemoViewportPortal>
      <div
        className={`fixed inset-0 ${demoViewportLayers.modal} flex px-3 py-3 ${drawerOnMobile ? "items-end sm:items-center" : "items-center"}`}
        role="presentation"
      >
        <button
          aria-label="Chiudi finestra"
          type="button"
          onClick={onClose}
          className="absolute inset-0 bg-black/65 backdrop-blur-[2px]"
        />
        <section
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className={`relative mx-auto flex max-h-full w-full flex-col overflow-hidden rounded-2xl border border-white/[0.13] bg-[#171819] text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)] ${widths} ${drawerOnMobile ? "rounded-b-none sm:rounded-2xl" : ""}`}
        >
          <header className="flex items-start justify-between gap-4 border-b border-white/[0.1] px-5 py-4">
            <div>
              <h3 className="text-[15px] font-semibold tracking-[-0.02em]">
                {title}
              </h3>
              {description && (
                <p className="mt-1 text-[10px] leading-5 text-zinc-400">
                  {description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Chiudi"
              className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.12] text-zinc-400 transition hover:bg-white/[0.08] hover:text-white"
            >
              <X className="size-3.5" />
            </button>
          </header>
          <div className="min-h-0 overflow-y-auto p-5 text-[12px] leading-6 text-zinc-200">
            {children}
          </div>
          {footer && (
            <footer className="border-t border-white/[0.1] px-5 py-4">
              {footer}
            </footer>
          )}
        </section>
      </div>
    </DemoViewportPortal>
  );
}

export function DemoToastStack({
  toasts,
  onDismiss,
}: {
  toasts: DemoToast[];
  onDismiss: (id: number) => void;
}) {
  return (
    <DemoViewportPortal>
      <div
        aria-atomic="true"
        aria-live="polite"
        className={`pointer-events-none fixed ${demoViewportLayers.toast} bottom-[calc(5.5rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] flex w-[min(340px,calc(100vw-2rem-env(safe-area-inset-left)-env(safe-area-inset-right)))] max-w-[calc(100vw-2rem)] flex-col-reverse gap-3 sm:bottom-[calc(6.25rem+env(safe-area-inset-bottom))] sm:right-[calc(1.5rem+env(safe-area-inset-right))]`}
      >
        {[...toasts].reverse().map((toast) => (
          <DemoToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </div>
    </DemoViewportPortal>
  );
}

function DemoViewportPortal({ children }: { children: ReactNode }) {
  const isMounted = useSyncExternalStore(
    subscribeToViewport,
    getViewportSnapshot,
    getServerViewportSnapshot,
  );

  return isMounted ? createPortal(children, document.body) : null;
}

function DemoToastItem({
  toast,
  onDismiss,
}: {
  toast: DemoToast;
  onDismiss: (id: number) => void;
}) {
  const dismissRef = useRef(onDismiss);

  useEffect(() => {
    dismissRef.current = onDismiss;
  }, [onDismiss]);

  useEffect(() => {
    const timeout = window.setTimeout(() => dismissRef.current(toast.id), 4200);
    return () => window.clearTimeout(timeout);
  }, [toast.id]);
  const Icon =
    toast.tone === "success"
      ? CheckCircle2
      : toast.tone === "warning"
        ? AlertTriangle
        : toast.tone === "info"
          ? Info
          : CircleAlert;
  return (
    <article className="pointer-events-auto flex gap-3 rounded-xl border border-white/[0.13] bg-[#191a1b]/95 p-3 text-white shadow-[0_14px_32px_rgba(0,0,0,0.3)] backdrop-blur">
      <Icon className="mt-0.5 size-4 shrink-0 text-[#d6d8dc]" />
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium">{toast.title}</p>
        {toast.description && (
          <p className="mt-1 text-[10px] leading-4 text-zinc-400">
            {toast.description}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Chiudi notifica"
        className="text-zinc-500 transition hover:text-white"
      >
        <X className="size-3.5" />
      </button>
    </article>
  );
}
