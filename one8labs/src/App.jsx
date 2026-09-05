import { useState, useEffect } from "react";
import {
  ArrowRight, ArrowUpRight, Menu, X, Wrench, Users, Cloud,
  CheckCircle2, Sparkles, Send, Mail, Rocket, ChevronDown,
  Zap, Shield, Clock, Star, ExternalLink, Phone, MessageSquare,
  BarChart3, Bot, Code2, Layers, MoveRight
} from "lucide-react";

/* ─────────────────────── CONSTANTS ─────────────────────── */

const NAV = [
  { id: "home",     label: "Home" },
  { id: "services", label: "Services" },
  { id: "platform", label: "Platform" },
  { id: "about",    label: "About" },
  { id: "contact",  label: "Contact" },
];

/* ─────────────────────── SHARED PRIMITIVES ─────────────────────── */

function Logo({ size = "text-xl" }) {
  return (
    <span className={`font-display font-bold ${size} tracking-tight`}>
      <span className="text-white">One</span>
      <span className="grad-text">8</span>
      <span className="text-white">labs</span>
    </span>
  );
}

function Eyebrow({ children, center = false }) {
  return (
    <div className={`slash-accent font-mono-lab text-[11px] uppercase text-[var(--dim)] mb-5 ${center ? "text-center pl-0 before:hidden inline-block" : ""}`}>
      {children}
    </div>
  );
}

function Tag({ children, tone = "neutral" }) {
  const tones = {
    live:    "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
    lab:     "border-[var(--border)] text-[var(--dim)]",
    road:    "border-[var(--border)] text-[var(--dim)]",
    orange:  "border-orange-500/30 text-orange-400 bg-orange-500/10",
    neutral: "border-[var(--border)] text-[var(--dim)]",
  };
  return (
    <span className={`font-mono-lab text-[10px] uppercase px-3 py-1 rounded-full border ${tones[tone]}`}>
      {children}
    </span>
  );
}

function SectionWrap({ children, className = "" }) {
  return (
    <section className={`max-w-6xl mx-auto px-6 ${className}`}>
      {children}
    </section>
  );
}

/* ─────────────────────── NAV ─────────────────────── */

function Nav({ page, go, menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`sticky top-0 z-50 nav-glass transition-all duration-300 ${scrolled ? "shadow-lg shadow-black/40" : ""}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => go("home")} className="flex items-center gap-2 group" id="nav-logo">
          <img src="/logo.svg" alt="One8labs" className="w-8 h-8 object-contain rounded-lg" onError={(e)=>{e.target.style.display='none'}} />
          <Logo />
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {NAV.map((n) => (
            <button
              key={n.id}
              id={`nav-${n.id}`}
              onClick={() => go(n.id)}
              className={`grad-underline font-mono-lab text-[11px] uppercase tracking-wider transition-colors duration-200 ${
                page === n.id ? "text-white" : "text-[var(--dim)] hover:text-white"
              }`}
            >
              {n.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button
          id="nav-cta-book"
          onClick={() => go("contact")}
          className="hidden md:inline-flex items-center gap-2 grad-bg btn-primary text-black text-sm font-semibold px-5 py-2.5 rounded-full"
        >
          Book a call <ArrowRight size={14} />
        </button>

        {/* Mobile toggle */}
        <button
          id="nav-mobile-toggle"
          className="md:hidden text-white p-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--border)] px-6 py-6 flex flex-col gap-5 bg-[var(--bg)]">
          {NAV.map((n) => (
            <button
              key={n.id}
              id={`nav-mob-${n.id}`}
              onClick={() => go(n.id)}
              className="text-left font-mono-lab text-xs uppercase text-[var(--dim)] hover:text-white transition-colors"
            >
              {n.label}
            </button>
          ))}
          <button
            id="nav-mob-cta"
            onClick={() => go("contact")}
            className="grad-bg text-black text-sm font-semibold px-5 py-3 rounded-full text-center btn-primary"
          >
            Book a call
          </button>
        </div>
      )}
    </header>
  );
}

/* ─────────────────────── FOOTER ─────────────────────── */

function Footer({ go }) {
  return (
    <footer className="border-t border-[var(--border)] mt-32">
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-[1fr_auto] gap-12">
        {/* Brand */}
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <img src="/logo.svg" alt="One8labs logo" className="w-9 h-9 object-contain rounded-xl" onError={(e)=>{e.target.style.display='none'}} />
            <Logo size="text-lg" />
          </div>
          <p className="text-[var(--dim)] text-sm leading-relaxed mb-5">
            An AI-native build studio for early-stage startups. One platform.
            All your business. Limitless growth.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono-lab text-[var(--dim)]">
            <span className="ping-dot"></span>
            <span className="ml-3">Currently taking new clients</span>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-16">
          <div className="flex flex-col gap-3">
            <span className="font-mono-lab text-[11px] uppercase text-[var(--dim)] mb-1">Site</span>
            {NAV.map((n) => (
              <button
                key={n.id}
                id={`footer-${n.id}`}
                onClick={() => go(n.id)}
                className="text-sm text-left text-[var(--white)] hover:text-[var(--accent-pink)] transition-colors duration-150"
              >
                {n.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-mono-lab text-[11px] uppercase text-[var(--dim)] mb-1">Contact</span>
            <a href="mailto:contact.one8labs@gmail.com" className="text-sm hover:text-[var(--accent-pink)] transition-colors" id="footer-email">
              contact.one8labs@gmail.com
            </a>
            <a href="tel:+917666379380" className="text-sm hover:text-[var(--accent-pink)] transition-colors">
              +91 76663 79380
            </a>
            <span className="text-sm text-[var(--dim)]">India · Remote-first</span>
            <button
              onClick={() => go("contact")}
              id="footer-book"
              className="text-sm text-left text-[var(--accent-pink)] hover:underline mt-1"
            >
              Book a free call →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 font-mono-lab text-[11px] text-[var(--dim)] uppercase">
          <span>© 2026 One8Labs · Made in India 🇮🇳 · All rights reserved</span>
          <span>Streamline · Automate · Collaborate · Scale</span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────── REUSABLE COMPONENTS ─────────────────────── */

function StatChip({ value, label, icon: Icon }) {
  return (
    <div className="surface rounded-2xl px-6 py-5 flex-1 min-w-[150px] card-hover">
      {Icon && <Icon size={18} className="text-[var(--grad-mid)] mb-3" />}
      <div className="font-display text-2xl font-bold grad-text mb-1">{value}</div>
      <div className="text-[var(--dim)] text-xs">{label}</div>
    </div>
  );
}

function PillarCard({ icon, title, status, statusTone, desc, cta, onClick, delay = "" }) {
  const Icon = icon;
  return (
    <div className={`surface card-hover rounded-2xl p-7 flex flex-col fade-up ${delay}`}>
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-xl grad-bg flex items-center justify-center shrink-0">
          <Icon size={21} className="text-black" strokeWidth={2.2} />
        </div>
        <Tag tone={statusTone}>{status}</Tag>
      </div>
      <h3 className="font-display text-xl font-semibold mb-2.5">{title}</h3>
      <p className="text-[var(--dim)] text-sm leading-relaxed flex-1">{desc}</p>
      {cta && (
        <button
          onClick={onClick}
          className="mt-6 flex items-center gap-1.5 text-sm font-medium text-[var(--white)] hover:text-[var(--grad-mid)] transition-colors group"
        >
          {cta}
          <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}
    </div>
  );
}

function ProcessStep({ n, title, desc }) {
  return (
    <div className="flex gap-5 group">
      <div className="font-display text-3xl font-bold grad-text w-10 shrink-0 pt-0.5 select-none">{n}</div>
      <div className="process-step-wrap pb-10 border-l border-[var(--border)] pl-6 flex-1 -ml-px last:border-transparent">
        <div className="process-step-dot"></div>
        <h4 className="font-semibold text-base mb-1.5 text-white">{title}</h4>
        <p className="text-[var(--dim)] text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function CTABanner({ go }) {
  return (
    <SectionWrap className="mt-28 mb-4">
      <div className="surface-2 glow-card rounded-3xl px-8 py-16 md:px-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 hero-bg pointer-events-none" />
        {/* grid lines */}
        <div className="grid-line-v left-1/4 hidden md:block" />
        <div className="grid-line-v left-3/4 hidden md:block" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 font-mono-lab text-[11px] uppercase text-[var(--dim)] mb-5 border border-[var(--border)] rounded-full px-3 py-1.5">
            <Zap size={11} className="text-[var(--grad-mid)]" />
            Free 30-minute scoping call
          </div>
          <h3 className="font-display text-3xl md:text-4xl font-bold mb-3 max-w-2xl mx-auto">
            Have a startup that needs to move faster?
          </h3>
          <p className="text-[var(--dim)] mb-8 max-w-md mx-auto">
            Tell us what you're building. We'll scope it honestly on a free call — no deck required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="cta-banner-book"
              onClick={() => go("contact")}
              className="grad-bg btn-primary text-black font-semibold px-8 py-3.5 rounded-full inline-flex items-center gap-2"
            >
              Book a free call <ArrowRight size={16} />
            </button>
            <button
              id="cta-banner-services"
              onClick={() => go("services")}
              className="surface btn-ghost text-white text-sm font-medium px-6 py-3 rounded-full border inline-flex items-center gap-2"
            >
              View services <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </SectionWrap>
  );
}

/* ─────────────────────── HOME PAGE ─────────────────────── */

function Home({ go }) {
  return (
    <>
      {/* HERO */}
      <section className="hero-bg relative overflow-hidden noise">
        {/* Background grid lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="grid-line-v left-1/4" />
          <div className="grid-line-v left-1/2" />
          <div className="grid-line-v left-3/4" />
        </div>

        <div className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center relative">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 surface rounded-full px-4 py-2 mb-8 font-mono-lab text-[11px] uppercase text-[var(--dim)] fade-up">
            <Bot size={13} className="text-[var(--grad-mid)]" />
            AI-native build studio · Pre-seed to Seed
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.04] mb-6 fade-up-d1">
            One platform.<br />
            All your business.<br />
            <span className="text-[var(--accent-pink)]">Limitless growth.</span>
          </h1>

          <p className="text-[var(--dim)] text-lg md:text-xl max-w-xl mx-auto mb-10 fade-up-d2 leading-relaxed">
            Streamline. Automate. Collaborate. Scale — all in one place.
            We build and launch early-stage startups with AI-native speed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16 fade-up-d3">
            <button
              id="hero-cta-primary"
              onClick={() => go("contact")}
              className="grad-bg btn-primary text-black font-semibold px-7 py-3.5 rounded-full inline-flex items-center gap-2 w-full sm:w-auto justify-center text-sm"
            >
              Book a build call <ArrowRight size={15} />
            </button>
            <button
              id="hero-cta-secondary"
              onClick={() => go("services")}
              className="surface btn-ghost font-medium px-7 py-3.5 rounded-full w-full sm:w-auto text-sm border inline-flex items-center gap-2 justify-center"
            >
              View services <ArrowUpRight size={14} />
            </button>
          </div>

          {/* Stat chips */}
          <div className="flex flex-wrap gap-3 justify-center fade-up-d4">
            <StatChip icon={Clock}    value="2–4 wks"       label="First build sprint" />
            <StatChip icon={Layers}   value="3 pillars"     label="Services live today" />
            <StatChip icon={Zap}      value="AI-native"     label="Delivery method" />
            <StatChip icon={Star}     value="Pre-seed–Seed" label="Who we build for" />
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <SectionWrap className="mt-28">
        <Eyebrow>Three pillars, one lab</Eyebrow>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-10 max-w-xl">
          Everything your startup needs to move fast
        </h2>
        <div className="grid md:grid-cols-3 gap-5">
          <PillarCard
            icon={Users}
            title="Business Services"
            status="Available now"
            statusTone="live"
            desc="Hands-on, AI-accelerated builds: MVPs, workflow automation, and ongoing dev support for early-stage teams that can't afford to wait."
            cta="See services"
            onClick={() => go("services")}
            delay="fade-up-d1"
          />
          <PillarCard
            icon={Wrench}
            title="Business Tools"
            status="In the lab"
            statusTone="lab"
            desc="Focused tools distilled from the patterns we see repeat across client builds. Shipped once they're proven, not guessed at from a whiteboard."
            cta="See the roadmap"
            onClick={() => go("platform")}
            delay="fade-up-d2"
          />
          <PillarCard
            icon={Cloud}
            title="SaaS Platform"
            status="On the roadmap"
            statusTone="road"
            desc="Where the tools eventually meet — one unified dashboard for every automation and workflow we've built for you, connected and measurable."
            cta="See the roadmap"
            onClick={() => go("platform")}
            delay="fade-up-d3"
          />
        </div>
      </SectionWrap>

      {/* PROCESS */}
      <SectionWrap className="mt-28">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <Eyebrow>How an engagement runs</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-10">
              Four steps from idea to shipped product
            </h2>
            <div>
              <ProcessStep n="01" title="Discovery call" desc="We scope the problem together — free, no obligation, 30 minutes. You'll leave with a clear read on whether we're the right fit." />
              <ProcessStep n="02" title="Fixed-price plan" desc="One clear price, one clear deliverable, no change-order surprises. We re-quote before any extra work starts." />
              <ProcessStep n="03" title="Build sprint" desc="Shipped in 2–4 weeks depending on scope, using AI-accelerated delivery. You see progress weekly, not at the end." />
              <ProcessStep n="04" title="Launch & support" desc="You go live. Stay on a retainer if you want us to keep building — or take the code and run with it yourself." />
            </div>
          </div>

          {/* Why card */}
          <div className="surface-2 rounded-3xl p-8 glow-subtle">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-xl grad-bg flex items-center justify-center">
                <Zap size={17} className="text-black" />
              </div>
              <span className="font-display font-semibold text-lg">Why One8Labs?</span>
            </div>
            <ul className="flex flex-col gap-4">
              {[
                { icon: Clock,    text: "Ship in weeks, not months — AI-accelerated delivery on every build" },
                { icon: Shield,   text: "Fixed prices up front — you always know what you're paying before we start" },
                { icon: Code2,    text: "Source code is 100% yours on delivery — no lock-in, ever" },
                { icon: Bot,      text: "AI wired in from day one, not bolted on as an afterthought" },
                { icon: BarChart3,text: "Built from real client patterns — not feature lists dreamed up in advance" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <li key={i} className="flex gap-3 text-sm text-[var(--dim)]">
                    <div className="w-6 h-6 rounded-lg bg-[rgba(255,106,43,0.12)] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={13} className="text-[var(--grad-mid)]" />
                    </div>
                    <span>{item.text}</span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 pt-6 border-t border-[var(--border)]">
              <div className="flex items-center gap-2 text-xs font-mono-lab uppercase text-[var(--dim)]">
                <span className="ping-dot" />
                <span className="ml-3">Open for new projects</span>
              </div>
            </div>
          </div>
        </div>
      </SectionWrap>

      <CTABanner go={go} />
    </>
  );
}

/* ─────────────────────── SERVICES PAGE ─────────────────────── */

function ServiceCard({ tag, title, price, cadence, items, featured, id }) {
  return (
    <div
      id={id}
      className={`card-hover rounded-2xl p-8 flex flex-col relative ${
        featured ? "glow-card surface-2" : "surface"
      }`}
    >
      {featured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 grad-bg text-black text-[10px] font-bold px-4 py-1 rounded-full font-mono-lab uppercase tracking-wider whitespace-nowrap">
          Most popular
        </div>
      )}
      <span className="font-mono-lab text-[10px] uppercase text-[var(--dim)] mb-4">{tag}</span>
      <h3 className="font-display text-xl font-semibold mb-2">{title}</h3>
      <div className="flex items-baseline gap-1.5 mb-7">
        <span className="font-display text-4xl font-bold grad-text">{price}</span>
        <span className="text-[var(--dim)] text-sm">{cadence}</span>
      </div>
      <ul className="flex flex-col gap-3.5 flex-1 mb-8">
        {items.map((it, i) => (
          <li key={i} className="flex gap-3 text-sm text-[var(--dim)]">
            <CheckCircle2 size={16} className="text-[var(--grad-mid)] shrink-0 mt-0.5" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {}}
        className={`w-full py-3 rounded-full text-sm font-semibold transition-all duration-200 ${
          featured
            ? "grad-bg btn-primary text-black"
            : "surface btn-ghost border border-[var(--border)] text-white hover:border-[var(--grad-mid)] hover:text-[var(--grad-mid)]"
        }`}
      >
        Get started
      </button>
    </div>
  );
}

function Services({ go }) {
  const faqs = [
    {
      q: "Do you take equity instead of cash?",
      a: "Not by default — we price in cash so both sides stay aligned on delivery, not dilution. We're open to a hybrid arrangement on a case-by-case basis for the right project.",
    },
    {
      q: "What happens if scope changes mid-build?",
      a: "We re-scope and re-quote before any extra work starts. You'll never see a surprise invoice. Everything is agreed in writing before we touch another line of code.",
    },
    {
      q: "Can you work alongside our existing developer?",
      a: "Yes — we regularly hand off clean, documented code, or work in parallel on a separate workstream. We play well with others.",
    },
    {
      q: "How fast can you actually ship?",
      a: "A single-workflow MVP typically ships in 2–4 weeks. Automation setups are often live in under two weeks. We'll tell you the honest timeline in your scoping call.",
    },
    {
      q: "Do we need a tech co-founder already?",
      a: "No. We work with non-technical founders all the time. We'll explain everything in plain English and make sure you understand what you're getting.",
    },
    {
      q: "What stack do you build on?",
      a: "Whatever fits the problem: React, Next.js, Node, Python, Supabase, AWS. We don't lock you into a proprietary stack — the code is yours and portable.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 pt-16">
      {/* Header */}
      <Eyebrow>What we build</Eyebrow>
      <h1 className="font-display text-4xl md:text-6xl font-bold mb-5 max-w-3xl fade-up">
        Services for teams that can't afford to wait
      </h1>
      <p className="text-[var(--dim)] text-lg max-w-xl mb-16 fade-up-d1 leading-relaxed">
        Fixed-price, AI-accelerated delivery for pre-seed and seed startups.
        No bloated retainers until you're actually ready for one.
      </p>

      {/* Pricing cards */}
      <div className="grid md:grid-cols-3 gap-5 mb-24 mt-6">
        <ServiceCard
          id="service-mvp"
          tag="Build · One-time"
          title="AI-Accelerated MVP Build"
          price="$4,999"
          cadence="from · 2–4 wks"
          featured
          items={[
            "One core user workflow, fully built and deployed",
            "AI features wired in from day one, not bolted on",
            "Mobile-responsive, production-ready code",
            "Source code 100% yours on delivery",
            "2 weeks of post-launch bug fixes included",
            "Handoff documentation and walkthrough call",
          ]}
        />
        <ServiceCard
          id="service-automation"
          tag="Automate · Monthly"
          title="AI Workflow Automation"
          price="$1,499"
          cadence="/mo · ongoing"
          items={[
            "Automate one manual process per month",
            "Support, outreach, or internal reporting",
            "Built on your existing tools — no rip-and-replace",
            "Monitored and adjusted every month",
            "Monthly review call included",
            "Cancel anytime, no lock-in",
          ]}
        />
        <ServiceCard
          id="service-retainer"
          tag="Retain · Monthly"
          title="Build & Maintain Retainer"
          price="$2,999"
          cadence="/mo · ongoing"
          items={[
            "Continued feature development post-launch",
            "Priority turnaround on fixes and bugs",
            "Monthly build-planning call",
            "Access to our AI tooling and automations",
            "Scales up or down as your needs change",
            "For teams past their first launch",
          ]}
        />
      </div>

      {/* Comparison note */}
      <div className="surface-2 rounded-2xl p-7 mb-24 flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl grad-bg flex items-center justify-center shrink-0">
            <BarChart3 size={18} className="text-black" />
          </div>
          <div>
            <p className="font-semibold text-sm mb-1">How we compare to traditional agencies</p>
            <p className="text-[var(--dim)] text-sm">Same quality output at 40–60% less cost and 3× the speed — because we use AI-native workflows from day one.</p>
          </div>
        </div>
        <button
          id="compare-book-cta"
          onClick={() => go("contact")}
          className="grad-bg btn-primary text-black font-semibold px-6 py-2.5 rounded-full text-sm whitespace-nowrap inline-flex items-center gap-2"
        >
          Book a call <ArrowRight size={14} />
        </button>
      </div>

      {/* FAQ */}
      <Eyebrow>Common questions</Eyebrow>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-10">
        Everything you want to know before the call
      </h2>
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 mb-28">
        {faqs.map((f, i) => (
          <div key={i} className="border-l-2 border-[rgba(255,106,43,0.25)] pl-5">
            <h4 className="font-semibold mb-2 text-white">{f.q}</h4>
            <p className="text-[var(--dim)] text-sm leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>

      <CTABanner go={go} />
    </div>
  );
}

/* ─────────────────────── PLATFORM PAGE ─────────────────────── */

function Platform({ go }) {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const lab = [
    {
      icon: Sparkles,
      title: "AI onboarding checklist generator",
      desc: "Turns a new hire's role and team context into a tailored first-week checklist — no manual HR overhead required.",
      eta: "Q2 2026",
    },
    {
      icon: Rocket,
      title: "Automated investor update drafts",
      desc: "Pulls your MRR, milestones, and hiring data then drafts your monthly investor update for you to edit and send.",
      eta: "Q3 2026",
    },
    {
      icon: Wrench,
      title: "Lightweight ops dashboard",
      desc: "One screen for the key metrics that are currently scattered across Notion, Slack, Google Sheets, and three other tools.",
      eta: "Q3 2026",
    },
    {
      icon: MessageSquare,
      title: "AI support triage bot",
      desc: "Routes inbound support messages to the right person or auto-resolves common queries — built on your actual docs.",
      eta: "Q4 2026",
    },
    {
      icon: BarChart3,
      title: "Cohort retention tracker",
      desc: "Surfaces which user segments are staying and why, without needing a data analyst or a separate analytics tool.",
      eta: "Q4 2026",
    },
    {
      icon: Bot,
      title: "Outreach sequence builder",
      desc: "Writes personalised cold outreach sequences from a target ICP description. Built on GPT-4o, tested across real sends.",
      eta: "Q1 2027",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 pt-16">
      {/* Header */}
      <Eyebrow>Roadmap</Eyebrow>
      <h1 className="font-display text-4xl md:text-6xl font-bold mb-5 max-w-3xl fade-up">
        The tools and platform are next — built from what we learn
      </h1>
      <p className="text-[var(--dim)] text-lg max-w-2xl mb-6 fade-up-d1 leading-relaxed">
        We're not guessing what to build. Every tool below comes from a pattern
        we've watched repeat across real client work — not a feature list dreamed
        up in advance.
      </p>
      <div className="flex items-center gap-3 mb-16 fade-up-d2">
        <Tag tone="live">Business services — live now</Tag>
        <MoveRight size={14} className="text-[var(--dim)]" />
        <Tag tone="lab">Tools — in the lab</Tag>
        <MoveRight size={14} className="text-[var(--dim)]" />
        <Tag tone="road">SaaS platform — roadmap</Tag>
      </div>

      {/* Tool cards */}
      <div className="grid md:grid-cols-3 gap-5 mb-20">
        {lab.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="surface card-hover rounded-2xl p-7">
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-xl surface-2 border border-[var(--border)] flex items-center justify-center">
                  <Icon size={19} className="text-[var(--grad-mid)]" />
                </div>
                <span className="font-mono-lab text-[10px] text-[var(--dim)] border border-[var(--border)] rounded-full px-2.5 py-1">
                  ETA {item.eta}
                </span>
              </div>
              <span className="font-mono-lab text-[10px] uppercase text-[var(--dim)] block mb-2">In the lab</span>
              <h3 className="font-semibold text-base mb-2">{item.title}</h3>
              <p className="text-[var(--dim)] text-sm leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Platform vision */}
      <div className="surface-2 glow-card rounded-3xl p-9 md:p-14 mb-20 relative overflow-hidden">
        <div className="absolute inset-0 hero-bg pointer-events-none" />
        <div className="relative grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Tag tone="road">SaaS platform</Tag>
            <h2 className="font-display text-2xl md:text-3xl font-bold mt-5 mb-4">
              One dashboard for every automation we've built for you
            </h2>
            <p className="text-[var(--dim)] leading-relaxed text-sm mb-6">
              The eventual vision: a single SaaS product where the tools connect,
              the metrics are visible, and the automations run without anyone
              babysitting them. We'll ship it when the tools are proven — not before.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "Unified view of all your automations",
                "Real-time metrics from every workflow",
                "One-click audit trail for every AI action",
                "Starts from your first One8Labs build",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-[var(--dim)]">
                  <CheckCircle2 size={15} className="text-[var(--grad-mid)] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="surface rounded-2xl p-6 border-[var(--border-2)]">
            <div className="font-mono-lab text-[11px] uppercase text-[var(--dim)] mb-4">Platform status</div>
            {[
              { label: "Business Services", status: "Live", color: "bg-emerald-500" },
              { label: "Business Tools", status: "In lab", color: "bg-amber-500" },
              { label: "SaaS Platform", status: "Roadmap", color: "bg-[var(--border)]" },
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0">
                <span className="text-sm">{row.label}</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${row.color}`} />
                  <span className="font-mono-lab text-[10px] text-[var(--dim)] uppercase">{row.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Waitlist */}
      <div className="surface-2 rounded-3xl p-9 md:p-12 flex flex-col md:flex-row items-center gap-8 justify-between mb-4">
        <div className="max-w-md">
          <div className="w-10 h-10 rounded-xl grad-bg flex items-center justify-center mb-4">
            <Mail size={17} className="text-black" />
          </div>
          <h3 className="font-display text-2xl font-bold mb-2">Get notified when a tool ships</h3>
          <p className="text-[var(--dim)] text-sm leading-relaxed">
            No spam — one email when something in the lab is ready for real users. Unsubscribe any time.
          </p>
        </div>
        {joined ? (
          <div className="text-center">
            <CheckCircle2 size={36} className="mx-auto mb-3 text-[var(--grad-mid)]" />
            <p className="font-semibold mb-1">You're on the list</p>
            <p className="text-[var(--dim)] text-sm">We'll email you when the first tool ships.</p>
          </div>
        ) : (
          <form
            id="platform-waitlist-form"
            className="flex w-full md:w-auto gap-2"
            onSubmit={(e) => { e.preventDefault(); if (email) setJoined(true); }}
          >
            <input
              type="email"
              required
              placeholder="you@startup.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="o8-input rounded-full px-5 py-2.5 text-sm flex-1 md:w-64"
              id="waitlist-email"
            />
            <button
              type="submit"
              id="waitlist-submit"
              className="grad-bg btn-primary text-black text-sm font-semibold px-5 py-2.5 rounded-full whitespace-nowrap"
            >
              Join waitlist
            </button>
          </form>
        )}
      </div>

      <CTABanner go={go} />
    </div>
  );
}

/* ─────────────────────── ABOUT PAGE ─────────────────────── */

function About({ go }) {
  const values = [
    {
      icon: Zap,
      title: "Ship fast",
      desc: "A working build beats a perfect deck. We measure ourselves in weeks, not quarters. Speed is a feature.",
    },
    {
      icon: Shield,
      title: "Price honestly",
      desc: "Fixed prices, scoped up front. If something changes, you hear about it before it's billed — not after.",
    },
    {
      icon: Bot,
      title: "Build what repeats",
      desc: "We turn client requests into products only once we've seen the same need three times over. No guesswork.",
    },
    {
      icon: Code2,
      title: "Your code, always",
      desc: "Everything we build is yours. Clean, documented, portable — no proprietary lock-in, ever.",
    },
    {
      icon: Users,
      title: "Small team, big output",
      desc: "We're not a factory. Every project gets senior attention. That's only possible because we stay lean and use AI right.",
    },
    {
      icon: Star,
      title: "No vaporware",
      desc: "We only build tools we'd use ourselves, and only ship them when they're proven across real client work.",
    },
  ];

  const team = [
    { name: "One8Labs team", role: "Builders · Designers · AI engineers", location: "India · Remote-first" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 pt-16">
      {/* Header */}
      <Eyebrow>Who we are</Eyebrow>
      <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 max-w-3xl fade-up">
        A small build studio, not a big agency
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-20">
        <div>
          <p className="text-[var(--dim)] text-lg leading-relaxed mb-5">
            One8Labs is a small team that builds AI-native products and
            automations for early-stage startups — the ones who need to move
            fast without hiring a full engineering team yet.
          </p>
          <p className="text-[var(--dim)] text-lg leading-relaxed">
            We started as builders first. Every service we sell is something
            we'd want if we were the ones racing to launch — and everything we
            eventually turn into our own product will be something we've
            already proven works, across real client work, first.
          </p>
        </div>

        <div className="surface-2 rounded-2xl p-7 glow-subtle">
          <div className="flex items-center gap-3 mb-6">
            <img src="/logo.svg" alt="One8Labs" className="w-12 h-12 rounded-xl object-contain" onError={(e)=>{e.target.style.display='none'}} />
            <div>
              <p className="font-semibold">One8Labs</p>
              <p className="text-[var(--dim)] text-sm">AI-native build studio</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { label: "Founded", value: "2026" },
              { label: "Team size", value: "4 people" },
              { label: "Location", value: "India · Remote-first" },
              { label: "Focus", value: "Pre-seed to Seed startups" },
              { label: "Status", value: "Taking new clients" },
            ].map((row, i) => (
              <div key={i} className="flex justify-between py-2.5 border-b border-[var(--border)] last:border-0 text-sm">
                <span className="text-[var(--dim)]">{row.label}</span>
                <span className="font-medium">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <Eyebrow>What we hold ourselves to</Eyebrow>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-10">Six things that don't move</h2>
      <div className="grid md:grid-cols-3 gap-5 mb-24">
        {values.map((v, i) => {
          const Icon = v.icon;
          return (
            <div key={i} className="surface card-hover rounded-2xl p-6">
              <div className="w-9 h-9 rounded-xl bg-[rgba(255,106,43,0.12)] flex items-center justify-center mb-4">
                <Icon size={16} className="text-[var(--grad-mid)]" />
              </div>
              <h4 className="font-semibold mb-2">{v.title}</h4>
              <p className="text-[var(--dim)] text-sm leading-relaxed">{v.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Manifesto pull quote */}
      <div className="surface-2 glow-card rounded-3xl p-10 md:p-14 text-center mb-4 relative overflow-hidden">
        <div className="absolute inset-0 hero-bg pointer-events-none" />
        <div className="relative max-w-2xl mx-auto">
          <div className="font-mono-lab text-5xl grad-text mb-6 select-none">"</div>
          <blockquote className="font-display text-2xl md:text-3xl font-semibold leading-snug mb-6">
            Every product we ship starts as a service we deliver. That's not a stepping stone — that's the strategy.
          </blockquote>
          <cite className="not-italic font-mono-lab text-[11px] uppercase text-[var(--dim)]">
            — One8Labs founding principle
          </cite>
        </div>
      </div>

      <CTABanner go={go} />
    </div>
  );
}

/* ─────────────────────── CONTACT PAGE ─────────────────────── */

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <div className="max-w-5xl mx-auto px-6 pt-16 pb-28">
      <div className="grid md:grid-cols-[1fr_1.4fr] gap-14 items-start">
        {/* Left info column */}
        <div>
          <Eyebrow>Get in touch</Eyebrow>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-5 fade-up">
            Tell us what you're building
          </h1>
          <p className="text-[var(--dim)] text-lg leading-relaxed mb-10 fade-up-d1">
            30 minutes, no pitch deck required. We'll tell you honestly if
            we're the right fit — and what we'd build first if we were you.
          </p>

          {/* Contact cards */}
          <div className="flex flex-col gap-4">
            <a
              href="mailto:contact.one8labs@gmail.com"
              id="contact-email-link"
              className="surface card-hover rounded-xl p-5 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl grad-bg flex items-center justify-center shrink-0">
                <Mail size={17} className="text-black" />
              </div>
              <div>
                <p className="text-xs text-[var(--dim)] mb-0.5">Email us directly</p>
                <p className="font-medium text-sm">contact.one8labs@gmail.com</p>
              </div>
              <ExternalLink size={14} className="text-[var(--dim)] ml-auto" />
            </a>

            <a
              href="tel:+917666379380"
              id="contact-phone-link"
              className="surface card-hover rounded-xl p-5 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl grad-bg flex items-center justify-center shrink-0">
                <Phone size={17} className="text-black" />
              </div>
              <div>
                <p className="text-xs text-[var(--dim)] mb-0.5">Call us directly</p>
                <p className="font-medium text-sm">+91 76663 79380</p>
              </div>
              <ExternalLink size={14} className="text-[var(--dim)] ml-auto" />
            </a>

            <div className="surface rounded-xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[rgba(255,106,43,0.12)] flex items-center justify-center shrink-0">
                <Clock size={17} className="text-[var(--grad-mid)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--dim)] mb-0.5">Response time</p>
                <p className="font-medium text-sm">Within one business day</p>
              </div>
            </div>

            <div className="surface rounded-xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[rgba(255,106,43,0.12)] flex items-center justify-center shrink-0">
                <Zap size={17} className="text-[var(--grad-mid)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--dim)] mb-0.5">Current availability</p>
                <p className="font-medium text-sm">Open for new projects</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right form column */}
        <div>
          {sent ? (
            <div className="surface-2 rounded-2xl p-12 text-center glow-subtle">
              <div className="w-16 h-16 grad-bg rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 size={28} className="text-black" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-2">Message sent!</h3>
              <p className="text-[var(--dim)] text-sm mb-6">We'll reply within one business day. Talk soon.</p>
              <button
                id="contact-send-another"
                onClick={() => { setSent(false); setForm({ name: "", email: "", company: "", service: "", message: "" }); }}
                className="text-sm text-[var(--dim)] hover:text-white underline transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              id="contact-form"
              className="surface rounded-2xl p-8 flex flex-col gap-5"
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="font-mono-lab text-[11px] uppercase text-[var(--dim)] block mb-2">Name *</label>
                  <input
                    id="contact-name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="o8-input rounded-xl px-4 py-3 text-sm w-full"
                    placeholder="Jane Founder"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="font-mono-lab text-[11px] uppercase text-[var(--dim)] block mb-2">Email *</label>
                  <input
                    id="contact-email"
                    name="email"
                    required
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="o8-input rounded-xl px-4 py-3 text-sm w-full"
                    placeholder="jane@startup.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-company" className="font-mono-lab text-[11px] uppercase text-[var(--dim)] block mb-2">Company</label>
                <input
                  id="contact-company"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="o8-input rounded-xl px-4 py-3 text-sm w-full"
                  placeholder="Startup Inc."
                />
              </div>

              <div>
                <label htmlFor="contact-service" className="font-mono-lab text-[11px] uppercase text-[var(--dim)] block mb-2">What are you interested in?</label>
                <select
                  id="contact-service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="o8-input rounded-xl px-4 py-3 text-sm w-full appearance-none cursor-pointer"
                >
                  <option value="">Select a service...</option>
                  <option value="mvp">AI-Accelerated MVP Build ($4,999+)</option>
                  <option value="automation">AI Workflow Automation ($1,499/mo)</option>
                  <option value="retainer">Build & Maintain Retainer ($2,999/mo)</option>
                  <option value="other">Not sure yet — let's talk</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="font-mono-lab text-[11px] uppercase text-[var(--dim)] block mb-2">What are you building? *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="o8-input rounded-xl px-4 py-3 text-sm w-full resize-none"
                  placeholder="Tell us what you're building, what stage you're at, and where you're stuck..."
                />
              </div>

              <button
                type="submit"
                id="contact-submit"
                className="grad-bg btn-primary text-black font-semibold px-6 py-3.5 rounded-full inline-flex items-center justify-center gap-2 text-sm"
              >
                Send message <Send size={15} />
              </button>

              <p className="text-center text-xs text-[var(--dim)]">
                We reply within one business day · No spam, ever
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── APP ROOT ─────────────────────── */

export default function App() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (id) => {
    setPage(id);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--white)" }}>
      <Nav page={page} go={go} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main>
        {page === "home"     && <Home go={go} />}
        {page === "services" && <Services go={go} />}
        {page === "platform" && <Platform go={go} />}
        {page === "about"    && <About go={go} />}
        {page === "contact"  && <Contact />}
      </main>

      <Footer go={go} />
    </div>
  );
}
