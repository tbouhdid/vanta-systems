"use client";

import type { ChangeEvent } from "react";

import type { DemoTheme } from "./types";

const themeOptions: Array<{ id: DemoTheme; label: string }> = [
  { id: "dark", label: "Dark" },
  { id: "titanium", label: "Titanium" },
  { id: "light", label: "Light" },
  { id: "midnight", label: "Midnight" },
];

const brandPresets = ["#D6D8DC", "#BFC3C9", "#A8ADB4", "#8D939B", "#1A1B1D"];

type DemoCustomizerProps = {
  theme: DemoTheme;
  onThemeChange: (theme: DemoTheme) => void;
  companyName: string;
  onCompanyNameChange: (value: string) => void;
  brandColor: string;
  onBrandColorChange: (value: string) => void;
  logoUrl: string | null;
  onLogoChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onLogoReset: () => void;
};

export default function DemoCustomizer({
  theme,
  onThemeChange,
  companyName,
  onCompanyNameChange,
  brandColor,
  onBrandColorChange,
  logoUrl,
  onLogoChange,
  onLogoReset,
}: DemoCustomizerProps) {
  return (
    <section
      aria-labelledby="personalize-demo"
      className="rounded-2xl border border-[#8d939b]/45 bg-[#141516] p-5 shadow-[0_14px_38px_rgba(0,0,0,0.18)] sm:p-6"
    >
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#a8adb4]">
            Esperienza dimostrativa · 1 di 2
          </p>
          <h3
            id="personalize-demo"
            className="mt-1 font-heading text-[22px] font-medium tracking-[-0.035em] text-white"
          >
            Personalizza questa demo
          </h3>
        </div>
        <p className="max-w-[360px] text-[11px] leading-5 text-zinc-400">
          Inserisci qui i dati del tuo brand: la mini-app qui sotto si aggiorna
          in tempo reale. Nulla viene inviato o salvato.
        </p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_0.9fr_1.1fr]">
        <div>
          <label
            htmlFor="demo-company"
            className="flex items-center gap-2 text-[11px] font-medium text-zinc-200"
          >
            <StepNumber value="1" />
            Nome della tua azienda
          </label>
          <input
            id="demo-company"
            value={companyName}
            onChange={(event) => onCompanyNameChange(event.target.value)}
            placeholder="Es. Acme S.r.l."
            className="mt-2 h-10 w-full rounded-md border border-white/[0.14] bg-black/20 px-3 text-[12px] text-white outline-none transition placeholder:text-zinc-600 focus:border-[#bfc3c9]"
          />
        </div>

        <div>
          <p className="flex items-center gap-2 text-[11px] font-medium text-zinc-200">
            <StepNumber value="2" />
            Carica il logo della tua azienda
          </p>
          <div className="mt-2 flex h-10 gap-2">
            <label
              htmlFor="demo-logo"
              className="inline-flex min-w-0 flex-1 cursor-pointer items-center justify-center rounded-md border border-white/[0.14] bg-black/20 px-3 text-[11px] text-zinc-300 transition hover:border-[#bfc3c9] hover:text-white"
            >
              {logoUrl ? "Sostituisci logo" : "Carica logo"}
            </label>
            <input
              id="demo-logo"
              type="file"
              accept="image/*"
              onChange={onLogoChange}
              className="sr-only"
            />
            {logoUrl && (
              <button
                type="button"
                onClick={onLogoReset}
                className="rounded-md border border-white/[0.14] px-3 text-[11px] text-zinc-400 transition hover:border-white/40 hover:text-white"
              >
                Rimuovi
              </button>
            )}
          </div>
        </div>

        <div>
          <p className="flex items-center gap-2 text-[11px] font-medium text-zinc-200">
            <StepNumber value="3" />
            Colore principale del brand
          </p>
          <div className="mt-2 flex h-10 items-center gap-2">
            <input
              aria-label="Seleziona il colore principale"
              type="color"
              value={brandColor}
              onChange={(event) => onBrandColorChange(event.target.value)}
              className="size-10 cursor-pointer rounded-md border border-white/[0.14] bg-black/20 p-1"
            />
            <span className="min-w-[72px] text-[11px] uppercase tracking-wide text-zinc-400">
              {brandColor}
            </span>
            <div className="ml-auto flex gap-1.5">
              {brandPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  aria-label={`Usa il colore ${preset}`}
                  onClick={() => onBrandColorChange(preset)}
                  className={`size-5 rounded-full border transition hover:scale-110 ${
                    brandColor === preset
                      ? "border-white ring-1 ring-white/55"
                      : "border-white/20"
                  }`}
                  style={{ backgroundColor: preset }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-white/[0.08] pt-5">
        <p className="flex items-center gap-2 text-[11px] font-medium text-zinc-200">
          <StepNumber value="4" />
          Tema dell&apos;interfaccia
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {themeOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={theme === option.id}
              onClick={() => onThemeChange(option.id)}
              className={`h-9 rounded-md border px-3 text-[11px] font-medium transition ${
                theme === option.id
                  ? "border-[#d6d8dc] bg-[#d6d8dc] text-[#111213]"
                  : "border-white/[0.14] bg-black/20 text-zinc-400 hover:border-white/40 hover:text-white"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepNumber({ value }: { value: string }) {
  return (
    <span className="flex size-4 items-center justify-center rounded-full border border-[#8d939b] text-[9px] text-[#d6d8dc]">
      {value}
    </span>
  );
}
