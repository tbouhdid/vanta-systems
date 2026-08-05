import { NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";

import ContactConfirmationEmail from "@/emails/ContactConfirmationEmail";
import NewLeadEmail from "@/emails/NewLeadEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { name, email, company, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Compila tutti i campi obbligatori." },
                { status: 400 }
            );
        }

        // EMAIL A VANTA

        await resend.emails.send({
            from: "VANTA Systems <onboarding@resend.dev>",
            to: ["tahabouhdid01@gmail.com"],
            subject: `🚀 Nuova richiesta di consulenza - ${name}`,
            replyTo: email,
            html: await render(
                NewLeadEmail({
                    name,
                    email,
                    company,
                    message,
                })
            ),
        });

        // EMAIL AL CLIENTE

        await resend.emails.send({
            from: "VANTA Systems <onboarding@resend.dev>",
            to: [email],
            subject: "Abbiamo ricevuto la tua richiesta.",
            html: await render(
                ContactConfirmationEmail({
                    name,
                })
            ),
        });

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error: "Errore durante l'invio.",
            },
            {
                status: 500,
            }
        );
    }
}