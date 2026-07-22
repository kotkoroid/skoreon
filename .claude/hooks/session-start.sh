#!/bin/bash
# SessionStart hook for Claude Code on the web.
#
# Remote sessions start from a fresh clone with no `node_modules`, so nothing
# in this Bun + Nx workspace can be linted or type-checked until dependencies
# are installed. This hook installs them once, before the agent starts, so
# `bun run lint:check` / `bun run types:check` work out of the box.
set -euo pipefail

# Only run in the remote (web) environment; a local checkout manages its own
# dependencies.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-.}"

# `bun install` (not `--frozen-lockfile`) so the resulting container state is
# cached and re-runs stay fast and idempotent.
bun install
