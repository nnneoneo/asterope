export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      title: 'Asterope Consulting - Revenue System',
      meta: [
        {
          name: 'description',
          content:
            'Sistema de adquisicion para consultoria premium: diagnostico estrategico, CRM interno e integraciones Microsoft 365.'
        }
      ]
    }
  },
  runtimeConfig: {
    adminEmail: process.env.ADMIN_EMAIL || 'admin@asterope.local',
    adminPassword: process.env.ADMIN_PASSWORD || 'change-this-password',
    authSecret: process.env.AUTH_SECRET || 'change-this-auth-secret-before-production',
    microsoft: {
      tenantId: process.env.MS_TENANT_ID || '',
      clientId: process.env.MS_CLIENT_ID || '',
      clientSecret: process.env.MS_CLIENT_SECRET || '',
      senderUserId: process.env.MS_SENDER_USER_ID || '',
      notifyTo: process.env.MS_NOTIFY_TO || '',
      excelDriveId: process.env.MS_EXCEL_DRIVE_ID || '',
      excelItemId: process.env.MS_EXCEL_ITEM_ID || '',
      excelTableName: process.env.MS_EXCEL_TABLE_NAME || 'Leads',
      teamsWebhookUrl: process.env.TEAMS_WEBHOOK_URL || ''
    },
    public: {
      intakeFormUrl:
        process.env.NUXT_PUBLIC_INTAKE_FORM_URL ||
        'https://forms.office.com/Pages/DesignPageV2.aspx?origin=NeoPortalPage&subpage=design&id=RQlDsgN7fkeVhWQ05XCFHN_zy-t4m0lNqMK-pfU0LaNURVZCNEJRVFA0Tjg4V1U5NE5EODdTQkVSWi4u'
    }
  }
})
