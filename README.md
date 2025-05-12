# TicketSoup

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
