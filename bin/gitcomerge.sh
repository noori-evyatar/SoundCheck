#!/bin/sh
CURBRANCH=$(git rev-parse --abbrev-ref HEAD)
git checkout "$@" && git merge $CURBRANCH