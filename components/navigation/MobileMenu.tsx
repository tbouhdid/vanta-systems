"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { navigation } from "@/data/navigation";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
          />
        }
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="border-white/10 bg-black"
      >
        <div className="mt-16 flex flex-col gap-6">

          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-lg font-medium text-zinc-200 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}

          <a
            href="#cta"
            onClick={() => setOpen(false)}
            className="mt-6"
          >
            <Button className="w-full rounded-full">
              Richiedi consulenza
            </Button>
          </a>

        </div>
      </SheetContent>
    </Sheet>
  );
}