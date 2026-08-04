import Container from "../shared/Container";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section
      id="cta"
      className="py-36"
    >
      <Container>
        <div
          className="
            rounded-[40px]
            border
            border-white/5
            bg-gradient-to-br
            from-zinc-900
            to-black
            p-16
          "
        >
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
              Contattaci
            </p>

            <h2 className="mt-6 text-5xl font-bold leading-tight">
              Costruiamo insieme
              <br />
              il tuo prossimo progetto.
            </h2>

            <p className="mt-8 text-lg leading-8 text-muted-foreground">
              Se hai un'idea, un problema da risolvere o un processo da
              digitalizzare, raccontacelo. Analizzeremo insieme la soluzione
              migliore per la tua azienda.
            </p>

            <button
              className="
                mt-10
                inline-flex
                items-center
                gap-3
                rounded-full
                bg-white
                px-8
                py-4
                font-medium
                text-black
                transition
                hover:scale-105
              "
            >
              Richiedi una consulenza

              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}