"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, Code2, TrendingUp, Github, Send, Mail, Moon, Sun } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const initialTheme = savedTheme || (prefersDark ? "dark" : "light")
    setTheme(initialTheme)
    document.documentElement.classList.toggle("dark", initialTheme === "dark")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const projects = [
    {
      title: "E-commerce Platform",
      description:
        "Full-stack e-commerce solution with Next.js, Stripe integration, and real-time inventory management.",
      category: "Web Development",
      link: "#",
      tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    },
    {
      title: "Trading Dashboard",
      description: "Real-time trading analytics dashboard with interactive charts and portfolio tracking.",
      category: "Trading",
      link: "#",
      tags: ["React", "WebSocket", "D3.js", "TradingView"],
    },
    {
      title: "SaaS Management Tool",
      description: "Comprehensive project management platform with team collaboration features.",
      category: "Web Development",
      link: "#",
      tags: ["Next.js", "Prisma", "tRPC", "Tailwind"],
    },
    {
      title: "Crypto Trading Bot",
      description: "Automated trading bot with advanced algorithms and risk management strategies.",
      category: "Trading",
      link: "#",
      tags: ["Python", "Node.js", "API Integration", "ML"],
    },
    {
      title: "Portfolio Tracker",
      description: "Multi-asset portfolio tracking app with performance analytics and alerts.",
      category: "Trading",
      link: "#",
      tags: ["React Native", "Firebase", "REST API"],
    },
    {
      title: "Design System",
      description: "Component library and design system for scalable web applications.",
      category: "Web Development",
      link: "#",
      tags: ["React", "Storybook", "CSS", "TypeScript"],
    },
  ]

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Image
                src="/images/icono.png"
                alt="Dagamdev Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="font-semibold text-lg">Dagamdev</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-sm hover:text-primary transition-colors">
                Sobre mí
              </a>
              <a href="#projects" className="text-sm hover:text-primary transition-colors">
                Proyectos
              </a>
              <a href="#contact" className="text-sm hover:text-primary transition-colors">
                Contacto
              </a>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="ml-2">
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </nav>

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
                Especializado en crear soluciones web escalables y estrategias de trading rentables. Combino tecnología
                y análisis financiero para construir productos innovadores.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="gap-2" onClick={scrollToProjects}>
                  Ver Proyectos
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={scrollToContact}>
                  Contactar
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
                      alt="Dagamdev Trading Logo"
                      width={400}
                      height={400}
                      className="w-full h-auto"
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
                Soy un desarrollador full-stack apasionado por crear experiencias web excepcionales y un trader activo
                en los mercados financieros. Mi enfoque combina el pensamiento analítico del trading con la creatividad
                del desarrollo web.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Con años de experiencia en ambos campos, he desarrollado una perspectiva única sobre la construcción de
                productos digitales que no solo se ven bien, sino que también generan resultados medibles.
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
                    Especializado en Next.js, React, TypeScript y arquitecturas modernas. Creación de aplicaciones
                    escalables y performantes.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 hover:border-accent transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Trading</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Análisis técnico y fundamental, gestión de riesgo, y desarrollo de estrategias automatizadas para
                    múltiples mercados.
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
              Una selección de proyectos que demuestran mi experiencia en desarrollo web y trading
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="group hover:border-primary transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                      {project.category}
                    </span>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">¿Listo para colaborar?</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Estoy disponible para proyectos de desarrollo web, consultoría de trading, o colaboraciones interesantes.
            ¡Hablemos!
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button size="lg" variant="outline" className="gap-2 bg-transparent" asChild>
              <a href="https://github.com/dagamdev" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 bg-transparent" asChild>
              <a href="https://t.me/dagamdev" target="_blank" rel="noopener noreferrer">
                <Send className="w-4 h-4" />
                Telegram
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/images/icono.png"
              alt="Dagamdev Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-sm text-muted-foreground">© 2025 Dagamdev. Todos los derechos reservados.</span>
          </div>
          <div className="flex gap-4">
            <a
              href="https://github.com/dagamdev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://t.me/dagamdev"
              target="_blank"
              rel="noopener noreferrer"
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
