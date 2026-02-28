# Repository Guidelines

## Project Structure & Module Organization
This is a Next.js App Router project.
- `app/`: route groups, pages, layouts, and API routes (for example `app/(root)/*`, `app/(auth)/*`, `app/api/*`).
- `components/`: reusable UI and feature components (`ui/`, `shared/`, `forms/`, `cards/`, `auth/`).
- `lib/`: core logic (`actions/`, `models/`, `validations/`, auth, DB, and utilities).
- `constants/`: shared static values.
- `public/assets/`: SVG and static assets.
- Root config: `eslint.config.mjs`, `tailwind.config.*`, `tsconfig.json`, `middleware.ts`.

## Build, Test, and Development Commands
Use npm scripts from `package.json`:
- `npm run dev`: start local dev server.
- `npm run build`: create production build.
- `npm run start`: run production server from build output.
- `npm run lint`: run ESLint checks across the repo.

## Coding Style & Naming Conventions
- Language: TypeScript (`.ts`/`.tsx`) with `strict` mode enabled.
- Imports: prefer `@/*` alias for internal paths.
- Indentation: 2 spaces; keep lines readable and component files focused.
- Components: PascalCase file and export names (for example `ThreadCard.tsx`).
- Route folders: lowercase and kebab-case when multiword (for example `create-post`).
- Follow `eslint-config-next/core-web-vitals`; run lint before opening a PR.

## Testing Guidelines
There is currently no dedicated automated test framework configured in this repository.
- Minimum requirement: run `npm run lint` and `npm run build` before submitting changes.
- For logic-heavy additions (especially in `lib/actions` and `lib/validations`), add tests if you introduce a framework (recommended: Vitest or Jest) and keep test files near source as `*.test.ts`.

## Commit & Pull Request Guidelines
Commit history shows short, imperative messages (for example: `Fix Vercel middleware invocation by using middleware entrypoint`).
- Keep commit subjects concise and action-oriented.
- Group related changes into one commit; avoid mixing refactors with feature work.
- PRs should include: purpose, key file-level changes, verification steps (`lint`, `build`), linked issue (if any), and screenshots for UI updates.

## Security & Configuration Tips
- Keep secrets in `.env.local`; never commit environment files.
- Review auth and API changes carefully (`app/api/auth/*`, `lib/auth.ts`, `middleware.ts`).
- Validate incoming data with existing Zod validation patterns in `lib/validations`.
