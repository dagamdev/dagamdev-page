"use client"

import { ArrowUpRight, Info, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { SITE_DOMAIN } from "@/lib/site"

// Dominio principal nuevo (definido en src/lib/site.ts)
const NEW_DOMAIN = SITE_DOMAIN
// Texto opcional con la fecha en que el dominio actual dejará de funcionar. Déjalo vacío si no hay fecha.
// El dominio antiguo caduca el 2027-01-02 23:59:59 UTC
const SHUTDOWN_DATE = "2 de enero de 2027"

const STORAGE_KEY = "domain-notice-dismissed"

export function DomainNotice() {
  const [visible, setVisible] = useState(false)
  const [targetUrl, setTargetUrl] = useState(`https://${NEW_DOMAIN}`)

  useEffect(() => {
    const host = window.location.hostname.replace(/^www\./, "")
    // Ya estamos en el dominio nuevo: no mostrar nada
    if (host === NEW_DOMAIN) return

    let dismissed = false
    try {
      dismissed = sessionStorage.getItem(STORAGE_KEY) === "1"
    } catch {}
    if (dismissed) return

    // Conserva la ruta y el ancla actuales al saltar al dominio nuevo
    const { pathname, search, hash } = window.location
    setTargetUrl(`https://${NEW_DOMAIN}${pathname}${search}${hash}`)
    setVisible(true)
  }, [])

  const dismiss = () => {
    setVisible(false)
    try {
      sessionStorage.setItem(STORAGE_KEY, "1")
    } catch {}
  }

  if (!visible) return null

  return (
    <div
      role="alert"
      className="fixed bottom-4 inset-x-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-[60] animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="relative rounded-xl border-2 border-primary/40 bg-card text-card-foreground shadow-2xl p-5">
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Cerrar aviso"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="flex gap-3">
          <div className="shrink-0 w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center">
            <Info className="w-5 h-5" />
          </div>
          <div className="pr-4">
            <p className="font-semibold mb-1">Nos mudamos de dominio</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              El sitio principal ahora es <strong className="text-foreground">{NEW_DOMAIN}</strong>. Este dominio
              dejará de funcionar{SHUTDOWN_DATE ? ` el ${SHUTDOWN_DATE}` : " próximamente"}; actualiza tus enlaces y
              marcadores.
            </p>
            <Button asChild size="sm" className="mt-4 gap-2">
              <a href={targetUrl}>
                Ir a {NEW_DOMAIN}
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
