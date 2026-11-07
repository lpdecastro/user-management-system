# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Layout

Two independent projects (no root build, not a git repo):

- `user-management-api/` — Spring Boot 4 / Java 21 / Maven backend (package `com.liandrejohn.usermanagement`)
- `user-management-web/` — React 19 + TypeScript + Vite frontend (MUI, TanStack Query, react-router, react-hook-form + zod)

## Commands

Backend (run from `user-management-api/`):

```bash
./mvnw spring-boot:run                 # starts on :8080
./mvnw test                            # all tests
./mvnw test -Dtest=ClassName#method    # single test
./mvnw compile                         # also regenerates QueryDSL Q-classes (e.g. QUser) into target/generated-sources
```

Frontend (run from `user-management-web/`):

```bash
npm run dev                  # Vite dev server; proxies /api -> http://localhost:8080
npm run build                # tsc -b && vite build
npm run lint                 # eslint
npm run test:run             # vitest once (npm test = watch mode)
npx vitest run src/components/UsersTable.test.tsx   # single file
npx vitest run -t "renders users correctly"         # single test by name
```

## Architecture

### Backend
- **Users CRUD is not a hand-written controller.** It is exposed by Spring Data REST from `UserRepository` at `/users` (HAL responses: `_embedded.users`, `page.totalElements`). `RestConfig` exposes entity IDs.
- **Filtering** on `GET /users?name=&role=&team=` comes from `QuerydslPredicateExecutor`; `UserRepository.customize` binds every String param to case-insensitive `contains`. Paging/sort use standard `page`, `size`, `sort=field,dir`.
- **Business rules** live in `UserEventHandler` (`@HandleBeforeCreate` / `@HandleBeforeSave`): normalizes email to lowercase and throws `EmailAlreadyExistsException`, which `GlobalExceptionHandler` maps to `409 {code: "EMAIL_ALREADY_EXISTS", field: "email", message}`.
- Custom endpoints: `/user-summary` (counts per team, hardcoded Engineering/Marketing/Design) and `/auth/me`, `/auth/csrf`.
- **Security** (`SecurityConfig`): session-cookie auth via form login at `POST /auth/login` (form-encoded `username`/`password`), logout at `POST /auth/logout`. Single in-memory user `admin@example.com`, password from `app.admin.password` (default `admin`). CSRF is enabled; everything except `/auth/csrf` and `/auth/login` requires auth; unauthenticated requests get a bare 401 (no redirect).
- **Data**: H2 in-memory, `ddl-auto=create-drop`, seeded from `src/main/resources/data.sql` on every start (state is lost on restart).

### Frontend
- All HTTP goes through `src/api/apiFetch.ts`, which prefixes `/api` (stripped by the Vite proxy) and, for non-GET methods, first fetches `/api/auth/csrf` and attaches the token header. Use it rather than raw `fetch`.
- Layering: `src/api/*` (fetch functions; throw `ApiError` with backend `code` for form-field errors) → `src/hooks/*` (TanStack Query wrappers; mutations invalidate the `['users']` key) → pages/components. Auth state is the `['auth','me']` query; `ProtectedRoute` gates routes on it.
- Form validation schemas are in `src/schemas/` (zod), used with react-hook-form.
- Routes in `App.tsx`: `/login` public; everything else under `ProtectedRoute` + `AdminLayout`. Only `/users` is real — other nav pages are `PlaceholderPage`.
- Tests: Vitest + jsdom + Testing Library. `src/test/setup.ts` starts an MSW server (`src/test/server.ts`, no default handlers) with unhandled requests treated as errors — register handlers per test with `server.use(...)`.
