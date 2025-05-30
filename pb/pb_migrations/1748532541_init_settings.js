/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
  // Set app settings
  let settings = app.settings();
  const APP_NAME = $os.getenv("APP_NAME") || "Ticketsoup";
  const APP_URL = $os.getenv("APP_URL") || "http://localhost:8090";
  const SENDER_EMAIL = $os.getenv("SENDER_EMAIL") || "support@example.com";
  settings.meta.appName = APP_NAME;
  settings.meta.appURL = APP_URL;
  settings.meta.hideControls = true;
  settings.meta.senderName = APP_NAME;
  settings.meta.senderAddress = SENDER_EMAIL;

  // SMTP
  const SMTP_HOST = $os.getenv("SMTP_HOST");
  const SMTP_USERNAME = $os.getenv("SMTP_USERNAME");
  const SMTP_PASSWORD = $os.getenv("SMTP_PASSWORD");
  if (SMTP_USERNAME && SMTP_PASSWORD && SMTP_HOST) {
    settings.smtp.enabled = true;
    settings.smtp.host = SMTP_HOST;
    settings.smtp.username = SMTP_USERNAME;
    settings.smtp.password = SMTP_PASSWORD;
  }

  const SMTP_PORT = $os.getenv("SMTP_PORT");
  if (SMTP_PORT) {
    settings.smtp.port = parseInt(SMTP_PORT);
  }

  app.save(settings);
});
