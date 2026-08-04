import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";
import { services } from "@/data/services";

export default function Services() {
  return (
    <section
  id="services"
  className="py-24 lg:py-36"
>
      <Container>
        <SectionTitle
          eyebrow="Servizi"
          title={
            <>
              Soluzioni software
              <br />
              costruite per la tua azienda.
            </>
          }
          description="Ogni progetto nasce dalle esigenze del cliente. Nessun software standard, nessun processo da adattare: sviluppiamo strumenti che lavorano nel modo in cui lavora la tua azienda."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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
                  p-6 lg:p-8
                  transition
                  hover:border-white/10
                  hover:bg-white/[0.04]
                "
              >
                <div className="mb-6 inline-flex rounded-2xl bg-white/5 p-3 lg:p-4">
                  <Icon size={28} className="text-zinc-200" />
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
      </Container>
    </section>
  );
}