import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { ReactNode } from "react";

import {
  getAgencyEngagementLabel,
  type ContactLead,
  type LeadCategory,
} from "@/lib/contactLead";

type NewLeadEmailProps = ContactLead & {
  leadCategory: LeadCategory;
  submittedAt: string;
  sourcePath?: string;
};

const colors = {
  background: "#090909",
  panel: "#111111",
  panelMuted: "#151617",
  border: "#303236",
  text: "#f4f4f3",
  textMuted: "#d6d8dc",
  label: "#a8adb4",
  agencyAccent: "#9aafd9",
};

function Detail({ label, value }: { label: string; value?: string }) {
  if (!value) {
    return null;
  }

  return (
    <Text
      style={{
        color: colors.textMuted,
        fontSize: "14px",
        lineHeight: "22px",
        margin: "0 0 7px",
      }}
    >
      <strong style={{ color: colors.text }}>{label}:</strong> {value}
    </Text>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <Text
      style={{
        color: colors.label,
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "1.6px",
        lineHeight: "14px",
        margin: "0 0 12px",
      }}
    >
      {children}
    </Text>
  );
}

function EmailSection({ children }: { children: ReactNode }) {
  return (
    <Section
      style={{
        borderTop: `1px solid ${colors.border}`,
        paddingTop: "22px",
        marginTop: "22px",
      }}
    >
      {children}
    </Section>
  );
}

function EmailShell({
  preview,
  heading,
  agency = false,
  children,
}: {
  preview: string;
  heading: string;
  agency?: boolean;
  children: ReactNode;
}) {
  return (
    <Html lang="it">
      <Head />
      <Preview>{preview}</Preview>
      <Body
        style={{
          backgroundColor: colors.background,
          fontFamily: "Arial, Helvetica, sans-serif",
          margin: "0",
          padding: "24px 12px",
        }}
      >
        <Container
          style={{
            backgroundColor: colors.panel,
            border: `1px solid ${agency ? "#536b9c" : colors.border}`,
            margin: "0 auto",
            maxWidth: "620px",
            padding: "36px 32px",
            width: "100%",
          }}
        >
          <Text
            style={{
              color: agency ? colors.agencyAccent : colors.label,
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "1.8px",
              lineHeight: "14px",
              margin: "0 0 10px",
            }}
          >
            {agency ? "VANTA FOR AGENCIES" : "VANTA SYSTEMS"}
          </Text>
          <Heading
            as="h1"
            style={{
              color: colors.text,
              fontSize: "22px",
              fontWeight: 700,
              lineHeight: "30px",
              margin: "0",
            }}
          >
            {heading}
          </Heading>
          {children}
        </Container>
      </Body>
    </Html>
  );
}

function SoftwareSolutionsEmail(props: NewLeadEmailProps) {
  return (
    <EmailShell
      preview="Nuova richiesta Software Solutions"
      heading="NUOVA RICHIESTA SOFTWARE SOLUTIONS"
    >
      <Section
        style={{
          backgroundColor: colors.panelMuted,
          border: `1px solid ${colors.border}`,
          marginTop: "24px",
          padding: "18px 20px",
        }}
      >
        <SectionLabel>RIEPILOGO</SectionLabel>
        <Detail label="Categoria" value="Software Solutions" />
        <Detail label="Servizio richiesto" value={props.projectType} />
        <Detail label="Fascia di budget" value={props.budget} />
      </Section>

      <EmailSection>
        <SectionLabel>CONTATTO</SectionLabel>
        <Detail label="Nome e cognome" value={props.name} />
        <Detail label="Azienda" value={props.company} />
        <Detail label="Email" value={props.email} />
        <Detail label="Telefono" value={props.phone} />
      </EmailSection>

      <EmailSection>
        <SectionLabel>DESCRIZIONE DEL PROGETTO</SectionLabel>
        <Text
          style={{
            color: colors.textMuted,
            fontSize: "14px",
            lineHeight: "23px",
            margin: "0",
            whiteSpace: "pre-wrap",
          }}
        >
          {props.message}
        </Text>
      </EmailSection>

      <EmailSection>
        <SectionLabel>INFORMAZIONI DELLA RICHIESTA</SectionLabel>
        <Detail label="Data e ora" value={props.submittedAt} />
      </EmailSection>
    </EmailShell>
  );
}

function AgencyEmail(props: NewLeadEmailProps) {
  const engagement = getAgencyEngagementLabel(props.leadCategory);

  return (
    <EmailShell
      preview={`Nuova richiesta VANTA for Agencies · ${engagement}`}
      heading="NUOVA RICHIESTA VANTA FOR AGENCIES"
      agency
    >
      <Section
        style={{
          backgroundColor: "#151922",
          border: "1px solid #536b9c",
          marginTop: "24px",
          padding: "18px 20px",
        }}
      >
        <SectionLabel>RIEPILOGO RAPIDO</SectionLabel>
        <Detail label="Tipologia" value={engagement} />
        <Detail label="Nome dell’agenzia" value={props.company} />
        <Detail label="Referente" value={props.name} />
        <Detail label="Fascia di budget" value={props.budget} />
        <Detail label="Scadenza desiderata" value={props.deadline} />
        <Detail label="Stato dei materiali" value={props.materialsStatus} />
      </Section>

      <EmailSection>
        <SectionLabel>PARTNER</SectionLabel>
        <Detail label="Nome e cognome" value={props.name} />
        <Detail label="Email professionale" value={props.email} />
        <Detail label="Telefono" value={props.phone} />
        <Detail label="Agenzia o studio" value={props.company} />
        <Detail label="Sito dell’agenzia" value={props.website} />
      </EmailSection>

      <EmailSection>
        <SectionLabel>PROGETTO</SectionLabel>
        <Detail label="Tipologia di progetto" value={props.projectCategory} />
        <Detail label="Servizio selezionato" value={props.projectType} />
        <Detail label="Scadenza desiderata" value={props.deadline} />
        <Detail label="Stato dei materiali" value={props.materialsStatus} />
        <Detail label="Fascia di budget" value={props.budget} />
      </EmailSection>

      <EmailSection>
        <SectionLabel>BRIEF</SectionLabel>
        <Text
          style={{
            color: colors.textMuted,
            fontSize: "14px",
            lineHeight: "23px",
            margin: "0",
            whiteSpace: "pre-wrap",
          }}
        >
          {props.message}
        </Text>
      </EmailSection>

      <EmailSection>
        <SectionLabel>INFORMAZIONI DELLA RICHIESTA</SectionLabel>
        <Detail label="Data e ora" value={props.submittedAt} />
        <Detail label="Pagina di provenienza" value={props.sourcePath} />
      </EmailSection>
    </EmailShell>
  );
}

export function getNewLeadEmailText(props: NewLeadEmailProps) {
  const isAgency = props.leadCategory !== "software-solutions";
  const engagement = isAgency
    ? getAgencyEngagementLabel(props.leadCategory)
    : "";
  const optionalLine = (label: string, value?: string) =>
    value ? `${label}: ${value}` : "";
  const lines = (...values: string[]) => values.filter(Boolean).join("\n");

  if (!isAgency) {
    return lines(
      "NUOVA RICHIESTA SOFTWARE SOLUTIONS",
      "",
      "RIEPILOGO",
      "Categoria: Software Solutions",
      optionalLine("Servizio richiesto", props.projectType),
      optionalLine("Fascia di budget", props.budget),
      "",
      "CONTATTO",
      optionalLine("Nome e cognome", props.name),
      optionalLine("Azienda", props.company),
      optionalLine("Email", props.email),
      optionalLine("Telefono", props.phone),
      "",
      "DESCRIZIONE DEL PROGETTO",
      props.message,
      "",
      "INFORMAZIONI DELLA RICHIESTA",
      optionalLine("Data e ora", props.submittedAt),
    );
  }

  return lines(
    "NUOVA RICHIESTA VANTA FOR AGENCIES",
    "",
    "RIEPILOGO RAPIDO",
    optionalLine("Tipologia", engagement),
    optionalLine("Nome dell’agenzia", props.company),
    optionalLine("Referente", props.name),
    optionalLine("Fascia di budget", props.budget),
    optionalLine("Scadenza desiderata", props.deadline),
    optionalLine("Stato dei materiali", props.materialsStatus),
    "",
    "PARTNER",
    optionalLine("Nome e cognome", props.name),
    optionalLine("Email professionale", props.email),
    optionalLine("Telefono", props.phone),
    optionalLine("Agenzia o studio", props.company),
    optionalLine("Sito dell’agenzia", props.website),
    "",
    "PROGETTO",
    optionalLine("Tipologia di progetto", props.projectCategory),
    optionalLine("Servizio selezionato", props.projectType),
    optionalLine("Scadenza desiderata", props.deadline),
    optionalLine("Stato dei materiali", props.materialsStatus),
    optionalLine("Fascia di budget", props.budget),
    "",
    "BRIEF",
    props.message,
    "",
    "INFORMAZIONI DELLA RICHIESTA",
    optionalLine("Data e ora", props.submittedAt),
    optionalLine("Pagina di provenienza", props.sourcePath),
  );
}

export default function NewLeadEmail(props: NewLeadEmailProps) {
  return props.leadCategory === "software-solutions" ? (
    <SoftwareSolutionsEmail {...props} />
  ) : (
    <AgencyEmail {...props} />
  );
}
