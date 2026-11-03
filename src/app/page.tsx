import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { GITHUB_URL, TELEGRAM_URL } from "@/lib/site"
import { AlertTriangle, ArrowUpRight, Code2, Github, Send, TrendingUp } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "Gestión Masaniello",
    description: "Gestión de capital Masaniello, la mítica plantilla en Excel ahora en una web moderna y eficiente.",
    category: "Trading",
    link: "https://masaniello.dagam.dev",
    tags: ["Next.js", "TypeScript", "v0.dev", "Tailwind CSS", "Zustand"],
  },
  {
    title: "Calculadora de interés compuesto",
    description:
      "Calcula los montos para cada operación de un capital inicial con interés compuesto, además puedes ajustar cuánto quieres reinvertir y asegurar por cada operación.",
    category: "Trading",
    link: "https://interest-calculator.dagam.dev",
    tags: ["Next.js", "TypeScript", "v0.dev", "Tailwind CSS", "Masaniello", "Zustand"],
  },
]

export default function Home() {
  const year = new Date().getFullYear()

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-foreground text-sm mb-6">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                  Disponible para proyectos
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance">
                  Desarrollador Web & Trader
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
                  Construyo aplicaciones web con Next.js, React y TypeScript. Me apasiona el trading de opciones
                  binarias, y por eso muchos de mis proyectos son herramientas pensadas para traders.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="gap-2" asChild>
                    <a href="#projects">
                      Ver Proyectos
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="#contact">Contactar</a>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="relative aspect-square max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
                  <Card className="relative bg-card/50 backdrop-blur-sm border-2">
                    <CardContent className="p-8 flex items-center justify-center">
                      <Image
                        src="/images/icono.png"
                        alt="Logo de Dagamdev: velas japonesas con una flecha ascendente"
                        width={400}
                        height={400}
                        className="w-full h-auto"
                        priority
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">Sobre mí</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Soy desarrollador web full-stack. Fuera del código me gusta el trading de opciones binarias, y esa
                  afición es la que inspira la mayoría de mis proyectos: herramientas sencillas que resuelven problemas
                  que yo mismo tengo al operar, como llevar la gestión de capital o calcular el monto de cada operación.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  No soy asesor financiero, no doy mentorías ni vendo estrategias: lo que hago es software. Puedes ver
                  parte de mi trabajo en{" "}
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    GitHub
                  </a>
                  .
                </p>
              </div>
              <div className="grid gap-6">
                <Card className="border-2 hover:border-primary transition-colors">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Code2 className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Desarrollo Web</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Aplicaciones con Next.js, React, TypeScript y Tailwind CSS, enfocadas en el rendimiento y en una
                      buena experiencia de usuario.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-2 hover:border-accent transition-colors">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <TrendingUp className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Herramientas para trading</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Convierto métodos de gestión de capital, como Masaniello o el interés compuesto, en aplicaciones
                      web fáciles de usar desde cualquier dispositivo.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Proyectos Destacados</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Herramientas web para traders que he diseñado y desarrollado
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {projects.map((project) => (
                <a
                  key={project.link}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full rounded-xl focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  <Card className="h-full group-hover:border-primary transition-all duration-300 group-hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                          {project.category}
                        </span>
                        <span
                          aria-hidden="true"
                          className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
            <div className="mt-12 max-w-5xl mx-auto flex gap-3 rounded-xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
              <AlertTriangle className="w-5 h-5 shrink-0 text-destructive" aria-hidden="true" />
              <p className="leading-relaxed">
                <strong className="text-foreground">Aviso de riesgo:</strong> el trading de opciones binarias conlleva
                un alto riesgo de pérdida de capital. Estas herramientas son calculadoras con fines informativos y
                educativos; no constituyen asesoramiento financiero ni recomendaciones de inversión.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">¿Listo para colaborar?</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Estoy disponible para proyectos de desarrollo web y colaboraciones interesantes. ¡Hablemos!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="gap-2" asChild>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 bg-transparent" asChild>
                <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                  <Send className="w-4 h-4" />
                  Telegram
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Image src="/images/icono.png" alt="" width={32} height={32} className="rounded-lg" />
            <span className="text-sm text-muted-foreground">© {year} Dagamdev. Todos los derechos reservados.</span>
          </div>
          <div className="flex gap-4">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub de Dagamdev"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram de Dagamdev"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Send className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
