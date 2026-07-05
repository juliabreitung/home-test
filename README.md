# home-test

End-to-end test automation for the [automaticbytes/demo-app](https://hub.docker.com/r/automaticbytes/demo-app) challenge application, built with **Playwright**, **TypeScript**, **Page Object Model**, and **custom fixtures**.

## Requirements covered

| Requirement | Implementation |
|-------------|----------------|
| Playwright + TypeScript | `@playwright/test` ^1.61 |
| Page Object Model | `tests/pages/` |
| Custom fixtures | `tests/fixtures/baseTest.ts` |
| Cross-browser | Chromium, Firefox, WebKit |
| Multi-platform (desirable) | Desktop + mobile emulation (Pixel 5, iPhone 12) |
| Reproducible environment (desirable) | GitHub Codespaces + `.devcontainer/` |
| 10 challenge scenarios | `tests/specs/` (1 spec per scenario) |

## Prerequisites

- **Recommended:** GitHub account + GitHub Codespaces
- **Alternative (local):** Node.js 20+, Docker (if running the demo app locally)

The demo app image (`automaticbytes/demo-app`) is **linux/arm64**. On amd64 machines (most Codespaces), ARM emulation via QEMU is required (configured in `.devcontainer/post-create.sh`).

## Quick start — GitHub Codespaces (recommended)

1. Open this repository on GitHub.
2. **Code** → **Codespaces** → **Create codespace on main**.
3. Wait for the dev container to finish (`post-create.sh` installs dependencies, Playwright browsers, QEMU if needed, and starts the demo app on port **3100**).
4. Verify the app is running:

   ```bash
   curl http://localhost:3100
   ```

5. Run tests:

   ```bash
   npm run test:desktop   # 10 tests, 1 browser (fast feedback)
   npm test               # 10 scenarios × 5 projects = 50 runs
   npm run report         # open HTML report after failures
   ```

### If the demo app stops (port 3100 down)

```bash
docker rm -f demo-app 2>/dev/null || true
docker run --privileged --rm tonistiigi/binfmt --install arm64   # amd64 only, once per session
docker run -d --name demo-app --platform linux/arm64 -p 3100:3100 automaticbytes/demo-app
# wait 2–5 min on first start, then:
curl http://localhost:3100
```

## Local setup (optional)

```bash
git clone https://github.com/juliabreitung/home-test.git
cd home-test
cp .env.example .env
npm ci
npx playwright install --with-deps
```

Start the demo app (Docker required):

```bash
docker run -d --name demo-app --platform linux/arm64 -p 3100:3100 automaticbytes/demo-app
```

Run tests:

```bash
npm run test:desktop
```

## Environment variables

Copy `.env.example` to `.env` (never commit `.env`):

```env
BASE_URL=http://localhost:3100
```

Playwright reads `BASE_URL` via `tests/config/env.ts`. Tests must use **`http://localhost:3100`** inside Codespaces, not the public forwarded port URL.

## Project structure

```
tests/
├── config/env.ts          # BASE_URL from .env
├── data/test-data.ts      # Challenge test data
├── fixtures/              # Custom Playwright fixtures + POM injection
├── pages/                 # Page Object Model
├── specs/                 # 10 test scenarios
└── utils/helpers.ts       # Price parsing helpers
.devcontainer/             # Codespaces: Node 20 + Docker + demo app
playwright.config.ts       # 5 projects (desktop + mobile)
```

## Test scenarios

| # | Spec | Description |
|---|------|-------------|
| 1 | `login/login-success.spec.ts` | Valid login → welcome with username |
| 2 | `login/login-failure-wrong-credentials.spec.ts` | Invalid credentials → error |
| 3 | `login/login-failure-empty-fields.spec.ts` | Empty fields → error |
| 4 | `checkout/checkout-order-success.spec.ts` | Full checkout → order number |
| 5 | `checkout/checkout-form-alert.spec.ts` | Uncheck address → alert |
| 6 | `checkout/cart-total.spec.ts` | Cart total = sum of item prices |
| 7 | `grid/grid-item-position-7.spec.ts` | Position 7 → Super Pepperoni $10 |
| 8 | `grid/grid-all-items.spec.ts` | All items have title, price, image, button |
| 9 | `search/search-success.spec.ts` | Search "automation" → result message |
| 10 | `search/search-empty.spec.ts` | Empty search → validation message |

## npm scripts

| Script | Description |
|--------|-------------|
| `npm test` | Full suite (50 runs) |
| `npm run test:desktop` | Desktop Chrome only (10 runs) |
| `npm run test:mobile` | Mobile Android emulation (10 runs) |
| `npm run test:ui` | Playwright UI mode |
| `npm run report` | Show last HTML report |

## Notes

- Login credentials (`johndoe19` / `supersecret`) are public test data from the challenge README, not real secrets.
- Public forwarded port URLs (`*.github.dev`) require GitHub authentication and are **not** used as `BASE_URL` for tests.
- GitHub Actions CI with the ARM-only demo image may fail on amd64 runners; **Codespaces is the supported execution path** for this project.

## Author

Julia Breitung — [juliabreitung/home-test](https://github.com/juliabreitung/home-test)
