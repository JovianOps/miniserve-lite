#!/usr/bin/env python3
import http.server
import socketserver
import sys
import os

PORT = 8000
DIRECTORY = "."

if len(sys.argv) > 1:
    DIRECTORY = sys.argv[1]
if len(sys.argv) > 2:
    try:
        PORT = int(sys.argv[2])
    except ValueError:
        pass

os.chdir(DIRECTORY)
Handler = http.server.SimpleHTTPRequestHandler
Handler.extensions_map.update({'.wasm': 'application/wasm'})
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving {os.getcwd()} at http://localhost:{PORT}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
