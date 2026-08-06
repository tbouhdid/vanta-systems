"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, ComponentType } from "react";

import CrmDemo from "@/components/projects/demos/CrmDemo";
import DeskDemo from "@/components/projects/demos/DeskDemo";
import FactoryDemo from "@/components/projects/demos/FactoryDemo";
import FlowDemo from "@/components/projects/demos/FlowDemo";
import DemoCustomizer from "@/components/projects/demo/DemoCustomizer";
import type { DemoBranding, DemoTheme } from "@/components/projects/demo/types";
import type { ProjectPreview } from "@/types/project";

type InteractiveMockupProps = {
  variant: ProjectPreview;
  productName: string;
};

type DemoComponent = ComponentType<{ branding: DemoBranding }>;

const demoComponents: Record<ProjectPreview, DemoComponent> = {
  crm: CrmDemo,
  flow: FlowDemo,
  factory: FactoryDemo,
  desk: DeskDemo,
};

const demoLabels: Record<ProjectPreview, string> = {
  crm: "Gestione commerciale",
  flow: "Automazioni e workflow",
  factory: "Operations industriali",
  desk: "Portale clienti",
};

export default function InteractiveMockup({
  variant,
  productName,
}: InteractiveMockupProps) {
  const [theme, setTheme] = useState<DemoTheme>("titanium");
  const [companyName, setCompanyName] = useState("");
  const [brandColor, setBrandColor] = useState("#BFC3C9");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const Demo = demoComponents[variant];
  const displayCompanyName = companyName.trim() || "La tua azienda";

  useEffect(() => {
    return () => {
      if (logoUrl) {
        URL.revokeObjectURL(logoUrl);
      }
    };
  }, [logoUrl]);

  function handleLogoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setLogoUrl(URL.createObjectURL(file));
  }

  const branding: DemoBranding = {
    companyName: displayCompanyName,
    logoUrl,
    brandColor,
    theme,
    productName,
  };

  return (
    <div className="space-y-5">
      <DemoCustomizer
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
        aria-label={`Demo interattiva di ${productName}`}
        className="overflow-hidden rounded-2xl border border-white/[0.1] bg-[#101112] shadow-[0_28px_80px_rgba(0,0,0,0.34)]"
      >
        <div className="flex flex-col gap-3 border-b border-white/[0.09] bg-[#151617] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#a8adb4]">
              Esperienza dimostrativa · 2 di 2
            </p>
            <h3 className="mt-1 font-heading text-[20px] font-medium tracking-[-0.035em] text-white sm:text-[23px]">
              Esplora {productName}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-zinc-400">
            <span className="size-1.5 rounded-full bg-[#bfc3c9]" />
            {demoLabels[variant]} · dati demo locali
          </div>
        </div>
        <Demo branding={branding} />
      </section>
    </div>
  );
}
