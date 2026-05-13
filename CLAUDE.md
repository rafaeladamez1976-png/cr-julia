# MAGNA CRM — Buyers Agents Premium

CRM inmobiliario premium para agencia de compradores. Este documento define el contexto, el stack, las reglas de seguridad y las convenciones que cualquier agente (humano o Claude) debe seguir al trabajar en este repositorio.

---

## 1. Cliente y contexto

- **Empresa cliente**: agencia inmobiliaria premium (servicio de comprador / buyers agent).
- **Interlocutores cliente**:
  - **Julia** — CEO
  - **Laura** — Analista funcional
  - **Pedro Gutierrez** — Responsable de Seguridad / DPO
- **Proveedor**: SYRA360 (Rafa · rafael@syra369.com, Rubén · ruben@syra369.com).
- **Deadline MVP**: principios de junio 2026.
- **Escala**: 15 usuarios en 2026 (3 managers + 3 administrativos + 5 agentes + buffer), 30+ en 2027.
- **Organigrama cliente**: CEO, CTO, COO, HR Admin, Finanzas Admin, Sales Support, 5 Agentes.

---

## 2. Stack tecnológico

| Capa | Tecnología | Versión |
|---|---|---|
| Framework | Next.js (App Router, standalone) | 16.1.1 |
| Runtime | React | 19.0.0 |
| Lenguaje | TypeScript | 5 |
| Estilos | Tailwind CSS | 4 |
| UI | shadcn/ui ("new-york") + Radix | 48 componentes |
| Animación | Framer Motion | 12.23 |
| Gráficos | Recharts | 2.15 |
| Estado cliente | Zustand | 5.0.6 |
| Data fetching | TanStack Query | 5.82 |
| Tablas | TanStack Table | 8.21 |
| Forms | React Hook Form + Zod | 7.60 / 4.0 |
| Drag & Drop | @dnd-kit | 6.3 |
| i18n | next-intl (español por defecto) | 4.3.4 |
| BD objetivo | Supabase (PostgreSQL + RLS) | — |
| Auth | Supabase Auth + Google Workspace SSO + MFA | — |
| IA | Gemini (Google Generative Language API o Vertex AI) | — |
| Mensajería | Slack (webhook + bot) | — |
| Hosting | Vercel (standalone build) | — |

> **Importante**: la dependencia `next-auth` 4.24 sigue en `package.json` pero **no se usará**; auth final con Supabase. Eliminar tras Fase 2.
>
> Prisma + SQLite (`prisma/`, `db/custom.db`, `src/lib/db.ts`) son **placeholders heredados** del scaffold. Se eliminan al completar Fase 1 (Supabase).

---

## 3. Arquitectura objetivo

- **Frontend**: Next.js 16 App Router, Server Components por defecto, `"use client"` solo donde necesario.
- **Base de datos**: Supabase Postgres en región Europa (RGPD). RLS activado en todas las tablas con datos de cliente.
- **Auth**: Supabase Auth con OAuth Google (dominio del workspace cliente restringido) + MFA TOTP obligatorio. Sesión gestionada vía `@supabase/ssr` y `middleware.ts`.
- **IA**: Gemini (preferencia del cliente para maximizar el entorno Google ya existente).
- **Mensajería interna**: Slack (no se construye módulo propio; integración por webhook/bot).
- **Backups**: Supabase PITR + dump `pg_dump` semanal a Google Drive del workspace cliente (Edge Function cron).
- **Entornos**: `production` (Vercel + Supabase prod) y `staging` (branch preview Vercel + Supabase branch DB). Nunca desplegar a producción sin pasar por staging.

---

## 4. Reglas de seguridad (definidas por Pedro)

**Obligatorias desde el MVP**:

- HTTPS/TLS (default Vercel).
- RLS activado en cada tabla con datos de cliente. Política por rol (ver §5).
- Cifrado en reposo (AES-256 por defecto de Supabase).
- MFA obligatorio. Preferencia: gestionado desde Google Workspace. Confirmar con Pedro si se delega 100% a SSO o se duplica TOTP en Supabase.
- Logs de auditoría → tabla `audit_log` con trigger `AFTER INSERT/UPDATE/DELETE` en tablas sensibles (clientes, deals, propiedades, proveedores, profiles).
- RGPD: tabla `gdpr_requests` y endpoints DPO-only para consentimiento, exportación, anonimización y derecho al olvido.
- Backups: PITR diario + dump semanal off-site en Google Drive distinto del entorno de producción.
- Procedimiento de restauración documentado en `docs/RUNBOOK.md`.

**Segunda prioridad** (cierre antes de prod):

- CSP headers en `next.config.ts` (default-src 'self', sources explícitos para Google/Slack).
- HSTS, X-Frame-Options, X-Content-Type-Options.
- Validación JWT server-side en cada API route (`getUser()` del Supabase server client).

**SLA objetivo**: 99,9% mensual. Soporte crítico (modalidad crítica) si la incidencia bloquea funciones de agentes; resto en horario de oficina.

---

## 5. Roles y permisos

| Rol | Lee | Edita | Gestiona usuarios | RGPD ops |
|---|---|---|---|---|
| **Admin** | Todo | Todo | Sí | Sí (vía DPO flag) |
| **Operaciones** | Todo | Pipelines, proveedores, agencias, propiedades | No | No |
| **Agente** | Solo registros con `owner_id = auth.uid()` | Idem | No | No |

RLS implementa esta matriz. El campo `profiles.role` (enum: `admin` / `operaciones` / `agente`) y `profiles.dpo_flag` controlan el acceso.

---

## 6. Pipeline comercial — 9 etapas (orden fijo)

`discovery` → `contacto` → `reunion` → `propuesta` → `mandatos` → `property_assessment` → `eleccion_inmueble` → `negociacion` → `compra`

> **Nota**: la UI heredada (mock data) usa 6 etapas. Migrar el enum y el Kanban a las 9 etapas reales antes del MVP.

**Bloqueo de propiedad off-market**: una propiedad puede vincularse a varios clientes en distintos momentos. Se bloquea solo cuando el deal asociado alcanza la etapa `property_assessment` con un cliente concreto.

---

## 7. KPIs por agente

Métricas a calcular en `pipeline_deals` + `client_interactions`:

- `#llamadas`
- `#reuniones`
- `#propuestas_enviadas`
- `#inmuebles_contactados`
- `#inmuebles_visitados`
- `#inmuebles_presentados_a_cliente`
- `#compras_realizadas`

Periodicidad: actualización en tiempo real (vista materializada o cálculo on-read según volumen). Dashboard agente: sus propios KPIs. Dashboard manager: KPIs por agente + agregado.

---

## 8. Módulos (orden de entrega cliente)

MVP fase 1: **agentes → agencias → clientes**. Después: **proveedores**.

**Listado completo** (todos ya existen en UI mock en `src/components/crm/CRMApp.tsx`, pendiente de partir en rutas):

1. Dashboard
2. Agentes (staff interno)
3. Agencias / Colaboradores externos
4. Clientes
5. Propiedades (con flag off-market)
6. Pipeline (Kanban 9 etapas)
7. Proveedores premium (categorías: AML, agentes de viajes, transporte, alojamiento, financiación, reformas, decoración… lista viva)
8. Tareas
9. Calendario
10. Analíticas
11. Comunicaciones (alertas Slack, plantillas email)
12. Configuración

**Ficha cliente — campos mínimos**: nombre completo, domicilio, NIF/NIE/CIF, email, web, teléfono, RRSS, idioma, presupuesto compra (rango min/max), estado AML, identidad protegida (bool), representante legal, notas confidenciales.

**Ficha proveedor — campos**: razón social, nombre contacto, cargo, teléfono, email, CIF, servicio, coste, web, RRSS (IG, TikTok, FB, LinkedIn).

---

## 9. Integraciones externas

- **Google Workspace** (bidireccional): Gmail, Calendar, Drive, Sheets, Meet. Tokens OAuth almacenados cifrados en `profiles.google_tokens`.
- **Slack**: notificaciones de nueva oportunidad, cambio de etapa de deal, reunión próxima, cierre. Canales configurables en `configuracion`.
- **Zapier**: endpoint genérico `/api/zapier/[event]` protegido por secret header.
- **Notion**: sincronización tareas/notas (P2 — si hay tiempo en el MVP).
- **Gemini IA**: resumen de notas de cliente, borrador de follow-up, sentiment, matching propiedad↔cliente.
- **Proveedor AML**: pendiente de contratar por el cliente. Dejar tabla `proveedores` con categoría AML preparada y hueco para API cuando se contrate.

---

## 10. Convenciones de código

- **Rutas**: `app/(auth)/login`, `app/(crm)/<modulo>/page.tsx`, `app/api/<recurso>/route.ts`.
- **Server Components por defecto**. `"use client"` solo donde se requiera interactividad.
- **Forms**: React Hook Form + esquema Zod en `src/lib/schemas/`.
- **DB clients**: `src/lib/supabase/{client.ts, server.ts, middleware.ts}`.
- **Tipos de BD**: generar con `bunx supabase gen types typescript --linked > src/types/db.ts`.
- **Path alias**: `@/*` → `src/*`.
- **Migraciones**: `supabase/migrations/<timestamp>_<name>.sql`. Nunca editar una migración aplicada en prod; crear una nueva.
- **Commits**: Conventional Commits. No `--no-verify`. No force-push a `main`.
- **`ignoreBuildErrors` debe ser `false`** antes de cada release. Si está en `true` localmente, no abrir PR.
- **No mockear**: en tests de integración no se mockea Supabase; se usa branch DB.

### Comandos

| Acción | Comando |
|---|---|
| Dev | `bun dev` (puerto 3000) |
| Build | `bun run build` |
| Lint | `bun run lint` |
| Generar tipos BD | `bunx supabase gen types typescript --linked > src/types/db.ts` |
| Nueva migración | `bunx supabase migration new <name>` |
| Aplicar migraciones local | `bunx supabase db reset` |

---

## 11. Cumplimiento RGPD

- Consentimiento explícito en alta de cliente (checkbox + timestamp guardado).
- Endpoints DPO-only (rol Admin con `dpo_flag = true`):
  - `POST /api/gdpr/export` → ZIP con todos los datos del cliente.
  - `POST /api/gdpr/anonymize` → hash de PII manteniendo agregados.
  - `POST /api/gdpr/delete` → soft delete + tombstone en `gdpr_requests`.
- Toda operación RGPD queda registrada en `audit_log` y `gdpr_requests`.

---

## 12. Estado actual del repositorio (snapshot 2026-05-13)

**Hecho**:

- UI completa 10 módulos en `src/components/crm/CRMApp.tsx` (1648 líneas, monolítico, mock data).
- 48 componentes shadcn en `src/components/ui/`.
- Mock data en `src/components/crm/data.ts`.
- Zustand store básico en `src/components/crm/store.ts` (a tipar).
- Deploy Vercel funcionando con `vercel.json`.

**Pendiente** (ver plan completo en `C:\Users\user\.claude\plans\quiero-que-segun-la-tender-hanrahan.md`):

- Fase 0 (higiene): scripts portables, `.env.example`, quitar `ignoreBuildErrors`, eliminar Prisma/SQLite, tipar store.
- Fase 1 (Supabase): 14 tablas + RLS + triggers de auditoría + backups.
- Fase 2 (Auth): Google SSO + MFA + middleware.
- Fase 3 (Refactor + módulos): partir monolito en rutas App Router, API CRUD, pipeline 9 etapas.
- Fase 4 (Integraciones): Google Workspace, Slack, Gemini, Zapier, Notion.
- Fase 5 (Cumplimiento + deploy): RGPD endpoints, CSP, Sentry, RUNBOOK, smoke tests, producción.

---

## 13. Documentos de referencia

- Solicitud de especificaciones del cliente: PDF `CRM SYRA 360 - solicitud_especificaciones_cliente.pdf` (raíz de la sesión de planificación).
- Plan técnico aprobado: `C:\Users\user\.claude\plans\quiero-que-segun-la-tender-hanrahan.md`.
- Procedimiento de restauración (a crear): `docs/RUNBOOK.md`.
- Informe HTML heredado: `informe-magna-crm.html` (archivo histórico, mover a `docs/`).
