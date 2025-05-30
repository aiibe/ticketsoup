# TicketSoup

## Deployment

1. Create `.env` or `.env.local` file with the following keys

Replace the values with your own

```bash
APP_NAME=TicketSoup
APP_URL=https://ticketsoup.example.com
SUPERUSER_EMAIL=admin@example.com
SUPERUSER_PASSWORD=your-strong-password
SENDER_EMAIL=no-reply@example.com
SMTP_HOST=smtp.example.com
SMTP_USERNAME=smtp-username
SMTP_PASSWORD=smtp-password
```

2. Launch with docker-compose :

```bash
docker-compose up -d

# For local deployment
docker compose --env-file .env.local up -d
```

## Development

1. Create `.env` file with `SUPERUSER_EMAIL` and `SUPERUSER_PASSWORD`

2. Download [Pocketbase](https://pocketbase.io/docs/) and place `pocketbase` executable into `pb` directory

3. Create superuser account : To do once

```bash
chmod +x init-dev.sh
./init-dev.sh
```

4. Start dev server :

```bash
pnpm install
pnpm dev
```
