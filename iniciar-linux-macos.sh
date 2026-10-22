#!/usr/bin/env sh
cd "$(dirname "$0")" || exit 1
echo 'TechGlam disponível em http://localhost:5500'
python3 -m http.server 5500
