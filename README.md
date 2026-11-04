# miniserve-lite

Minimal static file server written in Python using only the standard library. Serves any directory over HTTP with zero dependencies. Designed for quick local testing, sharing files on a network, or replacing `python -m http.server` with a shorter command.

## Features

- Zero external dependencies - only Python stdlib
- Cross-platform - works on Windows, Linux, macOS
- Simple usage - just point to a directory and port
- WASM support included
- Fast startup, minimal overhead
- Keyboard interrupt safe

## Install

### Quick install (Linux/macOS)
```bash
curl -fsSL https://raw.githubusercontent.com/JovianOps/miniserve-lite/master/install.sh | sh
```

### Manual
```bash
git clone https://github.com/JovianOps/miniserve-lite
cd miniserve-lite
```

### Windows
No install needed. Use `miniserve-lite.bat` directly.

## Usage

```bash
# Serve current directory on default port 8000
./miniserve-lite.sh .

# Serve specific directory
./miniserve-lite.sh /path/to/dir

# Serve on custom port
./miniserve-lite.sh . 8080
```

Windows:
```cmd
miniserve-lite.bat . 8080
```

Python directly:
```bash
python miniserve-lite.py . 8080
```

## How it works

Uses `http.server.SimpleHTTPRequestHandler` and `socketserver.TCPServer`. Changes to the target directory before serving. Adds `.wasm` MIME type. Binds to all interfaces (`0.0.0.0`) on specified port.

## License

MIT

## Security

Binds to `0.0.0.0` - accessible to other devices on the same network. Do **not** serve directories containing private, sensitive, or personal files on untrusted networks. Use only on trusted networks or serve only public files.
