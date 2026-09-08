# Personal site

Next.js 16 (App Router) + Tailwind v4 + react-three-fiber. Zero-config on Vercel.

## Run

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build (also type-checks + lints)
```

## Deploy to Vercel

```bash
pnpm dlx vercel        # first time: link project, accept defaults
pnpm dlx vercel --prod
```

Or push to GitHub and import the repo at vercel.com/new. Framework preset
auto-detects Next.js; no environment variables are required.

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
| `public/models/` | Drop Blender-exported `.glb` files here if going the Blender route |

## Replacing placeholders

Search for `[` in `src/` — every bracketed string is a placeholder. Images in
`public/images/` are labelled SVGs; swap for `.jpg`/`.png` and update the
`width`/`height` props where they are used.

## Going further with Blender

The 3D scene is procedural today. To use Blender-authored assets:

1. Model in Blender, export as glTF Binary (`.glb`), Draco-compressed if large.
2. Put the file in `public/models/`.
3. In `TeamScene3D.tsx`, `import { useGLTF } from "@react-three/drei"` and
   replace the `sphereGeometry` / `octahedronGeometry` meshes with
   `<primitive object={scene} />` from `useGLTF("/models/your-file.glb")`.
4. Preload with `useGLTF.preload("/models/your-file.glb")`.
