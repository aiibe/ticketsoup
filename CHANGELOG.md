## 0.5.1

### Styles

- Set cursor pointer on select agent to assign ticket

## 0.5.0

### Features

- Feedback form on admin page
- Add default env variables to init app

### Fixes

- Missing app name in email
- Fail migrations

### Chore

- Load .env.local

## 0.4.1

### Fixes

- Fail migrations
- Update dockerfile

## 0.4.0

### Features

- Super admin can add and delete agents
- Newly added agent will receive email to set their password
- Add tabs navigation for pages
- Display app version on login page

### Fixes

- Auto logout when fails to fetch app settings
- Notify agent when ticket is assigned

### Refactor

- Improve login page

### Chore

- Update Pocketbase sdk and db

## 0.3.0

### Features

- Agent can assign ticket to other agent
- Agent will receive email when ticket is assigned

### Fixes

- Avatar seed based on user full name
- Tickets subscription missing update event

## 0.2.0

### Features

- Add banner to remind admin to configure SMTP

### Fixes

- Fix ticket subscription

## 0.1.0

### Features

- Notify customer and agents by email when ticket is submitted

## 0.0.9

### Fixes

- Close dialog after submitting ticket

## 0.0.8

### Features

- Customer can submit ticket after logged in
- Add sonner toast

### Fixes

- Tickets API rules won't allow customer to submit ticket

## 0.0.7

### Features

- New UI
