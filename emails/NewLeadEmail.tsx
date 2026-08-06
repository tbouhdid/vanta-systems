import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components";

interface Props {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  message: string;
}

export default function NewLeadEmail({
  name,
  email,
  company,
  phone,
  projectType,
  budget,
  message,
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>Nuova richiesta di consulenza</Preview>

      <Body
        style={{
          background: "#090909",
          fontFamily:
            "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
          padding: "40px 0",
        }}
      >
        <Container
          style={{
            maxWidth: "620px",
            background: "#111111",
            border: "1px solid #222",
            borderRadius: "24px",
            padding: "48px",
          }}
        >
          <Heading
            style={{
              color: "#fff",
              marginTop: 0,
            }}
          >
            🚀 Nuova richiesta di consulenza
          </Heading>

          <Text style={{ color: "#d4d4d4" }}>
            <strong>Nome:</strong> {name}
          </Text>

          <Text style={{ color: "#d4d4d4" }}>
            <strong>Email:</strong> {email}
          </Text>

          <Text style={{ color: "#d4d4d4" }}>
            <strong>Azienda:</strong> {company || "-"}
          </Text>

          <Text style={{ color: "#d4d4d4" }}>
            <strong>Telefono:</strong> {phone || "-"}
          </Text>

          <Text style={{ color: "#d4d4d4" }}>
            <strong>Tipo di progetto:</strong> {projectType || "-"}
          </Text>

          <Text style={{ color: "#d4d4d4" }}>
            <strong>Budget indicativo:</strong> {budget || "-"}
          </Text>

          <Text style={{ color: "#fff", marginTop: "32px" }}>
            <strong>Messaggio</strong>
          </Text>

          <Text
            style={{
              color: "#d4d4d4",
              whiteSpace: "pre-wrap",
              lineHeight: "28px",
            }}
          >
            {message}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
