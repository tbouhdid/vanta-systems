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

interface Props {
  name: string;
}

export default function ContactConfirmationEmail({ name }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Abbiamo ricevuto la tua richiesta.</Preview>

      <Body
        style={{
          backgroundColor: "#090909",
          fontFamily:
            "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
          padding: "40px 0",
        }}
      >
        <Container
          style={{
            maxWidth: "620px",
            backgroundColor: "#111111",
            border: "1px solid #222",
            borderRadius: "24px",
            overflow: "hidden",
          }}
        >
          <Section
            style={{
              padding: "48px",
              textAlign: "center",
              borderBottom: "1px solid #222",
            }}
          >
            <Heading
              style={{
                color: "#fff",
                fontSize: "34px",
                margin: 0,
                letterSpacing: "0.35em",
              }}
            >
              VANTA
            </Heading>

            <Text
              style={{
                color: "#888",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                marginTop: "18px",
              }}
            >
              Software Engineering • AI • Automation
            </Text>
          </Section>

          <Section
            style={{
              padding: "48px",
            }}
          >
            <Heading
              style={{
                color: "#fff",
                fontSize: "34px",
                lineHeight: "1.2",
              }}
            >
              Abbiamo ricevuto la tua richiesta.
            </Heading>

            <Text
              style={{
                color: "#d4d4d4",
                fontSize: "16px",
                lineHeight: "28px",
              }}
            >
              Ciao <strong>{name}</strong>,
            </Text>

            <Text
              style={{
                color: "#d4d4d4",
                fontSize: "16px",
                lineHeight: "28px",
              }}
            >
              grazie per aver contattato <strong>VANTA Systems</strong>.
            </Text>

            <Text
              style={{
                color: "#d4d4d4",
                fontSize: "16px",
                lineHeight: "28px",
              }}
            >
              Abbiamo ricevuto la tua richiesta e il nostro team la analizzerà
              con attenzione.
            </Text>

            <Text
              style={{
                color: "#d4d4d4",
                fontSize: "16px",
                lineHeight: "28px",
              }}
            >
              Ti ricontatteremo <strong>entro 48 ore lavorative</strong> per
              approfondire il progetto e organizzare una consulenza.
            </Text>

            <Button
              href="https://vantasystems.it"
              style={{
                background: "#fff",
                color: "#000",
                padding: "16px 28px",
                borderRadius: "999px",
                textDecoration: "none",
                fontWeight: 600,
                marginTop: "20px",
              }}
            >
              Visita il sito
            </Button>
          </Section>

          <Section
            style={{
              borderTop: "1px solid #222",
              padding: "40px",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                color: "#777",
                lineHeight: "28px",
              }}
            >
              <strong style={{ color: "#fff" }}>VANTA Systems</strong>
              <br />
              Building software that moves businesses forward.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}