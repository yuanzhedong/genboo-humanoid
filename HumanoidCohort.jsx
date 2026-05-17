import React, { useState } from "react";
import {
  ArrowRight,
  Cpu,
  Cog,
  Brain,
  Bot,
  Wrench,
  Cable,
  Camera,
  Battery,
  FlaskConical,
  Eye,
  GraduationCap,
  Sparkles,
  Calendar,
  Clock,
  Users,
  Award,
  ChevronDown,
  Check,
  Zap,
  ScrollText,
  Github,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                  CONTENT                                   */
/* -------------------------------------------------------------------------- */

const PLATFORM_PILLARS = [
  {
    id: "me",
    label: "Mechanical Engineering",
    tag: "ME",
    icon: Cog,
    accent: "from-emerald-400/20 to-emerald-400/0",
    ring: "ring-emerald-400/30",
    iconColor: "text-emerald-300",
    headline: "30 Active Degrees of Freedom",
    body:
      "7 DoF per arm, 6 per leg, 2 in the neck, 2 in the waist. Ultra-robust 3D-printed structural components engineered for repeated drops, falls, and self-recovery.",
    bullets: [
      "Anthropomorphic 30-DoF kinematics",
      "Dynamixel-class actuator integration",
      "Print-in-place tolerancing & assembly",
    ],
  },
  {
    id: "ee",
    label: "Electrical Engineering",
    tag: "EE",
    icon: Cable,
    accent: "from-sky-400/20 to-sky-400/0",
    ring: "ring-sky-400/30",
    iconColor: "text-sky-300",
    headline: "Jetson Orin NX Onboard Compute",
    body:
      "Stereo fisheye perception, custom power management, and a clean serial bus topology — production-grade electrical design, not a hobby breadboard.",
    bullets: [
      "Stereo fisheye camera pipeline",
      "Custom DC power distribution",
      "Smart-bus actuator daisy-chain",
    ],
  },
  {
    id: "ai",
    label: "Computer Science & AI",
    tag: "CS / AI",
    icon: Brain,
    accent: "from-emerald-400/15 via-sky-400/10 to-sky-400/0",
    ring: "ring-emerald-400/30",
    iconColor: "text-emerald-300",
    headline: "Sim-to-Real Reinforcement Learning",
    body:
      "Build a faithful MuJoCo / MJX digital twin, identify system dynamics, and train RL walking policies that transfer to the real chassis.",
    bullets: [
      "MuJoCo + MJX physics simulation",
      "System identification (sysID)",
      "RL omnidirectional locomotion",
    ],
  },
];

const PHASES = [
  {
    id: "summer",
    title: "Summer Intensive",
    subtitle: "The Physical Build",
    duration: "8 Weeks",
    cadence: "Jun – Aug",
    icon: Wrench,
    milestone:
      "Assemble the complete 30-DoF chassis, wire every electronic subsystem, calibrate joint zero-points, and deploy Python keyframe scripts so the robot performs open-loop push-ups and squats.",
    deliverables: [
      "Fully-assembled humanoid chassis",
      "Calibrated actuator bus & power rails",
      "Open-loop keyframe motion demos",
    ],
  },
  {
    id: "fall",
    title: "Fall Academy",
    subtitle: "The Digital Brain",
    duration: "12 Weeks",
    cadence: "Sep – Dec",
    icon: Brain,
    milestone:
      "Stand up a MuJoCo digital twin, perform motor system identification, train RL walking policies in MJX, and explore real-time VR teleoperation or vision-based manipulation.",
    deliverables: [
      "MuJoCo digital twin + sysID report",
      "Trained RL walking policy",
      "Teleop or manipulation capstone demo",
    ],
  },
];

const SYLLABUS = [
  {
    weeks: "Weeks 1–2",
    title: "Anthropomorphic Design & 3D Printing Tolerances",
    blurb:
      "How humanoid linkages distribute mass, why tolerance stacks dominate joint feel, and how to print structural parts that survive a fall.",
    icon: Cog,
    phase: "Summer",
  },
  {
    weeks: "Weeks 3–4",
    title: "Actuator Calibration, Bus Comms & Power Schematics",
    blurb:
      "Read datasheets like an engineer. Build a clean serial-bus topology, set actuator IDs, and design a power distribution diagram that won't brown-out under load.",
    icon: Cable,
    phase: "Summer",
  },
  {
    weeks: "Weeks 5–6",
    title: "Full Chassis Mechatronics & Jetson Orin NX Setup",
    blurb:
      "Mate the printed skeleton, route every cable, flash the Jetson, and stand up the on-robot software stack end-to-end.",
    icon: Cpu,
    phase: "Summer",
  },
  {
    weeks: "Weeks 7–8",
    title: "Kinematics & Python Keyframe Motion Control",
    blurb:
      "Forward kinematics, joint-space trajectories, and a keyframe app that drives the real hardware. Summer milestone: live push-ups and squats.",
    icon: Bot,
    phase: "Summer",
    milestone: true,
  },
  {
    weeks: "Weeks 9–12",
    title: "Digital Twins in MuJoCo & System Identification",
    blurb:
      "Build the simulated twin of your own robot, then identify its true dynamics so simulation actually predicts reality.",
    icon: FlaskConical,
    phase: "Fall",
  },
  {
    weeks: "Weeks 13–16",
    title: "RL: Omnidirectional Locomotion Policies in MJX",
    blurb:
      "PPO-style reinforcement learning, reward shaping, and large-scale parallel rollouts in MJX to train a policy that walks.",
    icon: Brain,
    phase: "Fall",
  },
  {
    weeks: "Weeks 17–20",
    title: "Sim-to-Real Transfer, Evaluation & Portfolio Presentation",
    blurb:
      "Deploy your policy on the physical robot, measure the reality gap, and produce a research-quality writeup for your portfolio.",
    icon: GraduationCap,
    phase: "Fall",
    milestone: true,
  },
];

/* -------------------------------------------------------------------------- */
/*                              SHARED PRIMITIVES                             */
/* -------------------------------------------------------------------------- */

function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-emerald-300/90">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_2px_rgba(52,211,153,0.7)]" />
      {children}
    </div>
  );
}

function GlassCard({ className = "", children }) {
  return (
    <div
      className={`relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset] transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] ${className}`}
    >
      {children}
    </div>
  );
}

function PrimaryButton({ href = "#apply", children, className = "" }) {
  return (
    <a
      href={href}
      className={`group relative inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-300 ${className}`}
    >
      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400 via-emerald-300 to-sky-400" />
      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400 via-emerald-300 to-sky-400 opacity-70 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative flex items-center gap-2">
        {children}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}

function SecondaryButton({ href = "#syllabus", children, className = "" }) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-emerald-400/40 hover:bg-white/[0.06] hover:text-emerald-200 ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 opacity-60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    NAV                                     */
/* -------------------------------------------------------------------------- */

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-slate-950/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="group flex items-center gap-2.5">
          <span className="relative grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-emerald-400 to-sky-500 text-slate-950 shadow-[0_0_24px_-4px_rgba(52,211,153,0.6)]">
            <Bot className="h-5 w-5" strokeWidth={2.4} />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-white">Genboo · Humanoid</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
              humanoid.genboo.com
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {[
            { href: "#platform", label: "Platform" },
            { href: "#program", label: "Program" },
            { href: "#syllabus", label: "Syllabus" },
            { href: "#mentorship", label: "Mentorship" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-slate-300 transition-colors hover:text-emerald-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <PrimaryButton className="hidden md:inline-flex" href="#apply">
          Apply
        </PrimaryButton>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*                                    HERO                                    */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      {/* ambient glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[140px]" />
        <div className="absolute right-[-10rem] top-40 h-[28rem] w-[28rem] rounded-full bg-sky-500/15 blur-[140px]" />
        <div className="absolute left-[-10rem] bottom-[-10rem] h-[28rem] w-[28rem] rounded-full bg-emerald-400/10 blur-[140px]" />
      </div>

      {/* dot grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, #000 40%, transparent 100%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-4 py-1.5 text-xs font-mono uppercase tracking-[0.18em] text-emerald-200">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Cohort 01 · Now Accepting Applications
          </div>

          <h1 className="max-w-5xl text-balance bg-gradient-to-br from-white via-white to-slate-400 bg-clip-text text-4xl font-bold leading-[1.05] tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
            Build a Humanoid Robot From Scratch.
            <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-emerald-300 via-emerald-200 to-sky-300 bg-clip-text text-transparent">
              {" "}Master ME, EE, and AI.
            </span>
          </h1>

          <p className="mt-7 max-w-3xl text-pretty text-base leading-relaxed text-slate-300 md:text-lg">
            An elite <span className="font-semibold text-white">20-week cohort</span> for high
            school students to construct, simulate, and train{" "}
            <span className="font-semibold text-emerald-300">ToddlerBot</span> — the open-source,
            ML-compatible humanoid platform. Mentored by Genboo engineers with direct technical
            consultation from the paper's original 1st and 2nd authors.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <PrimaryButton href="#apply">Apply for the Cohort</PrimaryButton>
            <SecondaryButton href="#syllabus">
              <ScrollText className="h-4 w-4" />
              View Syllabus
            </SecondaryButton>
          </div>

          {/* spec strip */}
          <div className="mt-14 grid w-full max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] sm:grid-cols-4">
            {[
              { k: "20", label: "Weeks" },
              { k: "30", label: "Active DoFs" },
              { k: "6 hr", label: "Per Week" },
              { k: "1:5", label: "Mentor Ratio" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-slate-950/60 px-6 py-5 text-center backdrop-blur-md"
              >
                <div className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-3xl font-bold text-transparent">
                  {stat.k}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                             PLATFORM HIGHLIGHTS                            */
/* -------------------------------------------------------------------------- */

function Platform() {
  return (
    <section id="platform" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>The Platform</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-white md:text-5xl">
            A research-grade humanoid,{" "}
            <span className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-transparent">
              not a toy kit.
            </span>
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-slate-300 md:text-lg">
            ToddlerBot is the Stanford-published, open-source humanoid platform you'll build, wire,
            and teach to walk. Every component is portfolio-grade.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {PLATFORM_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <GlassCard
                key={pillar.id}
                className="group overflow-hidden p-7 hover:-translate-y-1"
              >
                <div
                  className={`pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b ${pillar.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div
                      className={`grid h-12 w-12 place-items-center rounded-xl bg-white/5 ring-1 ${pillar.ring}`}
                    >
                      <Icon className={`h-6 w-6 ${pillar.iconColor}`} strokeWidth={1.8} />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                      {pillar.tag}
                    </span>
                  </div>

                  <div className="mt-7">
                    <div className="text-xs font-mono uppercase tracking-[0.18em] text-slate-400">
                      {pillar.label}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold leading-tight text-white">
                      {pillar.headline}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">{pillar.body}</p>
                  </div>

                  <ul className="mt-6 space-y-2.5 border-t border-white/5 pt-5">
                    {pillar.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-sm text-slate-300"
                      >
                        <Check
                          className={`mt-0.5 h-4 w-4 flex-shrink-0 ${pillar.iconColor}`}
                          strokeWidth={2.5}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                             PROGRAM & TIMELINE                             */
/* -------------------------------------------------------------------------- */

function Program() {
  const [active, setActive] = useState(PHASES[0].id);
  const phase = PHASES.find((p) => p.id === active);
  const Icon = phase.icon;

  return (
    <section id="program" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <SectionLabel>Program Structure</SectionLabel>
            <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-white md:text-5xl">
              Two phases. One robot.{" "}
              <span className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-transparent">
                Six hours a week.
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-mono uppercase tracking-[0.18em] text-slate-300 backdrop-blur-md">
            <Clock className="h-3.5 w-3.5 text-emerald-300" />
            6 hr / week · 20 weeks total
          </div>
        </div>

        {/* tab switcher */}
        <div className="mt-12 inline-flex rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-md">
          {PHASES.map((p) => {
            const isActive = active === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActive(p.id)}
                className={`relative rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-slate-950"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-300 to-sky-300 shadow-[0_0_20px_-4px_rgba(52,211,153,0.7)]" />
                )}
                <span className="relative flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-70">
                    Phase {p.id === "summer" ? "01" : "02"}
                  </span>
                  {p.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* phase detail */}
        <GlassCard className="mt-8 overflow-hidden p-0">
          <div className="grid lg:grid-cols-[1.1fr_1fr]">
            <div className="relative p-8 md:p-10">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-400/10 ring-1 ring-emerald-400/30">
                  <Icon className="h-6 w-6 text-emerald-300" strokeWidth={1.8} />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                    {phase.cadence} · {phase.duration}
                  </div>
                  <h3 className="text-2xl font-semibold text-white">
                    {phase.title}{" "}
                    <span className="text-slate-400">— {phase.subtitle}</span>
                  </h3>
                </div>
              </div>

              <div className="mt-8">
                <div className="text-xs font-mono uppercase tracking-[0.18em] text-emerald-300">
                  End-of-phase milestone
                </div>
                <p className="mt-3 text-base leading-relaxed text-slate-200">
                  {phase.milestone}
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {phase.deliverables.map((d) => (
                  <div
                    key={d}
                    className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
                  >
                    <Sparkles className="h-4 w-4 text-emerald-300" />
                    <div className="mt-2 text-sm leading-snug text-slate-200">{d}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* visual timeline */}
            <div className="relative border-t border-white/5 bg-gradient-to-br from-slate-900/50 to-slate-950/50 p-8 md:p-10 lg:border-l lg:border-t-0">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                Weekly cadence
              </div>
              <div className="mt-5 space-y-3">
                {PHASES.map((p) => {
                  const PIcon = p.icon;
                  const isActive = p.id === active;
                  const weeks = p.id === "summer" ? 8 : 12;
                  return (
                    <div key={p.id}>
                      <div className="mb-1.5 flex items-center justify-between text-xs">
                        <span
                          className={`flex items-center gap-1.5 font-mono uppercase tracking-[0.18em] ${
                            isActive ? "text-emerald-300" : "text-slate-500"
                          }`}
                        >
                          <PIcon className="h-3 w-3" />
                          {p.title}
                        </span>
                        <span
                          className={
                            isActive ? "text-emerald-300" : "text-slate-500"
                          }
                        >
                          {weeks} wk
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/5">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            isActive
                              ? "bg-gradient-to-r from-emerald-300 to-sky-300 shadow-[0_0_18px_-2px_rgba(52,211,153,0.7)]"
                              : "bg-white/10"
                          }`}
                          style={{
                            width: `${(weeks / 20) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 rounded-xl border border-white/10 bg-slate-950/40 p-5">
                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-300" />
                  <div>
                    <div className="text-sm font-semibold text-white">Hybrid schedule</div>
                    <p className="mt-1 text-sm leading-relaxed text-slate-300">
                      In-person lab build sessions on weekends during summer, plus weeknight
                      virtual office hours throughout the fall academy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              SYLLABUS ACCORDION                            */
/* -------------------------------------------------------------------------- */

function Syllabus() {
  const [open, setOpen] = useState(0);

  return (
    <section id="syllabus" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="max-w-2xl">
          <SectionLabel>High-Level Syllabus</SectionLabel>
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-white md:text-5xl">
            20 weeks, mapped to{" "}
            <span className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-transparent">
              real engineering deliverables.
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-300">
            Each module is taught lab-first: a short concept primer, then hands-on time on the
            bench or in simulation, then a code review with your mentor.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
          {SYLLABUS.map((row, i) => {
            const Icon = row.icon;
            const isOpen = open === i;
            return (
              <div
                key={row.weeks}
                className={`border-b border-white/5 last:border-b-0 ${
                  isOpen ? "bg-white/[0.02]" : ""
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="group flex w-full items-center gap-4 px-5 py-5 text-left transition-colors hover:bg-white/[0.03] md:px-7"
                >
                  <div
                    className={`grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg ring-1 transition-all ${
                      isOpen
                        ? "bg-emerald-400/10 ring-emerald-400/40 text-emerald-300"
                        : "bg-white/5 ring-white/10 text-slate-300 group-hover:text-emerald-300"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>

                  <div className="hidden w-28 flex-shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400 sm:block">
                    {row.weeks}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base font-semibold text-white md:text-lg">
                        {row.title}
                      </span>
                      {row.milestone && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-emerald-200">
                          <Award className="h-2.5 w-2.5" /> Milestone
                        </span>
                      )}
                      <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400">
                        {row.phase}
                      </span>
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 sm:hidden">
                      {row.weeks}
                    </div>
                  </div>

                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-slate-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-emerald-300" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0">
                    <div className="px-5 pb-6 pl-[68px] text-sm leading-relaxed text-slate-300 md:px-7 md:pl-[180px]">
                      {row.blurb}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                            MENTORSHIP ADVANTAGE                            */
/* -------------------------------------------------------------------------- */

function Mentorship() {
  return (
    <section id="mentorship" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <GlassCard className="overflow-hidden p-0">
          <div className="grid lg:grid-cols-[1.2fr_1fr]">
            <div className="relative p-8 md:p-12">
              <SectionLabel>The Mentorship Advantage</SectionLabel>
              <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-white md:text-5xl">
                You're not following a tutorial.{" "}
                <span className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-transparent">
                  You're shipping research.
                </span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300">
                Every cohort student builds against the same platform Stanford's research team
                publishes on. Your code, sims, and hardware get reviewed by the people who wrote
                the paper.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Direct technical consultation",
                    body:
                      "The 1st and 2nd authors of the original ToddlerBot paper serve as Technical Consultants — reviewing student code, simulation designs, and hardware builds.",
                  },
                  {
                    icon: Users,
                    title: "Genboo engineers as lead mentors",
                    body:
                      "Working roboticists run weekly labs, code reviews, and 1:1s. Maximum 5 students per mentor so feedback is dense and personal.",
                  },
                  {
                    icon: Github,
                    title: "Real open-source contributions",
                    body:
                      "Your improvements to drivers, sim tooling, and policies can land upstream in the ToddlerBot repository — a portfolio piece that compounds.",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-4">
                      <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg bg-emerald-400/10 ring-1 ring-emerald-400/30">
                        <Icon className="h-5 w-5 text-emerald-300" strokeWidth={1.8} />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{item.title}</div>
                        <p className="mt-1 text-sm leading-relaxed text-slate-300">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative overflow-hidden border-t border-white/5 bg-gradient-to-br from-slate-900/40 to-slate-950/60 p-8 md:p-12 lg:border-l lg:border-t-0">
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-[100px]" />
              <div className="pointer-events-none absolute -left-10 bottom-0 h-60 w-60 rounded-full bg-sky-500/15 blur-[100px]" />

              <div className="relative">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                  Source platform
                </div>
                <a
                  href="https://toddlerbot.github.io/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-2xl font-semibold text-white hover:text-emerald-300"
                >
                  ToddlerBot
                  <ArrowRight className="h-5 w-5 -rotate-45" />
                </a>
                <p className="mt-2 text-sm text-slate-400">
                  Stanford-published open-source humanoid research platform.
                </p>

                <div className="mt-8 space-y-3">
                  {[
                    { label: "Active DoFs", value: "30" },
                    { label: "Compute", value: "Jetson Orin NX" },
                    { label: "Perception", value: "Stereo fisheye" },
                    { label: "Sim", value: "MuJoCo + MJX" },
                    { label: "Policy", value: "RL omnidirectional" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                        {s.label}
                      </span>
                      <span className="text-sm font-medium text-white">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                             APPLICATION / CTA                              */
/* -------------------------------------------------------------------------- */

function ApplyCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", school: "", note: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="apply" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
          {/* glow background */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/25 blur-[140px]" />
            <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-sky-500/20 blur-[140px]" />
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
                backgroundSize: "26px 26px",
              }}
            />
          </div>

          <div className="relative grid gap-10 p-8 md:p-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div>
              <SectionLabel>Apply · Cohort 01</SectionLabel>
              <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-white md:text-5xl">
                Seats are{" "}
                <span className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-transparent">
                  strictly limited.
                </span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300">
                Due to hardware complexity and lab space constraints, this cohort is highly
                selective. Ideal candidates have prior exposure to programming{" "}
                <span className="font-mono text-emerald-200">(Python / C++)</span> or competitive
                robotics <span className="font-mono text-emerald-200">(VEX / FRC)</span> — but
                passion and problem-solving drive are prioritized over credentials.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  "Open to current high school students (grades 9–12).",
                  "Rolling admissions — earlier applicants get priority lab access.",
                  "Need-based scholarships available for hardware kit costs.",
                ].map((n) => (
                  <div key={n} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-300" strokeWidth={2.5} />
                    {n}
                  </div>
                ))}
              </div>
            </div>

            {/* form card */}
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-7 backdrop-blur-xl">
              {!submitted ? (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300">
                    Express interest
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Start your application
                  </h3>

                  <div className="space-y-3 pt-2">
                    {[
                      { name: "name", placeholder: "Full name", type: "text" },
                      { name: "email", placeholder: "Email", type: "email" },
                      { name: "school", placeholder: "School & grade", type: "text" },
                    ].map((f) => (
                      <input
                        key={f.name}
                        type={f.type}
                        name={f.name}
                        required
                        value={form[f.name]}
                        onChange={onChange}
                        placeholder={f.placeholder}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                      />
                    ))}
                    <textarea
                      name="note"
                      rows={3}
                      value={form.note}
                      onChange={onChange}
                      placeholder="A robotics project, repo, or build you're proud of (optional)"
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group relative mt-2 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-3.5 text-sm font-semibold text-slate-950 transition-all"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-emerald-300 to-sky-400" />
                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-emerald-300 to-sky-400 opacity-70 blur-xl transition-opacity group-hover:opacity-100" />
                    <span className="relative flex items-center gap-2">
                      Submit Application
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </button>

                  <p className="pt-1 text-center text-[11px] text-slate-500">
                    We'll follow up within 5 business days with next steps.
                  </p>
                </form>
              ) : (
                <div className="flex flex-col items-center py-10 text-center">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-emerald-400/15 ring-1 ring-emerald-400/40">
                    <Check className="h-7 w-7 text-emerald-300" strokeWidth={2.5} />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">
                    Application received
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-slate-300">
                    Thanks, {form.name?.split(" ")[0] || "future roboticist"}. We'll reach out
                    within 5 business days.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   FOOTER                                   */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-slate-950/60 py-10 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-emerald-400 to-sky-500 text-slate-950">
            <Bot className="h-4 w-4" strokeWidth={2.4} />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-white">humanoid.genboo.com</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
              © 2026 Genboo LLC
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5 text-xs text-slate-400">
          <a href="mailto:humanoid@genboo.com" className="inline-flex items-center gap-1.5 hover:text-emerald-300">
            <Mail className="h-3.5 w-3.5" /> humanoid@genboo.com
          </a>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> Bay Area, CA
          </span>
          <a
            href="https://toddlerbot.github.io/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-emerald-300"
          >
            <Github className="h-3.5 w-3.5" /> ToddlerBot
          </a>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
/* -------------------------------------------------------------------------- */

export default function HumanoidCohort() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 font-sans text-white antialiased selection:bg-emerald-400/30 selection:text-white">
      {/* global ambient backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_1200px_800px_at_15%_-10%,rgba(16,185,129,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_1000px_700px_at_85%_10%,rgba(56,189,248,0.08),transparent_65%)]" />
      </div>

      <Nav />
      <main>
        <Hero />
        <Platform />
        <Program />
        <Syllabus />
        <Mentorship />
        <ApplyCTA />
      </main>
      <Footer />
    </div>
  );
}
