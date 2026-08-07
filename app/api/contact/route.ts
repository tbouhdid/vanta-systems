import { render } from "@react-email/render";
import { NextResponse } from "next/server";
import { Resend } from "resend";

import ContactConfirmationEmail, {
  getContactConfirmationText,
} from "@/emails/ContactConfirmationEmail";
import NewLeadEmail from "@/emails/NewLeadEmail";

export const runtime = "nodejs";

const contactRecipient = "hello@vantasystems.it";
const sender = "VANTA Systems <hello@vantasystems.it>";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactRequest = {
  name: string;
  email: string;
  company: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
};

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function readContactRequest(payload: unknown): ContactRequest | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const values = payload as Record<string, unknown>;

  return {
    name: readString(values.name),
    email: readString(values.email),
    company: readString(values.company),
    phone: readString(values.phone),
    projectType: readString(values.projectType),
    budget: readString(values.budget),
    message: readString(values.message),
  };
}

function formatSubmissionTime() {
  return new Intl.DateTimeFormat("it-IT", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Rome",
  }).format(new Date());
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Dati della richiesta non validi." },
      { status: 400 },
    );
  }

  const contact = readContactRequest(payload);

  if (
    !contact ||
    !contact.name ||
    !contact.email ||
    !emailPattern.test(contact.email) ||
    !contact.message
  ) {
    return NextResponse.json(
      { error: "Compila tutti i campi obbligatori." },
      { status: 400 },
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.error("RESEND_API_KEY is not configured.");

    return NextResponse.json(
      {
        error: "Non è stato possibile inviare la richiesta. Riprova tra poco.",
      },
      { status: 500 },
    );
  }

  const resend = new Resend(resendApiKey);
  const submittedAt = formatSubmissionTime();

  try {
    const { data, error } = await resend.emails.send({
      from: sender,
      to: [contactRecipient],
      subject: `Nuova richiesta di consulenza | ${contact.name}`,
      replyTo: contact.email,
      html: await render(
        NewLeadEmail({
          ...contact,
          submittedAt,
        }),
      ),
    });

    if (error) {
      console.error("Unable to send the internal contact email.", error);

      return NextResponse.json(
        {
          error:
            "Non è stato possibile inviare la richiesta. Riprova tra poco.",
        },
        { status: 500 },
      );
    }

    if (data?.id) {
      console.info("Internal contact email accepted by Resend.", {
        emailId: data.id,
      });
    }
  } catch (error) {
    console.error("Unable to send the internal contact email.", error);

    return NextResponse.json(
      {
        error: "Non è stato possibile inviare la richiesta. Riprova tra poco.",
      },
      { status: 500 },
    );
  }

  let confirmationSent = true;

  try {
    const { data, error } = await resend.emails.send({
      from: sender,
      to: [contact.email],
      subject: "Abbiamo ricevuto la tua richiesta | VANTA Systems",
      replyTo: contactRecipient,
      html: await render(
        ContactConfirmationEmail({
          name: contact.name,
          projectType: contact.projectType || undefined,
        }),
      ),
      text: getContactConfirmationText({
        name: contact.name,
        projectType: contact.projectType || undefined,
      }),
    });

    if (error) {
      confirmationSent = false;
      console.error("Unable to send the customer confirmation email.", error);
    } else if (data?.id) {
      console.info("Customer confirmation email accepted by Resend.", {
        emailId: data.id,
      });
    }
  } catch (error) {
    confirmationSent = false;
    console.error("Unable to send the customer confirmation email.", error);
  }

  return NextResponse.json({ success: true, confirmationSent });
}
