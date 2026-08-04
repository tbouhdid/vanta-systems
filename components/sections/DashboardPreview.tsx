"use client";

import { Activity, BarChart3, Database, Shield } from "lucide-react";

export default function DashboardPreview() {
  return (
    <div
        className="
        relative
        h-[680px]
        w-[620px]
        overflow-hidden
        rounded-[36px]
        border
        border-white/10
        bg-gradient-to-b
        from-zinc-900
        to-zinc-950
        shadow-[0_40px_120px_rgba(0,0,0,.6)]
        "
    >

    <div className="absolute -left-20 top-24 h-52 w-52 rounded-full bg-white/5 blur-[120px]" />

    <div className="absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-slate-300/5 blur-[160px]" />
    
      {/* Header */}

      <div className="flex items-center justify-between border-b border-border px-6 py-5">

        <div>

          <p className="text-sm text-muted-foreground">
            Dashboard
          </p>

          <h2 className="mt-1 text-lg font-semibold">
            Vanta Control
          </h2>

        </div>

        <div className="flex gap-2">

          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />

        </div>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-2 gap-5 p-6">

        <Card
            icon={<Activity size={22} />}
            title="Automazioni"
            value="Disponibili"
        />

        <Card
            icon={<Database size={22} />}
            title="Integrazioni"
            value="API"
        />

        <Card
            icon={<BarChart3 size={22} />}
            title="Analytics"
            value="Dashboard"
        />

        <Card
            icon={<Shield size={22} />}
            title="Security"
            value="By Design"
        />

      </div>

      {/* Fake Graph */}

      <div className="px-6">

        <div className="rounded-2xl border border-border p-6">

          <p className="mb-6 text-sm text-muted-foreground">
            Performance
          </p>

          <svg
            viewBox="0 0 500 120"
            className="w-full"
          >
            <path
              d="M0 90
                 C40 70
                 70 65
                 100 75
                 C140 90
                 170 40
                 210 45
                 C250 50
                 290 25
                 330 35
                 C380 45
                 420 20
                 500 35"
              fill="none"
              stroke="#B9C1CA"
              strokeWidth="4"
              className="text-zinc-300"
            />
          </svg>

        </div>

      </div>

    </div>
  );
}

function Card({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border p-5">

      <div className="mb-5 text-primary">
        {icon}
      </div>

      <h3 className="text-sm text-muted-foreground">
        {title}
      </h3>

      <p className="mt-2 text-2xl font-bold">
        {value}
      </p>

    </div>
  );
}