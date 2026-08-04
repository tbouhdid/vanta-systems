import {
  ArrowUpRight,
  Factory,
  LayoutDashboard,
  Users,
} from "lucide-react";

const projects = [
  {
    icon: LayoutDashboard,
    title: "Gestionale Produzione",
    category: "Web Platform",
    description:
      "Piattaforma per monitorare ordini, produzione e stato delle lavorazioni.",
  },
  {
    icon: Users,
    title: "CRM Aziendale",
    category: "Business Software",
    description:
      "Sistema centralizzato per la gestione di clienti, offerte e attività commerciali.",
  },
  {
    icon: Factory,
    title: "Portale Clienti",
    category: "Enterprise",
    description:
      "Area riservata dove clienti e fornitori possono consultare documenti e pratiche.",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-[1500px] px-12 py-36"
    >
      <div className="flex items-end justify-between">

        <div>

          <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
            Progetti
          </p>

          <h2 className="mt-4 text-5xl font-bold">
            Alcuni esempi
            <br />
            di soluzioni realizzabili.
          </h2>

        </div>

      </div>

      <div className="mt-20 grid gap-8 lg:grid-cols-3">

        {projects.map((project) => {

          const Icon = project.icon;

          return (
            <article
              key={project.title}
              className="group rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden transition hover:border-white/10"
            >

              <div className="flex h-56 items-center justify-center border-b border-white/5 bg-gradient-to-br from-zinc-900 to-black">

                <Icon
                  size={56}
                  className="text-zinc-300 transition group-hover:scale-110"
                />

              </div>

              <div className="p-8">

                <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
                  {project.category}
                </p>

                <h3 className="mt-4 text-2xl font-semibold">
                  {project.title}
                </h3>

                <p className="mt-5 leading-7 text-muted-foreground">
                  {project.description}
                </p>

                <button className="mt-8 flex items-center gap-2 text-sm text-zinc-300">
                  Scopri di più
                  <ArrowUpRight size={16} />
                </button>

              </div>

            </article>
          );

        })}

      </div>

      <p className="mt-10 text-sm text-zinc-500">
        * Le soluzioni mostrate rappresentano esempi di tipologie di progetti sviluppabili da Vanta Systems.
      </p>

    </section>
  );
}