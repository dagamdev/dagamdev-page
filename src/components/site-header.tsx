"use client"

import { Menu, Moon, Sun, X } from "lucide-react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"
import { CONTACT_EMAIL } from "@/lib/site"

const links = [
  { href: "#projects", label: "Proyectos" },
  { href: "#about", label: "Sobre mí" },
  { href: "#contact", label: "Contacto" },
]

export function SiteHeader() {
  const { resolvedTheme, setTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark")

  const navRef = useRef<HTMLElement>(null)

  // Con el menú abierto, cerrarlo al tocar/hacer clic fuera de la barra o al pulsar Escape
  useEffect(() => {
    if (!menuOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [menuOpen])

  return (
    <header ref={navRef} className="fixed top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-300 items-center justify-between gap-4 px-6">
        <a href="#top" className="flex items-center gap-3 text-xl font-bold tracking-tight">
          <Image src="/images/icono.png" alt="" width={36} height={36} className="rounded-lg" priority />
          dagamdev
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-2 md:ml-auto md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3.5 py-3 text-[15px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="ml-2 rounded-[10px] bg-primary px-4.5 py-3 text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Escríbeme
          </a>
        </nav>

        <div className="flex items-center gap-1 md:-mr-2">
          {/* Los iconos se alternan con CSS para que no haya destello al cargar */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Cambiar tema claro/oscuro"
            className="flex size-11 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Moon className="size-5 dark:hidden" />
            <Sun className="hidden size-5 dark:block" />
          </button>
          <button
            type="button"
            className="flex size-11 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Principal" className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col px-6 py-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              onClick={() => setMenuOpen(false)}
              className="my-3 rounded-[10px] bg-primary px-4.5 py-3 text-center font-semibold text-primary-foreground"
            >
              Escríbeme
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
