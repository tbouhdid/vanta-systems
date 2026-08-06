export type ProjectSlug =
  | "vanta-crm"
  | "vanta-flow"
  | "vanta-factory"
  | "vanta-desk";

export type ProjectPreview = "crm" | "flow" | "factory" | "desk";

export type ProjectFeature = {
  title: string;
  description: string;
};

export type ProjectFaq = {
  question: string;
  answer: string;
};

export interface Project {
  slug: ProjectSlug;
  title: string;
  heroTitle: string;
  description: string;
  badge: "Concept Demo" | "Case Study";
  preview: ProjectPreview;
  problem: {
    title: string;
    description: string;
    points: string[];
  };
  features: ProjectFeature[];
  technologies: string[];
  benefits: string[];
  faqs: ProjectFaq[];
}
