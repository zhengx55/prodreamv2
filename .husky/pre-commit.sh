#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

#! npm run cypress:run #! Needs DEV to be running
pnpm run lint-staged
