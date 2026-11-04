#!/bin/sh
INSTALL_DIR="$HOME/.local/bin"
mkdir -p "$INSTALL_DIR"
curl -fsSL https://raw.githubusercontent.com/JovianOps/miniserve-lite/master/miniserve-lite.py -o "$INSTALL_DIR/miniserve-lite"
chmod +x "$INSTALL_DIR/miniserve-lite"
echo "Installed to $INSTALL_DIR/miniserve-lite"
