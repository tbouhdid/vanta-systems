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
        <div className="mt-14 flex h-full flex-col">

          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="
                py-2
                text-xl
                font-medium
                tracking-tight
                text-zinc-300
                transition
                hover:text-white
            "
            >
              {item.label}
            </a>
          ))}

        <div className="mt-auto border-t border-white/10 pt-8">
            <a
                href="/contact"
                onClick={() => setOpen(false)}
            >
            <Button className="w-full rounded-full">
                Richiedi consulenza
            </Button>
            </a>
        </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}