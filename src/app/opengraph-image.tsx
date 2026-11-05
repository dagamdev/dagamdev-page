import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { SITE_DOMAIN } from "@/lib/site"

export const alt = "Dagamdev: software para traders, hecho por un trader"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Paleta oscura del sitio (ver src/app/globals.css)
const colors = {
  bg: "#0c0d10",
  card: "#121419",
  border: "#23262d",
  grid: "#1a1d23",
  fg: "#f2f3f5",
  muted: "#b4b9c2",
  subtle: "#8a909b",
  primary: "#53cc91",
  up: "#94f69b",
  down: "#fe554f",
}

// Las mismas velas decorativas del hero: dirección, desplazamiento desde abajo, cuerpo y mechas (px)
const candles = [
  { up: false, offset: 34, body: 44, wick: 12 },
  { up: true, offset: 26, body: 36, wick: 10 },
  { up: true, offset: 50, body: 32, wick: 12 },
  { up: false, offset: 42, body: 26, wick: 10 },
  { up: true, offset: 62, body: 50, wick: 10 },
  { up: true, offset: 98, body: 40, wick: 14 },
  { up: false, offset: 86, body: 24, wick: 10 },
  { up: true, offset: 116, body: 54, wick: 12 },
  { up: true, offset: 158, body: 44, wick: 16, last: true },
]

/**
 * Descarga una fuente de Google Fonts en TTF (satori no admite woff2).
 * Si falla (por ejemplo, una build sin red), se usa la fuente por defecto.
 */
async function loadGoogleFont(family: string, weight: number) {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}`)
    ).text()
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1]
    if (!url) return null
    return await (await fetch(url)).arrayBuffer()
  } catch {
    return null
  }
}

// Imagen que se muestra al compartir el enlace (Telegram, WhatsApp, X, etc.). Se genera en la build.
export default async function OpengraphImage() {
  const [logo, bold, mono] = await Promise.all([
    readFile(join(process.cwd(), "public/images/icono.png")),
    loadGoogleFont("Space Grotesk", 700),
    loadGoogleFont("JetBrains Mono", 400),
  ])
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`

  const fonts = [
    ...(bold ? [{ name: "Space Grotesk", data: bold, weight: 700 as const, style: "normal" as const }] : []),
    ...(mono ? [{ name: "JetBrains Mono", data: mono, weight: 400 as const, style: "normal" as const }] : []),
  ]
  const monoFamily = mono ? "JetBrains Mono" : "monospace"

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 56,
          padding: "0 72px",
          background: colors.bg,
          color: colors.fg,
          fontFamily: bold ? "Space Grotesk" : "sans-serif",
        }}
      >
        {/* Texto */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} width={64} height={64} alt="" />
            <div style={{ fontSize: 36, fontWeight: 700 }}>dagamdev</div>
          </div>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.03em" }}>
            Software para traders, hecho por un trader.
          </div>
          <div style={{ display: "flex", marginTop: 40, fontFamily: monoFamily, fontSize: 26, color: colors.primary }}>
            {SITE_DOMAIN}
          </div>
        </div>

        {/* Panel de velas */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 400,
            borderRadius: 20,
            border: `1px solid ${colors.border}`,
            background: colors.card,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "14px 18px",
              borderBottom: `1px solid ${colors.border}`,
              fontFamily: monoFamily,
              fontSize: 16,
              color: colors.subtle,
            }}
          >
            <span>~/dagamdev</span>
            <div style={{ display: "flex", gap: 6 }}>
              {[0, 1, 2].map((dot) => (
                <div key={dot} style={{ width: 10, height: 10, borderRadius: 5, background: colors.border }} />
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 8,
              height: 300,
              padding: "24px 22px",
              backgroundImage: `linear-gradient(${colors.grid} 1px, transparent 1px)`,
              backgroundSize: "100% 50px",
            }}
          >
            {candles.map((candle, index) => {
              const color = candle.last ? colors.primary : candle.up ? colors.up : colors.down
              return (
                <div
                  key={index}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, marginBottom: candle.offset }}
                >
                  <div style={{ width: 2, height: candle.wick, background: color }} />
                  <div style={{ width: "100%", height: candle.body, background: color, borderRadius: 2 }} />
                  <div style={{ width: 2, height: candle.wick, background: color }} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  )
}
