# Bala & Gayathri — Wedding Reception Invitation

A Next.js 14 (App Router) digital wedding invitation, ready for one-click deploy to Vercel.

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Go to <https://vercel.com/new> → **Import** the repo.
3. Framework Preset: **Next.js** (auto-detected).
4. Click **Deploy**.

That's it — no env vars required.

Or from the CLI:

```bash
npm i -g vercel
vercel
vercel --prod
```

## Edit the invitation

All content lives in `app/components/Invitation.tsx`.
Styles are in `app/globals.css`.
