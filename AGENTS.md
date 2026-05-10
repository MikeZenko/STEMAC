## Cursor Cloud specific instructions

This is a React + TypeScript + Vite SPA (STEM Central Asia website). The active project lives in `STEMAC/` (ignore `STEMCA/` — it's a stale duplicate).

### Quick reference

| Action | Command | Working directory |
|--------|---------|-------------------|
| Install deps | `pnpm install` | `STEMAC/` |
| Dev server | `pnpm dev` | `STEMAC/` (serves at `http://localhost:5173`) |
| Lint | `pnpm lint` | `STEMAC/` |
| Build | `pnpm build` | `STEMAC/` |
| Preview prod build | `pnpm preview` | `STEMAC/` |

### Gotchas

- **pnpm 10 build-script approval**: pnpm 10 blocks native add-on build scripts by default. esbuild (used by Vite) ships pre-built platform binaries so Vite works without approving esbuild's postinstall, but if you hit esbuild errors after install, run `pnpm approve-builds` interactively or add `pnpm.onlyBuiltDependencies` to `package.json`.
- **Pre-existing lint errors**: The codebase has ~31 ESLint errors (unused vars, `any` types). These are pre-existing and not blockers for the dev server or build.
- **No backend**: Newsletter and Join Us forms use `setTimeout` to simulate API calls — there is no real backend or database.
- **No automated tests**: The project has no test framework configured (no Jest, Vitest, etc.). `pnpm lint` and `pnpm build` are the main quality checks.
- **Root README has merge-conflict markers**: `/workspace/README.md` contains unresolved `<<<<<<< HEAD` markers from a prior merge.
