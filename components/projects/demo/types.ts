export type DemoTheme = "dark" | "light" | "titanium" | "midnight";

export type DemoBranding = {
  companyName: string;
  logoUrl: string | null;
  brandColor: string;
  theme: DemoTheme;
  productName: string;
};

export type DemoToast = {
  id: number;
  title: string;
  description?: string;
  tone?: "success" | "info" | "warning" | "error";
};
