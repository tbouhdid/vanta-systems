import ContactIntake from "@/components/contact/ContactIntake";

type ContactPageProps = {
  searchParams: Promise<{ service?: string | string[] }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const service = typeof params.service === "string" ? params.service : null;

  return <ContactIntake initialService={service} />;
}
