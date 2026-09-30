#!/usr/bin/env bash
# Concatenates src/*.js into a single self-contained index.html
cd "$(dirname "$0")"
{ cat <<'HEAD'
<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Saga Diorama — Nine Duels (seamless loop)</title>
<style>html,body{margin:0;height:100%;background:#000;overflow:hidden}body{display:flex;align-items:center;justify-content:center}canvas{display:block;image-rendering:pixelated;image-rendering:crisp-edges;background:#000}</style>
</head><body><canvas id="c" width="480" height="270"></canvas>
<script>
HEAD
cat src/p1.js src/p2.js src/p3.js src/p4.js src/p5.js src/p9.js
echo '</script></body></html>'
} > index.html
echo "built index.html"
