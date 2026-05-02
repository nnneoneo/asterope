# Asterope Consulting Revenue System

## System Architecture

Asterope runs as a Nuxt 3 application:

- Vue public website for high-ticket client acquisition.
- Nuxt server routes for CRM operations and optional direct lead capture.
- Local JSON persistence for immediate development in `data/leads.json`.
- Production path: replace `server/utils/leadStore.ts` with Supabase/PostgreSQL calls using the same API contract.
- Microsoft 365 adapter in `server/utils/microsoft.ts` for Outlook, Excel/SharePoint and Teams.

Public intake flow:

1. Visitor clicks `Solicitar consulta`.
2. The site opens the company's Microsoft Form.
3. Microsoft Forms remains the source intake experience.
4. Use Power Automate or Graph to sync Microsoft Forms responses into `POST /api/leads` or directly into the backing database.
5. Dashboard reads synced leads through protected CRM endpoints.

## Database Schema

Production PostgreSQL/Supabase table:

```sql
create type lead_status as enum ('New', 'Qualified', 'Contacted', 'Closed');

create table leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text not null,
  industry text not null,
  revenue_range text not null,
  main_problem text not null,
  status lead_status not null default 'New',
  score integer not null default 0,
  tags text[] not null default '{}',
  notes text[] not null default '{}',
  activity text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index leads_status_idx on leads(status);
create index leads_score_idx on leads(score desc);
create index leads_tags_idx on leads using gin(tags);
```

## API Structure

- `POST /api/leads`: optional direct lead capture or Power Automate webhook target.
- `GET /api/leads`: admin-only list, summary, search and status filter.
- `GET /api/leads/:id`: admin-only detail.
- `PATCH /api/leads/:id`: admin-only status and notes updates.
- `POST /api/auth/login`: admin email/password login.
- `POST /api/auth/logout`: clears admin session.
- `GET /api/auth/me`: reads current admin session.

Admin requests require a valid HTTP-only signed session cookie.

## Website UI and Copy

The site is structured as a premium acquisition funnel:

- Hero: clear value proposition and `Diagnostico Estrategico` CTA.
- Services: reference service categories with compact detail modals.
- Signature Packages: reference packages with compact detail modals.
- Intake: Microsoft Forms CTA.

## Dashboard UI

The dashboard is a dark control panel with:

- Overview metrics: total leads, qualified leads, conversion rate and average score.
- Searchable/filterable leads table.
- Lead detail panel with full form data, score, tags and notes.
- Actions for status updates and note creation.
- Recent activity feed.

## Microsoft 365 Setup

Preferred approach: Microsoft Graph API.

1. Register an Entra ID app.
2. Add application permissions:
   - `Mail.Send`
   - `Files.ReadWrite.All`
   - `Sites.ReadWrite.All`
3. Grant admin consent.
4. Create an Excel workbook in OneDrive/SharePoint with a table named `Leads`.
5. Add columns in this order:
   `id, createdAt, name, email, company, industry, revenueRange, mainProblem, status, score, tags`
6. Configure environment variables:

```bash
ADMIN_EMAIL=admin@asterope.com
ADMIN_PASSWORD=replace-with-strong-password
AUTH_SECRET=replace-with-long-random-secret
NUXT_PUBLIC_INTAKE_FORM_URL=https://forms.office.com/...
MS_TENANT_ID=
MS_CLIENT_ID=
MS_CLIENT_SECRET=
MS_SENDER_USER_ID=
MS_NOTIFY_TO=
MS_EXCEL_DRIVE_ID=
MS_EXCEL_ITEM_ID=
MS_EXCEL_TABLE_NAME=Leads
TEAMS_WEBHOOK_URL=
```

Fallback approach: Power Automate can receive lead data from `POST /api/leads` by adding a webhook call inside `runMicrosoftAutomations`.
