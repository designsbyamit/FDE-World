# FDE World

Home for forward-deployed engineering projects. Each project is a self-contained folder at the repo root; the root `index.html` is the hub that lists them.

## Layout

```
FDE-World/
├── index.html                  Hub page (reads projects.json)
├── projects.json               Registry of projects shown on the hub
├── .nojekyll                   Serve files as-is on Pages
├── .github/workflows/pages.yml Deploys live + staging to GitHub Pages
├── scripts/                    Build helpers
└── fde-collections/            Project: FDE Collections
    ├── CLAUDE.md               Project rules for Claude
    ├── lib/                    Shared UI5 bundle, shellbar, icons
    ├── Projects/               Prototypes, incl. Collections Agent Portal
    ├── design-briefs/ …        Design briefs and DXR apps
    └── README.md               Starter-kit guide
```

Everything a project needs lives inside its own folder, so relative paths such as `../../lib/ui5-bundle/ui5-bundle.js` keep working no matter where the project sits.

## Sites

| Site | Branch | URL |
| --- | --- | --- |
| Live | `main` | https://designsbyamit.github.io/FDE-World/ |
| Staging | `staging` | https://designsbyamit.github.io/FDE-World/staging/ |

Collections Agent Portal:

- Live: https://designsbyamit.github.io/FDE-World/fde-collections/Projects/Collections%20Agent%20Portal/
- Staging: https://designsbyamit.github.io/FDE-World/staging/fde-collections/Projects/Collections%20Agent%20Portal/

## Workflow

1. Work on the `staging` branch and push. The staging site updates automatically.
2. Review it at the `/staging/` URL (entry pages carry a "STAGING" badge).
3. Merge `staging` into `main` to publish to live.

GitHub Pages serves one site per repository, so the workflow builds both branches into one artifact: `main` at the root and `staging` under `/staging/`.

## Add a project

1. Create a folder at the repo root, e.g. `fde-<name>/`, with its own `index.html`.
2. Keep its assets inside that folder and use relative paths.
3. Add an entry to `projects.json` so it appears on the hub.
4. To badge its staging entry page, add the path to `ENTRY_PAGES` in `scripts/inject_staging_banner.py`.

## One-time setup

In the repository settings, go to Settings → Pages and set Source to **GitHub Actions**.
