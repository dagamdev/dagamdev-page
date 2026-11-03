"use client"

import { Menu, Moon, Sun, X } from "lucide-react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

const links = [
  { href: "#about", label: "Sobre mí" },
  { href: "#projects", label: "Proyectos" },
  { href: "#contact", label: "Contacto" },
]

export function SiteHeader() {
  const { resolvedTheme, setTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const navRef = useRef<HTMLElement>(null)

  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark")

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
    <nav ref={navRef} className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#" className="flex items-center gap-3">
            <Image src="/images/icono.png" alt="" width={40} height={40} className="rounded-lg" priority />
            <span className="font-semibold text-lg">Dagamdev</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="text-sm hover:text-primary transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-1">
            {/* Los iconos se alternan con CSS para que no haya destello al cargar */}
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Cambiar tema claro/oscuro" className="cursor-pointer">
              <Moon className="w-5 h-5 dark:hidden" />
              <Sun className="w-5 h-5 hidden dark:block" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden cursor-pointer"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-2 flex flex-col">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-sm hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
