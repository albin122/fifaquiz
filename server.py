import http.server
import json
import sys

PORT = 8000

# In-memory store for the shared quiz state
shared_state = {
    "version": 0,
    "lastUpdatedBy": "",
    "gameState": None,
    "questions": None
}

class QuizSyncHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        # Suppress standard logging to keep terminal logs readable
        pass

    def do_GET(self):
        global shared_state
        if self.path == "/api/state":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps(shared_state).encode("utf-8"))
        else:
            super().do_GET()

    def do_POST(self):
        global shared_state
        if self.path == "/api/state":
            content_length = int(self.headers["Content-Length"])
            post_data = self.rfile.read(content_length)
            try:
                data = json.loads(post_data.decode("utf-8"))
                # Update the shared state
                shared_state = data
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success", "version": shared_state["version"]}).encode("utf-8"))
            except Exception as e:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(str(e).encode("utf-8"))
        else:
            self.send_response(404)
            self.end_headers()

    def do_OPTIONS(self):
        # Support CORS for local development environments
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

if __name__ == "__main__":
    server_address = ("", PORT)
    httpd = http.server.HTTPServer(server_address, QuizSyncHandler)
    print(f"===================================================")
    print(f"  FIFA MEN'S WORLD CUP PRESENTATION QUIZ SYNC SERVER")
    print(f"  Running on: http://localhost:{PORT}")
    print(f"===================================================")
    print(f"Invite other devices on your local network using your IP address:")
    print(f"Example: http://<your-ip-address>:{PORT}")
    print(f"===================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server.")
        sys.exit(0)
