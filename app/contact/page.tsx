"use client";

import { useState } from "react";

import Container from "@/components/shared/Container";
import SuccessCard from "@/components/contact/SuccessCard";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      setSuccess(true);
    } catch {
      alert("Errore durante l'invio.");
    } finally {
      setLoading(false);
    }
  }

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
            {success ? (
              <SuccessCard email={form.email} />
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                <div className="grid gap-6 md:grid-cols-2">

                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Nome e Cognome
                    </Label>

                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Mario Rossi"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email
                    </Label>

                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="mario@azienda.it"
                      required
                    />
                  </div>

                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">
                    Azienda
                  </Label>

                  <Input
                    id="company"
                    value={form.company}
                    onChange={(e) =>
                      setForm({ ...form, company: e.target.value })
                    }
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
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Descrivi la tua idea..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  size="lg"
                  className="w-full rounded-full md:w-auto"
                >
                  {loading ? "Invio..." : "Richiedi una consulenza"}

                  {!loading && (
                    <ArrowRight className="ml-2 h-4 w-4" />
                  )}
                </Button>

              </form>
            )}
          </div>

        </div>
      </Container>
    </main>
  );
}