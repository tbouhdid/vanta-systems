import {
  BrainCircuit,
  Code2,
  Database,
  Workflow,
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Software su misura",
    description:
      "Applicazioni web e desktop sviluppate attorno ai processi della tua azienda.",
  },
  {
    icon: Workflow,
    title: "Automazioni",
    description:
      "Riduci il lavoro manuale automatizzando attività ripetitive e flussi operativi.",
  },
  {
    icon: Database,
    title: "Integrazione sistemi",
    description:
      "Colleghiamo CRM, ERP, API e servizi esterni in un unico ecosistema.",
  },
  {
    icon: BrainCircuit,
    title: "Intelligenza Artificiale",
    description:
      "Implementiamo AI per analisi dati, assistenti virtuali e automazioni intelligenti.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="mx-auto max-w-[1500px] px-12 py-36"
    >
      <div className="max-w-2xl">

        <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
          Servizi
        </p>

        <h2 className="mt-4 text-5xl font-bold">
          Soluzioni software
          <br />
          costruite per la tua azienda.
        </h2>

        <p className="mt-8 text-lg leading-8 text-muted-foreground">
          Ogni progetto nasce dalle esigenze del cliente.
          Nessun software standard, nessun processo da adattare:
          sviluppiamo strumenti che lavorano nel modo in cui lavora la tua azienda.
        </p>

      </div>

      <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

        {services.map((service) => {

          const Icon = service.icon;

          return (
            <div
              key={service.title}
              className="
              rounded-3xl
              border
              border-white/5
              bg-white/[0.02]
              p-8
              transition
              hover:border-white/10
              hover:bg-white/[0.04]
              "
            >
              <div className="mb-8 inline-flex rounded-2xl bg-white/5 p-4">

                <Icon
                  size={28}
                  className="text-zinc-200"
                />

              </div>

              <h3 className="text-xl font-semibold">
                {service.title}
              </h3>

              <p className="mt-5 leading-7 text-muted-foreground">
                {service.description}
              </p>

            </div>
          );

        })}

      </div>
    </section>
  );
}