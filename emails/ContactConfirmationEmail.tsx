import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type ContactConfirmationEmailProps = {
  name: string;
  projectType?: string;
};

const siteUrl = "https://vantasystems.it";
const contactEmail = "hello@vantasystems.it";

export function getContactConfirmationText({
  name,
  projectType,
}: ContactConfirmationEmailProps) {
  const selectedService = projectType
    ? `\nInteresse selezionato: ${projectType}`
    : "";

  return `Ciao ${name},

grazie per aver contattato VANTA Systems.

Abbiamo ricevuto correttamente la tua richiesta di consulenza.

Analizzeremo le informazioni che ci hai inviato e ti ricontatteremo direttamente a questo indirizzo per approfondire le tue esigenze e valutare la soluzione più adatta.

RICHIESTA RICEVUTA
Stato: In valutazione${selectedService}

Visita VANTA Systems: ${siteUrl}

VANTA SYSTEMS
Software · Automation · AI
${contactEmail}
vantasystems.it

Hai ricevuto questa email perché hai inviato una richiesta di consulenza tramite vantasystems.it.`;
}

export default function ContactConfirmationEmail({
  name,
  projectType,
}: ContactConfirmationEmailProps) {
  return (
    <Html lang="it">
      <Head />
      <Preview>Abbiamo ricevuto la tua richiesta | VANTA Systems</Preview>

      <Body
        style={{
          margin: "0",
          backgroundColor: "#0b0c0d",
          color: "#f4f4f3",
          fontFamily: "Arial, Helvetica, sans-serif",
          padding: "24px 12px",
        }}
      >
        <Container
          style={{
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#111213",
            border: "1px solid #313336",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Section
            style={{
              backgroundColor: "#0b0c0d",
              borderBottom: "1px solid #313336",
              padding: "28px 32px 24px",
            }}
          >
            <Heading
              as="h1"
              style={{
                margin: "0",
                color: "#f4f4f3",
                fontSize: "16px",
                fontWeight: 700,
                letterSpacing: "3px",
                lineHeight: "20px",
              }}
            >
              VANTA SYSTEMS
            </Heading>
            <Text
              style={{
                margin: "8px 0 0",
                color: "#a8adb4",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "1.8px",
                lineHeight: "14px",
              }}
            >
              SOFTWARE · AUTOMATION · AI
            </Text>
          </Section>

          <Section style={{ padding: "32px" }}>
            <Text
              style={{
                margin: "0 0 18px",
                color: "#f4f4f3",
                fontSize: "16px",
                lineHeight: "26px",
              }}
            >
              Ciao {name},
            </Text>

            <Text
              style={{
                margin: "0 0 18px",
                color: "#d6d8dc",
                fontSize: "15px",
                lineHeight: "25px",
              }}
            >
              grazie per aver contattato VANTA Systems.
            </Text>

            <Text
              style={{
                margin: "0 0 18px",
                color: "#d6d8dc",
                fontSize: "15px",
                lineHeight: "25px",
              }}
            >
              Abbiamo ricevuto correttamente la tua richiesta di consulenza.
            </Text>

            <Text
              style={{
                margin: "0",
                color: "#d6d8dc",
                fontSize: "15px",
                lineHeight: "25px",
              }}
            >
              Analizzeremo le informazioni che ci hai inviato e ti
              ricontatteremo direttamente a questo indirizzo per approfondire le
              tue esigenze e valutare la soluzione più adatta.
            </Text>

            <Section
              style={{
                marginTop: "28px",
                backgroundColor: "#151617",
                border: "1px solid #3a3d41",
                borderRadius: "6px",
                padding: "18px 20px",
              }}
            >
              <Text
                style={{
                  margin: "0 0 8px",
                  color: "#a8adb4",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  lineHeight: "14px",
                }}
              >
                RICHIESTA RICEVUTA
              </Text>
              <Text
                style={{
                  margin: "0",
                  color: "#f4f4f3",
                  fontSize: "14px",
                  lineHeight: "22px",
                }}
              >
                <strong>Stato:</strong> In valutazione
              </Text>
              {projectType ? (
                <Text
                  style={{
                    margin: "6px 0 0",
                    color: "#d6d8dc",
                    fontSize: "14px",
                    lineHeight: "22px",
                  }}
                >
                  <strong>Interesse:</strong> {projectType}
                </Text>
              ) : null}
            </Section>

            <Section style={{ marginTop: "28px" }}>
              <Button
                href={siteUrl}
                style={{
                  display: "inline-block",
                  backgroundColor: "#d6d8dc",
                  borderRadius: "4px",
                  color: "#111213",
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "20px",
                  padding: "12px 18px",
                  textDecoration: "none",
                }}
              >
                Visita VANTA Systems
              </Button>
            </Section>
          </Section>

          <Section
            style={{
              backgroundColor: "#0b0c0d",
              borderTop: "1px solid #313336",
              padding: "24px 32px",
            }}
          >
            <Text
              style={{
                margin: "0",
                color: "#f4f4f3",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1.5px",
                lineHeight: "16px",
              }}
            >
              VANTA SYSTEMS
            </Text>
            <Text
              style={{
                margin: "5px 0 0",
                color: "#a8adb4",
                fontSize: "11px",
                lineHeight: "18px",
              }}
            >
              Software · Automation · AI
              <br />
              <a
                href={`mailto:${contactEmail}`}
                style={{ color: "#d6d8dc", textDecoration: "underline" }}
              >
                {contactEmail}
              </a>
              <br />
              <a
                href={siteUrl}
                style={{ color: "#d6d8dc", textDecoration: "underline" }}
              >
                vantasystems.it
              </a>
            </Text>
            <Text
              style={{
                margin: "18px 0 0",
                color: "#8d939b",
                fontSize: "10px",
                lineHeight: "16px",
              }}
            >
              Hai ricevuto questa email perché hai inviato una richiesta di
              consulenza tramite vantasystems.it.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
