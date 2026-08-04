import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
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

            <a
                href="/contact"
                className="mt-10 inline-block"
            >
                <Button
                    size="lg"
                    className="rounded-full"
                >
                    Richiedi una consulenza
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}