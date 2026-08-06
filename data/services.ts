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
  },
  {
    icon: Workflow,
    title: "Automazioni",
    description:
      "Automatizziamo processi ripetitivi per farti risparmiare tempo e risorse.",
  },
  {
    icon: Cloud,
    title: "Integrazioni & API",
    description:
      "Colleghiamo sistemi, servizi e dati per un ecosistema efficiente.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Consulenza & Strategy",
    description:
      "Analizziamo il tuo business e costruiamo la strategia digitale.",
  },
];
