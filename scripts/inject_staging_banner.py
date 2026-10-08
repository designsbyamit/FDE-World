"""Mark the staging copy of the site so it cannot be mistaken for live.

Usage: python3 scripts/inject_staging_banner.py <staging_site_dir>

Adds a fixed "STAGING" badge and a "[Staging]" title prefix to each project
entry page listed in ENTRY_PAGES. Runs on the build output only; nothing is
committed back to the repository.
"""
import pathlib
import re
import sys

ENTRY_PAGES = [
    "fde-collections/Projects/Collections Agent Portal/index.html",
]

BADGE = (
    '<div style="position:fixed;right:12px;bottom:12px;z-index:2147483647;'
    "background:#b45309;color:#fff;font:600 12px/1 system-ui,sans-serif;"
    "padding:8px 12px;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,.3);"
    'pointer-events:none">STAGING &mdash; not the live site</div>'
)


def main() -> None:
    site = pathlib.Path(sys.argv[1])
    for rel in ENTRY_PAGES:
        page = site / rel
        if not page.is_file():
            print(f"skip (missing): {rel}")
            continue
        html = page.read_text(encoding="utf-8")
        html = re.sub(r"<title>", "<title>[Staging] ", html, count=1, flags=re.I)
        idx = html.lower().rfind("</body>")
        html = html[:idx] + BADGE + html[idx:] if idx != -1 else html + BADGE
        page.write_text(html, encoding="utf-8")
        print(f"bannered: {rel}")


if __name__ == "__main__":
    main()
