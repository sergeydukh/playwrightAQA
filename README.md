## Playwright Course — UI and API tests

This project implements UI and API tests with Playwright following the requested requirements: Page Object Pattern, test fixtures, and an extensible structure.

### Requirements coverage
- **UI-1**: Open `https://paydo.com/`, click `Open account`, verify all UI elements on the registration page — implemented in `src/tests/ui/home.spec.ts` with `AccountPage.verifyUIElements()`.
- **UI-2**: Open `Log In`, input invalid data, check error — implemented in `src/tests/ui/login.spec.ts` with `LoginPage` methods.
- **API**: Two endpoints covered by tests and a mock server:
  - `GET /user?user_id` → `{ username: string, age: number[1..100], user_id: number }`
  - `POST /user` with `{ username: string, age: number[1..100], user_type: boolean }` → `{ user_id, username }`
  Tests are in `src/tests/api/user.spec.ts`, client in `src/tests/api/UserClient.ts`, server in `server.js`.

### Project structure
```
src/
  pages/           # Page Objects (POM)
  tests/
    api/           # API tests + API client
    ui/            # UI tests
    fixtures/      # shared test fixtures (ui.ts, userClient.ts)
  hooks/           # global setup/teardown (API server lifecycle)
```

### Tech details
- Playwright projects:
  - `chromium` for UI tests with `baseURL` set to `https://paydo.com`.
  - `api` for API tests with `baseURL` set to `http://localhost:3000`.
- Global hooks:
  - `src/hooks/global-setup.ts` starts the local Express API and waits for `/health`.
  - `src/hooks/global-teardown.ts` shuts it down.
- UI fixtures (`src/tests/fixtures/ui.ts`):
  - Provides `home`, `account`, `login` page objects.
  - Auto-hook navigates to `/` before each UI test.
- API fixtures (`src/tests/fixtures/userClient.ts`):
  - Provides `apiClient` bound to Playwright `baseURL`.

### Install
```bash
npm ci
```

### Run tests
- All tests:
```bash
npm test
```

- Only UI tests:
```bash
npm run test:ui
```

- Only API tests:
```bash
npm run test:api
```

- Open HTML report:
```bash
npm run report
```

### Notes on Page Objects
- `HomePage`, `AccountPage`, `LoginPage` encapsulate locators and actions.
- UI tests call high-level methods such as `verifyUIElements()`, `login()`, etc., minimizing selector knowledge in tests.

### Extensibility
- Add new Page Objects under `src/pages/`.
- Add domain-specific fixtures under `src/tests/fixtures/`.
- Add new test suites in `src/tests/ui/` or `src/tests/api/`. The Playwright `projects` routing will pick them up automatically.

### Linting
ESLint is configured. The latest edits are lint-clean.


