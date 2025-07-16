# Brevo Newsletter Subscription Worker

This Cloudflare Worker handles newsletter subscriptions by securely forwarding email addresses to your [Brevo](https://www.brevo.com/) (formerly Sendinblue) contact list via their REST API.

---

## ✨ Features

- Secure server-side handling of Brevo API key
- Adds new subscribers to a specific Brevo contact list
- Validates email input
- Designed for integration with static sites (Astro, React, etc.)

---

## 📦 Tech Stack

- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Brevo API v3](https://developers.brevo.com/docs)
- JavaScript (ES Modules)

---

## 🚀 Usage

### 1. Deploy the Worker

Install Wrangler if you haven’t already:

```bash
npm install -g wrangler
```
