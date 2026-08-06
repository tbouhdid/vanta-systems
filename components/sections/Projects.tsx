import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Boxes, GitBranch, Users } from "lucide-react";

import Container from "@/components/shared/Container";
import { projects } from "@/data/projects";
import type { Project, ProjectPreview as ProjectPreviewType } from "@/types/project";

export default function Projects() {
  return (
    <section id="projects" className="bg-[#f3f3f1] py-16 text-[#111213] sm:py-20 lg:py-[88px]">
      <Container>
        <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-start">
          <div className="max-w-[560px]">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6b6d70]">
              Soluzioni realizzabili
            </p>
            <h2 className="mt-3 font-heading text-[36px] font-medium tracking-[-0.055em] sm:text-[45px]">
              Concept Case Study
            </h2>
            <p className="mt-4 max-w-[470px] text-[14px] leading-6 text-[#55585c]">
              Esempi di soluzioni software che possiamo sviluppare e personalizzare per le esigenze della tua azienda.
            </p>
          </div>

          <a
            href="/contact"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#111213] px-5 text-[13px] font-medium text-white transition hover:bg-[#2a2c2f]"
          >
            Richiedi una consulenza <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="mt-11 grid gap-6 lg:grid-cols-2">
          {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
      </Container>
    </section>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article>
      <Link
        href={`/projects/${project.slug}`}
        className="group block overflow-hidden rounded-xl border border-[#d6d8dc] bg-[#fafaf8] shadow-[0_9px_22px_rgba(17,18,19,0.07)] transition duration-300 ease-out hover:-translate-y-1 hover:border-[#a8adb4] hover:shadow-[0_18px_36px_rgba(17,18,19,0.13)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1a1b1d]"
      >
        <ProjectPreview type={project.preview} badge={project.badge} />
        <div className="flex min-h-[121px] items-end justify-between gap-5 px-5 py-5 sm:px-6 sm:py-6">
          <div className="max-w-[430px]">
            <h3 className="font-heading text-[20px] font-medium tracking-[-0.035em]">
              {project.title}
            </h3>
            <p className="mt-2 text-[13px] leading-5 text-[#55585c]">
              {project.description}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="mb-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-[#bfc3c9] text-[#1a1b1d] transition group-hover:border-[#1a1b1d] group-hover:bg-[#1a1b1d] group-hover:text-white"
          >
            <ArrowRight className="size-4" />
          </span>
        </div>
      </Link>
    </article>
  );
}

function ProjectPreview({ type, badge }: { type: ProjectPreviewType; badge: string }) {
  return (
    <div className={`relative h-[218px] overflow-hidden bg-[#111213] sm:h-[244px] ${type === "flow" ? "bg-[radial-gradient(circle_at_1px_1px,rgba(214,216,220,0.12)_1px,transparent_0)] [background-size:17px_17px]" : ""}`}>
      <div className="flex h-full">
        <MiniSidebar active={type} />
        <div className="relative min-w-0 flex-1 overflow-hidden px-3 py-3 sm:px-5 sm:py-4">
          <ConceptBadge>{badge}</ConceptBadge>
          {type === "crm" && <CrmPreview />}
          {type === "flow" && <FlowPreview />}
          {type === "factory" && <FactoryPreview />}
          {type === "desk" && <DeskPreview />}
        </div>
      </div>
    </div>
  );
}

function MiniSidebar({ active }: { active: ProjectPreviewType }) {
  const labels = active === "factory" ? ["Prod.", "Ordini", "Magaz.", "KPI"] : active === "desk" ? ["Doc.", "Ticket", "Profilo", "Supporto"] : ["Dash.", "Clienti", "Flussi", "Report"];

  return (
    <aside className="flex w-10 shrink-0 flex-col border-r border-white/[0.08] bg-[#151617] px-2 py-3 sm:w-14 sm:px-3">
      <span className="flex size-4 items-center justify-center rounded-full border border-white/20 text-[5px] font-semibold text-white sm:size-5 sm:text-[6px]">V</span>
      <div className="mt-5 space-y-3 sm:mt-7">
        {labels.map((label, index) => (
          <div key={label} className={`flex items-center gap-1.5 ${index === 0 ? "text-white" : "text-white/35"}`}>
            <span className={`size-1 rounded-full ${index === 0 ? "bg-[#d6d8dc]" : "bg-white/25"}`} />
            <span className="hidden text-[5px] sm:block">{label}</span>
          </div>
        ))}
      </div>
      <span className="mt-auto flex size-4 items-center justify-center rounded-full border border-white/15 text-[5px] text-white/60 sm:size-5">R</span>
    </aside>
  );
}

function ConceptBadge({ children }: { children: ReactNode }) {
  return (
    <span className="absolute right-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/40 px-2.5 py-1 text-[8px] font-medium text-white backdrop-blur sm:right-5 sm:top-4 sm:text-[9px]">
      <i className="size-1 rounded-full bg-[#d6d8dc]" />
      {children}
    </span>
  );
}

function CrmPreview() {
  return (
    <div className="h-full pt-1">
      <p className="text-[10px] font-medium text-white sm:text-[12px]">Dashboard</p>
      <div className="mt-3 grid grid-cols-4 gap-1.5 sm:mt-4 sm:gap-2">
        <Metric label="Clienti totali" value="1.482" />
        <Metric label="Offerte in corso" value="64" />
        <Metric label="Fatturato" value="245.000 €" />
        <Metric label="Conversione" value="32%" />
      </div>
      <div className="mt-3 grid grid-cols-[1.2fr_0.8fr] gap-2 sm:mt-4 sm:gap-3">
        <Panel title="Pipeline offerte">
          {['Nuovo lead', 'Qualificato', 'Proposta inviata', 'Negoziazione'].map((label, index) => <MiniRow key={label} label={label} value={`${8 - index}`} />)}
        </Panel>
        <Panel title="Attività recenti">
          {['Nuova offerta per Alfa S.r.l.', 'Follow-up con Rossi Spa', 'Proposta inviata'].map((label) => <MiniRow key={label} label={label} value="" />)}
        </Panel>
      </div>
    </div>
  );
}

function FlowPreview() {
  return (
    <div className="h-full pt-1">
      <p className="text-[10px] font-medium text-white sm:text-[12px]">Workflow automazione</p>
      <div className="relative mx-auto mt-9 flex max-w-[430px] items-center justify-between sm:mt-12">
        <FlowNode icon={<GitBranch className="size-3" />} label="Trigger" detail="Nuovo lead" />
        <Connector />
        <FlowNode icon={<Boxes className="size-3" />} label="Verifica dati" detail="Controllo automazioni" />
        <Connector />
        <FlowNode icon={<Users className="size-3" />} label="Assegna task" detail="Team commerciale" />
      </div>
      <div className="relative mx-auto mt-8 max-w-[430px] sm:mt-10">
        <div className="absolute left-[16%] top-0 h-7 w-px bg-[#8d939b]/50" />
        <div className="absolute right-[16%] top-0 h-7 w-px bg-[#8d939b]/50" />
        <div className="mx-auto flex w-[88px] items-center justify-center rounded-md border border-white/15 bg-[#1c1d1f] px-2 py-2 text-[6px] text-white/70 sm:w-[108px] sm:text-[7px]">
          Notifica cliente
        </div>
      </div>
    </div>
  );
}

function FactoryPreview() {
  return (
    <div className="h-full pt-1">
      <p className="text-[10px] font-medium text-white sm:text-[12px]">Produzione</p>
      <div className="mt-3 grid grid-cols-4 gap-1.5 sm:mt-4 sm:gap-2">
        <Metric label="Ordini in corso" value="128" />
        <Metric label="Produzione oggi" value="2.450" />
        <Metric label="Efficienza" value="89%" />
        <Metric label="Scarti" value="2,3%" />
      </div>
      <div className="mt-3 grid grid-cols-[1.15fr_0.85fr] gap-2 sm:mt-4 sm:gap-3">
        <Panel title="Andamento produzione">
          <div className="relative mt-3 h-10 border-b border-l border-white/10 sm:h-12">
            <svg viewBox="0 0 200 60" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <polyline points="0,48 18,40 34,43 48,29 66,36 83,18 100,33 119,28 137,42 154,20 170,25 200,7" fill="none" stroke="#d6d8dc" strokeWidth="1.5" />
            </svg>
          </div>
        </Panel>
        <Panel title="Ordini recenti">
          {['ORD-2026-106', 'ORD-2026-104', 'ORD-2026-103'].map((label, index) => <MiniRow key={label} label={label} value={index === 0 ? 'In produzione' : 'Completato'} />)}
        </Panel>
      </div>
    </div>
  );
}

function DeskPreview() {
  return (
    <div className="h-full pt-1">
      <p className="text-[10px] font-medium text-white sm:text-[12px]">Benvenuto, Mario Rossi</p>
      <p className="mt-1 text-[6px] text-white/45 sm:text-[7px]">Ecco cosa c&apos;è di nuovo nel tuo spazio.</p>
      <div className="mt-3 grid grid-cols-[1fr_1fr_0.7fr] gap-2 sm:mt-4 sm:gap-3">
        <Panel title="I tuoi documenti">
          {['Contratto.pdf', 'Fattura_2026.pdf', 'Report_mensile.pdf'].map((label) => <MiniRow key={label} label={label} value="" />)}
        </Panel>
        <Panel title="Ticket recenti">
          {['Richiesta supporto', 'Problema di accesso', 'Aggiornamento sistema'].map((label, index) => <MiniRow key={label} label={label} value={index === 0 ? 'Aperto' : 'Risolto'} />)}
        </Panel>
        <Panel title="Stato account">
          <p className="mt-3 text-[6px] text-white/55">Piano Enterprise</p>
          <div className="mt-4 h-1 rounded-full bg-white/10"><div className="h-full w-[72%] rounded-full bg-[#d6d8dc]" /></div>
        </Panel>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-[#1c1d1f] p-2 sm:p-2.5">
      <p className="truncate text-[5px] text-white/45 sm:text-[6px]">{label}</p>
      <p className="mt-1 text-[9px] font-medium text-white sm:text-[12px]">{value}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-w-0 rounded-md bg-[#1a1b1d] p-2 sm:p-2.5">
      <p className="truncate text-[6px] font-medium text-white/85 sm:text-[7px]">{title}</p>
      {children}
    </div>
  );
}

function MiniRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-1.5 flex min-w-0 items-center gap-1.5 text-[5px] text-white/55 sm:text-[6px]">
      <span className="size-1 shrink-0 rounded-full bg-[#a8adb4]" />
      <span className="truncate">{label}</span>
      {value && <span className="ml-auto shrink-0 text-white/38">{value}</span>}
    </div>
  );
}

function FlowNode({ icon, label, detail }: { icon: ReactNode; label: string; detail: string }) {
  return (
    <div className="relative z-10 flex w-[68px] shrink-0 flex-col gap-1 rounded-lg border border-white/15 bg-[#1c1d1f] p-2 text-white shadow-[0_8px_18px_rgba(0,0,0,0.2)] sm:w-[94px] sm:p-3">
      <span className="text-[#d6d8dc]">{icon}</span>
      <span className="text-[6px] font-medium sm:text-[7px]">{label}</span>
      <span className="text-[5px] text-white/45 sm:text-[6px]">{detail}</span>
    </div>
  );
}

function Connector() {
  return <span className="h-px flex-1 bg-[#8d939b]/60" />;
}
