import {
  Boxes,
  Factory,
  Users,
} from "lucide-react";


import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    icon: Boxes,
    category: "WEB PLATFORM",
    title: "Gestionale Produzione",
    description:
      "Piattaforma per monitorare ordini, produzione e stato delle lavorazioni.",
  },
  {
    icon: Users,
    category: "BUSINESS SOFTWARE",
    title: "CRM Aziendale",
    description:
      "Sistema centralizzato per la gestione di clienti, offerte e attività commerciali.",
  },
  {
    icon: Factory,
    category: "ENTERPRISE",
    title: "Portale Clienti",
    description:
      "Area riservata dove clienti e fornitori possono consultare documenti e pratiche.",
  },
];