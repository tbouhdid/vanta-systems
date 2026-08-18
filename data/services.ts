import {
  AppWindow,
  Cloud,
  Code2,
  Workflow,
} from "lucide-react";

import { Service } from "@/types/service";

export const services: Service[] = [
  {
    icon: Code2,
    title: "Sviluppo Software",
    description:
      "App web, piattaforme e gestionali personalizzati per le tue esigenze.",
    href: "/services/software-development",
  },
  {
    icon: AppWindow,
    title: "Siti Web & Landing Page",
    description:
      "Siti veloci, responsive e orientati alla conversione, progettati attorno al tuo brand.",
    href: "/services/websites-landing-pages",
  },
  {
    icon: Workflow,
    title: "Automazioni",
    description:
      "Automatizziamo processi ripetitivi per farti risparmiare tempo e risorse.",
    href: "/services/automation",
  },
  {
    icon: Cloud,
    title: "Integrazioni & API",
    description:
      "Colleghiamo sistemi, servizi e dati per un ecosistema efficiente.",
    href: "/services/system-integration",
  },
];
