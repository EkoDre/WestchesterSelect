#!/bin/bash
# Netlify build script
cd "$(dirname "$0")"
npm ci
npm run build

