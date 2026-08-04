import {
  BrainCircuit,
  Code2,
  Database,
  Workflow,
} from "lucide-react";

import { Service } from "@/types/service";

export const services: Service[] = [

  {
    icon: Code2,
    title: "Software su misura",
    description:
      "Applicazioni web e desktop sviluppate attorno ai processi della tua azienda.",
  },
  {
    icon: Workflow,
    title: "Automazioni",
    description:
      "Riduci il lavoro manuale automatizzando attività ripetitive e flussi operativi.",
  },
  {
    icon: Database,
    title: "Integrazione sistemi",
    description:
      "Colleghiamo CRM, ERP, API e servizi esterni in un unico ecosistema.",
  },
  {
    icon: BrainCircuit,
    title: "Intelligenza Artificiale",
    description:
      "Implementiamo AI per analisi dati, assistenti virtuali e automazioni intelligenti.",
  },
];