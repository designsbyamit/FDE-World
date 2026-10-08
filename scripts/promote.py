"""Promote staging to live.

Usage (from the repo root): python3 scripts/promote.py

Replaces the contents of live/ with an exact copy of staging/. Review the
result with `git status`, then commit and push main to publish.
"""
import pathlib
import shutil

ROOT = pathlib.Path(__file__).resolve().parent.parent
STAGING = ROOT / "staging"
LIVE = ROOT / "live"


def main() -> None:
    if not STAGING.is_dir():
        raise SystemExit("staging/ not found")
    if LIVE.exists():
        shutil.rmtree(LIVE)
    shutil.copytree(STAGING, LIVE)
    print("live/ now matches staging/. Review with `git status`, then commit and push main.")


if __name__ == "__main__":
    main()
