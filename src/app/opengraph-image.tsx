import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { SITE_DOMAIN } from "@/lib/site"

export const alt = "Dagamdev - Desarrollador & Trader"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Imagen que se muestra al compartir el enlace (Telegram, WhatsApp, X, etc.). Se genera en la build.
export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/images/icono.png"))
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: 80,
          background: "#0c0d10",
          color: "#f2f3f5",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={320} height={320} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 700 }}>Dagamdev</div>
          <div style={{ fontSize: 44, color: "#53cc91", marginTop: 8 }}>Desarrollador Web & Trader</div>
          <div style={{ fontSize: 30, color: "#8a909b", marginTop: 32 }}>{SITE_DOMAIN}</div>
        </div>
      </div>
    ),
    size,
  )
}
