import Container from "../shared/Container";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-wide">
              VANTA
            </h3>

            <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
              Software su misura, automazioni e piattaforme digitali
              progettate per supportare la crescita delle aziende.
            </p>
          </div>

          <div className="flex gap-16">

            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500">
                Azienda
              </h4>

              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>Chi siamo</li>
                <li>Servizi</li>
                <li>Progetti</li>
                <li>Contatti</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500">
                Contatti
              </h4>

              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>info@vantasystems.it</li>
                <li>Parma, Italia</li>
              </ul>
            </div>

          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8 text-sm text-zinc-500">
          © {new Date().getFullYear()} Vanta Systems.
          Tutti i diritti riservati.
        </div>
      </Container>
    </footer>
  );
}