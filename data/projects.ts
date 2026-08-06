import type { Project, ProjectSlug } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "vanta-crm",
    title: "VANTA CRM",
    heroTitle: "Relazioni commerciali, finalmente connesse.",
    description:
      "CRM moderno per la gestione di clienti, offerte e trattative commerciali.",
    badge: "Concept Demo",
    preview: "crm",
    problem: {
      title: "Dati commerciali frammentati rallentano ogni opportunità.",
      description:
        "Quando contatti, offerte e attività vivono in fogli di calcolo diversi, il team perde visibilità e le trattative perdono continuità.",
      points: [
        "Storico cliente sempre aggiornato",
        "Pipeline commerciale leggibile in un colpo d'occhio",
        "Promemoria e attività condivise dal team",
      ],
    },
    features: [
      {
        title: "Vista cliente 360°",
        description: "Contatti, trattative, documenti e attività riuniti in una sola scheda.",
      },
      {
        title: "Pipeline configurabile",
        description: "Fasi commerciali modellate sul processo reale della tua azienda.",
      },
      {
        title: "Offerte e preventivi",
        description: "Crea, invia e monitora proposte senza uscire dalla piattaforma.",
      },
      {
        title: "Dashboard e report",
        description: "KPI chiari per prendere decisioni commerciali più rapide.",
      },
    ],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "API & integrazioni"],
    benefits: [
      "Riduce il tempo speso per cercare informazioni",
      "Rende le opportunità commerciali più prevedibili",
      "Allinea sales, amministrazione e direzione",
    ],
    faqs: [
      {
        question: "Può integrarsi con email e strumenti già in uso?",
        answer: "Sì. Il concept è pensato per collegare inbox, ERP, strumenti di marketing e servizi tramite API.",
      },
      {
        question: "È possibile personalizzare pipeline e campi?",
        answer: "Sì. Ogni flusso, stato e dato può essere progettato intorno al processo commerciale dell'azienda.",
      },
      {
        question: "Questo è un cliente reale di VANTA?",
        answer: "No. VANTA CRM è un Concept Case Study dimostrativo che mostra una tipologia di soluzione realizzabile.",
      },
    ],
  },
  {
    slug: "vanta-flow",
    title: "VANTA FLOW",
    heroTitle: "Ogni processo, al posto giusto.",
    description:
      "Sistema di automazione per digitalizzare processi aziendali e workflow.",
    badge: "Concept Demo",
    preview: "flow",
    problem: {
      title: "I passaggi manuali generano ritardi, errori e poca tracciabilità.",
      description:
        "Attività ripetitive, approvazioni via email e passaggi tra reparti rendono i processi difficili da misurare e migliorare.",
      points: [
        "Workflow visuali per processi anche complessi",
        "Regole, notifiche e approvazioni automatiche",
        "Storico completo di ogni esecuzione",
      ],
    },
    features: [
      {
        title: "Builder visuale",
        description: "Progetta processi con trigger, regole e azioni facilmente comprensibili.",
      },
      {
        title: "Automazioni connesse",
        description: "Collega sistemi, moduli e servizi esterni con API e webhook.",
      },
      {
        title: "Regole di approvazione",
        description: "Assegna responsabilità e gestisci eccezioni senza perdere il controllo.",
      },
      {
        title: "Monitoraggio in tempo reale",
        description: "Individua colli di bottiglia e processi da ottimizzare con dati concreti.",
      },
    ],
    technologies: ["Next.js", "Webhook", "API REST", "AI automation"],
    benefits: [
      "Riduce attività ripetitive e passaggi manuali",
      "Aumenta la coerenza operativa tra reparti",
      "Crea una base misurabile per il miglioramento continuo",
    ],
    faqs: [
      {
        question: "Può automatizzare processi già esistenti?",
        answer: "Sì. Il punto di partenza è l'analisi del processo attuale, per digitalizzarlo senza imporre schemi rigidi.",
      },
      {
        question: "Può comunicare con software diversi?",
        answer: "Sì. Le integrazioni possono essere progettate tramite API, webhook, database o servizi specifici.",
      },
      {
        question: "VANTA FLOW è un prodotto già venduto?",
        answer: "No. È un Concept Case Study che rappresenta il tipo di piattaforma su misura che VANTA può sviluppare.",
      },
    ],
  },
  {
    slug: "vanta-factory",
    title: "VANTA Factory",
    heroTitle: "Produzione, ordini e KPI in un’unica regia.",
    description:
      "Gestionale per produzione, ordini, magazzino e KPI industriali.",
    badge: "Concept Demo",
    preview: "factory",
    problem: {
      title: "Quando i reparti lavorano su dati diversi, la produzione perde ritmo.",
      description:
        "Ordini, avanzamenti, disponibilità di magazzino e KPI distribuiti in strumenti separati rendono difficile reagire in tempo.",
      points: [
        "Stato della produzione sempre aggiornato",
        "Ordini e materiali tracciati dall'inizio alla consegna",
        "KPI industriali leggibili anche per la direzione",
      ],
    },
    features: [
      {
        title: "Pianificazione ordini",
        description: "Organizza priorità, fasi e assegnazioni sulla capacità produttiva reale.",
      },
      {
        title: "Magazzino integrato",
        description: "Controlla disponibilità, movimenti e soglie di riordino nello stesso ambiente.",
      },
      {
        title: "Dashboard operative",
        description: "Visualizza avanzamento, efficienza, scarti e carichi di lavoro in tempo reale.",
      },
      {
        title: "Ruoli e reparti",
        description: "Interfacce e permessi calibrati per ufficio, reparto produttivo e management.",
      },
    ],
    technologies: ["Next.js", "PostgreSQL", "Realtime data", "IoT & API"],
    benefits: [
      "Migliora la visibilità su produzione e magazzino",
      "Riduce ritardi dovuti a informazioni non allineate",
      "Supporta decisioni industriali basate su KPI aggiornati",
    ],
    faqs: [
      {
        question: "Può collegarsi a macchinari o software ERP?",
        answer: "Sì. L'architettura può essere progettata per ricevere dati da macchinari, gestionali ed ecosistemi esistenti.",
      },
      {
        question: "È adatto anche a produzioni su commessa?",
        answer: "Sì. Flussi, schermate e KPI possono essere disegnati per produzioni discrete, su commessa o miste.",
      },
      {
        question: "Il case study rappresenta un'azienda reale?",
        answer: "No. VANTA Factory è un concept dimostrativo, non un progetto attribuito a un cliente reale.",
      },
    ],
  },
  {
    slug: "vanta-desk",
    title: "VANTA Desk",
    heroTitle: "Un’area clienti che lavora anche quando il team non è online.",
    description:
      "Portale clienti con documenti, ticket, assistenza e area riservata.",
    badge: "Concept Demo",
    preview: "desk",
    problem: {
      title: "Richieste, documenti e assistenza dispersi rendono l’esperienza cliente meno fluida.",
      description:
        "Email, allegati e richieste di supporto si moltiplicano facilmente, creando tempi di risposta lunghi e poca visibilità per entrambe le parti.",
      points: [
        "Documenti disponibili in autonomia e in sicurezza",
        "Ticket e assistenza con priorità e stato chiaro",
        "Area riservata personalizzata per ogni cliente",
      ],
    },
    features: [
      {
        title: "Document center",
        description: "Condividi contratti, report, fatture e file con permessi granulari.",
      },
      {
        title: "Ticketing integrato",
        description: "Raccogli richieste, assegna priorità e aggiorna il cliente in modo trasparente.",
      },
      {
        title: "Area riservata brandizzata",
        description: "Un'esperienza coerente con l'identità del cliente e del tuo brand.",
      },
      {
        title: "Notifiche intelligenti",
        description: "Avvisa utenti e team nei momenti davvero rilevanti, senza rumore.",
      },
    ],
    technologies: ["Next.js", "Role-based access", "Secure storage", "API & notifiche"],
    benefits: [
      "Migliora l'autonomia e la soddisfazione dei clienti",
      "Riduce richieste ripetitive al team operativo",
      "Centralizza assistenza, documenti e comunicazioni",
    ],
    faqs: [
      {
        question: "Ogni cliente può vedere solo i propri dati?",
        answer: "Sì. Il concept prevede ruoli, permessi e spazi riservati configurati in base alle necessità del business.",
      },
      {
        question: "Può integrarsi con il CRM o il gestionale?",
        answer: "Sì. Il portale può diventare un punto di accesso connesso agli strumenti già utilizzati dall'azienda.",
      },
      {
        question: "VANTA Desk è un progetto di un cliente reale?",
        answer: "No. È un Concept Case Study creato per mostrare un esempio di portale clienti realizzabile su misura.",
      },
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function isProjectSlug(slug: string): slug is ProjectSlug {
  return projects.some((project) => project.slug === slug);
}
