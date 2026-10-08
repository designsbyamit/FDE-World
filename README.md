# FDE World

Home for forward-deployed engineering projects. The `main` branch holds two isolated copies of the whole site, `live/` and `staging/`. GitHub Pages serves both straight from `main`, each at its own URL.

## Layout

```
FDE-World/
├── index.html              Environment chooser (Live / Staging)
├── .nojekyll               Serve files as-is on Pages
├── scripts/promote.py      Copies staging/ over live/
├── live/                   What the Live site serves
│   ├── index.html          Project hub (reads projects.json)
│   ├── projects.json       Registry of projects shown on the hub
│   ├── env-badge.js        Shows a STAGING badge when served from /staging/
│   └── fde-collections/    Project: FDE Collections
└── staging/                Same structure; work in progress goes here
```

`live/` and `staging/` never reference each other. Every path inside them is relative, so each is a complete site on its own.

## Sites

| Environment | URL |
| --- | --- |
| Chooser | https://designsbyamit.github.io/FDE-World/ |
| Live | https://designsbyamit.github.io/FDE-World/live/ |
| Staging | https://designsbyamit.github.io/FDE-World/staging/ |

Collections Agent Portal:

- Live: https://designsbyamit.github.io/FDE-World/live/fde-collections/Projects/Collections%20Agent%20Portal/
- Staging: https://designsbyamit.github.io/FDE-World/staging/fde-collections/Projects/Collections%20Agent%20Portal/

## Workflow

1. Make changes inside `staging/` only, then commit and push `main`.
2. Review them at the Staging URL.
3. When happy, run `python3 scripts/promote.py` to replace `live/` with a copy of `staging/`, then commit and push `main`.

## Add a project

1. Create a folder inside `staging/`, e.g. `staging/fde-<name>/`, with its own `index.html`. Keep its assets inside that folder and use relative paths.
2. Add an entry to `staging/projects.json` so it appears on the hub.
3. To show the STAGING badge on its entry page, add `<script src="../env-badge.js"></script>` before `</body>`, adjusting the relative path to reach the `env-badge.js` that sits next to the hub's `index.html`.
4. Promote when ready.

## One-time setup

In the repository settings, go to Settings → Pages. Set Source to **Deploy from a branch**, Branch to **main** and folder to **/ (root)**.
