import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="py-36">
      <Container>
        <div className="mx-auto max-w-3xl">

          <div className="text-center">

            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
              Contatti
            </p>

            <h1 className="mt-6 text-5xl font-bold leading-tight">
              Parliamo del tuo progetto.
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
              Raccontaci cosa vuoi realizzare. Analizzeremo le tue esigenze e
              ti ricontatteremo il prima possibile per organizzare una
              consulenza.
            </p>

          </div>

          <div
            className="
              mt-16
              rounded-3xl
              border
              border-white/5
              bg-white/[0.02]
              p-8
              md:p-10
            "
          >

            <form className="space-y-8">

              <div className="grid gap-6 md:grid-cols-2">

                <div className="space-y-2">
                  <Label htmlFor="name">
                    Nome e Cognome
                  </Label>

                  <Input
                    id="name"
                    placeholder="Mario Rossi"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email
                  </Label>

                  <Input
                    id="email"
                    type="email"
                    placeholder="mario@azienda.it"
                  />
                </div>

              </div>

              <div className="space-y-2">
                <Label htmlFor="company">
                  Azienda
                </Label>

                <Input
                  id="company"
                  placeholder="Nome della tua azienda (opzionale)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">
                  Raccontaci il progetto
                </Label>

                <Textarea
                  id="message"
                  rows={8}
                  placeholder="Descrivi la tua idea, il problema da risolvere o il software che vorresti sviluppare..."
                />
              </div>

              <Button
                size="lg"
                className="w-full rounded-full md:w-auto"
              >
                Richiedi una consulenza

                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

            </form>

          </div>

        </div>
      </Container>
    </main>
  );
}