import { ArrowUpRight } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";

import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section
  id="projects"
  className="py-24 lg:py-36"
>
  <Container>
      <SectionTitle
  eyebrow="Progetti"
  title={
    <>
      Alcuni esempi
      <br />
      di soluzioni realizzabili.
    </>
  }
/>

      <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {projects.map((project) => {

          const Icon = project.icon;

          return (
            <article
              key={project.title}
              className="group rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden transition hover:border-white/10"
            >

              <div className="flex h-48 lg:h-56 items-center justify-center border-b border-white/5 bg-gradient-to-br from-zinc-900 to-black">

                <Icon
                  size={56}
                  className="text-zinc-300 transition group-hover:scale-110"
                />

              </div>

              <div className="p-6 lg:p-8">

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

    </Container>
</section>
  );
}