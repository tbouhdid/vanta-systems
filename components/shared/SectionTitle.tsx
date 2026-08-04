import type { ReactNode } from "react";

type SectionTitleProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
}: SectionTitleProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-5xl font-bold leading-tight">
        {title}
      </h2>

      {description && (
        <p className="mt-8 text-lg leading-8 text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}