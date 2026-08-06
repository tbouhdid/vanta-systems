import { Code2, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";

const footerLinks = ["Home", "Servizi", "Soluzioni", "Progetti", "Chi Siamo", "Contatti"];
const serviceLinks = [
  "Sviluppo Software",
  "Automazioni",
  "Integrazioni & API",
  "Consulenza & Strategy",
];

export default function Footer() {
  return (
    <footer className="bg-[#0b0c0d] pb-5">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 border-b border-white/[0.12] py-8 sm:grid-cols-2 lg:grid-cols-[1.45fr_0.75fr_0.95fr_1fr] lg:gap-8 lg:py-10">
          <div>
            <Link href="/#home" className="flex w-fit flex-col leading-none">
              <span className="text-[17px] font-bold tracking-[0.38em] text-white">VANTA</span>
              <span className="mt-1 text-[7px] font-semibold tracking-[0.46em] text-zinc-300">SYSTEMS</span>
            </Link>
            <p className="mt-4 max-w-[212px] text-[11px] leading-5 text-zinc-400">
              Software su misura, automazioni intelligenti e strategie per far crescere il tuo business.
            </p>
            <div className="mt-4 flex gap-3 text-zinc-300">
              <Link aria-label="LinkedIn" href="/#contact" className="hover:text-white"><MessageCircle className="size-4" /></Link>
              <Link aria-label="GitHub" href="/#contact" className="hover:text-white"><Code2 className="size-4" /></Link>
              <a aria-label="Email" href="mailto:hello@vantasystems.it" className="hover:text-white"><Mail className="size-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-medium text-white">Navigazione</h4>
            <ul className="mt-4 space-y-1.5 text-[11px] text-zinc-400">
              {footerLinks.map((link) => (
                <li key={link}>
                  <Link href={footerHref(link)} className="hover:text-white">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-medium text-white">Servizi</h4>
            <ul className="mt-4 space-y-1.5 text-[11px] text-zinc-400">
              {serviceLinks.map((link) => (
                <li key={link}><Link href="/#services" className="hover:text-white">{link}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-medium text-white">Contatti</h4>
            <ul className="mt-4 space-y-2 text-[11px] text-zinc-400">
              <li><a href="mailto:hello@vantasystems.it" className="hover:text-white">hello@vantasystems.it</a></li>
              <li><a href="tel:+391234567890" className="hover:text-white">+39 123 456 7890</a></li>
              <li>Parma, Italia</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 py-4 text-[10px] text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Vanta Systems S.r.l. – P.IVA 12345678901 – Tutti i diritti riservati</span>
          <span className="flex gap-5"><Link href="/#contact" className="hover:text-zinc-300">Privacy Policy</Link><Link href="/#contact" className="hover:text-zinc-300">Cookie Policy</Link></span>
        </div>
      </div>
    </footer>
  );
}

function footerHref(label: string) {
  const anchors: Record<string, string> = {
    Home: "/#home",
    Servizi: "/#services",
    Soluzioni: "/#services",
    Progetti: "/#projects",
    "Chi Siamo": "/#about",
    Contatti: "/#contact",
  };

  return anchors[label] ?? "#home";
}
