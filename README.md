# Personal site

Next.js 16 (App Router) + Tailwind v4 + react-three-fiber. Zero-config on Vercel.

## Run

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build (also type-checks)
pnpm check      # lint + typecheck + model asserts + build (what the git hooks run)
```

## Deploy

Vercel project `palagi` is connected to GitHub `bpalagi/palagi`: pushes to
`main` deploy to https://palagi.vercel.app, other branches get preview URLs.

`pnpm install` points git at `.githooks/`, whose `pre-commit` runs `pnpm check`
(lint, typecheck, model asserts, build). Skip once with `--no-verify`.

## Where things live

| Path | What |
|---|---|
| `src/lib/site.ts` | Name, email, socials, nav. **Start here for placeholders.** |
| `src/app/page.tsx` | Home: hero, bio, diploma popout, talks, showcase |
| `src/app/services/page.tsx` | Services |
| `src/app/posts/` | Posts index + `[slug]` detail |
| `src/lib/posts.ts` | Post registry (add new posts here) |
| `src/content/posts/*.tsx` | Post bodies, authored as React so visualizations can be embedded |
| `src/components/viz/teamData.ts` | The "today vs tomorrow" team scenarios (people, agents, tools) |
| `src/components/viz/TeamDiagramSVG.tsx` | 2D diagram (also the reduced-motion fallback) |
| `src/components/viz/TeamScene3D.tsx` | three.js scene, lazy-loaded client-side only |
| `public/images/*.svg` | Placeholder art. Replace with real photos (keep filenames or update imports). |
| `public/models/kit.glb` | Prebuilt 3D kit loaded by `TeamScene3D.tsx` |
| `scripts/check-model.mts` | Asserts the team-model directions the post claims (`pnpm check:model`) |

## Replacing placeholders

Search for `[` in `src/` — every bracketed string is a placeholder. Images in
`public/images/` are labelled SVGs; swap for `.jpg`/`.png` and update the
`width`/`height` props where they are used.
