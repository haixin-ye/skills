# Skills Repository Contract

This repository is a catalog of complete Agent Skill directories.

## Discover

1. Read `skills/index.json`.
2. Match the user request against each skill's `description`, `triggers`, and `tags`.
3. Read the selected skill's `SKILL.md` before performing work.
4. Do not load or install unrelated skills.

## Install

1. Copy or install the complete directory named by `path` in `skills/index.json`.
2. Preserve all files below that directory, including `references/`, `assets/`, `agents/`, and `scripts/`.
3. Place the directory under the target Agent's skills directory using the skill name as the directory name.
4. Reload the target Agent's skills after installation.

Do not install only `SKILL.md` for a skill whose catalog entry has `bundle_required: true`.

## Selection Rule

Use a skill only when its description directly matches the user's task or the user explicitly names it. Do not substitute a skill for an already well-scoped implementation request unless the user asks for the discovery, feasibility, or planning workflow described by that skill.

