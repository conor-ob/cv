# cv

Source for [cv.conorob.me](https://cv.conorob.me), a static CV site built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com).

## Development

Requires Node 24+ (see `.nvmrc`) and pnpm (version pinned via `packageManager`, run `corepack enable` once).

| Command          | Action                                        |
| :--------------- | :-------------------------------------------- |
| `pnpm install`   | Install dependencies                          |
| `pnpm dev`       | Start the dev server at `localhost:4321`      |
| `pnpm build`     | Build the site to `./dist/`                   |
| `pnpm preview`   | Preview the production build locally          |
| `pnpm lint`      | Lint and format check with Biome              |
| `pnpm format`    | Apply Biome formatting and safe lint fixes    |
| `pnpm typecheck` | Type-check with `astro check` and `tsc`       |
| `pnpm check`     | Run `lint` and `typecheck` (same as CI)       |

## Content

All CV content lives in `src/content` as Markdown and YAML files, with schemas defined in `src/content.config.ts`. Technology badge icons use [Iconify](https://icon-sets.iconify.design) class names (e.g. `icon-[logos--aws]`).

## Deployment

The site is deployed on [Railway](https://railway.com) from the `Dockerfile`: a Node stage builds the static site and [Caddy](https://caddyserver.com) serves `dist/` on `$PORT`. Railway infrastructure is defined in `.railway/railway.ts` (see `.railway/README.md`).

To run the production image locally:

```sh
docker build -t cv .
docker run --rm -p 8080:8080 cv
```

## Inspiration

- https://github.com/srleom/astro-theme-resume: https://astro-theme-resume.vercel.app
- https://github.com/KonradSzwarc/devscard: https://devscard.netlify.app
- https://github.com/henriqgoncalvs/website: https://www.henriqgoncalvs.com
- https://github.com/coding-in-public/astro-content-collections-overview: https://youtu.be/Fcw4c3wzm7I?si=SIm2OMsDeCRtsy42

## TODO

- [x] fix error when processing images with sharp image service
- [x] add dynamic year in footer
- [ ] add save pdf button
