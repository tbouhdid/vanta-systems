import {
  ChartNoAxesCombined,
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
  {
    icon: ChartNoAxesCombined,
    title: "Consulenza & Strategy",
    description:
      "Analizziamo il tuo business e costruiamo la strategia digitale.",
    href: "/services/consulting-strategy",
  },
];
