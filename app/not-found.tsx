import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-xl text-center">

        <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
          Errore 404
        </p>

        <h1 className="mt-6 text-5xl font-bold">
          Pagina non trovata
        </h1>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          La pagina che stai cercando non esiste oppure è stata spostata.
        </p>

        <Link
          href="/"
          className="
            mt-10
            inline-flex
            rounded-full
            bg-white
            px-8
            py-3
            font-medium
            text-black
            transition
            hover:bg-zinc-200
          "
        >
          Torna alla Home
        </Link>

      </div>
    </main>
  );
}