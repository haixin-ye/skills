#!/usr/bin/env python3
"""Validate the repository catalog and the essential structure of bundled skills."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "skills" / "index.json"


def fail(message: str) -> None:
    print(f"ERROR: {message}")
    raise SystemExit(1)


def read_frontmatter(skill_file: Path) -> dict[str, str]:
    text = skill_file.read_text(encoding="utf-8")
    match = re.match(r"^---\s*\n(.*?)\n---\s*\n", text, re.DOTALL)
    if not match:
        fail(f"{skill_file}: missing YAML frontmatter")

    values: dict[str, str] = {}
    for line in match.group(1).splitlines():
        key_value = line.split(":", 1)
        if len(key_value) == 2:
            values[key_value[0].strip()] = key_value[1].strip().strip('"')
    return values


def main() -> None:
    if not INDEX.is_file():
        fail("skills/index.json is missing")

    catalog = json.loads(INDEX.read_text(encoding="utf-8"))
    seen: set[str] = set()
    for entry in catalog.get("skills", []):
        name = entry.get("name")
        path = entry.get("path")
        if not isinstance(name, str) or not re.fullmatch(r"[a-z0-9-]+", name):
            fail("every catalog entry must have a lowercase hyphen-case name")
        if name in seen:
            fail(f"duplicate skill name: {name}")
        seen.add(name)
        if not isinstance(path, str):
            fail(f"{name}: path is missing")

        skill_dir = ROOT / path
        skill_file = skill_dir / "SKILL.md"
        if not skill_file.is_file():
            fail(f"{name}: missing {skill_file.relative_to(ROOT)}")
        if skill_dir.name != name:
            fail(f"{name}: directory name must match the catalog name")

        frontmatter = read_frontmatter(skill_file)
        if frontmatter.get("name") != name:
            fail(f"{name}: frontmatter name does not match catalog name")
        if not frontmatter.get("description"):
            fail(f"{name}: frontmatter description is missing")

        if entry.get("bundle_required"):
            for required in (skill_dir / "references", skill_dir / "assets"):
                if not required.is_dir():
                    fail(f"{name}: bundled skill is missing {required.name}/")

    print(f"Validated {len(seen)} skill(s).")


if __name__ == "__main__":
    main()

