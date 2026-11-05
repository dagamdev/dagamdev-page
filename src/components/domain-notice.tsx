"use client"

import { ArrowUpRight, Info, X } from "lucide-react"
import { useState, useSyncExternalStore } from "react"
import { Button } from "@/components/ui/button"
import { SITE_DOMAIN } from "@/lib/site"

// Dominio principal nuevo (definido en src/lib/site.ts)
const NEW_DOMAIN = SITE_DOMAIN
// Texto opcional con la fecha en que el dominio actual dejará de funcionar. Déjalo vacío si no hay fecha.
// El dominio antiguo caduca el 2027-01-02 23:59:59 UTC
const SHUTDOWN_DATE = "2 de enero de 2027"

const STORAGE_KEY = "domain-notice-dismissed"

// Actualiza el enlace si cambia el ancla (#projects, #contact…)
function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange)
  return () => window.removeEventListener("hashchange", onChange)
}

/** URL equivalente en el dominio nuevo, o null si no hay que mostrar el aviso */
function getTargetUrl(): string | null {
  const host = window.location.hostname.replace(/^www\./, "")
  // Ya estamos en el dominio nuevo: no mostrar nada
  if (host === NEW_DOMAIN) return null

  try {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return null
  } catch {}

  // Conserva la ruta y el ancla actuales al saltar al dominio nuevo
  const { pathname, search, hash } = window.location
  return `https://${NEW_DOMAIN}${pathname}${search}${hash}`
}

// En el servidor no se sabe el dominio: no se renderiza el aviso
const getServerTargetUrl = () => null

export function DomainNotice() {
  const targetUrl = useSyncExternalStore(subscribe, getTargetUrl, getServerTargetUrl)
  const [dismissed, setDismissed] = useState(false)

  const dismiss = () => {
    setDismissed(true)
    try {
      sessionStorage.setItem(STORAGE_KEY, "1")
    } catch {}
  }

  if (!targetUrl || dismissed) return null

  return (
    <div
      role="alert"
      className="fixed bottom-4 inset-x-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-60 animate-in fade-in slide-in-from-bottom-4 duration-500"
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
