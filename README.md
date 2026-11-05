# dagam.dev

Portafolio personal de **Dagamdev**, desarrollador web full-stack que crea herramientas web y de escritorio para traders de opciones binarias.

🌐 **Sitio:** [dagam.dev](https://dagam.dev)

## Proyectos que aparecen en el sitio

| Proyecto | Descripción | Enlace |
| --- | --- | --- |
| **Binarytacora** | Bitácora de trading de escritorio (Windows) que registra cada operación con las velas de antes, durante y después. | [binarytacora.dagam.dev](https://binarytacora.dagam.dev) |
| **Gestión Masaniello** | La plantilla de Excel del método Masaniello convertida en una aplicación web. | [masaniello.dagam.dev](https://masaniello.dagam.dev) |
| **Calculadora de interés compuesto** | Calcula el monto de cada operación con interés compuesto, reinversión y parte asegurada. | [interes.dagam.dev](https://interes.dagam.dev) |

> ⚠️ El trading de opciones binarias conlleva un alto riesgo de pérdida de capital. Estas herramientas tienen fines informativos y educativos y no constituyen asesoramiento financiero.

## Tecnologías

- [Next.js](https://nextjs.org) 16 (App Router) y React 19
- TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4 y componentes estilo [shadcn/ui](https://ui.shadcn.com)
- Iconos de [Lucide](https://lucide.dev)
- Desplegado en [Vercel](https://vercel.com)

## Ejecutarlo en local

Requisitos: [Node.js](https://nodejs.org) 20 o superior y [pnpm](https://pnpm.io).

```bash
git clone https://github.com/dagamdev/dagamdev-page.git
cd dagamdev-page
pnpm install
pnpm dev
```

Después abre [http://localhost:3000](http://localhost:3000).

### Scripts

| Comando | Qué hace |
| --- | --- |
| `pnpm dev` | Inicia el servidor de desarrollo |
| `pnpm build` | Genera la versión de producción |
| `pnpm start` | Sirve la versión de producción ya generada |
| `pnpm lint` | Revisa el código con ESLint |

## Estructura

```
src/
├── app/
│   ├── layout.tsx       # Layout raíz, metadatos y SEO
│   ├── page.tsx         # Página principal y lista de proyectos
│   ├── globals.css      # Tema y estilos globales (Tailwind v4)
│   ├── opengraph-image.tsx, robots.ts, sitemap.ts
├── components/          # Cabecera, aviso de dominio y componentes de UI
└── lib/site.ts          # Datos del sitio: dominio, nombre, enlaces y correo
public/                  # Imágenes y archivos estáticos
```

Los datos generales (dominio, redes y correo) están en `src/lib/site.ts`, y la lista de proyectos en `src/app/page.tsx`.

## Contacto

- Correo: [contact@dagam.dev](mailto:contact@dagam.dev)
- GitHub: [@dagamdev](https://github.com/dagamdev)
- Telegram: [t.me/dagamdev](https://t.me/dagamdev)
