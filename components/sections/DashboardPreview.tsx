"use client";

import {
  Activity,
  ArrowUpRight,
  Bot,
  Cloud,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Shield,
} from "lucide-react";

const menu = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    active: true,
  },
  {
    icon: FolderKanban,
    label: "Projects",
  },
  {
    icon: Activity,
    label: "Workflow",
  },
  {
    icon: Bot,
    label: "AI Assistant",
  },
  {
    icon: Cloud,
    label: "Cloud",
  },
  {
    icon: Settings,
    label: "Settings",
  },
];

export default function DashboardPreview() {
  return (
    <div className="relative h-[700px] w-[640px] overflow-hidden rounded-[34px] border border-white/10 bg-zinc-950 shadow-[0_40px_120px_rgba(0,0,0,.55)]">

      {/* Glow */}

      <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-white/5 blur-[130px]" />

      <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-slate-400/5 blur-[150px]" />

      {/* Header */}

      <div className="flex h-16 items-center justify-between border-b border-white/5 px-6">

        <div className="flex items-center gap-2">

          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />

        </div>

        <span className="text-sm tracking-[0.25em] text-zinc-400">
          VANTA CONTROL
        </span>

      </div>

      <div className="flex h-[calc(100%-64px)]">

        {/* Sidebar */}

        <aside className="w-52 border-r border-white/5 p-5">

          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-zinc-500">
            Workspace
          </p>

          <nav className="space-y-2">

            {menu.map((item) => {

              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                    item.active
                      ? "bg-white/8 text-white"
                      : "text-zinc-500 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={18} />

                  {item.label}
                </button>
              );
            })}

          </nav>

        </aside>

        {/* Main */}

        <div className="flex-1 p-6">

          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-zinc-500">
                  Active Project
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  CRM Enterprise
                </h2>

              </div>

              <ArrowUpRight
                className="text-zinc-500"
                size={20}
              />

            </div>

            <div className="mt-8">

              <div className="mb-2 flex justify-between text-xs text-zinc-500">

                <span>Progress</span>

                <span>72%</span>

              </div>

              <div className="h-2 rounded-full bg-white/5">

                <div className="h-full w-[72%] rounded-full bg-zinc-200" />

              </div>

            </div>

          </div>

          {/* Activity */}

          <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.02] p-5">

            <h3 className="mb-5 text-sm uppercase tracking-[0.2em] text-zinc-500">
              Recent Activity
            </h3>

            <div className="space-y-4">

              <ActivityRow
                title="Nuovo workflow creato"
                status="Ready"
              />

              <ActivityRow
                title="API integrate"
                status="Connected"
              />

              <ActivityRow
                title="Deploy completato"
                status="Success"
              />

              <ActivityRow
                title="Backup eseguito"
                status="Completed"
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

function ActivityRow({
  title,
  status,
}: {
  title: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/5 px-4 py-3">

      <span className="text-sm">
        {title}
      </span>

      <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-400">
        {status}
      </span>

    </div>
  );
}