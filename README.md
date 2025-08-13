## Playwright — UI and API tests

This project implements UI and API tests with Playwright, following the requirements: Page Object Pattern, test fixtures, and an extensible structure.

### What matters

- Files `src/tests/ui/login.spec.ts` and `src/tests/ui/home.spec.ts` run as a single scenario (one test per file), so the browser/page is created only once per file.
- Global hooks start a local mock API server only for the API project.

### Requirements coverage

- UI‑1: open `https://paydo.com/`, click `Open account`, verify registration page UI — `src/tests/ui/home.spec.ts` using `HomePage.verifyUIElements()`.
- UI‑2: open `Log In`, enter invalid data, verify error message — `src/tests/ui/login.spec.ts` as a single flow using `LoginPage`.
- API: two endpoints are covered with a local server:
    - `GET /user?user_id` → `{ username: string, age: number[1..100], user_id: number }`
    - `POST /user` with `{ username: string, age: number[1..100], user_type: boolean }` → `{ user_id, username }`

### Structure

```
src/
  pages/           # Page Objects (POM)
  tests/
    api/           # API tests + API client
    ui/            # UI tests (single flow per file)
    fixtures/      # fixtures (ui.ts, userClient.ts)
  hooks/           # global hooks (mock API lifecycle)
```

### Install

```bash
npm ci
```

### Run

- All tests:

```bash
npm test
```

- UI only:

```bash
npm run test:ui
```

- API only:

```bash
npm run test:api
```

- HTML report:

```bash
npm run report
```

- Format code:

```bash
npm run prettier
```

### Technical details

- Playwright projects:
    - `chromium` (UI) with `baseURL: https://paydo.com`.
    - `api` with `baseURL: http://localhost:3000`.
- UI fixtures (`src/tests/fixtures/ui.ts`): an auto‑hook opens `/` before the test; each UI file contains a single test so the browser starts once per file.
- API fixtures (`src/tests/fixtures/userClient.ts`): provides `apiClient` on top of Playwright `request`.

### POM

- `HomePage`, `LoginPage` encapsulate locators and actions; tests call high‑level methods.

### Extensibility

- New POM → `src/pages/`.
- Fixtures → `src/tests/fixtures/`.
- New UI/API tests → `src/tests/ui/`, `src/tests/api/`.
