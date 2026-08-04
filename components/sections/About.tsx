import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";
import {
  Code,
  Cpu,
  Users,
  Wrench,
} from "lucide-react";

const values = [
  {
    icon: Code,
    title: "Sviluppo su misura",
    description:
      "Ogni software viene progettato partendo dai processi e dagli obiettivi del cliente.",
  },
  {
    icon: Cpu,
    title: "Tecnologie moderne",
    description:
      "Utilizziamo strumenti moderni per creare applicazioni affidabili, scalabili e manutenibili.",
  },
  {
    icon: Users,
    title: "Collaborazione",
    description:
      "Crediamo che i risultati migliori nascano lavorando a stretto contatto con il cliente.",
  },
  {
    icon: Wrench,
    title: "Supporto continuo",
    description:
      "Il rilascio del software è solo l'inizio: continuiamo ad affiancare il cliente nel tempo.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-36">
      <Container>
        <div className="grid items-center gap-20 lg:grid-cols-2">
          <SectionTitle
            eyebrow="Chi siamo"
            title={
              <>
                Ingegneria del software,
                <br />
                senza compromessi.
              </>
            }
            description="Vanta Systems nasce con l'obiettivo di sviluppare software su misura che aiuti le aziende a lavorare meglio, automatizzare i processi e costruire strumenti pensati per durare nel tempo."
          />

          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="rounded-3xl border border-white/5 bg-white/[0.02] p-6"
                >
                  <div className="mb-6 inline-flex rounded-2xl bg-white/5 p-3">
                    <Icon className="text-zinc-200" size={24} />
                  </div>

                  <h3 className="text-lg font-semibold">
                    {value.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}