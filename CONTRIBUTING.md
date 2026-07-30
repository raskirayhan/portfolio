# Contributing

Thank you for helping improve the portfolio. Small, focused contributions are welcome when they improve clarity, accessibility, reliability, or the quality of the showcased work.

## Before you start

- Search existing issues and pull requests before opening a new one.
- For security concerns, follow [SECURITY.md](SECURITY.md) instead of opening a public issue.
- Keep changes scoped. Avoid mixing a visual change with unrelated refactors.

## Local setup

```bash
git clone https://github.com/raskirayhan/portfolio.git
cd portfolio
cd backend
npm ci
npm run validate
```

Open `index.html` with a local static server to review frontend changes. Run `npm start` inside `backend/` when testing the API-backed project catalog.

## Pull requests

1. Create a descriptive branch from `main`.
2. Make the smallest complete change.
3. Update documentation or screenshots when behavior changes.
4. Run `npm run validate` in `backend/` and review the page at mobile and desktop widths.
5. Write a pull request description that explains the problem, solution, and verification.

## Commit style

Use concise, imperative messages such as:

```text
docs: clarify local setup
fix: keep project cards available without the API
test: cover project catalog response
```

## Review expectations

Contributions should preserve responsive behavior, keyboard access, readable contrast, safe link handling, and a truthful project description. Please do not add private contact information, credentials, or unverified portfolio claims.
