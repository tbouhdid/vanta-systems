"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, CSSProperties, ReactNode } from "react";
import {
  GitBranch,
  LayoutDashboard,
  Users,
  Workflow,
} from "lucide-react";

import type { ProjectPreview } from "@/types/project";

type MockupTheme = "dark" | "light" | "titanium" | "midnight";

type InteractiveMockupProps = {
  variant: ProjectPreview;
  productName: string;
};

const themeOptions: Array<{ id: MockupTheme; label: string }> = [
  { id: "dark", label: "Dark" },
  { id: "light", label: "Light" },
  { id: "titanium", label: "Titanium" },
  { id: "midnight", label: "Midnight" },
];

const brandPresets = ["#D6D8DC", "#BFC3C9", "#A8ADB4", "#8D939B", "#1A1B1D"];

const themeStyles = {
  dark: {
    frame: "bg-[#101112] text-white",
    header: "border-white/[0.1] bg-[#171819]/90",
    sidebar: "border-white/[0.1] bg-[#151617]",
    surface: "border-white/[0.08] bg-white/[0.035]",
    panel: "border-white/[0.07] bg-[#1a1b1d]",
    muted: "text-white/48",
    strong: "text-white",
    line: "border-white/[0.12]",
    accent: "bg-[#d6d8dc] text-[#111213]",
    accentSoft: "bg-[#d6d8dc]/20 text-[#d6d8dc]",
    selected: "bg-white text-[#111213] shadow-sm",
    control: "text-white/55 hover:bg-white/[0.1] hover:text-white",
    canvas: "bg-[radial-gradient(circle_at_1px_1px,rgba(214,216,220,0.14)_1px,transparent_0)]",
  },
  light: {
    frame: "bg-[#eff0ee] text-[#141516]",
    header: "border-[#d6d8dc] bg-[#fafaf8]/95",
    sidebar: "border-[#d6d8dc] bg-[#e5e6e4]",
    surface: "border-[#d6d8dc] bg-white/75",
    panel: "border-[#d6d8dc] bg-[#f7f7f5]",
    muted: "text-[#74777b]",
    strong: "text-[#141516]",
    line: "border-[#c9cccf]",
    accent: "bg-[#1a1b1d] text-white",
    accentSoft: "bg-[#bfc3c9]/55 text-[#252628]",
    selected: "bg-[#1a1b1d] text-white shadow-sm",
    control: "text-[#606367] hover:bg-black/[0.06] hover:text-[#141516]",
    canvas: "bg-[radial-gradient(circle_at_1px_1px,rgba(17,18,19,0.16)_1px,transparent_0)]",
  },
  titanium: {
    frame: "bg-[linear-gradient(145deg,#bfc3c9_0%,#8d939b_100%)] text-[#151617]",
    header: "border-white/45 bg-[#d6d8dc]/75",
    sidebar: "border-white/40 bg-[#a8adb4]/55",
    surface: "border-white/55 bg-[#eef0f1]/48",
    panel: "border-white/50 bg-[#d6d8dc]/55",
    muted: "text-[#4e5359]",
    strong: "text-[#151617]",
    line: "border-[#737981]/45",
    accent: "bg-[#1c1d1f] text-white",
    accentSoft: "bg-[#1c1d1f]/12 text-[#252628]",
    selected: "bg-[#1c1d1f] text-white shadow-sm",
    control: "text-[#50555b] hover:bg-white/45 hover:text-[#151617]",
    canvas: "bg-[radial-gradient(circle_at_1px_1px,rgba(17,18,19,0.14)_1px,transparent_0)]",
  },
  midnight: {
    frame: "bg-[#070808] text-[#f3f3f1]",
    header: "border-white/[0.09] bg-[#111213]/95",
    sidebar: "border-white/[0.08] bg-[#0c0d0e]",
    surface: "border-white/[0.08] bg-[#151617]/80",
    panel: "border-white/[0.07] bg-[#101112]",
    muted: "text-white/45",
    strong: "text-[#f3f3f1]",
    line: "border-white/[0.1]",
    accent: "bg-[#bfc3c9] text-[#111213]",
    accentSoft: "bg-[#bfc3c9]/15 text-[#d6d8dc]",
    selected: "bg-[#bfc3c9] text-[#111213] shadow-sm",
    control: "text-white/50 hover:bg-white/[0.1] hover:text-white",
    canvas: "bg-[radial-gradient(circle_at_1px_1px,rgba(191,195,201,0.12)_1px,transparent_0)]",
  },
} as const;

const variantLabels: Record<ProjectPreview, string> = {
  crm: "Customer workspace",
  flow: "Automation canvas",
  factory: "Operations cockpit",
  desk: "Client workspace",
};

export default function InteractiveMockup({
  variant,
  productName,
}: InteractiveMockupProps) {
  const [theme, setTheme] = useState<MockupTheme>("titanium");
  const [companyName, setCompanyName] = useState("");
  const [brandColor, setBrandColor] = useState("#BFC3C9");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const styles = themeStyles[theme];
  const displayCompanyName = companyName.trim() || "La tua azienda";

  useEffect(() => {
    return () => {
      if (logoUrl) URL.revokeObjectURL(logoUrl);
    };
  }, [logoUrl]);

  function handleLogoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setLogoUrl(URL.createObjectURL(file));
  }

  return (
    <div className="space-y-5">
      <PersonalizeDemo
        theme={theme}
        onThemeChange={setTheme}
        companyName={companyName}
        onCompanyNameChange={setCompanyName}
        brandColor={brandColor}
        onBrandColorChange={setBrandColor}
        logoUrl={logoUrl}
        onLogoChange={handleLogoChange}
        onLogoReset={() => setLogoUrl(null)}
      />

      <section
        aria-label={`Mockup interattivo di ${productName}`}
        style={{ "--demo-brand": brandColor } as CSSProperties}
        className={`overflow-hidden rounded-2xl border shadow-[0_24px_70px_rgba(0,0,0,0.3)] transition-colors duration-500 ${styles.frame} ${styles.line}`}
      >
        <div className={`flex min-h-14 items-center justify-between gap-3 border-b px-4 py-3 transition-colors duration-500 sm:px-5 ${styles.header} ${styles.line}`}>
          <div className="flex min-w-0 items-center gap-2.5">
            <BrandMark logoUrl={logoUrl} companyName={displayCompanyName} brandColor={brandColor} className="size-7 text-[8px]" />
            <div className="min-w-0">
              <p className={`truncate text-[11px] font-medium ${styles.strong}`}>{displayCompanyName} · {productName}</p>
              <p className={`mt-0.5 text-[9px] ${styles.muted}`}>{variantLabels[variant]}</p>
            </div>
          </div>

          <span className={`rounded-md border px-2 py-1 text-[8px] font-medium transition-colors duration-300 ${styles.surface} ${styles.line} ${styles.muted}`}>
            Theme · {themeOptions.find((option) => option.id === theme)?.label}
          </span>
        </div>

        <div className="flex min-h-[365px] sm:min-h-[448px]">
          <MockSidebar styles={styles} companyName={displayCompanyName} logoUrl={logoUrl} brandColor={brandColor} />
          <div className="min-w-0 flex-1 p-3 transition-colors duration-500 sm:p-5">
            {variant === "crm" && <CrmMock styles={styles} />}
            {variant === "flow" && <FlowMock styles={styles} />}
            {variant === "factory" && <FactoryMock styles={styles} />}
            {variant === "desk" && <DeskMock styles={styles} />}
          </div>
        </div>
      </section>
    </div>
  );
}

type StyleSet = (typeof themeStyles)[MockupTheme];

function MockSidebar({
  styles,
  companyName,
  logoUrl,
  brandColor,
}: {
  styles: StyleSet;
  companyName: string;
  logoUrl: string | null;
  brandColor: string;
}) {
  const items = ["Dashboard", "Overview", "Analytics", "Progetti", "Clienti", "Impostazioni"];

  return (
    <aside className={`hidden w-[116px] shrink-0 flex-col border-r p-4 transition-colors duration-500 sm:flex ${styles.sidebar} ${styles.line}`}>
      <BrandMark logoUrl={logoUrl} companyName={companyName} brandColor={brandColor} className="size-6 text-[7px]" />
      <p className={`mt-7 text-[8px] font-medium ${styles.muted}`}>MENU</p>
      <div className="mt-3 space-y-1">
        {items.map((item, index) => (
          <div
            key={item}
            className={`rounded-md px-2 py-1.5 text-[8px] transition-colors duration-500 ${index === 0 ? styles.accentSoft : styles.muted}`}
            style={index === 0 ? { borderLeft: `2px solid ${brandColor}` } : undefined}
          >
            {item}
          </div>
        ))}
      </div>
      <div className={`mt-auto flex items-center gap-1.5 border-t pt-4 text-[8px] ${styles.line} ${styles.muted}`}>
        <span className={`flex size-5 items-center justify-center rounded-full ${styles.accentSoft}`} style={{ backgroundColor: `${brandColor}33` }}>V</span>
        <span className="truncate">{companyName}</span>
      </div>
    </aside>
  );
}

function BrandMark({
  logoUrl,
  companyName,
  brandColor,
  className,
}: {
  logoUrl: string | null;
  companyName: string;
  brandColor: string;
  className: string;
}) {
  const initials = companyName
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-white/30 bg-white/20 font-semibold text-[#111213] ${className}`} style={{ backgroundColor: logoUrl ? "rgba(255,255,255,0.88)" : brandColor }}>
      {logoUrl ? (
        // A local preview URL cannot be handled by the Next.js image optimizer.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logoUrl} alt="Logo aziendale caricato" className="size-full object-contain p-0.5" />
      ) : (
        initials || "V"
      )}
    </span>
  );
}

function PersonalizeDemo({
  theme,
  onThemeChange,
  companyName,
  onCompanyNameChange,
  brandColor,
  onBrandColorChange,
  logoUrl,
  onLogoChange,
  onLogoReset,
}: {
  theme: MockupTheme;
  onThemeChange: (theme: MockupTheme) => void;
  companyName: string;
  onCompanyNameChange: (value: string) => void;
  brandColor: string;
  onBrandColorChange: (value: string) => void;
  logoUrl: string | null;
  onLogoChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onLogoReset: () => void;
}) {
  return (
    <section aria-labelledby="personalize-demo" className="rounded-2xl border border-[#8d939b]/45 bg-[#141516] p-5 shadow-[0_14px_38px_rgba(0,0,0,0.18)] sm:p-6">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#a8adb4]">Esperienza dimostrativa · 1 di 2</p>
          <h3 id="personalize-demo" className="mt-1 font-heading text-[22px] font-medium tracking-[-0.035em] text-white">Personalizza questa demo</h3>
        </div>
        <p className="max-w-[360px] text-[11px] leading-5 text-zinc-400">Inserisci qui i dati del tuo brand: il mockup subito sotto si aggiorna in tempo reale. Nulla viene inviato o salvato.</p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_0.9fr_1.1fr]">
        <div>
          <label htmlFor="demo-company" className="flex items-center gap-2 text-[11px] font-medium text-zinc-200"><span className="flex size-4 items-center justify-center rounded-full border border-[#8d939b] text-[9px] text-[#d6d8dc]">1</span> Nome della tua azienda</label>
          <input
            id="demo-company"
            value={companyName}
            onChange={(event) => onCompanyNameChange(event.target.value)}
            placeholder="Es. Acme S.r.l."
            className="mt-2 h-10 w-full rounded-md border border-white/[0.14] bg-black/20 px-3 text-[12px] text-white outline-none transition placeholder:text-zinc-600 focus:border-[#bfc3c9]"
          />
        </div>

        <div>
          <p className="flex items-center gap-2 text-[11px] font-medium text-zinc-200"><span className="flex size-4 items-center justify-center rounded-full border border-[#8d939b] text-[9px] text-[#d6d8dc]">2</span> Carica il logo della tua azienda</p>
          <div className="mt-2 flex h-10 gap-2">
            <label htmlFor="demo-logo" className="inline-flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md border border-white/[0.14] bg-black/20 px-3 text-[11px] text-zinc-300 transition hover:border-[#bfc3c9] hover:text-white">
              {logoUrl ? "Sostituisci logo" : "Carica logo"}
            </label>
            <input id="demo-logo" type="file" accept="image/*" onChange={onLogoChange} className="sr-only" />
            {logoUrl && <button type="button" onClick={onLogoReset} className="rounded-md border border-white/[0.14] px-3 text-[11px] text-zinc-400 transition hover:border-white/40 hover:text-white">Rimuovi</button>}
          </div>
        </div>

        <div>
          <p className="flex items-center gap-2 text-[11px] font-medium text-zinc-200"><span className="flex size-4 items-center justify-center rounded-full border border-[#8d939b] text-[9px] text-[#d6d8dc]">3</span> Colore principale del brand</p>
          <div className="mt-2 flex h-10 items-center gap-2">
            <input aria-label="Seleziona il colore principale" type="color" value={brandColor} onChange={(event) => onBrandColorChange(event.target.value)} className="size-10 cursor-pointer rounded-md border border-white/[0.14] bg-black/20 p-1" />
            <span className="min-w-[72px] text-[11px] uppercase tracking-wide text-zinc-400">{brandColor}</span>
            <div className="ml-auto flex gap-1.5">
              {brandPresets.map((preset) => (
                <button key={preset} type="button" aria-label={`Usa il colore ${preset}`} onClick={() => onBrandColorChange(preset)} className={`size-5 rounded-full border transition hover:scale-110 ${brandColor === preset ? "border-white ring-1 ring-white/55" : "border-white/20"}`} style={{ backgroundColor: preset }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-white/[0.08] pt-5">
        <p className="flex items-center gap-2 text-[11px] font-medium text-zinc-200"><span className="flex size-4 items-center justify-center rounded-full border border-[#8d939b] text-[9px] text-[#d6d8dc]">4</span> Tema dell&apos;interfaccia</p>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {themeOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={theme === option.id}
              onClick={() => onThemeChange(option.id)}
              className={`h-9 rounded-md border px-3 text-[11px] font-medium transition ${theme === option.id ? "border-[#d6d8dc] bg-[#d6d8dc] text-[#111213]" : "border-white/[0.14] bg-black/20 text-zinc-400 hover:border-white/40 hover:text-white"}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function CrmMock({ styles }: { styles: StyleSet }) {
  return (
    <div className="h-full">
      <MockTitle title="Dashboard commerciale" subtitle="Panoramica delle attività e delle opportunità" styles={styles} />
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        <MockMetric label="Clienti totali" value="1.482" styles={styles} />
        <MockMetric label="Offerte in corso" value="64" styles={styles} />
        <MockMetric label="Fatturato" value="245.000 €" styles={styles} />
        <MockMetric label="Conversione" value="32%" styles={styles} />
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-[1.15fr_0.85fr]">
        <MockPanel title="Pipeline offerte" styles={styles}>
          {["Nuovo lead", "Qualificato", "Proposta inviata", "Negoziazione", "Chiuso"].map((item, index) => (
            <MockRow key={item} label={item} value={`${12 - index * 2}`} styles={styles} />
          ))}
        </MockPanel>
        <MockPanel title="Attività recenti" styles={styles}>
          {["Nuova offerta per Alfa S.r.l.", "Follow-up con Rossi Spa", "Proposta inviata a Vega", "Chiamata con Bianchi & Figli"].map((item) => (
            <MockRow key={item} label={item} value="Oggi" styles={styles} />
          ))}
        </MockPanel>
      </div>
    </div>
  );
}

function FlowMock({ styles }: { styles: StyleSet }) {
  return (
    <div className={`relative h-full overflow-hidden rounded-xl border p-4 transition-colors duration-500 [background-size:18px_18px] sm:p-6 ${styles.canvas} ${styles.surface} ${styles.line}`}>
      <MockTitle title="Workflow onboarding" subtitle="Automazione in esecuzione" styles={styles} />
      <div className="relative mx-auto mt-12 flex max-w-[600px] items-center justify-between sm:mt-16">
        <FlowStep icon={<GitBranch className="size-4" />} title="Trigger" detail="Nuovo lead" styles={styles} />
        <FlowLine />
        <FlowStep icon={<Workflow className="size-4" />} title="Verifica dati" detail="Regole CRM" styles={styles} />
        <FlowLine />
        <FlowStep icon={<Users className="size-4" />} title="Assegna task" detail="Team Sales" styles={styles} />
      </div>
      <div className="relative mx-auto mt-12 max-w-[600px] sm:mt-16">
        <div className={`absolute left-[18%] top-0 h-9 w-px ${styles.accentSoft}`} />
        <div className={`absolute right-[18%] top-0 h-9 w-px ${styles.accentSoft}`} />
        <div className={`mx-auto flex w-[124px] items-center justify-center rounded-lg border px-3 py-2 text-[9px] ${styles.panel} ${styles.line}`}>Notifica cliente</div>
      </div>
    </div>
  );
}

function FactoryMock({ styles }: { styles: StyleSet }) {
  return (
    <div className="h-full">
      <MockTitle title="Produzione" subtitle="Monitoraggio in tempo reale" styles={styles} />
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        <MockMetric label="Ordini in corso" value="128" styles={styles} />
        <MockMetric label="Produzione oggi" value="2.450" styles={styles} />
        <MockMetric label="Efficienza" value="89%" styles={styles} />
        <MockMetric label="Scarti" value="2,3%" styles={styles} />
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-[1.15fr_0.85fr]">
        <MockPanel title="Andamento produzione" styles={styles}>
          <div className={`relative mt-4 h-28 border-b border-l ${styles.line}`}>
            <svg viewBox="0 0 320 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <polyline points="0,78 28,66 56,72 82,46 108,58 136,26 161,52 189,43 218,71 247,31 275,40 320,14" fill="none" stroke="currentColor" className={styles.strong} strokeWidth="2" />
            </svg>
          </div>
        </MockPanel>
        <MockPanel title="Ordini recenti" styles={styles}>
          {["ORD-2026-106", "ORD-2026-104", "ORD-2026-103", "ORD-2026-098"].map((item, index) => (
            <MockRow key={item} label={item} value={index === 0 ? "In produzione" : "Completato"} styles={styles} />
          ))}
        </MockPanel>
      </div>
    </div>
  );
}

function DeskMock({ styles }: { styles: StyleSet }) {
  return (
    <div className="h-full">
      <MockTitle title="Benvenuto, Mario Rossi" subtitle="Il tuo spazio clienti è aggiornato" styles={styles} />
      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_0.7fr]">
        <MockPanel title="I tuoi documenti" styles={styles}>
          {["Contratto.pdf", "Fattura_2026.pdf", "Report_mensile.pdf", "Manuale_tecnico.pdf"].map((item) => (
            <MockRow key={item} label={item} value="PDF" styles={styles} />
          ))}
        </MockPanel>
        <MockPanel title="Ticket recenti" styles={styles}>
          {["Richiesta supporto", "Problema di accesso", "Aggiornamento sistema", "Nuova funzionalità"].map((item, index) => (
            <MockRow key={item} label={item} value={index === 0 ? "Aperto" : "Risolto"} styles={styles} />
          ))}
        </MockPanel>
        <MockPanel title="Stato account" styles={styles}>
          <p className={`mt-4 text-[10px] ${styles.muted}`}>Piano Enterprise</p>
          <div className={`mt-5 h-1.5 overflow-hidden rounded-full ${styles.accentSoft}`}><div className="h-full w-[72%] rounded-full bg-[var(--demo-brand)] transition-colors duration-500" /></div>
          <p className={`mt-2 text-[9px] ${styles.muted}`}>Spazio utilizzato: 72%</p>
        </MockPanel>
      </div>
    </div>
  );
}

function MockTitle({ title, subtitle, styles }: { title: string; subtitle: string; styles: StyleSet }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className={`text-[13px] font-medium sm:text-[15px] ${styles.strong}`}>{title}</p>
        <p className={`mt-1 text-[9px] ${styles.muted}`}>{subtitle}</p>
      </div>
      <LayoutDashboard className={`size-4 shrink-0 ${styles.muted}`} />
    </div>
  );
}

function MockMetric({ label, value, styles }: { label: string; value: string; styles: StyleSet }) {
  return (
    <div className={`rounded-xl border p-3 transition-colors duration-500 ${styles.surface} ${styles.line}`}>
      <p className={`truncate text-[8px] ${styles.muted}`}>{label}</p>
      <p className={`mt-2 text-[16px] font-medium tracking-[-0.04em] sm:text-[20px] ${styles.strong}`}>{value}</p>
      <span className="mt-3 block h-px w-7 bg-[var(--demo-brand)] transition-colors duration-500" />
    </div>
  );
}

function MockPanel({ title, children, styles }: { title: string; children: ReactNode; styles: StyleSet }) {
  return (
    <div className={`min-w-0 rounded-xl border p-3 transition-colors duration-500 sm:p-4 ${styles.panel} ${styles.line}`}>
      <p className={`text-[10px] font-medium ${styles.strong}`}>{title}</p>
      {children}
    </div>
  );
}

function MockRow({ label, value, styles }: { label: string; value: string; styles: StyleSet }) {
  return (
    <div className={`mt-3 flex min-w-0 items-center gap-2 border-b pb-2 text-[8px] sm:text-[9px] ${styles.line} ${styles.muted}`}>
      <span className={`size-1.5 shrink-0 rounded-full ${styles.accentSoft}`} />
      <span className="truncate">{label}</span>
      <span className="ml-auto shrink-0 text-[7px] sm:text-[8px]">{value}</span>
    </div>
  );
}

function FlowStep({ icon, title, detail, styles }: { icon: ReactNode; title: string; detail: string; styles: StyleSet }) {
  return (
    <div className={`relative z-10 flex w-[92px] shrink-0 flex-col gap-2 rounded-xl border p-3 transition-colors duration-500 sm:w-[120px] sm:p-4 ${styles.panel} ${styles.line}`}>
      <span className={styles.muted}>{icon}</span>
      <span className={`text-[9px] font-medium ${styles.strong}`}>{title}</span>
      <span className={`text-[8px] ${styles.muted}`}>{detail}</span>
    </div>
  );
}

function FlowLine() {
  return <span className="h-px flex-1 bg-[var(--demo-brand)] opacity-70 transition-colors duration-500" />;
}
