import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Code2,
  Cpu,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import InteractiveMockup from "@/components/projects/InteractiveMockup";
import Container from "@/components/shared/Container";
import { getProjectBySlug, projects } from "@/data/projects";

const featureIcons = [Workflow, Cpu, Code2, ShieldCheck];

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Concept Case Study non trovato" };
  }

  return {
    title: `${project.title} — Concept Case Study`,
    description: project.description,
  };
}

export default async function ProjectPage(
  props: PageProps<"/projects/[slug]">
) {
  const { slug } = await props.params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#0b0c0d]">
        <section className="relative isolate overflow-hidden pb-16 pt-10 sm:pb-20 sm:pt-12 lg:pb-24">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(circle_at_58%_8%,rgba(214,216,220,0.14),transparent_36%)]" />
          <Container>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-[12px] text-zinc-400 transition hover:text-white"
            >
              <ArrowLeft className="size-3.5" />
              Torna ai Concept Case Study
            </Link>

            <div className="mt-10 max-w-[780px]">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#8d939b]/50 bg-white/[0.04] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#d6d8dc]">
                <span className="size-1.5 rounded-full bg-[#bfc3c9]" />
                Concept Case Study
              </span>
              <h1 className="mt-5 font-heading text-[40px] font-medium leading-[1.04] tracking-[-0.055em] text-white sm:text-[56px] lg:text-[68px]">
                {project.heroTitle}
              </h1>
              <p className="mt-5 max-w-[640px] text-[15px] leading-7 text-zinc-300 sm:text-[17px]">
                {project.description}
              </p>
              <p className="mt-4 max-w-[660px] border-l border-[#8d939b] pl-3 text-[12px] leading-5 text-[#a8adb4]">
                Questo è un concept dimostrativo: non rappresenta un cliente reale, ma un esempio concreto di software su misura che VANTA può progettare e sviluppare.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center gap-2 rounded-md bg-[#d6d8dc] px-4 text-[12px] font-medium text-[#111213] transition hover:bg-white"
                >
                  Parla del tuo progetto <ArrowRight className="size-3.5" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex h-11 items-center gap-2 rounded-md border border-white/25 px-4 text-[12px] font-medium text-white transition hover:border-white/60 hover:bg-white/5"
                >
                  Esplora le funzionalità <ArrowRight className="size-3.5" />
                </a>
              </div>
            </div>

            <div className="mt-12 lg:mt-16">
              <InteractiveMockup variant={project.preview} productName={project.title} />
              <p className="mt-3 text-center text-[10px] text-zinc-500">
                Selettore Theme dimostrativo: mostra come l&apos;interfaccia possa adattarsi all&apos;identità del tuo brand.
              </p>
            </div>
          </Container>
        </section>

        <section className="border-y border-white/[0.08] bg-[#111213] py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.83fr_1.17fr] lg:gap-20">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">Il problema che risolve</p>
                <h2 className="mt-3 font-heading text-[30px] font-medium leading-[1.1] tracking-[-0.045em] text-white sm:text-[39px]">
                  {project.problem.title}
                </h2>
              </div>
              <div>
                <p className="max-w-[620px] text-[15px] leading-7 text-zinc-300 sm:text-[16px]">{project.problem.description}</p>
                <ul className="mt-7 grid gap-3 sm:grid-cols-3">
                  {project.problem.points.map((point) => (
                    <li key={point} className="rounded-lg border border-white/[0.08] bg-white/[0.035] p-4 text-[12px] leading-5 text-zinc-200">
                      <CheckCircle2 className="mb-3 size-4 text-[#d6d8dc]" strokeWidth={1.6} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        <section id="features" className="bg-[#f3f3f1] py-16 text-[#111213] sm:py-20 lg:py-24">
          <Container>
            <div className="max-w-[590px]">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6b6d70]">Funzionalità principali</p>
              <h2 className="mt-3 font-heading text-[32px] font-medium tracking-[-0.045em] sm:text-[42px]">Un software progettato intorno al lavoro reale.</h2>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {project.features.map((feature, index) => {
                const Icon = featureIcons[index % featureIcons.length];
                return (
                  <article key={feature.title} className="group rounded-xl border border-[#d6d8dc] bg-[#fafaf8] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#a8adb4] hover:shadow-[0_16px_32px_rgba(17,18,19,0.08)] sm:p-6">
                    <div className="flex size-10 items-center justify-center rounded-lg border border-[#bfc3c9] bg-[#ececea] text-[#1a1b1d] transition duration-300 group-hover:bg-[#d6d8dc]">
                      <Icon className="size-[19px]" strokeWidth={1.55} />
                    </div>
                    <h3 className="mt-6 font-heading text-[19px] font-medium tracking-[-0.03em]">{feature.title}</h3>
                    <p className="mt-2 max-w-[460px] text-[13px] leading-6 text-[#55585c]">{feature.description}</p>
                  </article>
                );
              })}
            </div>
          </Container>
        </section>

        <section className="bg-[#0b0c0d] py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">Tecnologie utilizzate</p>
                <h2 className="mt-3 font-heading text-[31px] font-medium tracking-[-0.045em] text-white sm:text-[40px]">Solido oggi, pronto per evolvere domani.</h2>
                <div className="mt-7 flex flex-wrap gap-2.5">
                  {project.technologies.map((technology) => (
                    <span key={technology} className="rounded-full border border-white/[0.14] bg-white/[0.04] px-3.5 py-2 text-[12px] text-[#d6d8dc]">{technology}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/[0.09] bg-white/[0.035] p-6 sm:p-8">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">Benefici per l&apos;azienda</p>
                <ul className="mt-6 space-y-4">
                  {project.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-3 text-[14px] leading-6 text-zinc-200">
                      <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#d6d8dc] text-[#111213]"><CheckCircle2 className="size-3" strokeWidth={2.1} /></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-[#f3f3f1] py-16 text-[#111213] sm:py-20 lg:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6b6d70]">FAQ</p>
                <h2 className="mt-3 font-heading text-[32px] font-medium tracking-[-0.045em] sm:text-[42px]">Domande frequenti.</h2>
                <p className="mt-4 max-w-[330px] text-[14px] leading-6 text-[#55585c]">Ogni concept nasce per aprire una conversazione sulle esigenze reali della tua azienda.</p>
              </div>
              <div className="divide-y divide-[#d6d8dc] border-y border-[#d6d8dc]">
                {project.faqs.map((faq) => (
                  <details key={faq.question} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[15px] font-medium">
                      {faq.question}
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-[#bfc3c9] text-[16px] font-normal leading-none transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="max-w-[680px] pt-3 pr-10 text-[13px] leading-6 text-[#55585c]">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-[#0b0c0d] px-5 pb-14 sm:px-8 lg:px-12 lg:pb-16">
          <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-2xl border border-[#4b4e52] bg-[#121314] px-6 py-9 sm:px-10 sm:py-11">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#bfc3c9]/15 blur-[90px]" />
            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-[760px]">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#a8adb4]">Dall&apos;idea al prodotto</p>
                <h2 className="mt-3 font-heading text-[29px] font-medium tracking-[-0.045em] text-white sm:text-[38px]">Vuoi una soluzione come {project.title}, costruita per la tua azienda?</h2>
                <p className="mt-3 text-[14px] leading-6 text-zinc-300">Partiamo dai tuoi processi, obiettivi e strumenti esistenti per progettare un prodotto realmente su misura.</p>
              </div>
              <Link href="/contact" className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-[#d6d8dc] px-5 text-[12px] font-medium text-[#111213] transition hover:bg-white">
                Richiedi una consulenza <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Link
        href="/contact"
        className="fixed bottom-4 right-4 z-40 inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.18] bg-[#151617]/90 px-4 text-[12px] font-medium text-white shadow-[0_14px_34px_rgba(0,0,0,0.3)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-[#bfc3c9] hover:bg-[#242628] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6d8dc] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0c0d] sm:bottom-6 sm:right-6 sm:px-5"
      >
        Richiedi una consulenza
        <ArrowRight className="size-3.5" />
      </Link>
    </>
  );
}
