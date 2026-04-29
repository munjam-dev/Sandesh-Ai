# Sandesh AI

Sandesh AI is a production-ready, multi-channel AI-powered team inbox. It unifies customer communications across Email, WhatsApp, and Instagram Direct, utilizing OpenAI to generate smart replies, score leads, and detect intents automatically.

## Features

- **Multi-Channel Inbox**: Connect Gmail, WhatsApp Business, and Instagram.
- **Smart AI Replies**: Context-aware suggestions using OpenAI (`gpt-4o-mini`).
- **Automated Lead Scoring**: Incoming messages are instantly tagged as HOT, WARM, or COLD.
- **Intent Detection**: The AI detects what the customer is asking (e.g., "Pricing Inquiry").
- **Premium Glassmorphic UI**: High-end Next.js App Router frontend with Framer Motion animations.
- **SaaS Readiness**: Fully functional authentication (Supabase), usage limits, and Stripe/Razorpay billing tiers.

## Tech Stack

- **Frontend**: Next.js 16 (App Router), Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Supabase (PostgreSQL)
- **AI**: OpenAI API
- **Integrations**: Google Cloud Console (Gmail API), Meta Developer Console (WhatsApp & Instagram Graph API)

## Getting Started

### 1. Database Setup (Supabase)
Run the SQL schema located in `supabase/schema.sql` in your Supabase project's SQL Editor to create all necessary tables, Row Level Security (RLS) policies, and triggers.

### 2. Environment Variables
Copy `.env.example` to `.env.local` and fill in your actual API keys.

```bash
cp .env.example .env.local
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Development Server
```bash
npm run dev
```
Open https://www.sandeshai.online/ in your browser.

## Webhooks (WhatsApp & Instagram)
If you are developing locally, you must expose your local server to the internet using a tool like ngrok or localtunnel so Meta can deliver incoming messages.

```bash
npx localtunnel --port 3000
```
Update your Meta Developer Console with the generated URL (e.g., `https://your-url.loca.lt/api/webhooks/whatsapp`).
