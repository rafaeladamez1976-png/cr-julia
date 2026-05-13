# MAGNA CRM — RUNBOOK

Contacto operaciones: Rafa (rafael@syra360.com) · Rubén (ruben@syra360.com)

---

## 1. Arquitectura de producción

```
Vercel (Next.js standalone)
  └─ /api/*           → API routes (Next.js)
  └─ /                → React SPA (SSR deshabilitado, dynamic import)

Supabase (PostgreSQL + RLS) [Fase 1 — pendiente]
  └─ auth.users       → gestión de sesiones
  └─ public.*         → 14 tablas CRM
  └─ PITR activado    → restauración a cualquier punto (7 días)

Google Workspace
  └─ SSO OAuth        → autenticación usuarios
  └─ Drive            → backups semanales pg_dump

Slack
  └─ Webhook entrante → notificaciones operaciones
```

---

## 2. Despliegue

### 2.1 Despliegue normal (staging → producción)

```bash
# 1. Verificar que build pasa sin errores
npm run build

# 2. Push a branch staging
git push origin staging

# 3. Vercel preview se genera automáticamente
# URL preview: https://crm-julia-<hash>.vercel.app

# 4. Hacer smoke test manual en preview (login, crear cliente, mover pipeline)

# 5. Promover a producción desde Vercel dashboard (Promote to Production)
#    o merge staging → main (trigger auto-deploy)
```

### 2.2 Rollback de despliegue

```bash
# Desde Vercel dashboard → Deployments → seleccionar deploy anterior → "Promote to Production"
# O via CLI:
vercel rollback [deployment-url]
```

---

## 3. Variables de entorno requeridas

Copiar `.env.example` y rellenar antes de cada entorno:

| Variable | Entorno | Descripción |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Todos | URL proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Todos | Clave anónima Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Server | Clave service role (nunca al cliente) |
| `GOOGLE_CLIENT_ID` | Todos | OAuth Google Workspace |
| `GOOGLE_CLIENT_SECRET` | Server | OAuth Google secret |
| `SLACK_WEBHOOK_URL` | Server | Webhook Slack notificaciones |
| `GEMINI_API_KEY` | Server | API Gemini IA |
| `ZAPIER_WEBHOOK_SECRET` | Server | Secret para validar webhooks Zapier |

En Vercel: Settings → Environment Variables → añadir por entorno (Production / Preview / Development).

---

## 4. Restauración de base de datos (Supabase)

### 4.1 PITR — restaurar a punto exacto en el tiempo

> **PITR disponible: 7 días. Solo en plan Pro o superior.**

```
1. Ir a Supabase Dashboard → proyecto → Settings → Database → Point in Time Recovery
2. Seleccionar timestamp de restauración (UTC)
3. Confirmar: se crea una nueva instancia — NO sobreescribe la actual
4. Verificar datos en instancia nueva
5. Actualizar env vars en Vercel apuntando a nueva instancia
6. Smoke test completo antes de redirigir tráfico
```

### 4.2 Restaurar desde dump semanal (Google Drive)

> Backup automático: cada domingo 03:00 UTC via Supabase Edge Function.

```bash
# 1. Descargar dump desde Google Drive del workspace cliente
#    Carpeta: "MAGNA CRM Backups / YYYY-MM-DD.sql.gz"

# 2. Descomprimir
gunzip YYYY-MM-DD.sql.gz

# 3. Crear nueva instancia Supabase (o usar branch)
supabase projects create magna-crm-restore --region eu-west-1

# 4. Aplicar dump
psql "postgresql://postgres:[password]@[host]:5432/postgres" < YYYY-MM-DD.sql

# 5. Verificar tablas críticas
psql ... -c "SELECT COUNT(*) FROM clientes;"
psql ... -c "SELECT COUNT(*) FROM pipeline_deals;"

# 6. Actualizar env vars Vercel → nueva URL Supabase
# 7. Redesplegar: vercel --prod
```

---

## 5. Migraciones de base de datos

```bash
# Nueva migración
supabase migration new nombre_migracion

# Aplicar en local
supabase db reset

# Aplicar en staging/prod (con revisión previa)
supabase db push --linked

# NUNCA editar una migración ya aplicada en producción
# Crear siempre una migración nueva para correcciones
```

---

## 6. Monitorización y logs

### Vercel
- Logs tiempo real: Vercel Dashboard → proyecto → Functions → Logs
- Errores: Sentry (pendiente configurar — ver GEMINI_API_KEY en `.env.example`)

### Supabase
- Logs API: Supabase Dashboard → Logs → API
- Logs Auth: Supabase Dashboard → Logs → Auth
- Queries lentas: Supabase Dashboard → Reports → Query Performance

### SLA objetivo
- 99.9% mensual = máx. 43.8 minutos caída/mes
- Soporte crítico: rafael@syra360.com + ruben@syra360.com (respuesta < 2h en horario laboral)

---

## 7. Procedimiento incidente crítico

```
1. Identificar: ¿qué módulo/función falla? ¿todos los usuarios o parcial?
2. Revisar Vercel logs → buscar errores 5xx en últimos 15 min
3. Revisar Supabase logs → buscar errores DB o auth
4. Si DB caída: ejecutar §4.1 PITR (restaurar última snapshot válida)
5. Si deploy roto: rollback Vercel (§2.2)
6. Comunicar a Julia (CEO): impacto, causa, ETA de resolución
7. Post-mortem en docs/ tras resolver (causa raíz + acción correctora)
```

---

## 8. RGPD — Operaciones DPO (Pedro)

Solo ejecutables por Admin con `dpo_flag = true`:

| Operación | Endpoint | Notas |
|---|---|---|
| Exportar datos cliente | `POST /api/gdpr/export` | Body: `{ cliente_id }` |
| Anonimizar PII | `POST /api/gdpr/anonymize` | Hashea campos PII, preserva agregados |
| Eliminar cliente (derecho al olvido) | `POST /api/gdpr/delete` | Soft delete + tombstone |

Todas las operaciones quedan registradas en `audit_log` y `gdpr_requests`.

---

*Última actualización: 2026-05-13 — SYRA360*
