import { Mail } from "lucide-react";

import LinkedInIcon from "@/components/shared/LinkedInIcon";

const email = "hello@vantasystems.it";
const linkedInUrl = "https://www.linkedin.com/company/vantasystems-it/";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#0b0c0d]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:py-7">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-[12px]">
            <a
              href={`mailto:${email}`}
              className="group inline-flex items-center gap-2 text-zinc-400 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6d8dc] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0c0d]"
            >
              <Mail
                className="size-3.5 text-[#a8adb4] transition-colors group-hover:text-[#d6d8dc]"
                strokeWidth={1.7}
              />
              {email}
            </a>
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="VANTA Systems su LinkedIn"
              className="group inline-flex items-center gap-2 text-zinc-400 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6d8dc] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0c0d]"
            >
              <LinkedInIcon
                className="size-3.5 text-[#a8adb4] transition-colors group-hover:text-[#d6d8dc]"
              />
              LinkedIn
            </a>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-zinc-500 sm:gap-4">
            <span>© 2026 VANTA Systems</span>
            <span
              aria-hidden="true"
              className="size-1 rounded-full bg-[#8d939b]/70"
            />
            <span>Made in Italy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
