# Matthew Wijaya Portfolio

A dark-first Next.js portfolio that positions Matthew Wijaya at the intersection of design and engineering.

## Run locally

```bash
npm.cmd install
npm.cmd run dev
```

## Quality checks

```bash
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
```

## Content and assets

- Edit profile and contact details in `data/profile.ts`.
- Edit project records and links in `data/projects.ts`.
- Store project covers in `public/projects/`.
- Store the portrait in `public/hero/portrait.webp`.
- Store the CV at `public/Matthew-Wijaya-CV.pdf`.
- Local fonts live in `public/fonts/`.

These files are bundled with the deployment. The site does not require a database, object storage, or another external storage provider.

## Deploy to Vercel

1. Put this folder in a Git repository and import it in Vercel, or deploy it with the Vercel CLI.
2. Keep the detected framework as `Next.js` and the project root as `.`.
3. Keep the default install, build, and output settings. Vercel runs `npm install` and `npm run build` and detects the `.next` output automatically.
4. In Vercel project settings, enable automatic exposure of System Environment Variables. The site uses `VERCEL_PROJECT_PRODUCTION_URL` for canonical, Open Graph, robots, and sitemap URLs.
5. Optionally set `NEXT_PUBLIC_SITE_URL` to the full custom production URL if you want to override the Vercel-provided domain.

No Vercel Blob, database, or third-party media storage setup is required. External project links and the ASKMO YouTube embed remain ordinary outbound content.
