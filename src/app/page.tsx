import { SiteHeader } from "@/components/site-header"
import {
  CONTACT_EMAIL,
  GITHUB_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  TELEGRAM_URL,
} from "@/lib/site"
import { cn } from "@/lib/utils"
import { AlertTriangle, ArrowUpRight, Github, Send } from "lucide-react"
import Image from "next/image"
import type { ReactNode } from "react"

type Project = {
  title: string
  description: string
  link: string
  tags: string[]
  builtWith: string
  platform: "web" | "desktop"
  /** Texto del distintivo de plataforma en la tarjeta */
  platformLabel: string
  /** Texto del botón principal */
  cta: string
  /** Nombre base de las capturas en public/images/projects/: <slug>-light.webp y <slug>-dark.webp (1440×900) */
  image: string
  imageAlt: string
  featured?: boolean
}

const projects: Project[] = [
  {
    title: "Binarytacora",
    description:
      "Bitácora de trading que registra sola cada operación de IQ Option, Exnova, Casa Trade y Pocket Option con las velas de antes, durante y después. Diario, estadísticas y límites.",
    link: "https://binarytacora.dagam.dev",
    tags: ["Tauri", "Svelte", "Rust", "SQLite", "TypeScript"],
    builtWith: "Claude Code",
    platform: "desktop",
    platformLabel: "App de escritorio · Windows",
    cta: "Descargar gratis",
    image: "binarytacora",
    imageAlt: "Captura de la web de Binarytacora: «Cada operación, con el mercado que la rodeaba»",
    featured: true,
  },
  {
    title: "Gestión Masaniello",
    description:
      "La mítica plantilla de Excel del método Masaniello, convertida en una web moderna: te dice cuánto invertir en cada operación para cerrar el ciclo con el objetivo.",
    link: "https://masaniello.dagam.dev",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand"],
    builtWith: "Claude Code",
    platform: "web",
    platformLabel: "Web",
    cta: "Abrir",
    image: "masaniello",
    imageAlt: "Captura de Gestión Masaniello: calculadora del método Masaniello",
  },
  {
    title: "Calculadora de interés compuesto",
    description:
      "Calcula el monto de cada operación a partir de un capital inicial con interés compuesto. Ajusta cuánto reinviertes y cuánto aseguras en cada paso.",
    link: "https://interes.dagam.dev",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand"],
    builtWith: "v0",
    platform: "web",
    platformLabel: "Web",
    cta: "Abrir",
    image: "interes",
    imageAlt: "Captura de la calculadora de interés compuesto: tabla de montos por operación",
  },
]

const shotSrc = (project: Project, theme: "light" | "dark") => `/images/projects/${project.image}-${theme}.webp`

const featuredProject = projects.find((project) => project.featured)
const otherProjects = projects.filter((project) => !project.featured)

const timeline = [
  {
    when: "2020",
    title: "Bots de Discord",
    text: "Un amigo me enseñó a crear bots y me enganché. Llegué a tener un bot verificado por Discord.",
  },
  {
    when: "2022",
    title: "Bootcamp full-stack",
    text: "React en el front, Express en el back. Mi primera base formal de desarrollo web.",
  },
  {
    when: "Después",
    title: "Autodidacta",
    text: "TypeScript, Next.js, MongoDB, Tailwind y Astro, aprendidos construyendo proyectos propios.",
  },
]

const currentStack = ["Next.js", "React", "TypeScript", "Tailwind", "Svelte", "Tauri", "Rust", "SQLite"]

// Velas decorativas del hero: dirección, desplazamiento desde abajo, cuerpo y mechas (px)
const candles = [
  { up: false, offset: 40, body: 50, wickTop: 14, wickBottom: 10 },
  { up: true, offset: 30, body: 40, wickTop: 10, wickBottom: 12 },
  { up: true, offset: 56, body: 36, wickTop: 16, wickBottom: 8 },
  { up: false, offset: 48, body: 30, wickTop: 8, wickBottom: 14 },
  { up: true, offset: 70, body: 56, wickTop: 12, wickBottom: 10 },
  { up: true, offset: 110, body: 44, wickTop: 18, wickBottom: 8 },
  { up: false, offset: 96, body: 26, wickTop: 8, wickBottom: 12 },
  { up: true, offset: 130, body: 60, wickTop: 14, wickBottom: 10 },
  { up: true, offset: 176, body: 48, wickTop: 20, wickBottom: 10, last: true },
]

// Datos estructurados (schema.org) para que Google entienda quién eres y qué proyectos tienes
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      inLanguage: "es",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      url: SITE_URL,
      image: `${SITE_URL}/images/icono.png`,
      email: `mailto:${CONTACT_EMAIL}`,
      jobTitle: "Desarrollador web full-stack",
      knowsAbout: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Svelte", "Tauri", "Trading", "Opciones binarias"],
      sameAs: [GITHUB_URL, TELEGRAM_URL],
    },
    ...projects.map((project) => ({
      "@type": project.platform === "desktop" ? "SoftwareApplication" : "WebApplication",
      name: project.title,
      description: project.description,
      url: project.link,
      screenshot: [shotSrc(project, "light"), shotSrc(project, "dark")].map((src) => `${SITE_URL}${src}`),
      applicationCategory: "FinanceApplication",
      operatingSystem: project.platform === "desktop" ? "Windows 10, Windows 11" : "Web",
      inLanguage: "es",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      author: { "@id": `${SITE_URL}/#person` },
    })),
  ],
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="mb-3 font-mono text-[13px] text-primary">{children}</p>
}

function TagList({ tags, label }: { tags: string[]; label: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5 font-mono text-xs text-muted-foreground">
      {tags.map((tag) => (
        <li key={tag} className="rounded-md border border-border-strong px-2.5 py-1.5">
          {tag}
        </li>
      ))}
    </ul>
  )
}

function WindowDots({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className="flex gap-1.5">
      {[0, 1, 2].map((dot) => (
        <span key={dot} className={cn("size-2.5 rounded-full", className)} />
      ))}
    </span>
  )
}

/** Captura del proyecto dentro de un marco de navegador */
function BrowserShot({ project, priority }: { project: Project; priority?: boolean }) {
  const host = new URL(project.link).host

  return (
    <div className="overflow-hidden rounded-t-xl border border-b-0 border-border-strong">
      <div className="flex items-center gap-3 border-b border-border-strong bg-secondary px-3.5 py-2.5">
        <WindowDots className="bg-window-dot" />
        <span className="truncate font-mono text-xs text-subtle">{host}</span>
      </div>
      {/* Una captura por tema; se alternan con CSS para seguir también al botón de tema, no solo al sistema */}
      {(["light", "dark"] as const).map((theme) => (
        <Image
          key={theme}
          src={shotSrc(project, theme)}
          alt={project.imageAlt}
          width={1440}
          height={900}
          sizes={project.featured ? "(min-width: 1024px) 720px, 100vw" : "(min-width: 1024px) 560px, 100vw"}
          className={cn("h-auto w-full", theme === "light" ? "block dark:hidden" : "hidden dark:block")}
          priority={priority}
        />
      ))}
    </div>
  )
}

function ProjectLink({ project, primary }: { project: Project; primary?: boolean }) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.cta}: ${project.title}`}
      className={cn(
        "inline-flex items-center gap-2 font-semibold text-[15px] transition-colors",
        primary
          ? "rounded-xl bg-primary px-5 py-3.5 text-primary-foreground hover:bg-primary/90"
          : "rounded-[10px] border border-border-strong px-4 py-3 hover:bg-accent",
      )}
    >
      {project.cta}
      <ArrowUpRight className="size-4" aria-hidden="true" />
    </a>
  )
}

const pill = "rounded-full px-3 py-1.5 text-[13px]"

export default function Home() {
  const year = new Date().getFullYear()

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />

      <main id="top" className="pt-18">
        {/* Hero */}
        <section className="mx-auto flex max-w-300 flex-wrap items-center gap-14 px-6 pt-24 pb-22">
          <div className="min-w-0 flex-[1_1_520px]">
            <p className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-border-strong px-3.5 py-2 font-mono text-[13px] text-muted-foreground">
              <span aria-hidden="true" className="size-2 rounded-full bg-candle-up" />
              Disponible para proyectos
            </p>
            <h1 className="mb-6 text-[clamp(44px,6vw,76px)] leading-[1.02] font-bold tracking-[-0.035em] text-balance">
              Software para traders, hecho por un trader.
            </h1>
            <p className="mb-9 max-w-140 text-[19px] leading-relaxed text-muted-foreground">
              Soy David, desarrollador web full-stack. Construyo herramientas web y de escritorio que resuelven los
              problemas que yo mismo tengo al operar opciones binarias.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 rounded-xl bg-primary px-6 py-4 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Ver proyectos
                <ArrowUpRight className="size-4.5" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center rounded-xl border border-border-strong px-6 py-4 font-semibold transition-colors hover:bg-accent"
              >
                Contactar
              </a>
            </div>
          </div>

          {/* Panel decorativo con velas */}
          <div
            aria-hidden="true"
            className="min-w-0 max-w-130 flex-[1_1_400px] overflow-hidden rounded-[20px] border border-border bg-card"
          >
            <div className="flex items-center justify-between border-b border-border px-4.5 py-3.5 font-mono text-xs text-subtle">
              <span>~/dagamdev</span>
              <WindowDots className="bg-border-strong" />
            </div>
            <div className="flex h-75 items-end justify-between gap-2 bg-[linear-gradient(var(--grid-line)_1px,transparent_1px)] bg-size-[100%_50px] px-6 py-7">
              {candles.map((candle, index) => {
                const color = candle.last ? "bg-primary" : candle.up ? "bg-candle-up" : "bg-candle-down"
                return (
                  <div key={index} className="flex flex-1 flex-col items-center" style={{ marginBottom: candle.offset }}>
                    <div className={cn("w-0.5", color)} style={{ height: candle.wickTop }} />
                    <div className={cn("w-full rounded-xs", color)} style={{ height: candle.body }} />
                    <div className={cn("w-0.5", color)} style={{ height: candle.wickBottom }} />
                  </div>
                )
              })}
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-border px-4.5 py-4 font-mono text-xs text-subtle">
              {["next.js", "react", "svelte", "tauri", "rust", "typescript"].map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Proyectos */}
        <section id="projects" className="border-t border-border">
          <div className="mx-auto max-w-300 px-6 py-24">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <div>
                <SectionLabel>01 / Proyectos</SectionLabel>
                <h2 className="text-[clamp(32px,4vw,48px)] font-bold tracking-[-0.03em]">Herramientas que uso cada día</h2>
              </div>
              <p className="max-w-105 leading-relaxed text-muted-foreground">
                Gratis, en español y pensadas para opciones binarias. Web y escritorio.
              </p>
            </div>

            {featuredProject && (
              <article className="mb-6 grid overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
                <div className="min-w-0 bg-muted px-4 pt-4 sm:px-7 sm:pt-7">
                  <BrowserShot project={featuredProject} priority />
                </div>
                <div className="flex min-w-0 flex-col gap-4.5 p-7 sm:p-9">
                  <div className="flex flex-wrap gap-2">
                    <span className={cn(pill, "bg-badge font-medium text-badge-foreground")}>Destacado</span>
                    <span className={cn(pill, "bg-secondary text-muted-foreground")}>{featuredProject.platformLabel}</span>
                  </div>
                  <h3 className="text-[34px] font-bold tracking-[-0.02em]">{featuredProject.title}</h3>
                  <p className="leading-[1.65] text-muted-foreground">{featuredProject.description}</p>
                  <TagList tags={featuredProject.tags} label={`Tecnologías de ${featuredProject.title}`} />
                  <p className="text-[13px] text-subtle">Hecho con {featuredProject.builtWith}</p>
                  <div className="mt-auto pt-2">
                    <ProjectLink project={featuredProject} primary />
                  </div>
                </div>
              </article>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              {otherProjects.map((project) => (
                <article key={project.link} className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card">
                  <div className="bg-muted px-4 pt-4 sm:px-6 sm:pt-6">
                    <BrowserShot project={project} />
                  </div>
                  <div className="flex grow flex-col gap-4 p-7 sm:p-8">
                    <span className={cn(pill, "self-start bg-secondary text-muted-foreground")}>{project.platformLabel}</span>
                    <h3 className="text-[26px] font-bold tracking-[-0.02em]">{project.title}</h3>
                    <p className="leading-[1.65] text-muted-foreground">{project.description}</p>
                    <TagList tags={project.tags} label={`Tecnologías de ${project.title}`} />
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
                      <span className="text-[13px] text-subtle">Hecho con {project.builtWith}</span>
                      <ProjectLink project={project} />
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div
              role="note"
              className="mt-8 flex items-start gap-3.5 rounded-[14px] border border-border-strong bg-card px-5 py-4.5 text-sm leading-relaxed text-muted-foreground"
            >
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-candle-down" aria-hidden="true" />
              <p>
                <strong className="text-foreground">Aviso de riesgo:</strong> el trading de opciones binarias conlleva un
                alto riesgo de pérdida de capital. Estas herramientas tienen fines informativos y educativos; no
                constituyen asesoramiento financiero ni recomendaciones de inversión.
              </p>
            </div>
          </div>
        </section>

        {/* Sobre mí */}
        <section id="about" className="border-t border-border bg-section-alt">
          <div className="mx-auto flex max-w-300 flex-wrap gap-16 px-6 py-24">
            <div className="min-w-0 flex-[1_1_400px]">
              <SectionLabel>02 / Sobre mí</SectionLabel>
              <h2 className="mb-6 text-[clamp(32px,4vw,48px)] font-bold tracking-[-0.03em]">Empecé con un bot de Discord.</h2>
              <div className="space-y-4.5 text-[17px] leading-[1.7] text-muted-foreground">
                <p>
                  Soy David, desarrollador web full-stack. Fuera del código opero opciones binarias, y esa afición inspira
                  casi todo lo que construyo: herramientas sencillas para problemas que yo mismo tengo al operar.
                </p>
                <p>
                  Uso IA como Claude Code y v0 para construir más rápido, sin dejar de revisar y entender cada línea que
                  publico. Puedes ver parte de mi trabajo en{" "}
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline decoration-primary underline-offset-4 hover:text-primary"
                  >
                    GitHub
                  </a>
                  .
                </p>
                <p>No soy asesor financiero, no doy mentorías ni vendo estrategias: lo que hago es software.</p>
              </div>
            </div>

            <ol className="flex min-w-0 flex-[1_1_460px] flex-col">
              {timeline.map((item) => (
                <li key={item.title} className="relative ml-2 border-l border-border-strong pb-9 pl-7">
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 -left-1.5 size-2.75 rounded-full border-2 border-timeline-dot bg-section-alt"
                  />
                  <p className="mb-1.5 font-mono text-[13px] text-subtle">{item.when}</p>
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="text-[15px] leading-[1.65] text-muted-foreground">{item.text}</p>
                </li>
              ))}
              <li className="relative ml-2 border-l border-transparent pl-7">
                <span aria-hidden="true" className="absolute top-1.25 -left-1.75 size-3.5 rounded-full bg-primary" />
                <p className="mb-1.5 font-mono text-[13px] text-primary">Hoy</p>
                <h3 className="mb-2 text-xl font-semibold">Herramientas para traders</h3>
                <p className="mb-4 text-[15px] leading-[1.65] text-muted-foreground">
                  Apps web con Next.js y apps de escritorio con Tauri, Svelte y Rust.
                </p>
                <TagList tags={currentStack} label="Stack actual" />
              </li>
            </ol>
          </div>
        </section>

        {/* Contacto */}
        <section id="contact" className="border-t border-border">
          <div className="mx-auto max-w-300 px-6 py-28 text-center">
            <SectionLabel>03 / Contacto</SectionLabel>
            <h2 className="mb-5 text-[clamp(36px,5vw,60px)] font-bold tracking-[-0.03em] text-balance">
              ¿Tienes una idea? Hablemos.
            </h2>
            <p className="mx-auto mb-9 max-w-130 text-lg leading-relaxed text-muted-foreground">
              Disponible para proyectos de desarrollo web y colaboraciones.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mb-9 inline-block border-b-2 border-primary pb-1 text-[clamp(24px,3.4vw,40px)] font-semibold tracking-[-0.02em] break-all transition-colors hover:text-primary"
            >
              {CONTACT_EMAIL}
            </a>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl border border-border-strong px-5 py-3.5 font-medium transition-colors hover:bg-accent"
              >
                <Github className="size-4.5" aria-hidden="true" />
                GitHub
              </a>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl border border-border-strong px-5 py-3.5 font-medium transition-colors hover:bg-accent"
              >
                <Send className="size-4.5" aria-hidden="true" />
                Telegram
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-300 flex-wrap items-center justify-between gap-3 px-6 py-7 text-sm text-subtle">
          <span className="flex items-center gap-2.5">
            <Image src="/images/icono.png" alt="" width={24} height={24} className="rounded-md" />© {year} Dagamdev
          </span>
          <span className="font-mono text-xs">dagam.dev</span>
        </div>
      </footer>
    </div>
  )
}
