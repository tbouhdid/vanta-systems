export const agencyPilotProjectType = "Progetto pilota — VANTA for Agencies";
export const agencyPartnershipProjectType =
  "Partnership continuativa — VANTA for Agencies";

export const agencyProjectTypes = [
  agencyPilotProjectType,
  agencyPartnershipProjectType,
] as const;

export const softwareProjectTypes = [
  "Sviluppo software",
  "Siti web e landing page",
  "Automazioni",
  "Integrazioni",
  "Altro",
] as const;

export const projectTypes = [
  "Sviluppo software",
  "Siti web e landing page",
  "Automazioni",
  "Integrazioni",
  ...agencyProjectTypes,
  "Altro",
] as const;

export const budgets = [
  "A partire da 390 €",
  "390–750 €",
  "750–1.500 €",
  "Meno di 5.000 €",
  "5.000–10.000 €",
  "10.000–25.000 €",
  "Oltre 25.000 €",
  "Da definire",
] as const;

export const projectCategories = [
  "Landing page",
  "Sito web",
  "Pagina campagna",
  "Aggiornamento di un progetto esistente",
  "Altro",
] as const;

export const materialsStatuses = [
  "Brief, contenuti e brand pronti",
  "Brief pronto, materiali in raccolta",
  "Serve un confronto sul materiale necessario",
  "Da definire",
] as const;

export type LeadCategory =
  | "software-solutions"
  | "agency-pilot"
  | "agency-partnership";

export type ContactLead = {
  name: string;
  email: string;
  company: string;
  website: string;
  phone: string;
  projectType: string;
  projectCategory: string;
  deadline: string;
  materialsStatus: string;
  budget: string;
  message: string;
};

export function getLeadCategory(projectType: string): LeadCategory | null {
  if (projectType === agencyPilotProjectType) {
    return "agency-pilot";
  }

  if (projectType === agencyPartnershipProjectType) {
    return "agency-partnership";
  }

  if (softwareProjectTypes.includes(projectType as (typeof softwareProjectTypes)[number])) {
    return "software-solutions";
  }

  return null;
}

export function isAgencyProjectType(projectType: string) {
  return (
    projectType === agencyPilotProjectType ||
    projectType === agencyPartnershipProjectType
  );
}

export function isRecognizedBudget(value: string) {
  return budgets.includes(value as (typeof budgets)[number]);
}

export function isRecognizedProjectCategory(value: string) {
  return projectCategories.includes(
    value as (typeof projectCategories)[number],
  );
}

export function isRecognizedMaterialsStatus(value: string) {
  return materialsStatuses.includes(
    value as (typeof materialsStatuses)[number],
  );
}

export function isAgencyLead(category: LeadCategory) {
  return category !== "software-solutions";
}

export function getAgencyEngagementLabel(category: LeadCategory) {
  return category === "agency-partnership"
    ? "Partnership continuativa"
    : "Pilot";
}

function sanitizeSubjectValue(value: string) {
  return value
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
}

export function getLeadSubject(contact: ContactLead, category: LeadCategory) {
  const contactName =
    sanitizeSubjectValue(contact.company) ||
    sanitizeSubjectValue(contact.name) ||
    "Contatto dal sito";

  const prefix =
    category === "agency-pilot"
      ? "[AGENCY · PILOT]"
      : category === "agency-partnership"
        ? "[AGENCY · PARTNERSHIP]"
        : "[SOFTWARE SOLUTIONS]";

  return `${prefix} — ${contactName}`;
}
