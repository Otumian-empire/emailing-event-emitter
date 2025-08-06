# Emailing Event Emitter

A simple Node.js email service that uses events to handle email sending. Built with Express and Nodemailer.

## What it does

- Sends emails using an event-driven approach
- Logs everything to JSON files
- Validates email inputs
- Simple REST API

## Quick start

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up your environment**

   ```bash
   cp sample.env .env
   ```

   Then edit `.env` with your email settings (for SMTP - can be on obtained from mailtrap.io):

   ```env
   PORT=3000
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_AUTH_USER=your-email@gmail.com
   EMAIL_AUTH_PASS=your-app-password
   EMAIL_SENDER=your-email@gmail.com
   ```

3. **Run it**
   ```bash
   node index.js
   ```

## API

### Check if it's running

```http
GET /ping-pong
```

### Send an email

```http
POST /send-email
Content-Type: application/json

{
    "name": "John Doe",
    "address": "recipient@example.com",
    "subject": "Test Email",
    "text": "Hello from the email service!"
}
```

## Environment variables

| Variable          | What it does   | Default     |
| ----------------- | -------------- | ----------- |
| `PORT`            | Server port    | 3000        |
| `EMAIL_HOST`      | SMTP server    | -           |
| `EMAIL_PORT`      | SMTP port      | 2525        |
| `EMAIL_AUTH_USER` | SMTP username  | -           |
| `EMAIL_AUTH_PASS` | SMTP password  | -           |
| `EMAIL_SENDER`    | Sender email   | -           |
| `ERROR_LOG`       | Error log file | ./error.log |
| `APP_LOG`         | App log file   | ./app.log   |

## Files

- `index.js` - Main app
- `config.js` - Environment setup
- `requestHandlers.js` - API routes
- `event.js` - Event handling
- `email.js` - Email sending
- `app.http` - Test requests

## Logs

The app creates two log files:

**app.log** - Successful and failures email operations
**error.log** - Errors

Both use JSON format with timestamps.

## Testing

Use the `app.http` file to test the API. Works with VS Code REST Client or import to Postman.
